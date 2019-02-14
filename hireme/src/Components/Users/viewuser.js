import React, { Component } from 'react';


import UsersList from './userslist';




class ViewUser extends Component {

    render() {
        return (
            <div>
                <h2>View Block Delete Users</h2>
                <UsersList type="card" loadmore={true} start={0} amount={3} />
            </div>
        );
    }
}

export default ViewUser;