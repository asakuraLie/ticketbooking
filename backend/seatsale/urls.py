from django.urls import path

from .views import SeatView

urlpatterns = [
    path("seat/list/", SeatView.as_view(actions={"get": "list_all"})),
    path("seat/create/", SeatView.as_view(actions={"post": "create"})),
    path("seat/<int:pk>/reserve/", SeatView.as_view(actions={"patch": "reserve"})),
    path("seat/<int:pk>/make_available/", SeatView.as_view(actions={ "patch": "make_available"})),
]