import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css'
import axios from 'axios'

const Registration = () => {
    const [email, setEmail] = useState("");
    const [ password, setPassword] = useState("")
    const [ confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_ROOT}/register`, {
            name: 'Fred',
            email,
            password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div>
            <form className={styles.login_form} onSubmit={handleSubmit}>
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
                        <input type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    </div>
                    <div className={styles.form_field}>
                        <label>Confirm Pass:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => {
                            setConfirmPassword(e.target.confirmPassword)
                        }} />
                    </div>
                </div>
                {error &&  <p className='error'>Hello</p>}
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
