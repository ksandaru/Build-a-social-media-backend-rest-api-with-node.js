const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blog-routes");
const userRouter = require("./routes/user-routes");
const app = express();

//parse all data to json (no need to use bodyParser)
app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)



mongoose
  .connect(
    "mongodb+srv://username:password@cluster0.zla2laz.mongodb.net/BlogApp?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database and listen to port 5000"))
  .catch((err) => console.log(err));
