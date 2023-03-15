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

export default function App() {


  const [movieList, setMovieList] = useState([])
  const navigate = useNavigate()
  return (

    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={() => navigate("/")} color="inherit">Home</Button>
            <Button onClick={() => navigate("/movies")} color="inherit">Movie</Button>
            <Button onClick={() => navigate("/addmovies")} color="inherit">Add Movies</Button>
            <Button onClick={() => navigate("/add-theatre")} color="inherit">Add Theatre</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList movieList={movieList} setMovieList={setMovieList} />} />
        <Route path="/movies/:id" element={<MovieDetails movieList={movieList} />} />
        <Route path="/addmovies" element={<AddMovies />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/seats" element={<Seats />} />
        <Route path="/ticketbooked" element={<TicketBooked />} />
        <Route path="/add-theatre" element={<AddTheatre />} />
        <Route path="/booking/edit-theatre/:id" element={<EditTheatre />} />
      </Routes>

    </div>

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
    fetch(`https://node-workspace-chi.vercel.app/movies/${id}`)
      .then((data) => data.json())
      .then((mvs) => setMovie(mvs))
  }, [id])
  return (
    <div>
      <iframe
        width="100%"
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

function Home() {
  return (
    <div>Book my show</div>
  )
}

function MovieList({ movieList, setMovieList }) {
  useEffect(() => {
    fetch("https://node-workspace-chi.vercel.app/movies")
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
    <Card className="card"
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