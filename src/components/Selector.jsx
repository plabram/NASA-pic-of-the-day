const Selector = (date, func) => {

  return (
    <div>
      <label htmlFor='date-select'>Select date</label>
      <input type='date' value={date} id="date-select" onChange={func} max={date}></input>
    </div>
  )
}

export default Selector