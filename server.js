require('dotenv').config()

const express = require('express');
const app = express(); // inicia o express

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
   
    useUnifiedTopology: true
})
    .then(() => {
        app.emit('pronto') // vai emitir um sinal de pronto
    })
    .catch(e => console.log(e)) // aqui pode emitir aluma coisa na tela pro cliente

const session = require('express-session'); // identificar o navegadoir de um cliente e salvar um cookie
const MongoStore = require('connect-mongo'); // sessões serão salvas no BD
const flashMessages = require('connect-flash') // mensagens rapidas perfeitas para feedbacks para o usuario
const routes = require('./routes') // rotas da aplicação
const path = require('path')
const helmet = require('helmet') // segurança (ler documentação)
const csurf = require('csurf') // cria tokens para os formulários 
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware') // midllewares são funções executadas nas rotas

app.use(helmet());
app.use(express.urlencoded({ extended: true })); // vai tratar o body das requisições
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))) // define a pasta de conteudo estático

const sessionOptions = session({
    secret: 'jkasd78i9atyda8da9o8ehfo42fh294fh%Y',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }
})
app.use(sessionOptions);
app.use(flashMessages())


app.set('views', path.resolve(__dirname, 'src', 'views')); //seta a pasta das views
app.set('view engine', 'ejs'); //seta a engine (poderia ser react por exemplo)

app.use(csurf())

//nossos middlewares
app.use(middlewareGlobal); // com isso todas as reqs de todas as rotas vão passar por esse middleware
app.use(checkCsrfError); // confere se existe um erro de csrf 
app.use(csrfMiddleware); // cria um token csrf

app.use(routes) // chama sas rotas

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log('servidor executando na porta 3000')
    });
}) // o servidor estará rodando na porta 3000, assim que o sistema estabalecer conecção com o banco

