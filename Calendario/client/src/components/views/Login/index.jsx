import React, { useState } from 'react'
import { Container, Paper, Typography, TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { useHistory } from 'react-router'
import '../Dashboard/main.css'

const Login = () => {
    const [body, setBody] = useState({ username: '', password: '' })
    const { push } = useHistory()

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }

    const onSubmit = () => {
        axios.post('http://localhost:4000/api/login', body)
            .then(({ data }) => {
                localStorage.setItem('auth', '"yes"')
                localStorage.setItem('user', body.username)
                push('/app')
            })
            .catch(({ response }) => {
                console.log(response.data)
            })
    }

    const newUser = () => {
        push('/newuser')
    }

    return (
        <main className='home-login'>
            <Container component={Paper} elevation={5} maxWidth='xs'>
                <div>
                    <Typography component='h1' variant='h5'>Log-in</Typography>
                    <form>
                        <TextField
                            fullWidth
                            autoFocus
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Username'
                            value={body.username}
                            onChange={inputChange}
                            name='username'
                        />
                        <TextField
                            fullWidth
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Password'
                            value={body.password}
                            onChange={inputChange}
                            name='password'
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={onSubmit}
                        >
                            Log-in
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={newUser}
                        >
                            Novo Cadastro
                        </Button>
                    </form>
                </div>
            </Container>
        </main>
    )
}

export default Login
