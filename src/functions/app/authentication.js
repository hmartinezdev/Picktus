const admin = require('firebase-admin');

async function authenticate(req, res) {
  const sessionCookie = req.cookies.session || '';
  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.

  try {
    const result = await admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */);
    return result;
  } catch (e) {
    return undefined;
  }
}

module.exports = authenticate;
