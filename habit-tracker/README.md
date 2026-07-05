# The Ledger — a 3-person habit & commitment tracker

Next.js (App Router) + Firebase Auth + Firestore, built for exactly three people
holding each other accountable to daily commitments.

## 1. Firebase project setup

1. Create a project at https://console.firebase.google.com.
2. **Authentication** → Sign-in method → enable **Email/Password**.
3. **Authentication** → Users → manually add your three accounts (email + password).
   There is no public sign-up screen in this app by design.
4. **Firestore Database** → create a database (production mode).
5. For each of the three Auth users, create a matching document in a `users`
   collection, **using the Auth UID as the document ID**:

   ```
   users/{uid}
   {
     "email": "alex@example.com",
     "displayName": "Alex",
     "colorTag": "teal"      // one of: "teal" | "amber" | "plum" — pick a different one per person
   }
   ```

   Easiest way: Firestore console → Start collection → `users` → set the
   Document ID field to the UID from the Authentication tab.

6. Deploy the security rules in `firestore.rules` (Firestore console → Rules →
   paste the file's contents → Publish), or via CLI:
   ```
   npm i -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules --project <your-project-id>
   ```

## 2. Local setup

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local` from Firebase Console → Project Settings → General →
"Your apps" → SDK setup and configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Then run:
```bash
npm run dev
```

## 3. Deploying to Vercel

1. Push this project to a GitHub repo.
2. Import it at https://vercel.com/new.
3. Add the same six `NEXT_PUBLIC_FIREBASE_*` variables under Project Settings →
   Environment Variables.
4. Deploy. No other configuration is needed — this is a standard Next.js app.

## How the data model works

- **`users/{uid}`** — one doc per person (exactly 3), holds display name and
  an accent color used throughout the UI.
- **`habits/{habitId}`** — one doc per commitment: title, description,
  `commitmentDays` (1–90), `startDate`/`endDate` (UTC "YYYY-MM-DD"), and a
  `checkIns` map keyed by date string (`{"2026-07-05": true, ...}`).
- All dates are computed in **UTC**, so "today" is the same instant for all
  three users regardless of their local timezone.
- Progress % = checked days ÷ `commitmentDays`.
- Any signed-in user can **read** all habits (powers the group board); only
  the owner can create/edit/delete their own.

## A known limitation, and how to close it

The app enforces "only today's box is checkable" **on the client** (`lib/utils.ts`
→ `canCheckInToday`, and `TickBoxGrid.tsx`). `firestore.rules` enforces
ownership, immutability of `ownerId`/`startDate`, and the 90-day cap — but
Firestore's rules language cannot format a server timestamp into a
`"YYYY-MM-DD"` string, so it **cannot** independently verify that a check-in
write only ever touches *today's* key. A determined user could, in principle,
edit local storage/network calls to check in for the wrong day.

If you want that closed server-side too, add a small **Cloud Function**
(`onCall` or an HTTPS endpoint) that performs the check-in server-side using
`admin.firestore()` and rejects anything but today's date, then lock down
direct client writes to the `checkIns` field in the rules. That's a
reasonably small addition on top of this structure if it matters for your
group — happy to build it if you want it.

## Folder structure

```
app/
  layout.tsx, page.tsx, globals.css
  login/page.tsx
  dashboard/page.tsx, components/ (HabitList, HabitForm, HabitCard, TickBoxGrid)
  group/page.tsx, components/ (UserProgressColumn)
components/            # shared: AuthGuard, Navbar, ProgressBar
context/AuthContext.tsx
lib/
  firebase/ (config, auth, firestore)
  hooks/ (useHabits, useGroupHabits)
  types.ts, utils.ts
firestore.rules
```
