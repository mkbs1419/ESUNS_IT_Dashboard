/* FOR index.html */
function randomData() {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  }
}

var data = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
  data.push(randomData());
}


/* clock */

function startTime() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var day = today.getDate();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  h = checkTime(h)
  m = checkTime(m);
  s = checkTime(s);
  //document.getElementById('tile_date').innerHTML = h + ":" + m + ":" + s;
  document.getElementById('tile_clock').innerHTML = year + "/" + month + "/" + day + "  " + h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
  return h + m + s
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }; // add zero in front of numbers < 10
  return i;
}

//////////////////////////////////////////////////

/* function init_echarts() */

function init_echarts() {
  if (typeof(echarts) === 'undefined') {
    return;
  }
  console.log('init_echarts');

  var theme = {
    color: [
      '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
      '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
    ],

    title: {
      itemGap: 8,
      textStyle: {
        fontWeight: 'normal',
        color: '#408829'
      }
    },

    dataRange: {
      color: ['#1f610a', '#97b58d']
    },

    toolbox: {
      color: ['#408829', '#408829', '#408829', '#408829']
    },

    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#408829',
          type: 'dashed'
        },
        crossStyle: {
          color: '#408829'
        },
        shadowStyle: {
          color: 'rgba(200,200,200,0.3)'
        }
      }
    },

    dataZoom: {
      dataBackgroundColor: '#eee',
      fillerColor: 'rgba(64,136,41,0.2)',
      handleColor: '#408829'
    },
    grid: {
      borderWidth: 0
    },

    categoryAxis: {
      axisLine: {
        lineStyle: {
          color: '#408829'
        }
      },
      splitLine: {
        lineStyle: {
          color: ['#eee']
        }
      }
    },

    valueAxis: {
      axisLine: {
        lineStyle: {
          color: '#408829'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
        }
      },
      splitLine: {
        lineStyle: {
          color: ['#eee']
        }
      }
    },
    timeline: {
      lineStyle: {
        color: '#408829'
      },
      controlStyle: {
        normal: {
          color: '#408829'
        },
        emphasis: {
          color: '#408829'
        }
      }
    },

    k: {
      itemStyle: {
        normal: {
          color: '#68a54a',
          color0: '#a9cba2',
          lineStyle: {
            width: 1,
            color: '#408829',
            color0: '#86b379'
          }
        }
      }
    },
    map: {
      itemStyle: {
        normal: {
          areaStyle: {
            color: '#ddd'
          },
          label: {
            textStyle: {
              color: '#c12e34'
            }
          }
        },
        emphasis: {
          areaStyle: {
            color: '#99d2dd'
          },
          label: {
            textStyle: {
              color: '#c12e34'
            }
          }
        }
      }
    },
    force: {
      itemStyle: {
        normal: {
          linkStyle: {
            strokeColor: '#408829'
          }
        }
      }
    },
    chord: {
      padding: 4,
      itemStyle: {
        normal: {
          lineStyle: {
            width: 1,
            color: 'rgba(128, 128, 128, 0.5)'
          },
          chordStyle: {
            lineStyle: {
              width: 1,
              color: 'rgba(128, 128, 128, 0.5)'
            }
          }
        },
        emphasis: {
          lineStyle: {
            width: 1,
            color: 'rgba(128, 128, 128, 0.5)'
          },
          chordStyle: {
            lineStyle: {
              width: 1,
              color: 'rgba(128, 128, 128, 0.5)'
            }
          }
        }
      }
    },
    gauge: {
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        show: true,
        lineStyle: {
          color: [
            [0.2, '#86b379'],
            [0.8, '#68a54a'],
            [1, '#408829']
          ],
          width: 8
        }
      },
      axisTick: {
        splitNumber: 10,
        length: 12,
        lineStyle: {
          color: 'auto'
        }
      },
      axisLabel: {
        textStyle: {
          color: 'auto'
        }
      },
      splitLine: {
        length: 18,
        lineStyle: {
          color: 'auto'
        }
      },
      pointer: {
        length: '90%',
        color: 'auto'
      },
      title: {
        textStyle: {
          color: '#333'
        }
      },
      detail: {
        textStyle: {
          color: 'auto'
        }
      }
    },
    textStyle: {
      fontFamily: 'Arial, Verdana, sans-serif'
    }
  };

  //Server Room 溫度API
  //https://cn.wio.seeed.io/v1/node/GroveTempHumProD1/temperature?access_token=e8eb456427796b982154bc9300e4275c
  //建立 Temperature Gauge
  $.ajax({
    url: "https://cn.wio.seeed.io/v1/node/GroveTempHumProD1/temperature?access_token=e8eb456427796b982154bc9300e4275c",
    type: 'GET',
    error: function() {
      console.log('error');
    },
    success: function(e) {
      console.log('Wio API load SUCCESS !!!  ', e);

      if ($('#echart_temp_gauge').length) {
        var echart_temp_gauge = echarts.init(document.getElementById('echart_temp_gauge'), theme);
        console.log("建立echart_temp_gauge");
        echart_temp_gauge.setOption({
          tooltip: {
            formatter: "{a} <br/>{b} : {c}°C"
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {
                show: true,
                title: "Save Image"
              }
            }
          },
          series: [{
            name: '機房溫度',
            type: 'gauge',
            center: ['50%', '50%'],
            min: 10,
            max: 50,
            precision: 0,
            splitNumber: 10,
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [0.3, 'lightgreen'],
                  [0.6, 'orange'],
                  [1, '#ff4500']
                ],
                width: 30
              }
            },
            axisTick: {
              show: true,
              splitNumber: 5,
              length: 8,
              lineStyle: {
                color: '#eee',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#333'
              }
            },
            splitLine: {
              show: true,
              length: 30,
              lineStyle: {
                color: '#eee',
                width: 2,
                type: 'solid'
              }
            },
            pointer: {
              length: '80%',
              width: 8,
              color: 'auto'
            },
            title: {
              show: true,
              textStyle: {
                color: '#333',
                fontSize: 20
              }
            },
            detail: {
              show: true,
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 0,
              borderColor: '#ccc',
              width: 100,
              height: 40,
              formatter: '{value}°C',
              textStyle: {
                color: 'auto',
                fontSize: 30
              }
            },
            data: [{
              value: e.celsius_degree,
              name: 'Celsius'
            }]
          }]
        });
      }
    }
  });



  //建立 row3 4個甜甜圈圖 長條圖
  if ($('#echart_donut_1').length) {
    var echart_donut_1 = echarts.init(document.getElementById('echart_donut_1'), theme);
    console.log("建立echart_donut_1");

    $.ajax({
      url: "http://localhost/esuns_collector/main/proxy.php?route=/Dought1_data",
      type: "GET",
      dataType: "json",
      success: function(JSON) {
        console.log('/Dought1_data JSON load SUCCESS !!!');
        console.log('/Dought1_data: ', JSON);


        echart_donut_1.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [{
            name: 'RAM 使用量',
            type: 'pie',
            radius: ['55%', '85%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal'
                  }
                }
              }
            },
            data: JSON
          }]
        });
      },
      error: function() {
        console.log('/TEST JSON load failed...');
      }
    })
  }


  if ($('#echart_donut_2').length) {
    var echart_donut_2 = echarts.init(document.getElementById('echart_donut_2'), theme);

    console.log("建立echart_donut_2");
    $.ajax({
      url: "http://localhost/esuns_collector/main/proxy.php?route=/Dought2_data",
      type: "GET",
      dataType: "json",
      success: function(JSON) {
        console.log('/Dought2_data JSON load SUCCESS !!!');
        console.log('/Dought2_data: ', JSON);

        for (i = 0; i < JSON.length; i++) {
          switch (JSON[i].name) {
            case 'classA':
              JSON[i].name = '大於等於8次';
              break;

            case 'classB':
              JSON[i].name = '5~7次';
              break;

            case 'classC':
              JSON[i].name = '2~4次';
              break;

            case 'classD':
              JSON[i].name = '1次';
              break;
          }
        }

        echart_donut_2.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [{
            name: '開機次數',
            type: 'pie',
            radius: ['55%', '85%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal'
                  }
                }
              }
            },
            data: JSON
          }]
        });

      },
      error: function() {
        console.log('/Dought2_data JSON load failed...');
      }
    })
  }


  if ($('#echart_donut_3').length) {
    var echart_donut_3 = echarts.init(document.getElementById('echart_donut_3'), theme);
    console.log("建立echart_donut_3");

    $.ajax({
      url: "http://localhost/esuns_collector/main/proxy.php?route=/Dought3_data",
      type: "GET",
      dataType: "json",
      success: function(JSON) {
        console.log('/Dought3_data JSON load SUCCESS !!!');
        console.log('/Dought3_data: ', JSON);

        for (i = 0; i < JSON.length; i++) {
          switch (JSON[i].name) {
            case 'classA':
              JSON[i].name = '大於等於80';
              break;

            case 'classB':
              JSON[i].name = '50~79';
              break;

            case 'classC':
              JSON[i].name = '25~49';
              break;

            case 'classD':
              JSON[i].name = '小於24';
              break;
          }
        }

        echart_donut_3.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [{
            name: 'CPU使用比率/人數',
            type: 'pie',
            radius: ['55%', '85%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal'
                  }
                }
              }
            },
            data: JSON
          }]
        });

      },
      error: function() {
        console.log('/Dought2_data JSON load failed...');
      }
    })


  }

  if ($('#echart_donut_4').length) {
    var echart_donut_4 = echarts.init(document.getElementById('echart_donut_4'), theme);
    console.log("建立echart_donut_4");
    $.ajax({
      url: "http://localhost/esuns_collector/main/proxy.php?route=/Dought4_data",
      type: "GET",
      dataType: "json",
      success: function(JSON) {
        console.log('/Dought3_data JSON load SUCCESS !!!');
        console.log('/Dought3_data: ', JSON);

        for (i = 0; i < JSON.length; i++) {
          switch (JSON[i].name) {
            case 'classA':
              JSON[i].name = '大於等於17小時';
              break;

            case 'classB':
              JSON[i].name = '9~16小時';
              break;

            case 'classC':
              JSON[i].name = '5~8小時';
              break;

            case 'classD':
              JSON[i].name = '小於等於4小時';
              break;
          }
        }

        echart_donut_4.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [{
            name: '開機時間',
            type: 'pie',
            radius: ['55%', '85%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal'
                  }
                }
              }
            },
            data: JSON
          }]
        });

      },
      error: function() {
        console.log('/Dought4_data JSON load failed...');
      }
    })
  }

} /* /function init_echarts() */

//********************//
/* ajax Top5上 */
//填入資料 id=profile_restart_top5
var data_PC_Summary = $.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/PC_Summary",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/PC_Summary JSON load SUCCESS !!!');
    console.log("/PC_Summary JSON", data_PC_Summary.responseJSON);

    //tile_2 Restart Warning id="tile_Restart_Warning"
    $("#tile_Restart_Warning").html(data_PC_Summary.responseJSON.Warning_number);

    var profile_restart_top5_content = '';
    for (var i in data_PC_Summary.responseJSON.Warning_list) {
      if (data_PC_Summary.responseJSON.Warning_list[i]['PC_name'] === null) {
        break;
      }
      if (i == 5) {
        break;
      }
      profile_restart_top5_content = profile_restart_top5_content + "<li class=\"media event\">" +
        "<a class=\"pull-left border-aero profile_thumb\">" +
        "<i class=\"fa fa-user aero\"></i>" +
        "</a>" +
        "<div class=\"media-body\">" +
        "<a style=\"font-size:150%;\" class=\"title\" href=\"http://localhost/esuns_collector/main/proxy.php?route=/PC_Summary\">" + data_PC_Summary.responseJSON.Warning_list[i]['PC_name'] + "</a>" +
        "<p style=\"font-size:150%;\">Restart : <strong>" + data_PC_Summary.responseJSON.Warning_list[i]['Launch_Count'] + "</strong>  |  Runtime: <strong>" + data_PC_Summary.responseJSON.Warning_list[i]['Running_Hour'] + "</strong></p>" +
        "</div></li>"
    }
    //填入資料 Row2 profile
    $("#profile_restart_top5").html(profile_restart_top5_content);
  },
  error: function() {
    console.log('/PC_Summary JSON load failed...');
    $("#tile_Restart_Warning").html('offline');
    $("#profile_restart_top5").html('Resource is offline.');
  }
});


/* ajax Top5下 */
//填入資料 id=profile_CPU_top5
var data_CPU_Over_Count = $.ajax({
      url: "http://localhost/esuns_collector/main/proxy.php?route=/CPU_Over_Count",
      type: "GET",
      dataType: "json",
      success: function(JSON) {
        console.log('/CPU_Over_Count JSON load SUCCESS !!!');
        console.log("/CPU_Over_Count JSON", data_CPU_Over_Count.responseJSON);

        //tile_3 CPU Warning id="tile_CPU_Warning"
        $("#tile_CPU_Warning").html(data_CPU_Over_Count.responseJSON.CPU_Warning_number);


          var profile_CPU_top5_content = '';
          for (var i in data_CPU_Over_Count.responseJSON.CPU_Warning_list) {
            if (data_CPU_Over_Count.responseJSON.CPU_Warning_list[i]['PC_name'] === null) {
              break;
            }
            if (i == 5) {
              break;
            }

            profile_CPU_top5_content = profile_CPU_top5_content + "<li class=\"media event\">" +
              "<a class=\"pull-left border-aero profile_thumb\">" +
              "<i class=\"fa fa-user aero\"></i>" +
              "</a>" +
              "<div class=\"media-body\">" +
              "<a style=\"font-size:150%;\" class=\"title\" href=\"http://localhost/esuns_collector/main/proxy.php?route=/CPU_Over_Count\">" + data_CPU_Over_Count.responseJSON.CPU_Warning_list[i]['PCName'] + "</a>" +
              "<p style=\"font-size:150%;\">MAX: <strong>" + Math.floor(data_CPU_Over_Count.responseJSON.CPU_Warning_list[i]['Max_CPULoad']) + "</strong>  |  AVG: <strong>" + Math.floor(data_CPU_Over_Count.responseJSON.CPU_Warning_list[i]['Avg_CPULoad']) + "</strong>  |  MIN: <strong>" + Math.floor(data_CPU_Over_Count.responseJSON.CPU_Warning_list[i]['Min_CPULoad']) + "</strong></p>" +
              "</div></li>"
          }

          //填入資料 profile_CPU_top5
          $("#profile_CPU_top5").html(profile_CPU_top5_content);




      },
        error: function() {
          console.log('/PC_Summary JSON load failed...');
          $("#profile_CPU_top5").html('Resource is offline.');
        }
      });





    //********************//

    /* ajax /Reapir_Case/1 */
    //填入資料 tile_1 Repair Orders
    var data_RepairOrder = $.ajax({
      url: "http://localhost/esuns_collector/main/proxy.php?route=/Reapir_Case/1",
      type: "GET",
      dataType: "json",
      success: function(JSON) {
        console.log('/Reapir_Case/1 JSON load SUCCESS !!!');
        console.log(data_RepairOrder.responseJSON);
        $("#tile_Repair_Orders").html(data_RepairOrder.responseJSON.data[0].QueueCase);
      },
      error: function() {
        console.log('/Reapir_Case/1 JSON load failed...');
        $("#tile_Repair_Orders").html('offline');
      }
    });


    /********************/


    /* function SPARKLINES() */
    function init_sparklines() {

      if (typeof(jQuery.fn.sparkline) === 'undefined') {
        return;
      }
      console.log('init_sparklines');


      //ajax json for /Reapir_Case/30
      //for SPARKLINES
      $.ajax({
        url: "http://localhost/esuns_collector/main/proxy.php?route=/Reapir_Case/30",
        type: "GET",
        dataType: "json",
        success: function(JSON) {
          console.log('/Reapir_Case/30 JSON load SUCCESS !!!');
          console.log('/Reapir_Case/30: ', JSON);
          var sparkline_one_data = [];
          var sparkline_one_data_with_date = [];
          var sparkline_two_data = [];
          var sparkline_two_data_with_date = [];

          for (i = 0; i < JSON.data.length; i++) {
            var QueueCase = JSON.data[i].QueueCase - JSON.data[i].NewCase;
            var NewCase = JSON.data[i].NewCase;
            if (QueueCase < 0) {
              QueueCase = 0
            };
            sparkline_one_data.push([QueueCase, NewCase]);
            sparkline_one_data_with_date.push([QueueCase, NewCase, JSON.data[i].RC_Date]);
            sparkline_two_data.push([JSON.data[i].CloseCase]);
            sparkline_two_data_with_date.push([JSON.data[i].CloseCase, JSON.data[i].RC_Date]);
          }
          sparkline_one_data = sparkline_one_data.reverse();
          sparkline_one_data_with_date = sparkline_one_data_with_date.reverse();
          sparkline_two_data = sparkline_two_data.reverse();
          sparkline_two_data_with_date = sparkline_two_data_with_date.reverse();
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
          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//
          $('#sparkline_two').bind('sparklineClick', function(ev) {
            var sparkline = ev.sparklines[0],
              region = sparkline.getCurrentRegionFields();
            console.log('select:', region[0].offset[1], 'date: ' + sparkline_two_data_with_date[region[0].offset][1] + '  結案: ' + region[0].value);
            window.open("http://localhost/esuns_collector/main/proxy.php?route=/Reapir_Case/30");
          });

          $('#sparkline_two').bind('sparklineRegionChange', function(ev) {
            var sparkline = ev.sparklines[0],
              region = sparkline.getCurrentRegionFields();
            $('#sparkline_two_text').text(sparkline_two_data_with_date[region[0].offset][1] + '  結案: ' + region[0].value);
          }).bind('mouseleave', function() {
            $('#sparkline_two_text').text('\xa0');
          });
          ///////////////////////////////////////////////////////
        },
        error: function() {
          console.log('/Reapir_Case/30 JSON load failed...');
          $("#sparkline_one").html('Resource offline...');
          $("#sparkline_two").html('Resource offline...');

        }
      })

    }; /* /function SPARKLINES() */



    /* start all */
    $(document).ready(function() {
      startTime();
      init_sparklines();
      init_echarts();

    });
