import React, {Component} from 'react'

import $ from 'jquery'; // Меня вынудил бутстрап
import 'bootstrap/dist/js/bootstrap.bundle.js'

import User from "../../issues/User";
import Transaction from "../Transaction";

export default class UserTransactions extends Component {

    constructor(props) {

        super(props);

        this.state = {
            transactions: [],
        };

    }

    getTransactions() {

        const user = new User({user_id: this.props.user_id});

        this.setState({isLoading:true});
        
        user.getTransactions(this.props.register_date, new Date())
            .then(transactions => {

                this.setState({
                    transactions,
                    isLoading:false
                });
            });
    }

    renderTransactionList() {

        let result = false;
        if (this.state.transactions.length && !this.state.isLoading) {

            const list = this.state.transactions.map((transaction, index) => {
                return <Transaction key={transaction.operation_id} transaction={transaction} />
            });

            result = <div id="accordion">{list}</div>
        }
        else if(!this.state.transactions.length &&!this.state.isLoading) {
            result = "Транзакций нет";
        }
        else if(this.state.isLoading) {
            result = "Загрузка...";
        }
        
        return result;
    }

    render() {
        const {
            user_id,
            user_custom,
        } = this.props;

        const transactions = ::this.renderTransactionList();

        return <span>
            <button type="button" className="btn mr-3" data-toggle="modal" data-target={`#transact_${user_id}`}
                    onClick={::this.getTransactions}>
                Прсмотреть операции
            </button>

            <div className="modal fade" id={`transact_${user_id}`} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <form className="needs-validation" data-toggle="validator" role="form">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Операции пользователя {user_custom}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {transactions}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </span>
    }
}