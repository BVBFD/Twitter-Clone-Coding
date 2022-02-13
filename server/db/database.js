import Mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  return Mongoose.connect(config.db.host);
  // { useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false, }
  // mongoose 6.0 이하는 위 옵션 추가 했음.
}

export function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}

let db;
// export function getUsers() {
//   return db.collection("users");
// }

export function getTweets() {
  return db.collection("tweets");
}
