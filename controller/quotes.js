const quotes = require('../model/quotes')

const getauthors = async (req, res) => {
    // res.send('First Response')
    try {
        const email = req.query.email
        const users = await quotes.find({
            email: email
        })
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}
const getquotes = async (req, res) => {
    // res.send('First Response')
    try {
        const id = req.params.id
        console.log(id);
        const data = await quotes.findById(id)
        console.log(data);
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const postauthors = async (req, res) => {
    const User = new quotes({
        email: req.body.email,
        name: req.body.name,
        quotes: req.body.quotes
    })

    try {
        const a1 = await User.save()
        res.json(a1)
    } catch (error) {
        console.log(error);
    }
}

const putquotes = async (req, res) => {
    const todo = req.body.quotes
    const id = req.params.id
    console.log(id);
    console.log(todo);
    // const people =await todos.find()  
    // const person = people.filter((person)=>person.id!==Number(req.body.id))
    await quotes.findByIdAndUpdate(id, {
        quotes: todo
    })
    try {
        res.json({ success: true })
    } catch (error) {
        console.log(error);
    }
}

const deleteauthor = async (req,res) => {
    const id = req.query.id
    console.log(id);
    try {
        await quotes.findByIdAndDelete(id)
        res.json({success:true})
    } catch (error) {
        
    }
}

const deletequotes = async (req, res) => {
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

module.exports = { getauthors, postauthors, putquotes,deletequotes,getquotes, deleteauthor }