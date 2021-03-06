# Generated by Django 2.1.11 on 2019-09-19 23:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('itemid', models.CharField(default='科目', max_length=16)),
                ('maxScore', models.IntegerField(default=100)),
                ('maxSort', models.IntegerField(default=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('test', models.CharField(default='2018秋0', max_length=16)),
                ('time', models.DateField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default='未命名', max_length=16)),
                ('gender', models.CharField(default='男', max_length=8)),
                ('gradeClass', models.DecimalField(decimal_places=2, default=2021.17, max_digits=8)),
                ('school', models.CharField(default='实验中学', max_length=20)),
                ('tel', models.CharField(default='130', max_length=16)),
                ('telF', models.CharField(default='130', max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('score', models.DecimalField(decimal_places=2, default=150.0, max_digits=6)),
                ('sort', models.IntegerField(default=1000)),
                ('itemid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scorecourse', to='Model.Course')),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scoreperson', to='Model.Person')),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scoreexam', to='Model.Exam')),
            ],
        ),
        migrations.CreateModel(
            name='TopList',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('score', models.DecimalField(decimal_places=2, default=150.0, max_digits=6)),
                ('sort', models.IntegerField(default=1000)),
                ('itemid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='topcourse', to='Model.Course')),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='topperson', to='Model.Person')),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='topexam', to='Model.Exam')),
            ],
        ),
    ]
