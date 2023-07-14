import { useState, useEffect } from 'react'
import { NASA_URL, NASA_API_KEY } from './api/data';
import './App.css'
import Card from './components/Card';
import { useForm } from 'react-hook-form';

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today)
  const [APOD, setAPOD] = useState({})
  // const [roverAPOD, setRoverAPOD] = useState({})
  const [mission, setMission] = useState("all")
  const { handleSubmit, register } = useForm({
    defaultValues: {
      date: date,
      mission: mission
    }
  })

  const onSubmit = (values) => {
    setDate(values.date.toLocaleString())
    setMission(values.mission)
  }

  useEffect(() => {

    //PERFORM API CALL

    //WITH FETCH

    const getAPOD = async () => {
      if (mission === "all") {

        const data = await fetch(`${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`)
        const nasaToJson = await data.json()
        return {
          ...nasaToJson
        }

      } else {
        console.log("replace API call below with Rover call")
        const data = await fetch(`${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`)
        const nasaToJson = await data.json()
        return {
          ...nasaToJson
        }
      }

    }

    getAPOD().then((i) => {
      setAPOD(i)
    })

    // ATTEMPT WITH AXIOS
    //   constaxios = require('axios').default
    //   const getAPOD = axios.get(`${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`)
    //     .then(function (response) {
    //       // manejar respuesta exitosa
    //       console.log(response);
    //     })
    // }


    // const getRoverAPOD = async () => {
    //   const roverData = await fetch(`${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth-date=2015-3-3&api_key=${NASA_API_KEY}`)
    //   const roverToJson = await roverData.json()
    //   return {
    //     ...roverToJson
    //   }
    // }

    // getRoverAPOD().then((j) => {
    //   setRoverAPOD(j)
    //   console.log(roverAPOD)
    // })


  }, [date, mission])


  return (
    <>

      {/* <img src="./assets/NASA_logo.png" alt="NASA insignia" /> */}
      <h1>Imagen astronómica del día</h1>

      <p>Esta imagen corresponde con la fecha: <strong>{date}</strong></p>
      <p> {mission === "rover" ? "Viene de la misión Mars Rover" : null}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <br />
          <label htmlFor='date-select'>Elegir fecha</label>
          <input
            {...register("date")}
            type='date'
            id="date-select"
            max={today}></input>
        </div>

        <br />

        <legend>Imágenes de:</legend>
        <div>
          <span>
            <label htmlFor="all">Todos los planetas</label>
            <input
              {...register("mission")}
              type="radio"
              id="all"
              value="all"
            ></input>
          </span>
          <span>
            <label htmlFor="mars-rover">Mars (Mars Rover)</label>
            <input
              {...register("mission")}
              type="radio"
              id="mars-rover"
              value="rover"
            ></input>
          </span>
        </div>
        <br />
        <button>¡Vamos!</button>
      </form>

      <br />

      <Card apod={APOD} />

    </>
  )
}

export default App