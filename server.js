import express from 'express';

let app = express();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('The server is running');
});

//Defining an endpoint

app.get('/', (req, res) => {
    res.send('<h1>You called root endpoint</h1>');
})

//text endpoint
app.get('/text', (req, res) => {
    res.send("Hello, this is a plain text response!");
  });
  
// Endpoint that returns a single object
  app.get('/object', (req, res) => {
    const person = { name: "John Doe", age: 30 };
    res.json(person);
  });
  
// Endpoint that returns
  app.get('/user/:fname/:lname', (req, res) => {
    const fname = req.params['fname'];
    const lname = req.params['lname'];
    res.send(`You requested ${fname} ${lname}`)
  });

  // Endpoint that returns
  app.get('/info', (req, res) => {
    const user = req.query.username;
    const age = req.query.age;
    res.send(`You requested ${user}, ${age}`)
  });

  // Endpoint that returns an array of objects
app.get('/array', (req, res) => {
    const people = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 28 },
      { name: "Charlie", age: 35 }
    ];
    res.json(people);
  });

