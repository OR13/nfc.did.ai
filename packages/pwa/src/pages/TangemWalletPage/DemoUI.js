import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { DIDDocumentPreview, JSONEditor } from "@transmute/material-did-core";

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1",
  ],
  id: "http://example.gov/credentials/3732",
  type: ["VerifiableCredential", "UniversityDegreeCredential"],
  issuer: "did:example:123",
  issuanceDate: "2020-03-10T04:24:12.164Z",
  credentialSubject: {
    id: "did:example:456",
    degree: {
      type: "BachelorDegree",
      name: "Bachelor of Science and Arts",
    },
  },
};

async function resolveFromCard() {
  // Default options are marked with *
  const response = await fetch("http://localhost:8089/tangem/resolve", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function issueCredentialFromCard(credential) {
  // Default options are marked with *
  const response = await fetch("http://localhost:8089/tangem/issue", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ credential: JSON.parse(credential) }), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const [state, setState] = React.useState({
    credential: JSON.stringify(credential, null, 2),
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderHardwarePrompt = () => {
    return (
      <Typography style={{ marginBottom: "32px" }}>
        Make sure the{" "}
        <a href="https://github.com/OR13/nfc.did.ai/tree/master/packages/tangem-server">
          local web server
        </a>{" "}
        is running and place a Tangem card on the reader before proceeding.
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Resolve" {...a11yProps(0)} />
          <Tab label="Issue" {...a11yProps(1)} />
          {/* <Tab label="Prove" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {renderHardwarePrompt()}
        <Button
          variant={"contained"}
          color={"secondary"}
          onClick={async () => {
            const { didDocument } = await resolveFromCard();
            setState({
              didDocument,
            });
          }}
        >
          Resolve
        </Button>

        {state.didDocument && (
          <div style={{ marginTop: "16px" }}>
            {/* <JSONEditor value={JSON.stringify(state.didDocument, null, 2)} /> */}
            <DIDDocumentPreview didDocument={state.didDocument} />
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderHardwarePrompt()}
        <Button
          variant={"contained"}
          color={"secondary"}
          style={{ marginBottom: "16px" }}
          onClick={async () => {
            const { verifiableCredential } = await issueCredentialFromCard(
              state.credential
            );
            setState({
              ...state,
              credential: JSON.stringify(verifiableCredential, null, 2),
            });
          }}
        >
          Issue Credential
        </Button>

        <JSONEditor
          value={state.credential}
          onChange={(data) => {
            setState({
              ...state,
              credential: data,
            });
          }}
        />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
}
