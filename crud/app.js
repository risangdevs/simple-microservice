const express = require("express");
const app = express();
const Item = require("./models/items");
const { connect } = require("./config/mongo");

app.use(express.json());
// Routes for CRUD operations
app.get("/items", (req, res) => {
  // Retrieve all items from the database
  Item.findAll()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((_) => console.log(_));
});

app.get("/items/:id", (req, res) => {
  // Retrieve one item from the database
  Item.findByPk(req.params.id)
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((_) => console.log(_));
});

app.post("/items", (req, res) => {
  // Create a new item in the database
  Item.add(req.body)
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((_) => console.log(_));
});

app.put("/items/:id", (req, res) => {
  // Update an existing item in the database
  Item.edit(req.params.id, req.body)
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((_) => console.log(_));
});

app.delete("/items/:id", (req, res) => {
  // Delete an item from the database
  Item.delete(req.params.id)
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((_) => console.log(_));
});

connect()
  .then(async () => {
    app.listen(3000, () => {
      console.log("CRUD microservice listening on port 3000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
