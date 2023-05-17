const UserSchema = {
    type: "object",
    required: ["firstName", "lastName", "gender", "email", "password"],
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
    },
    example: {
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      email: "john.doe@gmail.com",
      password: "1234567",
    },
  };

  export default UserSchema;