from django.db import models

# Create your models here.
class Course(models.Model):
    id = models.AutoField(primary_key=True)
    itemid = models.CharField(default="科目", max_length=16)
    maxScore = models.IntegerField(default=100)
    maxSort = models.IntegerField(default=1000)
    def __str__(self):
        return self.itemid

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
    test = models.CharField(default="2018秋0", max_length=16)
    time = models.DateField(auto_now_add = True)
    class Meta:
        ordering=['-id']
    def __str__(self):
        return self.test

class Score(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.ForeignKey(Person,related_name = "scoreperson",on_delete=models.CASCADE)
    test = models.ForeignKey(Exam,related_name = "scoreexam",on_delete=models.CASCADE)
    itemid = models.ForeignKey(Course,related_name = "scorecourse",on_delete=models.CASCADE)
    score = models.DecimalField(default=150.00, max_digits=6, decimal_places=2)
    sort = models.IntegerField(default=1000)

class TopList(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.ForeignKey(Person,related_name = "topperson",on_delete=models.CASCADE)
    test = models.ForeignKey(Exam,related_name = "topexam",on_delete=models.CASCADE)
    itemid = models.ForeignKey(Course,related_name = "topcourse",on_delete=models.CASCADE)
    score = models.DecimalField(default=150.00, max_digits=6, decimal_places=2)
    sort = models.IntegerField(default=1000)

class Regression(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.ForeignKey(Person,related_name = "regperson",on_delete=models.CASCADE)
    test = models.ForeignKey(Exam,related_name = "regexam",on_delete=models.CASCADE)
    itemid = models.ForeignKey(Course,related_name = "regcourse",on_delete=models.CASCADE)
    kRegression = models.DecimalField(default=0.00, max_digits=8, decimal_places=2)
    eRegression = models.DecimalField(default=0.0, max_digits=8, decimal_places=0)
