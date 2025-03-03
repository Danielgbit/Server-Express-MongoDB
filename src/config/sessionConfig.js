const session = require('express-session');

const sessionConfig = session({
    secret: "mi_secreto_super_seguro",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 DIAS
      secure: false,
      httpOnly: false,
    },
})

module.exports = sessionConfig