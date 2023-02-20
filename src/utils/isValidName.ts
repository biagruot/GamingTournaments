/**
 * Validates whether a string contains only Latin letters, numbers, and spaces.
 *
 * @param {string} str - The string to validate.
 * @returns {boolean} True if the string is valid, false otherwise.
 */
export const isValidName = (str: string): boolean => {
  const regex = /^[a-zA-Z0-9\s]*$/;
  // The regular expression matches any string that contains only Latin letters,
  // numbers, and spaces. The ^ and $ characters at the beginning and end of the
  // regular expression respectively ensure that the entire string matches the
  // pattern, not just a substring.
  return regex.test(str);
};
