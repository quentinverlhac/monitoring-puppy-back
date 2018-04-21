function cosResponse(req, res) {
  const period = 120000;
  const threshold = 0.5 + Math.cos((Math.PI * Date.now()) / period) / 2;
  const rand = Math.random();
  if (rand > threshold) {
    console.log('Up');
    res.send('Hello World!');
  } else {
    console.log('Down');
    res.status('404').send('Error: not found');
  }
}

function randomResponse(req, res) {
  const status = ['400', '401', '402', '403', '404', '500', '501', '502', '503', '504'];
  const len = status.length;
  const index = Math.floor(Math.random() * len);
  console.log(status[index]);
  res.status(status[index]).send('Error');
}

module.exports = {
  cosResponse,
  randomResponse,
};
