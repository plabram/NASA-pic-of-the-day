import { useState, useEffect } from 'react'
import { NASA_URL, NASA_API_KEY } from './api/data';
import './App.css'
import Card from './components/Card';
import { useForm } from 'react-hook-form';
import Form from './components/Form';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today)
  const mainTitle = "Imagen astronómica del día"
  const [APOD, setAPOD] = useState({})
  const URL = `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
  const roverURL = `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`

  const [mission, setMission] = useState(URL)

  const { handleSubmit, register } = useForm({
    defaultValues: {
      date: date,
      mission: mission
    }
  })

  const onSubmit = (values) => {
    setDate(values.date.toLocaleString())
    setMission((values.mission === "all") ? URL : roverURL)
  }



  useEffect(() => {

    //VERSIÓN CON FETCH

    // const getAPOD = async () => {
    //     const data = await fetch(mission)
    //     const nasaToJson = await data.json()
    //     return {...nasaToJson}
    // }

    // getAPOD().then((i) => {
    //   setAPOD(i)
    // })

    // VERSIÖN CON AXIOS

    (mission === "rover" ? axios.get(mission) : axios.get(mission))
      .then((i) => {
        setAPOD(i.data)
      })
      .catch((error) => { console.log(error) })
  }, [date, mission])

  return (
    <>

      <Header mainTitle={mainTitle} />
      <p>Esta imagen corresponde con la fecha: <strong>{date}</strong>. {mission === "rover" ? "Viene de la misión Mars Rover." : null}</p>
      <Form register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} today={today} />
      <Card apod={APOD} />
      <Footer />

    </>
  )
}

export default App