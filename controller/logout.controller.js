const { v4: uuidv4 } = require("uuid");
const config = require("../config");

const logout = (req, res) => {
  const randomUUID = uuidv4();
  const tokenHint = req.session.tokens.id_token;
  const query = {
    id_token_hint: tokenHint,
    state: `state${randomUUID}`,
    post_logout_redirect_uri: `${config.FS_URL}${config.LOGOUT_CALLBACK}`,
  };
  const logoutURL = config.FC_URL + config.LOGOUT_URL;
  const queryParams = new URLSearchParams(query).toString();
  const redirectURL = `${logoutURL}?${queryParams}`;
  console.log('LOGOUT ==========', redirectURL);
  return res.redirect(redirectURL);

};

const localLogout = (req, res) => {
    console.log('LOCAL LOGOUT =============');
    req.session.destroy();
    return res.redirect('/');
};

module.exports = { logout, localLogout };
