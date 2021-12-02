const { httpGet } = require('./mock-http-interface');

/**
 *
 * @param {string[]} urls Accepts array of urls to be processed
 * @returns {Promise} Url response array as promise
 */
const getArnieQuotes = async (urls) => {
  return Promise.all(
    urls.map(url => httpGet(url)
      .then(result => getArnieQuoteResponse(result))
      .catch(error => console.log(`Handle error : ${error}`))));
};

/**
 *
 * @param {Object} result Result object from url response
 * @returns {Object} Results object that contains the appropriate message.
 */
const getArnieQuoteResponse = (result) => {
  //Created an enum to store success and failure messages. This can be saved in config later.
  const messageEnum = Object.freeze({ success: 'Arnie Quote', failure: 'FAILURE' })
  const body = JSON.parse(result.body).message;
  //Return success or failure response.
  return result.status === 200 ? { [messageEnum.success]: body } : { [messageEnum.failure]: body };
}

module.exports = {
  getArnieQuotes,
};
