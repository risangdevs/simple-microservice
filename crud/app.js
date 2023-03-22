const express = require("express");
const app = express();
const Item = require("./models/items");
const {connect}=require('./config/mongo')

// Routes for CRUD operations
app.get("/items", (req, res) => {
  // Retrieve all items from the database
  Item.findAll()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((_) => console.log(_));
});

app.post("/items", (req, res) => {
  // Create a new item in the database
  console.log("create item");
});

app.put("/items/:id", (req, res) => {
  // Update an existing item in the database
  console.log("update item");
});

app.delete("/items/:id", (req, res) => {
  // Delete an item from the database
  console.log("delete item");
});


connect()
  .then(async () => {
    app.listen(3000,() => {
      console.log("CRUD microservice listening on port 3000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });