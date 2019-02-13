import React, { Component } from 'react';
import { firebase } from '../../firebase'

import FormFeild from './../widgets/FormFeilds/formfeilds'
import style from './../widgets/FormFeilds/formfeilds.css'


const firebase_users = firebase.database().ref('users');

class AddUser extends Component {
    state = {
        registorCompleted: '',
        registorError: '',
        loading: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }

    }



    updateForm = (element) => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;

        if (element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
            //console.log(validData);
        }

        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;

        //console.log(newFormdata);
        this.setState({

            formdata: newFormdata
        })

        //console.log(newFormdata)
    }

    validate = (element) => {

        let error = [true, ''];

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This Feild is required' : ''}`;
            error = !valid ? [valid, message] : error;
        }

        return error;
    }


    submitButton = () => {

        return (
            this.state.loading ?
                'loading...' :
                <div>
                    <button onClick={(event) => this.submitForm(event)} > Add User</button>
                </div>)
    }

    showError = () => (
        this.state.registorError !== '' ?
            <div className={style.error}>
                {this.state.registorError}
            </div> : ''
    )

    showCompleted = () => (
        this.state.registorCompleted !== '' ?
            <div className={style.completed}>
                {this.state.registorCompleted}
            </div> : ''
    )

    submitForm = (event) => {
        event.preventDefault();


        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
        }
        for (let key in this.state.formdata) {
            formIsValid = this.state.formdata[key].valid && formIsValid
        }

        if (formIsValid) {
            this.setState({
                loading: true,
                registorError: ''
            })

            firebase_users.orderByChild("id")
                .limitToLast(1).once('value')
                .then((snapshot) => {

                    let cateId = null;
                    snapshot.forEach(childsnapshot => {
                        cateId = childsnapshot.val().id;
                    })

                    //console.log(this.state.formdata.category.value);
                    dataToSubmit['id'] = cateId + 1;
                    dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;

                    firebase_users.push(dataToSubmit)
                        .then(() => {
                            this.setState({
                                loading: false,
                                registorCompleted: 'User Inserted Successfully',

                            })

                        }).catch(error => {
                            this.setState({
                                loading: false,
                                registorError: error.message
                            })
                        })

                })




            //console.log(dataToSubmit);
        }


    }


    render() {
        return (
            <div className={style.logContainer}>
                <h2>Add New User For test </h2>
                <FormFeild id={'name'} formdata={this.state.formdata.name}
                    change={(element) => this.updateForm(element)} />
                {this.submitButton()}
                {this.showCompleted()}
                {this.showError()}

            </div>
        );
    }
}

export default AddUser;