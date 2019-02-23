import React, {Component} from 'react'
import {Link, Route, Switch, withRouter } from "react-router-dom";

import "./style.css";
import UserList from "./components/UserList"
import Home from "./components/Home"
import UserAdd from "./components/UserAdd"

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usersTotal: 0,
            usersGets: 0,
        }
    }

    handleClickGetUsers(data) {

        this.setState({
            usersTotal: data.usersTotal,
            usersGets: data.usersGets,
            newUser: false
        })
    }

    handleClickSaveUser(status) {
        this.setState({
            newUser: status,
        })
    }

    render() {
        const {usersTotal, usersGets} = this.state;

        return (
            <div className="app">
                <header className="card sticky-top bg-dark text-white p-4 rounded-0">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <h1 className="display-4">Список пользователей</h1>
                                <Link className="btn btn-info mt-3" to='/list'>Список юзеров</Link>
                            </div>
                            <div className="col-sm-4">
                                <p>
                                    Всего пользователей - {usersTotal}<br/>
                                    Загружено - {usersGets}
                                </p>
                                <UserAdd saveUser={::this.handleClickSaveUser}/>
                            </div>
                        </div>
                    </div>
                </header>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/list' render={() => <UserList newUser={this.state.newUser} getUsers={::this.handleClickGetUsers}/>}/>
                </Switch>
            </div>
        )
    }
}