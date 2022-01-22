const db = require("./dbconfig");

const getCustomers = (req, res) => {
  const query = "SELECT * FROM customers;";

  db.query(query, (err, results) => {
    if (err) console.error(err);
    else {
      if (results.rows.length > 0) res.json(results.rows);
      else res.status(404).send("No customers found!");
    }
  });
};

const getCustomerById = (req, res) => {
  const query = {
    text: "SELECT * FROM customers WHERE id = $1",
    values: [req.params.id],
  };

  db.query(query, (err, results) => {
    if (err) console.error(err);
    else {
      if (results.rows.length > 0) res.json(results.rows);
      else res.status(404).send(`No customers found with id ${req.params.id}`);
    }
  });
};

const addCustomer = (req, res) => {
  const newCustomer = req.body;

  const query = {
    text: "INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)",
    values: [
      newCustomer.firstname,
      newCustomer.lastname,
      newCustomer.email,
      newCustomer.phone,
    ],
  };

  db.query(query, (err, results) => {
    if (err) console.error(err);
    else res.json(newCustomer);
  });
};

const deleteCustomer = (req, res) => {
  const query = {
    text: "DELETE FROM customers WHERE id = $1",
    values: [req.params.id],
  };

  db.query(query, (err, results) => {
    if (err) console.error(err);
    else res.send(`Deleted customer with id ${req.params.id}`);
  });
};

const deleteAllCustomers = () => {
  db.query("DELETE FROM customers", (err, results) => {
    if (err) {
      return console.error("err:", err);
    }
  });
};

const updateCustomer = (req, res) => {
  const updatedCustomer = req.body;

  const query = {
    text: "UPDATE customers SET firstname = $1, lastname = $2, email = $3, phone = $4 WHERE id = $5",
    values: [
      updatedCustomer.firstname,
      updatedCustomer.lastname,
      updatedCustomer.email,
      updatedCustomer.phone,
      req.params.id,
    ],
  };

  db.query(query, (err, results) => {
    if (err) return console.error(err);
    else res.send(`Updated customer ${req.params.id}`);
  });
};

const getCustomerByEmail = (email, next) => {
  const query = {
    text: "SELECT * FROM customers WHERE email = $1;",
    values: [email],
  };

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error", err.stack);
    } else {
      next(result.rows);
    }
  });
};

module.exports = {
  getCustomers: getCustomers,
  getCustomerById: getCustomerById,
  addCustomer: addCustomer,
  deleteCustomer: deleteCustomer,
  updateCustomer: updateCustomer,
  deleteAllCustomers: deleteAllCustomers,
  getCustomerByEmail: getCustomerByEmail,
};
