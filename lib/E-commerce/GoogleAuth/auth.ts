import { account } from "../appwriteEcommerce";

export function loginWithGoogle() {
  account.createOAuth2Session(
    "google",
    "http://localhost:3000/pages/E-Commerce/", // success
    "http://localhost:3000/pages/CRUDtsx/login", // failure
    ["openid", "email", "profile"], // scopes
    {
      prompt: "select_account", // 👈 forces Google to always ask which account
    }
  );
}
