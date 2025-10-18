import { account } from "./appwrite";

export function loginWithGoogle() {
  // This will redirect user to Google
  account.createOAuth2Session(
    "google" as any,
    "http://localhost:3000/pages/CRUDtsx/dashboard", // success
    "http://localhost:3000/pages/CRUDtsx/login" // failure
  );
}
