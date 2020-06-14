import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import BasePage from "../BasePage/BasePage";

import DemoUI from "./DemoUI";
const TangemWalletPage = ({ tmui, setTmuiProp }) => {
  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <Typography variant={"h5"} style={{ marginBottom: "32px" }}>
        In this demo, we use{" "}
        <a href="https://github.com/transmute-industries/did-key.js">did:key</a>{" "}
        and <a href="https://shop.tangem.com">tangem cards</a> to resolve a DID,
        and issue credentials from the associated private key. This is a demo of
        hardware isolated, offline capable decentralized identifiers and
        verifiable credentials powered by NFC.
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography style={{ marginBottom: "32px" }}>
            This demo requires a local web server connected to an NFC Card
            Reader, because{" "}
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
          <iframe
            src="https://drive.google.com/file/d/1pwcI97c65gv_a-wVjRc-bZZiNI6eey_u/preview"
            width="640"
            height="480"
          ></iframe>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DemoUI />
        </Grid>
      </Grid>
    </BasePage>
  );
};

TangemWalletPage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func,
};

export default TangemWalletPage;
