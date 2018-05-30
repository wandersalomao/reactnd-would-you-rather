import React, { Component, Fragment } from 'react'
import { QUESTIONS_FILTER } from '../_utils/constants'
import QuestionList from '../QuestionList'
import './QuestionListPage.css'

class QuestionListPage extends Component {
    
    constructor(props) {
        super(props)
        this.state = { filterOption: QUESTIONS_FILTER.UNANSWERED }
    }

    onFilterClicked(filterOption) {
        this.setState(() => ({ filterOption }))
    }

    render() {
        const { filterOption } = this.state

        return (
            <Fragment>
                <div className="page-bar">
                    <div className="content-wrapper">
                        <div className="page-bar-items">
                            <span 
                                className={ filterOption === QUESTIONS_FILTER.UNANSWERED ? 'active' : ''}
                                onClick={() => this.onFilterClicked(QUESTIONS_FILTER.UNANSWERED)}>
                                Unanswered
                            </span>

                            <span>|</span>

                            <span 
                                className={ filterOption === QUESTIONS_FILTER.ANSWERED ? 'active' : ''}
                                onClick={() => this.onFilterClicked(QUESTIONS_FILTER.ANSWERED)}>
                                Answered
                            </span>

                            <button>Add Question</button>
                        </div>                        
                    </div>
                </div>

                <QuestionList filterOption={filterOption} />

            </Fragment>
        );
    }
}

export default QuestionListPage;