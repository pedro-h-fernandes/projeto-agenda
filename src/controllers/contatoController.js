const { async } = require('regenerator-runtime')
const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    })

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
            return res.redirect(`/contato/${contato.contato._id}`);
        });

    } catch (e) {
        // res.render('404')
        console.error(e)
    }
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404')
    const contato = await Contato.findById(req.params.id)
    if (!contato) return res.render('404')

    res.render('contato', { contato })
}

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                return res.redirect('/contato/');
            });
            return;
        }

        req.flash('success', 'Contato editado com sucesso')
        req.session.save(function () {
            return res.redirect(`/contato/${contato.contato._id}`);
        });

    } catch (e) {
        console.log(e)
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404')
    const contato = await Contato.delete(req.params.id)
    if (!contato) return res.render('404')
    req.flash('success', 'Contato apagado com sucesso')
    req.session.save(function () {
        return res.redirect(`/`);
    });
}