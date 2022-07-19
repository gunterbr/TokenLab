import React, { useState } from 'react'
import { Container, Paper, Typography, TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { useHistory } from 'react-router'
import '../Dashboard/main.css'

const User = () => {
    const [body, setBody] = useState({ user: '', username: '', password: '' })
    const { push } = useHistory()

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }

    const onSubmit = () => {
        axios.post('http://localhost:4000/api/newuser', body)
            .then(({ data }) => {
                localStorage.setItem('auth', '"yes"')
                push('/login')
            })
            .catch(({ response }) => {
                console.log(response.data)
            })
    }

    return (
        <main className='home-login'>
            <Container component={Paper} elevation={5} maxWidth='xs'>
                <div>
                    <Typography component='h1' variant='h5'>Registro</Typography>
                    <form>  
                        <TextField
                            fullWidth
                            autoFocus
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Nome'
                            value={body.user}
                            onChange={inputChange}
                            name='user'
                        />
                        <TextField
                            fullWidth
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Apelido'
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
                            color='secondary'
                            onClick={onSubmit}
                        >
                            registrar
                        </Button>
                    </form>
                </div>
            </Container>
        </main>
    )
}

export default User
