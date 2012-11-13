var selected_time = 1351699200;
        var col_counter = 0;
        var col_count_mod = 4; // 4 per column, +1
        var row_counter = 0;

        $(document).ready(function() {

            // Load intial imgs
            load_from_DB(selected_time);

            // Toggle tag box
            $("#tag-button").toggle(
              function(){
                $(".tag-box").fadeIn(250);
              },
              function(){
                $(".tag-box").fadeOut(250);
              }
            );

            // Slider functionality
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
                    stop: function(event,ui) {
                        // update selected_time to new slider value
                        selected_time = ui.value;
                        // call load DB and clear current images
                        refresh_images(selected_time);
                        // update #time div
                        $('#time').html('Time: '+convertTime(selected_time));
                    }

                });

            });
    });
    
    // load new images from DB based on timestamp
    function load_from_DB(selected_time){
        // Make request for image data
        $.ajax({
           type: "POST",
           dataType: "json",                                        
           url: "getData.php",
           data: ({ start_time: selected_time }),
           success: function(data) {
            // for each result, add thumbnail picture to the page
            for (var i = 0;i<data.rows.length;i++) {
                // for every four columns we want to create new row-fluid
                if (col_counter % col_count_mod == 0){
                    // create new row-fluid div

                    row_counter++;
                    $('#image-container').append('<div class="row-fluid" id="row'+row_counter+'"></div>');
                }
                var row_div = '#row' + row_counter;

                $(row_div).append('<div class="img-wrapper span3"><span class="img-id">'+data.rows[i].image_id+'</span><span class="standard-url">'+data.rows[i].standard_url+'</span><span class="created_time">'+data.rows[i].created_time+'</span><a id="open-modal" href="#"><span class="img-tag">#SF Parade</span><img class="img-polaroid lazy" src="assets/blank.gif" data-original="'+data.rows[i].thumbnail_url+'" width="160" height="160"><ul class="img-stats"><li class="stat-likes"><b><span>'+data.rows[i].like_count+'</span></b></li><li class="stat-comments"><b><span>'+data.rows[i].comment_count+'</span></b></li></ul></a></div>');
                    col_counter++;
            } // end of for
             } // end of success
        }).complete( function(){
            // loadImages used to start here
            $("img.lazy").lazyload({
                    effect: "fadeIn"
            });
            // Img hover effect
            $(".img-wrapper img").on({
                mouseenter: function () {
                    $(this).addClass(pickClass());
                },
                mouseleave: function () {
                    $(this).removeClass("img-hover1 img-hover2");
                }
            });
            //create modal
            $(".img-wrapper").click(function(e) {
                var id = $(this).children('.img-id').text();
                var url = $(this).children('.standard-url').text();
                console.log(id);
                console.log(url);
                $('#img-modal img').attr('src', url);
                //PHP pass id to db, and get tags

                $("#img-modal").mikesModal();
                return false;
              });
        }); // end complete

        // Make request for tag data

    } // end of load_from_DB

    // Refresh img contents
    function refresh_images(selected_time){
        col_counter = 0;
        row_counter = 0;
        $('#image-container').empty();
        $('#tag-list').empty();
        load_from_DB(selected_time);
    }

    //Select class for img hover rotation
    function pickClass() {
        var a = [0,1];
        Randomize(a);
        if (a[0]==0){
            return 'img-hover1';
        }else{
            return 'img-hover2';
        }
    };

    // convert UNIX timestamp
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
        return hours+":"+minutes+ampm; 
    };

    // Randomize an array
    function Randomize(arr) {
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
   };