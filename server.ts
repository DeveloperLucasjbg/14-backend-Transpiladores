import * as express from 'express';
import * as metodos from './metodos';
import * as handlebars from "express-handlebars"
import * as urlencoded from "express"

const app = express();
const PORT = 4545;
const router = express.Router();     

const http = require("http").Server(app); 
const io = require("socket.io")(http); 

app.use(express.static("public"));


app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api", router);

let productos = [
  {
    id: 0,
    tittle: "alfajor",
    price: 421.5,
    thumbail:
      "https://i0.wp.com/imagenesparapeques.com/wp-content/uploads/2021/01/violet-among-us.png?resize=962%2C2048&ssl=1",
  },
  {
    id: 1,
    tittle: "alfajor",
    price: 421.5,
    thumbail:
      "https://i.pinimg.com/originals/11/a3/4c/11a34c533354c89ef71c37e4f05ab44f.png",
  },
  {
    id: 2,
    tittle: "Sigarro",
    price: 421.5,
    thumbail:
      "data:image/png;base64,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",
  },
];

router.get("/productos/listar", (_, res) => {
  res.json(new metodos(null, null, productos).listar());
});

router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  res.json(new metodos(id, null, productos).listarPorId());
});
router.post("/productos/guardar", (req, res) => {
  res.json(new metodos(null, req.body, productos).guardar());
});

router.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  res.json(new metodos(id, req.body, productos).actualizar());
});
router.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;
  res.json((productos = new metodos(id, req.body, productos).borrar()));
});

http.listen(PORT, () => {
  console.log("escuchando el servidor", http.address().port);
});
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("main", "/views");
app.set("view engine", "hbs");

router.get("/productos/vista", (_, res) => {
  res.render("main", {
    datos: new metodos(null, null, productos).listar(),
  });
});

// let prodRender = JSON.stringify(productos)
io.on("connection", (socket:JSON) => {
    io.sockets.emit("aTodos","asd")
  //from Xlient to server
  // socket.on("notificacion", (newProd) =>{
  //      console.log(newProd)
  //      io.sockets.emit('aTodos',prodRender)
  //   });
});

