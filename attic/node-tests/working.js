const { NFC } = require("nfc-pcsc");
const crypto = require("crypto");

const logger = console;

const nfc = new NFC(logger); // optionally you can pass logger

const pin1 = crypto
  .createHash("sha256")
  .update(Buffer.from("000000"))
  .digest("hex");

const depersonalize = async (reader) => {
  const packet = Buffer.from(
    [
      "FF", // CLA
      "E2", // INS
      "00", // P1
      "00", // P2
    ].join(""),
    "hex"
  );
  const response = await reader.transmit(packet, 1024);
  console.log("response: ", response.toString("hex"));
  // const statusCode = response.slice(-2).readUInt16BE(0);
  // console.log({ statusCode });
};

const readCard = async (reader) => {
  const packet = Buffer.from(
    [
      "FF", // CLA
      "f2", // INS
      "00", // P1
      "00", // P2
      "22", // Lc
      "10", // TAG
      "20", // Length
      pin1, // Value,
    ].join(""),
    "hex"
  );

  // 1c 02 00 88 97 89
  // 1c 02 00 83 97 89

  const response = await reader.transmit(packet, 762);
  console.log("response: ", response.toString("hex"));
  // const statusCode = response.slice(-2).readUInt16BE(0);
  // console.log({ statusCode });
};

nfc.on("reader", (reader) => {
  reader.autoProcessing = false;
  console.log(`${reader.reader.name}  device attached`);

  reader.on("card", async (card) => {
    // console.log(card);
    // const uid = await getUID(reader);
    // console.log({ uid });
    await readCard(reader);
    // await depersonalize(reader);
  });
});
