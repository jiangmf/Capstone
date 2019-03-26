"""wiseturn URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings

# from rest_framework.routers import DefaultRouter
# from wiseturn.auth.views import UserViewSet

# router = DefaultRouter()
# router.register(r'users', UserViewSet, base_name='users')

from wiseturn.models import *

class CustomModelAdmin(admin.ModelAdmin):
    def __init__(self, model, admin_site):
        self.list_display = [model.__str__] + [field.name for field in model._meta.fields 
        if not (field.name in ["id","hash", "password"]) and not (field.__class__.__name__ in ['TextField'])
        ]
        super(CustomModelAdmin, self).__init__(model, admin_site)
        self.search_fields = [f.name for f in model._meta.fields if f.__class__.__name__ in ['CharField', 'TextField', 'EmailField']]


for model in [WTUser, Institution, Program, InstitutionAdmin, InstitutionApplication]:
    admin.site.register(model, CustomModelAdmin)

from wiseturn.auth.views import *
from wiseturn.views import *

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

schema_view = get_schema_view(
    openapi.Info(
       title="Eduget API",
       default_version='v1',
    ),
    public=True,
    permission_classes = (permissions.AllowAny,)
)


urlpatterns = [
	url(r'^api/token/auth/$', obtain_auth_token),
	url(r'^api/users/create/$', UserCreateView.as_view()),
    url(r'^api/users/details/$', UserDetailView.as_view()),
    url(r'^api/institutions/$', InstitutionListView.as_view()),
    url(r'^api/institutions/(?P<uid>\w+)/$', InstitutionDetailView.as_view()),
    url(r'^api/institutions/(?P<institution_uid>\w+)/programs/(?P<program_uid>\w+)/$', ProgramDetailView.as_view()),
    url(r'^api/applications/institutions/$', InstitutionApplicationListView.as_view()),
    url(r'^api/applications/institutions/create/$', InstitutionApplicationDetailView.as_view()),
    # institution admin pages
    url(r'^api/institution-admin/applications/$', InstitutionApplicationAdminListView.as_view()),

    # admin pages
    url(r'^api/docs/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^admin/', admin.site.urls),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url('__debug__/', include(debug_toolbar.urls)),

        # For django versions before 2.0:
        # url(r'^__debug__/', include(debug_toolbar.urls)),

    ] + urlpatterns