import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";

function CreateArea(props) {
  const [content, setContent] = useState({
    title: "",
    content: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setContent((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  async function submitRequest() {
    const result = await axios.post("http://localhost:3004/add", content);
    props.newNote(result.data);
  }

  return (
    <div>
      <form className="create-note">
        {isVisible &&
        <input
          onChange={handleChange}
          value={content.title}
          name="title"
          placeholder="Title"
        />}
        <textarea
          onClick={()=>{setIsVisible(true)}}
          onChange={handleChange}
          value={content.content}
          name="content"
          placeholder="Take a note..."
          rows={isVisible ? "3": "1"}
        />
        <Zoom in={isVisible}>
          <Fab
            onClick={()=>{
             // props.newNote(content);
              submitRequest();
              setContent({title: "", content: ""});
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
