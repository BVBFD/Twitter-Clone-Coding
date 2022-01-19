import express from "express";
import "express-async-errors";

let tweets = [
  {
    id: "1",
    text: "드림코딩 화이팅",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://i.pinimg.com/474x/e2/2c/b9/e22cb965ccd406838b496358fd5d989a.jpg",
  },
  {
    id: "2",
    text: "드림코딩 화이팅",
    createdAt: Date.now().toString(),
    name: "Lee",
    username: "lee",
    url: "https://i.pinimg.com/474x/e2/2c/b9/e22cb965ccd406838b496358fd5d989a.jpg",
  },
];
const router = express.Router();

router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => (tweet.username = username))
    : tweets;
  res.status(200).json(data);
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not fount` });
  }
});

router.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not fount` });
  }
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  res.sendStatus(204);
});

export default router;