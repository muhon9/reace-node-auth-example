import React from 'react';


const Login = () => {
    return (
        <form className='login_form'>
            <div className='form_title'>Login Page</div>
            <div className='form_field'>
                <label>Email:</label>
                <input type="text" />
            </div>
            <div className='form_field'>
                <label>Password:</label>
                <input type="text" />
            </div>
        </form>
    );
}

export default Login;
