const express = require('express')
const router = express.Router()
const {gettodoslist, posttodos, puttodos,deletetodos
    ,gettodositems, deleteGroup} = require('../controller/todos')



// const {getpeople, postname, postpostman, putname} = require('../controller/people')

 router.route('/todos').get(gettodoslist).post(posttodos).delete(deleteGroup)
 router.route('/todos/items/:id').get(gettodositems).put(puttodos).delete(deletetodos)



// router.post('/', postname)


// router.post('/postman', postpostman)

// router.put('/:id', putname)

//you can also chain routes.
// router.route('/').get(getpeople).post(postname)

module.exports = router

