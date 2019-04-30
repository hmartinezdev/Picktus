import * as control from './controls';

describe('controls', () => {
  describe('isMail', () => {
    it('should return true if the adress is a correct email address', () => {
      expect(control.isMail('test@test.com')).toBe(true);
      expect(control.isMail('e@e.co')).toBe(true);
      expect(control.isMail('ok@1234.fr')).toBe(true);
    });

    it('should return false if the adress is not a correct email address', () => {
      expect(control.isMail('test')).toBe(false);
      expect(control.isMail('test@tezfez')).toBe(false);
      expect(control.isMail('@test.ok')).toBe(false);
      expect(control.isMail('@test')).toBe(false);
      expect(control.isMail('test@')).toBe(false);
    });
  });

  describe('isPassword', () => {
    it('should return true if the parameter is minimum eight characters,  at least one letter, one number and one special character', () => {
      expect(control.isPasswordSecure('Eightcha123!')).toBe(true);
      expect(control.isPasswordSecure('Thispasswordh8me!')).toBe(true);
    });

    it('should return false does not respect the condition to be a valid password', () => {
      expect(control.isPasswordSecure('not8!')).toBe(false);
      expect(control.isPasswordSecure('eightwithouthanything')).toBe(false);
      expect(control.isPasswordSecure('eightwitha8')).toBe(false);
    });
  });
});
