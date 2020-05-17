# Tangem DID Key

Read a `did:key` from a Tangem NFC Card.

Returns:

```json
{
  "@context": ["https://w3id.org/did/v0.11"],
  "id": "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53",
  "publicKey": [
    {
      "id": "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53#z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53",
      "publicKeyBase58": "6EGAAV1uypKgYbyPZS9V8KiRDQncbk8iYQCqcRgXA4Hf"
    }
  ],
  "authentication": [
    "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53#z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53"
  ],
  "assertionMethod": [
    "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53#z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53"
  ],
  "capabilityDelegation": [
    "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53#z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53"
  ],
  "capabilityInvocation": [
    "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53#z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53"
  ],
  "keyAgreement": [
    {
      "id": "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53#z6LSkeZSZoC3wnXkeqLtjmp5HnzEYN45JukvvJKf7zkN6tpu",
      "type": "X25519KeyAgreementKey2019",
      "controller": "did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53",
      "publicKeyBase58": "9yPH3VPBrKp1ZSy8D8J7yCmkhDWxcJan3KbydY6qPX49"
    }
  ]
}
```

### Getting Started

```sh
# this demo uses unpublished node modules from a mono repo
# You must bootstrap to make them available.
npx lerna bootstrap
npm run test
```

Tested with OMNIKEY 5021 CL:

```
OMNIKEY CardMan (076B:5320) 5321  device attached
```

Be sure that you device can read large APDUs.
