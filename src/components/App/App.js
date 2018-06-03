import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import PageNotFound from '../PageNotFound'
import Dashboard from '../Dashboard'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../../actions/shared_actions'
import { PrivateRoute } from '../PrivateRoute'
import { history } from '../../history/history.js';
import './App.css';

class App extends Component {

    /**
     * Load the initial data once the App component is ready
     */
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router history={history}>
                <Fragment>
                    <LoadingBar />
                    
                    <div id="alert-message">Alert Message goes here...</div>
                        {this.props.loading === true ? null : 
                    <div>
						<Switch>
							<Redirect exact path="/" to="/app" />
							<Route path="/login" component={LoginPage} />
							<Route path="/register" component={RegisterPage} />
							<PrivateRoute path="/app" component={Dashboard} />
							<Route component={PageNotFound} />
						</Switch>
                    </div>}
                </Fragment>
            </Router>
    );
  }
}

function mapStateToProps(state) {
    const { alert, users } = state

    return {
        message: alert.message, 
        loading: Object.keys(users).length === 0
    }
}

export default connect(mapStateToProps)(App)