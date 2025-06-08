document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contacto');
    const respuesta = document.getElementById('respuesta');

    

    form.addEventListener('submit', async(e) => {
        e.preventDefault();

        const datos = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            mensaje: document.getElementById('mensaje').value

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
                respuesta.textContent = 'Error al enviar mensaje.';
            }
        } catch (error) {
            respuesta.textContent = 'Error de conexión.';
            console.error(error);
        };

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