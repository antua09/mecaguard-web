import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  type Unsubscribe,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export const CREDIT_PRICE_MXN = 20; // $20 MXN por crédito
export const WELCOME_CREDITS = 3;   // Créditos de bienvenida gratis

export const CREDIT_COSTS = {
  SCAN: 1,         // Escaneo OBD2
  PDF_REPORT: 2,   // Reporte PDF
  AI_QUERY: 1,     // Consulta IA
  REALTIME: 1,     // Monitoreo en tiempo real
} as const;

export interface CreditBalance {
  balance: number;
  totalPurchased: number;
  totalUsed: number;
  updatedAt: Date;
}

export interface Transaction {
  id?: string;
  type: "purchase" | "usage" | "bonus";
  description: string;
  amount: number;
  priceMXN?: number;
  createdAt: Date;
  userId: string;
}

// Inicializar créditos para usuario nuevo
export async function initUserCredits(uid: string): Promise<void> {
  const ref = doc(db, "users", uid, "credits", "balance");
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      balance: WELCOME_CREDITS,
      totalPurchased: 0,
      totalUsed: 0,
      updatedAt: serverTimestamp(),
    });
    await addTransaction(uid, {
      type: "bonus",
      description: `${WELCOME_CREDITS} créditos de bienvenida`,
      amount: WELCOME_CREDITS,
      userId: uid,
      createdAt: new Date(),
    });
  }
}

// Obtener balance actual
export async function getUserCredits(uid: string): Promise<CreditBalance | null> {
  const ref = doc(db, "users", uid, "credits", "balance");
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as CreditBalance) : null;
}

// Suscripción en tiempo real al balance
export function subscribeToCredits(
  uid: string,
  callback: (credits: CreditBalance | null) => void
): Unsubscribe {
  const ref = doc(db, "users", uid, "credits", "balance");
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? (snap.data() as CreditBalance) : null);
  });
}

// Comprar créditos (1 a 1, $20 MXN c/u)
export async function purchaseCredits(
  uid: string,
  quantity: number
): Promise<boolean> {
  if (quantity < 1 || quantity > 1000) return false;
  const ref = doc(db, "users", uid, "credits", "balance");
  const snap = await getDoc(ref);
  const totalMXN = quantity * CREDIT_PRICE_MXN;

  if (snap.exists()) {
    const current = snap.data() as CreditBalance;
    await updateDoc(ref, {
      balance: current.balance + quantity,
      totalPurchased: (current.totalPurchased || 0) + quantity,
      updatedAt: serverTimestamp(),
    });
  } else {
    await setDoc(ref, {
      balance: quantity,
      totalPurchased: quantity,
      totalUsed: 0,
      updatedAt: serverTimestamp(),
    });
  }

  await addTransaction(uid, {
    type: "purchase",
    description: `Compra de ${quantity} crédito${quantity > 1 ? "s" : ""}`,
    amount: quantity,
    priceMXN: totalMXN,
    userId: uid,
    createdAt: new Date(),
  });

  return true;
}

// Usar créditos
export async function useCredits(
  uid: string,
  amount: number,
  description: string
): Promise<boolean> {
  const ref = doc(db, "users", uid, "credits", "balance");
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;

  const current = snap.data() as CreditBalance;
  if (current.balance < amount) return false;

  await updateDoc(ref, {
    balance: current.balance - amount,
    totalUsed: (current.totalUsed || 0) + amount,
    updatedAt: serverTimestamp(),
  });

  await addTransaction(uid, {
    type: "usage",
    description,
    amount: -amount,
    userId: uid,
    createdAt: new Date(),
  });

  return true;
}

// Agregar transacción
async function addTransaction(
  uid: string,
  tx: Omit<Transaction, "id">
): Promise<void> {
  const ref = collection(db, "users", uid, "transactions");
  await addDoc(ref, { ...tx, createdAt: serverTimestamp() });
}

// Obtener historial de transacciones
export function subscribeToTransactions(
  uid: string,
  callback: (txs: Transaction[]) => void,
  maxItems = 20
): Unsubscribe {
  const ref = collection(db, "users", uid, "transactions");
  const q = query(ref, orderBy("createdAt", "desc"), limit(maxItems));
  return onSnapshot(q, (snap) => {
    const txs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction));
    callback(txs);
  });
}
