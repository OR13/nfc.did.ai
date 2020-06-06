import { Tags, hexEncodedStringTags } from './Tags';

const select = (buffer: Buffer, i: number, j: number) => {
  return buffer
    .slice(i, j)
    .toString('hex')
    .toUpperCase();
};

export const tlvToObject = async (buffer: Buffer): Promise<any> => {
  const responseObject: any = {};
  while (buffer.length) {
    const tag = buffer.slice(0, 1);
    const tagHex = tag.toString('hex').toUpperCase();
    let length = buffer.slice(1, 2);
    let lengthInt = parseInt(length.toString('hex'), 16);

    // if (tagHex == '04') {
    //   console.log(tagHex);
    //   console.log(length);
    //   console.log(responseObject);
    //   console.log(buffer.toString('hex'));
    //   // length = Buffer.from('04', 'hex');
    // }
    // if (tagHex == '63') {
    //   console.log(tagHex);
    //   console.log(responseObject);
    //   console.log(buffer.toString('hex'));
    //   // length = Buffer.from('04', 'hex');
    // }

    // console.log(lengthInt);
    let value = buffer.slice(2, lengthInt + 2);

    let knownTag = Tags[tagHex];

    if (knownTag && !responseObject[knownTag]) {
      responseObject[knownTag] = value.toString('hex').toUpperCase();
      if (hexEncodedStringTags.indexOf(tagHex) !== -1) {
        responseObject[knownTag] = Buffer.from(
          responseObject[knownTag],
          'hex'
        ).toString();
      }
    } else {
      // console.log('warning overwrite...');
      responseObject[tagHex] = value.toString('hex').toUpperCase();
    }
    buffer = buffer.slice(lengthInt + 2, buffer.length);
  }
  return responseObject;
};

export const parseRequest = async (buffer: Buffer): Promise<any> => {
  const obj: any = {};

  obj['CLA'] = select(buffer, 0, 1);
  obj['INS'] = select(buffer, 1, 2);
  obj['P1'] = select(buffer, 2, 3);
  obj['P2'] = select(buffer, 3, 4);
  obj['P2'] = select(buffer, 3, 4);
  obj['Lc'] = select(buffer, 4, 5);
  obj['Tag'] = select(buffer, 5, 6);
  obj['Length'] = select(buffer, 6, 7);
  obj['Value'] = select(buffer, 7, buffer.length);
  obj['Parsed_Value'] = await tlvToObject(Buffer.from(obj['Value'], 'hex'));

  return obj;
};

export const parseResponse = async (buffer: Buffer): Promise<any> => {
  const obj: any = await tlvToObject(buffer);
  return obj;
};
