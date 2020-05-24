import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import BasePage from "../BasePage/BasePage";
import { NXPWallet } from "../../components/NXPWallet";

import { UniversalWallet2020 } from "@transmute/universal-wallet";

import { ScanQRCodeDialog } from "../../components/ScanQRCodeDialog/ScanQRCodeDialog";

const NXPWalletPage = ({ tmui, setTmuiProp }) => {
  const [state, setState] = React.useState({
    status: "UNLOCKED",
    contents: [],
    render: false,
    qrScannerOpen: false,
  });

  React.useEffect(() => {
    // http://localhost:3000/nxp?seed=7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226
    (async () => {
      let contents = [];
      let status = "UNLOCKED";
      if (window.location.search.indexOf("?seed=") === 0) {
        let seed = window.location.search.split("?seed=").pop();
        const wallet = await UniversalWallet2020.generate(
          new Uint8Array(Buffer.from(seed, "hex"))
        );
        contents = wallet.contents;
        setState({
          contents,
          status,
          render: true,
          qrScannerOpen: false,
        });
      }
    })();
  }, []);

  const handleScanNfc = () => {
    if ("NDEFReader" in window) {
      const { NDEFReader } = window;
      /* Scan NFC tags */
      const reader = new NDEFReader();

      reader
        .scan()
        .then(() => {
          console.log("Scan started successfully.");
          reader.onerror = () => {
            console.log("Cannot read data from the NFC tag. Try another one?");
          };
          reader.onreading = async (event) => {
            console.log(event);
            let parsedRecords = [];
            const decoder = new TextDecoder();
            for (const record of event.message.records) {
              console.log("Record type:  " + record.recordType);
              console.log("MIME type:    " + record.mediaType);
              console.log("Record id:    " + record.id);
              console.log("Record data:    " + decoder.decode(record.data));
              parsedRecords.push({
                id: record.id,
                recordType: record.recordType,
                mediaType: record.mediaType,
                data: decoder.decode(record.data),
              });
            }
            console.log("parsedRecords...", parsedRecords);
            // setState({ parsedRecords });
            let contents = [];
            let status = "UNLOCKED";
            if (
              parsedRecords.length &&
              parsedRecords[0].data.indexOf("https://nfc.did.ai") === 0
            ) {
              const url = new URL(parsedRecords[0].data);
              let seed = url.search.split("?seed=").pop();
              const wallet = await UniversalWallet2020.generate(
                new Uint8Array(Buffer.from(seed, "hex"))
              );
              contents = wallet.contents;
              setState({
                contents,
                status,
                render: true,
                qrScannerOpen: false,
              });
            }

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
  };

  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <Typography variant={"h5"} style={{ marginBottom: "32px" }}>
        NXP Wallet
      </Typography>

      <Typography style={{ marginBottom: "32px" }}>
        Wallet seed's are encoded in URLs that look like: <br />
        <div>
          <Link
            style={{ wordBreak: "break-all" }}
            href="https://nfc.did.ai/nxp?seed=7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226"
          >
            https://nfc.did.ai/nxp?seed=7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226
          </Link>
        </div>
      </Typography>

      <ScanQRCodeDialog
        open={state.qrScannerOpen}
        onClose={() => {
          setState({
            ...state,
            qrScannerOpen: false,
          });
        }}
        onSubmit={async (data) => {
          const _url = JSON.parse(data).data;
          let contents = [];
          let status = "UNLOCKED";
          const url = new URL(_url);
          let seed = url.search.split("?seed=").pop();
          const wallet = await UniversalWallet2020.generate(
            new Uint8Array(Buffer.from(seed, "hex"))
          );
          contents = wallet.contents;
          setState({
            contents,
            status,
            render: true,
            qrScannerOpen: false,
          });
        }}
      />

      {!state.render && (
        <div>
          <div style={{ marginBottom: "32px" }}>
            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={handleScanNfc}
            >
              Read NFC
            </Button>

            <Typography style={{ marginTop: "8px" }}>
              Scan an NFC Tag with an NDEF URL Record.
            </Typography>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <Button
              variant={"contained"}
              onClick={() => {
                setState({
                  ...state,
                  qrScannerOpen: true,
                });
              }}
            >
              Read QR
            </Button>
            <Typography style={{ marginTop: "8px" }}>
              Scan an QR Code of a URL.
            </Typography>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={async () => {
                if ("NDEFWriter" in window) {
                  const { NDEFWriter } = window;
                  const writer = new NDEFWriter();
                  await writer.write({
                    records: [
                      {
                        recordType: "url",
                        data:
                          "https://nfc.did.ai/nxp?seed=7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226",
                      },
                    ],
                  });
                }
              }}
            >
              Write NFC
            </Button>
            <Typography style={{ marginTop: "8px" }}>
              Write an NFC Tag NDEF URL Record.
            </Typography>
          </div>
        </div>
      )}
      {state.render && <NXPWallet {...state} />}
    </BasePage>
  );
};

NXPWalletPage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func,
};

export default NXPWalletPage;
