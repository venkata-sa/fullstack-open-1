import React from 'react';

const Notification = ({message, status}) => {
    if(message === null) return null;
    let msgStyle = {color: 'red'}

    if(status === 'success') {
        msgStyle = {color : 'green'}
    }

    return (
        <div style = {msgStyle} > {message} </div>
    )
} 

export default Notification;