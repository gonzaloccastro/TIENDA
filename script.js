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
    habilitar(){
        let error="artículo disponible"
        if(this.disponibilidad==false){
            this.disponibilidad=true
        }else{
            console.log(error)
        }
    };
    deshabilitar(){
        let error="artículo no disponible"
        if(this.disponibilidad==true){
            this.disponibilidad=false
        }else{
            console.log(error)
        }
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

const tienda = [];
const elementosCarrito = [];
const contenedorProductos = document.getElementById('contenedor-productos').getElementsByClassName('row');
const rowContenedorProductos = contenedorProductos [0];
const contenedorCarritoCompras = document.querySelector("#items");
const contenedorFooterCarrito = document.querySelector("#footer");

/**
 * EJECUSIÓN DE FUNCIONES
 */

 cargarProductos();
 dibujarCatalogoProductos();
 dibujarCarrito();
 

/**
 * DEFINICIÓN DE FUNCIONES
 */

function cargarProductos(){
    tienda.push(new articulo('Remera con Logo', 'ROPA', 'ARBOL', 2500, true, 10, '/media/tienda/remera.jpg', 1));
    tienda.push(new articulo('Gorra con Logo', 'ROPA', 'ARBOL', 2000, true, 5, '/media/tienda/gorra.jpg', 2));
    tienda.push(new articulo('Taza con Logo', 'ITEMS', 'ARBOL', 1000, true, 3, '/media/tienda/taza.jpg', 3));
    tienda.push(new articulo('Buzo con Logo', 'ROPA', 'ARBOL', 2000, true, 8, '/media/tienda/buzo.jpg', 4));
    tienda.push(new articulo('Cuaderno con Logo', 'ITEMS', 'ARBOL', 1000, true, 12, '/media/tienda/cuaderno.jpg', 5));
    tienda.push(new articulo('Totebag con Logo', 'ITEMS', 'ARBOL', 3000, true, 12, '/media/tienda/totebag.jpg', 5));
    
};

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter(
        (elemento) => elemento.producto.codigo != elementoAEliminar.producto.codigo
    );

    elementosCarrito.length = 0;
    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
};

function dibujarCarrito () {
    contenedorCarritoCompras.innerHTML = "";

    let sumaCarrito = 0;

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
};

function crearCard(producto) {
    //BOTON
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //CARD BODY
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${estandarDolaresAmericanos.format(producto.precio)}</p>
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
    carta.style = "width: 25rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    //CONTENEDOR CARD
    let contenedorCarta = document.createElement("div");
    contenedorCarta.className = "col-xs-6 col-sm-4 col-md-4";
    contenedorCarta.append(carta);

    //BOTON CON EVENTO
    botonAgregar.onclick = () => {
        alert("Agregaste el producto: \n" + producto.nombre);

        let elementoExistente = elementosCarrito.find((elemento)=>elemento.producto.codigo == producto.codigo)

        if(elementoExistente) {elementoExistente.cantidad+=1
        } else {
            let elementoCarrito = new ElementosCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }
        dibujarCarrito();
    };
    return contenedorCarta;
};

function dibujarCatalogoProductos() {
    rowContenedorProductos.innerHTML = "";

    tienda.forEach(
        (articulo) => {
            let contenedorCarta = crearCard(articulo);
            rowContenedorProductos.append(contenedorCarta);
        }
    );

};




/**
 * FILTRO POR DISPONIBILIDAD
const disponibles = tienda.filter(articulo=>articulo.disponibilidad == true);
console.table(disponibles);
 */


/**
 * FILTRO POR CATEGORIA ROPA
const categoriaRopa=tienda.filter(articulo=>articulo.categoria=="ROPA");
console.table(categoriaRopa);
 */


/**
// FIND PARA ENCONTRAR POR EL CODIGO UNICO
let preguntaBuscar = confirm("Querés buscar un artículo por código?");
let codigoBuscado=parseInt(prompt("Ingresa el código del artículo a buscar"));
const porCodigo=tienda.find(art=>art.codigo===codigoBuscado);
if(porCodigo==undefined){alert("Artículo no encontrado!");
    }else{console.table(porCodigo)};
 */


/**
 * FUNCION AGREGAR ARTICULO NUEVO
function agregarArticulo(){
    let nombreArticuloNuevo=prompt("Ingrese el nuevo artículo:");
    let categoriaArticuloNuevo=prompt("Ingrese la categoría articulo:").toUpperCase();
    let autorArticuloNuevo=prompt("Ingrese de quien es el articulo:").toUpperCase();
    let precioArticuloNuevo=Number(prompt("Ingrese el precio del articulo:"));
    let disponibilidadArticuloNuevo=confirm("Ingrese si está disponible articulo:");
    let stockArticuloNuevo=Number(prompt("Ingrese el stock del articulo:"));
    let codigoArticuloNuevo=Number(prompt("Ingrese el código del articulo:"));
    let articuloNuevo=new articulo(nombreArticuloNuevo,categoriaArticuloNuevo,autorArticuloNuevo,precioArticuloNuevo, disponibilidadArticuloNuevo, stockArticuloNuevo, codigoArticuloNuevo);
    console.table(articuloNuevo);
    tienda.push(articuloNuevo);
    console.table(tienda);
    };
   let preguntaAgregar = confirm("Querés agregar un artículo?");
   let cantArticulosAgregar = parseInt(prompt("Cuantos artículos queres agregar?"));
   for (let i=1;i<=cantArticulosAgregar;i++){
        agregarArticulo();
};
*/ 

/**
 * TABLA DE STOCK
const listaStock=tienda.map((articulo)=>{
     return{
         nombre: articulo.nombre,
         stock: articulo.stock
     }
});
console.table(listaStock);
 */