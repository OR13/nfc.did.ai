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
      "00", // CLA
      "E3", // INS
      "00", // P1
      "00", // P2
    ]
      .join("")
      .toUpperCase(),
    "hex"
  );
  const response = await reader.transmit(packet, 1024);
  console.log("response: ", response.toString("hex"));
};

nfc.on("reader", (reader) => {
  reader.autoProcessing = false;
  console.log(`${reader.reader.name}  device attached`);
  console.log("\n\nDEPERSONALIZE \n\n ");
  reader.on("card", async (card) => {
    await depersonalize(reader);
  });
});
