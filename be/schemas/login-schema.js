const LoginSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
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
      email: "john.doe@gmail.com",
      password: "1234567",
    },
  };

  export default LoginSchema;