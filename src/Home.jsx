import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import { ForgetPassword } from "./forgetPassword";
// import { VerifyOtp } from './verifyotp';

export function Login() {
    const navigate = useNavigate();
    const [formstate, setformstate] = useState("success");

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: async (values) => {
            console.log("submit")
            const data = await fetch("https://book-my-show-app-backend.vercel.app/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (data.status === 400) {
                console.log("error");
                setformstate("error");
            } else {
                setformstate("success");
                const result = await data.json();
                console.log("success", result);
                localStorage.setItem("token", result.token);
                navigate("/movies");
            }

        }
    });
    return (
        <div className="login-card">

            <Card sx={{ mx: 2, height: 300 }} className="card">
                <CardContent>
                    <form onSubmit={formik.handleSubmit} className='loginform'>
                        <h2>LOGIN</h2>
                        <div className='loginfield'>
                            <TextField
                                name='username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                label="Username"
                                variant="outlined" />
                            <TextField
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined" />

                            <CardActions className="btn">
                                <Button color={formstate} type='submit' variant="contained">{formstate === "success" ? "submit" : "retry"}</Button>
                                <label className="alreadyuser" onClick={() => navigate("/")}>Sign in</label>
                                <label className="alreadyuser" onClick={() => navigate("/forget-password")} >
                                    Forget Password?
                                </label>
                            </CardActions>

                        </div>

                    </form>
                </CardContent>
            </Card>
        </div >
    );
}


export function Signin() {
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

        fetch("https://book-my-show-app-backend.vercel.app/signup", {
            method: "POST",
            body: JSON.stringify(newdata),
            headers: {
                "content-type": "application/json"
            }
        })
        navigate("/login")
    };
    return (
        <div className="login-card">
            <Card sx={{ mx: 2, height: 300 }} className="card">
                <form onSubmit={formik.handleSubmit} className='loginform'>
                    <h2>SIGNUP</h2>
                    <div className='loginfield'>
                        <TextField
                            placeholder="username"
                            name='username'
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Username"
                            variant="outlined" />
                        <TextField
                            placeholder="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined" />
                        <Button color="success" type='submit' variant="contained">submit</Button>
                        <p className="alreadyuser" onClick={() => navigate("/login")} sx={{ fontSize: 7 }}>
                            Already registered user
                        </p>
                    </div>

                </form>
            </Card>
        </div>

    );
}


export function ForgetPassword() {
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: (newUpdate) => {
            console.log("form value", newUpdate)
            UpdateData(newUpdate)
            navigate("/verifyotp")
            console.log("edit")
        }
    });

    const UpdateData = (newUpdate) => {
        console.log(newUpdate)
        fetch("https://book-my-show-app-backend.vercel.app/forget-password/",
            {
                method: "POST",
                body: JSON.stringify(newUpdate),
                headers: {
                    "content-type": "application/json"
                }
            });
    };
    return (
        <div className="login-card">
            <Card sx={{ mx: 2, height: 250 }} className="card">
                <form onSubmit={formik.handleSubmit} className='loginform'>
                    <h2>FORGET PASSWORD</h2>
                    <div className='loginfield'>
                        <TextField
                            placeholder="email"
                            name='email'
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="Email"
                            variant="outlined" required />

                        <Button color="success" type='submit' variant="contained">submit</Button>

                    </div>

                </form>
            </Card>
        </div>

    );
}

export function VerifyOtp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setpassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://book-my-show-app-backend.vercel.app/verifyotp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, password }),
            });
            const data = await response.json();
            setMessage(data.message);
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        } catch (error) {
            console.log(error);
            setMessage('Failed to reset password');
        }
    };


    return (
        <div className="login-card">
            <Card sx={{ mx: 2, height: 400 }} className="card">
                <form onSubmit={handleResetPassword} className="loginfield">
                    <h2><label>OTP</label></h2>
                    <TextField type="text" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextField type="text" label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    <h2><label>New Password</label></h2>
                    <TextField
                        type="password"
                        value={password}
                        label="Password"
                        onChange={(e) => setpassword(e.target.value)}
                        required
                    />
                    <Button type="submit">Reset Password</Button>
                    {message && <h3>{message}</h3>}
                </form>

            </Card>
        </div>
    )
}