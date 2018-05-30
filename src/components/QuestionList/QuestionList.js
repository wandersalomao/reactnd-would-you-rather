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

    return {
        questionList: filterOption === QUESTIONS_FILTER.ANSWERED ? answered : unanswered
    }
}

export default connect(mapStateToProps)(QuestionList);