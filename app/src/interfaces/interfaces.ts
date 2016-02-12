



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
    isInCommunity: () => boolean
    getGroup: () => number
    user_group: number
}

export interface User {
    getFioOrUsernameOrId: () => string
    getUrl: () => string
    isOnline: () => boolean
    avatar: { [key:string]:string; }
    //avatar: string
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

    community: Community
    user: User
    groupId: number
    isBlocked: boolean

}