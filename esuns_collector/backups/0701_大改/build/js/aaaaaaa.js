$.ajax({
	url: "https://cn.wio.seeed.io/v1/node/GroveTempHumProD1/temperature?access_token=e8eb456427796b982154bc9300e4275c",
	type: 'GET',
	error: function(){
		console.log('error');
	},
	success: function(e){
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
            value: 0,
            name: 'Fahrenheit'
          }]
        }]
      });
    }
  }
});
