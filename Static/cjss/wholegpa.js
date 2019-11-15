jQuery(document).ready(function(){
//设定的科目列表 以及科目分值人数
	var itemid = new Array();
	var maxSort = new Array();
	jQuery("li.item").each(function(){
		itemid.push(jQuery(this).text());
	});
	jQuery("li.maxSort").each(function(){
		maxSort.push(Number(jQuery(this).text()));
	});

//total、totalsort为各科目列表的列表，后期需要排序，不能进行相关计算。rcov为成绩原始排序
    var rcov = new Array();
    var rcos = new Array();

	var total = new Array();
	var totalsort = new Array();
	var totalud = new Array();

//以下三项是雷达图数据
	var testdat = new Array(2);
	testdat[0] = new Array(itemid.length);
	testdat[1] = new Array(itemid.length);


//以下是读取数据部分
	for(var i=0;i<itemid.length;i++){
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

    jQuery("td.n0").each(function(){
		for(var i=0;i<itemid.length;i++){
			j = "td.n"+(i*2+1).toString();
			rcov[i].push(Number(jQuery(this).parent().find(j).text()));
			total[i].push(Number(jQuery(this).parent().find(j).text()));
			
			j = "td.n"+(i*2+2).toString();
			rcos[i].push(Number(jQuery(this).parent().find(j).text()));
			totalsort[i].push(Number(jQuery(this).parent().find(j).text()));
			totalud[i].push(Number(jQuery(this).parent().find(j).text()));
		}
    });

//以下是填入表格数据
    for(var i=0;i<itemid.length;i++){
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

		var listscore = new Array(zws, pjs, zwssort, pjssort, distribution);
		for(var j=0;j<listscore.length;j++){
			jstr = "td#p"+String(j+1)+String(i+1);
			jQuery(jstr).text(String(listscore[j]));
		}
        //以下是导入雷达图数据
		testdat[0][i]=zwssort;
		testdat[1][i]=pjssort;
	}
//------------------以下是计算相关系数部分--------------------------

    var matrix = new Array();
    for(var i=0;i<itemid.length;i++){
        var teoplist = new Array(itemid.length);
        matrix.push(teoplist);
    }
    for(var i=0;i<matrix.length;i++){
        for(var j=0;j<i;j++){
            var covno = numcov(rcov[i], rcov[j])
            matrix[i][j]=covno;
            matrix[j][i]=covno;
        }
    }
    for(var i=0;i<matrix.length;i++){
        for(var j=0;j<matrix[i].length;j++){
            jQuery("td#a"+String(i+1)+"a"+String(j+1)).text(matrix[i][j]);
        }
    }

    var matri = new Array();
    for(var i=0;i<itemid.length;i++){
        var teoplist = new Array(itemid.length);
        matri.push(teoplist);
    }
    for(var i=0;i<matri.length;i++){
        for(var j=0;j<i;j++){
            var covno = numcov(rcos[i], rcos[j])
            matri[i][j]=covno;
            matri[j][i]=covno;
        }
    }
    for(var i=0;i<matrix.length;i++){
        for(var j=0;j<matri[i].length;j++){
            jQuery("td#b"+String(i+1)+"b"+String(j+1)).text(matri[i][j]);
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
	
	var testjson = new Array();
	for(var i=0;i<itemid.length;i++){
		var oneitem= {name:itemid[i],min:0,max:maxSort[i]};
		testjson.push(oneitem);
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
        indicator: testjson
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
    var stepmu=100;
    var mutix = new Array();
    mutix.push("[1~"+String(minmu)+")");

    var mutii=minmu;
    while(mutii<maxmu){
        mutix.push("["+String(mutii)+"~"+String(mutii+stepmu)+")");
        mutii = mutii+stepmu;
    }
    mutix.push("["+String(mutii)+"~∞)");

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
        for(var j=tempmuti.length-1;j>parseInt((maxmu-minmu)/stepmu);j--){
            xxx = xxx+tempmuti.pop();
        }
        tempmuti.push(xxx);

        mutilist.push(tempmuti);
    }
	var timejson = new Array();
	for(var i=0;i<itemid.length;i++){
		var oneitem= {name:itemid[i],type:'bar',data:mutilist[i]};
		timejson.push(oneitem);
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
        data:itemid,
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
    series : timejson
};
if (optionmuti && typeof optionmuti === "object") {
    mymuti.setOption(optionmuti, true);
}

//------------------以下是分布图部分--------------------------

	for(var i=0;i<itemid.length;i++){
		gaosi("cav"+String(i), itemid[i], total[i]);
		jQuery("span#num"+String(i)).text(String(numbs(total[i])));
	}
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