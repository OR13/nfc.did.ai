import { NFC } from 'nfc-pcsc';
// import crypto from 'crypto';
import { resolveFromCard, signWithCard } from '../src';
// const bs58 = require('bs58');

const { Ed25519KeyPair } = require('crypto-ld');

const nfc = new NFC();

const pin1 = '000000';
const pin2 = '000';
// const hashAlg = 'sha-512';

const createVerifyData =
  '65794a68624763694f694a465a45525451534973496d49324e4349365a6d467363325573496d4e79615851694f6c7369596a5930496c31392ee511ffbb92a58dc5c01ebefd6e47ccabb82069ff65ac196c2aca24197b850c6c5db18d6c02aadf5fa707c0f74750dbb149cb5819a1e2faaa5f1a858c01cf0457';
const raw_transaction = Buffer.from(createVerifyData, 'hex');

const signatureHex =
  '9422a38470550232ae6f0daaddf8856ba9509fd16ca49222d1f2a641d255a7337df78d7cb1717d4e14e85425ebe335d24df06c03aaf49c9e4b5032d82721cb06';
describe('ed25519.tangem', () => {
  let reader: any;
  let key: any;
  beforeAll(done => {
    nfc.on('reader', (_reader: any) => {
      reader = _reader;
      _reader.autoProcessing = false;
      _reader.on('card', async () => {
        reader;
        done();
      });
    });
  });

  afterAll(async () => {
    await reader.disconnect();
  });

  it('key assertions', async () => {
    const didDoc = await resolveFromCard(reader, pin1);
    key = await Ed25519KeyPair.from(didDoc.publicKey[0]);
    key.signer = () => {
      return {
        async sign({ data }: any) {
          const createVerifyData = data.toString('hex');
          const signature = await signWithCard(
            reader,
            createVerifyData,
            pin1,
            pin2
          );
          return Buffer.from(signature, 'hex');
        },
      };
    };

    expect(key.publicKeyBase58).toBe(
      'Hvo3cmQsvSWCJr8Z4KyLhJ4JiDL147RfbrZ4a6UefLiT'
    );
  });

  it('sign', async () => {
    const signer = key.signer();
    const signature = await signer.sign({ data: raw_transaction });
    expect(signature.toString('hex')).toBe(signatureHex);
  });

  it('verify', async () => {
    const verifier = key.verifier();

    const verified = await verifier.verify({
      data: raw_transaction,
      signature: Buffer.from(signatureHex, 'hex'),
    });

    expect(verified).toBe(true);
  });
});
