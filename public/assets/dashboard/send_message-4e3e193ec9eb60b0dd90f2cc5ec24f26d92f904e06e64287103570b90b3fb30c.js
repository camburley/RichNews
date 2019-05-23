function getcurrentdate(){
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  
  var dt = new Date();
  var ampm = (dt.getHours() >= 12) ? "PM" : "AM";
  var hours = ((dt.getHours() + 11) % 12 + 1);
  var date = monthNames[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
  
  $("#release-soft-date").val(date);
  $(".hours").val(hours);
  $(".minutes").val(dt.getMinutes());
  $(".time-dayNight").val(ampm);
  
}

function complete_check(){
  if($("i").hasClass('fa-exclamation-circle')){
    $('.schedule-btn').attr('disabled', true);
    $('.next-button').attr('disabled', true);
  } else {
    $('.schedule-btn').attr('disabled', false);
    $('.next-button').attr('disabled', false);
  }
}

$(document).ready(function(){
  $('.timezones-form').timezones();
  
  // Load functions
    getcurrentdate();
});

$(window).click(function() {
   setInterval(complete_check, 250); 
});

$('#post-schedule').click(function() {
   $.ajax({
      type: 'POST',
      url: '/send-message',
      dataType: 'json',
      data: { 'create' : 'post'  } 
    }); 
});

$('#add_queue').click(function(){
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
    
    var date = $('#release-soft-date').val();
    var hours = $('.hours').find(':selected').text();
    var minutes = $('.minutes').find(':selected').text();
    var time_dayNight = $('.time-dayNight').find(':selected').text();
    var timezone = $('.timezones-form').val().replace(/\$\$(.+?)\$\$/, '');
    
    $.ajax({
      type: 'POST',
      url: '/send-message',
      dataType: 'json',
      data: { 'add_queue' : 'schedule', 
              's1_headline' : headline, 's1_image' : image, 's1_title' : title, 's1_bubble' : bubble1, 's1_bubblebtn' : bubble1btn,
              's2_bubble' : bubble2, 's2_image' : image2, 's2_bubble_two' : bubble3, 's2_bubble_two_btn' : bubble2btn,
              's3_bubblebtn' : bubble3btn,
              'date' : date, 'hours' : hours, 'minutes' : minutes, 'time_dayNight' : time_dayNight, 'timezone' : timezone}
    });
    
    function redirection(){
      window.location.replace("https://voicesai.com/send-message");
    }
    setTimeout(redirection, 1000);
});
