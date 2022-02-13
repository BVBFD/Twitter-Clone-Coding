import { useVirtualId } from "../db/database.js";
import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema);

export async function findByUsername(username) {
  // return getUsers()
  //   .findOne({ username }) //
  //   .then(mapOptionalUser);
  return User.findOne({ username });
}

export async function findById(id) {
  // return getUsers()
  //   .findOne({ _id: new ObjectId(id) })
  //   .then(mapOptionalUser);
  return User.findById(id);
}

export async function createUser(user) {
  // return getUsers()
  //   .insertOne(user)
  //   .then((data) => data.insertedId.toString());
  return new User(user).save().then((data) => data.id);
}

// function mapOptionalUser(data) {
//   return data ? { ...data, id: data._id.toString() } : data;
// }
