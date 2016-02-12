



import * as infs from '../interfaces/interfaces';

export class User implements infs.User{

    avatar:{ [key:string]:string; };

    first_name: string;
    last_name: string;
    username: string;
    fio_or_username_or_id: string;
    url: string;
    is_online: boolean;

    constructor() {

    }

    getFioOrUsernameOrId(): string {
        return this.fio_or_username_or_id
    }

    isOnline() {
        return this.is_online;
    }

    getUrl() {
        return this.url
    }

}


export class Content {

    url: string;
    title: string;
    editor_title: string;

    constructor() {

    }

    getUrl() {
        return this.url;
    }

    getEditorTitle() {
        return this.editor_title || this.title;
    }

}


export class Community implements infs.Community {

    is_in_community: boolean;

    isInCommunity(): boolean {
        return this.is_in_community;
    };

    private url: string;

    avatar:{ [key:string]:string; };
    name:string;
    getUrl() {
        return this.url;
    }string;
    rules:string;
    categories:Array<any>;

    id: number;

    constructor() {
    }

    getId(): number {
        return this.id
    }

    user_group: number;
    getGroup(): number {
        return this.user_group;
    }


}

export class Rating implements infs.Rating{
    getVotesFor = ()=>this.votes_for;
    getVotesAgainst= ()=>this.votes_against;

    rating:number;

    votes_for: number;
    votes_against: number;
}


export function mapContent(data): infs.Content {

    const user = Object.assign(new User(), data.user);
    const rating = Object.assign(new Rating(), data.rating);
    const community = Object.assign(new Community(), data.community);
    return Object.assign(new Content(), data, {user: user, rating: rating, community: community})

}