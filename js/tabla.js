"use strict";
let agregar=document.getElementById("add").addEventListener("click", enviarDato);
let btnDeleteLast=document.getElementById("delete").addEventListener("click", borrarUltimaFila);
let btnAdd3=document.getElementById("add3").addEventListener("click", enviarTripleDato);
let btnSinPaginar=document.getElementById("sinpaginar").addEventListener("click", obtenerDatos);
let btnPaginar=document.getElementById("paginar").addEventListener("click", obtenerDatosPaginados);
let btnDesc=document.getElementById("desc").addEventListener("click", obtenerDatosDescOAsc);
let btnAsc=document.getElementById("asc").addEventListener("click", obtenerDatosDescOAsc);


let tbody=document.querySelector("#tBody");
tbody.innerHTML="";

let thead=document.querySelector("#tHead");
thead.innerHTML+=`<tr> <th>ID</th><th>Nombre</th><th>Categoria</th>
<th>Tipo</th><th>Borrar</th><th>Editar</th></tr>`;

let url = 'https://63228695a624bced307997db.mockapi.io/api/Zoo';
let id=0;
let names=document.querySelector("#Nombre").value;
let category=document.querySelector("#Categoria").value;
let tipe=document.querySelector("#Tipo").value;

let ZooTable={
    "nombre": names,
    "categoria": category,
    "tipo": tipe,
    
}
obtenerDatos();

//////////////////////////////////////////////////////////////////////////

async function obtenerDatosPaginados() {
    let url = new URL('https://63228695a624bced307997db.mockapi.io/api/Zoo');
    let page=1;
    url.searchParams.append('page', page);
    url.searchParams.append('limit', 10);
    tbody.innerHTML=""; 

    try {
        let res = await fetch(url,{
            method: 'GET',
            headers: {'content-type':'application/json'},    
        }).then(res=>{
            if(res.ok){
                return res.json();
            }
        })
        for (const ZooTable of res) {
            let nombre = ZooTable.nombre;
            let categoria = ZooTable.categoria;
            let tipo = ZooTable.tipo;
            id=ZooTable.id;
            
            thead.innerHTML=`
            <tr><th>ID</th><th>Nombre</th><th>Categoria</th>
            <th>Tipo</th><th>Borrar</th><th>Editar</th>
            </tr>`;
            tbody.innerHTML += ` 
            <tr><td>${id}</td><td>${nombre}</td> 
            <td>${categoria}</td><td>${tipo}</td>
            <td><button class="btn-borrar" id="${ZooTable.id}">borrar</button></td>
            <td><button class="btn-editar" id="${ZooTable.id}">Editar</button></td>
            </tr>`;
        }
        document.querySelectorAll(".btn-borrar").forEach(borrar_F => {
            borrar_F.addEventListener("click",borrarFila)
        });
        document.querySelectorAll(".btn-editar").forEach(editar_F => {
            editar_F.addEventListener("click",editarFila)
        });
    } catch (error) {
        console.log(error);
    }
}  

//////////////////////////////////////////////////////////////////////////

let countAscDesc=0;
async function obtenerDatosDescOAsc() {
    let hiddeBtnAsc=document.getElementById("asc");
    let hiddeBtnDesc=document.getElementById("desc");
    tbody.innerHTML="";
    let url = new URL('https://63228695a624bced307997db.mockapi.io/api/Zoo');  
   
        if((countAscDesc%2)===0){
           
            url.searchParams.append('sortBy', 'id');
            url.searchParams.delete('order','asc')
            url.searchParams.append('order', 'desc');
            hiddeBtnAsc.style.display="inline-block";
            hiddeBtnDesc.style.display="none";
            countAscDesc++
        }
        
        else if((countAscDesc%2)!==0){
            url.searchParams.append('sortBy', 'id');
            url.searchParams.delete('order','desc')
            url.searchParams.append('order', 'asc')
            hiddeBtnDesc.style.display="inline-block";
            hiddeBtnAsc.style.display="none";
            countAscDesc++
        }
    
    
    try {
        let res = await fetch(url,{
            method: 'GET',
            headers: {'content-type':'application/json'},    
        }).then(res=>{
            if(res.ok){
                return res.json();
            }
        })
        for (const ZooTable of res) {
            let nombre = ZooTable.nombre;
            let categoria = ZooTable.categoria;
            let tipo = ZooTable.tipo;
            id=ZooTable.id;
            
            thead.innerHTML=`
            <tr><th>ID</th><th>Nombre</th><th>Categoria</th>
            <th>Tipo</th><th>Borrar</th><th>Editar</th>
            </tr>`;
            tbody.innerHTML += ` 
            <tr><td>${id}</td><td>${nombre}</td> 
            <td>${categoria}</td><td>${tipo}</td>
            <td><button class="btn-borrar" id="${ZooTable.id}">borrar</button></td>
            <td><button class="btn-editar" id="${ZooTable.id}">Editar</button></td>
            </tr>`;
        }
        document.querySelectorAll(".btn-borrar").forEach(borrar_F => {
            borrar_F.addEventListener("click",borrarFila)
        });
        document.querySelectorAll(".btn-editar").forEach(editar_F => {
            editar_F.addEventListener("click",editarFila)
        });
    } catch (error) {
        console.log(error);
    }
}  

//////////////////////////////////////////////////////////////////////////

async function obtenerDatos() {
    let url = 'https://63228695a624bced307997db.mockapi.io/api/Zoo';
    tbody.innerHTML="";
    try {
        let res = await fetch(url); // GET url
        let json = await res.json(); // texto json a objeto
        for (const ZooTable of json) {
            let nombre = ZooTable.nombre;
            let categoria = ZooTable.categoria;
            let tipo = ZooTable.tipo;
            id=ZooTable.id;
            tbody.innerHTML += `<tr><td>${id}</td><td>${nombre}</td> 
            <td>${categoria}</td><td>${tipo}</td>
            <td><button class="btn-borrar" id="${ZooTable.id}">borrar</button></td>
            <td><button class="btn-editar" id="${ZooTable.id}">Editar</button></td>
            </tr>`;
         
        }
        document.querySelectorAll(".btn-borrar").forEach(borrar_F => {
            borrar_F.addEventListener("click",borrarFila)
        });
        document.querySelectorAll(".btn-editar").forEach(editar_F => {
            editar_F.addEventListener("click",editarFila)
        });
    } catch (error) {
        console.log(error);
    }
    
}

//////////////////////////////////////////////////////////////////////////

async function borrarFila() {

    try {
        // 'https://62bf6d80be8ba3a10d69b11e.mockapi.io/tabla/123'
        let res = await fetch(`${url}/${this.id}/`, {
            "method": "DELETE"

        });

        if (res.status === 200) {
            document.querySelector("#status").innerHTML = "Borrado!";
            tbody.innerHTML="";
        }
        
        
        else {
            document.querySelector("#status").innerHTML = "La fila ingresada no existe";
        }
        
        obtenerDatos();
    }

    catch (error) {
        console.log(error);
    }

}

//////////////////////////////////////////////////////////////////////////

async function borrarUltimaFila() {

    try {
        // 'https://62bf6d80be8ba3a10d69b11e.mockapi.io/api/Zoo'
        let res = await fetch(`${url}/${id}`, {
            "method": "DELETE",

        });

        if (res.status === 200) {
            document.querySelector("#status").innerHTML = "Borrado!";
            tbody.innerHTML="";
            obtenerDatos();

        }


        else {
            document.querySelector("#status").innerHTML = "No hay mas filas para borrar";
        }

    }

    catch (error) {
        console.log(error);
    }

}

//////////////////////////////////////////////////////////////////////////

async function editarFila(){
    let names=document.querySelector("#Nombre").value;
    let category=document.querySelector("#Categoria").value;
    let tipe=document.querySelector("#Tipo").value;
    try{     
        let res = await fetch(`${url}/${this.id}`, {
            'method': 'PUT', 
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({"nombre": names,"categoria":category,"tipo":tipe})
        })
        if (res.status===200){
            console.log("Editado!!")
            tbody.innerHTML="";
            obtenerDatos();
        }
    }
    catch {
        console.log("error al editar");
    }

}

//////////////////////////////////////////////////////////////////////////

async function enviarDato(e) {
    let names=document.querySelector("#Nombre").value;
    let category=document.querySelector("#Categoria").value;
    let tipe=document.querySelector("#Tipo").value;
    
    let ZooTable={
        "id":id ,
        "nombre": names,
        "categoria": category,
        "tipo": tipe,
        
    }

    try {
        if(names===""||category===""||tipe===""){
            document.querySelector("#status").innerHTML = "Completa todos los campos";
            e.preventDefault();

    }
    else{
        let res = await fetch(url, {
            "method": "POST",
            "headers":{ "Content-type": "application/json"},
            "body": JSON.stringify(ZooTable)
        }); // GET url
        if(res.status===201){
            document.querySelector("#status").innerHTML = "Creado!";
            tbody.innerHTML="";
            obtenerDatos();
            
        }
    }
    } 
    catch (error) {
        console.log(error);
    }
    
}

//////////////////////////////////////////////////////////////////////////

function enviarTripleDato(){
    
    let names=document.querySelector("#Nombre").value;
    let category=document.querySelector("#Categoria").value;
    let tipe=document.querySelector("#Tipo").value;
    
    if(names===""||category===""||tipe===""){
        document.querySelector("#status").innerHTML = "Completa todos los campos";
    }
    else{
      setTimeout(enviarDato);
      setTimeout(enviarDato,1000);
      setTimeout(enviarDato,1500);
   

}
};

//////////////////////////////////////////////////////////////////////////

