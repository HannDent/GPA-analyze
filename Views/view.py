from django.shortcuts import render
from Model.models import Course,TopList,Exam
from django.db.models import Min

def index(request):
	if Exam.objects.all().exists():
		dlist = Course.objects.all();
	else:
		return render(request, 'wrong.html');
		
	data = Exam.objects.first().topexam.all();
	
	parm=[];
	for bb in data:
		parmone = [bb.name.name+':'+bb.itemid.itemid+'第一',bb.test.test+'次考试,分数'+str(remove_zero(bb.score))+',年级'+str(bb.sort)+'名'];
		parm.append(parmone);

	parb=[];
	for aa in dlist:
		dat = TopList.objects.filter(itemid=aa).aggregate(Min('sort'));
		datb = TopList.objects.filter(itemid=aa, sort=dat['sort__min']);
		for bb in datb:
			parbone = [bb.name.name+':'+bb.itemid.itemid+'记录',bb.test.test+'次考试,分数'+str(remove_zero(bb.score))+',年级'+str(bb.sort)+'名'];
			parb.append(parbone);

	stg = {'one':parm,'two':parb};
	return render(request, 'index.html', stg);

def toplist(request):
	dlist = Course.objects.all();
	para = [];
	for aa in dlist:
		para.append([aa.itemid,aa.maxScore,aa.maxSort]);
	parm = [];
	dat = TopList.objects.all();
	for bb in dat:
		thisname = "*"+str(bb.name.name)[1:];
		thisname = bb.name.name;
		parb = [bb.test.test,thisname,bb.itemid.itemid,remove_zero(bb.score),bb.sort];
		parm.append(parb);
	stg = {'zero':para, 'one':parm};
	return render(request, 'toplist.html',stg);

def info(request):
	return render(request, 'info.html');

def browser(request):
	return render(request, 'web/browser.html');
	
def remove_zero(num):
    return num.to_integral() if num == num.to_integral() else num.normalize();