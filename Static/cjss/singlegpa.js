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
            	testdat[i][0]=Number(jQuery(this).parent().find("td.totalSort").text());
                testdat[i][1]=Number(jQuery(this).parent().find("td.mathsSort").text());
                testdat[i][2]=Number(jQuery(this).parent().find("td.chineseSort").text());
                testdat[i][3]=Number(jQuery(this).parent().find("td.englishSort").text());
                testdat[i][4]=Number(jQuery(this).parent().find("td.physicsSort").text());
                testdat[i][5]=Number(jQuery(this).parent().find("td.chymistrySort").text());
                testdat[i][6]=Number(jQuery(this).parent().find("td.biologySort").text());
                testdat[i][7]=Number(jQuery(this).parent().find("td.historySort").text());
                testdat[i][8]=Number(jQuery(this).parent().find("td.politicsSort").text());
                testdat[i][9]=Number(jQuery(this).parent().find("td.geographySort").text());
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
           { name: '综合', min:10, max:1500},
           { name: '数学', min:10, max:1500},
           { name: '语文', min:10, max:1500},
           { name: '英语', min:10, max:1500},
           { name: '物理', min:10, max:1500},
           { name: '化学', min:10, max:1500},
           { name: '生物', min:10, max:1500},
           { name: '历史', min:10, max:1500},
           { name: '政治', min:10, max:1500},
           { name: '地理', min:10, max:1500},
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

optionsort = {
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
        name: '年级排名',
        type: 'value',
    },
    series: [
        {
            name:'综合',
            type:'line',
            lineStyle: {normal: {width: 4,type: 'dashed'}},
            data:sortdat[0],
        },
        {
            name:'数学',
            type:'line',
            data:sortdat[1],
        },
        {
            name:'语文',
            type:'line',
            data:sortdat[2],
        },
        {
            name:'英语',
            type:'line',
            data:sortdat[3],
        },
        {
            name:'物理',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:sortdat[4],
        },
        {
            name:'化学',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:sortdat[5],
        },
        {
            name:'生物',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:sortdat[6],
        },
        {
            name:'历史',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:sortdat[7],
        },
        {
            name:'政治',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:sortdat[8],
        },
        {
            name:'地理',
            type:'line',
            lineStyle: {normal: {type: 'dashed'}},
            data:sortdat[9],
        },
    ]
};
if (optionsort && typeof optionsort === "object") {
    mysort.setOption(optionsort, true);
}

//-------------------以下是分数折线图部分-----------------------
    var domtime = document.getElementById("cavtime");
    var mytime = echarts.init(domtime);

    var timedat = new Array();

    for (var i=0;i<10;i++){ 
        var timetemp = new Array(test.length);
        timedat.push(timetemp);
    }

    jQuery("td.test").each(function(){
        var testemp=jQuery(this).text();
        var i=test.indexOf(testemp);
        timedat[0][i]=Number(jQuery(this).parent().find("td.total").text())/5;
        timedat[1][i]=Number(jQuery(this).parent().find("td.maths").text());
        timedat[2][i]=Number(jQuery(this).parent().find("td.chinese").text());
        timedat[3][i]=Number(jQuery(this).parent().find("td.english").text());
        timedat[4][i]=Number(jQuery(this).parent().find("td.physics").text());
        timedat[5][i]=Number(jQuery(this).parent().find("td.chymistry").text());
        timedat[6][i]=Number(jQuery(this).parent().find("td.biology").text());
        timedat[7][i]=Number(jQuery(this).parent().find("td.history").text());
        timedat[8][i]=Number(jQuery(this).parent().find("td.politics").text());
        timedat[9][i]=Number(jQuery(this).parent().find("td.geography").text());
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
        name: '分数',
        type: 'value',
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