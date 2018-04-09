/* FOR index.html */

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
  document.getElementById('tile_date').innerHTML = h + ":" + m + ":" + s;
  document.getElementById('tile_clock').innerHTML = year + "/" + month + "/" + day;
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


  //ID: row2_chart 長條圖
  //先建立圖
  if ($('#row2_chart').length) {
    var row2_chart = echarts.init(document.getElementById('row2_chart'), theme);
    console.log('建立折線圖');

    row2_chart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        x: 220,
        y: 40,
        data: ['restart count']
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
        type: 'time',
        splitLine:{
          show: true
        }
      }],
      yAxis: [{
        type: 'value',
        splitLine: {
          show: false
        }
      }],
      series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: true,
        hoverAnimation: false,
        data: []
      }]
    });

  }

  //建立 row3 三個甜甜圈圖 長條圖
  if ($('#echart_donut_1').length) {
    var echart_donut_1 = echarts.init(document.getElementById('echart_donut_1'), theme);
    console.log("建立echart_donut_1");

    echart_donut_1.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [{
        name: 'CPU 使用率',
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
        data: [{
          value: 55,
          name: 'Direct Access'
        }, {
          value: 43,
          name: 'E-mail Marketing'
        }, {
          value: 20,
          name: 'Union Ad'
        }, {
          value: 15,
          name: 'Video Ads'
        }, {
          value: 8,
          name: 'Search Engine'
        }]
      }]
    });
  }


  if ($('#echart_donut_2').length) {
    var echart_donut_2 = echarts.init(document.getElementById('echart_donut_2'), theme);
    console.log("建立echart_donut_2");

    echart_donut_2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [{
        name: '重開機次數',
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
        data: [{
          value: 16,
          name: 'X1111111'
        }, {
          value: 12,
          name: 'X1111222'
        }, {
          value: 8,
          name: 'X1111333'
        }, {
          value: 7,
          name: 'X1111444'
        }, {
          value: 4,
          name: 'X1111555'
        }]
      }]
    });
  }


  if ($('#echart_donut_3').length) {
    var echart_donut_3 = echarts.init(document.getElementById('echart_donut_3'), theme);
    console.log("建立echart_donut_3");

    echart_donut_3.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [{
        name: 'RAM占用比率',
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
        data: [{
          value: 55,
          name: 'Direct Access'
        }, {
          value: 43,
          name: 'E-mail Marketing'
        }, {
          value: 20,
          name: 'Union Ad'
        }, {
          value: 15,
          name: 'Video Ads'
        }, {
          value: 8,
          name: 'Search Engine'
        }]
      }]
    });
  }
} /* /function init_echarts() */

//**********  ajax區  **********//
//填入資料 長條圖
//ajax json for /AP_record
$.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/AP_record/range/20170614-20170614",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('WWWWWW JSON from /AP_record/range: ', JSON);

    //edit chart's date
    $("#data_range_get").html('撈資料 OK');
    /*長條圖內容*/
    ////////////////////////////////////////////////////////////////////////
    /*row2_chart.setOption({
      series: [{
        name: '销量',
        data: data.data
      }]
    });*/

    /////////////////////////////////////////////////////////////////////////
  },
  error: function() {
    console.log('XXXXX JSON load failed...');
    $("#row2_chart").html('Resource is offline...');
  }
})


/* ajax 維修單 */
var data_RepairOrder = $.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/Reapir_Case/1",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/Reapir_Case/1 JSON load SUCCESS!');
    console.log(data_RepairOrder.responseJSON);
    $("#tile_Repair_Orders").html(data_RepairOrder.responseJSON.data[0].QueueCase);
  },
  error: function() {
    console.log('/Reapir_Case/1 JSON load failed...');
    $("#tile_Repair_Orders").html('offline');
  }
});

//填入資料 Row2 profile
//填入資料 甜甜圈2
/* ajax PC_Summary */

var data_PC_Summary = $.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/PC_Summary",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/PC_Summary JSON load SUCCESS!');
    console.log("data_PC_Summary JSON", data_PC_Summary.responseJSON);
    $("#tile_Warning").html(data_PC_Summary.responseJSON.Warning_number);
    $("#list_Warning").html(data_PC_Summary.responseJSON.Warning_list);
    var profile_content = ''
    for (var i in data_PC_Summary.responseJSON.Warning_list) {
      profile_content = profile_content + "<li class=\"media event\">" +
        "<a class=\"pull-left border-aero profile_thumb\">" +
        "<i class=\"fa fa-user aero\"></i>" +
        "</a>" +
        "<div class=\"media-body\">" +
        "<a class=\"title\" href=\"http://localhost/esuns_collector/main/proxy.php?route=/PC_Summary\">" + data_PC_Summary.responseJSON.Warning_list[i]['PC_name'] + "</a>" +
        "<p><strong>" + data_PC_Summary.responseJSON.Warning_list[i]['Launch_Count'] + "</strong> Restart Counts </p>" +
        "<p><strong>" + data_PC_Summary.responseJSON.Warning_list[i]['Running_Hour'] + "</strong> Running Hours </p>" +
        "</div></li>"
    }
    $("#profile").html(profile_content);
    $("#tile_Online_Machines").html(parseInt(i)+1);

//甜甜圈2
    function echart_donut_2_data (){};
  },
  error: function() {
    console.log('/PC_Summary JSON load failed...');
    $("#profile").html('Resource is offline.');
  }
});


//**********  ajax區  **********//


/* DATERANGEPICKER */

function init_daterangepicker() {

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var day = today.getDate();
  var today_date = month + "/" + day + "/" + year

  if (typeof($.fn.daterangepicker) === 'undefined') {
    return;
  }
  console.log('init_daterangepicker');

  var cb = function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  };

  var optionSet1 = {
    startDate: moment().subtract(29, 'days'),
    endDate: moment(),
    minDate: '01/01/2016',
    maxDate: today_date,
    dateLimit: {
      days: 60
    },
    showDropdowns: true,
    showWeekNumbers: true,
    timePicker: false,
    timePickerIncrement: 1,
    timePicker12Hour: true,
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    opens: 'left',
    buttonClasses: ['btn btn-default'],
    applyClass: 'btn-small btn-primary',
    cancelClass: 'btn-small',
    format: 'MM/DD/YYYY',
    separator: ' to ',
    locale: {
      applyLabel: 'Submit',
      cancelLabel: 'Clear',
      fromLabel: 'From',
      toLabel: 'To',
      customRangeLabel: 'Custom',
      daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      firstDay: 1
    }
  };

  $('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
  $('#reportrange').daterangepicker(optionSet1, cb);
  $('#reportrange').on('show.daterangepicker', function() {
    console.log("show event fired");
  });
  $('#reportrange').on('hide.daterangepicker', function() {
    console.log("hide event fired");
  });
  $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
    console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
    var sql = String(picker.startDate.format('YYYYMMDD')) + '-' + String(picker.endDate.format('YYYYMMDD'));
    // fire to change //////////////////////////////////
    $('#row2_select_date').html(sql);
    // row2_chart update

  });
  $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
    console.log("cancel event fired");
  });
  $('#options1').click(function() {
    $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
  });
  $('#options2').click(function() {
    $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
  });
  $('#destroy').click(function() {
    $('#reportrange').data('daterangepicker').remove();
  });

}

function init_daterangepicker_right() {

  if (typeof($.fn.daterangepicker) === 'undefined') {
    return;
  }
  console.log('init_daterangepicker_right');

  var cb = function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    $('#reportrange_right span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  };

  var optionSet1 = {
    startDate: moment().subtract(29, 'days'),
    endDate: moment(),
    minDate: '01/01/2012',
    maxDate: '12/31/2020',
    dateLimit: {
      days: 60
    },
    showDropdowns: true,
    showWeekNumbers: true,
    timePicker: false,
    timePickerIncrement: 1,
    timePicker12Hour: true,
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    opens: 'right',
    buttonClasses: ['btn btn-default'],
    applyClass: 'btn-small btn-primary',
    cancelClass: 'btn-small',
    format: 'MM/DD/YYYY',
    separator: ' to ',
    locale: {
      applyLabel: 'Submit',
      cancelLabel: 'Clear',
      fromLabel: 'From',
      toLabel: 'To',
      customRangeLabel: 'Custom',
      daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      firstDay: 1
    }
  };

  $('#reportrange_right span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

  $('#reportrange_right').daterangepicker(optionSet1, cb);

  $('#reportrange_right').on('show.daterangepicker', function() {
    console.log("show event fired");
  });
  $('#reportrange_right').on('hide.daterangepicker', function() {
    console.log("hide event fired");
  });
  $('#reportrange_right').on('apply.daterangepicker', function(ev, picker) {
    console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
  });
  $('#reportrange_right').on('cancel.daterangepicker', function(ev, picker) {
    console.log("cancel event fired");
  });

  $('#options1').click(function() {
    $('#reportrange_right').data('daterangepicker').setOptions(optionSet1, cb);
  });

  $('#options2').click(function() {
    $('#reportrange_right').data('daterangepicker').setOptions(optionSet2, cb);
  });

  $('#destroy').click(function() {
    $('#reportrange_right').data('daterangepicker').remove();
  });

}

function init_daterangepicker_single_call() {

  if (typeof($.fn.daterangepicker) === 'undefined') {
    return;
  }
  console.log('init_daterangepicker_single_call');

  $('#single_cal1').daterangepicker({
    singleDatePicker: true,
    singleClasses: "picker_1"
  }, function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
  });
  $('#single_cal2').daterangepicker({
    singleDatePicker: true,
    singleClasses: "picker_2"
  }, function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
  });
  $('#single_cal3').daterangepicker({
    singleDatePicker: true,
    singleClasses: "picker_3"
  }, function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
  });
  $('#single_cal4').daterangepicker({
    singleDatePicker: true,
    singleClasses: "picker_4"
  }, function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
  });


}


function init_daterangepicker_reservation() {

  if (typeof($.fn.daterangepicker) === 'undefined') {
    return;
  }
  console.log('init_daterangepicker_reservation');

  $('#reservation').daterangepicker(null, function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
  });

  $('#reservation-time').daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
      format: 'MM/DD/YYYY h:mm A'
    }
  });

}

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
      console.log('JSON from /Reapir_Case/30: ', JSON);
      var sparkline_one_data = [];

      for (i = 0; i < JSON.data.length; i++) {
        sparkline_one_data.push([JSON.data[i].QueueCase, JSON.data[i].NewCase]);
      }


      sparkline_one_data.reverse();

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

      ///////////////////////////////////////////////////////test
      $('#sparkline_one').bind('sparklineClick', function(ev) {
        var sparkline = ev.sparklines[0],
          region = sparkline.getCurrentRegionFields();
        console.log('date: ' + JSON.data[region[0].offset].RC_Date, '原有: ' + region[1].value, '新增: ' + region[0].value);
      });

      $('#sparkline_one').bind('sparklineRegionChange', function(ev) {
        var sparkline = ev.sparklines[0],
          region = sparkline.getCurrentRegionFields();
        $('#sparkline_one_text').text(JSON.data[region[0].offset].RC_Date + '  原有: ' + region[1].value + ' 新增: ' + region[0].value);
      }).bind('mouseleave', function() {
        $('#sparkline_one_text').text('');
      });
      ///////////////////////////////////////////////////////test

    },
    error: function() {
      console.log('/Reapir_Case/30 JSON load failed...');
      $("#sparkline_one").html('Resource offline...');

    }
  })

};/* /function SPARKLINES() */



/* start all */

$(document).ready(function() {
  startTime();
  init_sparklines();
  init_echarts();

});
