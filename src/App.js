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
    const [modal, setModal] = useState(true);

    const filterByColumn = (cards, columnId) => {
            return cards.filter(item => item.columnId === columnId)
    }

    return (
        <div className="app">
            <div className="app__boards">
                {columns.map( column => (
                    <AppColumn
                        cards={filterByColumn(cards, column.id)}
                        title={column.title}
                        key={column.id}
                        setModal={setModal}
                    />
                ))}
            </div>
            <Modal
                modal={modal}
                setModal={setModal}
            />
        </div>
    );
}

export default App;
