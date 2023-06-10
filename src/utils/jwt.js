const jwt = require('jsonwebtoken');
const Secret_Key = process.env.Secret_Key;

const sign = (payload) => {
    const token = jwt.sign(payload, Secret_Key, {expiresIn: "1h"});
    return token;
};

const verify = (token) => {
    const result = jwt.verify(token, Secret_Key);
    return result;
};


module.exports = {
    sign,
    verify
}
