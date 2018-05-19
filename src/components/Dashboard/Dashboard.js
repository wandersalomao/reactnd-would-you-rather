import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import QuestionList from '../QuestionList';
import Leaderboard from '../Leaderboard';
import './Dashboard.css';

class Dashboard extends Component {
    render() {
        const { match } = this.props
        
        return (
            <div>
                <header>
                    <h1>Welcome to our app!</h1>
                    <nav>
                        <NavLink to="/app/questions" exact activeClassName="active">Questions</NavLink>
                        <br/>
                        <NavLink to="/app/leaderboard" activeClassName="active">Leaderboard</NavLink>
                    </nav>
                </header>
                <hr/>

                <Switch>
                    <Route exact path={`${match.path}`} component={QuestionList} />
                    <Route exact path={`${match.path}/questions`} component={QuestionList} />
                    <Route exact path={`${match.path}/leaderboard`} component={Leaderboard} />
                    <Redirect to="/notFound"/>
                </Switch>
            </div>   
        );
    }
}

export default Dashboard;