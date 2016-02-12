

import * as infs from '../interfaces/interfaces'


export const createRating = (): infs.Rating => {
    return {
        rating: 0,
        getVotesFor: () => 0,
        getVotesAgainst:()=> 0
    }
};

export const createCommunity = (name: string = 'community name'): infs.Community => {
    return {
        id: 5,
        avatar: {
            //'180':
        },
        name: name,
        getUrl: () => {
            return "/community/5"
        },
        rules: "community rules",
        categories: [
            {id: 1, name: 'community category 1'}
        ],
        //is_in_community: false,
        isInCommunity: () => this.is_in_community,
        user_group: 0,
        getGroup: () => this.user_group
    }
};

export const createContent = (type: string = 'article'): infs.Content => {

    return {
        id: 1,
        type: type,
        community: createCommunity(),
        user: createUser(),
        rating: createRating(),
        getEditorTitle: () => {return 'editor title'},
        text: "bla bla text",
        getUrl: () => {
            return "/content/5"
        },
        getSourceLink: () => {
            return "source_link";
        }
    }
};

export const createUser = (): infs.User => {
    return {
        getFioOrUsernameOrId: () => "username",
        getUrl: () => "/user/5",
        isOnline: () => true,
        avatar: {'50x50': 'http://new.maxpark.com/static/u/photo/4297852211/s.jpg'}
    }
};