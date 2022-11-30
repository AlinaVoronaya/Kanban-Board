import React, {useState} from "react";
import './App.scss';
import {AppColumn} from "./Components/AppColumn/AppColumn";
import {Modal} from "./Components/Modal/Modal";

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

    const [cards, setCards] = useState(defaultCards);
    const [columns, setColumns] = useState(defaultColumns);
    const [modal, setModal] = useState(false);
    const [modalName, setModalName] = useState('hello');

    React.useEffect(() => {
        setModal(true)
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

    const updateCard = (id, title, text) => {
        // todo написать код функции изменения данных карточки
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
                        title={column.title}
                        id={column.id}
                        key={column.id}
                        modalName={modalName}
                        removeCard={removeCard}
                        createCard={createCard}
                        updateCard={updateCard}
                    />
                ))}
            </div>
            <Modal
                modal={modal}
                setModal={setModal}
                setModalName={setModalName}
            />
        </div>
    );
}

export default App;
