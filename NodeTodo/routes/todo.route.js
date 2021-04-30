const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')


router.post('/add', async (req, res) =>{
    try{
        const {text , userID, color} = req.body
        const todo = await new Todo({
            title: text,
            owner: userID,
            checked: false,
            color: color
        })
        await todo.save()
        res.json(todo)
    }catch (e) {
        console.log(e)
    }
})

router.get("/", async (req, res) =>{
    try {
        const {userID} = req.query
        const todo = await Todo.find({ owner: userID})
        res.json(todo)
    }catch (e) {
        console.log(e)
    }
})

router.delete("/delete/:ID" , async (req,res) =>{
    try{
        const todo = await Todo.findOneAndDelete({_id: req.params.ID})
        console.log(req.params.ID)
        res.json(todo)
    }catch (e) {
        console.log(e)
    }
})

router.delete("/deleteCheckedTodo" , async (req,res) =>{
    try{
        const {userID} = req.body
        const todo = await Todo.deleteMany({owner: userID ,checked: true})
        res.json(todo)
    }catch (e) {
        console.log(e)
    }
})

router.put("/completed/:id" , async (req,res) =>{
    try{
        const todo = await Todo.findOne({_id: req.params.id})
        todo.checked = !todo.checked
        await todo.save()
        res.json(todo)
    }catch (e) {
        console.log(e)
    }
})

router.put("/completeAll" , async (req,res) =>{
    try{
        const {userID } = req.body
        let isCheck = true
        const todo = await Todo.find({ owner: userID})
        todo.every(tod => tod.checked === true) ? isCheck = false : isCheck = true
        console.log(todo)
        let todos = await Todo.updateMany({owner: userID}, {$set:{checked: isCheck}})
        res.json(todos)
    }catch (e) {
        console.log(e)
    }
})

module.exports = router