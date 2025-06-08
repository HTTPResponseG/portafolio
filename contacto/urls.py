from django.urls import path
from .views import landing_page, MensajeView

urlpatterns = [
    path('', landing_page),
    path('api/contacto/', MensajeView.as_view()),
]