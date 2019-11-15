jQuery(document).ready(function(){
//设定的科目列表 以及科目分值人数
	var itemid = new Array();
	var maxSort = new Array();
	jQuery("li.item").each(function(){
		itemid.push(jQuery(this).text());
	});
	jQuery("li.maxSort").each(function(){
		maxSort.push(jQuery(this).text());
	});

//------------------以下是雷达图部分--------------------------
    var domtest = document.getElementById("cavtest");
    var mytest = echarts.init(domtest);

    var test = new Array();
    var testdat = new Array();

    jQuery("td.n0").each(function(){
        var testemp=jQuery(this).text();
        if (test.includes(testemp)){
        }else{
            test.push(testemp);
            var testitem = new Array(itemid.length);
            testdat.push(testitem);
        }
        for (var i=0;i<testdat.length;i++){
            if (test[i]==testemp){
				for(var j=0;j<itemid.length;j++){
					testdat[i][j]=Number(jQuery(this).parent().find("td.n"+String(j*2+2)).text());
				}
            }
        }
    });

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
//-------------------以下是年级排名折线图部分-----------------------
    var domsort = document.getElementById("cavsort");
    var mysort = echarts.init(domsort);

    var sortdat = new Array();
    for(var i=0;i<10;i++){
        var sorttemp = new Array();
        sortdat.push(sorttemp);
        for(var j=0;j<testdat.length;j++){
            sortdat[i].push(testdat[j][i]);
        }
    }
	
	var timejson = new Array();
	for(var i=0;i<itemid.length;i++){
		var oneitem= {name:itemid[i],type:'line', lineStyle: {normal: {width: 4,type: 'dashed'}},data:sortdat[i]};
		timejson.push(oneitem);
	}

optionsort = {
    title: {
        text: ' '
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:itemid
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
        data: test,
    },
    yAxis: {
        name: '年级排名',
        type: 'value',
    },
    series: timejson
};
if (optionsort && typeof optionsort === "object") {
    mysort.setOption(optionsort, true);
}

//-------------------以下是分数折线图部分-----------------------
    var domtime = document.getElementById("cavtime");
    var mytime = echarts.init(domtime);

    var timedat = new Array();

    for (var i=0;i<itemid.length;i++){ 
        var timetemp = new Array(test.length);
        timedat.push(timetemp);
    }

    jQuery("td.n0").each(function(){
        var testemp=jQuery(this).text();
        var i=test.indexOf(testemp);
		for(var j=0;j<itemid.length;j++){
			timedat[j][i]=Number(jQuery(this).parent().find("td.n"+String(j*2+1)).text());
		}
    });
	
	var timajson = new Array();
	for(var i=0;i<itemid.length;i++){
		var oneitem= {name:itemid[i],type:'line', lineStyle: {normal: {width: 4,type: 'dashed'}},data:timedat[i]};
		timajson.push(oneitem);
	}

optiontime = {
    title: {
        text: ' '
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:itemid
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
        data: test,
    },
    yAxis: {
        name: '分数',
        type: 'value',
    },
    series: timajson
};
if (optiontime && typeof optiontime === "object") {
    mytime.setOption(optiontime, true);
}

//-------------------------以下是饼图部分-------------------------------

    var domname = document.getElementById("cavname");
    var myname = echarts.init(domname);

optionname = {
    title : {
        text: '英雄榜榜单',
        subtext: '努力',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['你的上榜次数','榜单总量']
    },
    series : [
        {
            name: '',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:jQuery("span#aa").text(), name:'你的上榜次数'},
                {value:jQuery("span#bb").text(), name:'榜单总量'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

if (optionname && typeof optionname === "object") {
    myname.setOption(optionname, true);
}


//----------------------------以下是底线--------------------------------
});