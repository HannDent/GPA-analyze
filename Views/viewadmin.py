from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models import Max,Min
from Model.models import Course,Person,Exam,Score,TopList,Regression
import json
import math

@login_required(login_url='/admin/login')
def excelitem(request):
    return render(request, 'excelitem.html');
@login_required(login_url='/admin/login')
def excelperson(request):
    return render(request, 'excelperson.html');
@login_required(login_url='/admin/login')
def excelscore(request):
    return render(request, 'excelscore.html');

@login_required(login_url='/admin/login')
def itempost(request):
    if Course.objects.count()!=0:
        return HttpResponse("科目早已设定，重置前禁止设定。");
    if request.method == "POST":
        jsons = request.POST['da'];
        item = jsons.split("`@");
        if len(item[-1])<2:
            item.pop();
        try:
            with transaction.atomic():
                for oneitem in item:
                    dbsql = oneitem.split("`");
                    b=Course.objects.get_or_create(itemid=dbsql[0]);
                    b[0].maxScore=dbsql[1];
                    b[0].maxSort=dbsql[2];
                    b[0].save();
        except:
            return HttpResponse("科目表格数据错误，请核查。");
        else:
            return HttpResponse("录入完毕");
    else:
        return render(request, 'web/404.html');

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
                    b[0].kRegression = 0.000;
                    b[0].eRegression = 0;
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
        dlist = Course.objects.all();
        try:
            with transaction.atomic():
                Exam.objects.update_or_create(test=excelhead);
                dexam = Exam.objects.get(test=excelhead);
                for oneitem in item:
                    dbsql = oneitem.split(":");
                    dname = Person.objects.get(name=dbsql[0]);

                    dbss = dbsql[1].split("`");
                    for countCourse in range(0,len(dlist)):
                        b=Score.objects.get_or_create(name=dname,test=dexam,itemid=dlist[countCourse]);
                        b[0].score=dbss[countCourse*2];
                        b[0].sort=dbss[countCourse*2+1];
                        b[0].save();

        except:
            return HttpResponse("成绩表格数据错误，请核查。");
        else:
            dexam = Exam.objects.get(test=excelhead);
            for aa in dlist:
                dat = Score.objects.filter(test=dexam, itemid=aa).aggregate(Min('sort'));
                datb = Score.objects.filter(test=dexam, itemid=aa, sort=dat['sort__min']);
                for bb in datb:
                    try:
                        with transaction.atomic():
                            cc=TopList.objects.get_or_create(name=bb.name,test=dexam,itemid=aa);
                            cc[0].score=bb.score;
                            cc[0].sort=bb.sort;
                            cc[0].save();
                    except:
                        return HttpResponse("英雄榜计算出错，联系管理员");

            people = Person.objects.all();
            allCourse = Course.objects.all();
            for pCourse in allCourse:
                pExam = Exam.objects.filter(id__lte=dexam.id);
                xR = range(len(pExam));
                yR = [];
                for onepeople in people:
                    yR.clear();
                    pScore = Score.objects.filter(name=onepeople, test__lte=dexam.id, itemid=pCourse);
                    for oneScore in pScore:
                        yR.append(oneScore.sort);

                    xb = sum(xR)/len(xR);
                    yb = sum(yR)/len(yR);
                    suma = 0;
                    sumb = 0;
                    e = 0;
                    k = 0;
                    b = 0;
                    for i in range(len(pExam)):
                        suma = suma + (xR[i]-xb)*(yR[i]-yb);
                        sumb = sumb + (xR[i]-xb)*(xR[i]-xb);
                    if sumb!=0:
                        k=suma/sumb;
                    b=yb-k*xb;
                    for i in range(len(pExam)):
                        e = e + (k*xR[i]+b-yR[i])*(k*xR[i]+b-yR[i]);
                    if len(pExam)>2:
                        e = e/(len(pExam)-2);
                    e = math.sqrt(e);

                    try:
                        with transaction.atomic():
                            dd=Regression.objects.get_or_create(name=onepeople, test=dexam, itemid=pCourse);
                            dd[0].kRegression=k;
                            dd[0].eRegression=e;
                            dd[0].save();
                    except:
                        return HttpResponse("线性回归计算错误，联系管理员");


            return HttpResponse("录入完毕");
    else:
        return render(request, 'web/404.html');

