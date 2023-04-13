import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
// import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


// const formValidationSchema = yup.object({
//     id: yup.number().required(),
//     name: yup.string().required(),
//     morningshow: yup.number().required(),
//     afternoonshow: yup.number().required(),
//     eveningshow: yup.number().required(),
//     nightshow: yup.number().required()

// });


export function AddTheatre() {
    const navigate = useNavigate()
    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            id: "",
            name: "",
            morningshow: "",
            afternoonshow: "",
            eveningshow: "",
            nightshow: ""
        },
        onSubmit: (values) => {
            console.log("form value", values)
            addTheatre(values)
            navigate("/booking")
        }


    })
    const addTheatre = (values) => {
        fetch("https://book-my-show-app-backend.vercel.app/theatre",
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "content-type": "applicaation/json"
                }
            })
    }
    return (
        <div className="add-theatre">
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
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}
