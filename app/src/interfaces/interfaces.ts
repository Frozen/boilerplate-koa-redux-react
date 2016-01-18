



//export interface CommunityAvatar {
//
//}

export interface Community {
    id: number
    avatar: { [key:string]:string; }
    name: string
    getUrl: () => string

}

export interface User {

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