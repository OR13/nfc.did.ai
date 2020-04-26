import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import BasePage from "../BasePage/BasePage";
import Button from "@material-ui/core/Button";

const HomePage = ({ tmui, setTmuiProp }) => {
  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <Typography variant={"h5"} style={{ marginBottom: "32px" }}>
        Test
      </Typography>

      <Typography style={{ marginBottom: "32px" }}>
        See <a href="https://web.dev/nfc/">web.dev/nfc</a>.
      </Typography>

      <Button
        variant={"contained"}
        color={"secondary"}
        onClick={() => {
          if ("NDEFReader" in window) {
            const { NDEFReader } = window;
            /* Scan NFC tags */
            const reader = new NDEFReader();
            reader
              .scan()
              .then(() => {
                console.log("Scan started successfully.");
                reader.onerror = () => {
                  console.log(
                    "Cannot read data from the NFC tag. Try another one?"
                  );
                };
                reader.onreading = (event) => {
                  console.log("NDEF message read.");
                };
              })
              .catch((error) => {
                console.log(`Error! Scan failed to start: ${error}.`);
              });
          } else {
            alert("NFC Not Supported.");
          }
        }}
      >
        Scan for NFC
      </Button>
    </BasePage>
  );
};

HomePage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func,
};

export default HomePage;
