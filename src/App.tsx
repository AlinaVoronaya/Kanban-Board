import React, {useState} from "react";
import './App.scss';
import {AppColumn} from "./Components/AppColumn/AppColumn";
import {UserNameModal} from "./Components/UserNameModal/UserNameModal";
import {Card} from "./types";
import {Column} from "./types";

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
    // В получившимся массиве будут либо карточки из локалстроеджа, либо ничего. Если там ничего, то подсовываем туда список
    // карточек по-умолчанию.
    let initialCards : Array<Card> = JSON.parse(localStorage.getItem("cards") || '[]')
    if (initialCards.length == 0) {
        initialCards = defaultCards
    }
    const [cards, setCards] = useState(initialCards);

    let initialColumn : Array<Column> = JSON.parse(localStorage.getItem("columns") || '[]')
    if (initialColumn.length == 0) {
        initialColumn = defaultColumns
    }
    const [columns, setColumns] = useState(initialColumn);

    const [userNameModalVisible, setUserNameModalVisible] = useState(false);
    // TODO: так можно?
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
        if (value === "") {
            setUserNameModalVisible(true)
        }
    }, []);


    const createCard = (title: string, text: string, columnId: number) => {
        setCards([{
            id: new Date(),
            title,
            text,
            comments: [],
            columnId
        },
            ...cards
        ])
    };

    const updateUserName = (id: number, title: string) => {
        const copy = [...columns]
        const current = copy.find(t => t.id === id)
        current.title = title
        setColumns(copy)
    };

    const updateCard = (id: number, title: string, text: string) => {
        const copy = [...cards]
        const current = copy.find(t => t.id === id)
        current.title = title
        current.text = text
        setCards(copy)
    };

    const addCommentToCard = (id: number, text: string) => {
        const copy = [...cards]
        const current = copy.find(t => t.id === id)
        current.comments.push({
            id: new Date(),
            username,
            text
        })
        setCards(copy)
    }

    const removeCard = (id: number) => {
        setCards([...cards].filter(t => t.id !== id));
    };

    const filterByColumn = (cards: Card, columnId: number) => {
        return cards.filter(item => item.columnId === columnId)
    }

    return (
        <div className="app">
            <div className="app__boards">
                {columns.map(column => (
                    <AppColumn
                        cards={filterByColumn(cards, column.id)}
                        column={column}
                        title={column.title}
                        id={column.id}
                        key={column.id}
                        username={username}
                        removeCard={removeCard}
                        createCard={createCard}
                        updateCard={updateCard}
                        updateUserName={updateUserName}
                        addCommentToCard={addCommentToCard}
                    />
                ))}
            </div>
            <UserNameModal
                userNameModalVisible={userNameModalVisible}
                setUserNameModalVisible={setUserNameModalVisible}
                username={username}
                setUsername={setUsername}
            />
        </div>
    );
}

export default App;
