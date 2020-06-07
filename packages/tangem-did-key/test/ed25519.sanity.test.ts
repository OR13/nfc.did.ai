const chloride = require('chloride');
const { Ed25519KeyPair } = require('crypto-ld');
const bs58 = require('bs58');

const key = {
  id:
    'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
  type: 'Ed25519VerificationKey2018',
  controller: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
  publicKeyBase58: '5yKdnU7ToTjAoRNDzfuzVTfWBH38qyhE1b9xh4v8JaWF',
  privateKeyBase58:
    '28xXA4NyCQinSJpaZdSuNBM4kR2GqYb8NPqAtZoGCpcRYWBcDXtzVAzpZ9BAfgV334R2FC383fiHaWWWAacRaYGs',
};

const createVerifyData =
  '65794a68624763694f694a465a45525451534973496d49324e4349365a6d467363325573496d4e79615851694f6c7369596a5930496c31392ee511ffbb92a58dc5c01ebefd6e47ccabb82069ff65ac196c2aca24197b850c6c5db18d6c02aadf5fa707c0f74750dbb149cb5819a1e2faaa5f1a858c01cf0457';
const raw_transaction = Buffer.from(createVerifyData, 'hex');

const signatureHex =
  'b3d9ec8249ab3781491ce7dc1059badf751a68c7a70898b2904de26dd4f3ad624c84f6911854a95955c6ae14de6fe914737c1528101cc504b385023e38c7990d';

describe('ed25519.sanity', () => {
  it('chloride.sign', () => {
    const privateKey = bs58.decode(key.privateKeyBase58);
    const signature = chloride.crypto_sign_detached(
      raw_transaction,
      privateKey
    );
    expect(signature.toString('hex')).toBe(signatureHex);
  });

  it('chloride.verify', () => {
    const publicKey = bs58.decode(key.publicKeyBase58);
    const signature = Buffer.from(signatureHex, 'hex');
    const verified = chloride.crypto_sign_verify_detached(
      signature,
      raw_transaction,
      publicKey
    );
    expect(verified).toBe(true);
  });

  it('Ed25519KeyPair.sign', async () => {
    const keypair = await Ed25519KeyPair.from(key);
    const signer = keypair.signer();
    const signature = await signer.sign({ data: raw_transaction });
    expect(signature.toString('hex')).toBe(signatureHex);
  });

  it('Ed25519KeyPair.verify', async () => {
    const keypair = await Ed25519KeyPair.from(key);
    const verifier = keypair.verifier();
    const verified = await verifier.verify({
      data: raw_transaction,
      signature: Buffer.from(signatureHex, 'hex'),
    });
    expect(verified).toBe(true);
  });
});
