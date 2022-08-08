// ARTICULO
class articulo{
    constructor(nombre, categoria, autor, precio, disponibilidad, stock, codigo){
        this.nombre=nombre
        this.categoria=categoria
        this.autor=autor
        this.precio=precio
        this.disponibilidad=disponibilidad
        this.stock=stock
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
}

// ARRAY TIENDA
const tienda = [];

// ARICULOS
let articulo1 = new articulo("Remera con Logo", "ROPA", "ARBOL", 2500, true, 10, 6687421);
let articulo2 = new articulo("Gorra con Logo", "ROPA", "ARBOL", 2000, true, 5, 6687451);
let articulo3 = new articulo("Taza con Logo", "ITEMS", "ARBOL", 1000, true, 3, 6682421);
let articulo4 = new articulo("Buzo con Logo", "ROPA", "ARBOL", 2000, true, 8, 6687428);
let articulo5 = new articulo("Totebag con Logo", "ITEMS", "ARBOL", 3000, true, 12, 6687429);

// PUSH DE ITEMS
tienda.push(articulo1, articulo2, articulo3, articulo4, articulo5);
console.table(tienda);

// FILTRO POR DISPONIBILIDAD

const disponibles = tienda.filter(articulo=>articulo.disponibilidad == true);
console.table(disponibles);

// FILTRO POR CATEGORIA ROPA
const categoriaRopa=tienda.filter(articulo=>articulo.categoria=="ROPA");
console.table(categoriaRopa);

// FUNCION AGREGAR ARTICULO NUEVO

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

let cantArticulosAgregar = parseInt(prompt("cuantos artículos queres agregar?"));
for (let i=1;i<=cantArticulosAgregar;i++){
    agregarArticulo();
};

// FIND PARA ENCONTRAR POR EL CODIGO UNICO

let codigoBuscado=parseInt(prompt("Ingresa el código del artículo a buscar"));
const porCodigo=tienda.find(art=>art.codigo===codigoBuscado);
if(porCodigo==undefined){alert("Artículo no encontrado!");
    }else{console.table(porCodigo)};

// TABLA DE STOCK

 const listaStock=tienda.map((articulo)=>{
     return{
         nombre: articulo.nombre,
         stock: articulo.stock
     }
 });
 console.table(listaStock);




