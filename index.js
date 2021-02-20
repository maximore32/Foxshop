const express = require("express");
const fetch = require('node-fetch');
const nunjucks = require('nunjucks');

var app = express();
app.use(express.static('public'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {    
    fetch(`https://raw.githubusercontent.com/maximore32/JSON/master/Productos/productos.json`)
    .then(response => response.json())
    .then(productosjson => {
        const prod= productosjson
        res.render('home.html',{nombres:prod})        
        
    }) 
});
app.get('/producto/:id', function(req, res){
    fetch(`https://raw.githubusercontent.com/maximore32/JSON/master/Productos/productos.json`)
    .then(response => response.json())
    .then(datos => {
        var identificador=[]
        for(dato of datos){
            identificador.push(dato.id)
        }
        var max = identificador.indexOf(req.params.id)         
        res.render('productos.html',{prod:datos[max]})
    })
})
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/resultado", (req, res) => {    
    console.log(req.body)
	if(req.body.busqueda.toLowerCase() ==="monitor"){
		res.render('encontrado.html');
	}
	else{
		res.send("NO encontrado!");
	}
});




app.listen(8080);