import "./App.css"
import { useState, useEffect } from "react"
import { NASA_URL, NASA_API_KEY } from "./api/data"
import { useForm } from "react-hook-form"
import axios from "axios"
import Card from "./components/Card/Card"
import Form from "./components/Form/Form"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10)
  const [date, setDate] = useState(today)
  const [APOD, setAPOD] = useState({
    title: "",
    url: "",
    copyright: null,
    date: "",
    explanation: ""
  })
  const [mission, setMission] = useState("all")
  const normalURL = `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
  const roverURL = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`
  const mainTitle = "Imagen astronómica del día"

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
    //VERSIÓN CON FETCH

    // const getAPOD = async () => {
    //   if (mission === "rover") {
    //     const data = await fetch(normalURL)
    //     const nasaToJson = await data.json()
    //     return {...nasaToJson}
    //   } else {
    //     const data = await fetch(normalURL)
    //     const nasaToJson = await data.json()
    //     return {...nasaToJson}
    //   }
    // }

    // getAPOD().then((i) => {
    //   setAPOD(i)
    // })

    // VERSIÖN CON AXIOS
    const apiCall = async () => {
      if (mission === "rover") {
        await axios.get(roverURL)
          .then((i) => {
            console.log(roverURL)
            if (i.data.photos[0]) {
              setAPOD({
                title: i.data.photos[0].camera.name,
                url: i.data.photos[0].img_src,
                copyright: null,
                date: date,
                explanation: `This photo was taken on ${i.data.photos[0].earth_date}, which is measured as ${i.data.photos[0].sol} sols on Mars 🌔.`

              })
            }
            else {
              setAPOD({
                title: "",
                url: "",
                copyright: null,
                date: date,
                explanation: "Mars Rover didn't take any pictures on this day."
              })
            }

          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        await axios.get(normalURL)
          .then((i) => {
            setAPOD({
              title: i.data.title,
              url: i.data.url,
              copyright: i.data.copyright,
              date: date,
              explanation: i.data.explanation
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
    apiCall()
  }, [date, mission])

  return (
    <>
      <Header mainTitle={mainTitle} />
      <p>
        Esta imagen corresponde con la fecha: <strong>{date}</strong>.<br />
        {mission === "rover" ? "Viene de la misión Mars Rover." : null}
      </p>
      <Form
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        today={today}
      />
      <Card apod={APOD} />
      <Footer />
    </>
  )
}

export default App
