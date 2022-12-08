import React, {useState} from "react";
import './App.scss';
import {AppColumn} from "./Components/AppColumn/AppColumn";
import {UserNameModal} from "./Components/UserNameModal/UserNameModal";
import {CardType} from "./types";
import {ColumnType} from "./types";

const defaultCards = [
    {
        id: 1,
        title: 'Important',
        text: 'First task',
        columnId: 1,
        comments: []
    },
    {
        id: 2,
        title: 'For school',
        text: 'Second task',
        columnId: 2,
        comments: [
            {
                id: 1,
                username: "Вася",
                text: "LOL"
            }
        ]
    },
    {
        id: 3,
        title: 'Work',
        text: 'Third task',
        columnId: 3,
        comments: []
    },
    {
        id: 4,
        title: 'Work',
        text: 'Fourth task',
        columnId: 4,
        comments: []
    }
];

const defaultColumns = [
    {
        id: 1,
        title: "TODO",
    },
    {
        id: 2,
        title: "In Progress",
    },
    {
        id: 3,
        title: "Testing",
    },
    {
        id: 4,
        title: "Done",
    },
]


function App() {

    // Создаем новый типизированный массив под карточки
    // Локалсторедж возвращает нам строчку по ключу "cards" или null. Чтобы в ответ получить точно строку добавляем к нему || '[]'
    // В получившимся массиве будут либо карточки из локалстореджа, либо ничего. Если там ничего, то подсовываем туда список
    // карточек по-умолчанию.
    let initialCards : Array<CardType> = JSON.parse(localStorage.getItem("cards") || '[]')
    if (initialCards.length == 0) {
        initialCards = defaultCards
    }
    const [cards, setCards] = useState(initialCards);

    let initialColumn : Array<ColumnType> = JSON.parse(localStorage.getItem("columns") || '[]')
    if (initialColumn.length == 0) {
        initialColumn = defaultColumns
    }
    const [columns, setColumns] = useState(initialColumn);

    const [userNameModalVisible, setUserNameModalVisible] = useState(false);

    const [username, setUsername] = useState(JSON.parse(localStorage.getItem("username") as string));


    React.useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
    }, [cards]);

    React.useEffect(() => {
        localStorage.setItem("columns", JSON.stringify(columns))
    }, [columns]);

    React.useEffect(() => {
        localStorage.setItem("username", JSON.stringify(username))
    }, [username]);

    React.useEffect(() => {
        const value = JSON.parse(localStorage.getItem("username") as string);
        if (value === "" || value === null) {
            setUserNameModalVisible(true)
        }
    }, []);


    const createCard = (title: string, text: string, columnId: number) => {
        setCards([{
            id: new Date().getTime(),
            title,
            text,
            comments: [],
            columnId
        },
            ...cards
        ])
    };

    const updateColumnTitle = (id: number, title: string) => {
        const copy = [...columns]
        const current = copy.find(t => t.id === id)
        current!.title = title
        setColumns(copy)
    };

    const updateCard = (id: number, title: string, text: string) => {
        const copy = [...cards]
        const current = copy.find(t => t.id === id)
        current!.title = title
        current!.text = text
        setCards(copy)
    };

    const updateComment = (cardId: number, commentId: number, text: string) => {
        const copy = [...cards]
        const card = copy.find(t => t.id === cardId)
        const comment = card!.comments.find(t => t.id === commentId)
        comment!.text = text
        setCards(copy)
    };

    const addCommentToCard = (id: number, text: string) => {
        const copy = [...cards]
        const current = copy.find(t => t.id === id)
        current!.comments.push({
            id: new Date().getTime(),
            username,
            text
        })
        setCards(copy)
    }

    const removeCard = (id: number) => {
        setCards([...cards].filter(t => t.id !== id));
    };

    const removeComment = (cardId: number, commentId: number) => {
        const copy = [...cards]
        const card = copy.find(t => t.id === cardId)
        card!.comments = card!.comments.filter(t => t.id !== commentId)
        setCards(copy);
    };


    const filterByColumn = (cards: Array<CardType>, columnId: number) => {
        return cards.filter(item => item.columnId === columnId)
    }

    return (
        <div className="app">
            <div className="app__boards">
                {columns.map(column => (
                    <AppColumn
                        cards={filterByColumn(cards, column.id)}
                        column={column}
                        key={column.id}
                        username={username}
                        removeCard={removeCard}
                        createCard={createCard}
                        updateCard={updateCard}
                        updateColumnTitle={updateColumnTitle}
                        addCommentToCard={addCommentToCard}
                        updateComment={updateComment}
                        removeComment={removeComment}
                    />
                ))}
            </div>
            <UserNameModal
                visible={userNameModalVisible}
                setVisible={setUserNameModalVisible}
                setUsername={setUsername}
            />
        </div>
    );
}

export default App;
