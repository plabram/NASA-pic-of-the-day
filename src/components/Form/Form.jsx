import "./Form.css"

const Form = ({ register, handleSubmit, onSubmit, today }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="apod-form">
      <div className="date-select">
        <label htmlFor="date-select">
          <strong>Elegir fecha:</strong>
        </label>
        <input
          {...register("date")}
          type="date"
          id="date-select"
          max={today}
        ></input>
      </div>

      <div className="radio">
        <legend>
          <strong>Imágenes de:</strong>
        </legend>
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
      <button className="form-button">¡Vamos!</button>
    </form>
  )
}

export default Form
