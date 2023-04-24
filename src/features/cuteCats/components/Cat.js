import { useDispatch } from "react-redux"
import { cuteCatRemoved } from "../cuteCatsSlice"

function Cat({cat}) {
  const dispatch = useDispatch()


  const catStyle = {
    display: "flex"
  }

  function handleDelete() {
    dispatch(cuteCatRemoved(cat.id))
  }

  return (
    <div style={catStyle}>
      {cat.url ? <img src={cat.url}/> : <li >{cat.name}</li>}
      
      <button onClick={handleDelete}>X</button>
    </div>
  )
}

export default Cat