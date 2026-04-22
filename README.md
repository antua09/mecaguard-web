# MecaGuard Web v2.0

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables de entorno (.env.local)

Ya están preconfiguradas en `.env.example` con las credenciales de Firebase del proyecto MecaGuard.

## Estructura

```
app/
  (auth)/login        # Login con email + Google
  (auth)/register     # Registro con email + Google
  (main)/             # Landing page
  (main)/dashboard    # Dashboard (protegido)
  (main)/creditos     # Compra de créditos (protegido)
  (main)/planes       # Info del sistema de créditos

lib/
  firebase.ts         # Config Firebase
  credits.ts          # Sistema de créditos (Firestore)

context/
  AuthContext.tsx     # Estado global de auth + funciones
  ThemeProvider.tsx   # Dark/light mode
```

## Sistema de créditos

- 1 crédito = $20 MXN
- Compra desde 1 crédito
- Los créditos nunca vencen
- 3 créditos gratis al registrarte
- Historial de transacciones en tiempo real

## Firestore structure

```
users/{uid}/
  email, displayName, photoURL, updatedAt
  credits/balance → { balance, totalPurchased, totalUsed }
  transactions/ → [{ type, description, amount, priceMXN, createdAt }]
```

## Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
