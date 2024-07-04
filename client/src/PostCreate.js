import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const changeInputHandler = (event) => {
    setTitle(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    await axios.post("http://posts.com/posts/create", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label> Title </label>
          <input
            name="title"
            value={title}
            onChange={changeInputHandler}
            className="form-control"
          />
        </div>
        <br />
        <button className="btn btn-primary"> Submit </button>
      </form>
    </div>
  );
};

export default PostCreate;
