let express = require('express');
let app = express();
var bodyParser = require("body-parser")

// middleware dirname
app.use("/public", express.static(__dirname + "/public"));

// si quisiera usar el middleware solo para POST por ejemplo sería:
// app.post (function middleware(req,res,next))
app.use(function middleware(req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string)
    next();
});

// Ejercicio 1: responder hello express a get directorio raiz
//app.get("/", (req,res) => {
//  res.send("Hello Express")
//} )

// Ejercicio 2: enviar archivo
const absolutePath = __dirname + "/views/index.html";
const absolutePath2 = __dirname + "/views/index2.html";
// fin ej 2

const mySecret = process.env['MESSAGE_STYLE'];

app.get("/", (req, res) => {
    res.sendFile(absolutePath)
})

// ejercicio servir archivo json
//app.get("/json" , (req,res)=>{
//  res.json({"message": "Hello json"})
//})

// servir HELLO JSON uppercase chequeando .env
app.get("/json", (req, res) => {
    let respuesta;
    if (process.env['MESSAGE_STYLE'] === "uppercase") {
        respuesta = "Hello json".toUpperCase();
    } else {
        respuesta = "Hello json";
    }
    res.json({
        "message": `${respuesta}`
    });
});


// EJERCICIO SERVIDOR HORARIO
// TAMBIÉN PODEMOS CREAR LA FUNCION MIDDLEWARE ANTES Y USARLA EN EL ENDPOINT

//const middleware = (req, res, next) => {
//  req.time = new Date().toString();
//  next();
//};

//app.get("/now", middleware, (req, res) => {
//  res.send({
//    time: req.time
//  });
//});

// tambien se puede hacer sin middleware: 
//let hora = new Date().toString();
//app.get("/now", (req, res, next) => {
//    res.json({time:hora})
//    next();
//  });


app.get("/now", (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.send({
            time: req.time
        });
    }
);

// tomando los valores de los parametros de ruta
app.get("/:word/echo", (req, res) => {
    let word = req.params.word;
    res.json({
        echo: word
    })
})

// tomando los parametros de busqueda de la url
app.get("/name", (req, res) => {
    let name = req.query
    let first = name.first
    let last = name.last
    let nametoshow = first + " " + last
    res.json({
        name: nametoshow
    })
})

// middleware bodyparser: Usa body-parser para analizar las peticiones POST
//The data received in the request is available in the req.body object.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// obteniendo datos del post
app.post("/name", (req, res) => {
    let nameform = req.body
    let firstname = nameform.first
    let lastname = nameform.last
    let namepost = firstname + " " + lastname
    res.json({
        name: namepost
    })

})























module.exports = app;



































module.exports = app;