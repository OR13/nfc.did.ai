const { NFC } = require("nfc-pcsc");
// const crypto = require("crypto");

const logger = console;

const nfc = new NFC(logger); // optionally you can pass logger

const getUID = async (reader) => {
  const packet = new Buffer.from([
    0xff, // Class
    0xca, // INS
    0x00, // P1: Get current card UID
    0x00, // P2
    0x00, // Le: Full Length of UID
  ]);
  const response = await reader.transmit(packet, 12);
  const uid = response.slice(0, -2).toString("hex");
  return uid;
};

// const writeRecord = async (reader) => {
//   const packet = new Buffer.from([
//     0xff, // Class
//     0xca, // INS
//     0x00, // P1: Get current card UID
//     0x00, // P2
//     0x00, // Le: Full Length of UID
//   ]);
//   const response = await reader.transmit(packet, 12);
//   const uid = response.slice(0, -2).toString("hex");
//   return uid;
// };

const readRecord = async (reader) => {
  const packet = Buffer.from(
    [
      "FF", // CLA
      "B0", // INS
      "00", // P1
      "04", // P2
      "10",
    ].join(""),
    "hex"
  );
  const response = await reader.transmit(packet, 32);
  console.log(response.toString("hex"));
};

nfc.on("reader", (reader) => {
  reader.autoProcessing = true;
  console.log(`${reader.reader.name}  device attached`);

  reader.on("card", async (card) => {
    console.log(card);

    await readRecord(reader);
  });
});
