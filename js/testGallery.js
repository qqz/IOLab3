var selected_time = 1351699200;

function convertTime(unixtime) {
    var date = new Date((unixtime-3600)*1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = "AM";
    if (hours > 11) { ampm = "PM" }
    if (hours > 12) { hours = hours - 12; }
    if (hours == 0) { hours = 12; }
    if (minutes < 10) { minutes = "0" + minutes }
    if (minutes == 0) { minutes = "00" } 
    var currentTime = hours+":"+minutes+ampm;
    return currentTime
};

$(function() {

    $("#slider").slider({
    	min: 1351699200, // 8:00 AM
    	max: 1351728000, // 4:00 PM
    	value: 1351699200,
        step: 1800, // restrict slider to 30 minute intervals

        // set initial time
        create: function(event,ui) {
            // update selected_time to new slider value
            selected_time = $(this).slider('value');
            // update #time div
            $('#time').html('Time: '+convertTime(selected_time));
        },

        // set time on slide
    	slide: function(event,ui) {
            // update selected_time to new slider value
            selected_time = ui.value;
            console.log(selected_time);
            // update #time div
            $('#time').html('Time: '+convertTime(selected_time));
            console.log(convertTime(selected_time))
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
