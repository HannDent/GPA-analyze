from django.shortcuts import render
from Model.models import Person,Exam,Score,TopList
from django.db.models.aggregates import Count
from django.db.models import Min,Max

def analyze(request, a_id=-1):
	if Exam.objects.all().exists():
		listexam = Exam.objects.all();
	else:
		return render(request, 'wrong.html');

	parm = [];
	parc = [];
	parn = [];
	for bb in listexam:
		parm.append(bb.test);
		parc.append(bb.time);

	if a_id==-1:
		return render(request, 'analyze.html');
	elif a_id==0:
		testexam = "综合";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.total, cc.totalSort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==1:
		testexam = "数学";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.maths, cc.mathsSort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==2:
		testexam = "语文";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.chinese, cc.chineseSort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==3:
		testexam = "英语";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.english, cc.englishSort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==4:
		testexam = "物理";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.physics, cc.physicsSort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==5:
		testexam = "化学";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.chymistry, cc.chymistrySort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==6:
		testexam = "生物";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.biology, cc.biologySort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==7:
		testexam = "历史";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.history, cc.historySort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==8:
		testexam = "政治";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.politics, cc.politicsSort];
				parb.append(parv);
			parn.append(parb);
	elif a_id==9:
		testexam = "生物";
		for bb in listexam:
			aa = bb.scoreexam.all();
			parb=[];
			for cc in aa:
				parv = [cc.geography, cc.geographySort];
				parb.append(parv);
			parn.append(parb);

	tot = [];
	i=0;
	for aaa in parm:
		tot.append({'title':aaa, 'time':parc[i], 'list':parn[i]});
		i = i+1;

	stg = {'title':testexam,'one':tot};
	return render(request, 'analyzetitle.html', stg);

def whole(request, w_id=-1):
	if Exam.objects.all().exists():
		listexam = Exam.objects.all();
	else:
		return render(request, 'wrong.html');

	testexam = "";

	parm=[];
	for bb in listexam:
		parm.append(bb.test);

	if w_id==-1:
		stg = {'one':parm};
		return render(request, 'whole.html', stg);
	else:
		testexam = parm[w_id];

	dat = Exam.objects.get(test=testexam).scoreexam.all();
	parb = [];
	for bb in dat:
		thisname = "*"+str(bb.name.name)[1:];
		thisname = bb.name.name;
		parn = [thisname,bb.maths,bb.mathsSort,bb.chinese,bb.chineseSort,bb.english,bb.englishSort,bb.physics,bb.physicsSort,bb.chymistry,bb.chymistrySort,bb.biology,bb.biologySort,bb.history,bb.historySort,bb.politics,bb.politicsSort,bb.geography,bb.geographySort,bb.total,bb.totalSort];
		parb.append(parn);
	
	stg = {'title':testexam,'one':parm,'two':parb};
	return render(request, 'wholetitle.html', stg);

def single(request, s_id=-1):
	if Person.objects.all().exists():
		listperson = Person.objects.all();
	else:
		return render(request, 'wrong.html');

	testperson = "";

	parm=[];
	parc=[];
	for bb in listperson:
		parm.append(bb.name);
		thisname = "*"+str(bb.name)[1:];
		thisname = bb.name;
		parc.append(thisname);

	if s_id==-1:
		stg = {'one':parc};
		return render(request, 'single.html', stg);
	else:
		testperson = parm[s_id];

	dat = Person.objects.get(name=testperson).scoreperson.all();
	parb = [];
	for bb in dat:
		parn = [bb.test.test,bb.maths,bb.mathsSort,bb.chinese,bb.chineseSort,bb.english,bb.englishSort,bb.physics,bb.physicsSort,bb.chymistry,bb.chymistrySort,bb.biology,bb.biologySort,bb.history,bb.historySort,bb.politics,bb.politicsSort,bb.geography,bb.geographySort,bb.total,bb.totalSort];
		parb.append(parn);

	bb = TopList.objects.all().count();
	aa = Person.objects.get(name=testperson).topperson.all().count();
	
	thisname = "*"+testperson[1:];
	thisname = testperson;
	
	stg = {'title':thisname,'one':parc,'two':parb, 'a':aa, 'b':bb};
	return render(request, 'singletitle.html', stg);