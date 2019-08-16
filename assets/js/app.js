$(document).ready(function(){
    //$(".owl-carousel").owlCarousel();
    $('.owl-carousel').owlCarousel({
        itemElement:'div.fs-slides.item',
        stagePadding: 0,
        items: 1,
        loop:false,
        margin:0,
        singleItem:true,
        rewind: true,
        /*
        nav:true,
        navText: [
            "<i class='fa fa-caret-left'></i> <",
            "<i class='fa fa-caret-right'></i> >"
        ],
        */
        dots:true
    });


    if(typeof homepage_sections !== 'undefined'){
        /*homepage*/
        $('#fullpage').fullpage({
            verticalCentered: false,
            anchors: homepage_sections,
            menu: '#homepage_navigation'
        });
        }

    /*registration*/
    $('.download-linkedin-button').click(function (event) {
        event.preventDefault();
        var LinkedInWindow = window.open($(this).attr("href"), "popupWindow", "width=600,height=600,scrollbars=yes");
        LinkedInWindow.focus();
            $('.download-linkedin').slideUp( "slow");
            $('.upload-linkedin').slideDown( "slow");
    });

    /* more tags show hide*/
    $('.btn_more_content_reveal').click(function(){
        $(this).hide();
        $(this).next('div.more_content_reveal').show();
    });

    /*tooltip*/
    $('[data-toggle="tooltip"]').tooltip()

    /*pushy menu button togler*/
    $('.menu-btn').click(function(){
		$('#nav-icon1').toggleClass('open');
	});


    window.dispatchEvent(new Event('resize'));

});