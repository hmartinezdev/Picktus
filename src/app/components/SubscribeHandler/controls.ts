/**
 * Detect if string is a valid email address
 *
 * @param  {string} mail
 * @returns boolean
 */
export const isMail = (mail: string): boolean => {
  const mailRegex = new RegExp( // tslint:disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return !!mail.match(mailRegex);
};
/**
 * Detect if the string is a strong enough password
 *
 * @param  {string} password
 * @returns boolean
 */
export const isPasswordSecure = (password: string): boolean => {
  const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

  return !!password.match(passwordRegex);
};
