const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 8000;

// Initialize middleware
// we use to have to install body parser but now it is a built in middleware
// function of express. It parses incoming JSON payload
app.use(express.json({ extended: false }));

//function for DB connection
const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb://127.0.0.1:27017"
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   connectTimeoutMS: 500000, // Set the connection timeout to 5 seconds (adjust as needed)
      //   socketTimeoutMS: 300000,
      // }
    );
    const db = client.db("mernblog");
    await operations(db); //we pass connection db to operations, wwhat we put in first parameter later will be xecuted here
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database", error });
  }
};

app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    //operations and we passed db to it earlier, this 1st parameter in withDB
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
  }, res /*2nd parameter in withDB*/);
});

//add comments to a specific article name provided in URL
app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    //check if that article in URL exists first
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    //now update the article comments using the req.body from client
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    //show that article after update
    const updateAricleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updateAricleInfo);
  }, res);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
