



//export interface CommunityAvatar {
//
//}

export interface CommunityRubric {
    id: number
    name: string
}

export interface Community {
    id: number
    avatar: { [key:string]:string; }
    name: string
    url: string
    rules: string
    rubrics: Array<CommunityRubric>
    user_group_id: number
    description: string
    short_description: string
    category: string
    subcategory: string
}

export interface User {
    fio_or_username_or_id: string
    url : string
    is_online: boolean

    getFioOrUsernameOrId: () => string
    getUrl: () => string
    isOnline: () => boolean
    avatar: { [key:string]:string; }
    id: number
}

export interface Rating {
    getVotesFor: () => number
    getVotesAgainst: () => number
    rating: number
}

export interface Content {

    id: number
    user: User
    community: Community
    rating: Rating
    text: string
    type: string
    source_link: string
    image: string
    editor_title: string
    url: string
    comments_count: number
    time_create: string


}


export interface CommunityUser {

    user: User
    user_group_id: number
    //isBlocked: boolean

}

export interface CommunityAlbum {

    name: string
    photos_count: number
    photos: Array<CommunityAlbumPhoto>

}

export interface CommunityAlbumPhoto {
    url: string
    '100x100': string
}

// страница друзья, друг
export interface FriendUserFriend {
    user: User
    friends_count: number
    friends_count_text_plural: string
    message?: string
}



