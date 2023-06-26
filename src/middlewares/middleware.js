exports.middlewareGlobal = (req, res, next) => {

    res.locals.umaVariavelLocal = 'este eh o valor da variavel local'

        next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.checkCsrfError = (error, req, res, next) => {
    if(error && error.code === 'EBADCSRFTOKEN'){
        return res.render('404')
    }
}