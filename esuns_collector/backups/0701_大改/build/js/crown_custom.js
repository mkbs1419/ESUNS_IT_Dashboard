/* ECHRTS */

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

  //ID: power_echart_gauge

  if ($('#power_echart_gauge').length) {

    var power_echart_gauge = echarts.init(document.getElementById('power_echart_gauge'), theme);

    power_echart_gauge.setOption({
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true,
            title: "Restore"
          },
          saveAsImage: {
            show: true,
            title: "Save Image"
          }
        }
      },
      series: [{
        name: 'Performance',
        type: 'gauge',
        center: ['50%', '50%'],
        startAngle: 140,
        endAngle: -140,
        min: 0,
        max: 100,
        precision: 0,
        splitNumber: 10,
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [0.2, 'lightgreen'],
              [0.4, 'orange'],
              [0.8, 'skyblue'],
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
          formatter: function(v) {
            switch (v + '') {
              case '10':
                return 'a';
              case '30':
                return 'b';
              case '60':
                return 'c';
              case '90':
                return 'd';
              default:
                return '';
            }
          },
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
          offsetCenter: ['-65%', -10],
          textStyle: {
            color: '#333',
            fontSize: 15
          }
        },
        detail: {
          show: true,
          backgroundColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderColor: '#ccc',
          width: 100,
          height: 40,
          offsetCenter: ['-60%', 10],
          formatter: '{value}%',
          textStyle: {
            color: 'auto',
            fontSize: 30
          }
        },
        data: [{
          value: 0,
          name: 'Performance'
        }]
      }]
    });

  }

  //ID: power_echart_line

  if ($('#power_echart_line').length) {

    var power_echart_line = echarts.init(document.getElementById('power_echart_line'), theme);

    power_echart_line.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        x: 220,
        y: 40,
        data: ['CB1', 'CB2', 'CB3', 'CB4']
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            title: {
              line: 'Line',
              bar: 'Bar',
              stack: 'Stack',
              tiled: 'Tiled'
            },
            type: ['line', 'bar', 'stack', 'tiled']
          },
          restore: {
            show: true,
            title: "Restore"
          },
          saveAsImage: {
            show: true,
            title: "Save Image"
          }
        }
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: []
    });

  }

  //ID: power_donut_MCB

  if ($('#power_donut_MCB').length) {

    var power_donut_MCB = echarts.init(document.getElementById('power_donut_MCB'), theme);

    power_donut_MCB.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      calculable: true,
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'center',
                max: 1548
              }
            }
          },
          restore: {
            show: true,
            title: "Restore"
          },
          saveAsImage: {
            show: true,
            title: "Save Image"
          }
        }
      },
      series: [{
        name: '能源利用區分 (度)',
        type: 'pie',
        radius: ['35%', '55%'],
        itemStyle: {
          normal: {
            label: {
              show: true
            },
            labelLine: {
              show: true
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
        data: []
      }]
    });

  };



  //ID: power_donut_CB1
  if ($('#power_donut_CB1').length) {

    var power_donut_CB1 = echarts.init(document.getElementById('power_donut_CB1'), theme);

    power_donut_CB1.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      calculable: true,
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'center',
                max: 1548
              }
            }
          },
          restore: {
            show: true,
            title: "Restore"
          },
          saveAsImage: {
            show: true,
            title: "Save Image"
          }
        }
      },
      series: [{
        name: '能源利用區分 (度)',
        type: 'pie',
        radius: ['35%', '55%'],
        itemStyle: {
          normal: {
            label: {
              show: true
            },
            labelLine: {
              show: true
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
        data: []
      }]
    });

  }



  //ID: power_donut_CB2
  if ($('#power_donut_CB2').length) {

    var power_donut_CB2 = echarts.init(document.getElementById('power_donut_CB2'), theme);

    power_donut_CB2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      calculable: true,
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['Direct Access', 'E-mail Marketing', 'Union Ad', 'Video Ads', 'Search Engine']
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'center',
                max: 1548
              }
            }
          },
          restore: {
            show: true,
            title: "Restore"
          },
          saveAsImage: {
            show: true,
            title: "Save Image"
          }
        }
      },
      series: [{
        name: '能源利用區分 (度)',
        type: 'pie',
        radius: ['35%', '55%'],
        itemStyle: {
          normal: {
            label: {
              show: true
            },
            labelLine: {
              show: true
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
        data: []
      }]
    });
  }


// random value
$.ajax({
  url: "",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('JSON from /XXXX: ', JSON);
  },
  error: function() {
    console.log('JSON load failed...');
    //$("#power_echart_gauge").html('Resource is offline...');

    var rand_int = Math.floor(Math.random() * 10) + 50;

    power_echart_gauge.setOption({
        series: [{
          data: [{
            value: rand_int,
            name: 'Performance'
          }]
        }]
    });

  }
})


  //ajax json for /EQ_kwh
  $.ajax({
    url: "http://localhost/esuns_collector/main/proxy_cp.php?route=/EQ_kwh",
    type: "GET",
    dataType: "json",
    success: function(JSON) {
      console.log('JSON from /EQ_kwh: ', JSON);

//// ROW 1 電力曲線圖

      //edit chart's date
      $("#power_echart_gauge_date").html(JSON.ago);
      $("#power_echart_line_date").html(JSON.ago);

      var line_CB1 = [], line_CB2 = [], line_CB3 = [], line_CB4 = [];

      for (var i in JSON.data) {
        //line_CB1
        if (JSON.data[i].eq_id.includes('CB1')) {
          line_CB1.push(JSON.data[i].hour0_kwh);
          line_CB1.push(JSON.data[i].hour1_kwh);
          line_CB1.push(JSON.data[i].hour2_kwh);
          line_CB1.push(JSON.data[i].hour3_kwh);
          line_CB1.push(JSON.data[i].hour4_kwh);
          line_CB1.push(JSON.data[i].hour5_kwh);
          line_CB1.push(JSON.data[i].hour6_kwh);
          line_CB1.push(JSON.data[i].hour7_kwh);
          line_CB1.push(JSON.data[i].hour8_kwh);
          line_CB1.push(JSON.data[i].hour9_kwh);
          line_CB1.push(JSON.data[i].hour10_kwh);
          line_CB1.push(JSON.data[i].hour11_kwh);
          line_CB1.push(JSON.data[i].hour12_kwh);
          line_CB1.push(JSON.data[i].hour13_kwh);
          line_CB1.push(JSON.data[i].hour14_kwh);
          line_CB1.push(JSON.data[i].hour15_kwh);
          line_CB1.push(JSON.data[i].hour16_kwh);
          line_CB1.push(JSON.data[i].hour17_kwh);
          line_CB1.push(JSON.data[i].hour18_kwh);
          line_CB1.push(JSON.data[i].hour19_kwh);
          line_CB1.push(JSON.data[i].hour20_kwh);
          line_CB1.push(JSON.data[i].hour21_kwh);
          line_CB1.push(JSON.data[i].hour22_kwh);
          line_CB1.push(JSON.data[i].hour23_kwh);
          line_CB1.push(JSON.data[i].hour24_kwh);

          console.log('CB1 array: ', line_CB1);
        }
        //line_CB2
        if (JSON.data[i].eq_id.includes('CB2')) {
          line_CB2.push(JSON.data[i].hour0_kwh);
          line_CB2.push(JSON.data[i].hour1_kwh);
          line_CB2.push(JSON.data[i].hour2_kwh);
          line_CB2.push(JSON.data[i].hour3_kwh);
          line_CB2.push(JSON.data[i].hour4_kwh);
          line_CB2.push(JSON.data[i].hour5_kwh);
          line_CB2.push(JSON.data[i].hour6_kwh);
          line_CB2.push(JSON.data[i].hour7_kwh);
          line_CB2.push(JSON.data[i].hour8_kwh);
          line_CB2.push(JSON.data[i].hour9_kwh);
          line_CB2.push(JSON.data[i].hour10_kwh);
          line_CB2.push(JSON.data[i].hour11_kwh);
          line_CB2.push(JSON.data[i].hour12_kwh);
          line_CB2.push(JSON.data[i].hour13_kwh);
          line_CB2.push(JSON.data[i].hour14_kwh);
          line_CB2.push(JSON.data[i].hour15_kwh);
          line_CB2.push(JSON.data[i].hour16_kwh);
          line_CB2.push(JSON.data[i].hour17_kwh);
          line_CB2.push(JSON.data[i].hour18_kwh);
          line_CB2.push(JSON.data[i].hour19_kwh);
          line_CB2.push(JSON.data[i].hour20_kwh);
          line_CB2.push(JSON.data[i].hour21_kwh);
          line_CB2.push(JSON.data[i].hour22_kwh);
          line_CB2.push(JSON.data[i].hour23_kwh);
          line_CB2.push(JSON.data[i].hour24_kwh);

          console.log('CB2 array: ', line_CB2);
        }
        //line_CB3
        if (JSON.data[i].eq_id.includes('CB3')) {
          line_CB3.push(JSON.data[i].hour0_kwh);
          line_CB3.push(JSON.data[i].hour1_kwh);
          line_CB3.push(JSON.data[i].hour2_kwh);
          line_CB3.push(JSON.data[i].hour3_kwh);
          line_CB3.push(JSON.data[i].hour4_kwh);
          line_CB3.push(JSON.data[i].hour5_kwh);
          line_CB3.push(JSON.data[i].hour6_kwh);
          line_CB3.push(JSON.data[i].hour7_kwh);
          line_CB3.push(JSON.data[i].hour8_kwh);
          line_CB3.push(JSON.data[i].hour9_kwh);
          line_CB3.push(JSON.data[i].hour10_kwh);
          line_CB3.push(JSON.data[i].hour11_kwh);
          line_CB3.push(JSON.data[i].hour12_kwh);
          line_CB3.push(JSON.data[i].hour13_kwh);
          line_CB3.push(JSON.data[i].hour14_kwh);
          line_CB3.push(JSON.data[i].hour15_kwh);
          line_CB3.push(JSON.data[i].hour16_kwh);
          line_CB3.push(JSON.data[i].hour17_kwh);
          line_CB3.push(JSON.data[i].hour18_kwh);
          line_CB3.push(JSON.data[i].hour19_kwh);
          line_CB3.push(JSON.data[i].hour20_kwh);
          line_CB3.push(JSON.data[i].hour21_kwh);
          line_CB3.push(JSON.data[i].hour22_kwh);
          line_CB3.push(JSON.data[i].hour23_kwh);
          line_CB3.push(JSON.data[i].hour24_kwh);

          console.log('CB3 array: ', line_CB3);
        }
        //line_CB4
        if (JSON.data[i].eq_id.includes('CB4')) {
          line_CB4.push(JSON.data[i].hour0_kwh);
          line_CB4.push(JSON.data[i].hour1_kwh);
          line_CB4.push(JSON.data[i].hour2_kwh);
          line_CB4.push(JSON.data[i].hour3_kwh);
          line_CB4.push(JSON.data[i].hour4_kwh);
          line_CB4.push(JSON.data[i].hour5_kwh);
          line_CB4.push(JSON.data[i].hour6_kwh);
          line_CB4.push(JSON.data[i].hour7_kwh);
          line_CB4.push(JSON.data[i].hour8_kwh);
          line_CB4.push(JSON.data[i].hour9_kwh);
          line_CB4.push(JSON.data[i].hour10_kwh);
          line_CB4.push(JSON.data[i].hour11_kwh);
          line_CB4.push(JSON.data[i].hour12_kwh);
          line_CB4.push(JSON.data[i].hour13_kwh);
          line_CB4.push(JSON.data[i].hour14_kwh);
          line_CB4.push(JSON.data[i].hour15_kwh);
          line_CB4.push(JSON.data[i].hour16_kwh);
          line_CB4.push(JSON.data[i].hour17_kwh);
          line_CB4.push(JSON.data[i].hour18_kwh);
          line_CB4.push(JSON.data[i].hour19_kwh);
          line_CB4.push(JSON.data[i].hour20_kwh);
          line_CB4.push(JSON.data[i].hour21_kwh);
          line_CB4.push(JSON.data[i].hour22_kwh);
          line_CB4.push(JSON.data[i].hour23_kwh);
          line_CB4.push(JSON.data[i].hour24_kwh);

          console.log('CB4 array: ', line_CB4);
        }
      }


      power_echart_line.setOption({
        title: {
          subtext: JSON.ago
        },
        series: [{
          name: 'CB1',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: line_CB1
        }, {
          name: 'CB2',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: line_CB2
        }, {
          name: 'CB3',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: line_CB3
        }, {
          name: 'CB4',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: line_CB4
        }]
      });
    },
    error: function() {
      console.log('/EQ_kwh JSON load failed...');
      $("#power_echart_line").html('Resource is offline...');
    }
  })



  //ajax json for /AI_record
  $.ajax({
    url: "http://localhost/esuns_collector/main/proxy_cp.php?route=/AI_record",
    type: "GET",
    dataType: "json",
    success: function(JSON) {
      console.log('JSON from /AI_record: ', JSON);

//// ROW 2 三張pi圖

      //edit chart's date
      $("#MCB_pi_date").html(JSON.ago);
      $("#CB1_pi_date").html(JSON.ago);
      $("#CB2_pi_date").html(JSON.ago);

      // SUM
      var power_value = {'CB1':0,'CB2':0,'CB3':0,'CB4':0,'BMP':0,'1MPA':0,'2MPA':0,'2MP':0,'3MPA':0,'4MPA':0,'5MPA':0,'6MPA':0,'7MPA':0};

      for (var i in JSON.data) {
        //CB1
        if (JSON.data[i].eq_id.includes('CB1')) {
          //console.log('add!!CB1');
          power_value['CB1'] = power_value['CB1'] + JSON.data[i].value_int
        }
        //CB2
        if (JSON.data[i].eq_id.includes('CB2')) {
          //console.log('add!!CB2');
          power_value['CB2'] = power_value['CB2'] + JSON.data[i].value_int
        }
        //CB3
        if (JSON.data[i].eq_id.includes('CB3')) {
          //console.log('add!!CB3');
          power_value['CB3'] = power_value['CB3'] + JSON.data[i].value_int
        }
        //CB4
        if (JSON.data[i].eq_id.includes('CB4')) {
          //console.log('add!!CB2');
          power_value['CB4'] = power_value['CB4'] + JSON.data[i].value_int
        }
        //BMP
        if (JSON.data[i].eq_id.includes('BMP')) {
          //console.log('add!!BMP');
          power_value['BMP'] = power_value['BMP'] + JSON.data[i].value_int
        }
        //1MPA
        if (JSON.data[i].eq_id.includes('1MPA')) {
          //console.log('add!!1MPA');
          power_value['1MPA'] = power_value['1MPA'] + JSON.data[i].value_int
        }
        //2MPA
        if (JSON.data[i].eq_id.includes('2MPA')) {
          //console.log('add!!2MPA');
          power_value['2MPA'] = power_value['2MPA'] + JSON.data[i].value_int
        }
        //2MP
        if (JSON.data[i].eq_id.includes('2MP')) {
          //console.log('add!!2MP');
          power_value['2MP'] = power_value['2MP'] + JSON.data[i].value_int
        }
        //3MPA
        if (JSON.data[i].eq_id.includes('3MPA')) {
          //console.log('add!!3MPA');
          power_value['3MPA'] = power_value['3MPA'] + JSON.data[i].value_int
        }
        //4MPA
        if (JSON.data[i].eq_id.includes('4MPA')) {
          //console.log('add!!4MPA');
          power_value['4MPA'] = power_value['4MPA'] + JSON.data[i].value_int
        }
        //5MPA
        if (JSON.data[i].eq_id.includes('5MPA')) {
          //console.log('add!!5MPA');
          power_value['5MPA'] = power_value['5MPA'] + JSON.data[i].value_int
        }
        //6MPA
        if (JSON.data[i].eq_id.includes('6MPA')) {
          //console.log('add!!6MPA');
          power_value['6MPA'] = power_value['6MPA'] + JSON.data[i].value_int
        }
        //7MPA
        if (JSON.data[i].eq_id.includes('7MPA')) {
          //console.log('add!!7MPA');
          power_value['7MPA'] = power_value['7MPA'] + JSON.data[i].value_int
        }
      }

      console.log('power_value value: ', power_value);


      power_donut_MCB.setOption({
        series: [{
          data: [{
            value: power_value['CB1'],
            name: 'CB1'
          }, {
            value: power_value['CB2'],
            name: 'CB2'
          }, {
            value: power_value['CB3'],
            name: 'CB3'
          }, {
            value: power_value['CB4'],
            name: 'CB4'
          }]
        }]
      });

      power_donut_CB1.setOption({
        series: [{
          data: [{
            value: power_value['BMP'],
            name: 'BMP'
          }, {
            value: power_value['1MPA'],
            name: '1MPA'
          }, {
            value: power_value['2MPA'],
            name: '2MPA'
          }, {
            value: power_value['2MP'],
            name: '2MP'
          }, {
            value: power_value['3MPA'],
            name: '3MPA'
          }, {
            value: power_value['4MPA'],
            name: '4MPA'
          }]
        }]
      });

      power_donut_CB2.setOption({
        series: [{
          data: [{
            value: power_value['5MPA'],
            name: '5MPA'
          }, {
            value: power_value['6MPA'],
            name: '6MPA'
          }, {
            value: power_value['7MPA'],
            name: '7MPA'
          }]
        }]
      });

    },
    error: function() {
      console.log('/AI_record JSON load failed...');
      $("#power_donut_MCB").html('Resource is offline...');
    }
  })

} /* /function init_echarts() */


$(document).ready(function() {
  //init_echarts();
});
