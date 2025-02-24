
import { useEffect, useState } from 'react';
import './App.css'
import axios from "axios"

function App() {
  const [book, setBook] = useState([]);
const[title,setTitle]=useState('')
const [author, setAuthor] = useState("");
const [date, setDate] = useState("");
const [description, setDescription] = useState("");
useEffect(()=>{
  axios.get("http://localhost:9000/user")
  .then(response=>{
    setBook(response.data);
  })
  .catch((error)=>{
    console.log(error)
  })
},[])

const addBook=()=>{
  axios.post("http://localhost:9000/user", {
    title,
    author,
    date,
    description,
  })
  .then(response=>{
    setBook([...book,response.data]);
    setTitle('');
    setAuthor("");
    setDate("");
    setDescription("");
  })
  .catch((error)=>{
    console.log(error)
  })
}

  return (
    <>
      <div>
        <form>
          <div>
            <label>title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>date</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
          <div>
            <label>description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <button onClick={addBook}>submet</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App
