/**
 * Created by kot on 16.01.16.
 */



export default class User {

    private userObj: any;

    constructor(userObj) {
        this.userObj = userObj
    }

    getFioOrUsernameOrId(): string {
        if (this.userObj.first_name && this.userObj.last_name) {
            return `${this.userObj.first_name} ${this.userObj.last_name}`
        }
        if (this.userObj.first_name) {
            return this.userObj.first_name
        }
        if (this.userObj.last_name) {
            return this.userObj.last_name
        }
        if (this.userObj.username) {
            return this.userObj.username;
        }
        return "" + this.userObj.id;
    }




}
