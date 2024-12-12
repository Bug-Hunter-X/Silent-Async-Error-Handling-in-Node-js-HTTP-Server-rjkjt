const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate an asynchronous operation that might fail
  someAsyncOperation().then(() => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Success!');
  }).catch(err => {
    // Handle the error appropriately, but DO NOT throw it here!
    console.error('Error during request:', err);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

async function someAsyncOperation() {
  // Simulate an asynchronous operation that might fail (e.g., database query, file read)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error 50% of the time
      if (Math.random() < 0.5) {
        reject(new Error('Simulated database error'));
      } else {
        resolve();
      }
    }, 1000);
  });
}