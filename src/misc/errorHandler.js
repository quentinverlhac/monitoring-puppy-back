// If an unhandled error occurs during the request, send an error message to front
function handleError(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error: something went wrong dealing with your request');
}

module.exports = handleError;

