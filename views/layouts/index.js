
const socket = io();
// let asd = document.getElementById("asd")
// const btn = document.getElementById('boton');

// btn.addEventListener('click', (e) => {
//    return  e.preventDefault();
// });

// socket.on("mensaje", (x) => {
//   console.log(x);
//   socket.emit("notificacion", "mensaje devuelto desde un callback en cliente");
// });

socket.on("aTodos", (x) => {
    console.log(x)
//   asd.innerHTML = (x)
  // productsContainer.innerHTML = JSON.parse(x[1].tittle)
})
