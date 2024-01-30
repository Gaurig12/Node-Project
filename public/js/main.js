$(document).ready(function(){
    $(".delete-employee").on("click", function(){
        var ID = $(this).data("ID"); 
        var url = "/Delete/" + ID;
        console.log('Delete ID:', ID);
        console.log('Delete URL:', url);
        console.log('Request Type:', 'DELETE');
        if(confirm('Delete Employee?')){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                    console.log('Deleting Employee...');
                    window.location.href = '/';
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }
    });

    $('.edit-employee').on('click', function(){
        console.log('Edit button clicked');
        //console.log('Name:', $(this).data("Name"));
        //console.log('Domain:', $(this).data("Domain"));
        //console.log('Salary:', $(this).data("Salary"));
        $('#edit-form-ID').val($(this).data("ID")); 
        $('#edit-form-Name').val($(this).data("Name")); 
        $('#edit-form-Domain').val($(this).data("Domain")); 
        $('#edit-form-Salary').val($(this).data("Salary"));
    });
});
