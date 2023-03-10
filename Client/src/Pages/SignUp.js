import React, { useContext, useState, useEffect } from "react";
import {
  Container, Form, Button, FormGroup, Label, Col, Input,
  Row, Card, CardBody, CardFooter, CardHeader
} from "reactstrap"

import firebase from "firebase/compat/app"

import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom"

import { toast } from "react-toastify";

const SignUp = () => {

  const context = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        res.user.updateProfile({
          displayName: username
        })
        context.setUser({ email: res.user.email, Uid: res.user.uid, username: username })
      })
      .catch(error => {
        console.log(error)
        toast(error.message, { type: "error" })
      })
  }


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      context.setUser({ email: user.email, Uid: user.uid, username: user.displayName })
    });
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    handleSignUp()

  }
  if (context.user?.email) {
    return <Navigate to="/" replace={true} />
  }


  return (
    <Container className="text-center">
      <Row>
        <Col lg={6} className="offset-lg-3 mt-5">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className="">Signup here</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="username" sm={3}>
                    Username
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="username"
                      name="username"
                      id="username"
                      placeholder="provide your username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="provide your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="your password here"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" block color="primary">
                  Sign Up
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp;