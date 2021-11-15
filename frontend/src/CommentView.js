// import { svg } from "leaflet";
import React, { useState } from "react";
import Collapsible from 'react-collapsible';

import { ReactComponent as ThumbsUp } from "./thumbs-up.svg";
import { ReactComponent as ThumbsDown } from "./thumbs-down.svg";

function CommentViewHeader(props){
    return (
        <div>
            <div style={{fontSize: 20}}>{props.pin.title}</div>
            <div>{props.pin.description}</div>
            <br></br>
            <div>Comments:</div>
        </div>
    );
}

function CommentViewBody(props) {
    const _comments = props.commentsData.map( (text, index) => {
        return(
            <Collapsible key={index} trigger = "▼/▲" open = 'true'>
                {text.description} <br></br>
                <ThumbsUp title="Upvotes" onClick={() => props.upVote(index)}/> {text.upvotes} 
                <ThumbsDown title="Downvotes" onClick={() => props.downVote(index)}/> {text.downvotes} 
            </Collapsible>
        );
    });
    return <div>{_comments}</div>;
}

function CommentView(){
    let pin = {title:'Study Bench', description:'Nice stone bench with shade from trees', upVotes:3, downVotes:4,pinType:'Study Location', color:'green'}
    let commentz = [{description:"I go here all the time", downvotes: 10, upvotes: 50},{description:"I got my shoes dirty here, I don't like it", downvotes: 6, upvotes: 32}]

    const [comments, setComments] = useState(commentz);

    function upVote(index){
        let commentsTemp = comments;
        commentsTemp[index].upvotes += 1;
        setComments([...commentsTemp]);
    }

    function downVote(index){
        let commentsTemp = comments;
        commentsTemp[index].downvotes += 1;
        setComments([...commentsTemp]);
    }

    return (
        <div>
            <CommentViewHeader pin = {pin}/>
            <CommentViewBody  commentsData = {comments} upVote = {upVote} downVote = {downVote}/>
        </div>
    );
}

export default CommentView;
