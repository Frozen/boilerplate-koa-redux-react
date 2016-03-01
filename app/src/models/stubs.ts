

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
        url: "/community/5",
        rules: "community rules",
        categories: [
            {id: 1, name: 'community category 1'}
        ],
        //is_in_community: false,
        isInCommunity: () => this.is_in_community,
        user_group_id: 0,
        description: "community description full",
        short_description: "community description"
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
        source_link: "source_link",
        url: "/content/5",
        image: "/static/image",
        editor_title: "editor title",
        comments_count: 5
    }
};

export const createUser = (): infs.User => {
    return {
        fio_or_username_or_id: "username",
        url: "/user/5",
        is_online: true,
        getFioOrUsernameOrId: () => "username",
        getUrl: () => "/user/5",
        isOnline: () => true,
        avatar: {'50x50': 'http://new.maxpark.com/static/u/photo/4297852211/s.jpg'}
    }
};