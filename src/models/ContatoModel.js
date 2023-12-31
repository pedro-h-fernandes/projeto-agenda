const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true, default: '' },
    sobrenome: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = []
        this.contato = null;
    }

    validaCampos() {
        this.cleanUp();

        if (!this.body.nome) this.errors.push('Nome é um campo obrigatório')
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email Inválido')

        if (this.body.telefone && !validator.isMobilePhone(this.body.telefone)) this.errors.push('Telefone inválido')

        if (!this.body.email && !this.body.telefone) this.errors.push('Email ou Telefone precisam ser enviados para registrar o contato')

    }

    async register() {
        this.validaCampos()
        if (this.errors.length > 0) return
        await this.contactExists()
        if (this.errors.length > 0) return

        this.contato = await ContatoModel.create(this.body)
    }

    async edit(id) {
        if (typeof (id) !== 'string') return
        this.validaCampos()
        if (this.errors.length > 0) return

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
    }

    async contactExists() {
        this.contato = await ContatoModel.findOne({ email: this.body.email, telefone: this.body.telefone })
        if (this.contato) this.errors.push('Este contato já existe')
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') { 
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            telefone: this.body.telefone,
            email: this.body.email
        }
    }

    static async findById(id) {
        if (typeof (id) !== 'string') return
        const contato = await ContatoModel.findById(id)
        return contato
    }
    
    static async buscaContato() {
        const contatos = await ContatoModel.find().sort({criadoEm: -1})
        return contatos
    }
    
    static async delete(id) {
        if (typeof (id) !== 'string') return;
        const contatoApagado = await ContatoModel.findByIdAndDelete(id);
        return contatoApagado;
    }
}

module.exports = Contato