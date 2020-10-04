const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('public/index');
});

router.get('/dashboard', (req, res, next) => {
  res.render('private/perfil');
});

//Rodrigo - 03/10
router.get('/login',  (req, res) =>{

  const {sessionExpired} = req.query;
  //console.log(sessionExpired);

  res.render('public/login', {sessionExpired});

})

router.get('/signup', (req, res) =>{

  res.render('public/signup');
});

router.get('/confirmation',  (req, res) =>{

  const {sessionExpired} = req.query;
  //console.log(sessionExpired);

  res.render('private/confirmation', {codigoPedido: '000030'});

})

router.get('/cart',  (req, res) =>{

  const {sessionExpired} = req.query;
  //console.log(sessionExpired);

  res.render('private/cart', {codigoPedido: '000030'});

})


// const verifyData = async (req, res) => {

//   const {username, password} = req.body;

//   if (!username ||  !password ){
//       const errors = {
//           usernameError: !username ? "Campo nome de usuário obrigatorio" : undefined,
//           passwordError: !password ? "Campo password obrigatorio" : undefined,
//       };

//       res.render('auth-views/signup', errors);

//       return false;
//   }
//   if (password.length < 6){
//       const errors = {
//           passwordError: "sua senha deve ter no mínimo 6 digitos!",
//       };
//       res.render('auth-views/signup', errors);
//       return false;
//   }

//   // const userCpfExists = await User.find({ cpf });
//   // const userEmailExists = await User.find({ email });
//   // if (userEmailExists.length > 0 || userCpfExists.length > 0) {
//   //     const errors = {
//   //       emailError: userEmailExists.length > 0 ? 'Email já cadastrado' : undefined,
//   //       cpfError: userCpfExists.length > 0 ? 'CPF já cadastrado' : undefined,
//   //     };
  
//   //     res.render('auth-views/signup', errors);
//   //   }      
  
//   const userExists = await User.find({username});
  
//   //console.log(userExists);
  
//   if (userExists.length > 0){
//       res.render('auth-views/signup', {errorMessage: "Nome de usuário já cadastrado."});
//       return false;
//   }

//   return true;
// };

//Fim Rodrigo

module.exports = router;


