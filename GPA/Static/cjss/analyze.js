jQuery(document).ready(function(){

//total总列表，包含几次考试，每次考试里有两个列表存储totalscore、totalsort

	var total = new Array();
    var totalname = new Array();
    table = "";

//以下是用于组织图表数据
	var tempa = new Array();
	var tempb = new Array();
	var tempc = new Array();
	var tempd = new Array();
	var tempone = new Array();
	var temptwo = new Array();

    jQuery("h3.panel-title").each(function(){
        totalname.push(jQuery(this).text());
    });
    for(var i=0;i<totalname.length;i++){
        jQuery("tbody#one"+String(i)).each(function(){
            var one = new Array();
            var totalscore = new Array();
            var totalsort = new Array();
            jQuery(this).find("tr.onet").each(function(){
                totalscore.push(Number(jQuery(this).find("td.score").text()));
                totalsort.push(Number(jQuery(this).find("td.scoreSort").text()));
            });
            one.push(totalscore);
            one.push(totalsort);

            total.push(one);
        });
    }

    total.reverse();
    totalname.reverse();
    
//以下是填入表格数据
    for(var i=0;i<total.length;i++){
		total[i][0].sort(numsortu)
		total[i][1].sort(numsortd)

		var zws = total[i][0][parseInt(total[i][0].length/2)];
		var pjs = numavg(total[i][0]);
		var fcvar = numvar(total[i][0]);

		var pjsus = 0;
		var pjsds = 0;
		for(var l=0;l<total[i][0].length;l++){
			if(total[i][0][l]<pjs){
				pjsus = total[i][1][l];
			}else{
				pjsds = total[i][1][l];
				break;
			}
		}

		var zwssort = total[i][1][parseInt(total[i][1].length/2)];
		var pjssort = Math.round((pjsus+pjsds)/2);
		var distribution = (Math.sqrt(fcvar)/pjs).toFixed(3);
		var biased = parseInt(numbs(total[i][0]));

		if(i%2==0){
			table = table+"<tr class='warning'>";
		}else{
			table = table+"<tr class='success'>";
		}
		table = table+"<td>"+totalname[i]+"</td><td>"+zws+"</td><td>"+zwssort+"</td><td>"+pjs+"</td><td>"+pjssort+"</td><td>"+distribution+"</td><td>"+biased+"</td></tr>";

		//以下是图表数据
		tempa.push(zws);
		tempb.push(zwssort);
		tempc.push(pjs);
		tempd.push(pjssort);
		tempone.push(distribution);
		temptwo.push(biased);

	}
	jQuery('tbody#tbdata').html(table);

	var tempzero = new Array();
	tempzero.push(tempa);
	tempzero.push(tempb);
	tempzero.push(tempc);
	tempzero.push(tempd);

//------------------以下是分布图部分--------------------------
//-------------------以下是折线图部分-----------------------
	var domus = document.getElementById("cavus");
    var myus = echarts.init(domus);

optionus = {
    title: {
        text: ' '
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['中位数','中位数排名','平均数','平均数排名'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: totalname,
    },
    yAxis: {
        name: ' ',
        type: 'value',
        min: 'dataMin',
    },
    series: [
        {
            name:'中位数',
            type:'line',
            lineStyle: {normal: {width: 4,type: 'dashed'}},
            data:tempzero[0],
        },
        {
            name:'中位数排名',
            type:'line',
            lineStyle: {normal: {width: 4,type: 'dashed'}},
            data:tempzero[1],
        },
        {
            name:'平均数',
            type:'line',
            data:tempzero[2],
        },
        {
            name:'平均数排名',
            type:'line',
            data:tempzero[3],
        },
    ]
};
if (optionus && typeof optionus === "object") {
    myus.setOption(optionus, true);
}

//-------------------以下是折线图离散部分-----------------------
	var domms = document.getElementById("cavms");
    var myms = echarts.init(domms);

optionms = {
    title: {
        text: ' '
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['离散系数'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: totalname,
    },
    yAxis: {
        name: ' ',
        type: 'value',
    },
    series: [
        {
            name:'离散系数',
            type:'line',
            data:tempone,
        },
    ]
};
if (optionms && typeof optionms === "object") {
    myms.setOption(optionms, true);
}

//-------------------以下是折线图偏度部分-----------------------
	var domds = document.getElementById("cavds");
    var myds = echarts.init(domds);

optionds = {
    title: {
        text: '偏度',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['偏度']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: totalname,
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        }
    },
    series: [
        {
            name:'偏度',
            type:'line',
            data:temptwo,
        },
    ]
};

if (optionds && typeof optionds === "object") {
    myds.setOption(optionds, true);
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

