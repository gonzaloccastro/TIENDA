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
const contenedorCarritoCompras = document.querySelector("#items");
const contenedorFooterCarrito = document.querySelector("#footer");

/**
 * EJECUSIÓN DE FUNCIONES
 */

 dibujarCatalogoProductos();
 dibujarCarrito();
 chequeoEdad();

/**
 * DEFINICIÓN DE FUNCIONES
 */

// Ternario aplicado

function chequeoEdad(){
    let cartelEdad = confirm("Sos mayor de edad?");
    cartelEdad ? alert("Perfecto, podes entrar.") : alert("Esta web es sólo para personas de 18 años.");
};

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

// FUNCIÓN DIBUJAR CARTA DE PRODUCTOS

function crearCard(producto) {
    
    // Desestructuracion
    const [{nombre, precio}] = productos;

    //BOTON
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-secondary";
    botonAgregar.innerText = "Agregar";

    //CARD BODY
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${nombre}</h5>
        <p>$ ${estandarDolaresAmericanos.format(precio)}</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //IMAGEN
    let imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "card-img-top";
    imagen.alt = nombre;

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
            'Sumado!',
            ('Agregaste el producto: \n' + nombre),
            'success'
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

// FUNCIÓN DIBUJAR LA TIENDA

function dibujarCatalogoProductos() {
    rowContenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            rowContenedorProductos.append(contenedorCarta);
        }
    );
};