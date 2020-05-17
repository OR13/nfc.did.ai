const { NFC } = require("nfc-pcsc");

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

describe("main", () => {
  it("main", () => {
    console.log("asdf");

    const nfc = new NFC(); // optionally you can pass logger

    nfc.on("reader", (reader) => {
      console.log(`${reader.reader.name}  device attached`);

      // enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
      // when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
      // the response is available as card.data in the card event
      // see examples/basic.js line 17 for more info
      // reader.aid = 'F222222222';

      reader.on("card", (card) => {
        // card is object containing following data
        // [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
        // [always] String standard: same as type
        // [only TAG_ISO_14443_3] String uid: tag uid
        // [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

        console.log(`${reader.reader.name}  card detected`, card);
      });
    });
  });
});
