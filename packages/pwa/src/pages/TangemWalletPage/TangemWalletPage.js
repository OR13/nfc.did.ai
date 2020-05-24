import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import BasePage from "../BasePage/BasePage";
import Button from "@material-ui/core/Button";

import { JSONEditor } from "@transmute/material-did-core";

const TangemWalletPage = ({ tmui, setTmuiProp }) => {
  const [state, setState] = React.useState({});
  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <Typography variant={"h5"} style={{ marginBottom: "32px" }}>
        Tangem
      </Typography>

      <Typography style={{ marginBottom: "32px" }}>Work in progress</Typography>

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
                  console.log(event);
                  let parsedRecords = [];
                  const decoder = new TextDecoder();
                  for (const record of event.message.records) {
                    console.log("Record type:  " + record.recordType);
                    console.log("MIME type:    " + record.mediaType);
                    console.log("Record id:    " + record.id);
                    console.log(
                      "Record data:    " + decoder.decode(record.data)
                    );
                    parsedRecords.push({
                      id: record.id,
                      recordType: record.recordType,
                      mediaType: record.mediaType,
                      data: decoder.decode(record.data),
                    });
                  }
                  setState({ parsedRecords });
                  console.log("NDEF message read.");
                };
              })
              .catch((error) => {
                console.log(error);
                console.log(`Error! Scan failed to start: ${error}.`);
              });
          } else {
            alert("NFC Not Supported.");
          }
        }}
      >
        Read
      </Button>

      <JSONEditor value={JSON.stringify(state, null, 2)} />
    </BasePage>
  );
};

TangemWalletPage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func,
};

export default TangemWalletPage;
