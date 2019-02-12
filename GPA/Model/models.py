from django.db import models

# Create your models here.
class Person(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(default="未命名", max_length=16)
	gender = models.CharField(default="男", max_length=8)
	gradeClass = models.DecimalField(default=2021.17, max_digits=8, decimal_places=2)
	school = models.CharField(default="实验中学", max_length=20)
	tel = models.CharField(default="130", max_length=16)
	telF = models.CharField(default="130", max_length=16)
	def __str__(self):
		return self.name

class Exam(models.Model):
	id = models.AutoField(primary_key=True)
	test = models.CharField(default="高一秋季0", max_length=16)
	time = models.DateField(auto_now_add = True)
	class Meta:
		ordering=['-id']
	def __str__(self):
		return self.test

class Score(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.ForeignKey(Person,related_name = "scoreperson",on_delete=models.CASCADE)
	test = models.ForeignKey(Exam,related_name = "scoreexam",on_delete=models.CASCADE)
	maths = models.IntegerField(default=0)
	mathsSort = models.IntegerField(default=1000)
	chinese = models.IntegerField(default=0)
	chineseSort = models.IntegerField(default=1000)
	english = models.IntegerField(default=0)
	englishSort = models.IntegerField(default=1000)
	physics = models.IntegerField(default=0)
	physicsSort = models.IntegerField(default=1000)
	chymistry = models.IntegerField(default=0)
	chymistrySort = models.IntegerField(default=1000)
	biology = models.IntegerField(default=0)
	biologySort = models.IntegerField(default=1000)
	history = models.IntegerField(default=0)
	historySort = models.IntegerField(default=1000)
	politics = models.IntegerField(default=0)
	politicsSort = models.IntegerField(default=1000)
	geography = models.IntegerField(default=0)
	geographySort = models.IntegerField(default=1000)
	total = models.IntegerField(default=0)
	totalSort = models.IntegerField(default=1000)

class TopList(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.ForeignKey(Person,related_name = "topperson",on_delete=models.CASCADE)
	test = models.ForeignKey(Exam,related_name = "topexam",on_delete=models.CASCADE)
	item = models.CharField(default="综合", max_length=8)
	score = models.IntegerField(default=0)
	scoreSort = models.IntegerField(default=1000)