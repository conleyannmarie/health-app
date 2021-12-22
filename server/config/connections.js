const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || // "need code here", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).catch ((err) => {
  console.error(err);
})

module.exports = mongoose.connection;