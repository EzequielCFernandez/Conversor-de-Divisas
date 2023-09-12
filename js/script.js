const divisaUno = document.getElementById('divisa-uno');
const divisaDos = document.getElementById('divisa-dos');
const cantidadDivisaUno = document.getElementById('cantidad-divisa-uno');
const cantidadDivisaDos = document.getElementById('cantidad-divisa-dos');
const conversionDivisa = document.getElementById('conversion-cambio');
const btnCambio = document.getElementById('btn-cambio');

// Fetch de ExchangeRate y actulizar el DOM
function calcularDivisa(){
    
    const divisa_uno = divisaUno.value;
    const divisa_dos = divisaDos.value;

    fetch(`https://open.er-api.com/v6/latest/${divisa_uno}`).then(res => res.json()).then(data => {
        const conversion = data.rates[divisa_dos];
        conversionDivisa.innerText = `1 ${divisa_uno} = ${conversion} ${divisa_dos}`;
        cantidadDivisaDos.value = (cantidadDivisaUno.value * conversion).toFixed(2);
    });

}

var input=  document.getElementById('cantidad-divisa-uno');

//Eventos escucha
divisaUno.addEventListener('change', calcularDivisa);
cantidadDivisaUno.addEventListener('input', calcularDivisa);
divisaDos.addEventListener('change', calcularDivisa);
cantidadDivisaDos.addEventListener('input', calcularDivisa);

input.addEventListener('input',function(){
  if (this.value.length > 12) 
     this.value = this.value.slice(0,12); 
})

btnCambio.addEventListener('click', () =>{
    const divisaTemp = divisaUno.value;
    divisaUno.value = divisaDos.value;
    divisaDos.value = divisaTemp;
    calcularDivisa();
});


calcularDivisa();