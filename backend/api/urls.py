from django.urls import path

from userauths import views as userauths_views

urlpatterns = [
    path('user/token/', userauths_views.MyTokenOptainPairView.as_view()),
    path('user/register/', userauths_views.RegisterView.as_view()),
]
