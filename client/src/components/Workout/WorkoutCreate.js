// imports
import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

// a function
const WorkoutCreate = (props) => {
    let [description, setDescription] = useState('')
    let [result, setResult] = useState('')
    let [definition, setDefinition] =useState('Time')

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:4000/api/log',{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({ log: { description: description , definition: definition , result: result } })
        }).then(res => res.json())
        .then(logData => {
            console.log(logData)
            setDescription('')
            setResult('')
            setDefinition('Time')
            props.fetchWorkouts()
        })
    }

    return(
        <>
            <h3>Log a Workout</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description" />
                    <Input onChange={ (e) => { setDescription(e.target.value) } } name="description" value={description} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition" />
                    <Input type="select" onChange={ (e) => { setDefinition(e.target.value) } } name="definition" value={definition}>
                        <option value="Time">Time</option>
                        <option value="Weight">Weight</option>
                        <option value="Distance">Distance</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result" />
                    <Input name="result" onChange={ (e) => { setResult(e.target.value) } } value={result} />
                </FormGroup>
                <Button type="submit">Click to Submit</Button>
            </Form>
        </>
    )
}

// export
export default WorkoutCreate