import React, { Component } from 'react';
import { firedb, firebase, firebaselooper } from '../../firebase'
import Button from '../widgets/Buttons/button'
import style from './user.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
                
                //console.log('start',users);

                const asyncFucntion = (item, i, cb) => {
                    firebase.storage().ref('userimages').child(item.image).getDownloadURL().then(url => {
                        //console.log(url);
                        users[i].image = url;
                        cb();
                    })
                }


                let request = users.map((item, i) => {
                    return new Promise((resolve) => {
                        asyncFucntion(item, i, resolve)
                    })
                })

                // Promise.all(request).then(() => {
                //     //console.log('End',users);
                //     this.setState({
                //         items: [...this.state.items, ...users],
                //         start,
                //         end
                //     })
                // })

                

            })
            .catch(e => {
                console.log(e);
            })

          

    }

    loadMore = () => {

        //console.log("end", this.state.end);
        // console.log("amount", this.state.amount);
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end);
    }


    toggleBlock = (feild='', value='', uid='') => {

        if (feild === 'block') {
            firedb.ref('users/' + uid).update({
                isblock: !value
            });
        }
        if (feild === 'delete') {
            firedb.ref('users/' + uid).update({
                isdelete: !value
            });
        }

        //this.request(this.state.start, this.state.end);
        //console.log(feild, value, uid);

    }
    renderusers = () =>{

        const { items } = this.state;
        //console.log(items);
        let UserTemplate = null;
        UserTemplate = items.map((item, i) => {
                return (
                    <CSSTransition classNames={
                        {
                            enter: style.newsList_wrapper,
                            enterActive: style.newsList_wrapper_enter
                        }
                    } timeout={500} key={i} >
                        <div >



                            <div className={style.gallery}>
                                <a target="_blank" rel="noopener noreferrer" href={item.image}>
                                    <img src={item.image} alt={item.name} width="600" height="400"/>
                                </a>
                                <div className={style.desc}>{item.name}</div>
                             
                            </div>

                        <div>
                                {item.isblock ? <Button type="button" toggleBlock={() => this.toggleBlock('block', item.isblock, item.id)} cta="Unblock" /> : <Button type="button" toggleBlock={() => this.toggleBlock('block', item.isblock, item.id)} cta="Block" />}
                                {item.isdelete ? <Button type="button" toggleBlock={() => this.toggleBlock('delete', item.isdelete, item.id)} cta="Restore" /> : <Button type="button" toggleBlock={() => this.toggleBlock('delete', item.isdelete, item.id)} cta="Delete" />}

                                
                                

                                {/* <div className={style.block}>
                                    <h5>Block Status</h5>
                                    <div> <span >{item.isblock ? 'Blocked' : 'UnBlocked'} <button onClick={this.toggleBlock('block', item.isblock, item.id)}>X</button> </span></div> 
                                </div>
                                <div className={style.delete}>
                                    <h5>Delete Status</h5>
                                    <div> <span>{item.isdelete ? 'Deleted' : 'NotDeleted'}  <button onClick={this.toggleBlock('delete', item.isdelete, item.id)}>X</button> </span></div>  
                                </div> */}

                        </div>

                            
                        </div>
                    </CSSTransition>
                )
            })
        


        
        

            return UserTemplate;


    }



   

    render() {

        //const { items }  = this.state;
        //console.log(items);
        return (
            <div>
                <TransitionGroup component="div" className="list">
                {this.renderusers()}
                </TransitionGroup>
                <Button type="loadmore" loadMore={() => this.loadMore()} cta="Load More" />

            </div>
        );
    }
}

export default UsersList;