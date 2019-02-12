from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models import Max
from Model.models import Person,Exam,Score,TopList
import json

@login_required(login_url='/admin/login')
def excel(request):
	return render(request, 'excel.html');

@login_required(login_url='/admin/login')
def personpost(request):
	if request.method == "POST":
		jsons = request.POST['da'];
		item = jsons.split("`@");
		if len(item[-1])<10:
			item.pop();
		try:
			with transaction.atomic():
				for oneperson in item:
					dbsql = oneperson.split("`");
					b=Person.objects.get_or_create(name=dbsql[0]);
					b[0].gender=dbsql[1];
					b[0].gradeClass=dbsql[2];
					b[0].school=dbsql[3];
					b[0].tel=dbsql[4];
					b[0].telF=dbsql[5];
					b[0].save();
		except:
			return HttpResponse("人员表格数据错误，请核查。");
		else:
			return HttpResponse("录入完毕");
	else:
		return render(request, 'web/404.html');

@login_required(login_url='/admin/login')
def scorepost(request):
	if request.method == "POST":
		excelhead = request.POST['exam'];
		jsons = request.POST['da'];
		item = jsons.split("`@");
		if len(item[-1])<10:
			item.pop();
		try:
			with transaction.atomic():
				Exam.objects.update_or_create(test=excelhead);
				for oneitem in item:
					dbsql = oneitem.split("`");
					dname = Person.objects.get(name=dbsql[0]);
					dexam = Exam.objects.get(test=excelhead);

					b=Score.objects.get_or_create(name=dname,test=dexam);
					b[0].maths=dbsql[1];
					b[0].mathsSort=dbsql[2];
					b[0].chinese=dbsql[3];
					b[0].chineseSort=dbsql[4];
					b[0].english=dbsql[5];
					b[0].englishSort=dbsql[6];
					b[0].physics=dbsql[7];
					b[0].physicsSort=dbsql[8];
					b[0].chymistry=dbsql[9];
					b[0].chymistrySort=dbsql[10];
					b[0].biology=dbsql[11];
					b[0].biologySort=dbsql[12];
					b[0].history=dbsql[13];
					b[0].historySort=dbsql[14];
					b[0].politics=dbsql[15];
					b[0].politicsSort=dbsql[16];
					b[0].geography=dbsql[17];
					b[0].geographySort=dbsql[18];
					b[0].total=dbsql[19];
					b[0].totalSort=dbsql[20];
					b[0].save();

		except:
			return HttpResponse("成绩表格数据错误，请核查。");
		else:
			
			bexam = Exam.objects.get(test=excelhead);

			d=Score.objects.filter(test=bexam).aggregate(Max('total'));
			dlist = Score.objects.filter(test=bexam, total=d['total__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='综合');
				bb[0].score=b.total;
				bb[0].scoreSort=b.totalSort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('maths'));
			dlist = Score.objects.filter(test=bexam, maths=d['maths__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='数学');
				bb[0].score=b.maths;
				bb[0].scoreSort=b.mathsSort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('chinese'));
			dlist = Score.objects.filter(test=bexam, chinese=d['chinese__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='语文');
				bb[0].score=b.chinese;
				bb[0].scoreSort=b.chineseSort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('english'));
			dlist = Score.objects.filter(test=bexam, english=d['english__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='英语');
				bb[0].score=b.english;
				bb[0].scoreSort=b.englishSort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('physics'));
			dlist = Score.objects.filter(test=bexam, physics=d['physics__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='物理');
				bb[0].score=b.physics;
				bb[0].scoreSort=b.physicsSort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('chymistry'));
			dlist = Score.objects.filter(test=bexam, chymistry=d['chymistry__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='化学');
				bb[0].score=b.chymistry;
				bb[0].scoreSort=b.chymistrySort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('biology'));
			dlist = Score.objects.filter(test=bexam, biology=d['biology__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='生物');
				bb[0].score=b.biology;
				bb[0].scoreSort=b.biologySort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('history'));
			dlist = Score.objects.filter(test=bexam, history=d['history__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='历史');
				bb[0].score=b.history;
				bb[0].scoreSort=b.historySort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('politics'));
			dlist = Score.objects.filter(test=bexam, politics=d['politics__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='政治');
				bb[0].score=b.politics;
				bb[0].scoreSort=b.politicsSort;
				bb[0].save();

			d=Score.objects.filter(test=bexam).aggregate(Max('geography'));
			dlist = Score.objects.filter(test=bexam, geography=d['geography__max']);
			for b in dlist:
				bname = Person.objects.get(name=b.name);
				bb=TopList.objects.get_or_create(name=bname,test=bexam,item='地理');
				bb[0].score=b.geography;
				bb[0].scoreSort=b.geographySort;
				bb[0].save();

			return HttpResponse("录入完毕");
	else:
		return render(request, 'web/404.html');

