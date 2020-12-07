const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.write('1');
  res.write('2<br></br>');
  res.write('<h1>3</h1>');
  res.write('');
  res.write('5');
  res.write('6');
  res.end('hello node');
});
server.listen(3065, () => {
  console.log('server running');
});