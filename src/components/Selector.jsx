// import React, { useState } from 'react';



// const Selector = () => {
//   const today = new Date(Date.now()).toISOString().slice(0, 10);
//   const [date, setDate] = useState(today)

//    const handleInput = (ev) => {
//     setDate(ev.target.value.toLocaleString())
//   };

//   return (
//     <div>
//       <p>Esta imagen corresponde con la fecha: <strong>{date}</strong></p>
//       <label htmlFor='date-select'>Select date</label>
//       <input type='date' value={date} id="date-select" onChange={handleInput} max={date}></input>
//     </div>
//   )
// }

// export default Selector