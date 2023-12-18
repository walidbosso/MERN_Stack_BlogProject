const express = require("express"); //1
const app = express(); //2
const { MongoClient } = require("mongodb"); //7
const PORT = process.env.PORT || 8000; //3

//5 it was a test, we deleted it after installing local mongod.exe creating db, collections and this same data format inside it
// const articlesInfo = {
//   "learn-react": {
//     comments: [],
//   },
//   "learn-node": {
//     comments: [],
//   },
//   "my thoughts-on-learning-react": {
//     comments: [],
//   },
// };

// Initialize middleware (use)
// we use to have to install body parser but now it is a built in middleware
// function of express. It parses incoming JSON payload
app.use(express.json({ extended: false }));

// //6 same as //5 because they r related, this was a test w eget rid cz of mongo
// app.post("/api/articles/:name/add-comments", (req, res) => {
//   const { username, text } = req.body;
//   const articleName = req.params.name;
//   articlesInfo[articleName].comments.push({ username, text });
//   //console.log(articleName);

//   res.status(200).json({
//     status: "success",
//     message: articlesInfo[articleName],
//   });
// });

//Test //4
// app.get("/", (req, res) => res.send("hello world!")); //3
// app.post("/", (req, res) => res.send(`hello ${req.body.name}`)); //3
// app.get("/hello/:name", (req, res) => res.send(`hello ${req.params.name}`)); //3

const withDB = async (operations, res) => {
  try {
    const client = new MongoClient("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(client);
    // await client.connect();

    const db = client.db("mernblog");
    await operations(db); //we pass db to operations function
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database", error });
  }
};

//7 now we installed mongodb locally
app.get("/api/articles/:name", async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
});

// app.post("/api/articles/:name/add-comments", (req, res) => {
//   const { username, text } = req.body;
//   const articleName = req.params.name;

//   withDB(async (db) => {
//     const articleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });
//     await db.collection("articles").updateOne(
//       { name: articleName },
//       {
//         $set: {
//           comments: articleInfo.comments.concat({ username, text }),
//         },
//       }
//     );
//     const updateAricleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });
//     res.status(200).json(updateAricleInfo);
//   }, res);
// });

//3
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
