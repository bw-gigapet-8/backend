const jwt = require('jsonwebtoken')
const secret = require('../secrets/secret')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        next()
    } else {
        res.status(400).json({ message: "No token"})
    }
}
//     if(token) {
//         jwt.verify(token, secret.jwtSecret, (err, decodeToken) => {
//             console.log(token, secret.jwtSecret)
//             if(err) {
//                 res.status(400).json({message:'cant pass'})
//             } else {
//                 req.user= {username:decodeToken.username}
//                 next()
//             }
//         })
//     } else {
//         res.status(400).json({message:'no token'})
//     }
// }