import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
// import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export function AddMovies() {

    const navigate = useNavigate()
    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            id: "",
            name: "",
            poster: "",
            rating: "",
            summary: "",
            trailer: ""
        },
        onSubmit: (values) => {
            console.log("form values", values)
            addMovies(values)
            navigate("/movies")
        }
    })
    const addMovies = (values) => {
        fetch("https://bookmyshow-back.vercel.app/movies", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
    }
    return (
        <div className="addmovies">
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
                    label="name"
                    variant="standard"></TextField>
                <TextField name="poster"
                    fullWidth sx={{ m: 1 }}
                    id="outlined-basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.poster}
                    label="poster"
                    variant="standard"></TextField>
                <TextField name="rating"
                    fullWidth sx={{ m: 1 }}
                    id="outlined-basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rating}
                    label="rating"
                    variant="standard"></TextField>
                <TextField name="summary"
                    fullWidth sx={{ m: 1 }}
                    id="outlined-basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.summary}
                    label="summary"
                    variant="standard"></TextField>
                <TextField name="trailer"
                    fullWidth sx={{ m: 1 }}
                    id="outlined-basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.trailer}
                    label="trailer"
                    variant="standard"></TextField>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}


