import React, {Component} from 'react'

import UserEdit from "../UserEdit";
import UserChangeBalance from "../UserChangeBalance";
import UserTransactions from "../UserTransactions";

export default class UserCart extends Component {


    constructor(props) {
        super(props);

        this.state = props.user;
    }

    editUser(data) {
        this.setState(data)
    }

    render() {
        const {
            user_id,
            user_name,
            user_custom,
            email,
            register_date,
            balance,
            wallet_amount,
            wallet_currency,
        } = this.state;
        
        return (
            <div className="card bg-light mt-3">
                <div className="card-body bg-dark text-white">
                    <h5 className="card-title">{user_custom}</h5>
                    <p className="card-text">{user_name}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Email - {email}</li>
                    <li className="list-group-item">Дата регистрации - {register_date}</li>
                    <li className="list-group-item">Баланс - {balance} {wallet_currency}</li>
                    <li className="list-group-item">Размер кошелька - {wallet_amount}</li>
                </ul>
                <div className="card-footer">
                    <UserEdit user={this.props.user} editUser={::this.editUser}/>
                    <UserChangeBalance user={this.props.user} editBalance={::this.editUser}/>
                    <UserTransactions user_id={user_id} user_custom={user_custom} register_date={register_date}/>
                </div>
            </div>
        )
    }
}