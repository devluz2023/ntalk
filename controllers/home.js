
module.exports = function (app) {

  var Usuario = app.models.usuario;

  var HomeController = {

    index: function (req, res) {
      res.render('home/index');
    },


    login:  async function (req, res) {
      try {
        const email = req.body.usuario.email;
        const query = { email };
        const usuario =  await Usuario.findOne(query).select('id nome email').exec();;
       
        if (usuario) {

          req.session.usuario = {
            _id: usuario._id,
            nome: usuario.nome,
            email: usuario.email
          };
          await res.redirect('/contatos');
        } else {

          const novoUsuario = new Usuario(req.body.usuario);
          await novoUsuario.save();


          req.session.usuario = {
            _id: novoUsuario._id,
            nome: novoUsuario.nome,
            email: novoUsuario.email
          };
          res.redirect('/contatos');

        }
      } catch (erro) {
        console.error('Erro no login:', erro);
        res.redirect('/');
      }
    }

    ,

    logout: function (req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  };

  return HomeController;

};