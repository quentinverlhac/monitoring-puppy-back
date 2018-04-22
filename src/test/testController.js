// This function sends responses randomly
// It uses a changing cosinus threshold to determine whether to response successfully or not
// This simulates a website that periodically goes up and down
function cosResponse(req, res) {
  // The period is set to 2 minutes, so the website will be up roughly every two minutes
  const period = 120000;
  // The threshold is a cosinus oscillating between 0 and 1
  const threshold = 0.5 + Math.cos((Math.PI * Date.now()) / period) / 2;
  // Compare a random float to the threshold to determine if the response will be successful or not
  const rand = Math.random();
  if (rand > threshold) {
    // Successful response
    console.log('Up');
    res.send('Hello World!');
  } else {
    // Error response
    console.log('Down');
    res.status('404').send('Error: not found');
  }
}

// This function sends response status codes randomly
// It uses a list to determine which code to send
// It allows to test the good count of status codes
function randomResponse(req, res) {
  // The list of status codes
  const status = ['400', '401', '402', '403', '404', '500', '501', '502', '503', '504'];
  const len = status.length;
  // The random index to get a status code
  const index = Math.floor(Math.random() * len);
  console.log(status[index]);
  // Send the random status code
  res.status(status[index]).send('Error');
}

module.exports = {
  cosResponse,
  randomResponse,
};
