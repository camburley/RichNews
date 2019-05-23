$('.select-btn').click(function(){
    $('.select-btn').css({'color': '#ccc'});
    $(this).css({'color': 'green'});
    
    var $id = $(this).attr('page-id');
    var $name = $(this).attr('page-name');
    
    $.ajax({
      type: 'POST',
      url: '/setting/page',
      dataType: 'json',
      data: { "id": $id, "name": $name }
    }); 
});