import React from 'react'

const Card = ({ apod }) => {
  return (
    <div className="card">
      <h2>{apod.title} </h2>
      <figure>
        <img src={apod.url} width="400px" alt={apod.title} />
        <figcaption>© {apod.copyright ? apod.copyright : "Non-commercial fair use"} </figcaption>
        <figcaption>{apod.date}</figcaption>
      </figure>

      <p>{apod.explanation}</p>
    </div >
  )
}

export default Card