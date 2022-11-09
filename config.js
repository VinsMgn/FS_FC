const config = {
    FS_URL: 'http://localhost:3000',
    FC_URL: 'https://fcp.integ01.dev-franceconnect.fr',
    AUTHORIZE_URL: '/api/v1/authorize',
    TOKEN_URL: '/api/v1/token',
    USERINFO_URL: '/api/v1/userinfo',
    LOGOUT_URL: '/api/v1/logout',
    LOGIN_CALLBACK: '/login-callback',
    LOGOUT_CALLBACK: '/logout-callback',
    DATA_CALLBACK: '/data-callback',
    CLIENT_ID: '211286433e39cce01db448d80181bdfd005554b19cd51b3fe7943f6b3b86ab6e',
    CLIENT_SECRET: '2791a731e6a59f56b6b4dd0d08c9b1f593b5f3658b9fd731cb24248e2669af4b',
    SCOPES: [
        'identite_pivot',
        'openid'
    ]
}

module.exports = config;