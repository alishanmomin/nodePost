const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
var cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const post = require("./routes/post");
const categories = require("./routes/categories");

const app = express();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
    {
        console.log("Connected");
    })
    .catch((err) =>
    {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", user);
app.use("/post", post);
app.use("/category", categories);

app.listen(process.env.PORT || 8080, () =>
{
    console.log("PORT", 8080);
});
