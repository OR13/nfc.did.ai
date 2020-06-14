import crypto from 'crypto';

const leftPad = (val: string, size: number, ch: string) => {
  var result = String(val);
  if (!ch) {
    ch = ' ';
  }
  while (result.length < size) {
    result = ch + result;
  }
  return result;
};

export const signMessageRaw = async (
  reader: any,
  message: string,
  cid: string = 'BB03000000000004',
  pin1: string = '000000',
  pin2: string = '000'
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

  let messageLengthHex = leftPad((message.length / 2).toString(16), 4, '0');
  let Lc = leftPad((85 + message.length / 2).toString(16), 6, '0');
  let messageLengthHexNoPad = leftPad(
    (message.length / 2).toString(16),
    2,
    '0'
  );

  const packetString = [
    '00', // CLA
    'FB', // INS
    '00', // P1
    '00', // P2
    Lc, // Lc
    '0108' + cid,
    '1020' + pin1Hex,
    '1120' + pin2Hex,
    '5101' + messageLengthHexNoPad,
    '50FF' + messageLengthHex + message,
  ]
    .join('')
    .toUpperCase();

  const packet = Buffer.from(packetString, 'hex');
  const response = await reader.transmit(packet, 8192);
  return response;
};
