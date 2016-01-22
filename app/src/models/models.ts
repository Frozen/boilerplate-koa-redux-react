


export class User {

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


export class Content {

    private obj: any;

    constructor(obj: any) {
        this.obj = obj
    }

}


export class Community {

    id: number;

    constructor() {
    }

    getId(): number {
        return this.id
    }


}