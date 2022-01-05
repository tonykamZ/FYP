/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).json("User not found");

        if (user.password != req.body.password)
            return res.status(401).json("Wrong Password");

        //var match = await sails.bcrypt.compare(req.body.password, user.password);

        //if (!match) return res.status(401).json("Wrong Password");

        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username;
            req.session.name = user.name;
            req.session.address = user.address;
            req.session.email = user.email;
            req.session.role = user.role;
            req.session.userid = user.id;
            req.session.value = user.value;
            return res.json(user);
            // return res.redirect('/');
        }

        // Start a new session for the new login user
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.name = user.name;
            req.session.address = user.address;
            req.session.email = user.email;
            req.session.role = user.role;
            req.session.userid = user.id;
            req.session.value = user.value;
            return res.json(user);
            // return res.redirect('/');
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.ok();
        });
    },

    signUp: async function (req, res) {

        if (req.method == "GET") return res.view('user/signUp');

        var user = await User.findOne({ username: req.body.username });

        if (!user) {
            if (req.body.password == req.body.confirmedPassword) {
                await User.create(req.body).fetch();
                return res.status(300).json("Successfully signed up");
            } else {
                return res.status(401).json("Password not match")
            }
        } else if (user) {
            return res.status(401).json("Username has been used")
        }
    },

    json: async function (req, res) {

        var everyuser = await User.find();

        return res.json(everyuser);
    },

    account: async function (req, res) {
        if (req.method == "GET") {

            var thatUser = await User.findOne(req.params.id);

            if (!thatUser) return res.notFound();

            return res.view('user/account', { user: thatUser });
        }
    },

    wallet: async function (req, res) {
        if (req.method == "GET") {

            var thatUser = await User.findOne(req.params.id);

            if (!thatUser) return res.notFound();

            return res.view('user/wallet', { user: thatUser });
        }
    }
};
