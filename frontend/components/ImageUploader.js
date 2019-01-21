import React, { Component } from "react";
// import axios from "axios";
import styled from "styled-components";

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
      <div style={{ position: "relative" }}>
        <input
          type="file"
          onChange={this.handleFileSelect}
          ref={element => {
            this.selectFile = element;
          }}
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
        />
        <CenteredButton type="button" onClick={this.handleClick}>
          Upload new picture
        </CenteredButton>
      </div>
    );
  }
}

export default ImageUploader;

const CenteredButton = styled.button`
  margin: 0 auto;
  display: block;
`;
