import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import BasePage from "../BasePage/BasePage";

const HomePage = ({ tmui, setTmuiProp }) => {
  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <Typography variant={"h5"} style={{ marginBottom: "32px" }}>
        Test
      </Typography>

      <Typography style={{ marginBottom: "32px" }}>
        See <a href="https://web.dev/nfc/">web.dev/nfc</a>.
      </Typography>
    </BasePage>
  );
};

HomePage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func,
};

export default HomePage;
