export const v_Email = (email) => {
  const reg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email) {
    return "you must enter a email";
  } else if (!reg.test(email)) {
    return "invalid email";
  } else if (email.length > 50) {
    return "email to big";
  }
};
export const v_Password = (password) => {
  if (!password) {
    return "you must enter a password";
  } else if (password.length < 6) {
    return "password to small";
  } else if (password.length > 10) {
    return "password to big";
  }
};
export const v_CnfPass = (pass, cnfpass) => {
  if (pass && pass !== cnfpass) {
    return "password doesn't match";
  }
};
export const v_DOB = (dob) => {
  if (!dob) {
    return "you must enter your date of birth";
  }
};
export const v_Username = (username) => {
  const alpha = /^[A-Za-z]+$/;

  if (!username) {
    return "you must enter your name";
  } else if (!alpha.test(username?.[0])) {
    return "first character alphabet only";
  } else if (username.length > 20) {
    return "username to big";
  }
};
export const v_Bio = (bio) => {
  if (bio && bio.length > 300) {
    return "bio to big (300 characters only)";
  }
};
export const v_Quote = (quote) => {
  if (!quote) {
    return "you must enter something to post";
  } else if (quote.length > 1000) {
    return "quote to big (1000 characters only)";
  }
};
