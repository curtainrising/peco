import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import UploadDetails from "./UploadDetails";
import { uploadClassRequest } from '../redux/actionCreators';

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
    this.setState({
      hightlight: false,
      loaded: true,
      fileText: content,
      fileName: this.fileName
    })
  }
  handleFileChosen = (file) => {
    console.log(file);
    this.fileName = file.name
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    this.fileReader.readAsText(file);
  }
  handleSave = (payload) => {
    this.props.dispatch(uploadClassRequest(payload));
    this.setState({loaded: false})
  }
  render() {
    return (
      <div>
        <div
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
              src="baseline-cloud_upload-24px.svg"
            />
            <span>Upload Files</span>
          </div>
        </div>
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
