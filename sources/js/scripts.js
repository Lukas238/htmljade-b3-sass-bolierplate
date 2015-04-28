/* PLUGIN  */
(function($) {

    $.fn.tableMobilize = function() {

        this.each( function() {
            var $arr_titles = [];
            $(this).find('thead tr').each(function(row_key, row){
                $(row).children().each(function(col_key, col){
                    $arr_titles.push( $(col).text() );
                });
            });
                
            $(this).find('tbody tr').each(function(row_key, row){
                $(row).children().each(function(col_key, col){
                    if( $arr_titles[col_key] ){
                        $(col).attr('data-title', $arr_titles[col_key]);
                    }
                });
            }); 
        });

    };

}(jQuery));



$(document).ready(function(){   
    $('table.tableMobilize').tableMobilize();
});


$(window).load(function() {
	
	$('.slick-slider').each(function(){ 
		$(this).slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: (Math.floor(Math.random() * 5) + 3 )* 1000
		});
	});

 
 });