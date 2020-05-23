import crypto from 'crypto';

export const signRaw = async (reader: any, pin1: string) => {
  const pin1Hex = crypto
    .createHash('sha256')
    .update(Buffer.from(pin1))
    .digest('hex');

  const packet = Buffer.from(
    [
      '00', // CLA
      'F2', // INS
      '00', // P1
      '00', // P2
      '22', // Lc
      '10', // TAG
      '20', // Length
      pin1Hex, // Value,
    ]
      .join('')
      .toUpperCase(),
    'hex'
  );
  const response = await reader.transmit(packet, 4096);
  // console.log("response: ", response.toString("hex"));
  return response;
};
