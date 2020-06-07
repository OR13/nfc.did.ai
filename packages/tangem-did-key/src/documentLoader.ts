import resolver from './resolver';

const jsonld = require('jsonld');

const documentLoader = async (url: string) => {
  // console.log(url);
  if (url.indexOf('did:') === 0) {
    const didDoc = await resolver.resolve(url.split('#')[0]);

    return {
      contextUrl: null, // this is for a context via a link header
      document: didDoc, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }

  try {
    let data = await jsonld.documentLoader(url);
    return data;
  } catch (e) {
    console.error('No remote context support for ' + url);
    throw new Error('No custom context support for ' + url);
  }
};

export default documentLoader;
