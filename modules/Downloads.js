import React, {Component} from 'react';
import strings from "../components/Localize";
import {GetFileData, GetUserData} from "../services/UserData";
import {GetFile, GetFiles} from "../services/UserData";
import api_url from '../components/Config';

import axios from 'axios';

var BaseURL = api_url;
export default class Downloads extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: [],
            lang: 0,
            name: ""
        };
        this.GetFile = this.GetFile.bind(this);
    }


    componentDidMount() {
        GetFileData().then((result) => {
            var responseJson = result;
            this.setState({
                fileName: responseJson
            });

        }).catch((err) => {
            console.log(err);
        });


    }

    GetFile(name) {
        var access_token = sessionStorage.getItem("access_token");
        axios({
            url: BaseURL + 'getFile/' + name + '?token=' + access_token,
            responseType: 'blob',
            method: 'get',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
        });
    }

    GetButton(filePath, fileName, title) {
        return (
            <button title={title} className={"btn-sm btn-primary"}
                    onClick={() => this.GetFile(filePath)}>{fileName}
            </button>
        );
    }

    render() {
        var fileNames;
        if (this.state.fileName.length > 0) {
            fileNames = this.state.fileName.map((fileName, index, title) => {

                var ButtonEN = '';
                var ButtonFR = '';
                var ButtonSP = '';

                if (this.state.fileName[index].file_en != '') {
                    ButtonEN = this.GetButton(this.state.fileName[index].title + '/en/' + this.state.fileName[index].file_en, 'en', 'Download');
                }

                if (this.state.fileName[index].file_fr != '') {
                    ButtonFR = this.GetButton(this.state.fileName[index].title + '/fr/' + this.state.fileName[index].file_fr, 'fr', 'Télécharger');
                }

                if (this.state.fileName[index].file_es != '') {
                    ButtonSP = this.GetButton(this.state.fileName[index].title + '/es/' + this.state.fileName[index].file_es, 'es', 'Descarga');
                }

                return (
                    <tr key={index}>
                        <td><h5>{this.state.fileName[index].title}</h5></td>
                        <td>
                            {ButtonEN} {ButtonFR} {ButtonSP}
                        </td>
                    </tr>
                )

            });
        } else {
            fileNames = (
                <tr><td colSpan="2">{strings.no_files}</td></tr>
            )
        }
        return (
            <div className="col-sm-9">
                <h2>{strings.download}</h2>
                <div className="table-responsive">
                    <table className="table table-responsive" style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <th>{strings.files}</th>
                        </tr>
                        </thead>

                        <tbody>
                        {fileNames}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}