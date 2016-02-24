



//export interface CommunityAvatar {
//
//}

export interface Community {
    id: number
    avatar: { [key:string]:string; }
    name: string
    url: string
    //getUrl: () => string
    rules: string
    categories: Array<any>
    isInCommunity: () => boolean
    //getGroup: () => number
    user_group_id: number
}

export interface User {
    fio_or_username_or_id: string
    url : string
    is_online: boolean

    getFioOrUsernameOrId: () => string
    getUrl: () => string
    isOnline: () => boolean
    avatar: { [key:string]:string; }
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

    getEditorTitle: () => string
    text: string
    type: string
    getUrl: () => string
    getSourceLink: () => string


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
    //isBlocked: boolean

}

export interface CommunityAlbumPhoto {
    url: string
    '100x100': string
}

