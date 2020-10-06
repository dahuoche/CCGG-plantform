import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    // console.log(req.url);
    const noAuthUrls = ['/auth/login', '/auth/regist', '/logout'];
    if (noAuthUrls.includes(req.url)) {
        // console.log("ok");
    }
    else {
        if (req.headers.cookie == null) {
            return res.status(401).json({message: "Not valid Token"});
        }
        const token = req.headers.cookie.substring(6);
        // console.log(token);
        jwt.verify(token, 'ccgg', (err, res) => {
            if (err) {
                // console.log(token + " is Error");
                return res.status(401).json({message: "Not valid Token"});
            }
        });
    }
    next();
}
