import React from "react";
import NXPWalletPage from "./NXPWalletPage";

import { compose } from "redux";

import tmui from "../../store/tmui";

const container = compose(tmui.container);

export default container((props) => {
  return <NXPWalletPage {...props} />;
});
