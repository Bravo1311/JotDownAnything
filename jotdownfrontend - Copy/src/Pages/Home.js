import React, { useState, useContext } from "react";
import Axios from "axios";

import {
    Row,
    Container,
    Col,
    Input,
    Button,
    InputGroup
} from "reactstrap";

// import UserCard from "../Components/UserCard";
// import Repos from "../Components/Repos";
import { Link, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import '../Custom CSS/Home.css'

const Home = () => {
    const context = useContext(UserContext)
    const [query, setQuery] = useState('')
    const [user, setUser] = useState('')

    if (!context.user?.email) {
        return <Navigate to="/signin" replace={true} />
    }
    return (
        <div className="home" >
            <div className="row rowhome" >
                <div className=" cardmargin col-lg-4 col-md-4 col-sm-4 text-center" style={{ height: "auto" }}>
                    <div className="icons">
                        <Link className="link" to='/todos'>Todos</Link>
                    </div>

                </div>
                <div className=" cardmargin col-lg-4 col-md-4 col-sm-4 text-center">
                    <div className="icons">
                        <Link className="link" to='/quotes'>Quotes</Link>
                    </div>
                </div>
                <div className=" cardmargin col-lg-4 col-md-4 col-sm-4 text-center" >
                    <div className="icons"> 
                        <Link className="link" to='/notes'>Notes</Link>
                    </div>
                </div>
            </div>

            <Outlet style={{ maxwidth: '100%' }} />
        </div>
    )
}

export default Home