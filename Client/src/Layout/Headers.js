import React, {useContext, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {
    Collapse, 
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    NavbarBrand,
    NavbarText

} from 'reactstrap';
import {Link, Outlet} from "react-router-dom"

import { UserContext } from "../context/userContext";

import fire from '../Firebase/firebase';

import App from "../App";

const Header = () => {

    const context = useContext(UserContext)

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (      
      <div  style={{maxwidth:'100%'}}>
        <Navbar light expand="lg" style={{ backgroundColor: "#F2EBE9" }}>
        <NavbarBrand>                
                <NavLink tag = {Link} to = "/" >jDa</NavLink>
            </NavbarBrand>
            <NavbarText className="m-auto">{
                context.user?.email ? `Hi ${context.user.username}`:""
            }</NavbarText>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen = {isOpen} navbar>
                <Nav className="ms-auto" navbar>
                    {
                    context.user ? (
                    <NavItem >
                        <NavLink onClick={() =>{
                            fire.auth().signOut()
                            context.setUser(null)
                        } } to = "/" >Log Out</NavLink>
                    </NavItem>
                    ) : (
                    <><NavItem>
                    <NavLink tag = {Link} to = "/signin" >Sign In</NavLink>
                    </NavItem>
                    {/* <NavItem>
                    <NavLink tag = {Link} to = "/signin" >Sign In</NavLink>
                    </NavItem> */}
                    </>)
                    }
                    
                    
                </Nav>
            </Collapse>
        </Navbar>
        <Outlet/>
      </div>
    );
  
}

export default Header
