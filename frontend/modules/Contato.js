import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })

    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name=email]');
        const telefoneInput = el.querySelector('input[name=telefone]');
        let error = false;

        if (emailInput.value.length <= 0 && telefoneInput.value.length <= 0) {
            alert('Preencha ao menos o telefone ou o email');
        }else if (!validator.isEmail(emailInput.value)) {
            alert('Email Inválido');
            error = true;
        }else if (!validator.isMobilePhone(telefoneInput.value)) {
            alert('Número de telefone inválido');
            error = true;
        }

        if (!error) el.submit;
    }
}