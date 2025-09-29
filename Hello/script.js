// Selecciona todas las llaves
const keys = document.querySelectorAll('.key');
const dropArea = document.getElementById('softskills-container');

keys.forEach(key => {
key.style.left = Math.random() * (window.innerWidth - 100) + 'px';
key.style.top = Math.random() * (window.innerHeight - 100) + 'px';

});

// Lista de soft skills
const softSkills = [
  'Trabajo en equipo',
  'Resolución de problemas',
  'Adaptabilidad',
  'Pensamiento crítico',
  'Creatividad',
  'Empatía',
  'Liderazgo',
  'Organización',
  'Negociación',
  'Toma de decisiones'
];

// Función para mostrar las soft skills
function showSoftSkills() {
  dropArea.innerHTML = ''; // limpia el mensaje inicial
  softSkills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'badge bg-secondary me-1';
    span.textContent = skill;
    dropArea.appendChild(span);
  });
}

// Función para verificar si la llave está dentro del contenedor
function checkDrop(key) {
  const dropRect = dropArea.getBoundingClientRect();
  const keyRect = key.getBoundingClientRect();

  const isInside =
    keyRect.left + keyRect.width / 2 > dropRect.left &&
    keyRect.right - keyRect.width / 2 < dropRect.right &&
    keyRect.top + keyRect.height / 2 > dropRect.top &&
    keyRect.bottom - keyRect.height / 2 < dropRect.bottom;

  if (isInside) {
    // Coloca la llave dentro del contenedor
    dropArea.appendChild(key);
    key.style.position = 'relative';
    key.style.left = '0';
    key.style.top = '0';
    key.style.zIndex = '1';

    // Verifica si todas las llaves están dentro
    const allInside = Array.from(keys).every(k => dropArea.contains(k));
    if (allInside) {
      showSoftSkills();
    }
  }
}

// Configuración de arrastre
keys.forEach(key => {
  key.addEventListener('mousedown', dragStart);

  function dragStart(e) {
    let shiftX = e.clientX - key.getBoundingClientRect().left;
    let shiftY = e.clientY - key.getBoundingClientRect().top;

    key.style.position = 'absolute';
    key.style.zIndex = 1000;
    document.body.append(key); // Trae la llave al frente

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
      key.style.left = pageX - shiftX + 'px';
      key.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function() {
      document.removeEventListener('mousemove', onMouseMove);
      checkDrop(key); // Verifica si se soltó dentro del contenedor
    }, { once: true });
  }

  // Evita el comportamiento predeterminado de arrastrar imagen
  key.ondragstart = () => false;
});



// Botón Doom
const switchEl = document.getElementById("doomSwitch");
const tabla = document.getElementById("tablaExperiencia"); // 👈 agrega id="tablaExperiencia" a tu <table>

// Imágenes
const imgOff = "imagenes/Doom_switch_off.png";  
const imgOn = "imagenes/Doom_switch_on.png";    

let isOn = false;

switchEl.addEventListener("click", () => {
  isOn = !isOn;
  switchEl.src = isOn ? imgOn : imgOff;

  // Mostrar/ocultar tabla
  tabla.style.display = isOn ? "table" : "none";
});

