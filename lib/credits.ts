import { db } from "./firebase";
import {
  doc, getDoc, setDoc, updateDoc,
  collection, addDoc, serverTimestamp,
  onSnapshot, type Unsubscribe,
} from "firebase/firestore";

export interface UserCredits {
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
  createdAt: Date;
  userId: string;
}

// Initialize credits for new user (10 bonus credits)
export async function initUserCredits(uid: string): Promise<void> {
  const ref = doc(db, "users", uid, "credits", "balance");
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      balance: 10,
      totalPurchased: 0,
      totalUsed: 0,
      updatedAt: serverTimestamp(),
    });
    await addTransaction(uid, {
      type: "bonus",
      description: "Bono de bienvenida",
      amount: 10,
      userId: uid,
      createdAt: new Date(),
    });
  }
}

// Get user credits once
export async function getUserCredits(uid: string): Promise<UserCredits | null> {
  const ref = doc(db, "users", uid, "credits", "balance");
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() as UserCredits : null;
}

// Subscribe to real-time credit updates
export function subscribeToCredits(
  uid: string,
  callback: (credits: UserCredits | null) => void
): Unsubscribe {
  const ref = doc(db, "users", uid, "credits", "balance");
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? snap.data() as UserCredits : null);
  });
}

// Deduct credits for an action
export async function useCredits(
  uid: string,
  amount: number,
  description: string
): Promise<boolean> {
  const ref = doc(db, "users", uid, "credits", "balance");
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;

  const current = snap.data() as UserCredits;
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

// Add credits after purchase
export async function addCredits(
  uid: string,
  amount: number,
  description: string
): Promise<void> {
  const ref = doc(db, "users", uid, "credits", "balance");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const current = snap.data() as UserCredits;
    await updateDoc(ref, {
      balance: current.balance + amount,
      totalPurchased: (current.totalPurchased || 0) + amount,
      updatedAt: serverTimestamp(),
    });
  } else {
    await setDoc(ref, {
      balance: amount,
      totalPurchased: amount,
      totalUsed: 0,
      updatedAt: serverTimestamp(),
    });
  }

  await addTransaction(uid, {
    type: "purchase",
    description,
    amount,
    userId: uid,
    createdAt: new Date(),
  });
}

// Add transaction record
async function addTransaction(uid: string, tx: Omit<Transaction, "id">): Promise<void> {
  const ref = collection(db, "users", uid, "transactions");
  await addDoc(ref, { ...tx, createdAt: serverTimestamp() });
}

// Credit cost per action
export const CREDIT_COSTS = {
  DTC_READ: 2,
  FULL_DIAGNOSIS: 10,
  PDF_REPORT: 5,
  AI_QUERY: 3,
  REALTIME_MONITOR: 1,
  RESET_CODES: 2,
} as const;