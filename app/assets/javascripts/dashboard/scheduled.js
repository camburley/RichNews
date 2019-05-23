    function textCounter() {
        $('[id=value_by_story]').each(function(){
            if ($(this).attr('value') > 1) {
                $(this).text("STORIES");
            } else {
                $(this).text("STORY");
            }
        });
    }
    
    function dateCalc() {
        var $current = new Date();
        
        $('.clock-text').each(function(){
            var $sent = Date.parse($(this).attr('data-time'));
            var $finalRaw = $sent - $current;
            
            if ($finalRaw > 0) {
                hours = Math.floor($finalRaw / 3600000),
                minutes = Math.floor(($finalRaw % 3600000) / 60000);
                $(this).text(hours + "h " + minutes + "m");
            } else {
                $(this).text("SENT");
            }
            
        });
    }
    
        
    $('.expand-news').click(function(){
       $(this).parents('.storyline').find('.stories').slideToggle();
    });
    
    $('.delete-news').click(function() {
        var newsletterid = $(this).attr('newsletter_id');
            
        $.ajax({
          type: 'POST',
          url: '/scheduled',
          dataType: 'json',
          data: { 'newsletter' : 'delete', 'newsletterid' : newsletterid }
        });
        
        setTimeout(redirection, 1000);
    });
    
    function removeStory(story_id, newsletter_id){
        $.ajax({
          type: 'POST',
          url: '/scheduled',
          dataType: 'json',
          data: { 'story' : 'delete', 'storyid' : story_id, 'newsletterid' : newsletter_id }
        });
        
        setTimeout(redirection, 1000);
    }
    
    function editStory(id) {
        $('body').css({'overflow': 'hidden'});
        $('#popUp-'+ id).fadeIn();
        sections();
    }
    
    function closeEdit(id) {
        $('#popUp-'+ id).fadeOut(function(){
            $('body').css({'overflow': 'scroll'});
        });
    }
    
        function imageOne() {
            var $image1 = $('#image-1');
            var $popup1 = $('.popup-holder');
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
                   }, 500);
               } 
           });
        }
        
        function imageTwo() {
            var $image2 = $('#image-2');
            var $popup2 = $('.popup-holder-2');
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
        }
    
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
    
    $('.save-story').click(function(){
        // Section 1
        var $this = $(this).parent('.content-new');
            
          var newsletterid = $(this).attr('newsletter_id');
          var headline = $this.find('#headline-1').text();
          var image = $this.find('#image-1 img').attr('src');
          var title = $this.find('#title-1').text();
          var bubble1 = $this.find('#bubble-1').text();
          var bubble1btn = $this.find('#bubble-btn-1').text();
          
        // Section 2
          var bubble2 = $this.find('#bubble-2').text();
          var image2 = $this.find('#image-2 img').attr('src');
          var bubble3 = $this.find('#bubble-3').text();
          var bubble2btn = $this.find('#bubble-btn-2').text();
          
        // Section 3
          var bubble3btn = $this.find('#bubble-4').text();
          
          var storyid = $(this).attr('story_id');
        
        $.ajax({
          type: 'POST',
          url: '/scheduled',
          dataType: 'json',
          data: { 'story' : 'update', 'storyid' : storyid, 'newsletterid' : newsletterid,
                  's1_headline' : headline, 's1_image' : image, 's1_title' : title, 's1_bubble' : bubble1, 's1_bubblebtn' : bubble1btn,
                  's2_bubble' : bubble2, 's2_image' : image2, 's2_bubble_two' : bubble3, 's2_bubble_two_btn' : bubble2btn,
                  's3_bubblebtn' : bubble3btn }
        });
        
        setTimeout(redirection, 1000);
    });
    
    function redirection(){
      window.location.replace("/scheduled");
    }

$(document).ready(function(){
   textCounter(); 
   dateCalc();
});