let addr = 4;
let block = 0;

const {
  NFC,
  TAG_ISO_14443_3,
  TAG_ISO_14443_4,
  KEY_TYPE_A,
  KEY_TYPE_B,
} = require("nfc-pcsc");

const ndef = require("ndef");
const fs = require("fs");
const path = require("path");
const nfc = new NFC(); // const nfc = new NFC(console); // optionally you can pass logger to see internal debug logs

const key = "FFFFFFFFFFFF"; // key must be a 12-chars HEX string, an instance of Buffer, or array of bytes
const keyType = KEY_TYPE_A;

const sleep = (seconds) => {
  return Promise.resolve(() => {
    setTimeout(resolve, seconds * 1000);
  });
};

const cardJson = require("./card.json");
const writeCard = async (reader) => {
  try {
    let addr = 4;

    while (addr <= 63) {
      if (addr % 4 === 0) {
        try {
          await reader.authenticate(addr, keyType, key);
        } catch (err) {
          console.error(e);
        }
      }
      if (block !== 3) {
        await reader.write(
          addr,
          Buffer.from(cardJson[addr.toString()], "hex"),
          16
        );
        block += 1;
      } else {
        block = 0;
      }
      addr += 1;
    }
    console.log("done");
  } catch (err) {
    console.error(`error when reading data`, err);
  }
};

nfc.on("reader", async (reader) => {
  //   console.info(`device attached`, reader);

  reader.on("card", async (card) => {
    if (card.type !== TAG_ISO_14443_3) {
      return;
    }
    await writeCard(reader);
  });

  reader.on("error", (err) => {
    console.error(`an error occurred`, reader, err);
  });

  reader.on("end", () => {
    console.info(`device removed`, reader);
  });
});

nfc.on("error", (err) => {
  console.error(`an error occurred`, err);
});
