import React, {Component} from 'react'

export default class Transaction extends Component {
    
    openCart(e){
        
        e.preventDefault();
    }
    
    render() {
        const {
            operation_id,
            comment,
            transaction_id,
            coupon_code,
            transaction_type,
            date,
            amount,
            sum,
            currency,
            status,
            user_balance,
        } = this.props.transaction;
        
        return (
            <div className="card mb-3">
                <div className="card-header" id={`headingOne_${operation_id}`}>
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" onClick={this.openCart}
                                data-target={`#tr_${operation_id}`}
                                aria-expanded="true">
                            Транзакция "{comment}"
                        </button>
                    </h5>
                </div>

                <div id={`tr_${operation_id}`} className="collapse" data-parent="#accordion"
                     aria-labelledby={`#headingOne_${operation_id}`}>

                    <ul className="list-group mb-2">
                        {transaction_id &&
                        <li className="list-group-item">ID транзакции - {transaction_id}</li>}
                        {coupon_code &&
                        <li className="list-group-item">Купон - {coupon_code}</li>}
                        {transaction_type &&
                        <li className="list-group-item">Тип транзакции - {transaction_type}</li>}
                        {date &&
                        <li className="list-group-item">Дата транзакции - {date}</li>}
                        {amount &&
                        <li className="list-group-item">Сумма транзакции - {amount}</li>}
                        {sum &&
                        <li className="list-group-item">Сумма транзакции - {sum}</li>}
                        {currency &&
                        <li className="list-group-item">Валюта транзакции - {currency}</li>}
                        {status &&
                        <li className="list-group-item">Статус транзакции - {status}</li>}
                        {user_balance &&
                        <li className="list-group-item">Баланс - {user_balance}</li>}
                    </ul>

                </div>
            </div>
        )
    }
}