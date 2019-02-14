import React, { Component } from 'react';
import { firebase } from '../../../firebase';
import FileUploader from 'react-firebase-file-uploader'

class Uploader extends Component {
    state = {
        name:"",
        isUploading:false,
        progress:0,
        fileURL:''
    }

    handleUploadStart = () =>{

        this.setState({
            isUploading: true, progress:0
        })
    }

handleUploadError = (error) => {

        this.setState({
            isUploading: false
        })

        console.log(error)
    }



    handleUploadSuccess = (filename) =>{
        //console.log(filename)
        this.setState({
            name:filename,
            progress:100,
            isUploading:false
        })

        firebase.storage().ref('userimages')
        .child(filename).getDownloadURL()
        .then( url => {
            this.setState({
                fileURL:url
            })
        })

        this.props.filename(filename);
    }

    handleProgress = (progress) => {
        this.setState({
            progress
        })
    }


    render() {
        return (
            <div>
                <FileUploader
                accept="image/*"
                name="image"
                randomizeFilename
                storageRef={firebase.storage().ref('userimages')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}

                />

                { this.state.isUploading ? <p>uploading {this.state.progress} % </p> : null}
                { this.state.fileURL ? <img alt="" style={{width:'150px', height:'150px'}} src={this.state.fileURL}/> :null}
            </div>
        );
    }
}

export default Uploader;