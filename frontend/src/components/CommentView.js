// import Home from "../Home";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { ReactComponent as ThumbsUp } from "../icons/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../icons/thumbs-down.svg";

function CommentViewHeader(props) {
  return (
    <div>
      <div style={{ fontSize: 20 }}>{props.pin.title}</div>
      <div>{props.pin.description}</div>
      <br></br>

      <button
        onClick={goHome}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        {" "}
        X{" "}
      </button>
      <div>Comments:</div>
    </div>
  );
}

function goHome() {
  //add browser router??
  //   ReactDOM.render(<Home />, document.getElementById("root"));
}

function CommentViewBody(props) {
  const _comments = props.commentsData.map((text, index) => {
    return (
      <Collapsible key={index} trigger="▼/▲" open="true">
        {text.description} <br></br>
        <ThumbsUp title="Upvotes" onClick={() => props.upVote(index)} />{" "}
        {text.upvotes}
        <ThumbsDown
          title="Downvotes"
          onClick={() => props.downVote(index)}
        />{" "}
        {text.downvotes}
      </Collapsible>
    );
  });
  return <div>{_comments}</div>;
}

function CommentView() {
  let pin = {
    title: "Study Bench",
    description: "Nice stone bench with shade from trees",
    upVotes: 3,
    downVotes: 4,
    pinType: "Study Location",
    color: "green",
  };
  let commentz = [
    { description: "I go here all the time", downvotes: 10, upvotes: 50 },
    {
      description: "I got my shoes dirty here, I don't like it",
      downvotes: 6,
      upvotes: 32,
    },
  ];

  const [comments, setComments] = useState(commentz);
  const [comment, userSubmit] = useState("");

  function upVote(index) {
    let commentsTemp = comments;
    commentsTemp[index].upvotes += 1;
    setComments([...commentsTemp]);
  }

  function downVote(index) {
    let commentsTemp = comments;
    commentsTemp[index].downvotes += 1;
    setComments([...commentsTemp]);
  }

  function inputChange(event) {
    const { name, value } = event.target;
    console.log(comment);
    userSubmit(value);
  }

  function commentSubmit() {
    console.log(comment); // replace with backend insert
    userSubmit("");
  }

  return (
    <div>
      <CommentViewHeader pin={pin} />
      <CommentViewBody
        commentsData={comments}
        upVote={upVote}
        downVote={downVote}
      />
      <form id="usrSubmit">
        <input
          type="text"
          name="userComment"
          placeholder="Enter Comment"
          onChange={inputChange}
          value={comment}
        />
        <input type="button" onClick={() => commentSubmit()} value="Submit" />
      </form>
    </div>
  );
}

export default CommentView;
