import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
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
            location,
            loading,
            question, 
            userAvatarURL,
            question: {
                optionOneCount, 
                optionTwoCount, 
                optionOnePercentage, 
                optionTwoPercentage
            }} = this.props
        
        // if loading, we just need to wait. 
        if (loading) {
            return (<div>Loading</div>)
        } else if ( Object.keys(question).length === 0 ) {
            // if the question does not exist, redirect the user to the 404 page
            return (<Redirect to={{ pathname: '/pageNotFound', state: { from: location } }} />)
        }
        
        // if the questions is answered, we will display the question with stats data. 
        if (question.answer) {
            return (
                <div className="content-wrapper">
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
                </div>
            )    
        } else {

            // if the question is not answered, we will display the question without stats and will allow the user to 
            // choose one of the available options. 
            return (
                <div className="content-wrapper">
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
                </div>    
            )
        }
    }
}

function mapStateToProps({ questions, users, auth }, props ) {

    const { id } = props.match.params
    const question = questions[id]

    // If we refresh the browser, it's possible that the initial data will still be loading, that's 
    // why we send a flag loading set to true, because being in a loading state is different from trying 
    // to display an invalid question. If the data is loaded but the question is empty, then we send an empty 
    // object so that when the component is rendered the user will be redirected to the 404 page
    if (!auth.loggedUserId) {
        return { loading: true, question: {} }
    } else if (!question) {
        return { loading: false, question: {} }
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