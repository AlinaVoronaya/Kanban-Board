import React, {useState} from "react";
import './App.scss';
import {AppColumn} from "./Components/AppColumn/AppColumn";
import {UserNameModal} from "./Components/UserNameModal/UserNameModal";

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

    const [cards, setCards] = useState(
        JSON.parse(localStorage.getItem("cards")) || defaultCards
    );
    const [columns, setColumns] = useState(
        JSON.parse(localStorage.getItem("columns")) || defaultColumns
    );
    const [userNameModalVisible, setUserNameModalVisible] = useState(false);
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem("username")));


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
        const value = JSON.parse(localStorage.getItem("username"));
        if (value === "") {
            setUserNameModalVisible(true)
        }
    }, []);


    const createCard = (title, text, columnId) => {
        setCards([{
            id: new Date(),
            title,
            text,
            columnId
        },
            ...cards
        ])
    };

    const updateUserName = (id, title) => {
        const copy = [...columns]
        const current = copy.find(t => t.id === id)
        current.title = title
        setColumns(copy)
    };

    const updateCard = (id, title, text) => {
        const copy = [...cards]
        const current = copy.find(t => t.id === id)
        current.title = title
        current.text = text
        setCards(copy)
    };

    const addCommentToCard = (id, text) => {
        const copy = [...cards]
        const current = copy.find(t => t.id === id)
        current.comments.push({
            id: new Date(),
            username,
            text
        })
        setCards(copy)
    }

    const removeCard = id => {
        setCards([...cards].filter(t => t.id !== id));
    };

    const filterByColumn = (cards, columnId) => {
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
