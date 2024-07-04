import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="container">
      <h1> Create Post: </h1>
      <PostCreate />
      <hr /> {/** horizontal rule that draws a horizontal line. */}
      <h1> Posts </h1>
      <PostList />
    </div>
  );
};

export default App;
