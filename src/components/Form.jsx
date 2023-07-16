const Form = ({ register, handleSubmit, onSubmit, today }) => {

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='date-select'>Elegir fecha</label>
        <input
          {...register("date")}
          type='date'
          id="date-select"
          max={today}></input>
      </div>
      <div>
        <legend>Imágenes de:</legend>

        <span>
          <label htmlFor="all">Todos los planetas</label>
          <input
            {...register("mission")}
            type="radio"
            id="all"
            value={"all"}
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

        <br />
        <button>¡Vamos!</button>
      </div>
    </form>

  )
}

export default Form