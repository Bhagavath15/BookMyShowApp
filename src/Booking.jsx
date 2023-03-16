import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom";


export function Booking() {
    return (
        <div>
            <TheatreName />
        </div>

    );
}
function TheatreName() {
    // const name = [
    //     {
    //         "name": "L.A Cinemas Maris Complex RGB Laser:Trichy",
    //         "morningshow": "10:30AM",
    //         "afternoonshow": "02:15PM",
    //         "eveningshow": "06:30PM",
    //         "nightshow": "10:30PM"
    //     },
    //     {
    //         "name": "L.A Cinemas Sona Mina RGB Laser:Trichy",
    //         "morningshow": "10:30AM",
    //         "afternoonshow": "02:15PM",
    //         "eveningshow": "06:30PM",
    //         "nightshow": "10:30PM"
    //     }]
    const { id } = useParams()
    const navigate = useNavigate()
    const [theatreList, setTheatreList] = useState([])
    const getTheatre = () => {
        fetch("https://bookmyshow-back.vercel.app/theatre",
            { method: "GET" })
            .then((data) => data.json())
            .then((usr) => setTheatreList(usr))
    }
    useEffect(() => getTheatre(), [])

    const deleteTheatre = async (id) => {
        console.log("deleting...", id)
        await fetch(`https://bookmyshow-back.vercel.app/theatre/${id}`, {
            method: "DELETE"
        }).then(() => getTheatre())
    }
    return (
        <div className="theatre">
            {theatreList.map((th, index) => <Theatre theatreName={th} key={index.id}
                editButton={
                    <IconButton
                        onClick={() =>
                            navigate(`edit-theatre/${th.id}`)}>
                        <EditIcon />
                    </IconButton>
                }
                deleteButton={
                    <IconButton
                        onClick={() => deleteTheatre(th.id)}>
                        <DeleteIcon />
                    </IconButton>
                }


            />)}
        </div>
    )
}

function Theatre({ theatreName, id, editButton, deleteButton }) {
    const navigate = useNavigate()
    return (
        <div>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography sx={{ minWidth: 275 }} color="text.secondary">
                        {theatreName.name}
                        {editButton}
                        {deleteButton}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate("/seats")} variant="outlined" color="success">
                        <Typography
                            sx={{ fontSize: 14 }}>{theatreName.morningshow}
                            <Typography sx={{ fontSize: 10 }}>Dolby Atoms</Typography></Typography></Button>
                    <Button onClick={() => navigate("/seats")} variant="outlined" color="success">
                        <Typography
                            sx={{ fontSize: 14 }}>{theatreName.afternoonshow}
                            <Typography sx={{ fontSize: 10 }}>Dolby Atoms</Typography></Typography></Button>
                    <Button onClick={() => navigate("/seats")} variant="outlined" color="success">
                        <Typography
                            sx={{ fontSize: 14 }}>{theatreName.eveningshow}
                            <Typography sx={{ fontSize: 10 }}>Dolby Atoms</Typography></Typography></Button>
                    <Button onClick={() => navigate("/seats")} variant="outlined" color="success">
                        <Typography
                            sx={{ fontSize: 14 }}>{theatreName.nightshow}
                            <Typography sx={{ fontSize: 10 }}>Dolby Atoms</Typography></Typography></Button>
                </CardActions>
            </Card>
        </div>

    )
}