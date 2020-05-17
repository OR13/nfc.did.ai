import { Tags } from './Tags';

export const tlvToObject = async (buffer: Buffer): Promise<any> => {
  const responseObject: any = {};
  while (buffer.length) {
    let tag = buffer.slice(0, 1);
    let length = buffer.slice(1, 2);
    let lengthInt = parseInt(length.toString('hex'), 16);
    let value = buffer.slice(2, lengthInt + 2);

    let knownTag = Tags[tag.toString('hex').toUpperCase()];
    if (knownTag) {
      responseObject[knownTag] = value.toString('hex').toUpperCase();
    }
    buffer = buffer.slice(lengthInt + 2, buffer.length);
  }
  return responseObject;
};
