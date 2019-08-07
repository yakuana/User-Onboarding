import React from 'react';

// creates a card for a given user using their name and email address 
const UserCard = ({user}) => {
    return (
        <div className="user-card">
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    )
}

export default UserCard; 