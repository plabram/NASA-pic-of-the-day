import { useState, useEffect } from 'react'
import { NASA_URL, NASA_API_KEY } from './api/data';
import './App.css'
import Card from './components/Card';
// import Selector from './components/Selector';

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today)
  const [APOD, setAPOD] = useState({})

  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString())
  };

  useEffect(() => {

    //PERFORM API CALL

    //WITH FETCH

    const getAPOD = async () => {
      const data = await fetch(`${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`)
      const nasaToJson = await data.json()
      return {
        ...nasaToJson
      }
    }
    getAPOD().then((i) => {
      setAPOD(i)
      console.log(i)
    })

    //WITH AXIOS
    //   const axios = require('axios').default
    //   axios.get(`${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`)
    //     .then(function (response) {
    //       // manejar respuesta exitosa
    //       console.log(response);
    //     })
    // }
    //***
  }, [date])


  return (
    <>

      <img src="./assets/NASA_logo.png" alt="NASA insignia" />
      <h1>Imagen astronómica del día</h1>

      <div>
        <p>Esta imagen corresponde con la fecha: <strong>{APOD.date}</strong></p>
        <label htmlFor='date-select'>Select date</label>
        <input type='date' value={date} id="date-select" onChange={handleInput} max={date}></input>
      </div>


      <br />

      <Card apod={APOD} />

    </>
  )
}

export default App