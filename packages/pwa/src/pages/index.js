import HomePage from "./HomePage";
import NXPWalletPage from "./NXPWalletPage";
import TangemWalletPage from "./TangemWalletPage";
export const PAGES = [
  { path: "/", exact: true, component: HomePage },
  { path: "/nxp", exact: true, component: NXPWalletPage },
  { path: "/tangem", exact: true, component: TangemWalletPage },
];
