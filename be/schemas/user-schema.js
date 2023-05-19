const UserSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "gender",
    "email",
    "password",
    "isDoctor",
    "doctorId",
  ],
  properties: {
    firstName: {
      type: "string",
      description: "First name of the user",
    },
    lastName: {
      type: "integer",
      description: "Last name of the user",
    },
    gender: {
      type: "string",
      description: "Gender of the user",
    },
    email: {
      type: "string",
      description: "The email of the user",
    },
    password: {
      type: "string",
      description: "Password of the user",
    },
    isDoctor: {
      type: "boolean",
      description: "True if the user is a doctor else false",
    },
    doctorId: {
      type: "integer",
      description: "Doctor id for current patient or null if he is a doctor",
    },
  },
  example: {
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    email: "john.doe@gmail.com",
    password: "1234567",
    isDoctor: false,
    doctorId: 12,
  },
};

export default UserSchema;
