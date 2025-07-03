import { seedDatabase } from "@/local_database/seedDb";
import * as admin from "firebase-admin";
console.log(process.env);

if (process.env.NODE_ENV === "test") {
  console.log("using Firebase **test** DB");
  // We won't be using firebase for testing for now. At some point,
  // we might want to run tests against the Staging firebase instance.
  throw new Error(
    ` This will connect to the production firestore. 
      Make sure db/firebase.ts is updated before testing against Firebase`,
  );
}
if (!admin.apps.length && process.env.NODE_ENV == "development") {
  console.log("using Firebase **development** DB");

  if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log("using Firebase **emulator** DB");

    admin.initializeApp({
      projectId: "touch-swap",
      storageBucket: "touch-swap.appspot.com",
    });

    seedDatabase();
  } else {
    admin.initializeApp({
      storageBucket: "touch-swap.appspot.com",
    });
  }
} else {
  if (!admin.apps.length && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("using Firebase live DB");
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      storageBucket: "touch-swap.appspot.com",
    });
  }
}

export { admin };
