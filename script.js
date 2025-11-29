// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const imagen = document.getElementById('imagen');

  const errNombre = document.getElementById('err-nombre');
  const errEmail = document.getElementById('err-email');
  const errPassword = document.getElementById('err-password');
  const errImagen = document.getElementById('err-imagen');
  const previewImg = document.getElementById('previewImg');
  const successMsg = document.getElementById('successMsg');
  const btnReset = document.getElementById('btnReset');

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
  const ALLOWED_TYPES = ['image/jpeg','image/png','image/gif'];

  // Validación básica de email (no perfecta, pero útil)
  function validarEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function limpiarErrores(){
    errNombre.textContent = '';
    errEmail.textContent = '';
    errPassword.textContent = '';
    errImagen.textContent = '';
    successMsg.textContent = '';
  }

  // Previsualizar imagen cuando se seleccione
  imagen.addEventListener('change', (e) => {
    errImagen.textContent = '';
    const file = imagen.files[0];
    if (!file){
      previewImg.style.display = 'none';
      previewImg.src = '';
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      errImagen.textContent = 'Formato no permitido. Sólo JPG, PNG o GIF.';
      imagen.value = ''; // limpiar
      previewImg.style.display = 'none';
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      errImagen.textContent = 'La imagen excede 2 MB.';
      imagen.value = '';
      previewImg.style.display = 'none';
      return;
    }

    // Crear URL para mostrar la imagen (no subida)
    const url = URL.createObjectURL(file);
    previewImg.src = url;
    previewImg.style.display = 'block';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErrores();

    let valido = true;

    if (nombre.value.trim().length < 2) {
      errNombre.textContent = 'Ingresa tu nombre completo.';
      valido = false;
    }

    if (!validarEmail(email.value.trim())) {
      errEmail.textContent = 'Correo inválido.';
      valido = false;
    }

    if (password.value.length < 6) {
      errPassword.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      valido = false;
    }

    const file = imagen.files[0];
    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errImagen.textContent = 'Formato de imagen no permitido.';
        valido = false;
      } else if (file.size > MAX_IMAGE_SIZE) {
        errImagen.textContent = 'La imagen excede 2 MB.';
        valido = false;
      }
    }

    if (!valido) {
      successMsg.textContent = '';
      return;
    }

    // Si todo está OK: simular envío
    successMsg.textContent = 'Formulario válido. Simulando envío...';

    // Aquí podrías:
    // - enviar con fetch a tu backend (FormData)
    // - o guardar en localStorage durante pruebas
    // Ejemplo: guardamos en localStorage para probar
    const datos = {
      nombre: nombre.value.trim(),
      email: email.value.trim(),
      // NO guardes contraseñas sin encriptar en producción.
      imagenNombre: file ? file.name : null,
      fecha: new Date().toISOString()
    };
    // Guarda como demo (no almacenar contraseñas reales)
    localStorage.setItem('registroDemo', JSON.stringify(datos));

    // limpiar form tras "envío"
    form.reset();
    previewImg.src = '';
    previewImg.style.display = 'none';

    setTimeout(()=> {
      successMsg.textContent = 'Registro guardado (simulado).';
    }, 600);
  });

  // reset visual
  btnReset.addEventListener('click', () => {
    limpiarErrores();
    previewImg.src = '';
    previewImg.style.display = 'none';
  });

});