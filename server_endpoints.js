// work in progress

import express from 'express';

let app = express();

const port = process.env.PORT || 3001;

// urlencoded middleware to handle body parameters
// tämä voi olla myös yksittäisten endpointien sisällä
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log('The server is running');
});


// POST user with body parameters
//let users = [];
/* app.post('/user', (req, res) => {
  let username = req.body.uname;
  users.push(username);
  res.send(`Username ${username} added!`);
}); */

let users = [];
app.post('/user', (req, res) => {
  users.push(req.body);
  res.send(`Username ${req.body.uname} added!`);
});
// check users
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/userinfo', (req,res) => {
  let result = {count: users.length};
  let sum =0;
  users.forEach(u => sum += Number(u.salary));

  result.salarySum = sum;
  result.users = users;

  res.json(result);
});


// user by id
app.get('/user/:id', (req, res) => {
  res.json(user);
});

// movies by genre
app.get('/movie/:genre', (req, res) => {
  res.json(user);
});

// reviews by users
app.get('/review/:username', (req, res) => {
  res.json(user);
});

/* //Defining an endpoint
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
   */

/* // Endpoint that returns (these are path parameters)
// url in browser: localhost:3001/user/fname/lname
app.get('/user/:fname/:lname', (req, res) => {
  const fname = req.params['fname'];
  const lname = req.params['lname'];
  res.send(`You requested ${fname} ${lname}`)
  }); */

/*   // Endpoint that returns (these are query parameters)
  // url in browser: localhost:3001/user?username=nimi&age=15
  app.get('/info', (req, res) => {
    const user = req.query.username;
    const age = req.query.age;
    if (age == 0){
      res.status(400).send(`Age can't be zero!`);
    } else {
      res.send(`You requested ${user}, ${age}`)
  }}); */

  // Endpoint that returns an array of objects
app.get('/array', (req, res) => {
    const people = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 28 },
      { name: "Charlie", age: 35 }
    ];
    res.json(people);
  });

