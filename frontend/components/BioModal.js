import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { UserContext } from "./UserProvider";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 5px 12px 0 rgba(0,0,0,0.25)",
    padding: "30px"
  }
};

Modal.setAppElement("#__next");

class EditModal extends React.Component {
  state = { bio: this.context.bio };

  handleInput = e => this.setState({ bio: e.target.value });

  afterOpenModal = () => this.textArea.focus();

  render() {
    const { showModal, hide, confirm } = this.props;
    return (
      <Modal
        isOpen={showModal}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={hide}
        style={customStyles}
        contentLabel="Text Edit Modal"
      >
        <Close onClick={hide}>X</Close>
        <h3>Your bio</h3>
        <TextArea
          ref={el => (this.textArea = el)}
          value={this.state.bio}
          onChange={this.handleInput}
        />
        <CancelButton onClick={hide}>Cancel</CancelButton>
        <ConfirmButton
          onClick={() => {
            confirm(this.state.bio);
            hide();
          }}
        >
          Ok
        </ConfirmButton>
      </Modal>
    );
  }
}

export default EditModal;

const TextArea = styled.textarea`
  height: 20em;
  width: 40em;
  display: block;
  margin: 0.5em;
`;

const Close = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.3rem;
  font-weight: 700;
  border-radius: 2px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background: rgba(0, 0, 0, 0);
  border: 0;
`;

const ConfirmButton = styled.button`
  float: right;
  color: white;
  cursor: pointer;
  border: 0;
  background: hsl(120, 55%, 45%);
  border-radius: 2px;
  padding: 0 15px;
  height: 35px;
  margin: 0.5em;
`;
const CancelButton = styled.button`
  float: right;
  color: white;
  cursor: pointer;
  border: 0;
  background: hsl(0, 78%, 51%);
  border-radius: 2px;
  padding: 0 15px;
  height: 35px;
  margin: 0.5em;
`;

EditModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired
};

EditModal.contextType = UserContext;
