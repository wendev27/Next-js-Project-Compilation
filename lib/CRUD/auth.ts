import { account } from "./appwrite";
import type { OAuthProvider } from "appwrite";

export function loginWithGoogle() {
  // Redirect user to Google login
  account.createOAuth2Session(
    "google" as OAuthProvider,
    "http://localhost:3000/pages/CRUDtsx/dashboard", // success
    "http://localhost:3000/pages/CRUDtsx/login" // failure
  );
}
