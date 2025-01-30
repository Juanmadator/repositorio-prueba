//se ejecutaa cuando se ha cargado el html entero

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

//para dejar fijo el menu
function navegacionFija(){
  const barra=document.querySelector('.header');
  const sobreFestival=document.querySelector('.sobre-festival');
  const body=document.querySelector('body');

  window.addEventListener('scroll',function(){

    if(sobreFestival.getBoundingClientRect().bottom<0){
      barra.classList.add('fijo');
      body.classList.add('body-scroll');
    }else{
      barra.classList.remove('fijo');
      body.classList.remove('body-scroll');
    }
  })

}

//HACER SMOOTH EL SCROLL
function scrollNav(){
  const enlaces=document.querySelectorAll('.navegacion-principal a');
  enlaces.forEach(enlace=>{
    enlace.addEventListener('click',function(evento){

      //quitamos el comportamiento por default que tiene el scroll
      evento.preventDefault();
      const seccionScroll=evento.target.attributes.href.value;
      const seccion=document.querySelector(seccionScroll);


      //le ponemos un nuevo comportamiento
      seccion.scrollIntoView({behavior:"smooth"});
    })
  });
}

function crearGaleria() {
  //seleccionamos la clase del elemento que queremos toquetear
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");

    imagen.innerHTML = `
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img src="build/img/thumb/${i}.jpg" alt="imagen vocalista"></img>
                `;

    imagen.onclick=function(){
        mostrarImagen(i);
    }

    galeria.appendChild(imagen);
  }
}


  function mostrarImagen(id){
    const imagen = document.createElement('picture');

    imagen.innerHTML = `
                <source srcset="build/img/grande/${id}.avif" type="image/avif">
                <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img src="build/img/grande/${id}.jpg" alt="imagen vocalista"></img>
                `;


                //creaa el overlay    con la imagen
                 const overlay=document.createElement('DIV');
                overlay.appendChild(imagen);
                overlay.classList.add('overlay');
                overlay.onclick=function(){
                    const body=document.querySelector('body');
                    body.classList.remove('fijar-body');
                    overlay.remove();
                }

                //boton para cerrar el modal
                const cerrarModal=document.createElement('P');
                cerrarModal.textContent='X';
                cerrarModal.classList.add('btn-cerrar');

                cerrarModal.onclick=function(){
                    const body=document.querySelector('body');
                    overlay.remove();

                    //le eliminamos la clase de fijar body en la que 
                    //hemos tocado en el css un overflow hidden
                    body.classList.remove('fijar-body');
                }
                overlay.appendChild(cerrarModal);

                //se hace un add al HTML
                const body=document.querySelector('body');
                body.appendChild(overlay);
                body.classList.add('fijar-body');
  }
