import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router'

const Header = () => {
    const history = useHistory()
    
    return (
        <Button variant='text' color='inherit' onClick={() => {
            localStorage.clear()
            history.push('/login')
        }}>Log out</Button>
    )
}

export default Header
