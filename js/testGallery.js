$(function() {

    $("#slider").slider({
    	min: 1351699200,
    	max: 1351728000,
    	value: 1351699200,
        step: 1800,

    	slide: function(event,ui) {
            $('#time').text('time: '+ui.value);
            
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