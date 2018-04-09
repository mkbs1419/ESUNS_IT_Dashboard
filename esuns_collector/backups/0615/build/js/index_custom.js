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
    document.getElementById('tile_date').innerHTML =  h + ":" + m + ":" + s;
    document.getElementById('tile_clock').innerHTML =  year + "/" + month + "/" + day;
    var t = setTimeout(startTime, 500);
    return h+m+s
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

/* ajax Summary */

var data_summary = $.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/AP_record/summary",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/AP_record/summary JSON load SUCCESS!');
    console.log(data_summary.responseJSON);
    $("#tile_Warning").html(data_summary.responseJSON.Warning_number);
    $("#list_Warning").html(data_summary.responseJSON.Warning_list);
    var profile_content = ''
    for (var i in data_summary.responseJSON.Warning_list)
    {
      profile_content = profile_content + "<li class=\"media event\">" +
                                           "<a class=\"pull-left border-aero profile_thumb\">" +
                                            "<i class=\"fa fa-user aero\"></i>" +
                                           "</a>" +
                                           "<div class=\"media-body\">" +
                                            "<a class=\"title\" href=\"http://localhost/esuns_collector/main/proxy.php?route=/AP_record/summary\">"+data_summary.responseJSON.Warning_list[i]['PC_name']+"</a>" +
                                            "<p><strong>"+data_summary.responseJSON.Warning_list[i]['Launch_Count']+"</strong> Restart Today </p>" +
                                            "<p><small>another info</small><p>" +
                                            "</div></li>"
    }
    $("#profile").html(profile_content);
  },
  error: function() {
    console.log('/AP_record/summary JSON load failed...');
    $("#profile").html('Resource is offline.');
  }
});


/* DATERANGEPICKER */

function init_daterangepicker() {

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var day = today.getDate();
  var today_date = month + "/" + day + "/" + year

 if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
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
   var sql = String(picker.startDate.format('YYYYMMDD')) + '&' + String(picker.endDate.format('YYYYMMDD'));
   $('#row2_select_date').html(sql);
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

   if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
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

 if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
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

 if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
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


/* init_flot_chart */

function init_flot_chart(){
  if( typeof ($.plot) === 'undefined'){ return; };
  console.log("### init row2_chart");

  var data_record1 = $.ajax({
    url: "http://localhost/esuns_collector/main/proxy.php?route=/AP_record/1",
    type: "GET",
    dataType: "json",
    success: function(JSON) {
      console.log('/AP_record/1 JSON load SUCCESS!');
      console.log(data_record1.responseJSON['data'][0]);
      $("#data_range_get").html(data_record1.responseJSON['data'][0]['date']+" "+data_record1.responseJSON['data'][0]['PC_name']);
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
