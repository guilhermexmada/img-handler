class viewController{
    renderHome(req, res){
        res.render('pages/home',{
            title: 'Home', 
        })
    }
}   

export default new viewController