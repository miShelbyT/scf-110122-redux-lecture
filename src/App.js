import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { cuteCatAdded } from "./features/cuteCats/cuteCatsSlice";
import Cat from "./features/cuteCats/components/Cat";
import { fetchCats } from "./features/cuteCats/cuteCatsSlice";

function App() {
  const catState = useSelector((state) => state.cuteCats.entities);
  const catStatus = useSelector(state => state.cuteCats.status)
  const [text, setText] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCats())
  },[dispatch])

  console.log(catState);

  const handleAddCat = (e) => {
    e.preventDefault()
    dispatch(cuteCatAdded(text))
    setText("")
  }

if(catStatus === "loading") return <h3>pls hold for cute cats</h3>

  return (
    <div className="App">
      <form onSubmit={handleAddCat}>
        <label htmlFor="cat">
          name
          <input id="cat" value={text} onChange={e => setText(e.target.value)}/>
        </label>

        <button>Add Cat</button>
      </form>
      <ul>
        {catState.map(cat => <Cat key={cat.id} cat={cat}/>)}
      </ul>
    </div>
  );
}



export default App;
