import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { UserContext } from "./UserProvider";
import config from "../config.json";
import { NeutralButton } from "./shared/Buttons";

const backendUrl = config.BACKEND_URL;

class ImageUploader extends Component {
  state = { selectedFile: null };

  handleFileSelect = e => {
    const imageFile = e.target.files[0];
    this.setState({ selectedFile: imageFile });
    const formData = new FormData();
    formData.append("file", imageFile, imageFile.name);
    const url = `${backendUrl}${this.props.url}`;
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${this.context.token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        // At this point, image is already uploaded to the cloud and inserted into DB
        const newImageUrl = res.data.url;
        this.props.onCompletion(newImageUrl);
      })
      .catch(err => {
        console.error(err.response);
      });
  };

  handleClick = () => this.selectFile.click();

  render() {
    return (
      <>
        <input
          type="file"
          onChange={this.handleFileSelect}
          ref={element => {
            this.selectFile = element;
          }}
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
        />
        <NeutralButton type="button" onClick={this.handleClick}>
          Upload new picture
        </NeutralButton>
      </>
    );
  }
}

ImageUploader.contextType = UserContext;

export default ImageUploader;

ImageUploader.propTypes = {
  url: PropTypes.string.isRequired,
  onCompletion: PropTypes.func
};
