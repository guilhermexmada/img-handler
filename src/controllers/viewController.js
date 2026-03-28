// controlador para exibir as views corretas, enviando o conteúdo junto
class viewController{
    renderHome(req, res){
        res.render('pages/home',{
            title: 'Home', // título na aba da página
            body: '<h1> Bem-vindo à homepage </h1>' // conteúdo da página (dentro de <main></main>)
        })
    }
}   

export default new viewController