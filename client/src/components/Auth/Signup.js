import React, {useState} from 'react'
import './Signup.css'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


function Signup(props) {
    let [username, setUsername] = useState('')
//  let [username, setUsername] = ['value', (input) => { username = input }]
    let [password, setPassword] = useState('')


    let handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:4000/api/user/createuser", {
            method: 'POST',
            body: JSON.stringify({ user: { username: username, password: password} }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then((res) => res.json())
        .then(user => {
            props.updateToken(user.sessionToken)
        })
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => {setUsername(e.target.value)}} placeholder="username" name="username" value={username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="password" name="password" value={password} />
                </FormGroup>
                <Button type="submit">Signup</Button>
            </Form>
        </div>
    )
}

export default Signup