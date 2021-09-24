import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
import "./Model.css";

function DeleteQuoteModle(props) {
  return (
    <div className="model">
      <div className="model-card">
        <div className="close-model" onClick={props.onClickClose}>
          <FaRegWindowClose />
        </div>
        <p>Sure want to delete this Quote?</p>
        <button
          className="field-buttom delete-button"
          onClick={() => {
            props.onClickYes(props.quoteid);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteQuoteModle;
