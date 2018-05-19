import React, { Component } from 'react';

class InputField extends Component {
    render() {
        const {input, label, type, meta: { touched, error }} = this.props

        return (
            <div className="field-container">
                <input {...input} placeholder={label} type={type} />
                {touched && error && <div className="error">{error}</div>}
            </div>
        );
    }
}

export default InputField;