import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todos.js";

const app = express();



const CONNECTION_STRING = process.env.CONNECTION_STRING || "mongodb+srv://Dipali:1234@cluster0.trrhhg4.mongodb.net/?retryWrites=true&w=majority";


app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());

//Routes


app.use(`/api/v1/todo`, todoRoutes);


//Database
mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    //useFindAndModify: false,
    dbName: "todoList",
  })
  .then(() => {
    console.log("Database Connection is ready...");
    
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3001, () => {
  console.log("server is running http://localhost:3001");
});
