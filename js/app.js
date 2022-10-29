//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

//Funciones

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){

    //Crear objeto con contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad ++
                return curso
            }else{
                return curso
            }
        })
    
        articulosCarrito = [...cursos];
    }else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    } 
    console.log(articulosCarrito);
    carritoHTML();

}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML 
    limpiarHTML()

    //Corre el carrito y genera el HTML
    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src ="${imagen}" width = "100">
            </td>            
            <td> ${titulo} </td>        
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> 
                <a href="#" class="borrar-curso" data-id = "${id}"> X </a>
            </td>
        `;
        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
}