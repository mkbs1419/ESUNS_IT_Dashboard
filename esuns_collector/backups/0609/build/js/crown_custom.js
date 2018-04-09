//use table [Esuns_Collector_Data].[dbo].[AP_Record]
$(document).ready(function() {
  $('#AI_record_table').DataTable( {
        "ajax": 'http://localhost/esuns_collector/main/proxy_cp.php?route=/AI_record',
        "order": [[ 0, "desc" ]],
        "columns": [
          { "data": "eq_id" },
          { "data": "record_time" },
          { "data": "value_int" },
          { "data": "fun_type" },
          { "data": "is_delete" },
        ]
    } );
} );


/* ECHRTS */

function init_echarts() {

    if( typeof (echarts) === 'undefined'){ return; }
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
          normal: {color: '#408829'},
          emphasis: {color: '#408829'}
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
            color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
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

  if ($('#power_echart_gauge').length ){

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
      value: 50,
      name: 'Performance'
      }]
    }]
    });

  }

     //ID: power_echart_line

  if ($('#power_echart_line').length ){

    var power_echart_line = echarts.init(document.getElementById('power_echart_line'), theme);

    power_echart_line.setOption({
    title: {
      text: '電力曲線圖',
      subtext: '#日期'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 220,
      y: 40,
      data: ['MCB', 'CB1', 'CB2']
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Deal',
      type: 'line',
      smooth: true,
      itemStyle: {
      normal: {
        areaStyle: {
        type: 'default'
        }
      }
      },
      data: [10, 12, 21, 54, 260, 830, 710]
    }, {
      name: 'Pre-order',
      type: 'line',
      smooth: true,
      itemStyle: {
      normal: {
        areaStyle: {
        type: 'default'
        }
      }
      },
      data: [30, 182, 434, 791, 390, 30, 10]
    }, {
      name: 'Intent',
      type: 'line',
      smooth: true,
      itemStyle: {
      normal: {
        areaStyle: {
        type: 'default'
        }
      }
      },
      data: [1320, 1132, 601, 234, 120, 90, 20]
    }]
    });

  }

     //ID: power_echart_donut1

  if ($('#power_echart_donut1').length ){

    var power_echart_donut1 = echarts.init(document.getElementById('power_echart_donut1'), theme);

    power_echart_donut1.setOption({
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
      data: [{
      value: 531044,
      name: 'MCB'
      }, {
      value: 221188,
      name: 'CB1'
      }, {
      value: 124832,
      name: 'CB2'
      }, {
      value: 134819,
      name: 'CB3'
      }, {
      value: 51880,
      name: 'CB4'
      }]
    }]
    });

  }

     //ID: power_echart_donut2

  if ($('#power_echart_donut2').length ){

       var power_echart_donut2 = echarts.init(document.getElementById('power_echart_donut2'), theme);

       power_echart_donut2.setOption({
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
         data: [{
         value: 5678,
         name: 'BMP'
         }, {
         value: 4567,
         name: '1MPA'
         }, {
         value: 3456,
         name: '2MPA'
         }, {
         value: 2345,
         name: '2MP'
         }, {
         value: 2561,
         name: '3MPA'
         }, {
         value: 999,
         name: '4MPA'
         }]
       }]
       });

     }

     //ID: power_echart_donut3

  if ($('#power_echart_donut3').length ){

       var power_echart_donut3 = echarts.init(document.getElementById('power_echart_donut3'), theme);

       power_echart_donut3.setOption({
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
         data: [{
         value: 1419,
         name: '5MPA'
         }, {
         value: 2288,
         name: '6MPA'
         }, {
         value: 5180,
         name: '7MPA'
         }]
       }]
       });
     }
}

$(document).ready(function() {
init_echarts();
});
