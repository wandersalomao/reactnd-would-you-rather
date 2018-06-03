import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import { requiredValidation } from '../_utils/field-validation'
import { login } from '../../actions/auth_actions'
import InputField from '../InputField'
import SubmitForm from '../SubmitForm'

class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        const { username } = values 
        this.props.dispatch(login(username))
    }

    render() {
        return (
            <main className="main-auth">
                <div className="auth-container">
                    <h1>Welcome</h1>
                    <SubmitForm 
                        form="login"
                        className="auth-form"
                        buttonText="Sign in"
                        onSubmitForm={this.onSubmit}>                    
                    
                        <Field 
                            name="username" 
                            component={InputField}
                            type="text" 
                            placeholder="Username" 
                            validate={[requiredValidation]} />
                    </SubmitForm>

                    <div className="auth-links">
                        <span>Create an account? </span>
                        <Link to="/register">Sign up</Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default connect()(LoginPage);