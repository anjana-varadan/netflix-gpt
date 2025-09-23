export const checkValidData = (mode, name, email, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Invalid email format";
  if (!isPasswordValid) return "Password is not valid";

  if (mode === "signUp") {
    const isNameValid = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name);

    if (!isNameValid) return "Name is not valid";
  }

  return null;
};
