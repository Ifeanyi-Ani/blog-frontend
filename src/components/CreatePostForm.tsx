// import React from "react";
import { Form, Modal } from "react-bootstrap";
import Avater from "./Avater";
// import { connect } from "react-redux";
// import { togglePostForm } from "../redux/modals/modals.actions";
import React, { useState } from "react";
import Select from "react-select";

const CreatePostForm = ({ hideCreateForm, togglePostForm }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = inputValue => {
    setInputValue(inputValue);
  };
  console.log(inputValue);
  const handleKeyDown = event => {
    if (event.key === "Enter" && inputValue) {
      const newOption = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newOption]);
      setInputValue("");
      event.preventDefault(); // Prevents form submission
    }
  };
  return (
    <Modal
      centered
      show={hideCreateForm}
      onHide={togglePostForm}
      className='modalSecon'
      backdrop='static'
    >
      <Modal.Body className='customBody'>
        <Avater />
        <div className='modalForm'>
          <div className='title'>
            <div className='nameCon'>i-ani</div>
            <div className='icons'></div>
          </div>
          <Form>
            <Form.Group>
              <Form.Control type='text' placeholder='Title' />
            </Form.Group>
            <Form.Group>
              <textarea
                name=''
                id=''
                cols='30'
                rows='10'
                className='textareas'
                placeholder='Go ahead, put anything'
              ></textarea>
            </Form.Group>
            <Form.Group>
              <Form.Control type='file' />
            </Form.Group>
            <Form.Group>
              <Select
                isMulti
                menuIsOpen={false}
                placeholder='#add tags to help people find your post'
                value={options}
                options={options}
                onChange={value => setOptions(value)}
                onInputChange={handleInputChange}
                onKeyDown={handleKeyDown}
                isSearchable
              />
              {console.log(options)}
            </Form.Group>

            <Form.Group className='actionCrt'>
              <button type='button' onClick={togglePostForm}>
                Close
              </button>
              <Form.Select role='button'>
                <option>For Everyone</option>
              </Form.Select>
              <button type='button'>Post now</button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
// const mapStateToProps = ({ toggleModal: { hideCreateForm } }) => {
//   hideCreateForm;
// };
// const mapDispatchToProps = dispatch => ({
//   togglePostForm: () => dispatch(togglePostForm()),
// });
export default CreatePostForm;
