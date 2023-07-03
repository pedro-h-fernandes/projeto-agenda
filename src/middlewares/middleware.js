exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors') 
    res.locals.success = req.flash('success') 
    res.locals.user = req.session.user;
     next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.checkCsrfError = (error, req, res, next) => {
    if(error){
        return res.render('404')
    }
    next();
}