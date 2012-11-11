$(function() {
    var slider = $('#slider'); 
    var time = $('#time');

    slider.slider({
    	min: 1351699200,
    	max: 1351728000,
    	value: 1351699200,

    	start: function(event,ui) {
    		var value = slider.slider('value');
    		time.text('time: '+value);
            // $("#time").fadeIn(200);
    	},

    	slide: function(event,ui) {
    		var value = slider.slider('value');
            // $("#time").fadeIn(200);
    		time.text('time: '+value);
    	},

        change: function(event,ui) {
            // $("#time").fadeOut(8000);
        },

    });
});

// $("#tag-button").click(function() {
//   $(".tag-box").toggle();
// })

$("#tag-button").toggle(
  function(){
    $(".tag-box").fadeIn(250);
  },
  function(){
    $(".tag-box").fadeOut(250);
  }
);