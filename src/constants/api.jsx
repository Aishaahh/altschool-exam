export const postLogin = async (credentials) => {
  const { email, password } = credentials;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const checkEmail = email === "aishah@altschool.com";
      const checkPassword = password === "aishah";
      if (checkEmail && checkPassword) {
        const user = {
          name: "Aishah",
          email,
        };
        return resolve({ user, message: "Login succussfully" });
      } else if (!checkEmail) {
        reject("User not found");
      } else if (!checkPassword) {
        reject("Incorrect Password");
      }
    }, 3000)
  );
};
