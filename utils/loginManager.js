const User = require('../models/Usuario.model');
const { verifyPassword } = require('./passwordManager');

const verifyLoginData = async (req, res) =>{
    const {email, senha} = req.body;
  
    if ( !email  || !senha ){
        const errors = {
            usernameError: !email ? "Campo Usuário obrigatorio" : undefined,
            passwordError: !senha ? "Campo password obrigatorio" : undefined,
        };
  
        res.render('public/login', errors);
  
        return false;
    }
  
    if (senha.length < 6){
        const errors = {
            passwordError: "sua senha deve ter no mínimo 6 digitos!",
        };
        res.render('public/login', errors);
        return false;
    }
  
    const userExists = await User.findOne({ email });
  
    if (!userExists) {
        res.render('public/login', {errorMessage: 'Usuário os senha incorretos. Tente novamente!'});
  
        return false;
    }
    const passwordOk = await verifyPassword(senha, userExists.senha);
  
    if (!passwordOk){
        res.render('public/login', {errorMessage: 'Usuário os senha incorretos. Tente novamente!'});
  
        return false;
    }
    
    return userExists;
  
  };

module.exports = verifyLoginData;