// JavaScript Document
$(document).ready(function () {
    //list show more button
    $('#list_pan01 > ul:gt(4)').hide();
    $('#show_more').click(function () {
        $('#list_pan01 > ul:lt(10)').show();
    });
    $('#list_pan02 > ul:gt(1)').hide();
    $('#show_more01').click(function () {
        $('#list_pan02 > ul:lt(3)').show();
    });

    //	user responses box
    $(".content_box_btn button").click(function () {
        $(this).parents(".content_box").toggleClass("opacit_5");
    });

    $("#today_btn").click(function () {
        $("#today_panal").toggleClass("show");
    });
    $("#user_btn").click(function () {
        $("#contnet_box_panal").toggleClass("show");
    });


    //feature responses in user responses
    $('.action_add_feature_resp').click(function () {
        var feture_rel = $(this).attr("rel");
        var adding = true;
        if ($(this).hasClass("success_btn")) {
            adding = false;
            $(this).removeClass("success_btn");
        }
        else {
            $(this).addClass("success_btn");
            adding = true;
        }

        if (adding) {
            var addingdata = $("#fetaure_conetbox" + feture_rel).html();
            $("#Selected_Responses_data").append("<div id='featured_item_added" + feture_rel + "'>" + addingdata + "</div>");
        }
        else {
            $("#featured_item_added" + feture_rel).remove();
        }

        if (adding) {
            $(this).html("SELECTED");
        }
        else {
            $(this).html("Feature Response");

        }

        $("#contnet_box_panal").toggleClass("show");


    });



    //cndr pop_up
    $("#ready_btn").click(function () {
        $("#cal_pop").toggleClass("show");
    });

    //do_it button
    $("#do_it").click(function () {
        window.location.href = 'sucsses.html';
    });

    //back sheduled button
    $("#back_Scheduled").click(function () {
        window.location.href = 'scheduled.html';
    });

    //hover box change background
    $(".hover_box").click(function () {
        if ($(".hover_box").hasClass("bgwhite")) {
            $(".hover_box").removeClass("bgwhite");
            $(this).addClass("bgwhite");
        }
        else {
            $(this).addClass("bgwhite");
        }
    });

    //side nav height
    var height = $(".wrapper").height();
    $("#side_nav").css("height", height);

    //pencil_icon click
    $(".pencil_icon").click(function () {
        $("#pen_icon_box").toggleClass("show");
    });

    //btn_toggal 
    $(".content_btn").click(function () {
        $(this).addClass("active");
        $(".url_btn").removeClass("active");
        $("#input_url").removeClass("show");
        $("#input_url").addClass("hide");
        $("#input_content").addClass("show");

    });
    $(".url_btn").click(function () {
        $(this).addClass("active");
        $(".content_btn").removeClass("active");
        $("#input_content").removeClass("show");
        $("#input_content").addClass("hide");
        $("#input_url").addClass("show");

    });


    //add new button
    $("#add_new_btn").click(function () {
        $(this).before('<button class="btn btn-default btn-block" id="new_btn">New Button</button>');
    });
    $("#add_new_btn1").click(function () {
        $(this).before('<button class="btn btn-default btn-block" id="new_btn">New Button</button>');
    });
    //show panel on click
    $(".edit_btn").click(function () {
        $("#button_style").toggleClass("show");
    });

    $(".edit_btn_sub").click(function () {
        $(".button_style").css('top', '464px');
        $("#button_style").toggleClass("show");
    });

    //change the button size and color
    $("select.btn_size").change(function () {
        var selectedCountry = $(".btn_size option:selected").val();
        if (selectedCountry === "st") {
            $(".btn_msg").css("width", "250px")
        }
        else if (selectedCountry === "lg") {
            $(".btn_msg").css({ "width": "200px" })
        }
        else if (selectedCountry === "xl") {
            $(".btn_msg").css("width", "300px")
        }
    });
    $("select.btn_color").change(function () {
        var selectedCountry1 = $(".btn_color option:selected").val();
        if (selectedCountry1 === "whi") {
            $(".btn_msg").css({ "border": "1px solid #e4e9f0", "background": "url(image/msanger.png) #fff", "background-repeat": "no-repeat", "background-position": "left 10px center", "background-size": "20px" })
        }
        else if (selectedCountry1 === "bl") {
            $(".btn_msg").css({ "border": "1px solid #e4e9f0", "background": "url(image/msanger_1.png) #0080ff", "background-repeat": "no-repeat", "background-position": "left 10px center", "background-size": "20px" })
        }
    });




    //Audience Confirmation

    $('.invite-btn').click(function () {
        $(this).parents('.audience-tab').addClass('stop-sorting');
        $(this).parents('tr').after('<tr class="invite-user text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="4"><div class="invite-sec"><div class="row"><div class="col-xs-4"><span>Invite This User?</span></div><div class="col-xs-8"><div class="button-group"><a href="javascript:void(0)" class="btn invite">Invite</a><a href="javascript:void(0)" class="btn nvermind">Nevermind</a></div></div></div></div></td></tr><tr style="display: none;" class="success-user text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="4"><div class="success-sec"><span><i class="fa fa-check" aria-hidden="true"></i></span></div></td></tr>');
        $(this).parents('tr').hide();
        $(this).parents('tr').next('.invite-user').hide().fadeIn(500);


        $('.nvermind').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('tr').prev('tr').fadeIn(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });

        $('.invite').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('.invite-user').next('.success-user').fadeIn(500);
            $(this).parents('.invite-user').next('.success-user').fadeOut(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });
    });

    $('.blacklist-btn').click(function () {
        $(this).parents('.audience-tab').addClass('stop-sorting');
        $(this).parents('tr').after('<tr class="invite-user black-list text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="4"><div class="invite-sec"><div class="row"><div class="col-xs-4"><span>Blacklist This User?</span></div><div class="col-xs-8"><div class="button-group"><a href="javascript:void(0)" class="btn invite">Blacklist</a><a href="javascript:void(0)" class="btn nvermind">Nevermind</a></div></div></div></div></td></tr><tr style="display: none;" class="success-user text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="4"><div class="success-sec"><span><i class="fa fa-check" aria-hidden="true"></i></span></div></td></tr>');
        $(this).parents('tr').hide();
        $(this).parents('tr').next('.invite-user').hide().fadeIn(500);


        $('.nvermind').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('tr').prev('tr').fadeIn(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });

        $('.invite').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('.invite-user').next('.success-user').fadeIn(500);
            $(this).parents('.invite-user').next('.success-user').fadeOut(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });
    });


    $('.remove-btn').click(function () {
        $(this).parents('.audience-tab').addClass('stop-sorting');
        $(this).parents('tr').after('<tr class="invite-user black-list text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="5"><div class="invite-sec"><div class="row"><div class="col-xs-4"><span>Remove This User?</span></div><div class="col-xs-8"><div class="button-group"><a href="javascript:void(0)" class="btn invite">Remove</a><a href="javascript:void(0)" class="btn nvermind">Nevermind</a></div></div></div></div></td></tr><tr style="display: none;" class="success-user text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="5"><div class="success-sec"><span><i class="fa fa-check" aria-hidden="true"></i></span></div></td></tr>');
        $(this).parents('tr').hide();
        $(this).parents('tr').next('.invite-user').hide().fadeIn(500);


        $('.nvermind').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('tr').prev('tr').fadeIn(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });

        $('.invite').click(function () {
            $(this).parents('tr').fadeOut(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });
    });


    $('.editor-blacklist-btn').click(function () {
        $(this).parents('.audience-tab').addClass('stop-sorting');
        $(this).parents('tr').after('<tr class="invite-user black-list text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="5"><div class="invite-sec"><div class="row"><div class="col-xs-4"><span>Blacklist This User?</span></div><div class="col-xs-8"><div class="button-group"><a href="javascript:void(0)" class="btn invite">Blacklist</a><a href="javascript:void(0)" class="btn nvermind">Nevermind</a></div></div></div></div></td></tr><tr style="display: none;" class="success-user text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="5"><div class="success-sec"><span><i class="fa fa-check" aria-hidden="true"></i></span></div></td></tr>');
        $(this).parents('tr').hide();
        $(this).parents('tr').next('.invite-user').hide().fadeIn(500);


        $('.nvermind').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('tr').prev('tr').fadeIn(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });

        $('.invite').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('.invite-user').next('.success-user').fadeIn(500);
            $(this).parents('.invite-user').next('.success-user').fadeOut(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });
    });

    $('.whitelist-btn').click(function () {
        $(this).parents('.audience-tab').addClass('stop-sorting');
        $(this).parents('tr').after('<tr class="invite-user whitelist-list text-center"><td class="hide">1</td><td class="hide">Jun 9, 2016</td><td class="hide">1</td><td colspan="4"><div class="invite-sec"><div class="row"><div class="col-xs-6"><span>Sure you want to remove user from blacklist?</span></div><div class="col-xs-6"><div class="button-group"><a href="javascript:void(0)" class="btn invite">Whitelist</a><a href="javascript:void(0)" class="btn nvermind">Nevermind</a></div></div></div></div></td></tr>');
        $(this).parents('tr').hide();
        $(this).parents('tr').next('.invite-user').hide().fadeIn(500);


        $('.nvermind').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('tr').prev('tr').fadeIn(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });

        $('.invite').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('.invite-user').next('.success-user').fadeIn(500);
            $(this).parents('.invite-user').next('.success-user').fadeOut(500);
            $(this).parents('.audience-tab').removeClass('stop-sorting');
        });
    });


    // Helper function to convert a string of the form "Mar 15, 1987" into a Date object.
    var date_from_string = function (str) {
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        var pattern = "^([a-zA-Z]{3})\\s*(\\d{1,2}),\\s*(\\d{4})$";
        var re = new RegExp(pattern);
        var DateParts = re.exec(str).slice(1);

        var Year = DateParts[2];
        var Month = $.inArray(DateParts[0].toLowerCase(), months);
        var Day = DateParts[1];

        return new Date(Year, Month, Day);
    }

    var table = $(".audience-tab table").stupidtable({
        "date": function (a, b) {
            // Get these into date objects for comparison.
            aDate = date_from_string(a);
            bDate = date_from_string(b);
            return aDate - bDate;
        }
    });
    
    function sections(){
        // Sections showing
        $('.section-btn').click(function() {
            var $sliding = $(this).parent().children('.new-story-content');
                if($sliding.css('display') == 'none'){
                    $('.new-story-content').slideUp();
                    $sliding.slideDown();
                }   
        });
    }
    sections();
    
    function deletable(){
    // Section requirement check after every click!
        $(window).click(function() {
                    // Section 1
                    var $check1 = $('.section-1');
                    var $headline = $check1.find('#headline-1').text();
                    var $currentimg = $check1.find('#image-1 img').attr('src');
                    var $title1 = $check1.find('#title-1').text();
                    var $bubble1 = $check1.find('#bubble-1').text();
                    var $btn1 = $check1.find('#bubble-btn-1').text();
                    
                    if($check1.find('#headline-1').length > 0) {
                        if (/default-image/.test($currentimg) || $headline == "" || $title1 == "" || $bubble1 == "" || $btn1 == "") {
                            $check1.find('.section-btn i').removeClass('fa-check-circle');
                            $check1.find('.section-btn i').addClass('fa-exclamation-circle');
                        } else {
                            $check1.find('.section-btn i').removeClass('fa-exclamation-circle');
                            $check1.find('.section-btn i').addClass('fa-check-circle');
                        }
                    } else {
                        if (/default-image/.test($currentimg) || $title1 == "" || $bubble1 == "" || $btn1 == "") {
                            $check1.find('.section-btn i').removeClass('fa-check-circle');
                            $check1.find('.section-btn i').addClass('fa-exclamation-circle');
                        } else {
                            $check1.find('.section-btn i').removeClass('fa-exclamation-circle');
                            $check1.find('.section-btn i').addClass('fa-check-circle');
                        }
                    }
                    
                    // Section 2
                    var $check2 = $('.section-2');
                    var $bubble2 = $check2.find('#bubble-2').text();
                    var $currentimg1 = $check2.find('#image-2 img').attr('src');
                    var $bubble3 = $check2.find('#bubble-3').text();
                    var $btn2 = $check2.find('#bubble-btn-2').text();
                    
                    if($check2.find('#image-2').length > 0 && $check2.find('#bubble-2').length > 0) {
                        if (/default-image/.test($currentimg1) || $bubble3 == "" || $btn2 == "" || $bubble2 == "") {
                            $check2.find('.section-btn i').removeClass('fa-check-circle');
                            $check2.find('.section-btn i').addClass('fa-exclamation-circle');
                        } else {
                            $check2.find('.section-btn i').removeClass('fa-exclamation-circle');
                            $check2.find('.section-btn i').addClass('fa-check-circle');
                        }
                    } else if($check2.find('#image-2').length == 0 && $check2.find('#bubble-2').length > 0){
                        if ($bubble3 == "" || $btn2 == "" || $bubble2 == "") {
                            $check2.find('.section-btn i').removeClass('fa-check-circle');
                            $check2.find('.section-btn i').addClass('fa-exclamation-circle');
                        } else {
                            $check2.find('.section-btn i').removeClass('fa-exclamation-circle');
                            $check2.find('.section-btn i').addClass('fa-check-circle');
                        }
                    } else if($check2.find('#image-2').length > 0 && $check2.find('#bubble-2').length == 0){
                        if (/default-image/.test($currentimg1) || $bubble3 == "" || $btn2 == "") {
                            $check2.find('.section-btn i').removeClass('fa-check-circle');
                            $check2.find('.section-btn i').addClass('fa-exclamation-circle');
                        } else {
                            $check2.find('.section-btn i').removeClass('fa-exclamation-circle');
                            $check2.find('.section-btn i').addClass('fa-check-circle');
                        }
                    } else {
                        if ($bubble3 == "" || $btn2 == "") {
                            $check2.find('.section-btn i').removeClass('fa-check-circle');
                            $check2.find('.section-btn i').addClass('fa-exclamation-circle');
                        } else {
                            $check2.find('.section-btn i').removeClass('fa-exclamation-circle');
                            $check2.find('.section-btn i').addClass('fa-check-circle');
                        }
                    }
                    
                    // Section 3
                    var $check3 = $('.section-3');
                    var $bubble3btn = $check3.find('#bubble-btn-3').text();
                    
                    if ($bubble3btn == "") {
                        $check3.find('.section-btn i').removeClass('fa-check-circle');
                        $check3.find('.section-btn i').addClass('fa-exclamation-circle');
                    } else {
                        $check3.find('.section-btn i').removeClass('fa-exclamation-circle');
                        $check3.find('.section-btn i').addClass('fa-check-circle');
                    }
        });
    }
    deletable();
    
    function limitable() {
        $.fn.extend( {
            limiter: function(limit, elem) {
                $(this).on("keyup focus", function() {
                    setCount(this, elem);
                });
                function setCount(src, elem) {
                    var chars = src.value.length;
                    if (chars > limit) {
                        src.value = src.value.substr(0, limit);
                        chars = limit;
                    }
                    elem.html( limit - chars );
                }
                setCount($(this)[0], elem);
            }
        });
    }
    limitable();

    function editable() {
    // Text Editable
        // Section 1
            $('#headline-1').editable({ type: 'textarea', action: 'click' });
            $('#title-1').editable({ type: 'textarea', action: 'click' });
            $('#bubble-1').editable({ type: 'textarea', action: 'click' });
            $('#bubble-btn-1').editable({ type: 'textarea', action: 'click' });
        
        // Section 2
            $('#bubble-2').editable({ type: 'textarea', action: 'click' });
            $('#bubble-3').editable({ type: 'textarea', action: 'click' });
            $('#bubble-btn-2').editable({ type: 'textarea', action: 'click' });
            
        // Section 3
            $('#bubble-btn-3').editable({ type: 'textarea', action: 'click' });
    }
    editable();


    function imagePopUp() {
        var $image1 = $('#image-1');
        var $image2 = $('#image-2');
        
        var $popup1 = $('.popup-holder');
        var $popup2 = $('.popup-holder-2');
        
        $image1.click(function() {
           $('.addImg_close').click(function() {
              $popup1.fadeOut(500); 
           });
           $popup1.fadeIn(500); 
           
           $('.addImg_close').click(function() {
              var $input = $('#image-url-add').val();
           
               if($input == ""){
                   $image1.children('img').attr('src', 'assets/dashboard/default-image.png' + '?' + Math.random());
               } else {
                   $image1.children('img').attr('src', $input + '?' + Math.random());
                   $popup1.fadeOut(function(){
                       $('#image-url-add').val("");
                       clickable();
                   }, 500);
               } 
           });
        });
        
        $image2.click(function() {
           $('.addImg_close').click(function() {
              $popup2.fadeOut(500); 
           });
           $popup2.fadeIn(500); 
           
           $('.addImg_close').click(function() {
              var $input = $('#image-url-add-2').val();
           
               if($input == ""){
                   $image2.children('img').attr('src', 'assets/dashboard/default-image.png' + '?' + Math.random());
               } else {
                   $image2.children('img').attr('src', $input + '?' + Math.random());
                   $popup2.fadeOut(function(){
                       $('#image-url-add-2').val("");
                   }, 500);
               } 
           });
        });
    }
    imagePopUp();


    
    //Next Story Slider
    var i = 1;
    function removable() {
        $('.next-button').click(function () {
            // Section 1
              var headline = $('#headline-1').text();
              var image = $('#image-1 img').attr('src');
              var title = $('#title-1').text();
              var bubble1 = $('#bubble-1').text();
              var bubble1btn = $('#bubble-btn-1').text();
              
            // Section 2
              var bubble2 = $('#bubble-2').text();
              var image2 = $('#image-2 img').attr('src');
              var bubble3 = $('#bubble-3').text();
              var bubble2btn = $('#bubble-btn-2').text();
              
            // Section 3
              var bubble3btn = $('#bubble-btn-3').text();
            
            $.ajax({
              type: 'POST',
              url: '/send-message',
              dataType: 'json',
              data: { 'next_story' : 'create', 
                      's1_headline' : headline, 's1_image' : image, 's1_title' : title, 's1_bubble' : bubble1, 's1_bubblebtn' : bubble1btn,
                      's2_bubble' : bubble2, 's2_image' : image2, 's2_bubble_two' : bubble3, 's2_bubble_two_btn' : bubble2btn,
                      's3_bubblebtn' : bubble3btn} 
            });
        
        		if(i == 5){
                    alert("You reach maximum post in a row!");
                } else {
                    i++;
                    
                    $('.content-new')
                      .css({'position': 'relative'}).animate({ "right": "250px", "opacity": "0" }, "fast", function(){
                            $(this).remove();
                            $('.new-stories-section').append('<div class="content-new"><div class="section-1"><div class="section-btn"><p>Section 1<i id="check-btn" class="fa" aria-hidden="true"></i></p></div><div class="new-story-content"><div class="main-content"><div class="story-image" id="story-image-1"><div class="current-image" id="image-1"><img src="assets/dashboard/default-image.png" /></div></div><div class="story-title"><p id="title-1">This is the Title of the Story. The Shorter it is, The Easier it is to Read.</p></div><div class="story-bubble-2-btns"><h5 id="bubble-1">Here`s the part of the story where you describe the "what"</h5></div><div class="btn-1" id="bubble-btn-1">Button to Expand Story</div><div class="btn-2"><p>Next Story</p></div></div></div></div><div class="section-2"><div class="section-btn"><p>Section 2<i id="check-btn" class="fa" aria-hidden="true"></i></p></div><div class="new-story-content"><div class="main-content"><div class="story-bubble"><h5 id="bubble-2">Use this space to describe the "so what" of the story.</h5> <a href="javascript:void(0)" class="new-story-bubble-btn"><i class="fa fa-trash"></i></a></div><div class="story-image" id="story-image-2"><div class="current-image" id="image-2"> <img src="assets/dashboard/default-image.png" /></div> <a href="javascript:void(0)" class="new-story-image-btn"><i class="fa fa-trash"></i></a></div><div class="story-bubble-2-btns"><h5 id="bubble-3">Use this space to describe the "so what" of the story.</h5></div><div class="btn-1" id="bubble-btn-2">Button to Expand Story</div><div class="btn-2"><p>Next Story</p></div></div></div></div><div class="section-3"><div class="section-btn"><p>Section 3<i id="check-btn" class="fa" aria-hidden="true"></i></p></div><div class="new-story-content"><div class="main-content"><div class="story-bubble-2-btns"><h5 id="bubble-btn-3">Last bubble. Use this space to describe the "now what" of the story.</h5></div><div class="btn-2"><p>Next Story</p></div></div></div></div><div class="next-story"><a href="javascript:void(0)" class="btn next-button">+ Another Storyline</a></div></div>');
                            $(".content-new").css({'position': 'relative', 'left': '250px', 'opacity': '0'}).animate({ "left": "0px", "opacity": "1" }, "fast");
                          
                            clickable();
                            imagePopUp();
                            editable();
                            removable();
                            sections();
                            deletable();
                            limitable();
                      });
            
                    $('.new-story-count .count-value span').text(i);
                }
        });
    }
    removable();


	//new stroy slider delete section
	function clickable() {
	    var $iconH = $('.story-headline').find('i');
    	var $iconB = $('.story-bubble').find('i');
    	var $iconI = $('#story-image-2').find('i');
    	
    	$('.new-story-headline-btn').click(function(){
        	if($('#headline-1').length == 1){
        	    $iconH.removeClass('fa-trash');
            	$iconH.addClass('fa-plus');
            	$('#headline-1').remove();
        	} else {
        	    $iconH.removeClass('fa-plus');
            	$iconH.addClass('fa-trash');
        	    $(this).parent('.story-headline').append('<h5 id="headline-1">We’ve got the perfect stories for you today.</h5>');
        	    $('#headline-1').editable({ type: 'textarea', action: 'click' });
        	}
    	});
        
        $('.new-story-bubble-btn').click(function(){
        	if($('#bubble-2').length == 1){
        	    $iconB.removeClass('fa-trash');
            	$iconB.addClass('fa-plus');
            	$('#bubble-2').remove();
        	} else {
        	    $iconB.removeClass('fa-plus');
            	$iconB.addClass('fa-trash');
        	    $(this).parent('.story-bubble').append('<h5 id="bubble-2">We’ve got the perfect stories for you today.</h5>');
        	    $('#bubble-2').editable({ type: 'textarea', action: 'click' });
        	}
    	});
    	
        $('.new-story-image-btn').click(function(){
        	if($('#image-2').length == 1){
        	    $iconI.removeClass('fa-trash');
            	$iconI.addClass('fa-plus');
            	$('#story-image-2').css('padding-bottom', '35px');
            	$('#image-2').remove();
        	} else {
        	    $iconI.removeClass('fa-plus');
            	$iconI.addClass('fa-trash');
            	$('#story-image-2').css('padding-bottom', '56.25%');
        	    $(this).parent('#story-image-2').append('<div class="current-image" id="image-2"><img src="assets/dashboard/default-image.png" /></div>');
        	    imagePopUp();
        	    
        	}
    	});
    }
    clickable();
	
	//Date Picker
            $('#release-date').Zebra_DatePicker({
                format: 'M d, Y',
				default_position: 'below',
				offset: [-220, 25]
            });
            $('#release-soft-date').Zebra_DatePicker({
                format: 'M d, Y',
				default_position: 'below',
				offset: [-220, 25]
				
            });

			
			//Checkbox modify
            $('.new-stories input[type="radio"]').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue'
            });
			
			$('.settings-option-list input[type="radio"]').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue'
            });

            //new story schedule

            $('.schedule-button .schedule-btn').click(function () {
                $(this).hide();
                $('.schedule-button .schedule-read-only-btn').show();

				
				var left = $('.rss-feed-section').offset().right;
                $(".rss-feed-section").css({ right: left }).stop().animate({ "right": "-320", "opacity": "0" }, "slow", function() {
						var left = $('.schedule-subscriber').offset().right;
						$(".schedule-subscriber").css({ right: left }).stop().animate({ "right": "0", "opacity": "1" }, "slow");
				});
            });

            $('.schedule-release-button a').click(function () {
				
				$('.schedule-release-button span').fadeIn(250);
				$('.schedule-release-button span').fadeOut(250);
				
                
            });
			
			$('.schedule-button .schedule-read-only-btn').click(function () {
				$(this).hide();
				$('.schedule-button .schedule-btn').show();
				
				var left = $('.schedule-subscriber').offset().right;
                $(".schedule-subscriber").css({ right: left }).stop().animate({ "right": "-320", "opacity": "0" }, "slow", function(){
					var left = $('.rss-feed-section').offset().right;
					$(".rss-feed-section").css({ right: left }).stop().animate({ "right": "40px", "opacity": "1" }, "slow");
				});
				
                
            });


            var divs = $('.common-section').show(); 

            $('.common-main-section.active .common-section').show();

            var $label = $('.schedule-subscriber-release .main-label').click(function () {
                $label.not(this).parent('.common-main-section').removeClass('active')
                $(this).parent('.common-main-section').toggleClass('active')
                divs.not($(this).parent('.common-main-section').find('.common-section')).slideUp()
                $(this).parent('.common-main-section').find('.common-section').stop().slideToggle()

            });
	

		//schedule list confirmation
		
		$('.schedule-list .crud .delete').click(function () {
        $(this).parents('ul').after('<div class="schedule-remove" style=""><div class="invite-sec"><div class="row"><div class="col-xs-7"><span>Are You Sure You Want To Delete This Release?</span></div><div class="col-xs-5"><div class="button-group"><a href="javascript:void(0)" class="btn invite">Remove</a><a href="javascript:void(0)" class="btn nvermind">Nevermind</a></div></div></div></div></div>');
        $(this).parents('ul').hide();
        $(this).parents('ul').next('.schedule-remove').hide().fadeIn(500);


        $('.nvermind').click(function () {
            $(this).parents('.schedule-remove').prev('ul').fadeIn(500);
			$(this).parents('.schedule-remove').remove();
        });

        $('.invite').click(function () {
            $(this).parents('.schedule-remove').fadeOut(500);
        });
    });
	
	//schedule list comment
		
		$('.schedule-list .list-title a.schedule-dropdown').click(function () {
			
			$(this).parents('ul').next().stop().slideToggle(750);
			$(this).parents('ul').next().css({
			  "position": "relative",
			  "bottom": "15px"
			});
    });
	
	//schedule list comment confirmation
		
	$('.next-story .Blacklist-button').click(function () {
        $(this).parents('tr').after('<tr class="invite-user sub-schedule-list-confirm black-list text-center" style="display: table-row;"><td colspan="4"><div class="invite-sec"><div class="row"><div class="col-xs-4"><span>Blacklist This User?</span></div><div class="col-xs-8"><div class="button-group"><a href="javascript:void(0)" class="btn invite">Blacklist</a><a href="javascript:void(0)" class="btn nvermind">Nevermind</a></div></div></div></div></td></tr>');
        $(this).parents('tr').hide();
        $(this).parents('tr').next('.invite-user').hide().fadeIn(500);


        $('.nvermind').click(function () {
            $(this).parents('tr').hide();
            $(this).parents('tr').prev('tr').fadeIn(500);
        });

        $('.invite').click(function () {
            $(this).parents('tr').fadeOut(500);
        });
    });
	



//Total Digest Number
            var total_num = $('.editor-selection select option').length - 1;
            $('.editor-summary-count .editor-summary-count-length').text(total_num);

            //editor selection
            $('.editor-selection select').on('change', function () {
                if (this.value == 'default') {
                    $('.editor-main-content').hide();
                    $('#default.editor-main-content').show();
                } else {
                    var elems = $('.editor-main-content[id="' + this.value + '"]');

                    $('.editor-main-content').not(elems).hide();
                    elems.show();
                }
                //mobile emulator popup for editor
                $("#" + this.value + " #editorAddImg").popup({
                    pagecontainer: '.container',
                    transition: 'all 0.3s'
                });


                var summary_list = $("#" + this.value + " .editor-list .item").length;

                $("#" + this.value + " .editor-total-list span").text(summary_list);
                //Digest Number
                var num = $('.editor-selection select option:selected').index();
                $('.editor-summary-count .editor-summary-count-list').text(num);

                var total_num = $('.editor-selection select option').length - 1;
                $('.editor-summary-count .editor-summary-count-length').text(total_num);

                //slick slider
                $("#" + this.value + " .multiple.editor-text .editor-list").slick({
                    dots: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
                // editor selection

                $("#" + this.value + " .editor-list .editor-select-button").on('click', function () {
				
					
					$(this).parents('.item').addClass("selection");
                    $(this).parents('.item').prepend('<div class="selected-success"><i class="fa fa-check"></i> Selected</div>');
                    $(this).hide();
                    $(this).next('.editor-unselect-button').show();
					
					
					var editor_content_length = $('.editor-main-content').length - 1;
					
					var editor_content_main_length = editor_content_length * 2 ;
					
					var editor_list_selection_length = $(".editor-list .item.selection").length;
					
					var editor_list_length = $(".editor-list .item").length;
					
					var editor_list_selection_main_length = editor_list_selection_length + editor_content_main_length
					
					
					if(editor_list_selection_main_length == editor_list_length){
						$(".editor-list .slick-next").hide();
						$(".editor-summary-next-button").hide();
					}					
					
                });
                $("#" + this.value + " .editor-list .editor-unselect-button").on('click', function () {
					$(this).parents('.item').removeClass("selection");
                    $(this).parents('.item').find('.selected-success').remove();
                    $(this).hide();
                    $(this).prev('.editor-select-button').show();
					
						$(".editor-list .slick-next").show();
						$(".editor-summary-next-button").show();
                });
				

            });



			
	//team setting
	
	$('.team-setting-add .add-button').click(function(){
				$('.team-setting-add').hide();
				var left = $('.team-setting-input').fadeIn(500);
            });
			$('.team-setting-input a').click(function(){
				$('.invitation-sent').fadeIn(500);
				$('.invitation-sent').fadeOut(500, function(){
					$('.team-setting-add').fadeIn(500);
				});
				var right = $('.team-setting-input').hide();
            });
			
			
		$('.team-setting-list .user .admin-button a').click(function () {
        $(this).parents('ul').after('<div class="schedule-remove team-user-remove" style=""><div class="invite-sec"><div class="row"><div class="col-xs-7"><span>Are You Sure You Want To Remove This User?</span></div><div class="col-xs-5"><div class="button-group"><a href="javascript:void(0)" class="btn invite">Remove</a><a href="javascript:void(0)" class="btn nvermind">Nevermind</a></div></div></div></div></div>');
        $(this).parents('ul').hide();
        $(this).parents('ul').next('.schedule-remove').hide().fadeIn(500);


        $('.nvermind').click(function () {
            $(this).parents('.schedule-remove').prev('ul').fadeIn(500);
			$(this).parents('.schedule-remove').remove();
        });

        $('.invite').click(function () {
            $(this).parents('.schedule-remove').fadeOut(500);
        });
    });			
	
	
	
	//Rss Feed Section
	
	$('.feed-adding-icon .add-rss').click(function(){
		$(this).addClass('hide');
		$(this).removeClass('show');
		$('.feed-adding-icon .add-rss-blue').addClass('show');
		$('.feed-adding-icon .add-rss-blue').removeClass('hide');
		var left = $('.rss-feed-adding-section .input-group').offset().left;
		$(".rss-feed-adding-section .input-group").css({ left: left }).stop().animate({ "left": "0", "opacity": "1" }, 500);
		$('.rss-feed-adding-section .input-group input[type="text"]').val("");
	});
	//Add Rss Feed Link
	
	var i = 1;
	$('.rss-feed-adding-section .input-group .input-group-addon a').click(function(){
	
		var url = $('.rss-feed-adding-section .input-group input[type="text"]').val();
		
		$(".rss-feed-adding-section").append('<div id="feed'+ i +'" class="feed-adding-icon feed-val-icon"></div>');
		
		$("#feed" + i + ".feed-val-icon").rssreader(url, {
		header: true,
		listHeader: false,
		title: false,
		content: false,
		snippet: false,
		showerror: false
		})
		
		$(".feed-adding-icon .add-rss-blue").addClass('hide');
		$(".feed-adding-icon .add-rss-blue").removeClass('show');
		$('.feed-adding-icon .add-rss').addClass('show');
		$('.feed-adding-icon .add-rss').removeClass('hide');
		var left = $('.rss-feed-adding-section .input-group').offset().right;
		$(".rss-feed-adding-section .input-group").css({ right: left }).stop().animate({ "left": "275px", "opacity": "0" }, 500);	
		
		
		i++;
	});
	
	
	$('.rss-feed-close-section a').click(function(){
		var left = $('.rss-feed-view-section').offset().right;
		$(".rss-feed-view-section").css({ right: left }).stop().animate({ "right": "-100%", "opacity": "0" }, "slow", function(){
			var left = $('.rss-feed-adding-section').offset().right;
			$(".rss-feed-adding-section").css({ right: left }).stop().animate({ "right": "0", "opacity": "1" }, "slow");	
		});	
	});
	
	
	
	//qeue section
	
			var height = $(window).height();
			$('.schedule-section').css('height', height + "px");
			$(window).resize(function () {
				height = $(window).height();
				$('.schedule-section').css('height', height + "px");
			});


            $('.schedule-settings').click(function () {
                $(this).addClass('hide');
                $(this).removeClass('show');
                $('.schedule-settings-gray').removeClass('hide');
                $('.schedule-settings-gray').addClass('show');
                var left = $('.schedule-section .tab-content').offset().right;
                $(".schedule-section .tab-content").css({ right: left }).stop().animate({ "right": "-100%", "opacity": "0" }, "slow", function () {
                    var left = $('.settings-option-section').offset().left;
                    $(".settings-option-section").css({ left: left }).stop().animate({ "left": "0", "opacity": "1" }, "slow");
                });
            });

            $('.option-save a').click(function () {
                $('.schedule-settings-gray').removeClass('show');
                $('.schedule-settings-gray').addClass('hide');
                $('.schedule-settings').addClass('show');

                var left = $('.settings-option-section').offset().right;
                $(".settings-option-section").css({ right: left }).stop().animate({ "left": "100%", "opacity": "0" }, "slow", function () {
                    var left = $('.schedule-section .tab-content').offset().right;
                    $(".schedule-section .tab-content").css({ right: left }).stop().animate({ "right": "0", "opacity": "1" }, "slow");
                });
            });

            var item_add = 0;
            $('.queue-emulator').each(function () {
                item_add++;
                $(this).attr('id', "parent-item" + item_add);
            });




            //Queue next release
            $(".editor-section-list > .queue-emulator:gt(0)").hide();
            var id = 1;
            $('.next-release-header a').click(function () {
                id++;
                var story_count = $('.queue-emulator').length + 1;

                if (id == story_count) {
                    id = 1;
                }


                $('.editor-section-list > .queue-emulator:first')
					.stop().animate({ "left": "100%", "opacity": "0" }, "slow")
					.hide()
					.next()
					.show()
					.stop().animate({ "left": "0", "opacity": "1" }, "slow")
					.end()
					.appendTo('.editor-section-list');

                $('#parent-item' + id + ' .queue-summary-list > .item:gt(0)').hide();
            });

            //Queue counting
            var summary_count = $('.queue-summary-list').length + 1;
            $('.current-value-length').text(summary_count);

            //Queue next summary story

            var current_value = 1;
            $("#parent-item1 .queue-summary-list > .item:gt(0)").hide();
            $('.queue-emulator .next-story .next-summary').click(function () {
                current_value++;

                if (current_value > summary_count) {
                    current_value = 1;
                }

                $('#parent-item' + id + ' .queue-summary-list > .item:first')
					.stop().animate({ "left": "100%", "opacity": "0" }, "slow")
					.hide()
					.next()
					.show()
					.stop().animate({ "left": "0", "opacity": "1" }, "slow")
					.end()
					.appendTo('#parent-item' + id + ' .queue-summary-list');

                $('.current-value').text(current_value);

                if ($('.queue-summary-list .item:first-child').hasClass('select')) {
                    $('.queue-select-summary a').hide();
                    $('.next-story').addClass('select');
                    $('.value').addClass('select');
                    $('.success-summary').show();
                } else {
                    $('.queue-select-summary a').show();
                    $('.next-story').removeClass('select');
                    $('.value').removeClass('select');
                    $('.success-summary').hide();
                }

            });

            $('.queue-select-summary a').click(function () {
                $(this).hide();
                $('.next-story').addClass('select');
                $('.value').addClass('select');
                $('.success-summary').show();
                $(this).parents('.queue-emulator').find('.queue-summary-list .item:first-child').addClass('select');
            });


			var text_id = 0;
            //Queue Adding Story
			$('.add-bubble a').click(function(){
				text_id++;
				$('.queue-customize-emulator .main-content').append('<div id ="edit-text'+ text_id +'" class="stroy-content-summary"><p></p><a href="javascript:void(0)" class="stroy-content-summary-delete"><img src="image/rss-delete.png"></a></div>');
				
				$('.queue-customize-emulator #edit-text'+ text_id +' p').editable({ type: 'textarea', action: 'click' });
				$('.queue-save').removeClass('add');
				
				$('.stroy-content-summary').hover(function(){
					$(this).find('.stroy-content-summary-delete').fadeIn(250);
				}, function(){
					$(this).find('.stroy-content-summary-delete').fadeOut(250);
				});			

				$('.stroy-content-summary-delete').click(function(){
					$(this).parents('.stroy-content-summary').remove();
				});
			});
	


$('.add-image-link .image-link-src input[type="text"]').keypress(function(event){
	
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		if(!$(this).val() == ''){
			var url = $(this).val();
			$(this).val("");
			$('.queue-customize-emulator .main-content').append('<div class="add-current-img"><div class="current-image"><img src="'+ url +'"></div><a href="javascript:void(0)" class="stroy-content-summary-delete"><img src="image/rss-delete.png"></a></div>');			
				$('.queue-customize-emulator .add-current-img').hover(function(){
					$(this).find('.stroy-content-summary-delete').fadeIn(250);
				}, function(){
					$(this).find('.stroy-content-summary-delete').fadeOut(250);
				});			

				$('.stroy-content-summary-delete').click(function(){
					$(this).parents('.queue-customize-emulator .add-current-img').remove();
				});	

					$('.queue-save').removeClass('add');
	
		
		}
	}
	event.stopPropagation();
});
	
	
			$('.queue-save a').click(function(){
				$('.queue-save').addClass('add');
			});
	
	
	
    //owl carousel
    var Owl = $('.owl-carousel');
    Owl.owlCarousel({
        items: 4,
    });
    $(".action_addstory").click(function () {
        var rel = $(this).attr("rel");
        var imges = $("#stroy_image_" + rel).attr("src");
        var head = $("#stroy_bold_" + rel).html();
        var inner = $("#stroy_inner_" + rel).html();
        var totalItems = $('.owl-item').length;
        Owl.trigger('add.owl.carousel', ['<div class="story_box use_clone"><div class="img_panal"><img src="' + imges + '" alt="img"></div><div class="text_panal"><p class="heading">' + head + '</p><p class="text_para">' + inner + '</p><p class="content_link">mockuuups.com</p></div></div>', totalItems - 0]).trigger('refresh.owl.carousel');
        $("#list" + rel).hide();

    });
    var height = $(".wrapper").height();
    $("#side_nav").css("height", height);

});// end here
