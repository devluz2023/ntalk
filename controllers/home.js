module.exports = function (app) {

  var Usuario = app.models.usuario;

  var HomeController = {

    index: function (req, res) {
      res.render('home/index');
    },


    login: function (req, res) {
      try {
        const email = req.body.usuario.email;
        const query = { email };
        const usuario = Usuario.findOne(query).select('nome email');

        if (usuario.id) {

          req.session.usuario = {
            _id: usuario._id,
            nome: usuario.nome,
            email: usuario.email
          };
          res.redirect('/contatos');
        } else {

          const novoUsuario = new Usuario(req.body.usuario);
          novoUsuario.save();


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