from rest_framework.routers import DefaultRouter
from .views import StudyTaskViewSet

router = DefaultRouter()
router.register(r'tasks', StudyTaskViewSet)

urlpatterns = router.urls