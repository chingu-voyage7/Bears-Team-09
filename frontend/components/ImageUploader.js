import React, { Component } from "react";
import axios from "axios";

class ImageUploader extends Component {
  state = { selectedFile: null };

  handleFileSelect = e => {
    this.setState({ selectedFile: e.target.files[0] });
    const formData = new FormData();
    formData.append("myFile", this.state.selectedFile, this.state.selectedFile.name);
    // axios.post("my-domain.com/file-upload", formData);
  };

  handleClick = () => this.selectFile.click();

  render() {
    return (
      <div>
        <input
          type="file"
          onChange={this.handleFileSelect}
          ref={element => {
            this.selectFile = element;
          }}
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
        />
        <button type="button" onClick={this.handleClick}>
          Upload new picture
        </button>
      </div>
    );
  }
}

export default ImageUploader;
