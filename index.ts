import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import {connection} from "./Config/config"
import TodoController from "./controllers/todo.routes"
dotenv.config()
const app= express();

let PORT=process.env.PORT||8080

app.use(express.json())
app.get("/", (req,res)=>{
     res.send('Hello World!')
})
app.use("/todo",TodoController)

app.listen(PORT,async ()=>{
   try{
    await connection
    console.log("database connected");
   }catch(err){
    console.log(err);
   }console.log(`listening on port ${PORT}`)
})
export default app