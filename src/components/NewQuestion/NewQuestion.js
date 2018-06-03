import React, { Component } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { requiredValidation } from '../_utils/field-validation'
import InputField from '../InputField'
import SubmitForm from '../SubmitForm'
import { handleSaveQuestion } from '../../actions/question_actions'
import './NewQuestion.css'

class NewQuestion extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        const { dispatch } = this.props
        dispatch(handleSaveQuestion(values))
    }

    render() {
        return (
            
            <div className="new-question-container">
                    <h1>Would You Rather</h1>
                    <SubmitForm 
                        form="newQuestion"
                        className="new-question-form"
                        buttonText="Save"
                        onSubmitForm={this.onSubmit}>                    
                    
                        <Field
                            name="optionOneText" 
                            component={InputField}
                            type="text" 
                            label="Option One: " 
                            validate={[requiredValidation]} />

                        <Field
                            name="optionTwoText" 
                            component={InputField}
                            type="text" 
                            label="Option Two: " 
                            validate={[requiredValidation]} />

                    </SubmitForm>
                
            </div>
        )
    }
}

export default connect()(NewQuestion)