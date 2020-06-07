import crypto from 'crypto';

describe('ed25519.node.sanity', () => {
  it('sign and verify', async () => {
    const { publicKey, privateKey } = (crypto as any).generateKeyPairSync(
      'ed25519'
    );

    console.log(publicKey);

    const message = 'Hello world!';
    console.log(message);

    const signature = crypto.sign(null, Buffer.from(message), privateKey);
    console.log(signature.toString('hex'));

    const verified = crypto.verify(
      null,
      Buffer.from(message),
      publicKey,
      signature
    );
    console.log('Match:', verified);
  });
});
