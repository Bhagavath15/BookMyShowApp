import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Home() {
    return (
        <div><Login /><Signin /></div>

    );
}


function Login() {
    const navigate = useNavigate()
    const [formstate, setformstate] = useState("success")

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: async (values) => {
            // console.log(values)

            const data = await fetch("http://localhost:4002/users/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (data.status === 400) {
                console.log("error");
                setformstate("error")
            } else {
                setformstate("success")
                const result = await data.json()
                console.log("success", result);
                localStorage.setItem("token", result.token)
                navigate("/movies")
            }

        }
    });
    return (
        <form onSubmit={formik.handleSubmit} className='loginform'>
            <h2>Login</h2>
            <div className='loginfield'>
                <TextField
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    label="username"
                    variant="outlined" />
                <TextField
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    label="password"
                    name="password"
                    variant="outlined" />
                <Button color={formstate} type='submit' variant="contained">{formstate === "success" ? "submit" : "retry"}</Button>
            </div>

        </form>


    );
}


function Signin() {
    const navigate = useNavigate()
    const [formstate, setformstate] = useState("success")

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: (newdata) => {
            // console.log(values)
            adddata(newdata)
        }
    });

    const adddata = (newdata) => {
        console.log(newdata)

        fetch("http://localhost:4002/users/signup", {
            method: "POST",
            body: JSON.stringify(newdata),
            headers: {
                "content-type": "application/json"
            }
        })
        navigate("/")
    };
    return (
        <form onSubmit={formik.handleSubmit} className='loginform'>
            <h2>Signup</h2>
            <div className='loginfield'>
                <TextField
                    placeholder="username"
                    name='username'
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="username"
                    variant="outlined" />
                <TextField
                    placeholder="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    label="password"
                    name="password"
                    variant="outlined" />
                <Button color="success" type='submit' variant="contained">submit</Button>
            </div>

        </form>


    );
}