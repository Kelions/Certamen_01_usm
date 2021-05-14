// Plugins
tinymce.init({
    selector: '#descripcion_txt',
    height: 150,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });


// arrive
const select_options = ["Desayuno","Once","Cena","Almuerzo",];
const menues = [];

// Para cargar el select
const add_select = (i) =>{
    let select = document.querySelector("#select_horario");
    let option = document.createElement("option");
    option.value = i;
    option.text = select_options[i];
    select.appendChild(option);
};

for(let i = 0 ; i < select_options.length; i++){
    add_select(i);
  }

//para cargar tabla

const cargar_tabla =()=>{
    const tbody = document.querySelector("#tabla_body");
    tbody.innerHTML= "";
    for(let i = 0 ; i<menues.length; ++i){
        let m = menues[i];
        let fila = document.createElement('tr');

        let celda_nombre = document.createElement("td");
            celda_nombre.innerText = m.nombre;

        let celda_horario = document.createElement("td");
            celda_horario.innerText = m.horario.value;

        let celda_precio =document.createElement("td");
            celda_precio.innerText = m.precio;

        let celda_descrpicion = document.createElement("td");
            celda_descrpicion.innerHTML = (m.descripcion);

        let celda_oferta = document.createElement("td")

        let icono = document.createElement("i")

        //<i class="far fa-thumbs-down"></i>

        if( (m.horario == 0) && (m.precio < 5000) ){
            icono.classList.add("far","fa-thumbs-up", "fa-2x")
            celda_oferta.appendChild(icono)

        }else{
            icono.classList.add("far","fa-thumbs-down", "fa-2x")
            celda_oferta.appendChild(icono)
        }
        if( (m.horario == 1) && (m.precio < 10000) ){
            icono.classList.add("far","fa-thumbs-up", "fa-2x")
            celda_oferta.appendChild(icono)
        
        }else{
            icono.classList.add("far","fa-thumbs-down", "fa-2x")
            celda_oferta.appendChild(icono)
        }
        if( (m.horario == 3 ) && (m.precio < 15000) ){
            icono.classList.add("far","fa-thumbs-up", "fa-2x")
            celda_oferta.appendChild(icono)

        }else{
            icono.classList.add("far","fa-thumbs-down", "fa-2x")
            celda_oferta.appendChild(icono)
        }
        if( (m.horario == 2) && (m.precio < 20000 )){
            icono.classList.add("far","fa-thumbs-up", "fa-2x")
            celda_oferta.appendChild(icono)
            
        }else{
            icono.classList.add("far","fa-thumbs-down", "fa-2x")
            celda_oferta.appendChild(icono)
        }
        
        fila.appendChild(celda_nombre);
        fila.appendChild(celda_horario);
        fila.appendChild(celda_precio);
        fila.appendChild(celda_descrpicion);
        fila.appendChild(celda_oferta);
        
        
        tbody.appendChild(fila);
    }
}




document.querySelector("#btn_menu").addEventListener("click",()=>{
    // select_options = ["Desayuno","Once","Cena","Almuerzo",];

    //Valores
    let swobjeto = false
    let swoferta = false
    

    let precio = document.querySelector("#precio_number").value;
    let horario = document.querySelector("#select_horario").value;
    let nombre = document.querySelector("#nombre_txt").value;
    let descripcion = tinymce.get("descripcion_txt").getContent();
    // condicionamiento
    if( (horario == "Desayuno") && (precio >= 1000) || (precio < 10000) ){
        swobjeto = true
    }
    if( (horario == "Once") && (precio >= 5000) || (precio < 15000) ){
        swobjeto = true
    }
    if( (horario == "Almuerzo") && (precio >= 10000) || (precio < 20000) ){
        swobjeto = true
    }
    if( horario == "Cena" && precio > 15000 ){
        swobjeto = true
    }
 




    if(swobjeto == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe cambiar el precio!',
          })

    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro de Menu realizado',
            showConfirmButton: false,
            timer: 1500
          })
        //objeto
        let menu = {};
        menu.precio = precio; // debe ser condicionado
        menu.horario = horario;
        menu.nombre = nombre;
        menu.descripcion = descripcion;
        menues.push(menu)
        cargar_tabla();

  
    
        
        

    }




});

