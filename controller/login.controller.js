const config = require("../config");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const authentication = (req, res) => {
  const randomUUID = uuidv4();
  const firstState = `state${randomUUID}`;
  const query = {
    scope: "openid profile",
    response_type: "code",
    client_id: config.CLIENT_ID,
    redirect_uri: `${config.FS_URL}${config.LOGIN_CALLBACK}`,
    state: firstState,
    nonce: `nonce${randomUUID}`,
  };

  const authorizeURL = config.FC_URL + config.AUTHORIZE_URL;
  const queryParams = new URLSearchParams(query).toString();
  const redirectURL = `${authorizeURL}?${queryParams}`;
  return res.redirect(redirectURL);
};

const loginCallback = async (req, res) => {
  const authCode = req.query.code;
  const body = {
    grant_type: "authorization_code",
    redirect_uri: `${config.FS_URL}${config.LOGIN_CALLBACK}`,
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    code: authCode,
  };
  const response = await axios({
    method: "POST",
    data: body,
    url: `${config.FC_URL}${config.TOKEN_URL}`,
  });
  const data = await response.data;
  req.session.tokens = data;
  return res.redirect('/user');
};

const getUserInfos = async (req, res) => {
  const token = req.session.tokens.access_token;
  if (token) {
    const userInfosResponse = await axios({
      method: "GET",
      url: `${config.FC_URL}${config.USERINFO_URL}?schema=openid`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    req.session.user = userInfosResponse.data;
    const user = userInfosResponse.data;
    res.render('userInfos', { user });
  }

}

module.exports = { authentication, loginCallback, getUserInfos };
