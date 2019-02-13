import React, { Component } from 'react';
import { firebase } from '../../firebase'
import FormFeild from './../widgets/FormFeilds/formfeilds'
import style from './../widgets/FormFeilds/formfeilds.css'

const firebase_admin = firebase.database().ref('admin');

class Login extends Component {


    state = {

        registorError: '',
        loading: false,
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                    password: true,
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

        if (element.validation.email) {
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be valid email' : ''}`;
            error = !valid ? [valid, message] : error;
        }

        if (element.validation.password) {
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than 5' : ''}`;
            error = !valid ? [valid, message] : error;
        }

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
                    <button onClick={(event) => this.submitForm(event, false)} > Register Now</button>
                    <button onClick={(event) => this.submitForm(event, true)} > Login </button>
                </div>)
    }

    submitForm = (event, type) => {
        event.preventDefault();
        if (type !== null) {

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

                if (type) {
                    firebase.auth().signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
                        .then(() => {
                            this.props.history.push('/dashboard');
                        }).catch(error => {
                            this.setState({
                                loading: false,
                                registorError: error.message
                            })
                        })
                } else {
                    firebase.auth().createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
                        .then(() => {
                            dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
                            firebase_admin.push(dataToSubmit)
                                .then(() => {
                                    this.props.history.push('/dashboard');
                                })

                        }).catch(error => {
                            this.setState({
                                loading: false,
                                registorError: error.message
                            })
                        })
                }
                //console.log(dataToSubmit);
            }
        }

    }


    showError = () => (
        this.state.registorError !== '' ?
            <div className={style.error}>
                {this.state.registorError}
            </div> : ''
    )

    render() {
        return (
            // <div>
            //     <h1> Login / Register Panel </h1>
            //     <label> Email :</label>
            //    <input type="text" placeholder="enter email" /> <br/>
            //     <label> Password :</label>
            //     <input type="text" placeholder="enter password"/> <br/>

            //     <button>Register</button>
            //    <button>Login</button>
            // </div>

            <div className={style.logContainer}>
                <from onSubmit={(event) => this.submitForm(event, null)}>
                    <h2>Register/Login</h2>
                    <FormFeild id={'email'} formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)} />
                    <FormFeild id={'password'} formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)} />
                </from>

                {this.submitButton()}
                {this.showError()}

                </div>
        );
    }
}

export default Login;