import { signRaw } from './signRaw';
import { NFC } from 'nfc-pcsc';
// import { tlvToObject } from '../TLV';

// const logger = console;
const nfc = new NFC();
// logger // optionally you can pass logger

describe('signRaw', () => {
  it('signRaw', (done: any) => {
    nfc.on('reader', (reader: any) => {
      reader.autoProcessing = false;
      reader.on('card', async () => {
        const createVerifyData =
          '2705649CD255A07EFDF3528B4D63FB60CE18C85E403F66D3BA7F1F63D476A3E34225F6F5659785180C313895EEFEB1B4340E897210C7F770BE2A1C7142435B9E';
        const pin1 = '000000';
        const pin2 = '000';
        const hashAlg = 'sha-512';
        const response = await signRaw(
          reader,
          createVerifyData,
          pin1,
          pin2,
          hashAlg
        );
        expect(response).toBeDefined();
        expect(response.toString('hex')).toBe(
          '0108bb030000000000045040aed9605f8560c31dbf29c55369b6c89ce5ab981e7d2135c8f9c61f568298dee7f57758fd3e5a5f114fe9dbe7e3ee90a4f3cbe85aa0bcf395d103bdc67f8580b3614071dcccedd9e903593b0cc3f8306374b59a25717b0840007a300677c310ca9dbeddd5f74426961c146689c3622afcf473f3a6b0d739df36bab9fe5ef92631380d6204000f423d6304000000029000'
        );
        // let parsed_response = await tlvToObject(response);
        // console.log('parsed response: ', parsed_response);

        done();
      });
    });
  });
});
