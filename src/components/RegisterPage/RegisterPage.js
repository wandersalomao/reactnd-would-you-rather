import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import { requiredValidation } from '../_utils/field-validation'
import { register } from '../../actions/auth_actions'
import InputField from '../InputField'
import SubmitForm from '../SubmitForm'

const RegisterPage = ({ dispatch }) => {
 
    const onSubmit = (values) => {
        const { username, name } = values
        dispatch(register(username, name))
    }

    return (
        <main className="main-auth">
            <div className="auth-container">
                <h1>Sign up</h1>

                <SubmitForm 
                    form="register"
                    className="auth-form"
                    buttonText="Register"
                    onSubmitForm={(values) => onSubmit(values)}>

                    <Field 
                        name="username" 
                        component={InputField}
                        type="text" 
                        placeholder="Username" 
                        validate={[requiredValidation]} />

                    <Field 
                        name="name" 
                        component={InputField}
                        type="text" 
                        placeholder="Full Name" 
                        validate={[requiredValidation]} />
                    
                </SubmitForm>

                <div className="auth-links">
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                </div>                    
            </div>
        </main>
    );
}

export default connect()(RegisterPage);