import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import { ReactComponent as ThumbsUp } from "../icons/thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "../icons/thumbs-down.svg";
import { ReactComponent as Close } from "../icons/close.svg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// function Comment(props) {
//     return (
//       <Collapsible key={props.index} trigger="▼/▲" open="true">
//         {text.description} <br></br>
//         <ThumbsUp title="Upvotes" onClick={() => props.upVote(index)} />{" "}
//         {text.upvotes}
//         <ThumbsDown
//           title="Downvotes"
//           onClick={() => props.downVote(index)}
//         />{" "}
//         {text.downvotes}
//       </Collapsible>
//     );
//   });
//   return <div>{_comments}</div>;
// }

function CommentView() {

   const navigate = useNavigate();
   const params = useParams();

   const [location, setLocation] = useState(null);
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");

   function Header(props) {
      return !props.location ? null :
            (<div>
               <h2 style={{ fontSize: 20 }}>{props.location.title}</h2>
               <button onClick={() => navigate(-1)} >
                  <Close />
               </button>
               <p>{props.location.description}</p>
            </div>)
   }

   useEffect(() => {
      const id = params.id;
      console.log(id);
      axios
        .get(`${process.env.REACT_APP_API_HOST}/pins/${id}`)
        .then((response) => {
          if (response && response.status === 200) {
            setLocation(response.data);
            console.log(response.data);
          }
        })
        .catch((error) => console.log(error));
        axios
        .get(`${process.env.REACT_APP_API_HOST}/pins/${id}/comments`)
        .then((response) => {
          if (response && response.status === 200) {
            setComments(response.data);
            console.log(response.data);
          }
        })
        .catch((error) => console.log(error));
    }, [params]);

//   function upVote(index) {
//     let commentsTemp = comments;
//     commentsTemp[index].upvotes += 1;
//     setComments([...commentsTemp]);
//   }

//   function downVote(index) {
//     let commentsTemp = comments;
//     commentsTemp[index].downvotes += 1;
//     setComments([...commentsTemp]);
//   }

//   function inputChange(event) {
//     const { name, value } = event.target;
//     console.log(comment);
//     userSubmit(value);
//   }

//   function commentSubmit() {
//     console.log(comment); // replace with backend insert
//     userSubmit("");
//   }

  return (
    <div>

      <Header location={location} />
      {/* <CommentViewBody
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
      </form> */}
    </div>
  );
}

export default CommentView;
