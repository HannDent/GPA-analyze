jQuery(document).ready(function(){
	
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

    jQuery("td.test").each(function(){
        var testemp=jQuery(this).text();
        if (test.includes(testemp)){
        }else{
            test.push(testemp);
            var testitem = new Array(itemid.length);
            testdat.push(testitem);
        }
        for (var i=0;i<testdat.length;i++){ 
            if (test[i]==testemp){
				j = itemid.indexOf(jQuery(this).parent().find("td.item").text());
				testdat[i][j]=Number(jQuery(this).parent().find("td.sort").text());
            }
        }
    });
	
    var testdatb = new Array();
    for (var i=0;i<test.length;i++){
        testdatb.push({value:testdat[i],name:test[i]});
    }
	
	var testjson = new Array();
	for(var i=0;i<itemid.length;i++){
		var oneitem= {name:itemid[i],min:0,max:parseInt(maxSort[i]/4)};
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
        name: 'Budget',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : testdatb
    }]
};
if (optiontest && typeof optiontest === "object") {
    mytest.setOption(optiontest, true);
}

//-------------------以下是折线图部分-----------------------
    var domtime = document.getElementById("cavtime");
    var mytime = echarts.init(domtime);

    var timedat = new Array();

    for (var i=0;i<itemid.length;i++){ 
        var timetemp = new Array(test.length);
        timedat.push(timetemp);
    }

    jQuery("td.item").each(function(){
        var testemp=jQuery(this).parent().find("td.test").text();
		var i = itemid.indexOf(jQuery(this).text());
        var j = test.indexOf(testemp);
		timedat[i][j]=Number(jQuery(this).parent().find("td.sort").text());
    });
	
	var timejson = new Array();
	for(var i=0;i<itemid.length;i++){
		var oneitem= {name:itemid[i],type:'line', lineStyle: {normal: {width: 4,type: 'dashed'}},data:timedat[i]};
		timejson.push(oneitem);
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
        name: '年级名次',
        type: 'value',
        min: 'dataMin',
    },
    series: timejson
};
if (optiontime && typeof optiontime === "object") {
    mytime.setOption(optiontime, true);
}

//-------------------------以下是柱状图部分-------------------------------

    var domname = document.getElementById("cavname");
    var myname = echarts.init(domname);

    var name = new Array();
    var namedat = new Array();

    jQuery("td.name").each(function(){
    	var nametemp = jQuery(this).text();
    	if (name.includes(nametemp)){
    		var i=name.indexOf(nametemp);
    		namedat[i] = namedat[i]+1;
    	}else{
    		name.push(nametemp);
    		namedat.push(1);
    	}
    });
	
	for(var i=0;i<name.length;i++){
		for(var j=i;j>0;j--){
			if(namedat[j]<namedat[j-1]){
				var tempdat = namedat[j];
				namedat[j] = namedat[j-1];
				namedat[j-1] = tempdat;
				
				var tempname = name[j];
				name[j] = name[j-1];
				name[j-1] = tempname;
			}
		}
	}

optionname = {
    title: {
        text: '出现在榜单次数',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['谁最优秀'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: name,
    },
    series: [
        {
            name: '第一',
            type: 'bar',
            data: namedat,
        },
    ]
};

if (optionname && typeof optionname === "object") {
    myname.setOption(optionname, true);
}


//----------------------------以下是底线--------------------------------
});