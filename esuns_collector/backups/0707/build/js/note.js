series: [{
  name: 'NewCase',
  type: 'bar',
  stack: 'TodoCase',
  data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
}, {
  name: 'QueueCase',
  type: 'bar',
  stack: 'TodoCase',
  data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
}, {
  name: 'CloseCase',
  type: 'bar',
  data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
}]



app.title = '堆叠柱状图';

option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
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
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'邮件营销',
            type:'bar',
            stack: '广告',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'bar',
            stack: '广告',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'bar',
            stack: '广告',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'搜索引擎',
            type:'bar',
            data:[862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine : {
                lineStyle: {
                    normal: {
                        type: 'dashed'
                    }
                },
                data : [
                    [{type : 'min'}, {type : 'max'}]
                ]
            }
        },
        {
            name:'百度',
            type:'bar',
            barWidth : 5,
            stack: '搜索引擎',
            data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
            name:'谷歌',
            type:'bar',
            stack: '搜索引擎',
            data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
            name:'必应',
            type:'bar',
            stack: '搜索引擎',
            data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
            name:'其他',
            type:'bar',
            stack: '搜索引擎',
            data:[62, 82, 91, 84, 109, 110, 120]
        }
    ]
};




$.ajax({//QueueCase, NewCase, RC_Date, CloseCase
  url: "http://localhost/esuns_collector/main/proxy.php?route=/Dought1_data",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/XXX JSON load SUCCESS !!!');
    console.log('/XXX: ', JSON);


    echart_donut_1.setOption({});
  },
  error: function() {
    console.log('/XXX JSON load failed...');
  }
})

function (bar_setting){
  console.log('fire event!');
};
//ajax json for /Reapir_Case/30
//for Repair Order History
$.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/Reapir_Case/30",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/Reapir_Case/30 JSON load SUCCESS !!!');
    console.log('/Reapir_Case/30: ', JSON);
    var sparkline_one_data = [];
    var sparkline_one_data_with_date = [];

    for (i = 0; i < JSON.data.length; i++) {
      var QueueCase = JSON.data[i].QueueCase - JSON.data[i].NewCase;
      var NewCase = JSON.data[i].NewCase;
      if (QueueCase < 0) {
        QueueCase = 0
      };
      sparkline_one_data.push([QueueCase, NewCase]);
      sparkline_one_data_with_date.push([QueueCase, NewCase, JSON.data[i].RC_Date]);
    }
    sparkline_one_data = sparkline_one_data.reverse();
    sparkline_one_data_with_date = sparkline_one_data_with_date.reverse();

    // [原有:新增][ [1,4], [2, 3], [3, 2], [4, 1] ]
    $("#sparkline_one").sparkline(sparkline_one_data, {
      type: 'bar',
      height: '125',
      barWidth: 13,
      colorMap: {
        //'8:100': '#a1a1a1'
      },
      barSpacing: 3,
      barColor: '#26B99A'
    });
    $("#sparkline_two").sparkline(sparkline_two_data, {
      type: 'bar',
      height: '125',
      barWidth: 13,
      colorMap: {
        '0:100': '#29CBA9'
      },
      barSpacing: 3,
      barColor: '#26B99A'
    });
    ///////////////////////////////////////////////////////
    $('#sparkline_one').bind('sparklineClick', function(ev) {
      var sparkline = ev.sparklines[0],
        region = sparkline.getCurrentRegionFields();
      console.log('select:', region[0].offset, 'date: ' + sparkline_one_data_with_date[region[0].offset][2] + '  原有: ' + region[1].value + ' 新增: ' + region[0].value);
      window.open("http://localhost/esuns_collector/main/proxy.php?route=/Reapir_Case/30");
    });

    $('#sparkline_one').bind('sparklineRegionChange', function(ev) {
      var sparkline = ev.sparklines[0],
        region = sparkline.getCurrentRegionFields();
      $('#sparkline_one_text').text(sparkline_one_data_with_date[region[0].offset][2] + '  原有: ' + region[1].value + ' 新增: ' + region[0].value);
    }).bind('mouseleave', function() {
      $('#sparkline_one_text').text('\xa0');
    });
    ///////////////////////////////////////////////////////
  },
  error: function() {
    console.log('/Reapir_Case/30 JSON load failed...');
    $("#sparkline_one").html('Resource offline...');
    $("#sparkline_two").html('Resource offline...');

  }
})
