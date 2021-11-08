import React, { useState } from "react";
import Collapsible from 'react-collapsible';


function CommentView(props) {

    let pin = {title:'Study Bench', description:'Nice stone bench with shade from trees', upVotes:3, downVotes:4,pinType:'Study Location', color:'green'}
    let comments = [{description:"I go here all the time"},{description:"I got my shoes dirty here, I don't like it"}]

    /*const [show, setShow] = useState(false);
    const handleOpen = () => {
      setShow(!show); // Toggle accordion
    };*/

    return(
        <div>
            <div style={{fontSize: 20}} >{pin.title}</div>
            <div>{pin.description}</div>
            <br></br>
            <div>Comments:</div>
            {comments.map( text => 
            <div>
                <Collapsible trigger = "▼/▲" open = 'true'>
                    {text.description} 
                </Collapsible>
            </div>
            )}

              
        </div>
    )
}
export default CommentView;

//<button className="sign" onClick={handleOpen} style={{float: 'left', margin: 10}}>{show ? '-' : '+'}</button>
//<div style={{float: 'left', margin: 10}}>{show && text.comment}</div> text.upvotes text.downvotes}