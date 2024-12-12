# Silent Async Error Handling in Node.js HTTP Server

This repository demonstrates a common issue in Node.js where asynchronous errors within HTTP request handlers are silently swallowed, leading to unexpected behavior.  The server continues to operate but fails to return appropriate error responses to the client.

## Bug

The `bug.js` file contains a Node.js HTTP server that simulates an asynchronous operation which may fail.  When the async operation rejects (due to a simulated database error), the error is logged to the console, but the server still sends a 200 OK response.  This is incorrect; a 500 Internal Server Error should be returned.

## Solution

The `bugSolution.js` file provides a corrected version of the server.  It properly handles the rejected promise and sends the appropriate 500 error response.

## How to Reproduce

1. Clone this repository.
2. Run `node bug.js`.
3. Make several requests to `http://localhost:3000`.  Observe that some requests succeed (200 OK) and some silently fail (also 200 OK, but no actual success). 
4. Run `node bugSolution.js` and repeat step 3.  This version correctly returns 500 error codes for failed requests.

## Lessons Learned

Always explicitly handle potential errors in asynchronous operations within your Node.js request handlers.  Never assume that promises will resolve successfully; always include `.catch()` blocks to handle rejections gracefully.