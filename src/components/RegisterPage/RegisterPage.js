import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import { requiredValidation } from '../_utils/field-validation'
import InputField from '../InputField'
import SubmitForm from '../SubmitForm'

class RegisterPage extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = { isFormValid: false }
    }

    onSubmit(values) {
        const { username, name } = values
        alert(username + ', ' + name)
        // this.props.dispatch(login(username))
    }

    render() {
        return (
            <main className="main-auth">
                <div className="auth-container">
                    <h1>Sign up</h1>

                    <SubmitForm 
                        form="register"
                        className="auth-form"
                        buttonText="Register"
                        onSubmitForm={this.onSubmit}>

                        <Field 
                            name="username" 
                            component={InputField}
                            type="text" 
                            label="Username" 
                            validate={[requiredValidation]} />

                        <Field 
                            name="name" 
                            component={InputField}
                            type="text" 
                            label="Full Name" 
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
}

export default connect()(RegisterPage);