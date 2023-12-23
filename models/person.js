const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{5,}/.test(v);
      },
    },
  },
});

personSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret = { ...ret, id: ret._id.toString() };
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Person", personSchema);
