const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato.ejs')
}


exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                return res.redirect('/contato/');
            });
            return;
        }

        req.flash('success', 'Contato criado com sucesso')
        req.session.save(function () {
            return res.redirect('/contato/');
        });

    } catch (e) {
        // res.render('404')
        console.error(e)
    }
}