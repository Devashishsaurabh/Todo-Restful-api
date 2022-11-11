import mongoose from "mongoose";
interface Todo{
    name:string;
    description: string;
    item:[];
    status:boolean 
}
const todoSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    item:{type:Array,required:true},
    status:{type:Boolean,required:true,default:false}
})

export const Todos =mongoose.model<Todo>("Todo",todoSchema)