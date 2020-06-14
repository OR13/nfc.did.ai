import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import BasePage from "../BasePage/BasePage";

import DemoUI from "./DemoUI";
const TangemWalletPage = ({ tmui, setTmuiProp }) => {
  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <Typography variant={"h5"} style={{ marginBottom: "32px" }}>
        Tangem
      </Typography>

      <Typography style={{ marginBottom: "32px" }}>
        This demo requires a local web server connected to an NFC Card Reader,
        because{" "}
        <a href="https://github.com/w3c/web-nfc/issues/578">
          web-nfc does not support custom APDUs
        </a>
        . <br />
        Learn more about{" "}
        <a href="https://tangem.com/" target="__blank">
          Tangem Cards
        </a>
        .
      </Typography>

      <DemoUI />
    </BasePage>
  );
};

TangemWalletPage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func,
};

export default TangemWalletPage;
