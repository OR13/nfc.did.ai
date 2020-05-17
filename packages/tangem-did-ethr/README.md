# Tangem DID ETHR

Read a `did:ethr` from a Tangem NFC Card.

Returns:

```json
{
  "@context": "https://w3id.org/did/v1",
  "id": "did:ethr:0xedda369a60c37250BB31302188FB05fED71Dcf6A",
  "authentication": [
    {
      "type": "Secp256k1SignatureAuthentication2018",
      "publicKey": ["did:ethr:0xedda369a60c37250BB31302188FB05fED71Dcf6A#owner"]
    }
  ],
  "publicKey": [
    {
      "id": "did:ethr:0xedda369a60c37250BB31302188FB05fED71Dcf6A#owner",
      "type": "Secp256k1VerificationKey2018",
      "ethereumAddress": "0xedda369a60c37250bb31302188fb05fed71dcf6a",
      "owner": "did:ethr:0xedda369a60c37250BB31302188FB05fED71Dcf6A"
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
