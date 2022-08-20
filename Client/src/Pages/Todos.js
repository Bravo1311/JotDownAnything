import React, { useState, useContext, useEffect, useReducer } from "react";
import { UserContext } from "../context/userContext";
import { TodosContext } from "../context/todosContext";
// import todoReducer from '../reducers/reducer'
import Axios from "axios";
import { AiFillCaretRight, AiFillDelete } from 'react-icons/ai'
import { FaCheckDouble } from 'react-icons/fa'
import firebase from "firebase/compat/app"

import {
    Row,
    Container,
    Col,
    Input,
    Button,
    InputGroup,
    ListGroup, ListGroupItem
} from "reactstrap";


import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";

import '../Custom CSS/Todos.css'

const instance = Axios.create({
    baseURL: ''
})

const Todos = () => {
    const context = useContext(UserContext)
    const [query, setQuery] = useState('')
    const [lists, setLists] = useState([])
    const [items, setItems] = useState([])
    const [itemId, setItemId] = useState('')
    const [todoItem, setTodoItem] = useState('')

    useEffect(() => {
       if(context.user===undefined){
        <Navigate to = '/' replace = {true}/>
       }
    }, []);
    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };


    const fetchLists = async () => {
        console.log('email is ' + context.user.email);
        if (context.user === undefined) {
            return <Navigate to="/" replace={true} />
        } else {
            try {
                const { data } = await instance.get(`/todos?email=${context.user.email}`)
                setLists(data) 
            } catch (error) {
                console.log(error);
                return <Navigate to="/" replace={true} />
            }
        }

    }

    const createNewItem = async (id) => {
        if (!todoItem) {
            return toast("Please enter a todo item", { type: "error", autoClose: 3000 })
        }
        const m = {
            todo: todoItem,
            uid: v4()
        }
        const a = [...items, m]
        setItems(a)
        console.log(id);
        console.log(items);
        try {
            const { data } = await instance.put(`/todos/items/${id}`, {
                todos: a
            })
            // setUser(data)
            toast("Successfully added", { type: "success", autoClose: 3000 })
        } catch (error) {
            toast("Not able to locate user", { type: "error", autoClose: 3000 })
        }
    }

    const fetchListContent = async (id) => {
        const { data } = await instance.get(`/todos/items/${id}`)
        setItemId(id)
        setItems(data.todos)
    }


    const deleteListContent = async (id) => {
        console.log(id)
        setLists(lists.filter(item => item._id !== id))
        try {
            await instance.delete(`/todos?id=${id}`)
            toast("Todo Group Successfully Removed", { type: "success" })
        } catch (error) {
            toast("Request Failed", { type: "error", autoClose: 3000 })
        }

        // setItemId(id)
        fetchLists()
    }


    useEffect(() => {
        console.log('user is: ' + context.user.email);
        fetchLists()

    }, [])

    const deleteItem = async id => {
        const newList = items.filter((item) => item.uid !== id)
        setItems(newList)
        id = itemId
        try {
            const { data } = await instance.put(`/todos/items/${id}`, {
                todos: newList
            })
            // setUser(data)
            toast("Successfully deleted", { type: "success", autoClose: 3000 })
        } catch (error) {
            toast("Not able to locate user", { type: "error", autoClose: 3000 })
        }
    }

    const createNewList = async () => {
        if (!query) {
            return toast("Please enter a list name", { type: "error", autoClose: 3000 })
        }
        try {
            const { data } = await instance.post(`/todos`, { email: context.user.email, name: query })
            // setUser(data)
            toast("Successfully added", { type: "success", autoClose: 3000 })
            fetchLists()
        } catch (error) {
            toast("Not able to locate user", { type: "error" })
        }
    }


    // const [todos, dispatch] = useReducer(todoReducer, []);

    return (
        <>
            <TodosContext.Provider value={{ items, itemId }}>
                <Container fluid='true'>
                    <Row className=" todos">
                        <Col md="4" sm='12'>
                            <InputGroup>
                                <Input
                                    type="text"
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Please provide List Name"
                                />
                                {/* <InputGroupAddOn addonType="append"> */}
                                <Button onClick={() => createNewList()} color="primary">
                                    Create New List
                                </Button>
                                {/* </InputGroupAddOn> */}
                            </InputGroup>
                            <h4 className="mt-3"><center>Your Todo Lists</center></h4>
                            <ListGroup className=" xyz">

                                {lists.slice(0).reverse().map((item, index) => (
                                    <ListGroupItem key={item._id} className=' todolists mt-2'>
                                        <Container fluid className="">

                                            <Row tabIndex={index} className="items " onClick={() => { fetchListContent(item._id) }}>
                                                <Col md="10" sm='10'>
                                                    {item.name}
                                                    {/* <span className="float-right"
                                                        
                                                    ><AiFillCaretRight />
                                                    </span> */}
                                                </Col>
                                                <Col md="2" sm='2'>
                                                    <span className="float-right"
                                                        onClick={() => { deleteListContent(item._id) }}
                                                    ><AiFillDelete size={25} />
                                                    </span>
                                                </Col>
                                            </Row>

                                        </Container>

                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md='8'>
                            <InputGroup className="md-4 lg-4">
                                <Input
                                    type="text"
                                    value={todoItem}
                                    onChange={e => setTodoItem(e.target.value)}
                                    placeholder="Please provide List Name"
                                />
                                <Button onClick={() => createNewItem(itemId)} color="success">
                                    Add New Item
                                </Button>
                            </InputGroup>
                            <h4 className="mt-3"><center>Your Items</center></h4>
                            <ListGroup className="mb-2 abc">
                                <Container fluid>

                                    {items.length !== 0 ? items.map(todo => (

                                        <ListGroupItem className="item2" key={todo.uid}>
                                            <Row >
                                                <Col sm='11'>{todo.todo}</Col>
                                                <Col sm='1'> <span
                                                    className="float-right"
                                                    onClick={() => { deleteItem(todo.uid) }}>                                                    <FaCheckDouble />
                                                </span>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>



                                    )) : <h4 className="mt-5">No itmes to display</h4>}
                                </Container>
                            </ListGroup>

                        </Col>
                    </Row>
                </Container>
            </TodosContext.Provider>
        </>
    )
}

export default Todos