import React, { Component } from 'react';
import { firedb, firebaselooper } from '../../firebase'


const firebase_users = firedb.ref('users');
const firebase_categories = firedb.ref('categories');

class UsersList extends Component {

    state = {
        items: [],
        categories: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
        loadmore: this.props.loadmore,
        type: this.props.type
    }


    componentWillMount() {

        this.request(this.state.start, this.state.end);
    }


    request = (start, end) => {
        if (this.state.categories.length < 1) {

            firebase_categories.once('value')
                .then((snapshot) => {
                    const categories = firebaselooper(snapshot);
                    this.setState({
                        categories
                    })
                })
        }
        firebase_users.orderByChild("id").startAt(start).endAt(end).once('value')
            .then((snapshot) => {
                const users = firebaselooper(snapshot);
                this.setState({
                    items: [...this.state.items, ...users],
                    start,
                    end
                })
            })
            .catch(e => {
                console.log(e);
            })

          

    }

    render() {

        console.log(this.state.items);
        return (
            <div>
                
            </div>
        );
    }
}

export default UsersList;