const express = require("express");
const customers = require("./db/customers");
const bodyParser = require("body-parser");
const auth = require("./services/authenticate");
process.env.SECRET_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJrZWlqb0BrZWlqby5jb20iLCJpYXQiOjE2Mjc0OTk2Njh9.lmD5idLVeF5UUTGU0QG9Bd9PKWCSNJiQdfEebJaBvNo";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

app.get("/api/customers", auth.authenticate, customers.getCustomers);

app.get("/api/customers/:id", auth.authenticate, customers.getCustomerById);

app.post("/api/customers", auth.authenticate, customers.addCustomer);

app.delete("/api/customers/:id", auth.authenticate, customers.deleteCustomer);

app.put("/api/customers/:id", auth.authenticate, customers.updateCustomer);

app.post("/login", auth.login);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

module.exports = app;
