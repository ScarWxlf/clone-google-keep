import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState([
    { title: "Uwu", content: "ehehe" },
    { title: "Buy", content: "eggs" },
    { title: "The first task in order of importance", content: "hate putin" },
    { title: "TODO", content: "Connect keeps to postgress" },
  ]);

  function newNote(content) {
    setNotes([...notes, content]);
  }

  function deleteNote(id) {
    setNotes((prevValue)=>{
      return prevValue.filter((item, index)=>{
        return index !== id;
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea newNote={newNote} />
      {notes.map((item, index) => {
        return <Note key={index} id={index} title={item.title} content={item.content} deleteNote={deleteNote}/>;
      })}
      <Footer />
    </div>
  );
}

export default App;
