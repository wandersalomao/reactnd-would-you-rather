import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { history } from '../../history/history.js'

class Question extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    handleOnClick() {
        const { id } = this.props
        history.push(`/app/question/${id}`)
    }

    render() {
        const { question, userAvatarURL } = this.props

        return (
            <div className="question question-clickable" onClick={this.handleOnClick}>
                <h2>
                    <div className='avatar'
                        style={{ backgroundImage: `url(${userAvatarURL})`}}>
                    </div>Would you rather...
                </h2>
                <div className="question-options">
                    <div className="question-option1">
                        <span>{question.optionOne.text}</span>
                    </div>
                    <div className="or-label">OR</div>
                    <div className="question-option2">
                        <span>{question.optionTwo.text}</span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, auth }, { id }) {
    const question = questions[id]
    const userAvatarURL = users[question.author].avatarURL

    return {
        userAvatarURL,
        question
    }
}

export default connect(mapStateToProps)(Question)