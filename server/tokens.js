const { sign } = require('jsonwebtoken')
const pool = require('./db')

function createAccessToken(userId) {
    // { userId } is the payload object - info to be transmitted inside the JWT
    // secret key ensures only this server can generate and verify access tokens
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    })
}

async function createRefreshToken(userId) {
    const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })

    // store refresh token in database
    const query = "UPDATE users SET refresh_token=$1 WHERE id=$2"
    const values = [refreshToken, userId]

    try {
        await pool.query(query, values)
        return refreshToken
    } catch (error) {
        throw new Error('Error storing refresh token: ' + error.message)
    }
}

// stores access token as a local variable in the response
// don't send the response
function sendAccessToken(res, accessToken) {
    res.locals.accessToken = accessToken
}

// sends token as a cookie to the browser, attaching cookie to HTTP response
// if user sends a request to /refresh_token endpoint, cookie will be sent with it
function sendRefreshToken(res, refreshToken) {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/refresh_token'
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}