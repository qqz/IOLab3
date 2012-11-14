/*
==========================================================================
Table of Contents
==========================================================================
    - Main JS
    - Lazy Load
    - Modal
*/

/* ==========================================================================
   Main JS
   ========================================================================== */
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

    // Time Slider
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
            },

            // set time on slide
            stop: function(event,ui) {
                // update selected_time to new slider value
                selected_time = ui.value;
                // call load DB and clear current images
                refresh_images(selected_time);
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

            $(row_div).append('<div class="img-wrapper span3"><span class="img-id">'+data.rows[i].image_id+'</span><span class="standard-url">'+data.rows[i].standard_url+'</span><span class="created_time">'+data.rows[i].created_time+'</span><a id="open-modal" href="#"><img class="img-polaroid lazy" src="assets/blank.gif" data-original="'+data.rows[i].thumbnail_url+'" width="160" height="160"><ul class="img-stats"><li class="stat-likes"><b><span>'+data.rows[i].like_count+'</span></b></li><li class="stat-comments"><b><span>'+data.rows[i].comment_count+'</span></b></li></ul></a></div>');
                col_counter++;

        } // end of for
        for (var j=0; j<data.tags.length; j++){
            $('#tag-box-list').append('<li>#'+data.tags[j].tagname+' ['+data.tags[j].frequency+'] </li>');
        }
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

            // add img source
            $('#img-modal img').attr('src', url);
            // Make request for img tags
            $.ajax({
               type: "POST",
               dataType: "json",                                        
               url: "getTagsByImage.php",
               data: ({ image_id: id}),
               success: function(data) {
                    // for each result, add thumbnail picture to the page
                    if (data.rows.length == 0){
                        $('#tag-modal-list').append('<li>No Tags for this one, sorry :(</li>');
                    }
                    for (var i = 0;i<data.rows.length;i++) {
                        $('#tag-modal-list').append('<li>#'+data.rows[i].tagname+'</li>');
                    }// end of for
                } // end of success
            });
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
    $('#selected_time').empty().append(convertTime(selected_time));
    $('#image-container').empty();
    $('#tag-box-list').empty();
    load_from_DB(selected_time).fadeIn("slow");
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

/* ==========================================================================
   Lazy Load - http://www.appelsiini.net/projects/lazyload
   ========================================================================== 
    *  Licensed under the MIT license:
    *  http://www.opensource.org/licenses/mit-license.php
*/
   (function (a, b) {
    var c = a(b);
    a.fn.lazyload = function (d) {
        function h() {
            var b = 0;
            e.each(function () {
                var c = a(this);
                if (g.skip_invisible && !c.is(":visible")) return;
                if (!a.abovethetop(this, g) && !a.leftofbegin(this, g)) if (!a.belowthefold(this, g) && !a.rightoffold(this, g)) c.trigger("appear"), b = 0;
                else if (++b > g.failure_limit) return !1
            })
        }
        var e = this,
            f, g = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: b,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null
            };
        return d && (undefined !== d.failurelimit && (d.failure_limit = d.failurelimit, delete d.failurelimit), undefined !== d.effectspeed && (d.effect_speed = d.effectspeed, delete d.effectspeed), a.extend(g, d)), f = g.container === undefined || g.container === b ? c : a(g.container), 0 === g.event.indexOf("scroll") && f.bind(g.event, function (a) {
            return h()
        }), this.each(function () {
            var b = this,
                c = a(b);
            b.loaded = !1, c.one("appear", function () {
                if (!this.loaded) {
                    if (g.appear) {
                        var d = e.length;
                        g.appear.call(b, d, g)
                    }
                    a("<img />").bind("load", function () {
                        c.hide().attr("src", c.data(g.data_attribute))[g.effect](g.effect_speed), b.loaded = !0;
                        var d = a.grep(e, function (a) {
                            return !a.loaded
                        });
                        e = a(d);
                        if (g.load) {
                            var f = e.length;
                            g.load.call(b, f, g)
                        }
                    }).attr("src", c.data(g.data_attribute))
                }
            }), 0 !== g.event.indexOf("scroll") && c.bind(g.event, function (a) {
                b.loaded || c.trigger("appear")
            })
        }), c.bind("resize", function (a) {
            h()
        }), a(document).ready(function () {
            h()
        }), this
    }, a.belowthefold = function (d, e) {
        var f;
        return e.container === undefined || e.container === b ? f = c.height() + c.scrollTop() : f = a(e.container).offset().top + a(e.container).height(), f <= a(d).offset().top - e.threshold
    }, a.rightoffold = function (d, e) {
        var f;
        return e.container === undefined || e.container === b ? f = c.width() + c.scrollLeft() : f = a(e.container).offset().left + a(e.container).width(), f <= a(d).offset().left - e.threshold
    }, a.abovethetop = function (d, e) {
        var f;
        return e.container === undefined || e.container === b ? f = c.scrollTop() : f = a(e.container).offset().top, f >= a(d).offset().top + e.threshold + a(d).height()
    }, a.leftofbegin = function (d, e) {
        var f;
        return e.container === undefined || e.container === b ? f = c.scrollLeft() : f = a(e.container).offset().left, f >= a(d).offset().left + e.threshold + a(d).width()
    }, a.inviewport = function (b, c) {
        return !a.rightofscreen(b, c) && !a.leftofscreen(b, c) && !a.belowthefold(b, c) && !a.abovethetop(b, c)
    }, a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function (b) {
            return !a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        }
    })
})(jQuery, window)

/* ==========================================================================
   Modal - http://fgnass.github.com/spin.js#v1.2.6
   ========================================================================== */
! function (e, t, n) {
    function o(e, n) {
        var r = t.createElement(e || "div"),
            i;
        for (i in n) r[i] = n[i];
        return r
    }
    function u(e) {
        for (var t = 1, n = arguments.length; t < n; t++) e.appendChild(arguments[t]);
        return e
    }
    function f(e, t, n, r) {
        var o = ["opacity", t, ~~ (e * 100), n, r].join("-"),
            u = .01 + n / r * 100,
            f = Math.max(1 - (1 - e) / t * (100 - u), e),
            l = s.substring(0, s.indexOf("Animation")).toLowerCase(),
            c = l && "-" + l + "-" || "";
        return i[o] || (a.insertRule("@" + c + "keyframes " + o + "{" + "0%{opacity:" + f + "}" + u + "%{opacity:" + e + "}" + (u + .01) + "%{opacity:1}" + (u + t) % 100 + "%{opacity:" + e + "}" + "100%{opacity:" + f + "}" + "}", a.cssRules.length), i[o] = 1), o
    }
    function l(e, t) {
        var i = e.style,
            s, o;
        if (i[t] !== n) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (o = 0; o < r.length; o++) {
            s = r[o] + t;
            if (i[s] !== n) return s
        }
    }
    function c(e, t) {
        for (var n in t) e.style[l(e, n) || n] = t[n];
        return e
    }
    function h(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var i in r) e[i] === n && (e[i] = r[i])
        }
        return e
    }
    function p(e) {
        var t = {
            x: e.offsetLeft,
            y: e.offsetTop
        };
        while (e = e.offsetParent) t.x += e.offsetLeft, t.y += e.offsetTop;
        return t
    }
    var r = ["webkit", "Moz", "ms", "O"],
        i = {}, s, a = function () {
            var e = o("style", {
                type: "text/css"
            });
            return u(t.getElementsByTagName("head")[0], e), e.sheet || e.styleSheet
        }(),
        d = {
            lines: 12,
            length: 7,
            width: 5,
            radius: 10,
            rotate: 0,
            corners: 1,
            color: "#000",
            speed: 1,
            trail: 100,
            opacity: .25,
            fps: 20,
            zIndex: 2e9,
            className: "spinner",
            top: "auto",
            left: "auto"
        }, v = function m(e) {
            if (!this.spin) return new m(e);
            this.opts = h(e || {}, m.defaults, d)
        };
    v.defaults = {}, h(v.prototype, {
        spin: function (e) {
            this.stop();
            var t = this,
                n = t.opts,
                r = t.el = c(o(0, {
                    className: n.className
                }), {
                    position: "relative",
                    width: 0,
                    zIndex: n.zIndex
                }),
                i = n.radius + n.length + n.width,
                u, a;
            e && (e.insertBefore(r, e.firstChild || null), a = p(e), u = p(r), c(r, {
                left: (n.left == "auto" ? a.x - u.x + (e.offsetWidth >> 1) : parseInt(n.left, 10) + i) + "px",
                top: (n.top == "auto" ? a.y - u.y + (e.offsetHeight >> 1) : parseInt(n.top, 10) + i) + "px"
            })), r.setAttribute("aria-role", "progressbar"), t.lines(r, t.opts);
            if (!s) {
                var f = 0,
                    l = n.fps,
                    h = l / n.speed,
                    d = (1 - n.opacity) / (h * n.trail / 100),
                    v = h / n.lines;
                (function m() {
                    f++;
                    for (var e = n.lines; e; e--) {
                        var i = Math.max(1 - (f + e * v) % h * d, n.opacity);
                        t.opacity(r, n.lines - e, i, n)
                    }
                    t.timeout = t.el && setTimeout(m, ~~ (1e3 / l))
                })()
            }
            return t
        },
        stop: function () {
            var e = this.el;
            return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = n), this
        },
        lines: function (e, t) {
            function i(e, r) {
                return c(o(), {
                    position: "absolute",
                    width: t.length + t.width + "px",
                    height: t.width + "px",
                    background: e,
                    boxShadow: r,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~ (360 / t.lines * n + t.rotate) + "deg) translate(" + t.radius + "px" + ",0)",
                    borderRadius: (t.corners * t.width >> 1) + "px"
                })
            }
            var n = 0,
                r;
            for (; n < t.lines; n++) r = c(o(), {
                position: "absolute",
                top: 1 + ~ (t.width / 2) + "px",
                transform: t.hwaccel ? "translate3d(0,0,0)" : "",
                opacity: t.opacity,
                animation: s && f(t.opacity, t.trail, n, t.lines) + " " + 1 / t.speed + "s linear infinite"
            }), t.shadow && u(r, c(i("#000", "0 0 4px #000"), {
                top: "2px"
            })), u(e, u(r, i(t.color, "0 0 1px rgba(0,0,0,.1)")));
            return e
        },
        opacity: function (e, t, n) {
            t < e.childNodes.length && (e.childNodes[t].style.opacity = n)
        }
    }),
    function () {
        function e(e, t) {
            return o("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
        }
        var t = c(o("group"), {
            behavior: "url(#default#VML)"
        });
        !l(t, "transform") && t.adj ? (a.addRule(".spin-vml", "behavior:url(#default#VML)"), v.prototype.lines = function (t, n) {
            function s() {
                return c(e("group", {
                    coordsize: i + " " + i,
                    coordorigin: -r + " " + -r
                }), {
                    width: i,
                    height: i
                })
            }
            function l(t, i, o) {
                u(a, u(c(s(), {
                    rotation: 360 / n.lines * t + "deg",
                    left: ~~i
                }), u(c(e("roundrect", {
                    arcsize: n.corners
                }), {
                    width: r,
                    height: n.width,
                    left: n.radius,
                    top: -n.width >> 1,
                    filter: o
                }), e("fill", {
                    color: n.color,
                    opacity: n.opacity
                }), e("stroke", {
                    opacity: 0
                }))))
            }
            var r = n.length + n.width,
                i = 2 * r,
                o = -(n.width + n.length) * 2 + "px",
                a = c(s(), {
                    position: "absolute",
                    top: o,
                    left: o
                }),
                f;
            if (n.shadow) for (f = 1; f <= n.lines; f++) l(f, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (f = 1; f <= n.lines; f++) l(f);
            return u(t, a)
        }, v.prototype.opacity = function (e, t, n, r) {
            var i = e.firstChild;
            r = r.shadow && r.lines || 0, i && t + r < i.childNodes.length && (i = i.childNodes[t + r], i = i && i.firstChild, i = i && i.firstChild, i && (i.opacity = n))
        }) : s = l(t, "animation")
    }(), typeof define == "function" && define.amd ? define(function () {
        return v
    }) : e.Spinner = v
}(window, document);
(function () {
    var Loading, MikesModal, Scrolling, TheLights,
    __bind = function (fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    };

    $.fn.mikesModal = function (action) {
        return this.modal = new MikesModal($(this));
    };

  MikesModal = (function() {

    function MikesModal(modalBox) {
      this.addClose = __bind(this.addClose, this);

      this.marginLeft = __bind(this.marginLeft, this);

      this.marginTop = __bind(this.marginTop, this);

      this.imageMaxHeight = __bind(this.imageMaxHeight, this);

      this.imageMaxWidth = __bind(this.imageMaxWidth, this);

      this.triggerClose = __bind(this.triggerClose, this);

      this.imagePosition = __bind(this.imagePosition, this);

      this.imageLoaded = __bind(this.imageLoaded, this);

      this.loaded = __bind(this.loaded, this);

      this.closed = __bind(this.closed, this);

      this.opened = __bind(this.opened, this);

      this.bindMethods = __bind(this.bindMethods, this);

      this.createAllClasses = __bind(this.createAllClasses, this);
      this.modalBox = modalBox;
      this.bindMethods();
      this.createAllClasses();
      this.modalBox.trigger("open");
      this.imageLoaded();
      this.addClose();
      this.triggerClose();
    }

    MikesModal.prototype.createAllClasses = function() {
      new Scrolling(this.modalBox);
      new Loading(this.modalBox);
      return new TheLights(this.modalBox);
    };

    MikesModal.prototype.bindMethods = function() {
      this.opened();
      this.loaded();
      return this.closed();
    };

    MikesModal.prototype.opened = function() {
      var _this = this;
      return this.modalBox.bind("open", function() {
        return _this.modalBox.find("img").css({
          "max-width": _this.imageMaxWidth(),
          "max-height": _this.imageMaxHeight()
        });
      });
    };

    MikesModal.prototype.closed = function() {
      var _this = this;
      return this.modalBox.bind("close", function() {
        return _this.modalBox.hide();
      });
    };

    MikesModal.prototype.loaded = function() {
      var _this = this;
      return this.modalBox.bind("loaded", function() {
        return _this.modalBox.fadeIn("slow");
      });
    };

    MikesModal.prototype.imageLoaded = function() {
      var _this = this;
      this.modalBox.find("img").load(function() {
        return _this.imagePosition();
      });
      if (this.modalBox.find("img")[0].complete) {
        return this.imagePosition();
      }
    };

    MikesModal.prototype.imagePosition = function() {
      this.modalBox.trigger("loaded").css({
        "margin-top": this.marginTop(),
        "margin-left": this.marginLeft()
      });
      this.modalBox.css({
        "margin-top": this.marginTop(),
        "margin-left": this.marginLeft()
      });
      return this.modalBox.css({
        "margin-top": this.marginTop(),
        "margin-left": this.marginLeft()
      });
    };

    MikesModal.prototype.triggerClose = function() {
            // clear modal contents
            $('#tag-modal-list').empty();
      var _this = this;
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          return _this.modalBox.trigger("close");
        }
      });
      $(document).click(function(e) {
        if (e.target.id === "the-lights") {
          return _this.modalBox.trigger("close");
        }
      });
      return this.modalBox.find(".close").click(function() {
        return _this.modalBox.trigger("close");
      });
    };

    MikesModal.prototype.imageMaxWidth = function() {
      return (window.innerWidth * .8) - 300;
    };

    MikesModal.prototype.imageMaxHeight = function() {
      return window.innerHeight * .8;
    };

    MikesModal.prototype.marginTop = function() {
      return "-" + (this.modalBox.height() / 2) + "px";
    };

    MikesModal.prototype.marginLeft = function() {
      return "-" + (this.modalBox.width() / 2) + "px";
    };

    MikesModal.prototype.addClose = function() {
      return $(".description h1").before("<div class='close'></div>");
    };

    return MikesModal;

  })();

  TheLights = (function() {

    function TheLights(modalBox) {
      this.bindClosed = __bind(this.bindClosed, this);

      this.bindLoaded = __bind(this.bindLoaded, this);
      this.modalBox = modalBox;
      this.bindLoaded();
      this.bindClosed();
    }

    TheLights.prototype.bindLoaded = function() {
      var _this = this;
      return this.modalBox.bind("loaded", function() {
        if ($("#the-lights").length) {
          return _this.theLights = $("#the-lights");
        } else {
          _this.theLights = $("<div id='the-lights'></div>");
          return _this.theLights.appendTo("body").css({
            height: $(document).height()
          });
        }
      });
    };

    TheLights.prototype.bindClosed = function() {
      var _this = this;
      return this.modalBox.bind("close", function() {
        return _this.theLights.remove();
        return _this.open.remove();
      });
    };

    return TheLights;

  })();

  Scrolling = (function() {

    function Scrolling(modalBox) {
      this.bindClosed = __bind(this.bindClosed, this);

      this.bindLoaded = __bind(this.bindLoaded, this);
      this.modalBox = modalBox;
      this.bindLoaded();
      this.bindClosed();
      this.html = $("html");
    }

    Scrolling.prototype.bindLoaded = function() {
      var _this = this;
      return this.modalBox.bind("loaded", function() {
        return _this.html.css("overflow", "hidden");
      });
    };

    Scrolling.prototype.bindClosed = function() {
      var _this = this;
      return this.modalBox.bind("close", function() {
        return _this.html.css("overflow", "auto");
      });

    };

    return Scrolling;

  })();

  Loading = (function() {

    function Loading(modalBox) {
      this.opts = __bind(this.opts, this);

      this.bindLoaded = __bind(this.bindLoaded, this);

      this.bindOpened = __bind(this.bindOpened, this);
      this.modalBox = modalBox;
      this.bindOpened();
      this.bindLoaded();
    }

    Loading.prototype.bindOpened = function() {
      var _this = this;
      return this.modalBox.bind("open", function() {
        var spinner;
        _this.loading = $("<div id='loading-modal'></div>");
        _this.loading.appendTo("body").css({
          top: $(window).scrollTop() + 300 + "px"
        });
        return spinner = new Spinner(_this.opts()).spin(document.getElementById("loading-modal"));
      });
    };

    Loading.prototype.bindLoaded = function() {
      var _this = this;
      return this.modalBox.bind("loaded", function() {
        return _this.loading.remove();
      });
    };

    Loading.prototype.opts = function() {
      return {
        lines: 9,
        length: 30,
        width: 20,
        radius: 40,
        corners: 1,
        rotate: 19,
        color: "#fff",
        speed: 1.2,
        trail: 42,
        shadow: false,
        hwaccel: false,
        className: "spinner",
        zIndex: 2e9,
        top: "auto",
        left: "auto"
      };
    };

    return Loading;

  })();

}).call(this);
