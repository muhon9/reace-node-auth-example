import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css'


const Login = () => {
    const [email, setEmail] = useState("");
    const [ password, setPassword] = useState("")

    console.log("Node", import.meta.env.VITE_API_ROOT)
    function handleSubmit(e){
        e.preventDefault()
        prompt(email,password)
    }

    return (
        <div>
            <form className={styles.login_form} onSubmit={handleSubmit}>
                <div className={styles.form_title}>Login</div>
                <div className={styles.form_fields}>
                    <div className={styles.form_field}>
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    <div className={styles.form_field}>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className={styles.button}>
                    <button type='submit'>Login</button>
                </div>
            </form>
        <div className={styles.signup_call}> 
            Don't have account? <Link to="/registration" >Sign Up</Link>
        </div>
        </div>
    );
}

export default Login;
