import { isValidName } from '../isValidName';

describe('isValidName', () => {
  it('should return true for valid name', () => {
    expect(isValidName('John Doe')).toBe(true);
  });

  it('should return false for invalid name', () => {
    expect(isValidName('John@Doe')).toBe(false);
  });
});
