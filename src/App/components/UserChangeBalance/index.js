import React, {Component} from 'react'

import $ from 'jquery'; // Меня вынудил бутстрап
import 'bootstrap/dist/js/bootstrap.bundle.js'
import {DEFAULT_CURRENCY} from "../../constants";


import User from "../../issues/User";

export default class UserChangeBalance extends Component {

    constructor(props) {

        super(props);

        this.state = {
            user_id: props.user.user_id,
            user_custom: props.user.user_custom,
            wallet_currency: props.user.wallet_currency ? props.user.wallet_currency : DEFAULT_CURRENCY,
            balance: 0,
            comment: ''
        };
    }

    editBalance(event) {

        const form = $(event.target).closest("form")[0];
        const modal = $(event.target).closest(".modal");

        if (form.checkValidity() !== false) {

            event.preventDefault();

            this.setState({isLoading: true});
            const user = new User(this.state);

            user.updateBalance().then(answer => {

                this.setState({isLoading: false});

                if (answer.status) {

                    this.setState({
                        error: false,
                        message: "",
                        balance: 0,
                        comment: ""
                    });

                    modal.modal('hide');
                    this.props.editBalance({balance: answer.amount});

                } else {
                    
                    this.setState({
                        error: true,
                        message: answer.message
                    })
                }
            });
        }
    }

    handleInputChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });

    }

    render() {
        const {
            user_id,
            user_custom,
            balance,
            wallet_currency,
            comment
        } = this.state;

        return <span>
            <button type="button" className="btn mr-3" data-toggle="modal" data-target={`#balance_${user_id}`}>
                Изменить баланс
            </button>

            <div className="modal fade" id={`balance_${user_id}`} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <form className="needs-validation" data-toggle="validator" role="form">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Изменить баланс у {user_custom}
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <div className="form-group mt-3">
                                        <label htmlFor="balance">Добавить {balance} {wallet_currency}</label>
                                        <input type="number"
                                               className="form-control"
                                               placeholder="Баланс"
                                               name="balance"
                                               value={balance}
                                               onChange={::this.handleInputChange}
                                               required
                                        />
                                    </div>
                                       <div className="form-group mt-3">
                                        <label htmlFor="comment">Комментарий</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="Комментарий"
                                               name="comment"
                                               value={comment}
                                               onChange={::this.handleInputChange}
                                               required
                                        />
                                    </div>
                                </div>
                                {this.state.error && <div className="text-danger">{this.state.message}</div>}
                            </div>
                           
                            <div className="modal-footer justify-content-start">
                                <button type="submit" className="btn btn-primary"
                                        disabled={this.state.isLoading}
                                        onClick={::this.editBalance}>Изменить
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </span>
    }
}