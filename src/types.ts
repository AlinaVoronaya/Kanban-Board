export interface ColumnType {
    id: number,
    title: string,
}

export interface CardType {
    id: number,
    title: string,
    text: string,
    columnId: number,
    comments: Array<CommentType>
}

export interface CommentType {
    id: number,
    username: string,
    text: string,
}