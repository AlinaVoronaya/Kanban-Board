export interface Column {
    id: number,
    title: string,
}

export interface Card {
    id: number,
    title: string,
    text: string,
    columnId: number,
    comments: Array<Comment>
}

export interface Comment {
    username: string,
    text: string,
}