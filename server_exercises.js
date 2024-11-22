import express from 'express';

let app = express();

const port = process.env.PORT || 3001;

// urlencoded middleware to handle body parameters
// tämä voi olla myös yksittäisten endpointien sisällä
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log('The server is running');
});

//Defining an endpoint
app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>');
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
  
// Endpoint that returns (these are path parameters)
// url in browser: localhost:3001/user/fname/lname
  app.get('/user/:fname/:lname', (req, res) => {
    const fname = req.params['fname'];
    const lname = req.params['lname'];
    res.send(`You requested ${fname} ${lname}`)
    });

// POST user with body parameters
  app.post('/user', (req, res) => {
    console.log(req.body);
    res.send();
  });

  // Endpoint that returns (these are query parameters)
  // url in browser: localhost:3001/user?username=nimi&age=15
  app.get('/info', (req, res) => {
    const user = req.query.username;
    const age = req.query.age;
    if (age == 0){
      res.status(400).send(`Age can't be zero!`);
    } else {
      res.send(`You requested ${user}, ${age}`)
  }});

  // Endpoint that returns an array of objects
app.get('/array', (req, res) => {
    const people = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 28 },
      { name: "Charlie", age: 35 }
    ];
    res.json(people);
  });

