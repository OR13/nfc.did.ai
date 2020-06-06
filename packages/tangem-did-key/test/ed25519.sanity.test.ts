const { Ed25519KeyPair } = require('crypto-ld');

describe('ed25519.sanity', () => {
  it('card response to did document', async () => {
    const keypair = await Ed25519KeyPair.generate({
      seed: Buffer.from(
        '7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226',
        'hex'
      ),
    });
    const raw_transaction = Buffer.from('');
    const signer = keypair.signer();
    const signature = await signer.sign({ data: raw_transaction });
    expect(signature.toString('hex')).toBe(
      'f3f042cb6fdd2c98399a9318fc57fd9b9d363d38f47c8220f9d8a4a9752fac9e6a67fc48b4e691552724eacf8ac2a9ac5557e7f6d7cfd7728d336b736a6f3a08'
    );
    const verifier = keypair.verifier();
    const verified = await verifier.verify({
      data: raw_transaction,
      signature,
    });
    expect(verified).toBe(true);
  });
});
