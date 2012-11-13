// function formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   var hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0'+minutes : minutes;
//   strTime = hours + ':' + minutes + ' ' + ampm;
//   return strTime;
// };

$(function() {

    $("#slider").slider({
    	min: 1351699200,
    	max: 1351728000,
    	value: 1351699200,
        // step: 1800, // restrict slider to 30 minute intervals

    	slide: function(event,ui) {

            // convert time from Unix to regular AM/PM
            var date = new Date(ui.value*1000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = "AM";
            if (hours > 11) { ampm = "PM" }
            if (hours > 12) { hours = hours - 12; }
            if (hours == 0) { hours = 12; }
            if (minutes == 0) { minutes = "00" } 
            var currentTime = hours+":"+minutes+ampm;

            // update #time div
            $('#time').html('Time: '+currentTime);

    	}
    });

});

$("#tag-button").toggle(
  function(){
    $(".tag-box").fadeIn(250);
  },
  function(){
    $(".tag-box").fadeOut(250);
  }
);