import React from 'react';
import PersonList from './PersonList.jsx';
import LoginForm from './LoginForm.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null,
            logged_in: null
        }
    }

    //store token in the local storage
    getToken = () => {
       return window.localStorage.getItem('_token');
    }
    //1st arg - name, 2nd arg - value
    setToken = (token) => {
        window.localStorage.setItem('_token', token);
    }

    componentDidMount = () => {
        //check if token exists
        if (null === this.getToken()) {
            this.setState({
                logged_in: false
            })
        } else {
            this.setState({
                logged_in: true
            })
        }
    }

    //hold on to token
    onLoginSuccess = (token) => {
        this.setToken(token);

        this.setState({
            logged_in: true,
            token: token
        })
    }

    render() {

        let content = 'Loading...';
        if (this.state.logged_in !== null) {
            if (this.state.logged_in) {
                content = <PersonList />;
            } else {
                content = <LoginForm onLoginSuccess={ this.onLoginSuccess }/>;
            }
        }

        return (
            <main>
                <h1>MI6 application</h1>
                
                { content }
                
            </main>
        )
    }
}