import { account } from "../appwriteEcommerce";

export function loginWithGoogle() {
  const endpoint = account.client.config.endpoint;
  const project = account.client.config.project;

  window.location.href = `${endpoint}/account/sessions/oauth2/google?project=${project}&success=http://localhost:3000/pages/E-Commerce/&failure=http://localhost:3000/pages/CRUDtsx/login&scopes=openid,email,profile&prompt=select_account`;
}
