function calcularSalario() {
    const nombreInput = document.getElementById('nombre').value;
    const salarioInput = document.getElementById('salario').value;
    
    if(!salarioInput || salarioInput <= 0) {
        alert("Por favor ingrese un salario válido");
        return;
    }

    const salario = parseFloat(salarioInput);
    const nombre = nombreInput === "" ? "Colaborador" : nombreInput;

    let isss = salario * 0.03;
    if (salario > 1000) isss = 30.00;

    let afp = salario * 0.0725;

    let rentaImponible = salario - isss - afp;

    let isr = 0;
    if (rentaImponible <= 472.00) {
        isr = 0; 
    } else if (rentaImponible <= 895.24) {
        isr = (rentaImponible - 472.00) * 0.10 + 17.67;
    } else if (rentaImponible <= 2038.10) {
        isr = (rentaImponible - 895.24) * 0.20 + 60.00;
    } else {
        isr = (rentaImponible - 2038.10) * 0.30 + 288.57;
    }

    let liquido = rentaImponible - isr;

    const fmt = (num) => num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    document.getElementById('resNombre').innerText = nombre;
    document.getElementById('resSalario').innerText = fmt(salario);
    document.getElementById('resISSS').innerText = fmt(isss);
    document.getElementById('resAFP').innerText = fmt(afp);
    document.getElementById('resImponible').innerText = fmt(rentaImponible);
    document.getElementById('resISR').innerText = fmt(isr);
    document.getElementById('resLiquido').innerText = fmt(liquido);

    document.getElementById('resultados').classList.remove('hidden');
}


function descargarPDF() {
   
    const elemento = document.getElementById('resultados');
    
    
    const opciones = {
        margin:       0.5,
        filename:     'Boleta_Pago.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    
    html2pdf().set(opciones).from(elemento).save();
}

