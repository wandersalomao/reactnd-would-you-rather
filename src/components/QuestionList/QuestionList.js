import React, { Component } from 'react';
import { connect } from 'react-redux'
import { QUESTIONS_FILTER } from '../_utils/constants'
import PropTypes from 'prop-types'
import Question from '../Question'

class QuestionList extends Component {
    
    static propTypes = {
        filterOption: PropTypes.string.isRequired
    }

    render() {
        const { questionList } = this.props

        return (
            <div className="content-wrapper">
                <ul className="questions">
                    {questionList.map((id) => (
                        <li key={id}>
                            <Question id={id}/>
                        </li>
                    ))}
                </ul>
            </div> 
        );
    }
}

function mapStateToProps({ auth, questions, users }, { filterOption }) {
    
    const user = users[auth.loggedUserId]
    if (!user) {
        return { questionList: [] }
    }

    const answered = Object.keys(user.answers)
    const unanswered = Object.keys(questions).filter(id => !answered.includes(id))

    // sort the question list by the time of creation from the most recent to the older ones.
    let questionList = filterOption === QUESTIONS_FILTER.ANSWERED ? answered : unanswered
    questionList = questionList.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    return {
        questionList
    }
}

export default connect(mapStateToProps)(QuestionList);