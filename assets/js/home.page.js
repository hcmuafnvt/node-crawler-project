$(function() {
   if ($('#btnSubmit').length > 0) {
      $('#btnSubmit').on('click', function(e) {
         e.preventDefault();

         $.ajax({
            method: 'POST',
            url: '/api/tenant',
            'Content-Type': 'application/json',
            data: {
               tenantname: $('#tenantName').val()
            },
            success: function(responeData) {
               $('ul').append('<li>Created tenant Successfully</li>');
               console.log(responeData);
               if(responeData.status) {
                  setTimeout(function() {
                     var win = window.open('http://' + responeData.url, '_blank');
                     win.focus();
                  }, 1000);

               }
            }
         });
      })
   }
});
