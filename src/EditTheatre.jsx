import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik";

export function EditTheatre() {
    const { id } = useParams()

    const [theatreList, setTheatreList] = useState(null)
    useEffect(() => {
        fetch(`https://bookmyshow-back.vercel.app/theatre/${id}`)
            .then((data) => data.json())
            .then((th) => setTheatreList(th))
    }, [])
    return theatreList ? <EditTheatreList theatreList={theatreList} /> : <h2>Loading...</h2>

}
function EditTheatreList({ theatreList }) {
    const navigate = useNavigate()
    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            id: theatreList.id,
            name: theatreList.name,
            morningshow: theatreList.morningshow,
            afternoonshow: theatreList.afternoonshow,
            eveningshow: theatreList.eveningshow,
            nightshow: theatreList.nightshow
        },
        onSubmit: (newUpdate) => {
            console.log("form value", newUpdate)
            updateTheatre(newUpdate)
            navigate("/booking")
        }
    })
    const updateTheatre = (newUpdate) => {
        console.log(newUpdate)
        fetch(`https://bookmyshow-back.vercel.app/theatre/${theatreList.id}`,
            {
                method: "PUT",
                body: JSON.stringify(newUpdate),
                headers: {
                    "content-type": "application/json"
                }
            })
    }
    return (
        <div className="editTheatre">
            <form onSubmit={handleSubmit}>
                <TextField name="id"
                    fullWidth sx={{ m: 1 }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.id}
                    id="outlined-basic"
                    label="id"
                    variant="standard"></TextField>
                <TextField name="name"
                    fullWidth sx={{ m: 1 }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    id="outlined-basic"
                    label="theatre name"
                    variant="standard"></TextField>
                <TextField name="morningshow"
                    fullWidth sx={{ m: 1 }}
                    id="outlined-basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.morningshow}
                    label="morning show time"
                    variant="standard"></TextField>
                <TextField name="afternoonshow"
                    fullWidth sx={{ m: 1 }}
                    id="outlined-basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.afternoonshow}
                    label="afternoon show time"
                    variant="standard"></TextField>
                <TextField name="eveningshow"
                    fullWidth sx={{ m: 1 }}
                    id="outlined-basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.eveningshow}
                    label="evening show time"
                    variant="standard"></TextField>
                <TextField name="nightshow"
                    fullWidth sx={{ m: 1 }}
                    id="outlined-basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nightshow}
                    label="night show time"
                    variant="standard"></TextField>

                <Button type="submit">Save</Button>
            </form>
        </div>
    )
}
