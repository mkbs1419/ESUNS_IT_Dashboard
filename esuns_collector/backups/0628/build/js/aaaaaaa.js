
/* init_flot_chart */

function init_flot_chart() {
  if (typeof($.plot) === 'undefined') {
    return;
  };
  console.log("### init row2_chart");

  var data_record1 = $.ajax({
    url: "http://localhost/esuns_collector/main/proxy.php?route=/AP_record/range/20170614&20170614",
    type: "GET",
    dataType: "json",
    success: function(JSON) {
      console.log('/AP_record/1 JSON load SUCCESS!');
      console.log(data_record1.responseJSON['data'][0]);
      $("#data_range_get").html(data_record1.responseJSON['data'][0]['date'] + " " + data_record1.responseJSON['data'][0]['PC_name']);
    },
    error: function() {
      console.log('/AP_record/1 JSON load failed...');
      $("#data_range_get").html('Resource is offline.');
    }
  });

}


/* start all */

$(document).ready(function() {
  //init_flot_chart();
  startTime();
});




/////////////////////////////////////////



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














//ajax json for power_donut_MCB
$.ajax({
  url: "//http://localhost/esuns_collector/main/proxy_cp.php?route=/AI_record",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('JSON: ', JSON);
    power_donut_MCB.setOption({
      series: [{
        data: [{
          value: 335,
          name: 'CB1'
        }, {
          value: 335,
          name: 'CB2'
        }, {
          value: 335,
          name: 'CB3'
        }, {
          value: 335,
          name: 'CB4'
        }]
      }]
    });

  },
  error: function() {
    console.log('/AI_record JSON load failed...');
    $("#power_donut_MCB").html('Resource is offline...');
  }
})
