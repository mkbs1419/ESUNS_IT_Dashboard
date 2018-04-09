/*0714要修改!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/* ajax Top5下 */
//填入資料 id=profile_CPU_top5
var data_CPU_Over_Count = $.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/CPU_Over_Count",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/CPU_Over_Count JSON load SUCCESS !!!');
    console.log("/CPU_Over_Count JSON", data_CPU_Over_Count.responseJSON);

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
