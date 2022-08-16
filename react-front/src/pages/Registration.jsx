import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css'


const Registration = () => {
    const [email, setEmail] = useState("");
    const [ password, setPassword] = useState("")
    const [ confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault()
        prompt(email,password, confirmPassword)
    }

    return (
        <div>
            <form className={styles.login_form}>
            <div className={styles.form_title}>Sign Up</div>
            <div className={styles.form_fields}>
                <div className={styles.form_field}>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                </div>
                <div className={styles.form_field}>
                    <label>Password:</label>
                    <input type="text" value={password} onChange={(e) => {
                        
                    }}/>
                </div>
                <div className={styles.form_field}>
                    <label>Confirm Pass:</label>
                    <input type="text" />
                </div>
            </div>
            <div className={styles.button}>
                <button type='submit'>Sign Up</button>
            </div>
        </form>
        <div className={styles.signup_call}> 
            Already have account? <Link to="/login" >Login</Link>
        </div>
        </div>
    );
    
}

export default Registration;
