import React, {Component} from 'react';
import strings from "../components/Localize";
import Dropzone from 'react-dropzone'
import {UploadHandler} from "../services/FetchHandler";
import axios from 'axios';
import api_url from '../components/Config'

var BaseURL = api_url;

export default class ChangePhoto extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            accepted: [],
            rejected: []
        }
    }

    onDrop(accepted, rejected) {

        var access_token = sessionStorage.getItem("access_token");
        var url = 'users/upload?token='+access_token;
        var filename = accepted[0].preview;

        axios({
            method: 'get',
            url: filename, // blob url eg. blob:http://127.0.0.1:8000/e89c5d87-a634-4540-974c-30dc476825cc
            responseType: 'blob'
        }).then(function(response){
            var reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onloadend = function() {
                var base64data = reader.result;

                const formData = new FormData()
                formData.append('file', base64data);

                fetch(BaseURL+url, {
                    method: "POST",
                    body: formData
                }).then((response) => response.json()
                ).then((res) => {
                     console.log(' result:', res);
                })
                .catch((res) => {
                    console.error(' error:',res);
                });


            }

        });


    }




    render(){

        let dropzoneRef;
        const dropzoneStyle = {
            width  : "200px",
            height : "200px",
            border : "1px dashed black",
            margin: '0 auto'
        };

        return (
            <div className="col-sm-9">


                <h2>Change your avatar image</h2>
                <p>Drag and drop a photo from your computer and our system will posterize the image for you.</p>

                <div className="text-center center-block">

                    <Dropzone
                        ref={(node) => { dropzoneRef = node; }}
                        onDrop={(accepted, rejected) => { this.onDrop(accepted, rejected) }}
                        style={dropzoneStyle}
                    >
                        <p>Drop files here.</p>
                    </Dropzone>
                    <button type="button" onClick={() => { dropzoneRef.open() }}>
                        Open File Dialog
                    </button>

                </div>

            </div>

        )

    }

}