const todos = require('../model/todos')

const gettodoslist = async (req, res) => {
    // res.send('First Response')
    try {
        const email = req.query.email
        if(email === undefined){
            return res.status(400).json({status:failed})
        }
        console.log('email is '+email);
        const users = await todos.find({
            email: email
        })
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}
const gettodositems = async (req, res) => {
    // res.send('First Response')
    try {
        const id = req.params.id
        console.log(id);
        const data = await todos.findById(id)
        console.log(data);
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const posttodos = async (req, res) => {
    const User = new todos({
        email: req.body.email,
        name: req.body.name,
        todos: req.body.todos
    })

    try {
        const a1 = await User.save()
        res.json(a1)
    } catch (error) {
        console.log(error);
    }
}

const puttodos = async (req, res) => {
    const todo = req.body.todos
    const id = req.params.id
    console.log(id);
    console.log(todo);
    // const people =await todos.find()  
    // const person = people.filter((person)=>person.id!==Number(req.body.id))
    await todos.findByIdAndUpdate(id, {
        todos: todo
    })
    try {
        res.json({ success: true })
    } catch (error) {
        console.log(error);
    }
}

const deleteGroup = async (req,res) => {
    const id = req.query.id
    console.log(id);
    try {
        await todos.findByIdAndDelete(id)
        res.json({success:true})
    } catch (error) {
        
    }
}

const deletetodos = async (req, res) => {
    const id = req.params.id
    // const people =await todos.find()  
    // const person = people.filter((person)=>person.id!==Number(req.body.id))
    const update = await todos.findByIdAndRemove(id)
    console.log('updated')


    try {
        res.json(update)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { gettodoslist, posttodos, puttodos, deletetodos, gettodositems, deleteGroup }