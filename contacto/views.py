from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
import json 
from .models import Mensaje

def landing_page(request):
    return render(request, 'index.html')

@method_decorator(csrf_exempt, name='dispatch')
class MensajeView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            mensaje = Mensaje(
                nombre=data['nombre'],
                email=data['email'],
                mensaje=data['mensaje']
            )
            print(data)
            mensaje.save()
            return JsonResponse({'mensaje': 'Mensaje recibido con exito'}, status=200)
        except Exception as e:
            return JsonResponse({'error':str(e)}, status=400)

