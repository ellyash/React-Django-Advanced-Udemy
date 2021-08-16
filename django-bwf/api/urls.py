from django.urls.conf import include
from api import views
from rest_framework import routers
from django.conf.urls import include, url

router = routers.DefaultRouter()
router.register(r'groups', views.GroupViewset)
router.register(r'events', views.EventViewset)
router.register(r'members', views.GroupMemberViewset)
router.register(r'bets', views.BetViewset)
router.register(r'messages', views.GroupChatViewset)
router.register(r'users', views.UserViewset)
router.register(r'profile', views.UserProfileViewset)

urlpatterns = [
    url(r'^', include(router.urls)),
    url('auth/', views.CustomObtainAuthToken.as_view()),
]
