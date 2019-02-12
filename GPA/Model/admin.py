from django.contrib import admin
from .models import Person
from .models import Exam
from .models import Score
from .models import TopList

# Register your models here.

class PersonAdmin(admin.ModelAdmin):
	list_display = ('id', 'name', 'gender', 'gradeClass', 'school', 'tel', 'telF');
	list_display_links = ('id', 'name');
class ExamAdmin(admin.ModelAdmin):
	list_display = ('id', 'test', 'time');
	list_display_links = ('id', 'test');
class ScoreAdmin(admin.ModelAdmin):
	list_display = ('name', 'test', 'maths', 'mathsSort', 'chinese', 'chineseSort', 'english', 'englishSort', 'physics', 'physicsSort', 'chymistry', 'chymistrySort', 'biology', 'biologySort', 'history', 'historySort', 'politics', 'politicsSort', 'geography', 'geographySort', 'total', 'totalSort');
class TopListAdmin(admin.ModelAdmin):
	list_display = ('name', 'test', 'item', 'score', 'scoreSort');

admin.site.register(Person, PersonAdmin);
admin.site.register(Exam,ExamAdmin);
admin.site.register(Score,ScoreAdmin);
admin.site.register(TopList,TopListAdmin);