# PetPanic APP

This is the Telegram Web App for Touch Swap, built using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Prerequisites

- **Node.js (v16 LTS)**
- **Yarn**

## Project Setup

1. **Clone the Next.js app repository:**
   ```sh
   git clone https://github.com/Touch-Swap/Web-App.git
   cd Web-App
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   ```

3. **Run the app with ngrok:**
   ```sh
   yarn dev
   ngrok http 3000
   ```

4. **Copy the ngrok URL:**
   The ngrok command will generate a URL like `https://abcd1234.ngrok.io`. Copy this URL.

## Connecting to Local Firebase Instance

To connect to a local Firebase instance in your Next.js project, follow these steps:

1. **Install Firebase CLI:**
   Ensure you have the Firebase CLI installed on your local machine.

2. **Configure Firebase Environment Variables:**
   Set `FIRESTORE_EMULATOR_HOST=localhost:8080` in `packages/nextjs/.env` to connect your Next.js application to the local Firebase instance.

3. **Seed Local Firebase Data:**
   - Data is stored in `packages/nextjs/local_database/`
   - Schema is in `packages/nextjs/service/db/`—customize according to your needs.
   - Clean up and re-import data via the Firestore UI if needed by stopping and running `yarn start` again.

## Deploying the Next.js App

1. **Connect to Live Firebase Instance:**
   - Download `serviceAccountKey.json` from the Firebase UI.
   - Comment out `FIRESTORE_EMULATOR_HOST` in `.env`.
   - Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of `serviceAccountKey.json`.

2. **Deploy to Vercel:**
   - Connect your GitHub repo to Vercel for automatic deployment.
   - Or deploy directly from CLI:
     ```sh
     yarn vercel
     ```

## Request Hash Validation

All requests are validated using an API route that checks if the request is coming from Telegram.

### Disabling Validation

To disable validation, delete `pages/api/validate-hash.ts` and remove the `useEffect` hook from `pages/_app.tsx`.

### Using `initData`

Use `window.Telegram.WebApp.initDataUnsafe` or the hook `useTelegramInitData` for handling initialization data.

```tsx
// src/pages/init-data.tsx
import { useTelegramInitData } from '../hooks/useTelegramInitData';

export default function InitData() {
  const initData = useTelegramInitData();

  return (
    <div>
      <h1>initData</h1>
      <pre>{JSON.stringify(initData, null, 2)}</pre>
    </div>
  );
}
```

---

Feel free to modify this README as needed for your specific project setup.
