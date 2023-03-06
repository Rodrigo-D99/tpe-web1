    "use strict";
    let Captcha= document.getElementById("NrosCaptcha");
    let inputCapcha= document.getElementById("inputCapcha");
    let btnEnviar= document.getElementById("btn-env");
    btnEnviar.addEventListener("click", validar);
    let validacionCaptcha= document.getElementById("ValidacionCaptcha");

        let N1,N2,N3,N4,N5;
        
        N1= Math.floor(Math.random()*9);
        N2= Math.floor(Math.random()*9);
        N3= Math.floor(Math.random()*9);
        N4= Math.floor(Math.random()*9);
        N5= Math.floor(Math.random()*9);
        
        Captcha.innerHTML= `<p>${N1}${N2}${N3}${N4}${N5}</p>`;
    

    function validar(event){
        if(Captcha.innerText === inputCapcha.value){
            validacionCaptcha.innerHTML="Captcha Validado, formulario enviado";
        }
        else if(Captcha.innerText !== inputCapcha.value){

            N1= Math.floor(Math.random()*9);
            N2= Math.floor(Math.random()*9);
            N3= Math.floor(Math.random()*9);
            N4= Math.floor(Math.random()*9);
            N5= Math.floor(Math.random()*9);

            Captcha.innerHTML= `<p>${N1}${N2}${N3}${N4}${N5}</p>`;
            
            validacionCaptcha.innerHTML="Captcha Invalido, formulario rechazado";            
        }
        event.preventDefault();
    }
////////////////////////////////////////////////////////////////////
 