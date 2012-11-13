var selected_time = 1351699200;

$(function() {

    $("#slider").slider({
    	min: 1351699200, // 8:00 AM
    	max: 1351728000, // 4:00 PM
    	value: 1351699200,
        step: 1800, // restrict slider to 30 minute intervals

        create: function(event,ui) {
            selected_time = $(this).slider('value');
            var date = new Date(selected_time*1000);
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
            selected_time = $(this).slider('value');
            console.log(selected_time);
            // convert time from Unix to regular AM/PM
            var date = new Date(selected_time*1000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = "AM";
            if (hours > 11) { ampm = "PM" }
            if (hours > 12) { hours = hours - 12; }
            if (hours == 0) { hours = 12; }
            if (minutes < 10) { minutes = "0" + minutes }
            if (minutes == 0) { minutes = "00" } 
            var currentTime = hours+":"+minutes+ampm;
            console.log(currentTime);

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
