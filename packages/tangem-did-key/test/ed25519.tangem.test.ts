import { NFC } from 'nfc-pcsc';
import crypto from 'crypto';
import { resolveFromCard, signWithCard } from '../src';

const { Ed25519KeyPair } = require('crypto-ld');

const nfc = new NFC();

const pin1 = '000000';
const pin2 = '000';
const hashAlg = 'sha-512';

describe('ed25519.tangem', () => {
  let reader: any;
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
  it('card response to did document', async () => {
    const didDoc = await resolveFromCard(reader, pin1);
    let publicKey = didDoc.publicKey[0];
    let key = await Ed25519KeyPair.from(publicKey);
    key.signer = () => {
      return {
        async sign({ data }: any) {
          const createVerifyData = data.toString('hex');
          const signature = await signWithCard(
            reader,
            createVerifyData,
            pin1,
            pin2,
            hashAlg
          );
          return Buffer.from(signature, 'hex');
        },
      };
    };

    const createVerifyData =
      '65794a68624763694f694a465a45525451534973496d49324e4349365a6d467363325573496d4e79615851694f6c7369596a5930496c31392ee511ffbb92a58dc5c01ebefd6e47ccabb82069ff65ac196c2aca24197b850c6c5db18d6c02aadf5fa707c0f74750dbb149cb5819a1e2faaa5f1a858c01cf0457';
    const raw_transaction = Buffer.from(createVerifyData, 'hex');
    const signer = key.signer();
    const signature = await signer.sign({ data: raw_transaction });
    expect(signature.toString('hex')).toBe(
      '490f4776e3a74b3abf5866a792769e0dac9f949b11beebae94a8ecb19968dc78cc39b6d757c8cc96895cc6e03415e4abe20a51bb8629c208f6447f3f33e1d507'
    );
    const verifier = key.verifier();

    const txHash = crypto
      .createHash('sha512')
      .update(raw_transaction)
      .digest('hex')
      .toUpperCase();

    const verified = await verifier.verify({
      data: Buffer.from(txHash, 'hex'),
      signature,
    });

    expect(verified).toBe(true);
  });
});
