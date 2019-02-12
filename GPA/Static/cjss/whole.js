jQuery(document).ready(function(){

//total、totalsort为各科目列表的列表，后期需要排序，不能进行相关计算。rcov为成绩原始排序
    var rcov = new Array();
    var rcos = new Array();

	var total = new Array();
	var totalsort = new Array();
	var totalud = new Array();
	var totalname = new Array("td#total","td#maths","td#chinese","td#english","td#physics","td#chymistry","td#biology","td#history","td#politics","td#geography");
    

//以下三项时雷达图数据
	var testdat = new Array(2);
	testdat[0] = new Array(10);
	testdat[1] = new Array(10);


//以下是读取数据部分
	for(var i=0;i<10;i++){
        var teoplist = new Array();
        var tepplist = new Array();
        rcov.push(teoplist);
        rcos.push(tepplist);

		var templist = new Array();
		var tenplist = new Array();
		var teiplist = new Array();
		total.push(templist);
		totalsort.push(tenplist);
		totalud.push(teiplist);
	}

    jQuery("td.name").each(function(){
        rcov[0].push(Number(jQuery(this).parent().find("td.total").text()));
        rcov[1].push(Number(jQuery(this).parent().find("td.maths").text()));
        rcov[2].push(Number(jQuery(this).parent().find("td.chinese").text()));
        rcov[3].push(Number(jQuery(this).parent().find("td.english").text()));
        rcov[4].push(Number(jQuery(this).parent().find("td.physics").text()));
        rcov[5].push(Number(jQuery(this).parent().find("td.chymistry").text()));
        rcov[6].push(Number(jQuery(this).parent().find("td.biology").text()));
        rcov[7].push(Number(jQuery(this).parent().find("td.history").text()));
        rcov[8].push(Number(jQuery(this).parent().find("td.politics").text()));
        rcov[9].push(Number(jQuery(this).parent().find("td.geography").text()));

    	total[0].push(Number(jQuery(this).parent().find("td.total").text()));
    	total[1].push(Number(jQuery(this).parent().find("td.maths").text()));
    	total[2].push(Number(jQuery(this).parent().find("td.chinese").text()));
    	total[3].push(Number(jQuery(this).parent().find("td.english").text()));
    	total[4].push(Number(jQuery(this).parent().find("td.physics").text()));
    	total[5].push(Number(jQuery(this).parent().find("td.chymistry").text()));
    	total[6].push(Number(jQuery(this).parent().find("td.biology").text()));
    	total[7].push(Number(jQuery(this).parent().find("td.history").text()));
    	total[8].push(Number(jQuery(this).parent().find("td.politics").text()));
    	total[9].push(Number(jQuery(this).parent().find("td.geography").text()));

        rcos[0].push(Number(jQuery(this).parent().find("td.totalSort").text()));
        rcos[1].push(Number(jQuery(this).parent().find("td.mathsSort").text()));
        rcos[2].push(Number(jQuery(this).parent().find("td.chineseSort").text()));
        rcos[3].push(Number(jQuery(this).parent().find("td.englishSort").text()));
        rcos[4].push(Number(jQuery(this).parent().find("td.physicsSort").text()));
        rcos[5].push(Number(jQuery(this).parent().find("td.chymistrySort").text()));
        rcos[6].push(Number(jQuery(this).parent().find("td.biologySort").text()));
        rcos[7].push(Number(jQuery(this).parent().find("td.historySort").text()));
        rcos[8].push(Number(jQuery(this).parent().find("td.politicsSort").text()));
        rcos[9].push(Number(jQuery(this).parent().find("td.geographySort").text()));

    	totalsort[0].push(Number(jQuery(this).parent().find("td.totalSort").text()));
    	totalsort[1].push(Number(jQuery(this).parent().find("td.mathsSort").text()));
    	totalsort[2].push(Number(jQuery(this).parent().find("td.chineseSort").text()));
    	totalsort[3].push(Number(jQuery(this).parent().find("td.englishSort").text()));
    	totalsort[4].push(Number(jQuery(this).parent().find("td.physicsSort").text()));
    	totalsort[5].push(Number(jQuery(this).parent().find("td.chymistrySort").text()));
    	totalsort[6].push(Number(jQuery(this).parent().find("td.biologySort").text()));
    	totalsort[7].push(Number(jQuery(this).parent().find("td.historySort").text()));
    	totalsort[8].push(Number(jQuery(this).parent().find("td.politicsSort").text()));
    	totalsort[9].push(Number(jQuery(this).parent().find("td.geographySort").text()));
		
		totalud[0].push(Number(jQuery(this).parent().find("td.totalSort").text()));
    	totalud[1].push(Number(jQuery(this).parent().find("td.mathsSort").text()));
    	totalud[2].push(Number(jQuery(this).parent().find("td.chineseSort").text()));
    	totalud[3].push(Number(jQuery(this).parent().find("td.englishSort").text()));
    	totalud[4].push(Number(jQuery(this).parent().find("td.physicsSort").text()));
    	totalud[5].push(Number(jQuery(this).parent().find("td.chymistrySort").text()));
    	totalud[6].push(Number(jQuery(this).parent().find("td.biologySort").text()));
    	totalud[7].push(Number(jQuery(this).parent().find("td.historySort").text()));
    	totalud[8].push(Number(jQuery(this).parent().find("td.politicsSort").text()));
    	totalud[9].push(Number(jQuery(this).parent().find("td.geographySort").text()));
    });

//以下是填入表格数据
    for(var i=0;i<10;i++){
		total[i].sort(numsortu);
		totalsort[i].sort(numsortd);
		totalud[i].sort(numsortu);

		var zws = total[i][Math.floor(total[i].length/2)];
		var pjs = numavg(total[i]);
		var fcvar = numvar(total[i]);


		var pjsus = 0;
		var pjsds = 0;
		for(var j=0;j<total[i].length;j++){
			if(total[i][j]<pjs){
				pjsus = totalsort[i][j];
			}else{
				pjsds = totalsort[i][j];
				break;
			}
		}

		var zwssort = totalsort[i][Math.floor(totalsort[i].length/2)];
		var pjssort = Math.round((pjsus+pjsds)/2);
		var distribution = (Math.sqrt(fcvar)/pjs).toFixed(3);

		var listscore = new Array(zws, zwssort, pjs, pjssort, distribution);
		for(var j=0;j<listscore.length;j++){
			jQuery(totalname[i]+String(j)).text(String(listscore[j]));
		}
        //以下是导入雷达图数据
		testdat[0][i]=zwssort;
		testdat[1][i]=pjssort;
	}
//------------------以下是计算相关系数部分--------------------------

    var matrix = new Array();
    var matrixname = new Array("td#tota","td#math","td#chin","td#engl","td#phys","td#chym","td#biol","td#hist","td#poli","td#geog");

    for(var i=0;i<10;i++){
        var teoplist = new Array(1,1,1,1,1,1,1,1,1,1);
        matrix.push(teoplist);
    }
    for(var i=0;i<matrix.length;i++){
        for(var j=0;j<i;j++){
            var covno = numcov(rcov[i], rcov[j])
            matrix[i][j]=covno;
            matrix[j][i]=covno;
        }
    }
    for(var i=0;i<matrixname.length;i++){
        for(var j=0;j<matrix[i].length;j++){
            jQuery(matrixname[i]+String(j)).text(matrix[i][j]);
        }
    }

    var matri = new Array();
    var matriname = new Array("td#tot","td#mat","td#chi","td#eng","td#phy","td#chy","td#bio","td#his","td#pol","td#geo");

    for(var i=0;i<10;i++){
        var teoplist = new Array(1,1,1,1,1,1,1,1,1,1);
        matri.push(teoplist);
    }
    for(var i=0;i<matri.length;i++){
        for(var j=0;j<i;j++){
            var covno = numcov(rcos[i], rcos[j])
            matri[i][j]=covno;
            matri[j][i]=covno;
        }
    }
    for(var i=0;i<matriname.length;i++){
        for(var j=0;j<matri[i].length;j++){
            jQuery(matriname[i]+String(j)).text(matri[i][j]);
        }
    }


//------------------以下是雷达图部分--------------------------
    var domtest = document.getElementById("cavtest");
    var mytest = echarts.init(domtest);

    var test = new Array("中位数年级排名", "平均数数年级排名");

    var testdatb = new Array();
    for (var i=0;i<test.length;i++){
        testdatb.push({value:testdat[i],name:test[i]});
    }


optiontest = {
    title: {
        text: '各科对比'
    },
    tooltip: {},
    legend: {
        data: test,
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: '综合', min:700, max:1300},
           { name: '数学', min:700, max:1300},
           { name: '语文', min:700, max:1300},
           { name: '英语', min:700, max:1300},
           { name: '物理', min:700, max:1300},
           { name: '化学', min:700, max:1300},
           { name: '生物', min:700, max:1300},
           { name: '历史', min:700, max:1300},
           { name: '政治', min:700, max:1300},
           { name: '地理', min:700, max:1300},
        ]
    },
    series: [{
        name: '各科对比',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : testdatb
    }]
};
if (optiontest && typeof optiontest === "object") {
    mytest.setOption(optiontest, true);
}
//------------------以下是多科目分布图部分--------------------------
    var uptodown = new Array();

    var dommuti = document.getElementById("cavmuti");
    var mymuti = echarts.init(dommuti);

    var minmu=100;
    var maxmu=1500;
    var stepmu=200;
    var mutix = new Array();
    mutix.push("[1~"+String(minmu)+")");

    var mutii=minmu;
    while(mutii<maxmu){
        mutix.push("["+String(mutii)+"~"+String(mutii+stepmu)+")");
        mutii = mutii+stepmu;
    }
    mutix.push("["+String(maxmu)+"~∞)");

    var mutilist = new Array();

    for(var i=0;i<totalud.length;i++){
        var tempmuti = new Array();
        var lk=0;
        var countmu=0;
        for(var j=0;j<totalud[i].length;j++){
            if(totalud[i][j]<minmu+lk*stepmu){
                countmu = countmu+1;
            }else{
                while(totalud[i][j]>=minmu+lk*stepmu){
                    tempmuti.push(countmu);
                    countmu=0;
                    lk = lk+1;
                }
                countmu = 1;
            }
        }
        if(countmu!=0){
            tempmuti.push(countmu);
        }
        var xxx=0;
        for(var j=tempmuti.length-1;j>7;j--){
            xxx = xxx+tempmuti.pop();
        }
        tempmuti.push(xxx);

        mutilist.push(tempmuti);
    }
optionmuti = {
    title : {
        text: '各科目分布',
        subtext: '依据年级排名'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['综合','数学','语文','英语','物理','化学','生物','历史','政治','地理'],
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : mutix,
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'综合',
            type:'bar',
            data:mutilist[0],
        },
        {
            name:'数学',
            type:'bar',
            data:mutilist[1],
        },{
            name:'语文',
            type:'bar',
            data:mutilist[2],
        },{
            name:'英语',
            type:'bar',
            data:mutilist[3],
        },{
            name:'物理',
            type:'bar',
            data:mutilist[4],
        },{
            name:'化学',
            type:'bar',
            data:mutilist[5],
        },{
            name:'生物',
            type:'bar',
            data:mutilist[6],
        },{
            name:'历史',
            type:'bar',
            data:mutilist[7],
        },{
            name:'政治',
            type:'bar',
            data:mutilist[8],
        },{
            name:'地理',
            type:'bar',
            data:mutilist[9],
        },
    ]
};
if (optionmuti && typeof optionmuti === "object") {
    mymuti.setOption(optionmuti, true);
}

//------------------以下是分布图部分--------------------------

	gaosi("cavtot", "综合", total[0]);
	gaosi("cavmat", "数学", total[1]);
	gaosi("cavchi", "语文", total[2]);
	gaosi("caveng", "英语", total[3]);
	gaosi("cavphy", "物理", total[4]);
	gaosi("cavchy", "化学", total[5]);
	gaosi("cavbio", "生物", total[6]);
	gaosi("cavhis", "历史", total[7]);
	gaosi("cavpol", "政治", total[8]);
	gaosi("cavgeo", "地理", total[9]);

	jQuery("span#aatot").text(String(numbs(total[0])));
	jQuery("span#aamat").text(String(numbs(total[1])));
	jQuery("span#aachi").text(String(numbs(total[2])));
	jQuery("span#aaeng").text(String(numbs(total[3])));
	jQuery("span#aaphy").text(String(numbs(total[4])));
	jQuery("span#aachy").text(String(numbs(total[5])));
	jQuery("span#aabio").text(String(numbs(total[6])));
	jQuery("span#aahis").text(String(numbs(total[7])));
	jQuery("span#aapol").text(String(numbs(total[8])));
	jQuery("span#aageo").text(String(numbs(total[9])));

//it's end
});

function numsortu(a,b)
{
 	return a - b;
}
function numsortd(a,b)
{
 	return b - a;
}

function numavg(a)//平均数
{
	var sum = 0;
	for(var i=0;i<a.length;i++){
		sum = sum + a[i];
	}
	var avg = sum/a.length;
	avg = avg.toFixed(3);
 	return avg;
}

function numvar(a)//方差
{
	var avg = numavg(a);
	var iance = 0;
 	for(var i=0;i<a.length;i++){
		var chacha = a[i]-avg;
		iance = iance + chacha*chacha/(a.length-1);
	}
 	return iance.toFixed(2);
}

function numbs(a)//偏度 三阶中心距
{
	var avg = numavg(a);
	var iance = 0;
 	for(var i=0;i<a.length;i++){
		var chacha = a[i]-avg;
		iance = iance + chacha*chacha*chacha;
	}
	iance = iance/(a.length-1);
 	return iance.toFixed(2);
}

function numcov(a, b)//相关系数
{
    if(a.length!=b.length){
        return 0;
    }
    var newlist = new Array();
    for(var i=0;i<a.length;i++){
        newlist.push(a[i]+b[i]);
    }
    var dxx = numvar(a);
    var dyy = numvar(b);
    var iance = (numvar(newlist)-dxx-dyy)/2/Math.sqrt(dxx*dyy);
    return iance.toFixed(2);
}

function gaosi(cav, ati, bli)
{
	var domtest = document.getElementById(cav);
    var mytest = echarts.init(domtest);

    var minn = bli[1];
    var maxn = bli[bli.length-2];
    var stepn = Math.ceil((maxn-minn)/8);
    var data = new Array();
    var datax = new Array();

    var j=0;
    var tempn=0;
    for(var i=0;i<bli.length-1;i++){
    	if(bli[i]<minn+j*stepn){
    		tempn = tempn+1;
    	}else{
    		while(bli[i]>=minn+j*stepn){
    			data.push(tempn);
    			datax.push(String(minn+j*stepn));
    			tempn=0;
    			j = j+1;
    		}
    		tempn = 1;
    	}
    }
    if(tempn!=0){
        datax.push(String(minn+j*stepn));
        data.push(tempn);
    }
    datax.push("["+String(minn+j*stepn)+"~∞)");
    data.push(1);

    var i=datax.length-2;
    while(i>0){
    	datax[i] = "["+datax[i-1]+"~"+datax[i]+")";
    	i=i-1;
    }
    datax[0] = "[0~"+datax[0]+")";


option = {
    color: ['#3398DB'],
    title: {
        text: ati,
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : datax,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'区间人数',
            type:'bar',
            barWidth: '50%',
            data:data,
        }
    ]
};
if (option && typeof option === "object") {
    mytest.setOption(option, true);
}

}