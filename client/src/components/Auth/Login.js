import React, {useState} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Login(props) {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    let handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:4000/api/user/signin', {
            method: 'POST',
            body: JSON.stringify(
                {
                    user: {
                        username: username, 
                        password: password
                    }
                }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(response => response.json())
        .then(user => props.updateToken(user.sessionToken))
    }

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => {setUsername(e.target.value)}} placeholder="username" name="username" value={username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="password" name="password" value={password} />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login