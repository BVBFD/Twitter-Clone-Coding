import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";
import * as userRepository from "./auth.js";

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model("Tweet", tweetSchema);

export async function getAll() {
  // return getTweets() //
  //   .find()
  //   .sort({ createdAt: -1 })
  //   .toArray()
  //   .then(mapTweets);
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  // return getTweets() //
  //   .find({ username })
  //   .sort({ createdAt: -1 })
  //   .toArray()
  //   .then(mapTweets);
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  // return getTweets() //
  //   .findOne({ _id: new ObjectId(id) })
  //   .then(mapOptionalTweet);
  return Tweet.findById(id);
}

export async function create(text, userId) {
  // const { name, username, url } = await userRepository.findById(userId);
  // const tweet = {
  //   text,
  //   createdAt: new Date(),
  //   userId,
  //   name,
  //   username,
  //   url,
  // };
  // return getTweets()
  //   .insertOne(tweet)
  //   .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
  return userRepository.findById(userId).then((user) =>
    new Tweet({
      text,
      userId,
      name: user.name,
      username: user.username,
    }).save()
  );
}

export async function update(id, text) {
  // return getTweets()
  //   .findOneAndUpdate(
  //     { _id: new ObjectId(id) },
  //     { $set: { text } },
  //     { returnDocument: "after" }
  //   )
  //   .then((result) => result.value)
  //   .then(mapOptionalTweet);
  return Tweet.findByIdAndUpdate(id, text, { returnOriginal: false });
}

export async function remove(id) {
  // return getTweets().deleteOne({ _id: new ObjectId(id) });
  return Tweet.findByIdAndDelete(id);
}

// function mapOptionalTweet(tweet) {
//   return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
// }

// function mapTweets(tweets) {
//   return tweets.map(mapOptionalTweet);
// }
