from django.shortcuts import render
from django.shortcuts import HttpResponse
from Model.models import Course,Groups,Person,Exam,Score,TopList,Regression
from django.db.models.aggregates import Count
from django.db.models import Min,Max
import json

def analyze(request, a_id=-1, g_id=0):
    if Exam.objects.all().exists():
        listexam = Exam.objects.all();
    else:
        return render(request, 'wrong.html');
        
    dlist = Course.objects.all();
    glist = Groups.objects.all();
    para = [];
    parm=[];
    for aa in dlist:
        parm.append(aa.itemid);
        para.append([aa.itemid,aa.maxScore,aa.maxSort]);

    parc=[];
    if a_id==-1:
        parg = [];
        for aaa in glist:
            parg.append(aaa.kurasu);
        stg = {'zero':para,'one':parm,'two':parg};
        return render(request, 'analyze.html', stg);

    tot = [];
    for aaa in listexam:
        dat = Score.objects.filter(test=aaa,itemid=dlist[a_id]).filter(name__kurasu=glist[g_id]);
        parn = [];
        for bb in dat:
            parn.append([remove_zero(bb.score),bb.sort]);
        tot.append({'title':aaa.test, 'time':aaa.time, 'list':parn});

    stg = {'item':parm[a_id],'group':glist[g_id].kurasu,'zero':para, 'one':tot};
    return render(request, 'analyzetitle.html', stg);

def whole(request, w_id=-1, g_id=0):
    if Exam.objects.all().exists():
        listexam = Exam.objects.all();
    else:
        return render(request, 'wrong.html');
        
    dlist = Course.objects.all();
    glist = Groups.objects.all();
    para = [];
    parCourse = [];
    for aa in dlist:
        parCourse.append(aa.itemid);
        para.append([aa.itemid,aa.maxScore,aa.maxSort]);

    parm=[];
    for bb in listexam:
        parm.append(bb.test);
        
    datPerson = Person.objects.all();

    if w_id==-1:
        part = [];
        parg = [];
        for aaa in glist:
            parg.append(aaa.kurasu);
        totle = Course.objects.latest('id');
        for onePerson in datPerson:
            datscore = Person.objects.get(name=onePerson).scoreperson.filter(itemid=totle);
            avg = 0;
            for onescore in datscore:
                avg = avg+onescore.sort;
            avg = avg/len(datscore);
            part.append([onePerson.name, avg]);
        for i in range(len(part)):
            key = part[i];
            j=i-1;
            while j>=0 and key[1]< part[j][1]:
                part[j+1] = part[j];
                j = j-1;
            part[j+1] = key;
        stg = {'zero':para, 'one':parm, 'two':parg,'three':part};
        return render(request, 'whole.html', stg);

    datPerson = Person.objects.filter(kurasu=glist[g_id]);
    parb = [];
    for onePerson in datPerson:
        dat = Score.objects.filter(test=listexam[w_id],name=onePerson);
        parn = [onePerson.name]*(len(parCourse)*2+1);
        for bb in dat:
            j=parCourse.index(bb.itemid.itemid);
            parn[j*2+1]=remove_zero(bb.score);
            parn[j*2+2]=bb.sort;
        parb.append(parn);
    stg = {'exam':parm[w_id],'group':glist[g_id].kurasu,'zero':para, 'one':parm,'two':parb};
    return render(request, 'wholetitle.html', stg);

def group(request):
    para = [];
    parone = [];
    partwo = [];
    parthr = [];
    
    glist = Groups.objects.all();
    for aa in glist:
        parone.append(aa.kurasu);

    dlist = Course.objects.all();
    for aa in dlist:
        partwo.append(aa.itemid);
        para.append([aa.itemid,aa.maxScore,aa.maxSort]);
    
    elist = Exam.objects.all();
    for aa in elist:
        parthr.append(aa.test);
        
    stg = {'zero':para,'one':parone,'two':partwo,'three':parthr};
    return render(request, 'group.html', stg);

def asyn(request,g_id=0,i_id=0,e_id=0):
    glist = Groups.objects.all();
    ilist = Course.objects.all();
    elist = Exam.objects.all();
    
    parm = [];
    parn = [];
    for i in range(e_id,len(elist)):
        parn.append(elist[i].test);
        para = [];
        parb = [];
        dat = Score.objects.filter(name__kurasu=glist[g_id],itemid=ilist[i_id],test=elist[i]);
        for aa in dat:
            para.append(float(aa.score));
            parb.append(aa.sort);
        parm.append([para,parb]);
        
    return HttpResponse(json.dumps([parm,parn]));

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
    for ee in range(len(listperson)):
        datPerson = Person.objects.get(name=listperson[ee].name).regperson.filter(test=Exam.objects.latest("id"));
        parn = [0]*(len(parCourse)*2);
        for ff in datPerson:
            j=parCourse.index(ff.itemid.itemid);
            parn[j*2]=ff.kRegression;
            parn[j*2+1]=ff.eRegression;
        parm.append([[ee,listperson[ee].name],parn]);

    if s_id==-1:
        stg = {'zero':para,'one':parm,'item':parCourse};
        return render(request, 'single.html', stg);
    else:
        testperson = parm[s_id][0][1];

    parb = [];
    parc = [];
    datExam = Exam.objects.all();
    for aa in datExam:
        parp = [aa.test]*(len(parCourse)*2+1);
        datScore = Person.objects.get(name=testperson).scoreperson.filter(test=aa);
        for bb in datScore:
            j=parCourse.index(bb.itemid.itemid);
            parp[j*2+1]=remove_zero(bb.score);
            parp[j*2+2]=bb.sort;
        parb.insert(0,parp);
        
        parq = [aa.test]*(len(parCourse)*2+1);
        datRegression = Person.objects.get(name=testperson).regperson.filter(test=aa);
        for bb in datRegression:
            j=parCourse.index(bb.itemid.itemid);
            parq[j*2+1]=remove_zero(bb.kRegression);
            parq[j*2+2]=bb.eRegression;
        parc.insert(0,parq);

    bbno = TopList.objects.all().count();
    aano = Person.objects.get(name=testperson).topperson.all().count();
    
    stg = {'title':testperson,'zero':para, 'two':parb, 'three':parc,'a':aano, 'b':bbno};
    return render(request, 'singletitle.html', stg);

def remove_zero(num):
    return num.to_integral() if num == num.to_integral() else num.normalize();