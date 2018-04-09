import {API_PATH, COUNT_GET_USERS} from "../../constants";
import {ISODateString} from "../../helper"

export default class User {

    constructor(data) {

        this.apiPath = API_PATH;
        this.countGetsUsers = COUNT_GET_USERS;

        this.userData = {
            user_id: data.user_id,
            user_name: data.user_name,
            user_custom: data.user_custom,
            email: data.email,
            enabled: data.enabled,
        };

        this.amountData = {
            balance: data.balance,
            wallet_currency: data.wallet_currency,
            comment: data.comment
        }

    }
    
    create() {

        const requestPath = this.apiPath + `users`;
        const data = JSON.stringify(this.userData);
        return fetch(requestPath, {
            method: 'post',
            body: data
        }).then(response => {

            return response.text();
            
        }).then(response =>{

            let answer = {
                status: false,
                message: '',
            };

            if (response) {
                answer.message = JSON.parse(response).message;
            }
            else {
                answer.status = true;
            }

            return answer;
            
        })


    }

    updateData() {

        const requestPath = this.apiPath + `users/${this.userData.user_id}`;
        const data = JSON.stringify(this.userData);

        return fetch(requestPath, {
            method: 'put',
            body: data
        }).then(response => {

            return response.text()

        }).then(response => {

            let answer = {
                status: false,
                message: '',
            };

            if (response) {
                answer.message = JSON.parse(response).message;
            }
            else {
                answer.status = true;
            }

            return answer;
        })


    }

    updateBalance() {

        const requestPath = this.apiPath + `users/${this.userData.user_id}/recharge`;

        const data = JSON.stringify({
            amount: this.amountData.balance,
            comment: this.amountData.comment
        });

        return fetch(requestPath, {
            method: 'post',
            body: data
        }).then((response) => {

            return response.json();

        }).then(response => {

            let answer = {
                status: false,
                message: '',
                amount: response.amount
            };

            if (response.http_status_code !== 422 && response.amount !== undefined) {
                answer.status = true;
            } else {
                answer.message = response.message;
            }

            return answer;

        });
    }
    
    getTransactions(fromDate, toDate) {

        toDate = toDate.getTime() + 3 * 3600 * 1000; //Поправка на косяк Api работы с датой

        fromDate = new Date(fromDate);
        toDate = new Date(toDate);

        fromDate = ISODateString(fromDate);
        toDate = ISODateString(toDate);

        let url = new URL(this.apiPath + `users/${this.userData.user_id}/transactions`);
        let params = {
            datetime_from: fromDate,
            datetime_to: toDate
        };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const requestPath = url.href;

        return fetch(requestPath)
            .then((response) => {
                return response.json();
            })

    }

}