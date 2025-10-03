module.exports = function (app) {

  var Usuario = app.models.usuario;

  var ContatoController = {

    index: function (req, res) {
      res.render('contatos/index');
    },

    
  async create(req, res) {
    try {
      const { nome, email } = req.body.contato;
      if (!nome || !email) {
        return res.status(400).send('Nome e email são obrigatórios');
      }
      const usuario = new Usuario({ nome, email });
      await usuario.save();
      res.redirect('/contatos');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao criar usuário');
    }
  },

    show: function (req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        var resultado = { contato: contato };
        res.render('contatos/show', resultado);
      });
    },

    edit: function (req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        var resultado = { contato: contato };
        res.render('contatos/edit', resultado);
      });
    },

    update: function (req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        contato.nome = req.body.contato.nome;
        contato.email = req.body.contato.email;
        usuario.save(function () {
          res.redirect('/contatos');
        });
      });
    },

    destroy: function (req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatoID = req.params.id;
        usuario.contatos.id(contatoID).remove();
        usuario.save(function () {
          res.redirect('/contatos');
        });
      });
    }
  }
  return ContatoController;
};