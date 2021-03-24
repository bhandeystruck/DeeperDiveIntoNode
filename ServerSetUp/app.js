const http = require('http');

//creating a server using http.createServer()
const server = http.createServer((req,res) =>{
    console.log("Server Created");
    //lets get the url and store it in a variable
    const url = req.url;

    //lets make a variable to store the method of the request
    const method = req.method;

    //so we need to greet hello when we have "/"
    if(url === '/')
    {
        //we can use response.write to write back
        res.write('<html><head><h1>Welcome to the website</h1></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="data"><button type="submit">Submit</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users')
    {    //we can use response.write to write back
        res.write('<html><head><ul><li>Users</li><li>User2</li></ul></head>');
        res.write('</html>');
        return res.end();
    }
    if(url ==='/create-user' && method ==='POST'){
       //here we need to access the data passed by the submit button
       //req.on handles the buffer stuff we can pass a call back function to do something
       //here we receive a chunk of data from the buffer
        const requestBody =[];
        req.on("data", (chunk) =>{
            requestBody.push(chunk);
        });
        //now we need to implement 'end' this will help wheen we are done parsing
        req.on('end',()=>{
            //to work with this chunk we need to buffer them so the bus stops and we can interact
            //now parsedBody is a buffer 
            const parsedBody = Buffer.concat(requestBody).toString();
            const takenData = parsedBody.split('=')[1];
            console.log(takenData);
        })

        return res.end();
    }
});

server.listen(3000);