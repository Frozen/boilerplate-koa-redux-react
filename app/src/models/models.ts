
import User from './User';

//export default {Content, User};


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