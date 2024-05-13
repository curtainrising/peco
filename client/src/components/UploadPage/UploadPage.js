import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import { read as readFileXLS, utils as utilsXLS, write as writeFileXLS } from 'xlsx';
import styled from 'styled-components';
import UploadDetails from "./UploadDetails";
import { uploadClassRequest } from '../../redux/actionCreators';

const spreadSheetTypes = ['ods', 'xls'];
const CenteredDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;


class Uploadpage extends Component {
  fileInputRef = null;
  fileReader = null;
  constructor(props) {
    super(props)
    this.state = {
      hightlight: false,
      loaded: false,
      fileText: ''
    }
    this.fileInputRef = React.createRef()

    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  openFileDialog() {
    if (this.props.disabled) return
    this.fileInputRef.current.click()
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return
    const files = evt.target.files
    // console.log(files[0]);
    this.handleFileChosen(files[0]);
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
  }

  onDragOver(evt) {
    evt.preventDefault()

    if (this.props.disabled) return

    this.setState({ hightlight: true })
  }

  onDragLeave() {
    this.setState({ hightlight: false })
  }

  onDrop(event) {
    event.preventDefault()

    if (this.props.disabled) return

    const files = event.dataTransfer.files
    // console.log(files[0]);
    this.handleFileChosen(files[0]);
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
  }

  fileListToArray(list) {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  handleFileRead = (e) => {
    console.log('here',e);
    const content = this.fileReader.result;
    console.log('content', content);
    this.setState({
      hightlight: false,
      loaded: true,
      fileText: content,
      fileName: this.fileName
    })
  }

  handleODSFileReady = (e) => {
    console.log('here',e);
    console.log('content', this.fileReader.result);
    const workbook = readFileXLS(this.fileReader.result);
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    const data = utilsXLS.sheet_to_json(ws);
    const content = utilsXLS.sheet_to_csv(ws);
    console.log('workbook', workbook);
    console.log('ws', ws);
    console.log('data', data);
    console.log('csvData', content);
    this.setState({
      hightlight: false,
      loaded: true,
      fileText: content,
      fileName: this.fileName
    })
  }
  handleFileChosen = (file) => {
    console.log('file', file);
    this.fileName = file.name
    this.fileType = file.type;
    let fileNameArr = file.name.split('.');
    let fileNameType = fileNameArr[fileNameArr.length - 1];
    this.fileReader = new FileReader();
    if (spreadSheetTypes.find(item => fileNameType.includes(item))) {
      console.log('xls or ods');
      this.fileReader.onloadend = this.handleODSFileReady;
      this.fileReader.readAsArrayBuffer(file);
    } else {
      console.log('cvs');
      this.fileReader.onloadend = this.handleFileRead;
      this.fileReader.readAsText(file);
    }
  }
  handleSave = (payload) => {
    this.props.dispatch(uploadClassRequest(payload));
    this.setState({loaded: false})
  }
  render() {
    return (
      <div>
        {!this.state.loaded &&
          <CenteredDiv
            style={{float: "left"}}
          >
            <div
              className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              onDrop={this.onDrop}
              onClick={this.openFileDialog}
              style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
            >
              <input
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                multiple
                onChange={this.onFilesAdded}
              />
              <img
                alt="upload"
                className="Icon"
                src={process.env.REACT_APP_CLOUDFRONT_URL + "/baseline-cloud_upload-24px.svg"}
              />
              <span>Upload Files</span>
            </div>
          </CenteredDiv>
        }
        {this.state.loaded &&
          <UploadDetails
            fileText={this.state.fileText}
            fileName={this.state.fileName}
            handleSave={this.handleSave}
          />
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps)(Uploadpage));
