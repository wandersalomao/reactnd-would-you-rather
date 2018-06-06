import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import './Leaderboard.css'

const Leaderboard = ({ userList }) => {

    return (
        <Fragment>
            <div className="page-bar">
                <div className="content-wrapper"> 
                    <div className="page-bar-items">
                        <span>Leaderboard</span>
                    </div>
                </div>    
            </div>

            <div className="content-wrapper"> 
                <ul className="leaderboard-list">

                    {userList.map((user, index) => (

                        <li className="leaderboard-entry" key={user.id}>
                            <div className="rank">
                                <span>{index+1}</span>
                                <hr/>
                            </div>
                            <div className="entry-user">
                                <div className="avatar" 
                                    style={{ 
                                        backgroundImage: `url(${user.avatarURL})`,
                                        width: '40px', 
                                        height: '40px'}}>
                                </div>
                                <span>{user.name}</span>
                            </div>
                            <div className="entry-info">
                                <span>ASKED</span>
                                <span>{user.asked}</span>
                            </div>
                            <div className="entry-info">
                                <span>ANSWERED</span>
                                <span>{user.answered}</span>
                            </div>
                            <div className="entry-info">
                                <span>SCORE</span>
                                <span>{user.score}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}

function mapStateToProps({ users }) {

    const userList = Object.keys(users)
        .map(id => {
            const user = users[id]
            const asked = user.questions.length
            const answered = Object.keys(user.answers).length

            return {...user, asked, answered, score: (asked + answered) }
        })
        .sort((a, b) => b.score - a.score)

    return {
        userList
    }
}

export default connect(mapStateToProps)(Leaderboard)