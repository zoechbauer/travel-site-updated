exports.handler = function(event, context, callback) {
    // use headers if you want to test the cloud function locally
    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type"
      }
     
      if (event.httpMethod !== "POST") {
        return callback(null, {
          statusCode: 200,
          headers,
          body: "This was not a POST request"
        })
      } 

    const secretContent = `
        <h3>Welcome To The Secret Area</h3>
        <p>Here we can tell you that the sky is <strong>blue</strong>, and 2 plus 2 equals 4.</p>
    `;
    let body;

    if (event.body) {
        body = JSON.parse(event.body);      
    } else {
        body = {};
    }

    if (body.password == 'javascript') {
        callback(null, {
            statusCode: 200,
            headers,
            body: secretContent
        });
    } else {
        callback(null, {
            statusCode: 401,
            headers
        });
    }
    
}