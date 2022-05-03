"""GPA URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic.base import RedirectView

from Views import view
from Views import viewadmin
from Views import statistics

urlpatterns = [
	path('favicon.ico', RedirectView.as_view(url='Static/img/favicon.ico')),
    path('', view.index),
    path('info', view.info),
    path('browser', view.browser),
    path('toplist', view.toplist),
    
    path('admin/', admin.site.urls),
    path('excelitem', viewadmin.excelitem),
    path('excelgroup', viewadmin.excelgroup),
    path('excelperson', viewadmin.excelperson),
    path('excelscore', viewadmin.excelscore),
    path('itempost', viewadmin.itempost),
    path('grouppost', viewadmin.grouppost),
    path('personpost', viewadmin.personpost),
    path('scorepost', viewadmin.scorepost),

    path('whole', statistics.whole),
    path('whole/<int:w_id>/<int:g_id>', statistics.whole),
    path('analyze', statistics.analyze),
    path('analyze/<int:a_id>/<int:g_id>', statistics.analyze),
    path('group', statistics.group),
    path('asyn/<int:g_id>/<int:i_id>/<int:e_id>', statistics.asyn),
    path('single', statistics.single),
    path('single/<int:s_id>', statistics.single),
]