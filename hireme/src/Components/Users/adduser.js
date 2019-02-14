import React, { Component } from 'react';
import { firebase , firedb } from '../../firebase'

import FormFeild from './../widgets/FormFeilds/formfeilds'
import style from './../widgets/FormFeilds/formfeilds.css'
import Uploader from '../widgets/FileUploader/fileuploader'

const firebase_users = firedb.ref('users');
const firebase_categories = firedb.ref('categories');


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
            }, category: {
                element: 'select',
                value: '',
                config: {
                    name: 'category_input',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''

            }, image: {
                element: 'image',
                value: '',
                valid: true,
                validation: {
                    required: true,
                }
            }
        }

    }



    updateForm = (element, content = '') => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }

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

                    let userId = null;
                    snapshot.forEach(childsnapshot => {
                        userId = childsnapshot.val().id;
                    })

                    //console.log(this.state.formdata.category.value);
                    dataToSubmit['id'] = userId + 1;
                    dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
                    dataToSubmit['isdelete'] = false;
                    dataToSubmit['isblock'] = false;
                    dataToSubmit['location'] = {cord : {lat:'0.004044',long:'0.0004'}};
                    dataToSubmit['phone'] = '0303-6660032';


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


    componentDidMount() {
        this.loadCategories();
    }


    loadCategories = () => {
        firebase_categories.once('value')
            .then((snapshot) => {
                let category = [];
                snapshot.forEach((childsnapshot) => {
                    category.push({
                        id: childsnapshot.val().id,
                        name: childsnapshot.val().category
                    })
                })

                const newFormdata = { ...this.state.formdata };
                const newElement = { ...newFormdata['category'] };
                newElement.config.options = category;
                newFormdata['category'] = newElement;

                this.setState({
                    formdata: newFormdata
                })

            })
    }

    storeFilename = (filename) => {
        this.updateForm({ id: 'image' }, filename)
    }

    render() {
        return (
            <div className={style.logContainer}>
                <h2>Add New User For test </h2>

                

                <h3>User Name</h3>
                <FormFeild id={'name'} formdata={this.state.formdata.name}
                    change={(element) => this.updateForm(element)} />


                <h3>Category</h3>
                <FormFeild id={'category'} formdata={this.state.formdata.category}
                    change={(element) => this.updateForm(element)} />

                <h3>Select Image</h3>
                <Uploader filename={(filename) => this.storeFilename(filename)} />

                {this.submitButton()}
                {this.showCompleted()}
                {this.showError()}

            </div>
        );
    }
}

export default AddUser;