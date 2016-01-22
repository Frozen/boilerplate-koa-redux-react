



//export interface CommunityAvatar {
//
//}

export interface Community {
    id: number
    avatar: { [key:string]:string; }
    name: string
    getUrl: () => string
    rules: string
    categories: Array<any>

}

export interface User {
    getFioOrUsernameOrId: () => string
    getUrl: () => string
    isOnline: () => boolean
    //avatar: string
}

export interface Rating {
    votesFor: number
    votesAgainst: number
    rating: number
}

export interface Content {

    user: User
    community: Community
    rating: Rating

    getEditorTitle: () => string
    text: string
    type: string
    getUrl: () => string

}


export interface CommunityUser {

    community: Community
    user: User
    groupId: number
    isBlocked: boolean

}