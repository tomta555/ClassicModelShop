requirejs.config({
    baseUrl: './js',
    paths: {
        bcrypt : "bcrypt.js"
    }
});

require(['login.js'])
require(['register.js'])

require(['cookie.js'])
