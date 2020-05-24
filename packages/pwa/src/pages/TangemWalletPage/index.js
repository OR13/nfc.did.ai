import React from "react";
import TangemWalletPage from "./TangemWalletPage";

import { compose } from "redux";

import tmui from "../../store/tmui";

const container = compose(tmui.container);

export default container((props) => {
  return <TangemWalletPage {...props} />;
});
