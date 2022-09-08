const {Todo} = require('../models/todo');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const todoList = await Todo.find();

    if(!todoList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(todoList);
})

router.get('/:id', async(req,res) =>{
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        res.status(500).json({message: 'The category with the given ID was not found'})
    }
    res.status(200).send(todo);
})

router.post('/',async(req,res)=>{
    let todo = new Todo({
        name:req.body.name,
        description:req.body.description,
        dateCreated:req.body.dateCreated,
        dateEnded:req.body.dateEnded,

    
    })
    todo = await todo.save();

    if(!todo){
        return res.status(404).send("category cannot be created")
    }else{
        res.send(todo);
    }

})

 router.delete('/:id', (req,res)=>{
    Todo.findByIdAndRemove(req.params.id).then (todo =>{
        if(todo) {
            return res.status(200).json({success: true, message: 'List is deleted'})
        } else {
            return res.status(404).json({success: false, message: "List not found"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
 })


 router.put('/:id', async(req,res)=>{
    const todo= await Todo.findByIdAndUpdate(req.params.id,req.body)
    if(!todo) 
        return res.status(400).send("list can not be updated")

    
    res.send(todo)
})

module.exports =router;