from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        title="Projeto Transações Financeiras",
        default_version="v1",
        description="Documentação da API para gerenciar carteiras digitais e transações financeiras",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contato@empresa.com"),
        license=openapi.License(name="Licença MIT"),
    ),
    public=True,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("wallet.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0)),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
