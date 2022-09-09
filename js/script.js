/*
* CONSTANTES
*/

const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

/*
* DEFINICIÓN DE CLASES
*/

class articulo{
    constructor(nombre, categoria, autor, precio, disponibilidad, stock, imagen, codigo){
        this.nombre=nombre
        this.categoria=categoria
        this.autor=autor
        this.precio=precio
        this.disponibilidad=disponibilidad
        this.stock=stock
        this.imagen=imagen
        this.codigo=codigo
    };
};

class ElementosCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    };
};

/**
 * DEFINICIÓN DE ARRAYS
*/

let elementosCarrito = JSON.parse(localStorage.getItem("elementosCarrito")) || [];
const contenedorProductos = document.getElementById('contenedor-productos').getElementsByClassName('row');
const rowContenedorProductos = contenedorProductos [0];
let productosJSON = [];
const contenedorCarritoCompras = document.querySelector("#items");
const contenedorFooterCarrito = document.querySelector("#footer");
const botonTerminarCompra = document.querySelector("#botonCompra");
let dolarVenta;

/**
 * DEFINICIÓN DE FUNCIONES
 */

// FUNCIÓN REMOVER PRODUCTO DEL CARRITO

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter(
        (elemento) => elemento.producto.codigo != elementoAEliminar.producto.codigo
    );

    elementosCarrito.length = 0;
    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
};

// FUNCIÓN GUARDAR AL LOCAL STORAGE

function guardarALocalStorage(){
    localStorage.setItem("elementosCarrito", JSON.stringify(elementosCarrito));
};

// FUNCIÓN DIBUJAR CARRITO

function dibujarCarrito () {
    contenedorCarritoCompras.innerHTML = "";
    let sumaCarrito = 0 ;

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito = document.createElement("tr");

            renglonesCarrito.innerHTML = `
                    <td>${elemento.producto.codigo}</td>
                    <td>${elemento.producto.nombre}</td>
                    <td><input id="cantidad-producto-${elemento.producto.codigo}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                    <td>$ ${estandarDolaresAmericanos.format(elemento.producto.precio)}</td>
                    <td>$ ${estandarDolaresAmericanos.format(elemento.producto.precio*elemento.cantidad)}</td>
                    <td><button id="eliminar-producto-${elemento.producto.codigo}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></td>
                `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.producto.precio*elemento.cantidad;

            let inputCantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.codigo}`);

            inputCantidadProductos.addEventListener("change", (e) => {
               let nuevaCantidad = e.target.value;
               elemento.cantidad = nuevaCantidad;

               dibujarCarrito();
            });

            let botonBorrarProducto = document.getElementById(`eliminar-producto-${elemento.producto.codigo}`);

            botonBorrarProducto.addEventListener('click', () => {
                removerProductoCarrito(elemento);
                guardarALocalStorage();
                dibujarCarrito();
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Eliminaste el producto \n\n ${elemento.producto.nombre}`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            });
        }
    );
    
    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
        <th scope="row" colspan="5"> Carrito vacío!</th>
        `;
    } else {
        contenedorFooterCarrito.innerHTML = `
        <th scope="row" colspan="5"> Total de la compra: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>
        `;
    };
    console.log(elementosCarrito);
};

function terminarCompra (){
    botonTerminarCompra.addEventListener('click', () => {
        if(elementosCarrito.length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El carrito está vacío, no hay nada que comprar!',
            });
            } else {
            datosFormulario();
            function datosFormulario(){
                Swal.fire({
                    title: 'Conectate con tu usuario',
                    html: ` <input type="text" id="login" class="swal2-input" placeholder="Usuario">
                            <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
                    confirmButtonText: 'Conectar',
                    focusConfirm: false,
                    preConfirm: () => {
                      const login = Swal.getPopup().querySelector('#login').value
                      const password = Swal.getPopup().querySelector('#password').value
                      if (!login || !password) {
                        Swal.showValidationMessage(`Por favor ingresa usuario y contraseña`)
                      }
                      return { login: login, password: password };
                    }
                }).then((result) => {
                    Swal.fire(`
                        Usuario: ${result.value.login}
                        Contraseña: ${result.value.password}
                    `.trim());
                });
            };
        };
    });
};

// FUNCIÓN DIBUJAR LA TIENDA
function dibujarCatalogoProductos() {
    rowContenedorProductos.innerHTML = "";
    console.log(productosJSON)
    productosJSON.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            rowContenedorProductos.append(contenedorCarta);
        }
    );
};

// FUNCIÓN DIBUJAR CARTA DE PRODUCTOS

function crearCard(producto) {
    
    //BOTON
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-secondary";
    botonAgregar.innerText = "Agregar";

    //CARD BODY
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>Precio $ ${estandarDolaresAmericanos.format(producto.precio)}</p>
        <p>Precio U$ ${(producto.precio/dolarVenta).toFixed(1)}</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //IMAGEN
    let imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //CARD
    let carta = document.createElement("div");
    carta.className = "card";
    carta.style = "align-item: center";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    //CONTENEDOR CARD
    let contenedorCarta = document.createElement("div");
    contenedorCarta.className = "col-xs-6 col-sm-4 col-md-4";
    contenedorCarta.append(carta);

    //BOTON CON EVENTO
    botonAgregar.onclick = () => {
        Swal.fire(
            ({
            position: 'center',
            icon: 'success',
            title: 'Agregaste el producto: \n\n' + producto.nombre,
            showConfirmButton: false,
            timer: 1500
            })
        );

        let elementoExistente = elementosCarrito.find((elemento)=>elemento.producto.codigo == producto.codigo)


        if(elementoExistente) {elementoExistente.cantidad+=1
        } else {
            let elementoCarrito = new ElementosCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }
        guardarALocalStorage();
        dibujarCarrito();
    };
    return contenedorCarta;
};


// FUNCIÓN OBTENER VALOR DOLAR
async function obtenerValorDolar() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const resp=await fetch(URLDOLAR)
    const data=await resp.json()
    document.getElementById("barraDolar").innerHTML+=(`<p align="center">Dolar compra: $ ${data.compra}  Dolar venta: $ ${data.venta}</p>`);
    dolarVenta = data.venta;
    obtenerJSON();
};

// FUNCIÓN GETJSON de productos.json
async function obtenerJSON() {
    const URLJSON="json/productos.json"
    const resp=await fetch(URLJSON)
    const data= await resp.json()
    productosJSON = data;
    dibujarCatalogoProductos();
};

/**
 * EJECUSIÓN DE FUNCIONES
 */
 obtenerValorDolar();
 dibujarCarrito();
 terminarCompra();
