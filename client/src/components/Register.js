import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css'

const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    }) 

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submitting user", user)
        axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/journals/view')
            })
            .catch ((err) => {
                console.log(err, "this isn't working");
                console.log(err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
                
            });
    };

return (
    
    <div className="registerPage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="registerContainer">
            <h1 style={{ textAlign: 'center'}}>Register</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <input className='form-control' type="text" placeholder='Name' onChange={changeHandler} value={user.name} name="name"/>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <br/>
                <div>
                    <input className='form-control' type="email" placeholder='Email' onChange={changeHandler} value={user.email} name="email" />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <br/>
                <div>
                    <input className='form-control' type="password" placeholder='Password' onChange={changeHandler} value={user.password} name="password" />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <br/>
                <div>
                    <input className='form-control' type="password" placeholder='Confirm Password' onChange={changeHandler} value={user.confirmPassword} name="confirmPassword"/>
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <br/>
                <div style={{ textAlign: 'center'}}>
                    <button>Register</button>
                </div>
            </form>
        </div>
    </div>
)
}

export default Register