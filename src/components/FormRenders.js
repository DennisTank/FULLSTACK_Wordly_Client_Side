const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="error-msg">
        <div>{error}</div>
      </div>
    );
  }
};

export const renderInput = ({ myType, input, label, meta }) => {
  return (
    <div className="field">
      <label htmlFor="">{label}</label>
      <input type={myType || "text"} {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};
export const renderDate = ({ input, label, meta }) => {
  return (
    <div className="field">
      <label htmlFor="">{label}</label>
      <input type="date" {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};
export const renderTextarea = ({ myValue, input, label, meta }) => {
  return (
    <div className="field">
      <label htmlFor="">{label}</label>
      <textarea rows="5" {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};
export const renderPostarea = ({ input, label, meta }) => {
  return (
    <div className="post">
      <label htmlFor="">{label}</label>
      <textarea rows="5" {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};
