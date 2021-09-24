import React from "react";
import "./Model.css";

function ErrorModel(props) {
  return (
    <div className="model">
      <div className="model-card">
        <p className="error">{props.error}</p>
        <button className="field-buttom" onClick={props.onClick}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorModel;
