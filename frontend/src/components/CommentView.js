import React, { useState, useEffect } from "react";
import { ReactComponent as ThumbsUp } from "../icons/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../icons/thumbs-down.svg";
import { ReactComponent as Close } from "../icons/close.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CommentView() {
  const params = useParams();

  const [location, setLocation] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const id = params.id;
    axios
      .get(`${process.env.REACT_APP_API_HOST}/pins/${id}`)
      .then((response) => {
        if (response && response.status === 200) {
          let fetchedLocation = response.data;
          setLocation(fetchedLocation);
        }
      })
      .catch((error) => console.log(error));
    axios
      .get(`${process.env.REACT_APP_API_HOST}/pins/${id}/comments`)
      .then((response) => {
        if (response && response.status === 200) {
          setComments(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, [params]);

  function handleLocationUpvote() {
    if (location["upvoted"]) {
      axios
        .patch(
          `${process.env.REACT_APP_API_HOST}/pins/${location._id}/upvotes?undo=true`
        )
        .then((response) => {
          if (response && response.status === 201) {
            const tempLocation = response.data;
            tempLocation["upvoted"] = false;
            setLocation(tempLocation);
          }
        })
        .catch((error) => console.log(error));
    } else if (!location["upvoted"] && !location["downvoted"]) {
      axios
        .patch(`${process.env.REACT_APP_API_HOST}/pins/${location._id}/upvotes`)
        .then((response) => {
          if (response && response.status === 201) {
            const tempLocation = response.data;
            tempLocation["upvoted"] = true;
            setLocation(tempLocation);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleLocationDownvote() {
    if (location["downvoted"]) {
      axios
        .patch(
          `${process.env.REACT_APP_API_HOST}/pins/${location._id}/downvotes?undo=true`
        )
        .then((response) => {
          if (response && response.status === 201) {
            const tempLocation = response.data;
            tempLocation["downvoted"] = false;
            setLocation(tempLocation);
          }
        })
        .catch((error) => console.log(error));
    } else if (!location["upvoted"] && !location["downvoted"]) {
      axios
        .patch(
          `${process.env.REACT_APP_API_HOST}/pins/${location._id}/downvotes`
        )
        .then((response) => {
          if (response && response.status === 201) {
            const tempLocation = response.data;
            tempLocation["downvoted"] = true;
            setLocation(tempLocation);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleCommentUpvote(index) {
    const id = comments[index]["_id"];
    if (comments[index]["upvoted"]) {
      axios
        .patch(
          `${process.env.REACT_APP_API_HOST}/comments/${id}/upvotes?undo=true`
        )
        .then((response) => {
          if (response && response.status === 201) {
            const tempComments = comments.map((l) => Object.assign({}, l));
            tempComments[index] = response.data;
            tempComments[index]["upvoted"] = false;
            setComments(tempComments);
          }
        })
        .catch((error) => console.log(error));
    } else if (!comments[index]["upvoted"] && !comments[index]["downvoted"]) {
      axios
        .patch(`${process.env.REACT_APP_API_HOST}/comments/${id}/upvotes`)
        .then((response) => {
          if (response && response.status === 201) {
            const tempComments = comments.map((l) => Object.assign({}, l));
            tempComments[index] = response.data;
            tempComments[index]["upvoted"] = true;
            setComments(tempComments);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleCommentDownvote(index) {
    const id = comments[index]["_id"];
    if (comments[index]["downvoted"]) {
      axios
        .patch(
          `${process.env.REACT_APP_API_HOST}/comments/${id}/downvotes?undo=true`
        )
        .then((response) => {
          if (response && response.status === 201) {
            const tempComments = comments.map((l) => Object.assign({}, l));
            tempComments[index] = response.data;
            tempComments[index]["downvoted"] = false;
            setComments(tempComments);
          }
        })
        .catch((error) => console.log(error));
    } else if (!comments[index]["upvoted"] && !comments[index]["downvoted"]) {
      axios
        .patch(`${process.env.REACT_APP_API_HOST}/comments/${id}/downvotes`)
        .then((response) => {
          if (response && response.status === 201) {
            const tempComments = comments.map((l) => Object.assign({}, l));
            tempComments[index] = response.data;
            tempComments[index]["downvoted"] = true;
            setComments(tempComments);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function Header(props) {
    return !props.location ? null : (
      <div>
        <h2>{props.location.title}</h2>
        <Link to={"/"}>
          <Close />
        </Link>
        <p>{props.location.description}</p>
        <button onClick={props.handleUpvote}>
          <ThumbsUp />
        </button>
        <span>{props.location.upvotes}</span>
        <button onClick={props.handleDownvote}>
          <ThumbsDown />
        </button>
        <span>{props.location.downvotes}</span>
      </div>
    );
  }

  function Comment(props) {
    return (
      <div>
        <p>{props.comment.description}</p>
        <button onClick={props.handleUpvote}>
          <ThumbsUp />
        </button>
        <span>{props.comment.upvotes}</span>
        <button onClick={props.handleDownvote}>
          <ThumbsDown />
        </button>
        <span>{props.comment.downvotes}</span>
      </div>
    );
  }

  function handleChange(event) {
    const { value } = event.target;
    setNewComment(value);
  }

  function handleSubmit() {
    if (newComment.length >= 2) {
      const commentToPost = {
        description: newComment,
        upvotes: 0,
        downvotes: 0,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_HOST}/pins/${location._id}/comments`,
          commentToPost
        )
        .then((response) => {
          if (response && response.status === 201) {
            setNewComment("");
            setComments([...comments, response.data]);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div>
      <Header
        location={location}
        handleUpvote={() => handleLocationUpvote()}
        handleDownvote={() => handleLocationDownvote()}
      />
      <div>
        <h2>Comments</h2>
        {comments.map((comment, index) => {
          return (
            <Comment
              key={comment._id}
              comment={comment}
              handleUpvote={() => handleCommentUpvote(index)}
              handleDownvote={() => handleCommentDownvote(index)}
            />
          );
        })}
      </div>
      <form id="usrSubmit">
        <label htmlFor="comment">Leave a comment</label>
        <textarea
          id="comment"
          name="comment"
          value={newComment}
          onChange={handleChange}
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
        <input type="button" onClick={() => handleSubmit()} value="Submit" />
      </form>
    </div>
  );
}

export default CommentView;
