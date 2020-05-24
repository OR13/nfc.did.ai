import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import BasePage from "../BasePage/BasePage";
import Link from "@material-ui/core/Link";

const HomePage = ({ tmui, setTmuiProp }) => {
  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <Typography variant={"h6"} style={{ marginBottom: "32px" }}>
        <Link href="https://w3c.github.io/web-nfc/">web-nfc</Link> experiments
      </Typography>

      <div style={{ marginBottom: "32px" }}>
        <Link href="/nxp">NXP Wallet</Link>
        <Typography style={{ padding: "8px" }}>
          "MIFARE Classic ICs started a revolution in the contactless smart card
          business back in 1994."
        </Typography>
        <Link
          style={{ padding: "8px" }}
          href="https://www.nxp.com/products/rfid-nfc/mifare-hf/mifare-classic:MC_41863"
        >
          nxp.com
        </Link>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <Link href="/tangem">Tangem Wallet</Link>
        <Typography style={{ padding: "8px" }}>
          "Our chip-to-chain technology creates a form of digital trust unlike
          anything the world has ever seen."
        </Typography>
        <Link style={{ padding: "8px" }} href="https://tangem.com/">
          tangem.com
        </Link>
      </div>
    </BasePage>
  );
};

HomePage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func,
};

export default HomePage;
