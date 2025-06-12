from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import json
from .models import Mensaje

def landing_page(request):
    return render(request, 'index.html')

@method_decorator(csrf_exempt, name='dispatch')
class MensajeView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)

            nombre = data.get('nombre', '').strip()
            email = data.get('email', '').strip()
            mensaje_texto = data.get('mensaje', '').strip()

            # Validaciones básicas
            if not nombre or not email or not mensaje_texto:
                return JsonResponse({'error': 'Todos los campos son obligatorios.'}, status=400)

            # Validación de correo electrónico
            try:
                validate_email(email)
            except ValidationError:
                return JsonResponse({'error': 'Correo electrónico inválido.'}, status=400)

            # Guardar si todo es válido
            mensaje = Mensaje(nombre=nombre, email=email, mensaje=mensaje_texto)
            mensaje.save()

            return JsonResponse({'mensaje': 'Mensaje recibido con éxito'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato JSON inválido.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)



