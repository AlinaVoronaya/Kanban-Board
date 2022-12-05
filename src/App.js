import React, {useState} from "react";
import './App.scss';
import {AppColumn} from "./Components/AppColumn/AppColumn";
import {UserNameModal} from "./Components/UserNameModal/UserNameModal";

const defaultCards = [
    {
        id: 1,
        title: 'Important',
        text: 'First task',
        columnId: 1
    },
    {
        id: 2,
        title: 'For school',
        text: 'Second task',
        columnId: 2
    },
    {
        id: 3,
        title: 'Work',
        text: 'Third task',
        columnId: 3
    },
    {
        id: 4,
        title: 'Work',
        text: 'Fourth task',
        columnId: 4
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
    const [username, setUsername] = useState(
        JSON.parse(localStorage.getItem("username")) || 'unknown'
    );
    const [comments, setComments] = useState(
        JSON.parse(localStorage.getItem("comments")) || []
    );


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
        localStorage.setItem("comments", JSON.stringify(comments))
    }, [comments]);

    React.useEffect(() => {
        setUserNameModalVisible(true)
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
                        modalName={username}
                        comments={comments}
                        setComments={setComments}
                        removeCard={removeCard}
                        createCard={createCard}
                        updateCard={updateCard}
                        updateUserName={updateUserName}
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
