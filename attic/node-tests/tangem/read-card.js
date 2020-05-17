const { NFC } = require("nfc-pcsc");
const crypto = require("crypto");

const logger = console;

const nfc = new NFC(logger); // optionally you can pass logger

const pin1 = crypto
  .createHash("sha256")
  .update(Buffer.from("000000"))
  .digest("hex");

const readCard = async (reader) => {
  const packet = Buffer.from(
    [
      "00", // CLA
      "F2", // INS
      "00", // P1
      "00", // P2
      "22", // Lc
      "10", // TAG
      "20", // Length
      pin1, // Value,
    ]
      .join("")
      .toUpperCase(),
    "hex"
  );

  const response = await reader.transmit(packet, 4096);
  console.log("response: ", response.toString("hex"));
};

nfc.on("reader", (reader) => {
  reader.autoProcessing = false;
  console.log(`${reader.reader.name}  device attached`);
  console.log("\n\nREAD CARD \n\n ");

  reader.on("card", async (card) => {
    await readCard(reader);
  });
});
