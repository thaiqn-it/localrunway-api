const mongoose = require("mongoose");
const { mongooseConnection } = require("../index");

(async () => {
  await mongooseConnection;
  await mongoose.connection.db.dropCollection("customers");
  console.log("Drop Customer successfully!");
})()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.log("Collection might already been removed");
    process.exit();
  });
