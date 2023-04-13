import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

export function TicketBook({ seat, setSeat }) {
    useEffect(() => {
        fetch("https://64154a1b4f32ca32919284f8.mockapi.io/seat")
            .then((data) => data.json())
            .then((st) => setSeat(st));
    }, []);
    const arr = []
    var arr1 = []
    const handleClick = (st) => {
        const res = st.id
        console.log(res)
        arr.push(res)
        console.log(arr)
        arr1 = [...arr]
    }

    return (
        <div>
            {seat.map((st) => <BookClass seat={st} key={st.id} id={st.id} handleClick={handleClick} />)}
        </div>
    );
}
function BookClass({ seat, id, handleClick }) {
    return (
        <Button variant="outlined"

            onClick={() => handleClick(seat)}
            className={seat.class}>
            {seat.id}
        </Button>
    );
}
