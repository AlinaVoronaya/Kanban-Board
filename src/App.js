import React, {useState} from "react";
import './App.scss';
import {AppColumn} from "./Components/AppColumn/AppColumn";

const stateTodo = 0;
const stateInProgress = 1;
const stateTesting = 2;
const stateDone = 3;

const defaultCards = [
    {
        id: 1,
        title: 'Important',
        text: 'First task',
        state: stateTodo
    },
    {
        id: 2,
        title: 'For school',
        text: 'Second task',
        state: stateInProgress
    },
    {
        id: 3,
        title: 'Work',
        text: 'Third task',
        state: stateTesting
    },
    {
        id: 4,
        title: 'Work',
        text: 'Fourth task',
        state: stateDone
    }
];

const defaultColumns = [
    {
        id: 1,
        title: "TODO",
        state: stateTodo
    },
    {
        id: 2,
        title: "In Progress",
        state: stateInProgress
    },
    {
        id: 3,
        title: "Testing",
        state: stateTesting
    },
    {
        id: 4,
        title: "Done",
        state: stateDone
    },
]


function App() {

    const [cards, setCards] = useState(defaultCards);

    const filterByState = (cards, state) => {
            return cards.filter(item => item.state === state)
    }

    return (
        <div className="app">
            <div className="app__boards">
                {defaultColumns.map( column => (
                    <AppColumn
                        cards={filterByState(cards, column.state)}
                        title={column.title}
                        key={column.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
