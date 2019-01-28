import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "./UserProvider";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

class ImageUploader extends Component {
  state = { selectedFile: null };

  handleFileSelect = e => {
    const imageFile = e.target.files[0];
    this.setState({ selectedFile: imageFile });
    const formData = new FormData();
    formData.append("file", imageFile, imageFile.name);
    axios
      .post(`${backendUrl}/users/images`, formData, {
        headers: {
          Authorization: `Bearer ${this.context.token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        // At this point, image is already uploaded to the cloud and inserted into DB
        const newImageUrl = res.data.url;
        this.context.updateImage(newImageUrl);
      })
      .catch(err => {
        console.error(err.response);
      });
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

ImageUploader.contextType = UserContext;

export default ImageUploader;

const CenteredButton = styled.button`
  margin: 0 auto;
  display: block;
`;
