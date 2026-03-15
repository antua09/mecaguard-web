export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
```

**Paso 2** — Pon las Firestore Rules:
👉 https://console.firebase.google.com/project/mecaguard/firestore/rules

Reemplaza todo con:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
