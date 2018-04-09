import React, {Component} from 'react'

import $ from 'jquery'; // Меня вынудил бутстрап
import 'bootstrap/dist/js/bootstrap.bundle.js'

import User from "../../issues/User";

export default class UserEdit extends Component {

    constructor(props) {

        super(props);

        this.state = {
            user_id: props.user.user_id,
            user_name: props.user.user_name ? props.user.user_name : "",
            user_custom: props.user.user_custom ? props.user.user_custom : "",
            email: props.user.email ? props.user.email : "",
            enabled: props.user.enabled
        };
    }

    saveUser(event) {

        const form = $(event.target).closest("form")[0];
        const modal = $(event.target).closest(".modal");

        if (form.checkValidity() !== false) {

            event.preventDefault();

            this.setState({isLoading: true});
            const user = new User(this.state);

            user.updateData().then(answer => {
                this.setState({isLoading: false});
                
                if (answer.status) {

                    this.setState({
                        error: false,
                        message: ""
                    });

                    modal.modal('hide');
                    this.props.editUser(this.state);

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
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });

    }

    render() {
        const {
            user_id,
            user_name,
            user_custom,
            email,
            enabled,
        } = this.state;

        const user_oldName = this.props.user.user_name;
        const user_oldCustom = this.props.user.user_custom;

        return <span>
            <button type="button" className="btn btn-primary mr-3" data-toggle="modal" data-target={`#data_${user_id}`}>
                Редактировать данные
            </button>

            <div className="modal fade" id={`data_${user_id}`} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <form className="needs-validation" data-toggle="validator" role="form">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{user_oldCustom} ({user_oldName})</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <div className="form-group">
                                        <label htmlFor="user_custom">Псевдоним</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="Псевдоним"
                                               name="user_custom"
                                               value={user_custom}
                                               onChange={::this.handleInputChange}
                                               required
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                         <label htmlFor="user_name">Имя</label>
                                         <input type="text"
                                                className="form-control custom"
                                                placeholder="Имя пользователя"
                                                name="user_name"
                                                value={user_name}
                                                onChange={::this.handleInputChange}
                                                required
                                         />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Email">Email</label>
                                        <input type="email"
                                               className="form-control"
                                               placeholder="Email"
                                               name="email"
                                               value={email}
                                               onChange={::this.handleInputChange}
                                               required
                                        />
                                    </div>
                                   
                                    <div className="form-check mt-3">
                                         <input type="checkbox"
                                                className="form-check-input"
                                                name="enabled"
                                                id={`check${user_id}`}
                                                checked={enabled}
                                                onChange={::this.handleInputChange}
                                         />
                                        <label className="form-check-label"
                                               htmlFor={`check${user_id}`}>Активность</label>
                                    </div>
                                </div>
                                {this.state.error && <div className="text-danger">{this.state.message}</div>}
                            </div>
                           
                            <div className="modal-footer justify-content-start">
                                <button type="submit" className="btn btn-primary" disabled={this.state.isLoading}
                                        onClick={::this.saveUser}>Сохранить</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </span>
    }
}