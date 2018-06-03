import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import NewQuestion from '../NewQuestion';
import QuestionListPage from '../QuestionListPage';
import QuestionPageDetails from '../QuestionPageDetails'
import Leaderboard from '../Leaderboard';
import { logout } from '../../actions/auth_actions'
import './Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        this.props.dispatch(logout())
    }

    render() {
        const { match, user } = this.props
        const avatarURL = user ? user.avatarURL : '/images/default_avatar.png'

        return (
            
            <div className="dashboard">
                <div className="app-logo">
                    <h1>Would You Rather </h1>
                    <div>
                        <i className="far fa-question-circle fa-2x"></i>
                    </div>
                </div>

                <div className="content-wrapper">
                    <div className="app-bar">
                        <div className="app-bar-menus">
                            <div className='avatar'
                                style={{ backgroundImage: `url(${avatarURL})`}}>
                            </div>
                            <span>{user ? user.name : 'Anonymous'}</span>
                            <span>|</span>
                            <span className="logout"
                                onClick={this.onLogout}>Logout</span>
                        </div>
                    </div>
                </div>

                <aside className="menus">
                    <hr/>
                    <NavLink exact className="menu-item" 
                        to="/app/questions" 
                        activeClassName="menu-active">
                            <i className="far fa-question-circle"></i>
                            <span>Questions</span>
                    </NavLink>

                    <NavLink exact className="menu-item" 
                        to="/app/leaderboard" 
                        activeClassName="menu-active">
                            <i className="fas fa-list-ul"></i>
                            <span>Leaderboard</span>
                    </NavLink>

                </aside>

                <main>

                    {/* The routes defined here are: 
                        - '/app' => redirects to /app/questions because by default we always show the list of questions
                        - '/questions' => displays the list of questions
                        - '/leaderboard'=> displays the leaderboard 
                        - everything else is redirected to /notFound */}

                    <Switch>
                        <Redirect exact path={`${match.path}`} to={`${match.path}/questions`}/>
                        <Route exact path={`${match.path}/add`} component={NewQuestion} />
                        <Route exact path={`${match.path}/questions/:id`} component={QuestionPageDetails} />
                        <Route exact path={`${match.path}/questions`} component={QuestionListPage} />
                        <Route exact path={`${match.path}/leaderboard`} component={Leaderboard} />
                        <Redirect to="/notFound"/>
                    </Switch>
                </main>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, auth } = state

    return {
        user: users[auth.loggedUserId]
    }
}

export default connect(mapStateToProps)(Dashboard);