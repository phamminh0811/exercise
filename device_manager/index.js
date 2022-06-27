const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const passport = require('passport');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));

const session = require('express-session');
app.use(session({
    secret: 'something',
    cookie: {
        maxAge: 1000 * 50 * 5
    }
}));
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('login'));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/action_logs', (req, res) => res.render('action_logs'))

app.route('/')
    .get((req, res) => res.render('login'));
    
app.route('/')
    .post( 
        passport.authenticate('local', { 
            failureRedirect: '/',  
            successRedirect: '/dashboard'
        })
    );


app.get('/secret', (req, res) => {
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi
        res.send('Đã đăng nhập');
    } else {
        res.redirect('/');
    }
})

const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(
    (username, password, done) => { 
        if (username == 'john') {
            if (password == 1234) { 
                return done(null, username); 
            } else {
                return done(null, false); 
            }
        } else {
            return done(null, false);
        }
    }
))

passport.serializeUser((username, done) => {
    done(null, username);
})

passport.deserializeUser((name, done) => {
    if (name == 'john') { 
        return done(null, name)
    } else {
        return done(null, false)
    }
})

const port = 9999;
app.listen(port, () => console.log('Server running on ' + port)); 