import React, { Component } from 'react'
import { history } from '../../history/history.js'
import './PageNotFound.css'

class PageNotFound extends Component {

    onHomeButtonClicked() {
        history.push('/')
    }

    render() {
        return (
            <main className="main-404">
                <h3 className="title-404">404</h3>
                <span className="line_1_404">Oops, sorry we can't find that page!</span>
                <br/>
                <span className="line_2_404">Either something went wrong or the page doesn't exist anymore.</span>
                <button className="home-button" onClick={() => this.onHomeButtonClicked()}>Home</button>
            </main>
        );
    }
}

export default PageNotFound;