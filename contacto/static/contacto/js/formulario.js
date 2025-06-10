document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contacto');
    const respuesta = document.getElementById('respuesta');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim(); 

        if (/\s/.test(email)) {
            alert('El correo electrónico no debe contener espacios.');
            return;  
        }

        const datos = {
            nombre: document.getElementById('nombre').value.trim(),
            email: email,
            mensaje: document.getElementById('mensaje').value.trim()
        };

        try {
            const res = await fetch('/api/contacto/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(datos)
            });

            if (res.ok) {
                respuesta.textContent = 'Mensaje enviado correctamente.';
                form.reset();
            } else {
                const errorData = await res.json();
                respuesta.textContent = errorData.error || 'Error al enviar mensaje.';
            }
        } catch (error) {
            respuesta.textContent = 'Error de conexión.';
            console.error(error);
        }
    });
});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}