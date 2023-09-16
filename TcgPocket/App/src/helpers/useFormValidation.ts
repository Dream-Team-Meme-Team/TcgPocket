export const alphaNumRegex = /^[a-z0-9]+$/i;
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

  return { validateTextInput, validateEmail, validatePhoneNumer };
}
