const validationMessages = {
  login: {
    email: {
      REQUIRED: "Email ID is required",
      EMAIL_INVALID: "Enter valid Email ID",
    },
    password: {
      REQUIRED: "Password is required",
      MIN_CHAR_LENGTH: "Password is too short - should be 6 chars minimum.",
      MAX_CHAR_LENGTH: "Password is too long - should be 8 chars maximum.",
    },
    cpassword: {
      REQUIRED: "Confirm Password is required",
      MATCH: "Passwords must match",
    },
  },
  register: {
    firstName: {
      REQUIRED: "First Name is Required",
      CHAR_LENGTH: "First Name must contain atleast 2 characters",
      ONLY_ALPHABETS: "First Name must contain only alphabets",
    },
    lastName: {
      REQUIRED: "Last Name is Required",
      CHAR_LENGTH: "Last Name must contain atleast 2 characters",
      ONLY_ALPHABETS: "Last Name must contain only alphabets",
    },
  },
};

export default validationMessages;
