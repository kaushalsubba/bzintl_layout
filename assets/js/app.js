$(document).ready(function () {
    //$(".owl-carousel").owlCarousel();
    $('.owl-carousel').owlCarousel({
        itemElement: 'div.fs-slides.item',
        stagePadding: 0,
        items: 1,
        loop: false,
        margin: 0,
        singleItem: true,
        rewind: true,
        /*
        nav:true,
        navText: [
            "<i class='fa fa-caret-left'></i> <",
            "<i class='fa fa-caret-right'></i> >"
        ],
        */
        dots: true
    });


    if (typeof homepage_sections !== 'undefined') {
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
        $('.download-linkedin').slideUp("slow");
        $('.upload-linkedin').slideDown("slow");
    });

    /* more tags show hide*/
    i = 1;
    $('.btn_more_content_reveal').click(function () {
        //$(this).hide();
        //$(this).next('div.more_content_reveal').show();
        var txt = $(this).prev('div#more_content_reveal').hasClass('d-none') ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>';
        $(this).html(txt);
        $(this).prev('div#more_content_reveal').toggleClass('d-inline d-none');
    });

    /*tooltip*/
    $('[data-toggle="tooltip"]').tooltip()

    /*pushy menu button togler*/
    $('.menu-btn').click(function () {
        $('#nav-icon1').toggleClass('open');
    });

    // Toggle Height
    $('#toggleHeight').click(function () {
        var el = $('.' + $(this).attr('data-parent-element'));
        var height = $(this).attr('data-parent-height');

        if (el.attr('data-click-state') == 1) {
            el.attr('data-click-state', 0);
            el.height(height)
            $(this).html('Show More');
        } else {
            el.attr('data-click-state', 1);
            el.css('height', 'auto');
            $(this).html('Show Less');
        }
        return false;
    })

    window.dispatchEvent(new Event('resize'));

    setTimeout(function () {
        $("#hp_instruction").animate({
            opacity: 0
        }, 500, function () {
            $("#hp_instruction").hide(); //alt $(this).slideUp(400);
        });
    }, 5000);

});

//custom functions

//FEATURED HOVER
$(document).ready(function () {
    $(".linkfeat").hover(
        function () {
            $(".textfeat").show(500);
        },
        function () {
            $(".textfeat").hide(500);
        }
    );
});