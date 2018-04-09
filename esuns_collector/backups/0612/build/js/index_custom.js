/* FOR index.html */

window.onload=startTime;

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
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var data = $.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/AP_record/summary",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/AP_record/summary JSON load SUCCESS!');
    console.log(data.responseJSON);
    $("#tile_Warning").html(data.responseJSON.Warning_number);
    $("#list_Warning").html(data.responseJSON.Warning_list);
    var profile_content = ''
    for (var i in data.responseJSON.Warning_list)
    {
      console.log('i: ', i);
      console.log('PC_name: ', data.responseJSON.Warning_list[i]['PC_name'],
      ' Launch_Count: ', data.responseJSON.Warning_list[i]['Launch_Count']);
      profile_content = profile_content + "<li class=\"media event\">" +
                                           "<a class=\"pull-left border-aero profile_thumb\">" +
                                            "<i class=\"fa fa-user aero\"></i>" +
                                           "</a>" +
                                           "<div class=\"media-body\">" +
                                            "<a class=\"title\" href=\"http://localhost/esuns_collector/main/proxy.php?route=/AP_record/summary\">"+data.responseJSON.Warning_list[i]['PC_name']+"</a>" +
                                            "<p><strong>"+data.responseJSON.Warning_list[i]['Launch_Count']+"</strong> Restart Today </p>" +
                                            "<p><small>another info</small><p>" +
                                            "</div></li>"
    }
    $("#profile").html(profile_content);
  },
  error: function() {
    console.log('/AP_record/summary JSON load failed...')
  }
});

/*
<!-- profile view -->   <li class="media event">
                          <a class="pull-left border-aero profile_thumb">
                            <i class="fa fa-user aero"></i>
                          </a>
                          <div class="media-body">
                            <a class="title" href="http://localhost/esuns_collector/main/proxy.php?route=/AP_record/summary">Ms. Mary Jane</a>
                            <p><strong>$2300. </strong> Restart Today </p>
                            <p>Detial</p>
                          </div>
<!-- /profile view -->   </li>
*/
