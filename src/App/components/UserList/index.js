import React, {Component} from 'react'

import UserCart from "../UserCart"
import {API_PATH, COUNT_GET_USERS} from "../../constants"

export default class UserList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            usersTotal: 0,
            usersGets: 0,
            isLoading: false,
            error:false,
            message:''
        };

        this.offset = 0;
    }

    getUserList() {

        const requestPath = API_PATH + `users?offset=${this.offset}&limit=${COUNT_GET_USERS}`;
        
        this.setState({isLoading: true});

        return fetch(requestPath)
            .then((response) => {
                return response.json();
            })
            .then(response => {

                if (response.recordsTotal && response.data) {
                    
                    this.offset += response.data.length;

                    let oldUserList = this.state.userList;
                    let newUserList = oldUserList.concat(response.data);
                    
                    this.setState({
                        userList: newUserList,
                        usersTotal: response.recordsTotal,
                        usersGets: this.state.usersGets + response.data.length,
                        isLoading: false,
                        error:false
                    });

                    this.props.getUsers(this.state);
                }else{
                    
                    this.setState({
                        error:true,
                        message: response.message
                    });
                }
                
            })
    }

    componentWillMount() {
        
        ::this.getUserList();
    }

    componentWillReceiveProps(nextProps){
       
        if(nextProps.newUser){

            this.offset = 0;
            this.setState({
                userList: [],
                usersTotal: 0,
                usersGets: 0,
                isLoading: false,
                error:false,
                message:''
            });
            
            ::this.getUserList();
        }
        
    }

    renderUserList() {
        const {userList,error,message} = this.state;
        let userCarts = "Загрузка...";
        if (userList.length) {
            userCarts = userList.map((user, index) =>
                <UserCart key={user.user_id} user={user}/>
            );
        }
        else if(error){
            userCarts = message;
        }

        return userCarts
    }

    render() {

        const {userList, isLoading,usersTotal,usersGets} = this.state;
        const userCarts = ::this.renderUserList();

        return (
            <div className="container">
                {userCarts}
                {userList.length > 0 && !isLoading && (usersTotal!==usersGets) &&  <div className="row text-center mt-5 mb-5">
                    <div className="col-sm-12">
                        <button type="button" className="btn btn-primary btn-lg" onClick={::this.getUserList}>
                            Загрузить еще
                        </button>
                    </div>
                </div>}
            </div>
        )
    }
}