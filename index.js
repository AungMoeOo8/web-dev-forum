const express = require("express");
const mongoose = require("mongoose");
const Question = require("./schema/questionSchema");

const uri =
  "mongodb+srv://aungmoeoo:password123456@cluster0.6oqaf.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));

//get question by userid
app.get("/api/questions", async (req, res) => {
  const { author_id } = req.body;
  Question.find({ author_id: author_id }, (error, result) => {
    if (error) {
      res.json({ error: error });
      return;
    }

    res.json(result);
  });
});

//create a question
app.post("/api/questions", async (req, res) => {
  const { body, title, author_id } = req.body;

  const question = new Question({
    title,
    body,
    author_id,
  });

  question.save((error) => {
    if (error) {
      res.json({ error: error });
      return;
    }

    res.json({ id: question.id });
  });
});

//Connect to database and then start the server
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Mongodb connected");
    app.listen(5000, () => console.log(`Server started on PORT:5000`));
  }
);
