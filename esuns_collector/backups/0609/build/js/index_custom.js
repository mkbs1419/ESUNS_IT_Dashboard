/* FOR index.html */

var data = $.ajax({
  url: "http://localhost/esuns_collector/main/proxy.php?route=/AP_record/summary",
  type: "GET",
  dataType: "json",
  success: function(JSON) {
    console.log('/AP_record/summary JSON load SUCCESS!');
    console.log(data.responseJSON);
    $("#tile_Warning").html(data.responseJSON.Warning_number);
    $("#list_Warning").html(data.responseJSON.Warning_list);
  },
  error: function() {
    console.log('/AP_record/summary JSON load failed...')
  }
});
