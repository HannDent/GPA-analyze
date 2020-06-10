from django.contrib import admin
from .models import Course
from .models import Person
from .models import Exam
from .models import Score
from .models import TopList
from .models import Regression

# Register your models here.

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'itemid', 'maxScore', 'maxSort');
    list_display_links = ('id', 'itemid');
class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'gender', 'gradeClass', 'school', 'tel', 'telF');
    list_display_links = ('id', 'name');
class ExamAdmin(admin.ModelAdmin):
    list_display = ('id', 'test', 'time');
    list_display_links = ('id', 'test');
class ScoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'test', 'itemid', 'score', 'sort');
class TopListAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'test', 'itemid', 'score', 'sort');
class RegressionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'test', 'itemid', 'kRegression', 'eRegression');

admin.site.register(Course,CourseAdmin);
admin.site.register(Person,PersonAdmin);
admin.site.register(Exam,ExamAdmin);
admin.site.register(Score,ScoreAdmin);
admin.site.register(TopList,TopListAdmin);
admin.site.register(Regression,RegressionAdmin);