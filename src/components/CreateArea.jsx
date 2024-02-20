import React, {useState} from "react";

function CreateArea(props) {
    const [content, setContent] = useState({
        title: "",
        content: ""
    })

    function handleChange(e){
        const {name, value} = e.target;
        setContent((prevValue)=>{
            return {...prevValue, [name]:value}
        })
    }

  return (
    <div>
      <form>
        <input onChange={handleChange} value={content.title} name="title" placeholder="Title" />
        <textarea onChange={handleChange} value={content.content} name="content" placeholder="Take a note..." rows="3" />
        <button onClick={(e)=>{
            e.preventDefault();
            props.newNote(content)
            setContent({title: "", content:""})
        }}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
