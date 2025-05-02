/*
* CJK Regex generated from http://apps.timwhitlock.info/js/regex
*/
const cjkRegex = /[⺀-\u2efe\u3000-〾\u3040-ゞ゠-ヾ㇀-\u31eeㇰ-ㇾ㈀-㋾㌀-㏾㐀-\u4dbe一-\u9ffe豈-\ufafe︰-﹎]|[\ud840-\ud868\ud86a-\ud86c][\udc00-\udfff]|\ud82c[\udc00-\udcfe]|\ud869[\udc00-\udede\udf00-\udfff]|\ud86d[\udc00-\udf3e\udf40-\udfff]|\ud86e[\udc00-\udc1e]|\ud87e[\udc00-\ude1e]/;


/*
 * check whether the value is a non-empty string.
 * @function
 * @param {string} val
 * @returns {boolean}
 */
function isValidString(val: unknown): val is string {
  return typeof val === 'string' && !!val.length;
}

/*
 * Normalize display name for both Chinese and English names.
 * @function
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
function displayName(firstName: unknown, lastName: unknown): string {
  const isFirstNameValid = isValidString(firstName);
  const isLastNameValid = isValidString(lastName);

  if (isFirstNameValid && isLastNameValid) {
    const endOfFirstNameIsCJK = cjkRegex.test(firstName[firstName.length - 1]);
    const beginOfLastNameIsCJK = cjkRegex.test(lastName[0]);
    if (endOfFirstNameIsCJK) {
      if (beginOfLastNameIsCJK) {
        return lastName + firstName;
      }
      return firstName + lastName;
    } else {
      if (beginOfLastNameIsCJK) {
        return lastName + firstName;
      }
      return firstName + ' ' + lastName;
    }
  }

  if (isFirstNameValid && !isLastNameValid) return firstName;
  if (!isFirstNameValid && isLastNameValid) return lastName;

  return '';
}
