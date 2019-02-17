jQuery(document).ready(function(){

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
            var testitem = new Array(0,1,2,3,4,5,6,7,8,9);
            testdat.push(testitem);
        }
        for (var i=0;i<testdat.length;i++){ 
            if (test[i]==testemp){
                switch(jQuery(this).parent().find("td.item").text()){
                    case "综合":
                        testdat[i][0]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "数学":
                        testdat[i][1]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "语文":
                        testdat[i][2]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "英语":
                        testdat[i][3]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "物理":
                        testdat[i][4]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "化学":
                        testdat[i][5]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "生物":
                        testdat[i][6]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "历史":
                        testdat[i][7]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "政治":
                        testdat[i][8]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    case "地理":
                        testdat[i][9]=Number(jQuery(this).parent().find("td.sort").text());
                        break;
                    default:
                        alert("wrong");
                        break;
                }
            }
        }
    });

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
           { name: '综合', min:0, max:300},
           { name: '数学', min:0, max:300},
           { name: '语文', min:0, max:300},
           { name: '英语', min:0, max:300},
           { name: '物理', min:0, max:300},
           { name: '化学', min:0, max:300},
           { name: '生物', min:0, max:300},
           { name: '历史', min:0, max:300},
           { name: '政治', min:0, max:300},
           { name: '地理', min:0, max:300},
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
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

    for (var i=0;i<10;i++){ 
        var timetemp = new Array(test.length);
        timedat.push(timetemp);
    }

    jQuery("td.item").each(function(){
        var testemp=jQuery(this).parent().find("td.test").text();
        var i=test.indexOf(testemp);
        switch(jQuery(this).text()){
            case "综合":
                timedat[0][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "数学":
                timedat[1][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "语文":
                timedat[2][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "英语":
                timedat[3][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "物理":
                timedat[4][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "化学":
                timedat[5][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "生物":
                timedat[6][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "历史":
                timedat[7][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "政治":
                timedat[8][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
            case "地理":
                timedat[9][i]=Number(jQuery(this).parent().find("td.sort").text());
                break;
             default:
                alert("wrong");
                break;
        }
    });

optiontime = {
    title: {
        text: ' '
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['综合','数学','语文','英语','物理','化学','生物','历史','政治','地理']
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
    series: [
        {
            name:'综合',
            type:'line',
            lineStyle: {normal: {width: 4,type: 'dashed'}},
            data:timedat[0],
        },
        {
            name:'数学',
            type:'line',
            data:timedat[1],
        },
        {
            name:'语文',
            type:'line',
            data:timedat[2],
        },
        {
            name:'英语',
            type:'line',
            data:timedat[3],
        },
        {
            name:'物理',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:timedat[4],
        },
        {
            name:'化学',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:timedat[5],
        },
        {
            name:'生物',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:timedat[6],
        },
        {
            name:'历史',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:timedat[7],
        },
        {
            name:'政治',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:timedat[8],
        },
        {
            name:'地理',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:timedat[9],
        },
    ]
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