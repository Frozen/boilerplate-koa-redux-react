

import * as infs from '../interfaces/interfaces'


export const createRating = (): infs.Rating => {
    return {
        rating: 0,
        votesFor: 0,
        votesAgainst: 0
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
        ]
    }
};

export const createContent = (type: string = 'article'): infs.Content => {

    return {
        type: type,
        community: createCommunity(),
        user: createUser(),
        rating: createRating(),
        getEditorTitle: () => {return 'editor title'},
        text: "bla bla text",
        getUrl: () => {
            return "/content/5"
        }
    }
};

export const createUser = (): infs.User => {
    return {
        getFioOrUsernameOrId: () => "username",
        getUrl: () => "/user/5",
        isOnline: () => true
    }
};