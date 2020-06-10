import crypto from 'crypto';

export const signMessageHash = async (
  reader: any,
  createVerifyData: string,
  pin1: string = '000000',
  pin2: string = '000',
  hashAlg: string = 'sha-512'
) => {
  // 91B4D142823F7D20C5F08DF69122DE43F35F057A988D9619F6D3138485C9A203
  const pin1Hex = crypto
    .createHash('sha256')
    .update(Buffer.from(pin1))
    .digest('hex');

  // 2AC9A6746ACA543AF8DFF39894CFE8173AFBA21EB01C6FAE33D52947222855EF
  const pin2Hex = crypto
    .createHash('sha256')
    .update(Buffer.from(pin2))
    .digest('hex');

  // console.log(pin2Hex.toUpperCase());
  const TAG_CardID = '0108' + 'BB03000000000004';
  const TAG_PIN2 = '1120' + pin2Hex;
  let trLen = (createVerifyData.length / 2).toString(16);
  const TAG_TrOut_Raw =
    `52${trLen}` +
    // createVerifyData...
    createVerifyData;

  const TAG_HashAlgID = '0607' + Buffer.from(hashAlg).toString('hex');
  let Lc =
    6 +
    4 +
    pin1Hex.length +
    TAG_CardID.length +
    TAG_PIN2.length +
    TAG_TrOut_Raw.length +
    TAG_HashAlgID.length +
    1;

  // console.log('Lc', Lc);

  const packetString = [
    '00', // CLA
    'FB', // INS
    '00', // P1
    '00', // P2
    `000${Lc.toString(16)}`, // Lc
    '10', // TAG
    '20', // Length
    pin1Hex, // Value,
    TAG_CardID,
    TAG_PIN2,
    TAG_TrOut_Raw,
    TAG_HashAlgID,
  ]
    .join('')
    .toUpperCase();

  // console.log(packetString);

  const packet = Buffer.from(packetString, 'hex');
  const response = await reader.transmit(packet, 8192);
  return response;
};
