$(function() {

    $("#slider").slider({
    	min: 1351699200, // 8:00 AM
    	max: 1351728000, // 4:00 PM
    	value: 1351699200,
        step: 1800, // restrict slider to 30 minute intervals

        create: function(event,ui) {
            var date = new Date($(this).slider('value')*1000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = "AM";
            if (hours > 11) { ampm = "PM" }
            if (hours > 12) { hours = hours - 12; }
            if (hours == 0) { hours = 12; }
            if (minutes < 10) { minutes = "0" + minutes }
            if (minutes == 0) { minutes = "00" } 
            var currentTime = hours+":"+minutes+ampm;

            // update #time div
            $('#time').html('Time: '+currentTime);
        },

    	slide: function(event,ui) {
            // convert time from Unix to regular AM/PM
            var date = new Date(ui.value*1000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = "AM";
            if (hours > 11) { ampm = "PM" }
            if (hours > 12) { hours = hours - 12; }
            if (hours == 0) { hours = 12; }
            if (minutes < 10) { minutes = "0" + minutes }
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

// This sets value of the slider based on a click
// right now, clicking the time div updates it to a specific time 1351710000
$('#time').live('click', function(){

    $("#slider").slider('value', 1351710000);


    var date = new Date($("#slider").slider('value')*1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = "AM";
    if (hours > 11) { ampm = "PM" }
    if (hours > 12) { hours = hours - 12; }
    if (hours == 0) { hours = 12; }
    if (minutes < 10) { minutes = "0" + minutes }
    if (minutes == 0) { minutes = "00" } 
    var currentTime = hours+":"+minutes+ampm;

    // update #time div
    $('#time').html('Time: '+currentTime);

    // value = current time
    // map current time to location on screen

    // if (value == '8:00'){
    //    $('body').scrollTop();
    // } else if (value == '9:00'){

    // }

});

