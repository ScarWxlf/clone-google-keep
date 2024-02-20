import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([
  ]);
  useEffect(()=>{
    async function getData(){
      const response = await axios.get("http://localhost:3004/");
      setNotes(response.data);
    }
    getData();
    console.log(notes)
  }, [])

  function newNote(content) {
    setNotes([...notes, content]);
  }

  function submitDelete(id){
    axios.post("http://localhost:3004/delete", {id: id});
  }

  function deleteNote(id) {
    setNotes((prevValue)=>{
      return prevValue.filter((item)=>{
        return item.id !== id;
      })
    })
    submitDelete(id);
  }

  return (
    <div>
      <Header />
      <CreateArea newNote={newNote} />
      {notes.map((item) => {
        return <Note key={item.id} id={item.id} title={item.title} content={item.description} deleteNote={deleteNote}/>;
      })}
      <Footer />
    </div>
  );
}

export default App;
