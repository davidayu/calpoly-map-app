import React, { Component } from "react";

function ListView(props) {

    //let listitems = getPins();

    let listitems = [{title:'Study Bench', description:'Nice stone bench with shade from trees', upVotes:3, downVotes:4,pinType:'Study Location', color:'green'},{title:'Favorite place to eat by foodtrucks', description:'Picnic chairs on lawn by the gym', upVotes:13, downVotes:14,pinType:'Eating Location', color:'red'}]


    
        return(
            <div>
                <h1>List view</h1>
                <p>
                    {listitems.map( pin => 
                    <p style={{outlineStyle: 'groove', outlineColor: pin.color}}>
                        <p style={{fontSize: 20}}> {pin.title}</p>
                        <div>{pin.description}</div>
                        <div style={{float: 'right', margin: 10}}>Upvotes: {pin.upVotes} Downvotes: {pin.downVotes} </div>
                        <p style={{ color: pin.color }}>Type: {pin.pinType}</p>
                    </p>
                    )}
                </p>
            </div>
        );
}
export default ListView;

