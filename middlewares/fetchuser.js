var jwt = require("jsonwebtoken");
require('dotenv').config();
// const JWT_SECRET = "thisIsJustAHackathon";

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token)
    {
        res.status(401).send({error: "Faulty Authentication"});
    }

    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user
        next()
    }   catch (error)   {
        res.status(401).send({error: "Faulty Authentication"})
    }
};

module.exports = fetchUser;