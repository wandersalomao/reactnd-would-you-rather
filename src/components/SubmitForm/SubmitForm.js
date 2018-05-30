import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

class SubmitForm extends Component {

    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        onSubmitForm: PropTypes.func.isRequired, 
        form: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { isFormValid: false }
    }

    componentWillReceiveProps(nextProps) {
        /**
         * redux-form provides a prop named 'valid' that indicates if the form is valid or not
         * We are using this property here to change the state and enable/disable the button
         */
        const { valid } = nextProps
        const { isFormValid } = this.state

        if (valid !== isFormValid) {
            this.setState(() => ({ isFormValid: valid }))
        }
    }

    render() {
        // handleSubmit is provided by redux-form
        const { buttonText, className, handleSubmit, onSubmitForm } = this.props
        const { isFormValid } = this.state
        
        return (
            <form 
                className={className} 
                onSubmit={handleSubmit(onSubmitForm)}>
                    {this.props.children}
                    <button disabled={!isFormValid}>{buttonText}</button>
            </form>
        );
    }
}

export default reduxForm({})(SubmitForm);