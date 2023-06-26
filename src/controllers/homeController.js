
exports.paginaInicial = (req, res) => { // temos uma rota para tratar as requisições que chegarem na home, na /
    
    res.render('index', {
        titulo: 'Este será o titulo da pagina',
        numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });
    return;
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return;
}