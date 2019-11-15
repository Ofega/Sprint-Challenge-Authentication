import React, {useState} from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const newUser = {
    username: '',
    password: ''
}

const Register = (props) => {
    const [ user, setUser ] = useState(newUser)
    const { username, password } = user;

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(baseUrl + 'api/auth/register')
        axios.post(baseUrl + 'api/auth/register', user)
            .then(res => {
                console.log(res.data)
                props.history.push('/login');
            })
            .catch(err => {
                console.log(err)
            })

        setUser(newUser);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange} value={username} placeholder="Type your username here..." />
            </div>

            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={password} placeholder="Type your password here..." />
            </div>

            <button type="submit">Register</button>
        </form>
    )
  
}

export default Register;