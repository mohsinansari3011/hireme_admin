import React, { Component } from 'react';


import UsersList from './userslist';




class ViewUser extends Component {

    render() {
        return (
            <div>
                <UsersList type="card" loadmore={true} start={0} amount={2} />
            </div>
        );
    }
}

export default ViewUser;