import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { JSONEditor } from "@transmute/material-did-core";

import _ from "lodash";
import QrReader from "react-qr-reader";

let context = new AudioContext();

const beep = _.throttle((freq = 300, duration = 200, vol = 50) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  oscillator.frequency.value = freq;
  oscillator.type = "sine";
  gain.connect(context.destination);
  gain.gain.value = vol * 0.01;
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + duration * 0.001);
}, 1 * 1000);

export class ScanQRCodeDialog extends React.Component {
  state = {
    data: "",
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.data);
  };

  render() {
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Scan QR Code</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <QrReader
                  delay={100}
                  resolution={800}
                  onError={() => {
                    // do nothing
                  }}
                  onScan={(data) => {
                    if (data) {
                      beep(300, 300, 25);
                      this.setState({
                        data: JSON.stringify({ data }, null, 2),
                      });
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <JSONEditor
                  value={this.state.data}
                  // style={{ height: "128px" }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              variant="contained"
            >
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ScanQRCodeDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ScanQRCodeDialog;
