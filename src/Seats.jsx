import { useState } from 'react'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";


export function Seats() {

    return (
        <div className="seats">
            <section>
                <label>No.Of.Seats</label>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </section>
            <p>3D-EXECUTIVE-RS.160/-</p>
            <Seat />
            <Booked />
        </div>
    );
}

function Seat() {
    const button = Array(100).fill(<CheckBoxOutlineBlankIcon />)
    return (
        <div className="seatlist">
            {button.map((btn, i) => <AvalSeat key={i} button={btn} />)}
        </div>
    )
}

function AvalSeat({ button, key }) {
    const [active, setActive] = useState(true)

    const handleClick = () => {

        setActive(!active)
        console.log("clicked")
    }
    return (
        <div className="seats">
            <IconButton arail-label={key} color={active ? "inherit" : "success"} onClick={handleClick}>{button}</IconButton>

        </div>
    )
}

function Booked() {
    const navigate = useNavigate()
    const booked = () => {
        console.log("Clicked")
        navigate("/ticketbooked")


    }
    return (
        <Button variant="outlined" onClick={booked}>Booked</Button>
    )
} 