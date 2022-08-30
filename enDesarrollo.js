
/**

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

*/

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