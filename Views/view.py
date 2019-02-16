from django.shortcuts import render
from Model.models import TopList,Exam
from django.db.models import Min

def index(request):
	if Exam.objects.all().exists():
		dat = Exam.objects.first().topexam.all();
	else:
		return render(request, 'wrong.html');

	iteb=['综合','数学','语文','英语','物理','化学','生物','历史','政治','地理'];
	parm=[['综合第一',''],['数学第一',''],['语文第一',''],['英语第一',''],['物理第一',''],['化学第一',''],['生物第一',''],['历史第一',''],['政治第一',''],['地理第一','']];
	parb=[['综合记录',''],['数学记录',''],['语文记录',''],['英语记录',''],['物理记录',''],['化学记录',''],['生物记录',''],['历史记录',''],['政治记录',''],['地理记录','']];
	for bb in dat:
		thisname = "*"+str(bb.name.name)[1:];
		thisname = bb.name.name;
		if bb.item==iteb[0]:
			parm[0][0]=parm[0][0]+'('+thisname+')';
			if len(parm[0][1])<10:
				parm[0][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[1]:
			parm[1][0]=parm[1][0]+'('+thisname+')';
			if len(parm[1][1])<10:
				parm[1][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[2]:
			parm[2][0]=parm[2][0]+'('+thisname+')';
			if len(parm[2][1])<10:
				parm[2][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[3]:
			parm[3][0]=parm[3][0]+'('+thisname+')';
			if len(parm[3][1])<10:
				parm[3][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[4]:
			parm[4][0]=parm[4][0]+'('+thisname+')';
			if len(parm[4][1])<10:
				parm[4][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[5]:
			parm[5][0]=parm[5][0]+'('+thisname+')';
			if len(parm[5][1])<10:
				parm[5][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[6]:
			parm[6][0]=parm[6][0]+'('+thisname+')';
			if len(parm[6][1])<10:
				parm[6][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[7]:
			parm[7][0]=parm[7][0]+'('+thisname+')';
			if len(parm[7][1])<10:
				parm[7][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[8]:
			parm[8][0]=parm[8][0]+'('+thisname+')';
			if len(parm[8][1])<10:
				parm[8][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		elif bb.item==iteb[9]:
			parm[9][0]=parm[9][0]+'('+thisname+')';
			if len(parm[9][1])<10:
				parm[9][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';
		else:
			print('-------------wrong------------');

	bbloop=0;
	for oneb in iteb:
		d = TopList.objects.filter(item=oneb).aggregate(Min('scoreSort'));
		dat = TopList.objects.filter(item=oneb, scoreSort=d['scoreSort__min']);

		for bb in dat:
			thisname = "*"+str(bb.name.name)[1:];
			thisname = bb.name.name;
			parb[bbloop][0]=parb[bbloop][0]+'('+thisname+')';
			if len(parb[bbloop][1])<10:
				parb[bbloop][1]=bb.test.test+'次考试,分数'+str(bb.score)+',年级'+str(bb.scoreSort)+'名';

		bbloop = bbloop+1;

	stg = {'one':parm,'two':parb};
	return render(request, 'index.html', stg);

def toplist(request):
	parm = [];
	dat = TopList.objects.all();
	for bb in dat:
		thisname = "*"+str(bb.name.name)[1:];
		thisname = bb.name.name;
		parb = [bb.test.test,thisname,bb.item,bb.score,bb.scoreSort];
		parm.append(parb);
	stg = {'one':parm};
	return render(request, 'toplist.html',stg);

def info(request):
	return render(request, 'info.html');

def browser(request):
	return render(request, 'web/browser.html');