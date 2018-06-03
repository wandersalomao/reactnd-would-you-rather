import React, { Component } from 'react';

class InputField extends Component {
    render() {
        const { input, label, placeholder, type, meta: { touched, error } } = this.props

        return (
            <div className="field-container">
                {label && <label>{label}</label>}
                <input {...input} placeholder={placeholder} type={type} />
                {touched && error && <div className="error">{error}</div>}
            </div>
        );
    }
}

export default InputField;