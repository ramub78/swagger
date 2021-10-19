const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const randomId = require("random-id");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
const app = express();

// Initialize middlewares
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

// place holder for the data
let users = [
  {
    id: 1,
    firstName: "firstname",
    lastName: "lastname",
    status: "Active"
  },
  {
    id: 2,
    firstName: "firstname2",
    lastName: "lastname2",
    status: "Active"
  },
  {
    id: 3,
    firstName: "firstname3",
    lastName: "lastname3",
    status: "Active"
  }
];

const port = 8080;

app.get("/api/users", (req, res) => {
  console.log("api/users called!!!!!");
  res.json(users);
});

app.post("/api/users/new", (req, res) => {
  const user = req.body.user;
  user.id = randomId(10);
  users.push(user);
  res.json(users);
});

app.delete("/api/users/:id", (req, res) => {
  console.log("Id to delete:::::", req.params.id);
  users = users.filter(user => user.id != req.params.id);
  res.json(users);
});

app.put("/api/users/update/:id", (req, res) => {
  console.log("Id to update:::::", req.params.id);
  const userToUpdate = req.body.user;
  users = users.map(user => {
    if (user.id == req.params.id) {
      user = userToUpdate;
      user.id = parseInt(req.params.id);
    }
    return user;
  });
  res.json(users);
});

app.get("/", (req, res) => {
  res.send(`<h1>API Running on port: ${port}</h1>`);
});

app.listen(port, () => {
  console.log(`Server listening on the port: ${port}`);
});
