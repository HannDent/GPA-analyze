from django.shortcuts import render
from Model.models import Course,Person,Exam,Score,TopList
from django.db.models.aggregates import Count
from django.db.models import Min,Max

def analyze(request, a_id=-1):
	if Exam.objects.all().exists():
		listexam = Exam.objects.all();
	else:
		return render(request, 'wrong.html');
		
	dlist = Course.objects.all();
	para = [];
	parm=[];
	for aa in dlist:
		parm.append(aa.itemid);
		para.append([aa.itemid,aa.maxScore,aa.maxSort]);

	testcourse = "";
	parc=[];
	if a_id==-1:
		stg = {'zero':para,'one':parm};
		return render(request, 'analyze.html', stg);
	else:
		testcourse = parm[a_id];

	tot = [];
	for aaa in listexam:
		dat = Course.objects.get(itemid=testcourse).scorecourse.filter(test=aaa);
		parn = [];
		for bb in dat:
			parn.append([remove_zero(bb.score),bb.sort]);
		tot.append({'title':aaa.test, 'time':aaa.time, 'list':parn});

	stg = {'title':testcourse,'zero':para, 'one':tot};
	return render(request, 'analyzetitle.html', stg);

def whole(request, w_id=-1):
	if Exam.objects.all().exists():
		listexam = Exam.objects.all();
	else:
		return render(request, 'wrong.html');
		
	dlist = Course.objects.all();
	para = [];
	parCourse = [];
	for aa in dlist:
		parCourse.append(aa.itemid);
		para.append([aa.itemid,aa.maxScore,aa.maxSort]);

	testexam = "";
	parm=[];
	for bb in listexam:
		parm.append(bb.test);

	if w_id==-1:
		stg = {'zero':para, 'one':parm};
		return render(request, 'whole.html', stg);
	else:
		testexam = parm[w_id];

	parb = [];
	datPerson = Person.objects.all();
	for onePerson in datPerson:
		dat = Exam.objects.get(test=testexam).scoreexam.filter(name=onePerson);
		parn = [onePerson.name]*(len(parCourse)*2+1);
		for bb in dat:
			j=parCourse.index(bb.itemid.itemid);
			parn[j*2+1]=remove_zero(bb.score);
			parn[j*2+2]=bb.sort;
		parb.append(parn);
	stg = {'title':testexam,'zero':para, 'one':parm,'two':parb};
	return render(request, 'wholetitle.html', stg);

def single(request, s_id=-1):
	if Person.objects.all().exists():
		listperson = Person.objects.all();
	else:
		return render(request, 'wrong.html');
		
	dlist = Course.objects.all();
	para = [];
	parCourse = [];
	for aa in dlist:
		parCourse.append(aa.itemid);
		para.append([aa.itemid,aa.maxScore,aa.maxSort]);

	testperson = "";
	parm=[];
	for bb in listperson:
		parm.append(bb.name);

	if s_id==-1:
		stg = {'zero':para,'one':parm};
		return render(request, 'single.html', stg);
	else:
		testperson = parm[s_id];

	parb = [];
	datExam = Exam.objects.all();
	for aa in datExam:
		datPerson = Person.objects.get(name=testperson).scoreperson.filter(test=aa);
		parn = [aa.test]*(len(parCourse)*2+1);
		for bb in datPerson:
			j=parCourse.index(bb.itemid.itemid);
			parn[j*2+1]=remove_zero(bb.score);
			parn[j*2+2]=bb.sort;
		parb.insert(0,parn);

	bb = TopList.objects.all().count();
	aa = Person.objects.get(name=testperson).topperson.all().count();
	
	stg = {'title':testperson,'zero':para,'one':parm,'two':parb, 'a':aa, 'b':bb};
	return render(request, 'singletitle.html', stg);

def remove_zero(num):
    return num.to_integral() if num == num.to_integral() else num.normalize();