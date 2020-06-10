from django.shortcuts import render
from Model.models import Course,Person,Exam,Score,TopList,Regression
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
        
    datPerson = Person.objects.all();

    if w_id==-1:
        part = [];
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
        stg = {'zero':para, 'one':parm, 'two':part};
        return render(request, 'whole.html', stg);
    else:
        testexam = parm[w_id];

    parb = [];
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