export const alphaNumRegex = /^[a-z0-9\s]+$/i;
export const passwordRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
export const phoneNumberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function useFormValidation() {
  const validateTextInput = (text: string) => {
    return !alphaNumRegex.test(text);
  };

  const validateEmail = (email: string) => {
    return !emailRegex.test(email);
  };

  const validatePhoneNumer = (phoneNumber: string) => {
    return !phoneNumberRegex.test(phoneNumber);
  };

  const validatePassword = (password: string) => {
    return !passwordRegex.test(password);
  };

  return {
    validateTextInput,
    validateEmail,
    validatePhoneNumer,
    validatePassword,
  };
}
