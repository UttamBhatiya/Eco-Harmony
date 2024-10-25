const connection = require('../Config/Connection');
const {setUser} = require('../Services/Auth');

const handleSignup = (req, res) => {
    const { first_name, last_name, password, description, company, mail_id, phone_no, role } = req.body;
    const query = 'INSERT INTO users (first_name, last_name, password, description, company, mail_id, phone_no, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    connection.query(query, [first_name, last_name, password, description, company, mail_id, phone_no, role], (err, result) => {
        if(err){
            console.log(err);
            
            return res.render('login',{error:'Invalid Username or Password!'})
        }
        const user = {};
        user.user_id = result.insertId;
        user.mail_id = mail_id;
        user.role = role;
        token = setUser(user);
        res.cookie('AccessToken',token)
        return res.redirect("https://uttambhatiya.github.io/EcoHaramony/EcoHarmony/EcoHarmony/home-4/index.html");
    });
}

const handleRenderSignup = (req, res) => {
    return res.render('signup');
}

const handleLogin = (req, res) => {
    const {mail_id, password} = req.body;
    const query = 'SELECT * FROM users WHERE mail_id = ? AND password = ?;';
    connection.query(query, [mail_id, password], (err, result) => {
        if(!result[0]){
            return res.render('login', {error: 'Invalid Username or Password!'})
        }
        token = setUser(result[0])
        res.cookie('AccessToken',token)
        return res.redirect("https://uttambhatiya.github.io/EcoHaramony/EcoHarmony/EcoHarmony/home-4/index.html");
    })
}

const handleRenderLoginForm = (req, res) => {
    return res.render('login');
}

const handleUpdateUser = (req, res) => {
    const { user_id, first_name, last_name, password, description, company, mail_id, phone_no, profile_photo, role } = req.body;
    const query = 'UPDATE users SET first_name = ?, last_name = ?, password = ?, description = ?, company = ?, mail_id = ?, phone_no = ?, profile_photo = ? WHERE user_id = ?;';
    connection.query(query, [first_name, last_name, password, description, company, mail_id, phone_no, profile_photo, user_id], (err, result) => {
        if(err){
            return res.render('login',{error:'Invalid Username or Password!'})
        }
        return res.redirect("/");
    });
}

const handleDeleteUser = (req, res) => {
    const {user_id} = req.body;
    const query = 'DELETE FROM users WHERE user_id = ?;';
    connection.query(query, [user_id], (err, result) => {
        if(err){
            return res.redirect('login');
        }
        res.cookie('AccessToken', '');
        return res.redirect('/');
    })
}


module.exports = {
    handleSignup,
    handleLogin,
    handleUpdateUser,
    handleDeleteUser,
    handleRenderLoginForm,
    handleRenderSignup
}