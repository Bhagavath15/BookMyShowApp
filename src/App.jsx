import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Booking } from './Booking';
import { Seats } from './Seats';
import { AddTheatre } from './AddTheatre';
import { EditTheatre } from './EditTheatre';
import { AddMovies } from './AddMovies';
import { Login, Signin, ForgetPassword, VerifyOtp } from './Home';
import { TicketBook } from './TicketBook';


export default function App() {

  const [seat, setSeat] = useState([[]])
  const [movieList, setMovieList] = useState([])
  const navigate = useNavigate()
  return (

    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Button onClick={() => navigate("/movies")} color="inherit">Movie</Button>
            <Button onClick={() => navigate("/addmovies")} color="inherit">Add Movies</Button>
            <Button onClick={() => navigate("/add-theatre")} color="inherit">Add Theatre</Button>
            <Button sx={{ marginLeft: "auto" }} onClick={() => navigate("/")} color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/book" element={<TicketBook seat={seat} setSeat={setSeat} />} />
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/movies" element={<ProtectedRoute><MovieList movieList={movieList} setMovieList={setMovieList} /></ProtectedRoute>} />
        <Route path="/movies/:id" element={<ProtectedRoute><MovieDetails movieList={movieList} /></ProtectedRoute>} />
        <Route path="/addmovies" element={<ProtectedRoute><AddMovies /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/seats" element={<ProtectedRoute><Seats /></ProtectedRoute>} />
        <Route path="/ticketbooked" element={<ProtectedRoute><TicketBooked /></ProtectedRoute>} />
        <Route path="/add-theatre" element={<ProtectedRoute><AddTheatre /></ProtectedRoute>} />
        <Route path="/booking/edit-theatre/:id" element={<ProtectedRoute><EditTheatre /></ProtectedRoute>} />
      </Routes>

    </div>

  )
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  // const token=false;
  return (
    token ? <section>{children}</section> : <Navigate replace to="/" />
    //  token? <section>{children}</section>:<h1>unautharaied</h1>
  )
}
function TicketBooked() {
  return (
    <div> your ticked has conformed</div>
  )
}

function MovieDetails({ movieList }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState([])
  useEffect(() => {
    fetch(`https://book-my-show-app-backend.vercel.app/movies/${id}`)
      .then((data) => data.json())
      .then((mvs) => setMovie(mvs))
  }, [id])
  return (
    <div className="trailers">
      <iframe
        width="750"
        height="450"
        src={movie.trailer}
        title="Marvel"
        frameborder="0"
        allow="accelerometer; autoplay;clipboard-white"
        allowfullscreen
      ></iframe>
      <div className="movie-detail-container">
        <h1>Movie Details of {movie.name}</h1>
        <p>{movie.summary}</p>
      </div>
      <Button onClick={() => navigate("/booking")} variant="contained" color="primary">Book Tickets</Button>
    </div>
  )
}

function MovieList({ movieList, setMovieList }) {
  useEffect(() => {
    fetch("https://book-my-show-app-backend.vercel.app/movies")
      .then((data) => data.json())
      .then((mvs) => setMovieList(mvs))
  }, [])

  return (
    <div className="movie-list">
      {movieList.map((mv, id) => <Movies key={mv.id} movie={mv} id={mv.id} />)}
    </div>
  )
}


function Movies({ movie, id }) {
  const navigate = useNavigate()
  return (
    <Card className="movie-card"
      onClick={() => navigate(`/movies/${id}`)}>

      <div className="movie-container">

        <img className="movie-poster" src={movie.poster} alt={movie.name} />
        <CardContent>
          <div>
            <div className="movie-data">
              <CardActions>
                <p className="movie-name"><h2>{movie.name}</h2></p>
                <p className="movie-rating">⭐{movie.rating}</p>
              </CardActions>
            </div>

          </div>

        </CardContent>
      </div >

    </Card >
  )
}

