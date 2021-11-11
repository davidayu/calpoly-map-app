import { svg } from "leaflet";
import React, { useState } from "react";
import Collapsible from 'react-collapsible';

import { ReactComponent as ThumbsUp } from "./thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "./thumbs-down.svg";


function CommentView(props) {

    let pin = {title:'Study Bench', description:'Nice stone bench with shade from trees', upVotes:3, downVotes:4,pinType:'Study Location', color:'green'}
    let commentz = [{description:"I go here all the time", downvotes: 10, upvotes: 50},{description:"I got my shoes dirty here, I don't like it", downvotes: 6, upvotes: 32}]

    const [comments, addVote] = useState(commentz)//getComments()

    function upVote(index){
        commentz[index].upvotes += 1;
        addVote(commentz);
    }
    /*const [show, setShow] = useState(false);
    const handleOpen = () => {
      setShow(!show); // Toggle accordion
    };*/

  /*   function addVote(text, upvotes){
        if(upvotes){
            text.upvotes = text.upvotes + 1;
        }
        else{
            text.downvotes = text.downvotes + 1;
        }
    }

   function upvoteComment(text){
        console.log(text);
        text.upvotes = text.upvotes + 1;
    }

    function downvoteComment(text){
        console.log(text);
        text.downvotes = text.downvotes + 1;
    }*/

    return(
        <div>
            <div style={{fontSize: 20}} >{pin.title}</div>
            <div>{pin.description}</div>
            <br></br>
            <div>Comments:</div>
            {comments.map( (text, index) => 
            <div>
                <Collapsible trigger = "▼/▲" open = 'true'>
                    {text.description} <br></br> <ThumbsUp title="Upvotes" onClick={() => upVote(index)}/> {text.upvotes} <ThumbsDown title="Downvotes" onClick={() => addVote(text.downvotes + 1)}/>{text.downvotes} 
                </Collapsible>
            </div>
            )}

              
        </div>
    )
}
export default CommentView;

//<button className="sign" onClick={handleOpen} style={{float: 'left', margin: 10}}>{show ? '-' : '+'}</button>
//<div style={{float: 'left', margin: 10}}>{show && text.comment}</div> text.upvotes text.downvotes}

//{text.description} <br></br> <UpvoteSvg /> {text.upvotes} <DownvoteSvg />{text.downvotes} 
//upvoteComment.bind(this)