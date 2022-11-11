import express,{Request,Response} from 'express';
import {Todos} from "../Models/todo.schema"

const TodoController =express.Router()

TodoController.post("/directory/create",async(req:Request,res:Response)=>{
     const payload=req.body
     try{
        const todo=await Todos.create(payload)
        res.status(200).send(todo)
     }catch(err){
        res.status(400).send(err);
     }
})
TodoController.post("/directory/remove/:id",async(req:Request,res:Response)=>{
    try{
       const remove=await Todos.deleteOne({_id:req.params.id})
       res.status(200).send(remove)
    }catch(err){
       res.status(400).send(err);
    }
})
TodoController.post("/todo-item/create/:id",async(req:Request,res:Response)=>{
    const { id } = req.params
    console.log(id)
    try{
        const data= await Todos.findByIdAndUpdate({_id:id},req.body,{new:true})
           res.status(200).send({ message: "Task updated!",data});

    }catch(err){
       res.status(400).send(err);
    }
})
TodoController.get("/directory/list",async(req:Request,res:Response)=>{
    try{
       const item=await Todos.find()
       if(item){
           res.status(200).send(item)
       }
       else{
        res.send("Not found")
       }
    }catch(err){
       res.status(400).send(err);
    }
})
TodoController.post("/todo-item/mark-as-done/:id",async(req:Request,res:Response)=>{
    const { id } = req.params
    try{
       const item=await Todos.findOne({_id:id})
       if(item){
        if(item.status===false){
            const data=await Todos.updateOne({_id:id},{status:true},{new:true})
                res.status(200).send(data)
           }
       }
       else{
        res.send("Unable Change Status")
       }
       
    }catch(err){
       res.status(400).send(err);
    }
})
TodoController.post("/todo-item/mark-as-not-done/:id",async(req:Request,res:Response)=>{
    const { id } = req.params
    try{
       const item=await Todos.findOne({_id:id})
       if(item){
        if(item.status===true){
            const data=await Todos.updateOne({_id:id},{status:false},{new:true})
                res.status(200).send(data)
           }else{
            res.send("Unable Change Status")
           }
       }
       else{
        res.send("Not found")
       }
    }catch(err){
       res.status(400).send(err);
    }
})
// TodoController.post("/todo-item/move-to-directory/:id",async(req:Request,res:Response)=>{
//     const { id } = req.params
//     try{
//        const item=await Todos.findOne({_id:id})
//        if(item){
//         if(item.status===true){
//             const data=await Todos.updateOne({_id:id},{status:false},{new:true})
//                 res.status(200).send(data)
//            }else{
//             res.send("Unable Change Status")
//            }
//        }
//        else{
//         res.send("Not found")
//        }
//     }catch(err){
//        res.status(400).send(err);
//     }
// })





export default TodoController