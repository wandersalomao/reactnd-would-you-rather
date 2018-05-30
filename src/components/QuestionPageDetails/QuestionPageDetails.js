import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../../actions/question_actions'

class QuestionPage extends Component {

    handleOnClick(answer) {
        const { dispatch, loggedUserId, question: { id } } = this.props  
        dispatch(handleSaveQuestionAnswer({ 
            authedUser: loggedUserId, 
            qid: id,
            answer }))
    }

    render() {
        const {
            loading,
            question, 
            userAvatarURL,
            question: {
                optionOneCount, 
                optionTwoCount, 
                optionOnePercentage, 
                optionTwoPercentage
            }} = this.props
        
        if (loading) {
            return (<div>Loading</div>)
        }

        if (question.answer) {
            return (
                <div className="questions">
                    <div className="question">
                        <h2>
                            <div className='avatar'
                                style={{ backgroundImage: `url(${userAvatarURL})`}}>
                            </div>Would you rather...
                        </h2>
                        <div className="question-options">
                            <div className="question-option1">

                                {question.answer === 'optionOne' && 
                                    <div className="question-check">
                                        <i className="fas fa-check-circle fa-2x"></i>
                                    </div>
                                }

                                <span className="question-percentage">{optionOnePercentage}%</span>
                                <span className="question-votes">{optionOneCount} vote(s)</span>
                                <span className="question-answered">{question.optionOne.text}</span>
                            </div>
                            <div className="or-label">OR</div>
                            <div className="question-option2">
                                
                                {question.answer === 'optionTwo' && 
                                    <div className="question-check">
                                        <i className="fas fa-check-circle fa-2x"></i>
                                    </div>
                                }    
                                <span className="question-percentage">{optionTwoPercentage}%</span>
                                <span className="question-votes">{optionTwoCount} vote(s)</span>
                                <span className="question-answered">{question.optionTwo.text}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )    
        } else {
            return (
                <div className="questions">
                    <div className="question">
                        <h2>
                            <div className='avatar'
                                style={{ backgroundImage: `url(${userAvatarURL})`}}>
                            </div>Would you rather...
                        </h2>
                        <div className="question-options">
                            <div className="question-option1 question-option-clickable" 
                                onClick={ () => this.handleOnClick('optionOne')}>
                                <span>{question.optionOne.text}</span>
                            </div>
                            <div className="or-label">OR</div>
                            <div className="question-option2 question-option-clickable"
                                onClick={ () => this.handleOnClick('optionTwo')}>
                                <span>{question.optionTwo.text}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps({ questions, users, auth }, props ) {

    const { id } = props.match.params
    const question = questions[id]

    if (!question) {
        return { loading: true, question: {} }
    }

    const userAvatarURL = users[question.author].avatarURL
    let answer = null
    if (question.optionOne.votes.includes(auth.loggedUserId)) {
        answer = 'optionOne'
    } else if (question.optionTwo.votes.includes(auth.loggedUserId)) {
        answer = 'optionTwo'
    }

    const optionOneCount = question.optionOne.votes.length
    const optionTwoCount = question.optionTwo.votes.length
    const total = optionOneCount + optionTwoCount
    const optionOnePercentage = total === 0 ? 0 : parseInt(optionOneCount / total * 100, 10)
    const optionTwoPercentage = total === 0 ? 0 : parseInt(optionTwoCount / total * 100, 10)

    return {
        loggedUserId: auth.loggedUserId, 
        userAvatarURL,
        loading: false, 
        question: {
            ...question,
            answer, 
            optionOneCount, 
            optionTwoCount, 
            optionOnePercentage, 
            optionTwoPercentage
        }
    }
}

export default connect(mapStateToProps)(QuestionPage)