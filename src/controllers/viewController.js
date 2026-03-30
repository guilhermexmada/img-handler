// controlador para exibir as views corretas, enviando o conteúdo junto
class viewController{
    renderHome(req, res){
        res.render('pages/home',{
            title: 'Home', // título na aba da página
        })
    }
}   

export default new viewController