jQuery(document).ready(function(){
	var groupl=0;
	var iteml=0;
	var testl=0;
	var groupr=0;
	var itemr=0;
	var testr=0;

	dat = new Array();
	
	jQuery("select#groupl").change(function(){
		groupl=jQuery("select#groupl").val();
	});
	jQuery("select#iteml").change(function(){
		iteml=jQuery("select#iteml").val();
	});
	jQuery("select#testl").change(function(){
		testl=jQuery("select#testl").val();
	});
	jQuery("select#groupr").change(function(){
		groupr=jQuery("select#groupr").val();
	});
	jQuery("select#itemr").change(function(){
		itemr=jQuery("select#itemr").val();
	});
	jQuery("select#testr").change(function(){
		testr=jQuery("select#testr").val();
	});

	jQuery("button.btnl").click(function(){
		var url='/asyn/'+String(groupl)+'/'+String(iteml)+'/'+String(testl);
		jQuery.get(url,
		function(data,status){
			dat = eval(data);
			var titlelist = dat[1];
			var cavlist = titlelist.slice(0);
			cavlist.reverse();
			var datlist = dat[0];

			var zwslist = new Array();
			var zwssortlist = new Array();
			var pjslist = new Array();
			var pjssortlist = new Array();
			var maxlist = new Array();
			var maxsortlist = new Array();
			var minlist = new Array();
			var minsortlist = new Array();
			var distributionlist = new Array();
			var biasedlist = new Array();

			for(var i=datlist.length-1;i>=0;i--){
				datlist[i][0].sort(numsortd);
				datlist[i][1].sort(numsortu);

				var pjs = numavg(datlist[i][0]);
				var pjsus = 0;
				var pjsds = 0;
				for(var j=0;j<datlist[i][0].length;j++){
					if(datlist[i][0][j]>pjs){
						pjsus = datlist[i][1][j];
					}else{
						pjsds = datlist[i][1][j];
						break;
					}
				}
				var pjssort = Math.round((pjsus+pjsds)/2);
				
				var zws = datlist[i][0][parseInt(datlist[i][0].length/2)];
				var zwssort = datlist[i][1][parseInt(datlist[i][1].length/2)];
				
				var fcvar = numvar(datlist[i][0]);
				var distribution = (Math.sqrt(fcvar)/pjs).toFixed(3);
				var biased = parseInt(numbs(datlist[i][0]));

				zwslist.push(zws);
				zwssortlist.push(zwssort);
				pjslist.push(pjs);
				pjssortlist.push(pjssort);
				maxlist.push(datlist[i][0][0]);
				maxsortlist.push(datlist[i][1][0]);
				minlist.push(datlist[i][0][datlist[i][0].length-1]);
				minsortlist.push(datlist[i][1][datlist[i][0].length-1]);
				distributionlist.push(distribution);
				biasedlist.push(biased);
			}
			var sfwu = datlist[0][0][parseInt(datlist[0][0].length*0.25)];
			var sfwusort = datlist[0][1][parseInt(datlist[0][1].length*0.25)];
			var sfwd = datlist[0][0][parseInt(datlist[0][0].length*0.75)];
			var sfwdsort = datlist[0][1][parseInt(datlist[0][1].length*0.75)];

//以下是表格部分
			lastindex = zwslist.length-1;
			var html = "";
			html = html+ '<div class="col-sm-12">';
			html = html+ '<table class="table table-hover" style="border: 1px solid #cccccc;border-collapse: collapse;">';
			html = html+ '<caption class="name">'+String(cavlist[lastindex])+'</caption>';
			html = html+ '<thead><tr class="danger" style="font-weight: bold"><td>统计量</td><td>成绩</td><td>排名</td></tr></thead>';
			html = html+ '<tbody>';
			html = html+ '<tr class="success onet">';
			html = html+ '<td>平均分</td>'+'<td>'+String(pjslist[lastindex])+'</td>'+'<td>'+String(pjssortlist[lastindex])+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="warning onet">';
			html = html+ '<td>最高分</td>'+'<td>'+String(maxlist[lastindex])+'</td>'+'<td>'+String(maxsortlist[lastindex])+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="success onet">';
			html = html+ '<td>上四分位数</td>'+'<td>'+String(sfwu)+'</td>'+'<td>'+String(sfwusort)+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="warning onet">';
			html = html+ '<td>中位数</td>'+'<td>'+String(zwslist[lastindex])+'</td>'+'<td>'+String(zwssortlist[lastindex])+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="success onet">';
			html = html+ '<td>下四分位数</td>'+'<td>'+String(sfwd)+'</td>'+'<td>'+String(sfwdsort)+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="warning onet">';
			html = html+ '<td>最低分</td>'+'<td>'+String(minlist[lastindex])+'</td>'+'<td>'+String(minsortlist[lastindex])+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="success onet">';
			html = html+ '<td>离散系数</td>'+'<td>'+String(distributionlist[lastindex])+'</td>'+'<td>none</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="warning onet">';
			html = html+ '<td>偏度</td>'+'<td>'+String(biasedlist[lastindex])+'</td>'+'<td>none</td>';
			html = html+ '</tr>';
			html = html+ '</tbody></table></div>';
			jQuery("div#tablel").html(html);
//以下是分布图部分
			gaosi("cavl0", "分数分布", datlist[0][0]);
			gaosi("cavl1", "排名分布", datlist[0][1]);
			var zhelist = new Array();
			zhelist.push(pjslist);
			zhelist.push(pjssortlist);
			zhelist.push(zwslist);
			zhelist.push(zwssortlist);
			zhelist.push(maxlist);
			zhelist.push(maxsortlist);
			zhelist.push(minlist);
			zhelist.push(minsortlist);
			zhexian("cavl2", cavlist, zhelist);
			lisan("cavl3", cavlist, distributionlist);
			piandu("cavl4", cavlist, biasedlist);
			
			
//以下是源数据部分
			html = "";
			for(var i=0;i<datlist.length;i++){
				html = html+ '<div class="col-sm-3">';
				html = html+ '<table class="table table-hover" style="border: 1px solid #cccccc;border-collapse: collapse;">';
				html = html+ '<caption class="name">'+String(titlelist[i])+'</caption>';
				html = html+ '<thead><tr class="danger" style="font-weight: bold"><td>成绩</td><td>排名</td></tr></thead>';
				html = html+ '<tbody>';
				for(var j=0;j<datlist[i][0].length;j++){
					if(j%2==0){
						html = html+ '<tr class="success onet">';
					}else{
						html = html+ '<tr class="warning onet">';
					}
					html = html+ '<td>'+String(datlist[i][0][j])+'</td>';
					html = html+ '<td>'+String(datlist[i][1][j])+'</td>';
					html = html+ '</tr>';
				}
				html = html+ '</tbody></table></div>';
			}
			jQuery("div#alll").html(html);
		});
	});



	jQuery("button.btnr").click(function(){
		var url='/asyn/'+String(groupr)+'/'+String(itemr)+'/'+String(testr);
		jQuery.get(url,
		function(data,status){
			dat = eval(data);
			var titlelist = dat[1];
			var cavlist = titlelist.slice(0);
			cavlist.reverse();
			var datlist = dat[0];

			var zwslist = new Array();
			var zwssortlist = new Array();
			var pjslist = new Array();
			var pjssortlist = new Array();
			var maxlist = new Array();
			var maxsortlist = new Array();
			var minlist = new Array();
			var minsortlist = new Array();
			var distributionlist = new Array();
			var biasedlist = new Array();

			for(var i=datlist.length-1;i>=0;i--){
				datlist[i][0].sort(numsortd);
				datlist[i][1].sort(numsortu);

				var pjs = numavg(datlist[i][0]);
				var pjsus = 0;
				var pjsds = 0;
				for(var j=0;j<datlist[i][0].length;j++){
					if(datlist[i][0][j]>pjs){
						pjsus = datlist[i][1][j];
					}else{
						pjsds = datlist[i][1][j];
						break;
					}
				}
				var pjssort = Math.round((pjsus+pjsds)/2);
				
				var zws = datlist[i][0][parseInt(datlist[i][0].length/2)];
				var zwssort = datlist[i][1][parseInt(datlist[i][1].length/2)];
				
				var fcvar = numvar(datlist[i][0]);
				var distribution = (Math.sqrt(fcvar)/pjs).toFixed(3);
				var biased = parseInt(numbs(datlist[i][0]));

				zwslist.push(zws);
				zwssortlist.push(zwssort);
				pjslist.push(pjs);
				pjssortlist.push(pjssort);
				maxlist.push(datlist[i][0][0]);
				maxsortlist.push(datlist[i][1][0]);
				minlist.push(datlist[i][0][datlist[i][0].length-1]);
				minsortlist.push(datlist[i][1][datlist[i][0].length-1]);
				distributionlist.push(distribution);
				biasedlist.push(biased);
			}
			var sfwu = datlist[0][0][parseInt(datlist[0][0].length*0.25)];
			var sfwusort = datlist[0][1][parseInt(datlist[0][1].length*0.25)];
			var sfwd = datlist[0][0][parseInt(datlist[0][0].length*0.75)];
			var sfwdsort = datlist[0][1][parseInt(datlist[0][1].length*0.75)];

//以下是表格部分
			lastindex = zwslist.length-1;
			var html = "";
			html = html+ '<div class="col-sm-12">';
			html = html+ '<table class="table table-hover" style="border: 1px solid #cccccc;border-collapse: collapse;">';
			html = html+ '<caption class="name">'+String(cavlist[lastindex])+'</caption>';
			html = html+ '<thead><tr class="danger" style="font-weight: bold"><td>统计量</td><td>成绩</td><td>排名</td></tr></thead>';
			html = html+ '<tbody>';
			html = html+ '<tr class="success onet">';
			html = html+ '<td>平均分</td>'+'<td>'+String(pjslist[lastindex])+'</td>'+'<td>'+String(pjssortlist[lastindex])+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="warning onet">';
			html = html+ '<td>最高分</td>'+'<td>'+String(maxlist[lastindex])+'</td>'+'<td>'+String(maxsortlist[lastindex])+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="success onet">';
			html = html+ '<td>上四分位数</td>'+'<td>'+String(sfwu)+'</td>'+'<td>'+String(sfwusort)+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="warning onet">';
			html = html+ '<td>中位数</td>'+'<td>'+String(zwslist[lastindex])+'</td>'+'<td>'+String(zwssortlist[lastindex])+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="success onet">';
			html = html+ '<td>下四分位数</td>'+'<td>'+String(sfwd)+'</td>'+'<td>'+String(sfwdsort)+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="warning onet">';
			html = html+ '<td>最低分</td>'+'<td>'+String(minlist[lastindex])+'</td>'+'<td>'+String(minsortlist[lastindex])+'</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="success onet">';
			html = html+ '<td>离散系数</td>'+'<td>'+String(distributionlist[lastindex])+'</td>'+'<td>none</td>';
			html = html+ '</tr>';
			html = html+ '<tr class="warning onet">';
			html = html+ '<td>偏度</td>'+'<td>'+String(biasedlist[lastindex])+'</td>'+'<td>none</td>';
			html = html+ '</tr>';
			html = html+ '</tbody></table></div>';
			jQuery("div#tabler").html(html);
//以下是分布图部分
			gaosi("cavr0", "分数分布", datlist[0][0]);
			gaosi("cavr1", "排名分布", datlist[0][1]);
			var zhelist = new Array();
			zhelist.push(pjslist);
			zhelist.push(pjssortlist);
			zhelist.push(zwslist);
			zhelist.push(zwssortlist);
			zhelist.push(maxlist);
			zhelist.push(maxsortlist);
			zhelist.push(minlist);
			zhelist.push(minsortlist);
			zhexian("cavr2", cavlist, zhelist);
			lisan("cavr3", cavlist, distributionlist);
			piandu("cavr4", cavlist, biasedlist);
			
			
//以下是源数据部分
			html = "";
			for(var i=0;i<datlist.length;i++){
				html = html+ '<div class="col-sm-3">';
				html = html+ '<table class="table table-hover" style="border: 1px solid #cccccc;border-collapse: collapse;">';
				html = html+ '<caption class="name">'+String(titlelist[i])+'</caption>';
				html = html+ '<thead><tr class="danger" style="font-weight: bold"><td>成绩</td><td>排名</td></tr></thead>';
				html = html+ '<tbody>';
				for(var j=0;j<datlist[i][0].length;j++){
					if(j%2==0){
						html = html+ '<tr class="success onet">';
					}else{
						html = html+ '<tr class="warning onet">';
					}
					html = html+ '<td>'+String(datlist[i][0][j])+'</td>';
					html = html+ '<td>'+String(datlist[i][1][j])+'</td>';
					html = html+ '</tr>';
				}
				html = html+ '</tbody></table></div>';
			}
			jQuery("div#allr").html(html);
		});
	});
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

function numgz(j)//归整
{
	var aa=j;
	var cc=0;
	while(aa>0){
		aa=parseInt(aa/10);
		cc=cc+1;
	}
	return parseInt(j/(10**(cc-1)))*(10**(cc-1));
}

function gaosi(cav, ati, cli)
{
	var domtest = document.getElementById(cav);
    var mytest = echarts.init(domtest);

	var bli = cli.slice(0);
	bli.sort(numsortu);
    var minn = bli[0];
    var maxn = bli[bli.length-1];
	var stepn = parseInt((maxn-minn)/10);
	if(stepn<2){
		stepn=2;
	}else if(stepn<5){
		stepn=5;
	}else if(stepn<10){
		stepn=10;
	}else if(stepn<20){
		stepn=20;
	}else if(stepn<50){
		stepn=50;
	}else if(stepn<100){
		stepn=100;
	}else if(stepn<200){
		stepn=200;
	}else if(stepn<500){
		stepn=500;
	}else if(stepn<1000){
		stepn=1000;
	}else{
		stepn=numgz(stepn);
	}
	minn = (parseInt(minn/stepn)+1)*stepn;
	maxn = parseInt(maxn/stepn)*stepn;

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

//折线图函数
function zhexian(cav, ati, bli)
{
	var domus = document.getElementById(cav);
    var myus = echarts.init(domus);

optionus = {
    title: {
        text: ' '
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['平均数','平均数排名','中位数','中位数排名','最高分','最高分排名','最低分','最低分排名'],
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
        data: ati,
    },
    yAxis: {
        name: ' ',
        type: 'value',
        min: 'dataMin',
    },
    series: [
        {
            name:'平均数',
            type:'line',
            lineStyle: {normal: {width: 3,type: 'solid'}},
            data:bli[0],
        },
        {
            name:'平均数排名',
            type:'line',
            lineStyle: {normal: {width: 3,type: 'solid'}},
            data:bli[1],
        },
        {
            name:'中位数',
            type:'line',
			lineStyle: {normal: {width: 3,type: 'dashed'}},
            data:bli[2],
        },
        {
            name:'中位数排名',
            type:'line',
			lineStyle: {normal: {width: 3,type: 'dashed'}},
            data:bli[3],
        },
		{
            name:'最高分',
            type:'line',
			lineStyle: {normal: {width: 2,type: 'dotted'}},
            data:bli[4],
        },
        {
            name:'最高分排名',
            type:'line',
			lineStyle: {normal: {width: 2,type: 'dotted'}},
            data:bli[5],
        },
		{
            name:'最低分',
            type:'line',
			lineStyle: {normal: {width: 2,type: 'dotted'}},
            data:bli[6],
        },
        {
            name:'最低分排名',
            type:'line',
			lineStyle: {normal: {width: 2,type: 'dotted'}},
            data:bli[7],
        },
    ]
};
if (optionus && typeof optionus === "object") {
    myus.setOption(optionus, true);
}
}

//折线图离散函数
function lisan(cav, ati, bli)
{
		var domms = document.getElementById(cav);
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
        data: ati,
    },
    yAxis: {
        name: ' ',
        type: 'value',
    },
    series: [
        {
            name:'离散系数',
            type:'line',
            data:bli,
        },
    ]
};
if (optionms && typeof optionms === "object") {
    myms.setOption(optionms, true);
}
}

//折线图偏度函数
function piandu(cav, ati, bli)
{
		var domds = document.getElementById(cav);
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
        data: ati,
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
            data:bli,
        },
    ]
};

if (optionds && typeof optionds === "object") {
    myds.setOption(optionds, true);
}

}