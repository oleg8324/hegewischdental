(function($) {
    "use strict";

    window.mkd = {};
    mkd.modules = {};

    mkd.scroll = 0;
    mkd.window = $(window);
    mkd.document = $(document);
    mkd.windowWidth = $(window).width();
    mkd.windowHeight = $(window).height();
    mkd.body = $('body');
    mkd.html = $('html, body');
    mkd.htmlEl = $('html');
    mkd.menuDropdownHeightSet = false;
    mkd.defaultHeaderStyle = '';
    mkd.minVideoWidth = 1500;
    mkd.videoWidthOriginal = 1280;
    mkd.videoHeightOriginal = 720;
    mkd.videoRatio = 1280/720;

    mkd.mkdOnDocumentReady = mkdOnDocumentReady;
    mkd.mkdOnWindowLoad = mkdOnWindowLoad;
    mkd.mkdOnWindowResize = mkdOnWindowResize;
    mkd.mkdOnWindowScroll = mkdOnWindowScroll;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    $(window).scroll(mkdOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkd.scroll = $(window).scrollTop();

        //set global variable for header style which we will use in various functions
        if(mkd.body.hasClass('mkd-dark-header')){ mkd.defaultHeaderStyle = 'mkd-dark-header';}
        if(mkd.body.hasClass('mkd-light-header')){ mkd.defaultHeaderStyle = 'mkd-light-header';}

    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdOnWindowLoad() {

    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdOnWindowResize() {
        mkd.windowWidth = window.innerWidth;
        mkd.windowHeight = window.innerHeight;
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdOnWindowScroll() {
        mkd.scroll = $(window).scrollTop();
    }



    //set boxed layout width variable for various calculations

    switch(true){
        case mkd.body.hasClass('mkd-grid-1300'):
            mkd.boxedLayoutWidth = 1350;
            break;
        case mkd.body.hasClass('mkd-grid-1200'):
            mkd.boxedLayoutWidth = 1250;
            break;
        case mkd.body.hasClass('mkd-grid-1000'):
            mkd.boxedLayoutWidth = 1050;
            break;
        case mkd.body.hasClass('mkd-grid-800'):
            mkd.boxedLayoutWidth = 850;
            break;
        default :
            mkd.boxedLayoutWidth = 1150;
            break;
    }

})(jQuery);
(function($) {
	"use strict";

    var common = {};
    mkd.modules.common = common;

	common.mkdIsTouchDevice = mkdIsTouchDevice;
	common.mkdDisableSmoothScrollForMac = mkdDisableSmoothScrollForMac;
    common.mkdFluidVideo = mkdFluidVideo;
    common.mkdPreloadBackgrounds = mkdPreloadBackgrounds;
    common.mkdPrettyPhoto = mkdPrettyPhoto;
    common.mkdCheckHeaderStyleOnScroll = mkdCheckHeaderStyleOnScroll;
    common.mkdInitParallax = mkdInitParallax;
    //common.mkdSmoothScroll = mkdSmoothScroll;
    common.mkdEnableScroll = mkdEnableScroll;
    common.mkdDisableScroll = mkdDisableScroll;
    common.mkdWheel = mkdWheel;
    common.mkdKeydown = mkdKeydown;
    common.mkdPreventDefaultValue = mkdPreventDefaultValue;
    common.mkdOwlSlider = mkdOwlSlider;
    common.mkdInitSelfHostedVideoPlayer = mkdInitSelfHostedVideoPlayer;
    common.mkdSelfHostedVideoSize = mkdSelfHostedVideoSize;
    common.mkdInitBackToTop = mkdInitBackToTop;
    common.mkdBackButtonShowHide = mkdBackButtonShowHide;
    common.mkdSmoothTransition = mkdSmoothTransition;
    common.mkdInitCustomMenuDropdown = mkdInitCustomMenuDropdown;
    common.mkdLandingGallery = mkdLandingGallery;

    common.mkdOnDocumentReady = mkdOnDocumentReady;
    common.mkdOnWindowLoad = mkdOnWindowLoad;
    common.mkdOnWindowResize = mkdOnWindowResize;
    common.mkdOnWindowScroll = mkdOnWindowScroll;
    common.mkdIsTouchDevice = mkdIsTouchDevice;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    $(window).scroll(mkdOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkdTouchDeviceBodyClass();
		mkdDisableSmoothScrollForMac();
        mkdFluidVideo();
        mkdPreloadBackgrounds();
        mkdPrettyPhoto();
        mkdInitAnchor().init();
        mkdInitVideoBackground();
        mkdInitVideoBackgroundSize();
        mkdSetContentBottomMargin();
        //mkdSmoothScroll();
        mkdOwlSlider();
        mkdInitSelfHostedVideoPlayer();
        mkdSelfHostedVideoSize();
        mkdInitBackToTop();
        mkdBackButtonShowHide();
		mkdInitCustomMenuDropdown();
        mkdLandingGallery();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdOnWindowLoad() {
        mkdCheckHeaderStyleOnScroll(); //called on load since all content needs to be loaded in order to calculate row's position right
        mkdInitParallax();
        mkdSmoothTransition();
        mkdInitElementsAnimations();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdOnWindowResize() {
        mkdInitVideoBackgroundSize();
        mkdSelfHostedVideoSize();
        mkdInitParallax();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdOnWindowScroll() {
        
    }

	/*
	 ** Disable shortcodes animation on appear for touch devices
	 */
    function mkdTouchDeviceBodyClass() {
        if(mkdIsTouchDevice()) {
            mkd.body.addClass('mkd-no-animations-on-touch');
        }
    }

    function mkdIsTouchDevice() {
        return Modernizr.touch && !mkd.body.hasClass('mkd-no-animations-on-touch');
    }
	/*
	 ** Disable smooth scroll for mac if smooth scroll is enabled
	 */
	function mkdDisableSmoothScrollForMac() {
		var os = navigator.appVersion.toLowerCase();

		if (os.indexOf('mac') > -1 && mkd.body.hasClass('mkd-smooth-scroll')) {
			mkd.body.removeClass('mkd-smooth-scroll');
		}
	}

	function mkdFluidVideo() {
        fluidvids.init({
			selector: ['iframe'],
			players: ['www.youtube.com', 'player.vimeo.com']
		});
	}

    /**
     * Init Owl Carousel
     */
    function mkdOwlSlider() {

        var sliders = $('.mkd-owl-slider');

        if (sliders.length) {
            sliders.each(function(){

                var slider = $(this);
                slider.owlCarousel({
                    singleItem: true,
                    transitionStyle: 'fadeUp',
                    navigation: true,
                    autoHeight: true,
                    pagination: false,
                    navigationText: [
                        '<span class="mkd-prev-icon"><i class="lnr lnr-chevron-left"></i></span>',
                        '<span class="mkd-next-icon"><i class="lnr lnr-chevron-right"></i></span>'
                    ]
                });

            });
        }

    }


    /*
     *	Preload background images for elements that have 'mkd-preload-background' class
     */
    function mkdPreloadBackgrounds(){

        $(".mkd-preload-background").each(function() {
            var preloadBackground = $(this);
            if(preloadBackground.css("background-image") !== "" && preloadBackground.css("background-image") != "none") {

                var bgUrl = preloadBackground.attr('style');

                bgUrl = bgUrl.match(/url\(["']?([^'")]+)['"]?\)/);
                bgUrl = bgUrl ? bgUrl[1] : "";

                if (bgUrl) {
                    var backImg = new Image();
                    backImg.src = bgUrl;
                    $(backImg).load(function(){
                        preloadBackground.removeClass('mkd-preload-background');
                    });
                }
            }else{
                $(window).load(function(){ preloadBackground.removeClass('mkd-preload-background'); }); //make sure that mkd-preload-background class is removed from elements with forced background none in css
            }
        });
    }

    function mkdPrettyPhoto() {
        /*jshint multistr: true */
        var markupWhole = '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                            <div class="pp_right"> \
                                <div class="pp_content"> \
                                    <div class="pp_loaderIcon"></div> \
                                    <div class="pp_fade"> \
                                        <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                                        <div class="pp_hoverContainer"> \
                                            <a class="pp_next" href="#"></a> \
                                            <a class="pp_previous" href="#"></a> \
                                        </div> \
                                        <div id="pp_full_res"></div> \
                                        <div class="pp_details"> \
                                            <div class="pp_nav"> \
                                                <a href="#" class="pp_arrow_previous">Previous</a> \
                                                <p class="currentTextHolder">0/0</p> \
                                                <a href="#" class="pp_arrow_next">Next</a> \
                                            </div> \
                                            <p class="pp_description"></p> \
                                            {pp_social} \
                                            <a class="pp_close" href="#">Close</a> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>';

        $("a[data-rel^='prettyPhoto']").prettyPhoto({
            hook: 'data-rel',
            animation_speed: 'normal', /* fast/slow/normal */
            slideshow: false, /* false OR interval time in ms */
            autoplay_slideshow: false, /* true/false */
            opacity: 0.80, /* Value between 0 and 1 */
            show_title: true, /* true/false */
            allow_resize: true, /* Resize the photos bigger than viewport. true/false */
            horizontal_padding: 0,
            default_width: 960,
            default_height: 540,
            counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
            theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
            hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
            wmode: 'opaque', /* Set the flash wmode attribute */
            autoplay: true, /* Automatically start videos: True/False */
            modal: false, /* If set to true, only the close button will close the window */
            overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
            deeplinking: false,
            custom_markup: '',
            social_tools: false,
            markup: markupWhole
        });
    }

    /*
     *	Check header style on scroll, depending on row settings
     */
    function mkdCheckHeaderStyleOnScroll(){

        if($('[data-mkd_header_style]').length > 0 && mkd.body.hasClass('mkd-header-style-on-scroll')) {

            var waypointSelectors = $('.wpb_row.mkd-section');
            var changeStyle = function(element){
                (element.data("mkd_header_style") !== undefined) ? mkd.body.removeClass('mkd-dark-header mkd-light-header').addClass(element.data("mkd_header_style")) : mkd.body.removeClass('mkd-dark-header mkd-light-header').addClass(''+mkd.defaultHeaderStyle);
            };

            waypointSelectors.waypoint( function(direction) {
                if(direction === 'down') { changeStyle($(this.element)); }
            }, { offset: 0});

            waypointSelectors.waypoint( function(direction) {
                if(direction === 'up') { changeStyle($(this.element)); }
            }, { offset: function(){
                return -$(this.element).outerHeight();
            } });
        }
    }

    /*
     *	Start animations on elements
     */
    function mkdInitElementsAnimations(){

        var touchClass = $('.mkd-no-animations-on-touch'),
            noAnimationsOnTouch = true,
            elements = $('.mkd-grow-in, .mkd-fade-in-down, .mkd-element-from-fade, .mkd-element-from-left, .mkd-element-from-right, .mkd-element-from-top, .mkd-element-from-bottom, .mkd-flip-in, .mkd-x-rotate, .mkd-z-rotate, .mkd-y-translate, .mkd-fade-in, .mkd-fade-in-left-x-rotate'),
            animationClass,
            animationData;

        if (touchClass.length) {
            noAnimationsOnTouch = false;
        }

        if(elements.length > 0 && noAnimationsOnTouch){
            elements.each(function(){
				$(this).appear(function() {
					animationData = $(this).data('animation');
					if(typeof animationData !== 'undefined' && animationData !== '') {
						animationClass = animationData;
						$(this).addClass(animationClass+'-on');
					}
                },{accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
            });
        }

    }


/*
 **	Sections with parallax background image
 */
function mkdInitParallax(){

    if($('.mkd-parallax-section-holder').length){
        $('.mkd-parallax-section-holder').each(function() {

            var parallaxElement = $(this);
            if(parallaxElement.hasClass('mkd-full-screen-height-parallax')){
                parallaxElement.height(mkd.windowHeight);
                parallaxElement.find('.mkd-parallax-content-outer').css('padding',0);
            }
            var speed = parallaxElement.data('mkd-parallax-speed')*0.4;
            parallaxElement.parallax("50%", speed);
        });
    }
}

/*
 **	Anchor functionality
 */
var mkdInitAnchor = mkd.modules.common.mkdInitAnchor = function() {

    /**
     * Set active state on clicked anchor
     * @param anchor, clicked anchor
     */
    var setActiveState = function(anchor){

        $('.mkd-main-menu .mkd-active-item, .mkd-mobile-nav .mkd-active-item, .mkd-vertical-menu .mkd-active-item, .mkd-fullscreen-menu .mkd-active-item').removeClass('mkd-active-item');
        anchor.parent().addClass('mkd-active-item');

        $('.mkd-main-menu a, .mkd-mobile-nav a, .mkd-vertical-menu a, .mkd-fullscreen-menu a').removeClass('current');
        anchor.addClass('current');
    };

    /**
     * Check anchor active state on scroll
     */
    var checkActiveStateOnScroll = function(){

        $('[data-mkd-anchor]').waypoint( function(direction) {
            if(direction === 'down') {
                setActiveState($("a[href='"+window.location.href.split('#')[0]+"#"+$(this.element).data("mkd-anchor")+"']"));
            }
        }, { offset: '50%' });

        $('[data-mkd-anchor]').waypoint( function(direction) {
            if(direction === 'up') {
                setActiveState($("a[href='"+window.location.href.split('#')[0]+"#"+$(this.element).data("mkd-anchor")+"']"));
            }
        }, { offset: function(){
            return -($(this.element).outerHeight() - 150);
        } });

    };

    /**
     * Check anchor active state on load
     */
    var checkActiveStateOnLoad = function(){
        var hash = window.location.hash.split('#')[1];

        if(hash !== "" && $('[data-mkd-anchor="'+hash+'"]').length > 0){
            //triggers click which is handled in 'anchorClick' function
            var linkURL = window.location.href.split('#')[0]+"#"+hash;
            $("a[href='"+linkURL+'"').trigger( "click" );
        }
    };

    /**
     * Calculate header height to be substract from scroll amount
     * @param anchoredElementOffset, anchorded element offest
     */
    var headerHeihtToSubtract = function(anchoredElementOffset){

        if(mkd.modules.header.behaviour == 'mkd-sticky-header-on-scroll-down-up') {
            (anchoredElementOffset > mkd.modules.header.stickyAppearAmount) ? mkd.modules.header.isStickyVisible = true : mkd.modules.header.isStickyVisible = false;
        }

        if(mkd.modules.header.behaviour == 'mkd-sticky-header-on-scroll-up') {
            (anchoredElementOffset > mkd.scroll) ? mkd.modules.header.isStickyVisible = false : '';
        }

        var headerHeight = mkd.modules.header.isStickyVisible ? mkdGlobalVars.vars.mkdStickyHeaderTransparencyHeight : mkdPerPageVars.vars.mkdHeaderTransparencyHeight;

        return headerHeight;
    };

    /**
     * Handle anchor click
     */
    var anchorClick = function() {
        mkd.document.on("click", ".mkd-main-menu a, .mkd-vertical-menu a, .mkd-fullscreen-menu a, .mkd-btn, .mkd-anchor, .mkd-mobile-nav a", function() {
            var scrollAmount;
            var anchor = $(this);
            var hash = anchor.prop("hash").split('#')[1];

            if(hash !== "" && $('[data-mkd-anchor="' + hash + '"]').length > 0 /*&& anchor.attr('href').split('#')[0] == window.location.href.split('#')[0]*/) {

                var anchoredElementOffset = $('[data-mkd-anchor="' + hash + '"]').offset().top;
                scrollAmount = $('[data-mkd-anchor="' + hash + '"]').offset().top - headerHeihtToSubtract(anchoredElementOffset);

                setActiveState(anchor);

                mkd.html.stop().animate({
                    scrollTop: Math.round(scrollAmount)
                }, 1000, function() {
                    //change hash tag in url
                    if(history.pushState) { history.pushState(null, null, '#'+hash); }
                });
                return false;
            }
        });
    };

    return {
        init: function() {
            if($('[data-mkd-anchor]').length) {
                anchorClick();
                checkActiveStateOnScroll();
                $(window).load(function() { checkActiveStateOnLoad(); });
            }
        }
    };

};

/*
 **	Video background initialization
 */
function mkdInitVideoBackground(){

    $('.mkd-section .mkd-video-wrap .mkd-video').mediaelementplayer({
        enableKeyboard: false,
        iPadUseNativeControls: false,
        pauseOtherPlayers: false,
        // force iPhone's native controls
        iPhoneUseNativeControls: false,
        // force Android's native controls
        AndroidUseNativeControls: false
    });

    //mobile check
    if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
        mkdInitVideoBackgroundSize();
        $('.mkd-section .mkd-mobile-video-image').show();
        $('.mkd-section .mkd-video-wrap').remove();
    }
}

    /*
     **	Calculate video background size
     */
    function mkdInitVideoBackgroundSize(){

        $('.mkd-section .mkd-video-wrap').each(function(){

            var element = $(this);
            var sectionWidth = element.closest('.mkd-section').outerWidth();
            element.width(sectionWidth);

            var sectionHeight = element.closest('.mkd-section').outerHeight();
            mkd.minVideoWidth = mkd.videoRatio * (sectionHeight+20);
            element.height(sectionHeight);

            var scaleH = sectionWidth / mkd.videoWidthOriginal;
            var scaleV = sectionHeight / mkd.videoHeightOriginal;
            var scale =  scaleV;
            if (scaleH > scaleV)
                scale =  scaleH;
            if (scale * mkd.videoWidthOriginal < mkd.minVideoWidth) {scale = mkd.minVideoWidth / mkd.videoWidthOriginal;}

            element.find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * mkd.videoWidthOriginal +2));
            element.find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * mkd.videoHeightOriginal +2));
            element.scrollLeft((element.find('video').width() - sectionWidth) / 2);
            element.find('.mejs-overlay, .mejs-poster').scrollTop((element.find('video').height() - (sectionHeight)) / 2);
            element.scrollTop((element.find('video').height() - sectionHeight) / 2);
        });

    }

    /*
     **	Set content bottom margin because of the uncovering footer
     */
    function mkdSetContentBottomMargin(){
        var uncoverFooter = $('.mkd-footer-uncover');

        if(uncoverFooter.length){
            $('.mkd-content').css('margin-bottom', $('.mkd-footer-inner').height());
        }
    }

	/*
	** Initiate Smooth Scroll
	*/
	//function mkdSmoothScroll(){
	//
	//	if(mkd.body.hasClass('mkd-smooth-scroll')){
	//
	//		var scrollTime = 0.4;			//Scroll time
	//		var scrollDistance = 300;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
	//
	//		var mobile_ie = -1 !== navigator.userAgent.indexOf("IEMobile");
	//
	//		var smoothScrollListener = function(event){
	//			event.preventDefault();
	//
	//			var delta = event.wheelDelta / 120 || -event.detail / 3;
	//			var scrollTop = mkd.window.scrollTop();
	//			var finalScroll = scrollTop - parseInt(delta * scrollDistance);
	//
	//			TweenLite.to(mkd.window, scrollTime, {
	//				scrollTo: {
	//					y: finalScroll, autoKill: !0
	//				},
	//				ease: Power1.easeOut,
	//				autoKill: !0,
	//				overwrite: 5
	//			});
	//		};
	//
	//		if (!$('html').hasClass('touch') && !mobile_ie) {
	//			if (window.addEventListener) {
	//				window.addEventListener('mousewheel', smoothScrollListener, false);
	//				window.addEventListener('DOMMouseScroll', smoothScrollListener, false);
	//			}
	//		}
	//	}
	//}

    function mkdDisableScroll() {

        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', mkdWheel, false);
        }
        window.onmousewheel = document.onmousewheel = mkdWheel;
        document.onkeydown = mkdKeydown;

        if(mkd.body.hasClass('mkd-smooth-scroll')){
            window.removeEventListener('mousewheel', smoothScrollListener, false);
            window.removeEventListener('DOMMouseScroll', smoothScrollListener, false);
        }
    }

    function mkdEnableScroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', mkdWheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;

        if(mkd.body.hasClass('mkd-smooth-scroll')){
            window.addEventListener('mousewheel', smoothScrollListener, false);
            window.addEventListener('DOMMouseScroll', smoothScrollListener, false);
        }
    }

    function mkdWheel(e) {
        mkdPreventDefaultValue(e);
    }

    function mkdKeydown(e) {
        var keys = [37, 38, 39, 40];

        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                mkdPreventDefaultValue(e);
                return;
            }
        }
    }

    function mkdPreventDefaultValue(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }

    function mkdInitSelfHostedVideoPlayer() {

        var players = $('.mkd-self-hosted-video');
            players.mediaelementplayer({
                audioWidth: '100%'
            });
    }

	function mkdSelfHostedVideoSize(){

		$('.mkd-self-hosted-video-holder .mkd-video-wrap').each(function(){
			var thisVideo = $(this);

			var videoWidth = thisVideo.closest('.mkd-self-hosted-video-holder').outerWidth();
			var videoHeight = videoWidth / mkd.videoRatio;

			if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
				thisVideo.parent().width(videoWidth);
				thisVideo.parent().height(videoHeight);
			}

			thisVideo.width(videoWidth);
			thisVideo.height(videoHeight);

			thisVideo.find('video, .mejs-overlay, .mejs-poster').width(videoWidth);
			thisVideo.find('video, .mejs-overlay, .mejs-poster').height(videoHeight);
		});
	}

    function mkdToTopButton(a) {

        var b = $("#mkd-back-to-top");
        b.removeClass('off on');
        if (a === 'on') { b.addClass('on'); } else { b.addClass('off'); }
    }

    function mkdBackButtonShowHide(){
        mkd.window.scroll(function () {
            var b = $(this).scrollTop();
            var c = $(this).height();
            var d;
            if (b > 0) { d = b + c / 2; } else { d = 1; }
            if (d < 1e3) { mkdToTopButton('off'); } else { mkdToTopButton('on'); }
        });
    }

    function mkdInitBackToTop(){
        var backToTopButton = $('#mkd-back-to-top');
        backToTopButton.on('click',function(e){
            e.preventDefault();
            mkd.html.animate({scrollTop: 0}, mkd.window.scrollTop()/3, 'easeInOutSine');
        });
    }

    function mkdSmoothTransition() {
		var loader = $('body > .mkd-smooth-transition-loader.mkd-mimic-ajax');
        if (loader.length) {
            loader.fadeOut(500);
			$(window).bind('pageshow', function(event) {
				if (event.originalEvent.persisted) {
					loader.fadeOut(500);
				}
			});

            $('a').click(function(e) {
                var a = $(this);
                if (
                    e.which == 1 && // check if the left mouse button has been pressed
                    a.attr('href').indexOf(window.location.host) >= 0 && // check if the link is to the same domain
					(typeof a.data('rel') === 'undefined') && //Not pretty photo link
                    (typeof a.attr('rel') === 'undefined') && //Not VC pretty photo link
                    (typeof a.attr('target') === 'undefined' || a.attr('target') === '_self') && // check if the link opens in the same window
                    (a.attr('href').split('#')[0] !== window.location.href.split('#')[0]) // check if it is an anchor aiming for a different page
                ) {
                    e.preventDefault();
                    loader.addClass('mkd-hide-spinner');
                    loader.fadeIn(500, function() {
                        window.location = a.attr('href');
                    });
                }
            });
        }
    }

	function mkdInitCustomMenuDropdown() {
		var menus = $('.mkd-sidebar .widget_nav_menu .menu');

		var dropdownOpeners,
			currentMenu;


		if(menus.length) {
			menus.each(function() {
				currentMenu = $(this);

				dropdownOpeners = currentMenu.find('li.menu-item-has-children > a');

				if(dropdownOpeners.length) {
					dropdownOpeners.each(function() {
						var currentDropdownOpener = $(this);

						currentDropdownOpener.on('click', function(e) {
							e.preventDefault();

							var dropdownToOpen = currentDropdownOpener.parent().children('.sub-menu');

							if(dropdownToOpen.is(':visible')) {
								dropdownToOpen.slideUp();
								currentDropdownOpener.removeClass('mkd-custom-menu-active');
							} else {
								dropdownToOpen.slideDown();
								currentDropdownOpener.addClass('mkd-custom-menu-active');
							}
						});
					});
				}
			});
		}
	}

    function mkdLandingGallery() {
        var gallery = $('.mkd-landing-gallery');

        gallery.each(function() {
            $(this).find('.wpb_single_image .vc_single_image-wrapper').append('<div class="mkd-landing-gallery-hover"><span class="icon_plus"></span></div>');
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var ajax = {};

    mkd.modules.ajax = ajax;

    var animation = {};
    ajax.animation = animation;

    ajax.mkdFetchPage = mkdFetchPage;
    ajax.mkdInitAjax = mkdInitAjax;
    ajax.mkdHandleLinkClick = mkdHandleLinkClick;
    ajax.mkdInsertFetchedContent = mkdInsertFetchedContent;
    ajax.mkdInitBackBehavior = mkdInitBackBehavior;
    ajax.mkdSetActiveState = mkdSetActiveState;
    ajax.mkdReinitiateAll = mkdReinitiateAll;
    ajax.mkdHandleMeta = mkdHandleMeta;

    ajax.mkdOnDocumentReady = mkdOnDocumentReady;
    ajax.mkdOnWindowLoad = mkdOnWindowLoad;
    ajax.mkdOnWindowResize = mkdOnWindowResize;
    ajax.mkdOnWindowScroll = mkdOnWindowScroll;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    $(window).scroll(mkdOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkdInitAjax();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdOnWindowLoad() {
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdOnWindowResize() {
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdOnWindowScroll() {
    }


    var loadedPageFlag = true; // Indicates whether the page is loaded
    var firstLoad = true; // Indicates whether this is the first loaded page, for back button functionality
    animation.type = null;
    animation.time = 500; // Duration of animation for the content to be changed
    animation.simultaneous = true; // False indicates that the new content should wait for the old content to disappear, true means that it appears at the same time as the old content disappears
    animation.loader = null;
    animation.loaderTime = 500;

    /**
     * Fetching the targeted page
     */
    function mkdFetchPage(params, destinationSelector, targetSelector) {

        function setDefaultParam(key,value) {
            params[key] = typeof params[key] !== 'undefined' ? params[key] : value;
        }

        destinationSelector = typeof destinationSelector !== 'undefined' ? destinationSelector : '.mkd-content';
        targetSelector = typeof targetSelector !== 'undefined' ? targetSelector : '.mkd-content';
        
        // setting default ajax parameters
        params = typeof params !== 'undefined' ? params : {};

        setDefaultParam('url', window.location.href);
        setDefaultParam('type', 'POST');
        setDefaultParam('success', function(response) {
            var jResponse = $(response);

            var meta = jResponse.find('.mkd-meta');
            if (meta.length) { mkdHandleMeta(meta); }

            var new_content = jResponse.find(targetSelector);
            if (!new_content.length) {
                loadedPageFlag = true;
                return false;
            }
            else {
                mkdInsertFetchedContent(params.url, new_content, destinationSelector);
            }
        });

        // setting data parameters
        setDefaultParam('ajaxReq', 'yes');
        //setDefaultParam('hasHeader', mkd.body.find('header').length ? true : false);
        //setDefaultParam('hasFooter', mkd.body.find('footer').length ? true : false);

        $.ajax({
            url: params.url,
            type: params.type,
            data: {
                ajaxReq: params.ajaxReq
                //hasHeader: params.hasHeader,
                //hasFooter: params.hasFooter
            },
            success: params.success
        });
    }

    function mkdInitAjax() {
        mkd.body.removeClass('page-not-loaded'); // Might be necessary for ajax calls
		animation.loader = $('body > .mkd-smooth-transition-loader.mkd-ajax');
        if (animation.loader.length) {
            animation.loader.fadeOut(animation.loaderTime);
            $(window).focus(function() {
                animation.loader.fadeOut(animation.loaderTime);
            });

            if(mkd.body.hasClass('woocommerce') || mkd.body.hasClass('woocommerce-page')) {
                return false;
            }
            else {
                mkdInitBackBehavior();
                $(document).on('click', 'a[target!="_blank"]:not(.no-ajax):not(.no-link)', function(click) {
                    var link = $(this);

                    if(click.ctrlKey == 1) { // Check if CTRL key is held with the click
                        window.open(link.attr('href'), '_blank');
                        return false;
                    }

                    if(link.parents('.mkd-ptf-load-more').length){ return false; } // Don't initiate ajax for portfolio load more link

                    if(link.parents('.mkd-blog-load-more-button').length){ return false; } // Don't initiate ajax for blog load more link

                    if(link.parents('mkd-post-info-comments').length){ // If it's a comment link, don't load any content, just scroll to the comments section
                        var hash = link.attr('href').split("#")[1];  
                        $('html, body').scrollTop( $("#"+hash).offset().top );  
                        return false;  
                    }

                    if(window.location.href.split('#')[0] == link.attr('href').split('#')[0]){ return false; } //  If the link leads to the same page, don't use ajax

                    if(link.closest('.mkd-no-animation').length === 0){ // If no parents are set to no-animation...

                        if(document.location.href.indexOf("?s=") >= 0){ // Don't use ajax if currently on search page
                            return true;
                        }
                        if(link.attr('href').indexOf("wp-admin") >= 0){ // Don't use ajax for wp-admin
                            return true;
                        }
                        if(link.attr('href').indexOf("wp-content") >= 0){ // Don't use ajax for wp-content
                            return true;
                        }

                        if(jQuery.inArray(link.attr('href').split('#')[0], mkdGlobalVars.vars.no_ajax_pages) !== -1){ // If the target page is a no-ajax page, don't use ajax
                            document.location.href = link.attr('href');
                            return false;
                        }

                        if((link.attr('href') !== "http://#") && (link.attr('href') !== "#")){ // Don't use ajax if the link is empty
                            //disableHashChange = true;

                            var url = link.attr('href');
                            var start = url.indexOf(window.location.protocol + '//' + window.location.host); // Check if the link leads to the same domain
                            if(start === 0){
                                if(!loadedPageFlag){ return false; } //if page is not loaded don't load next one
                                click.preventDefault();
                                click.stopImmediatePropagation();
                                click.stopPropagation();
                                if (!link.is('.current')) {
                                    mkdHandleLinkClick(link);
                                }
                            }

                        }else{
                            return false;
                        }
                    }
                });
            }
        }
    }

    function mkdInitBackBehavior() {
        if (window.history.pushState) {
            /* the below code is to override back button to get the ajax content without reload*/
            $(window).bind('popstate', function() {
                "use strict";

                var url = location.href;
                if (!firstLoad && loadedPageFlag) {
                    loadedPageFlag = false;
                    mkdFetchPage({
                        url: url
                    });
                }
            });
        }
    }

    function mkdHandleLinkClick(link) {
        loadedPageFlag = false;
        animation.loader.fadeIn(animation.loaderTime);
        mkdFetchPage({
            url: link.attr('href')
        });
    }

    function mkdSetActiveState(url) {
        var me = $("nav a[href='"+url+"'], .widget_nav_menu a[href='"+url+"']");

		$('.mkd-main-menu a, .mkd-mobile-nav a, .mkd-mobile-nav h4, .mkd-vertical-menu a, .popup_menu a, .widget_nav_menu a').removeClass('current').parent().removeClass('mkd-active-item');
		//$('.main_menu a, .mobile_menu a, .mobile_menu h4, .vertical_menu a, .popup_menu a').parent().removeClass('active');
		$('.widget_nav_menu ul.menu > li').removeClass('current-menu-item');

        me.each(function() {
            var me = $(this);

            if(me.closest('.second').length === 0){
                me.parent().addClass('mkd-active-item');
            }else{
                me.closest('.second').parent().addClass('mkd-active-item');
            }

            if(me.closest('.mkd-mobile-nav').length > 0){
                me.closest('.level0').addClass('mkd-active-item');
                me.closest('.level1').addClass('mkd-active-item');
                me.closest('.level2').addClass('mkd-active-item');
            }

            if(me.closest('.widget_nav_menu').length > 0){
                me.closest('.widget_nav_menu').find('.menu-item').addClass('current-menu-item');
            }


            //$('.mkd-main-menu a, .mkd-mobile-nav a, .mkd-vertical-menu a, .popup_menu a').removeClass('current');
            me.addClass('current');
        });
    }

    function mkdReinitiateAll() {
        $(document).off(); // Remove all event handlers before reinitialization
		$(window).off();
        mkd.body.off().find('*').off(); // Remove all event handlers before reinitialization

        mkd.mkdOnDocumentReady();
        mkd.mkdOnWindowLoad();
        mkd.mkdOnWindowResize();
        mkd.mkdOnWindowScroll();

        var modules = ['common', 'ajax', 'header', 'title', 'shortcodes', 'woocommerce', 'portfolio', 'blog', 'like'];
        for (var i=0; i<modules.length; i++) {
            if (1 || typeof mkd.modules[modules[i]] !== 'undefined') {
                mkd.modules[modules[i]].mkdOnDocumentReady();
                mkd.modules[modules[i]].mkdOnWindowLoad();
                mkd.modules[modules[i]].mkdOnWindowResize();
                mkd.modules[modules[i]].mkdOnWindowScroll();
            }
        }
    }

    function mkdHandleMeta(meta_data) {
        // set up title, meta description and meta keywords
        var newTitle = meta_data.find(".mkd-seo-title").text();
        var pageTransition = meta_data.find(".mkd-page-transition").text();
        var newDescription = meta_data.find(".mkd-seo-description").text();
        var newKeywords = meta_data.find(".mkd-seo-keywords").text();
        if (typeof pageTransition !== 'undefined') {
            animation.type = pageTransition;
        } 
        if ($('head meta[name="description"]').length) {
            $('head meta[name="description"]').attr('content', newDescription);
        } else if (typeof newDescription !== 'undefined') {
            $('<meta name="description" content="'+newDescription+'">').prependTo($('head'));
        } 
        if ($('head meta[name="keywords"]').length) {
            $('head meta[name="keywords"]').attr('content', newKeywords);
        } else if (typeof newKeywords !== 'undefined') {
            $('<meta name="keywords" content="'+newKeywords+'">').prependTo($('head'));
        } 
        document.title = newTitle;

        var newBodyClasses = meta_data.find(".mkd-body-classes").text();
        var myArray = newBodyClasses.split(',');
        mkd.body.removeClass();
        for(var i=0;i<myArray.length;i++){
            if (myArray[i] !== "mkd-page-not-loaded"){
                mkd.body.addClass(myArray[i]);
            }
        }

        if($("#wp-admin-bar-edit").length > 0){
            // set up edit link when wp toolbar is enabled
            var pageId = meta_data.find("#mkd-page-id").text();
            var old_link = $('#wp-admin-bar-edit a').attr("href");
            var new_link = old_link.replace(/(post=).*?(&)/,'$1' + pageId + '$2');
            $('#wp-admin-bar-edit a').attr("href", new_link);
        }
    }

    function mkdInsertFetchedContent(url, new_content, destinationSelector) {
        destinationSelector = typeof destinationSelector !== 'undefined' ? destinationSelector : '.mkd-content';
        var destination = mkd.body.find(destinationSelector);
        
        new_content.height(destination.height()).css({'position': 'absolute', 'opacity': 0, 'overflow': 'hidden'}).insertBefore(destination);
       
        new_content.waitForImages(function() {
            if (url.indexOf('#') !== -1) {
                $('<a class="mkd-temp-anchor mkd-anchor" href="'+url+'" style="display: none"></a>').appendTo('body');
            }
            mkdReinitiateAll();

            if (animation.type == "fade") {
                destination.stop().fadeTo(animation.time, 0, function() {
                    destination.remove();
                    if (window.history.pushState) {
                        if(url!==window.location.href){
                            window.history.pushState({path:url},'',url);
                        }

                        //does Google Analytics code exists on page?
                        if(typeof _gaq !== 'undefined') {
                            //add new url to Google Analytics so it can be tracked
                            _gaq.push(['_trackPageview', url]);
                        }
                    } else {
                        document.location.href = window.location.protocol + '//' + window.location.host + '#' + url.split(window.location.protocol + '//' + window.location.host)[1];
                    }
                    mkdSetActiveState(url);
                    mkd.body.animate({scrollTop: 0}, animation.time, 'swing');
                });
                setTimeout(function() {
                    new_content.css('position','relative').height('').stop().fadeTo(animation.time, 1, function() {
                        loadedPageFlag = true;
                        firstLoad = false;
                        animation.loader.fadeOut(animation.loaderTime, function() {
                            var anch = $('.mkd-temp-anchor');
                            if (anch.length) {
                                anch.trigger('click').remove();
                            }
                        });
                    });
                }, !animation.simultaneous * animation.time);
            }
        });
    }


})(jQuery);
(function($) {
    "use strict";

    var header = {};
    mkd.modules.header = header;

    header.isStickyVisible = false;
    header.stickyAppearAmount = 0;
    header.behaviour;
    header.mkdSideArea = mkdSideArea;
    header.mkdSideAreaScroll = mkdSideAreaScroll;
    header.mkdFullscreenMenu = mkdFullscreenMenu;
    header.mkdInitMobileNavigation = mkdInitMobileNavigation;
    header.mkdMobileHeaderBehavior = mkdMobileHeaderBehavior;
    header.mkdSetDropDownMenuPosition = mkdSetDropDownMenuPosition;
    header.mkdDropDownMenu = mkdDropDownMenu;
    header.mkdSearch = mkdSearch;

    header.mkdOnDocumentReady = mkdOnDocumentReady;
    header.mkdOnWindowLoad = mkdOnWindowLoad;
    header.mkdOnWindowResize = mkdOnWindowResize;
    header.mkdOnWindowScroll = mkdOnWindowScroll;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    $(window).scroll(mkdOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkdHeaderBehaviour();
        mkdSideArea();
        mkdSideAreaScroll();
        mkdFullscreenMenu();
        mkdInitMobileNavigation();
        mkdMobileHeaderBehavior();
        mkdSetDropDownMenuPosition();
        mkdDropDownMenu();
        mkdSearch();
        mkdVerticalMenu().init();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdOnWindowLoad() {
        mkdSetDropDownMenuPosition();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdOnWindowResize() {
        mkdDropDownMenu();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdOnWindowScroll() {
        
    }



    /*
     **	Show/Hide sticky header on window scroll
     */
    function mkdHeaderBehaviour() {

        var header = $('.mkd-page-header');
        var stickyHeader = $('.mkd-sticky-header');
        var fixedHeaderWrapper = $('.mkd-fixed-wrapper');

        var headerMenuAreaOffset = $('.mkd-page-header').find('.mkd-fixed-wrapper').length ? $('.mkd-page-header').find('.mkd-fixed-wrapper').offset().top : null;

        var stickyAppearAmount;


        switch(true) {
            // sticky header that will be shown when user scrolls up
            case mkd.body.hasClass('mkd-sticky-header-on-scroll-up'):
                mkd.modules.header.behaviour = 'mkd-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = mkdGlobalVars.vars.mkdTopBarHeight + mkdGlobalVars.vars.mkdLogoAreaHeight + mkdGlobalVars.vars.mkdMenuAreaHeight + mkdGlobalVars.vars.mkdStickyHeaderHeight;

                var headerAppear = function(){
                    var docYScroll2 = $(document).scrollTop();

                    if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        mkd.modules.header.isStickyVisible= false;
                        stickyHeader.removeClass('header-appear').find('.mkd-main-menu .second').removeClass('mkd-drop-down-start');
                    }else {
                        mkd.modules.header.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                    }

                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // sticky header that will be shown when user scrolls both up and down
            case mkd.body.hasClass('mkd-sticky-header-on-scroll-down-up'):
                var setStickyScrollAmount = function() {
                    var amount;

                    if(isStickyAmountFullScreen()) {
                        amount = mkd.window.height();
                    } else {
                        if(mkdPerPageVars.vars.mkdStickyScrollAmount !== 0) {
                            amount = mkdPerPageVars.vars.mkdStickyScrollAmount;
                        } else {
                            amount = mkdGlobalVars.vars.mkdTopBarHeight + mkdGlobalVars.vars.mkdLogoAreaHeight + mkdGlobalVars.vars.mkdMenuAreaHeight;
                        }
                    }

                    stickyAppearAmount = amount;
                };

                var isStickyAmountFullScreen = function() {
                    var fullScreenStickyAmount = mkdPerPageVars.vars.mkdStickyScrollAmountFullScreen;

                    return typeof fullScreenStickyAmount !== 'undefined' && fullScreenStickyAmount === true;
                };
                
                mkd.modules.header.behaviour = 'mkd-sticky-header-on-scroll-down-up';
                setStickyScrollAmount();
                mkd.modules.header.stickyAppearAmount = stickyAppearAmount; //used in anchor logic
                
                var headerAppear = function(){
                    if(mkd.scroll < stickyAppearAmount) {
                        mkd.modules.header.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.mkd-main-menu .second').removeClass('mkd-drop-down-start');
                    }else{
                        mkd.modules.header.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                    }
                };

                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // on scroll down, part of header will be sticky
            case mkd.body.hasClass('mkd-fixed-on-scroll'):
                mkd.modules.header.behaviour = 'mkd-fixed-on-scroll';
                var headerFixed = function(){
                    if(mkd.scroll < headerMenuAreaOffset){
                        fixedHeaderWrapper.removeClass('fixed');
                        header.css('margin-bottom',0);}
                    else{
                        fixedHeaderWrapper.addClass('fixed');
                        header.css('margin-bottom',fixedHeaderWrapper.height());
                    }
                };

                headerFixed();

                $(window).scroll(function() {
                    headerFixed();
                });

                break;
        }
    }

    /**
     * Show/hide side area
     */
    function mkdSideArea() {

        var wrapper = $('.mkd-wrapper'),
            sideMenu = $('.mkd-side-menu'),
            sideMenuButtonOpen = $('a.mkd-side-menu-button-opener'),
            cssClass,
        //Flags
            slideFromRight = false,
            slideWithContent = false,
            slideUncovered = false;

        if (mkd.body.hasClass('mkd-side-menu-slide-from-right')) {

            cssClass = 'mkd-right-side-menu-opened';
            wrapper.prepend('<div class="mkd-cover"/>');
            slideFromRight = true;

        } else if (mkd.body.hasClass('mkd-side-menu-slide-with-content')) {

            cssClass = 'mkd-side-menu-open';
            slideWithContent = true;

        } else if (mkd.body.hasClass('mkd-side-area-uncovered-from-content')) {

            cssClass = 'mkd-right-side-menu-opened';
            slideUncovered = true;

        }

        $('a.mkd-side-menu-button-opener, a.mkd-close-side-menu').click( function(e) {
            e.preventDefault();

            if(!sideMenuButtonOpen.hasClass('opened')) {

                sideMenuButtonOpen.addClass('opened');
                mkd.body.addClass(cssClass);

                if (slideFromRight) {
                    $('.mkd-wrapper .mkd-cover').click(function() {
                        mkd.body.removeClass('mkd-right-side-menu-opened');
                        sideMenuButtonOpen.removeClass('opened');
                    });
                }

                if (slideUncovered) {
                    sideMenu.css({
                        'visibility' : 'visible'
                    });
                }

                var currentScroll = $(window).scrollTop();
                $(window).scroll(function() {
                    if(Math.abs(mkd.scroll - currentScroll) > 400){
                        mkd.body.removeClass(cssClass);
                        sideMenuButtonOpen.removeClass('opened');
                        if (slideUncovered) {
                            var hideSideMenu = setTimeout(function(){
                                sideMenu.css({'visibility':'hidden'});
                                clearTimeout(hideSideMenu);
                            },400);
                        }
                    }
                });

            } else {

                sideMenuButtonOpen.removeClass('opened');
                mkd.body.removeClass(cssClass);
                if (slideUncovered) {
                    var hideSideMenu = setTimeout(function(){
                        sideMenu.css({'visibility':'hidden'});
                        clearTimeout(hideSideMenu);
                    },400);
                }

            }

            if (slideWithContent) {

                e.stopPropagation();
                wrapper.click(function() {
                    e.preventDefault();
                    sideMenuButtonOpen.removeClass('opened');
                    mkd.body.removeClass('mkd-side-menu-open');
                });

            }

        });

    }

    /*
    **  Smooth scroll functionality for Side Area
    */
    function mkdSideAreaScroll(){

        var sideMenu = $('.mkd-side-menu');

        if(sideMenu.length){    
            sideMenu.niceScroll({ 
                scrollspeed: 60,
                mousescrollstep: 40,
                cursorwidth: 0, 
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false, 
                horizrailenabled: false 
            });
        }
    }

    /**
     * Init Fullscreen Menu
     */
    function mkdFullscreenMenu() {

        if ($('a.mkd-fullscreen-menu-opener').length) {

            var popupMenuOpener = $( 'a.mkd-fullscreen-menu-opener'),
                popupMenuHolderOuter = $(".mkd-fullscreen-menu-holder-outer"),
                cssClass,
            //Flags for type of animation
                fadeRight = false,
                fadeTop = false,
            //Widgets
                widgetAboveNav = $('.mkd-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.mkd-fullscreen-below-menu-widget-holder'),
            //Menu
                menuItems = $('.mkd-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild =  $('.mkd-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = $('.mkd-fullscreen-menu ul li:not(.has_sub) a');


            //set height of popup holder and initialize nicescroll
            popupMenuHolderOuter.height(mkd.windowHeight).niceScroll({
                scrollspeed: 30,
                mousescrollstep: 20,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            }); //200 is top and bottom padding of holder

            //set height of popup holder on resize
            $(window).resize(function() {
                popupMenuHolderOuter.height(mkd.windowHeight);
            });

            if (mkd.body.hasClass('mkd-fade-push-text-right')) {
                cssClass = 'mkd-push-nav-right';
                fadeRight = true;
            } else if (mkd.body.hasClass('mkd-fade-push-text-top')) {
                cssClass = 'mkd-push-text-top';
                fadeTop = true;
            }

            //Appearing animation
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay' : 0 + 'ms',
                        '-moz-animation-delay' : 0 + 'ms',
                        'animation-delay' : 0 + 'ms'
                    });
                }
                menuItems.each(function(i) {
                    $(this).css({
                        '-webkit-animation-delay': (i+1) * 70 + 'ms',
                        '-moz-animation-delay': (i+1) * 70 + 'ms',
                        'animation-delay': (i+1) * 70 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        '-moz-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        'animation-delay' : (menuItems.length + 1)*70 + 'ms'
                    });
                }
            }

            // Open popup menu
            popupMenuOpener.on('click',function(e){
                e.preventDefault();

                if (!popupMenuOpener.hasClass('opened')) {
                    popupMenuOpener.addClass('opened');
                    mkd.body.addClass('mkd-fullscreen-menu-opened');
                    mkd.body.removeClass('mkd-fullscreen-fade-out').addClass('mkd-fullscreen-fade-in');
                    mkd.body.removeClass(cssClass);
                    if(!mkd.body.hasClass('page-template-full_screen-php')){
                        mkd.modules.common.mkdDisableScroll();
                    }
                    $(document).keyup(function(e){
                        if (e.keyCode == 27 ) {
                            popupMenuOpener.removeClass('opened');
                            mkd.body.removeClass('mkd-fullscreen-menu-opened');
                            mkd.body.removeClass('mkd-fullscreen-fade-in').addClass('mkd-fullscreen-fade-out');
                            mkd.body.addClass(cssClass);
                            if(!mkd.body.hasClass('page-template-full_screen-php')){
                                mkd.modules.common.mkdEnableScroll();
                            }
                            $("nav.mkd-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                                $('nav.popup_menu').getNiceScroll().resize();
                            });
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('opened');
                    mkd.body.removeClass('mkd-fullscreen-menu-opened');
                    mkd.body.removeClass('mkd-fullscreen-fade-in').addClass('mkd-fullscreen-fade-out');
                    mkd.body.addClass(cssClass);
                    if(!mkd.body.hasClass('page-template-full_screen-php')){
                        mkd.modules.common.mkdEnableScroll();
                    }
                    $("nav.mkd-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                        $('nav.popup_menu').getNiceScroll().resize();
                    });
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();

                if ($(this).parent().hasClass('has_sub')) {
                    var submenu = $(this).parent().find('> ul.sub_menu');
                    if (submenu.is(':visible')) {
                        submenu.slideUp(200, function() {
                            popupMenuHolderOuter.getNiceScroll().resize();
                        });
                        $(this).parent().removeClass('open_sub');
                    } else {
                        $(this).parent().addClass('open_sub');
                        submenu.slideDown(200, function() {
                            popupMenuHolderOuter.getNiceScroll().resize();
                        });
                    }
                }
                return false;
            });

            //if link has no submenu and if it's not dead, than open that link
            menuItemWithoutChild.click(function (e) {

                if(($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")){

                    if (e.which == 1) {
                        popupMenuOpener.removeClass('opened');
                        mkd.body.removeClass('mkd-fullscreen-menu-opened');
                        mkd.body.removeClass('mkd-fullscreen-fade-in').addClass('mkd-fullscreen-fade-out');
                        mkd.body.addClass(cssClass);
                        $("nav.mkd-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                            $('nav.popup_menu').getNiceScroll().resize();
                        });
                        mkd.modules.common.mkdEnableScroll();
                    }
                }else{
                    return false;
                }

            });

        }



    }

    function mkdInitMobileNavigation() {
        var navigationOpener = $('.mkd-mobile-header .mkd-mobile-menu-opener');
        var navigationHolder = $('.mkd-mobile-header .mkd-mobile-nav');
        var dropdownOpener = $('.mkd-mobile-nav .mobile_arrow, .mkd-mobile-nav h4, .mkd-mobile-nav a[href*="#"]');
        var animationSpeed = 200;

        //whole mobile menu opening / closing
        if(navigationOpener.length && navigationHolder.length) {
            navigationOpener.on('tap click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                if(navigationHolder.is(':visible')) {
                    navigationHolder.slideUp(animationSpeed);
                } else {
                    navigationHolder.slideDown(animationSpeed);
                }
            });
        }

        //dropdown opening / closing
        if(dropdownOpener.length) {
            dropdownOpener.each(function() {
                $(this).on('tap click', function(e) {
                    var dropdownToOpen = $(this).nextAll('ul').first();

                    if(dropdownToOpen.length) {
                        e.preventDefault();
                        e.stopPropagation();

                        var openerParent = $(this).parent('li');
                        if(dropdownToOpen.is(':visible')) {
                            dropdownToOpen.slideUp(animationSpeed);
                            openerParent.removeClass('mkd-opened');
                        } else {
                            dropdownToOpen.slideDown(animationSpeed);
                            openerParent.addClass('mkd-opened');
                        }
                    }

                });
            });
        }

        $('.mkd-mobile-nav a, .mkd-mobile-logo-wrapper a').on('click tap', function(e) {
            if($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
                navigationHolder.slideUp(animationSpeed);
            }
        });
    }

    function mkdMobileHeaderBehavior() {
        if(mkd.body.hasClass('mkd-sticky-up-mobile-header')) {
            var stickyAppearAmount;
            var mobileHeader = $('.mkd-mobile-header');
            var adminBar     = $('#wpadminbar');
            var mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0;
            var adminBarHeight = adminBar.length ? adminBar.height() : 0;

            var docYScroll1 = $(document).scrollTop();
            stickyAppearAmount = mobileHeaderHeight + adminBarHeight;

            $(window).scroll(function() {
                var docYScroll2 = $(document).scrollTop();

                if(docYScroll2 > stickyAppearAmount) {
                    mobileHeader.addClass('mkd-animate-mobile-header');
                } else {
                    mobileHeader.removeClass('mkd-animate-mobile-header');
                }

                if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                    mobileHeader.removeClass('mobile-header-appear');
                    mobileHeader.css('margin-bottom', 0);

                    if(adminBar.length) {
                        mobileHeader.find('.mkd-mobile-header-inner').css('top', 0);
                    }
                } else {
                    mobileHeader.addClass('mobile-header-appear');
                    mobileHeader.css('margin-bottom', stickyAppearAmount);

                    //if(adminBar.length) {
                    //    mobileHeader.find('.mkd-mobile-header-inner').css('top', adminBarHeight);
                    //}
                }

                docYScroll1 = $(document).scrollTop();
            });
        }

    }


    /**
     * Set dropdown position
     */
    function mkdSetDropDownMenuPosition(){

        var menuItems = $(".mkd-drop-down > ul > li.narrow");
        menuItems.each( function(i) {

            var browserWidth = mkd.windowWidth-16; // 16 is width of scroll bar
            var menuItemPosition = $(this).offset().left;
            var dropdownMenuWidth = $(this).find('.second .inner ul').width();

            var menuItemFromLeft = 0;
            if(mkd.body.hasClass('boxed')){
                menuItemFromLeft = mkd.boxedLayoutWidth  - (menuItemPosition - (browserWidth - mkd.boxedLayoutWidth )/2);
            } else {
                menuItemFromLeft = browserWidth - menuItemPosition;
            }

            var dropDownMenuFromLeft; //has to stay undefined beacuse 'dropDownMenuFromLeft < dropdownMenuWidth' condition will be true

            if($(this).find('li.sub').length > 0){
                dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
            }

            if(menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth){
                $(this).find('.second').addClass('right');
                $(this).find('.second .inner ul').addClass('right');
            }
        });

    }


    function mkdDropDownMenu() {

        var menu_items = $('.mkd-drop-down > ul > li');

        menu_items.each(function(i) {
            if($(menu_items[i]).find('.second').length > 0) {

                var dropDownSecondDiv = $(menu_items[i]).find('.second');

                if($(menu_items[i]).hasClass('wide')) {

                    var dropdown = $(this).find('.inner > ul');
                    var dropdownPadding = parseInt(dropdown.css('padding-left').slice(0, -2)) + parseInt(dropdown.css('padding-right').slice(0, -2));
                    var dropdownWidth = dropdown.outerWidth();

                    if(!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                        dropDownSecondDiv.css('left', 0);
                    }

                    //set columns to be same height - start
                    var tallest = 0;
                    $(this).find('.second > .inner > ul > li').each(function() {
                        var thisHeight = $(this).height();
                        if(thisHeight > tallest) {
                            tallest = thisHeight;
                        }
                    });
                    $(this).find('.second > .inner > ul > li').css("height", ""); // delete old inline css - via resize
                    $(this).find('.second > .inner > ul > li').height(tallest);
                    //set columns to be same height - end

                    if(!mkd.body.hasClass('mkd-full-width-wide-menu')) {
                        if(!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                            var left_position = (mkd.windowWidth - 2 * (mkd.windowWidth - dropdown.offset().left)) / 2 + (dropdownWidth + dropdownPadding) / 2;
                            dropDownSecondDiv.css('left', -left_position);
                        }
                    } else {
                        if(!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                            var left_position = dropdown.offset().left;

                            dropDownSecondDiv.css('left', -left_position);
                            dropDownSecondDiv.css('width', mkd.windowWidth);

                        }
                    }
                }

                if(!mkd.menuDropdownHeightSet) {
                    $(menu_items[i]).data('original_height', dropDownSecondDiv.height() + 'px');
                    dropDownSecondDiv.height(0);
                }

                if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    $(menu_items[i]).on("touchstart mouseenter", function() {
                        dropDownSecondDiv.css({
                            'height': $(menu_items[i]).data('original_height'),
                            'overflow': 'visible',
                            'visibility': 'visible',
                            'opacity': '1'
                        });
                    }).on("mouseleave", function() {
                        dropDownSecondDiv.css({
                            'height': '0px',
                            'overflow': 'hidden',
                            'visibility': 'hidden',
                            'opacity': '0'
                        });
                    });

                } else {
                    if(mkd.body.hasClass('mkd-dropdown-animate-height')) {
                        $(menu_items[i]).mouseenter(function() {
                            dropDownSecondDiv.css({
                                'visibility': 'visible',
                                'height': '0px',
                                'opacity': '0'
                            });
                            dropDownSecondDiv.stop().animate({
                                'height': $(menu_items[i]).data('original_height'),
                                opacity: 1
                            }, 200, function() {
                                dropDownSecondDiv.css('overflow', 'visible');
                            });
                        }).mouseleave(function() {
                            dropDownSecondDiv.stop().animate({
                                'height': '0px'
                            }, 0, function() {
                                dropDownSecondDiv.css({
                                    'overflow': 'hidden',
                                    'visibility': 'hidden'
                                });
                            });
                        });
                    } else {
                        var config = {
                            interval: 0,
                            over: function() {
                                setTimeout(function() {
                                    dropDownSecondDiv.addClass('mkd-drop-down-start');
                                    dropDownSecondDiv.stop().css({'height': $(menu_items[i]).data('original_height')});
                                }, 150);
                            },
                            timeout: 150,
                            out: function() {
                                dropDownSecondDiv.stop().css({'height': '0px'});
                                dropDownSecondDiv.removeClass('mkd-drop-down-start');
                            }
                        };
                        $(menu_items[i]).hoverIntent(config);
                    }
                }
            }
        });
         $('.mkd-drop-down ul li.wide ul li a').on('click', function(e) {
            if (e.which == 1){
                var $this = $(this);
                setTimeout(function() {
                    $this.mouseleave();
                }, 500);
            }
        });

        mkd.menuDropdownHeightSet = true;
    }

    /**
     * Init Search Types
     */
    function mkdSearch() {

        var searchOpener = $('a.mkd-search-opener'),
            searchClose,
            searchForm,
            touch = false;

        if ( $('html').hasClass( 'touch' ) ) {
            touch = true;
        }

        if ( searchOpener.length > 0 ) {
            //Check for type of search
            if ( mkd.body.hasClass( 'mkd-fullscreen-search' ) ) {

                var fullscreenSearchFade = false,
                    fullscreenSearchFromCircle = false;

                searchClose = $( '.mkd-fullscreen-search-close' );

                if (mkd.body.hasClass('mkd-search-fade')) {
                    fullscreenSearchFade = true;
                } else if (mkd.body.hasClass('mkd-search-from-circle')) {
                    fullscreenSearchFromCircle = true;
                }
                mkdFullscreenSearch( fullscreenSearchFade, fullscreenSearchFromCircle );

            } else if ( mkd.body.hasClass( 'mkd-search-slides-from-window-top' ) ) {

                searchForm = $('.mkd-search-slide-window-top');
                searchClose = $('.mkd-search-close');
                mkdSearchWindowTop();

            } else if ( mkd.body.hasClass( 'mkd-search-slides-from-header-bottom' ) ) {

                mkdSearchHeaderBottom();

            } else if ( mkd.body.hasClass( 'mkd-search-covers-header' ) ) {

                mkdSearchCoversHeader();

            }

            //Check for hover color of search
            if(typeof searchOpener.data('hover-color') !== 'undefined') {
                var changeSearchColor = function(event) {
                    event.data.searchOpener.css('color', event.data.color);
                };

                var originalColor = searchOpener.css('color');
                var hoverColor = searchOpener.data('hover-color');

                searchOpener.on('mouseenter', { searchOpener: searchOpener, color: hoverColor }, changeSearchColor);
                searchOpener.on('mouseleave', { searchOpener: searchOpener, color: originalColor }, changeSearchColor);
            }

        }

        /**
         * Search slides from window top type of search
         */
        function mkdSearchWindowTop() {

            searchOpener.click( function(e) {
                e.preventDefault();

                var yPos = 0;
                if($('.title').hasClass('has_parallax_background')){
                    yPos = parseInt($('.title.has_parallax_background').css('backgroundPosition').split(" ")[1]);
                }

                if ( searchForm.height() == "0") {
                    $('.mkd-search-slide-window-top input[type="text"]').focus();
                    //Push header bottom
                    mkd.body.addClass('mkd-search-open');
                    $('.title.has_parallax_background').animate({
                        'background-position-y': (yPos + 50)+'px'
                    }, 150);
                } else {
                    mkd.body.removeClass('mkd-search-open');
                    $('.title.has_parallax_background').animate({
                        'background-position-y': (yPos - 50)+'px'
                    }, 150);
                }

                $(window).scroll(function() {
                    if ( searchForm.height() != '0' && mkd.scroll > 50 ) {
                        mkd.body.removeClass('mkd-search-open');
                        $('.title.has_parallax_background').css('backgroundPosition', 'center '+(yPos)+'px');
                    }
                });

                searchClose.click(function(e){
                    e.preventDefault();
                    mkd.body.removeClass('mkd-search-open');
                    $('.title.has_parallax_background').animate({
                        'background-position-y': (yPos)+'px'
                    }, 150);
                });

            });
        }

        /**
         * Search slides from header bottom type of search
         */
        function mkdSearchHeaderBottom() {

            var searchInput = $('.mkd-search-slide-header-bottom input[type="submit"]');

            searchOpener.click( function(e) {
                e.preventDefault();

                //If there is form openers in multiple widgets, only one search form should be opened
                if ( $(this).closest('.mkd-mobile-header').length > 0 ) {
                    //    Open form in mobile header
                    searchForm = $(this).closest('.mkd-mobile-header').children().children().first();
                } else if ( $(this).closest('.mkd-sticky-header').length > 0 ) {
                    //    Open form in sticky header
                    searchForm= $(this).closest('.mkd-sticky-header').children().first();
                } else {
                    //Open first form in header
                    searchForm = $('.mkd-search-slide-header-bottom').first();
                }

                if( searchForm.hasClass( 'mkd-animated' ) ) {
                    searchForm.removeClass('mkd-animated');
                } else {
                    searchForm.addClass('mkd-animated');
                }

                searchForm.addClass('mkd-disabled');
                searchInput.attr('disabled','mkd-disabled');
                if( ( $('.mkd-search-slide-header-bottom .mkd-search-field').val() !== '' ) && ( $('.mkd-search-slide-header-bottom .mkd-search-field').val() !== ' ' ) ) {
                    searchInput.removeAttr('mkd-disabled');
                    searchForm.removeClass('mkd-disabled');
                } else {
                    searchForm.addClass('mkd-disabled');
                    searchInput.attr('disabled','mkd-disabled');
                }

                $('.mkd-search-slide-header-bottom .mkd-search-field').keyup(function() {
                    if( ($(this).val() !== '' ) && ( $(this).val() != ' ') ) {
                        searchInput.removeAttr('mkd-disabled');
                        searchForm.removeClass('mkd-disabled');
                    }
                    else {
                        searchInput.attr('disabled','mkd-disabled');
                        searchForm.addClass('mkd-disabled');
                    }
                });

                $('.content, footer').click(function(e){
                    e.preventDefault();
                    searchForm.removeClass('mkd-animated');
                });

            });

            //Submit form
            if($('.mkd-search-submit').length) {
                $('.mkd-search-submit').click(function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    searchForm.submit();
                });
            }
        }

        /**
         * Search covers header type of search
         */
        function mkdSearchCoversHeader() {

            searchOpener.click( function(e) {
                e.preventDefault();
                var searchFormHeight,
                    searchFormHolder = $('.mkd-search-cover .mkd-form-holder-outer'),
                    searchForm,
                    searchFormLandmark; // there is one more div element if header is in grid

                if($(this).closest('.mkd-grid').length){
                    searchForm = $(this).closest('.mkd-grid').children().first();
                    searchFormLandmark = searchForm.parent();
                }
                else{
                    searchForm = $(this).closest('.mkd-menu-area').children().first();
                    searchFormLandmark = searchForm;
                }

                if ( $(this).closest('.mkd-sticky-header').length > 0 ) {
                    searchForm = $(this).closest('.mkd-sticky-header').children().first();
                }
                if ( $(this).closest('.mkd-mobile-header').length > 0 ) {
                    searchForm = $(this).closest('.mkd-mobile-header').children().children().first();
                }

                //Find search form position in header and height
                if ( searchFormLandmark.parent().hasClass('mkd-logo-area') ) {
                    searchFormHeight = mkdGlobalVars.vars.mkdLogoAreaHeight;
                } else if ( searchFormLandmark.parent().hasClass('mkd-top-bar') ) {
                    searchFormHeight = mkdGlobalVars.vars.mkdTopBarHeight;
                } else if ( searchFormLandmark.parent().hasClass('mkd-menu-area') ) {
                    searchFormHeight = mkdGlobalVars.vars.mkdMenuAreaHeight;
                } else if ( searchFormLandmark.hasClass('mkd-sticky-header') ) {
                    searchFormHeight = mkdGlobalVars.vars.mkdMenuAreaHeight;
                } else if ( searchFormLandmark.parent().hasClass('mkd-mobile-header') ) {
                    searchFormHeight = $('.mkd-mobile-header-inner').height();
                }

                searchFormHolder.height(searchFormHeight);
                searchForm.stop(true).fadeIn(600);
                $('.mkd-search-cover input[type="text"]').focus();
                $('.mkd-search-close, .content, footer').click(function(e){
                    e.preventDefault();
                    searchForm.stop(true).fadeOut(450);
                });
                searchForm.blur(function() {
                    searchForm.stop(true).fadeOut(450);
                });
            });

        }

        /**
         * Fullscreen search (two types: fade and from circle)
         */
        function mkdFullscreenSearch( fade, fromCircle ) {

            var searchHolder = $( '.mkd-fullscreen-search-holder'),
                searchOverlay = $( '.mkd-fullscreen-search-overlay' );

            searchOpener.click( function(e) {
                e.preventDefault();
                var samePosition = false;
                if ( $(this).data('icon-close-same-position') === 'yes' ) {
                    var closeTop = $(this).offset().top;
                    var closeLeft = $(this).offset().left;
                    samePosition = true;
                }
                //Fullscreen search fade
                if ( fade ) {
                    if ( searchHolder.hasClass( 'mkd-animate' ) ) {
                        mkd.body.removeClass('mkd-fullscreen-search-opened');
                        mkd.body.addClass( 'mkd-search-fade-out' );
                        mkd.body.removeClass( 'mkd-search-fade-in' );
                        searchHolder.removeClass( 'mkd-animate' );
                        if(!mkd.body.hasClass('page-template-full_screen-php')){
                            mkd.modules.common.mkdEnableScroll();
                        }
                    } else {
                        mkd.body.addClass('mkd-fullscreen-search-opened');
                        mkd.body.removeClass('mkd-search-fade-out');
                        mkd.body.addClass('mkd-search-fade-in');
                        searchHolder.addClass('mkd-animate');
                        if (samePosition) {
                            searchClose.css({
                                'top' : closeTop - mkd.scroll, // Distance from top of viewport ( distance from top of window - scroll distance )
                                'left' : closeLeft
                            });
                        }
                        if(!mkd.body.hasClass('page-template-full_screen-php')){
                            mkd.modules.common.mkdDisableScroll();
                        }
                    }
                    searchClose.click( function(e) {
                        e.preventDefault();
                        mkd.body.removeClass('mkd-fullscreen-search-opened');
                        searchHolder.removeClass('mkd-animate');
                        mkd.body.removeClass('mkd-search-fade-in');
                        mkd.body.addClass('mkd-search-fade-out');
                        if(!mkd.body.hasClass('page-template-full_screen-php')){
                            mkd.modules.common.mkdEnableScroll();
                        }
                    });
                    //Close on escape
                    $(document).keyup(function(e){
                        if (e.keyCode == 27 ) { //KeyCode for ESC button is 27
                            mkd.body.removeClass('mkd-fullscreen-search-opened');
                            searchHolder.removeClass('mkd-animate');
                            mkd.body.removeClass('mkd-search-fade-in');
                            mkd.body.addClass('mkd-search-fade-out');
                            if(!mkd.body.hasClass('page-template-full_screen-php')){
                                mkd.modules.common.mkdEnableScroll();
                            }
                        }
                    });
                }
                //Fullscreen search from circle
                if ( fromCircle ) {
                    if( searchOverlay.hasClass('mkd-animate') ) {
                        searchOverlay.removeClass('mkd-animate');
                        searchHolder.css({
                            'opacity': 0,
                            'display':'none'
                        });
                        searchClose.css({
                            'opacity' : 0,
                            'visibility' : 'hidden'
                        });
                        searchOpener.css({
                            'opacity': 1
                        });
                    } else {
                        searchOverlay.addClass('mkd-animate');
                        searchHolder.css({
                            'display':'block'
                        });
                        setTimeout(function(){
                            searchHolder.css('opacity','1');
                            searchClose.css({
                                'opacity' : 1,
                                'visibility' : 'visible',
                                'top' : closeTop - mkd.scroll, // Distance from top of viewport ( distance from top of window - scroll distance )
                                'left' : closeLeft
                            });
                            if (samePosition) {
                                searchClose.css({
                                    'top' : closeTop - mkd.scroll, // Distance from top of viewport ( distance from top of window - scroll distance )
                                    'left' : closeLeft
                                });
                            }
                            searchOpener.css({
                                'opacity' : 0
                            });
                        },200);
                        if(!mkd.body.hasClass('page-template-full_screen-php')){
                            mkd.modules.common.mkdDisableScroll();
                        }
                    }
                    searchClose.click(function(e) {
                        e.preventDefault();
                        searchOverlay.removeClass('mkd-animate');
                        searchHolder.css({
                            'opacity' : 0,
                            'display' : 'none'
                        });
                        searchClose.css({
                            'opacity':0,
                            'visibility' : 'hidden'
                        });
                        searchOpener.css({
                            'opacity' : 1
                        });
                        if(!mkd.body.hasClass('page-template-full_screen-php')){
                            mkd.modules.common.mkdEnableScroll();
                        }
                    });
                    //Close on escape
                    $(document).keyup(function(e){
                        if (e.keyCode == 27 ) { //KeyCode for ESC button is 27
                            searchOverlay.removeClass('mkd-animate');
                            searchHolder.css({
                                'opacity' : 0,
                                'display' : 'none'
                            });
                            searchClose.css({
                                'opacity':0,
                                'visibility' : 'hidden'
                            });
                            searchOpener.css({
                                'opacity' : 1
                            });
                            if(!mkd.body.hasClass('page-template-full_screen-php')){
                                mkd.modules.common.mkdEnableScroll();
                            }
                        }
                    });
                }
            });

            //Text input focus change
            $('.mkd-fullscreen-search-holder .mkd-search-field').focus(function(){
                $('.mkd-fullscreen-search-holder .mkd-field-holder .mkd-line').css("width","100%");
            });

            $('.mkd-fullscreen-search-holder .mkd-search-field').blur(function(){
                $('.mkd-fullscreen-search-holder .mkd-field-holder .mkd-line').css("width","0");
            });

        }

    }

    /**
     * Function object that represents vertical menu area.
     * @returns {{init: Function}}
     */
    var mkdVerticalMenu = function() {
        /**
         * Main vertical area object that used through out function
         * @type {jQuery object}
         */
        var verticalMenuObject = $('.mkd-vertical-menu-area');

        /**
         * Resizes vertical area. Called whenever height of navigation area changes
         * It first check if vertical area is scrollable, and if it is resizes scrollable area
         */
        //var resizeVerticalArea = function() {
        //    if(verticalAreaScrollable()) {
        //        verticalMenuObject.getNiceScroll().resize();
        //    }
        //};

        /**
         * Checks if vertical area is scrollable (if it has mkd-with-scroll class)
         *
         * @returns {bool}
         */
        //var verticalAreaScrollable = function() {
        //    return verticalMenuObject.hasClass('.mkd-with-scroll');
        //};

        /**
         * Initialzes navigation functionality. It checks navigation type data attribute and calls proper functions
         */
        var initNavigation = function() {
            var verticalNavObject = verticalMenuObject.find('.mkd-vertical-menu');
            var navigationType = typeof verticalNavObject.data('navigation-type') !== 'undefined' ? verticalNavObject.data('navigation-type') : '';

            switch(navigationType) {
                //case 'dropdown-toggle':
                //    dropdownHoverToggle();
                //    break;
                //case 'dropdown-toggle-click':
                //    dropdownClickToggle();
                //    break;
                //case 'float':
                //    dropdownFloat();
                //    break;
                //case 'slide-in':
                //    dropdownSlideIn();
                //    break;
                default:
                    dropdownFloat();
                    break;
            }

            /**
             * Initializes hover toggle navigation type. It has separate functionalities for touch and no-touch devices
             */
            //function dropdownHoverToggle() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //
            //    menuItems.each(function() {
            //        var elementToExpand = $(this).find(' > .second, > ul');
            //        var numberOfChildItems = elementToExpand.find(' > .inner > ul > li, > li').length;
            //
            //        var animSpeed = numberOfChildItems * 40;
            //        var animFunc = 'easeInOutSine';
            //        var that = this;
            //
            //        //touch devices functionality
            //        if(Modernizr.touch) {
            //            var dropdownOpener = $(this).find('> a');
            //
            //            dropdownOpener.on('click tap', function(e) {
            //                e.preventDefault();
            //                e.stopPropagation();
            //
            //                if(elementToExpand.is(':visible')) {
            //                    $(that).removeClass('open');
            //                    elementToExpand.slideUp(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                } else {
            //                    $(that).addClass('open');
            //                    elementToExpand.slideDown(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                }
            //            });
            //        } else {
            //            $(this).hover(function() {
            //                $(that).addClass('open');
            //                elementToExpand.slideDown(animSpeed, animFunc, function() {
            //                    resizeVerticalArea();
            //                });
            //            }, function() {
            //                setTimeout(function() {
            //                    $(that).removeClass('open');
            //                    elementToExpand.slideUp(animSpeed, animFunc, function() {
            //                        resizeVerticalArea();
            //                    });
            //                }, 1000);
            //            });
            //        }
            //    });
            //}

            /**
             * Initializes click toggle navigation type. Works the same for touch and no-touch devices
             */
            //function dropdownClickToggle() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //
            //    menuItems.each(function() {
            //        var elementToExpand = $(this).find(' > .second, > ul');
            //        var menuItem = this;
            //        var dropdownOpener = $(this).find('> a');
            //        var slideUpSpeed = 'fast';
            //        var slideDownSpeed = 'slow';
            //
            //        dropdownOpener.on('click tap', function(e) {
            //            e.preventDefault();
            //            e.stopPropagation();
            //
            //            if(elementToExpand.is(':visible')) {
            //                $(menuItem).removeClass('open');
            //                elementToExpand.slideUp(slideUpSpeed, function() {
            //                    resizeVerticalArea();
            //                });
            //            } else {
            //                if(!$(this).parents('li').hasClass('open')) {
            //                    menuItems.removeClass('open');
            //                    menuItems.find(' > .second, > ul').slideUp(slideUpSpeed);
            //                }
            //
            //                $(menuItem).addClass('open');
            //                elementToExpand.slideDown(slideDownSpeed, function() {
            //                    resizeVerticalArea();
            //                });
            //            }
            //        });
            //    });
            //}

            /**
             * Initializes floating navigation type (it comes from the side as a dropdown)
             */
            function dropdownFloat() {
                var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
                var allDropdowns = menuItems.find(' > .second, > ul');

                menuItems.each(function() {
                    var elementToExpand = $(this).find(' > .second, > ul');
                    var menuItem = this;

                    if(Modernizr.touch) {
                        var dropdownOpener = $(this).find('> a');

                        dropdownOpener.on('click tap', function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            if(elementToExpand.hasClass('mkd-float-open')) {
                                elementToExpand.removeClass('mkd-float-open');
                                $(menuItem).removeClass('open');
                            } else {
                                if(!$(this).parents('li').hasClass('open')) {
                                    menuItems.removeClass('open');
                                    allDropdowns.removeClass('mkd-float-open');
                                }

                                elementToExpand.addClass('mkd-float-open');
                                $(menuItem).addClass('open');
                            }
                        });
                    } else {
                        //must use hoverIntent because basic hover effect doesn't catch dropdown
                        //it doesn't start from menu item's edge
                        $(this).hoverIntent({
                            over: function() {
                                elementToExpand.addClass('mkd-float-open');
                                $(menuItem).addClass('open');
                            },
                            out: function() {
                                elementToExpand.removeClass('mkd-float-open');
                                $(menuItem).removeClass('open');
                            },
                            timeout: 300
                        });
                    }
                });
            }

            /**
             * Initializes slide in navigation type (dropdowns are coming on top of parent element and cover whole navigation area)
             */
            //function dropdownSlideIn() {
            //    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
            //    var menuItemsLinks = menuItems.find('> a');
            //
            //    menuItemsLinks.each(function() {
            //        var elementToExpand = $(this).next('.second, ul');
            //        appendToExpandableElement(elementToExpand, this);
            //
            //        if($(this).parent('li').is('.current-menu-ancestor', '.current_page_parent', '.current-menu-parent ')) {
            //            elementToExpand.addClass('mkd-vertical-slide-open');
            //        }
            //
            //        $(this).on('click tap', function(e) {
            //            e.preventDefault();
            //            e.stopPropagation();
            //
            //            menuItems.removeClass('open');
            //
            //            $(this).parent('li').addClass('open');
            //            elementToExpand.addClass('mkd-vertical-slide-open');
            //        });
            //    });
            //
            //    var previousLevelItems = menuItems.find('li.mkd-previous-level > a');
            //
            //    previousLevelItems.on('click tap', function(e) {
            //        e.preventDefault();
            //        e.stopPropagation();
            //
            //        menuItems.removeClass('open');
            //        $(this).parents('.mkd-vertical-slide-open').first().removeClass('mkd-vertical-slide-open');
            //    });
            //
            //    /**
            //     * Appends 'li' element as first element in dropdown, which will close current dropdown when clicked
            //     * @param {jQuery object} elementToExpand current dropdown to append element to
            //     * @param currentMenuItem
            //     */
            //    function appendToExpandableElement(elementToExpand, currentMenuItem) {
            //        var itemUrl = $(currentMenuItem).attr('href');
            //        var itemText = $(currentMenuItem).text();
            //
            //        var liItem = $('<li />', {class: 'mkd-previous-level'});
            //
            //        $('<a />', {
            //            'href': itemUrl,
            //            'html': '<i class="mkd-vertical-slide-arrow fa fa-angle-left"></i>' + itemText
            //        }).appendTo(liItem);
            //
            //        if(elementToExpand.hasClass('second')) {
            //            elementToExpand.find('> div > ul').prepend(liItem);
            //        } else {
            //            elementToExpand.prepend(liItem);
            //        }
            //    }
            //}
        };

        /**
         * Initializes scrolling in vertical area. It checks if vertical area is scrollable before doing so
         */
        //var initVerticalAreaScroll = function() {
        //    if(verticalAreaScrollable()) {
        //        verticalMenuObject.niceScroll({
        //            scrollspeed: 60,
        //            mousescrollstep: 40,
        //            cursorwidth: 0,
        //            cursorborder: 0,
        //            cursorborderradius: 0,
        //            cursorcolor: "transparent",
        //            autohidemode: false,
        //            horizrailenabled: false
        //        });
        //    }
        //};

        //var initHiddenVerticalArea = function() {
        //    var verticalLogo = $('.mkd-vertical-area-bottom-logo');
        //    var verticalMenuOpener = verticalMenuObject.find('.mkd-vertical-menu-hidden-button');
        //    var scrollPosition = 0;
        //
        //    verticalMenuOpener.on('click tap', function() {
        //        if(isVerticalAreaOpen()) {
        //            closeVerticalArea();
        //        } else {
        //            openVerticalArea();
        //        }
        //    });
        //
        //    //take click outside vertical left/right area and close it
        //    $j(verticalMenuObject).outclick({
        //        callback: function() {
        //            closeVerticalArea();
        //        }
        //    });
        //
        //    $(window).scroll(function() {
        //        if(Math.abs($(window).scrollTop() - scrollPosition) > 400){
        //            closeVerticalArea();
        //        }
        //    });
        //
        //    /**
        //     * Closes vertical menu area by removing 'active' class on that element
        //     */
        //    function closeVerticalArea() {
        //        verticalMenuObject.removeClass('active');
        //
        //        if(verticalLogo.length) {
        //            verticalLogo.removeClass('active');
        //        }
        //    }
        //
        //    /**
        //     * Opens vertical menu area by adding 'active' class on that element
        //     */
        //    function openVerticalArea() {
        //        verticalMenuObject.addClass('active');
        //
        //        if(verticalLogo.length) {
        //            verticalLogo.addClass('active');
        //        }
        //
        //        scrollPosition = $(window).scrollTop();
        //    }
        //
        //    function isVerticalAreaOpen() {
        //        return verticalMenuObject.hasClass('active');
        //    }
        //};

        return {
            /**
             * Calls all necessary functionality for vertical menu area if vertical area object is valid
             */
            init: function() {
                if(verticalMenuObject.length) {
                    initNavigation();
                    //initVerticalAreaScroll();
                    //
                    //if(mkd.body.hasClass('mkd-vertical-header-hidden')) {
                    //    initHiddenVerticalArea();
                    //}
                }
            }
        };
    };

})(jQuery);
(function($) {
    "use strict";

    var title = {};
    mkd.modules.title = title;

    title.mkdParallaxTitle = mkdParallaxTitle;

    title.mkdOnDocumentReady = mkdOnDocumentReady;
    title.mkdOnWindowLoad = mkdOnWindowLoad;
    title.mkdOnWindowResize = mkdOnWindowResize;
    title.mkdOnWindowScroll = mkdOnWindowScroll;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    $(window).scroll(mkdOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdOnDocumentReady() {
        mkdParallaxTitle();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdOnWindowLoad() {

    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function mkdOnWindowResize() {

    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdOnWindowScroll() {

    }
    

    /*
     **	Title image with parallax effect
     */
    function mkdParallaxTitle(){
        if($('.mkd-title.mkd-has-parallax-background').length > 0 && $('.touch').length === 0){

            var parallaxBackground = $('.mkd-title.mkd-has-parallax-background');
            var parallaxBackgroundWithZoomOut = $('.mkd-title.mkd-has-parallax-background.mkd-zoom-out');

            var backgroundSizeWidth = parseInt(parallaxBackground.data('background-width').match(/\d+/));
            var titleHolderHeight = parallaxBackground.data('height');
            var titleRate = (titleHolderHeight / 10000) * 7;
            var titleYPos = -(mkd.scroll * titleRate);

            //set position of background on doc ready
            parallaxBackground.css({'background-position': 'center '+ (titleYPos+mkdGlobalVars.vars.mkdAddForAdminBar) +'px' });
            parallaxBackgroundWithZoomOut.css({'background-size': backgroundSizeWidth-mkd.scroll + 'px auto'});

            //set position of background on window scroll
            $(window).scroll(function() {
                titleYPos = -(mkd.scroll * titleRate);
                parallaxBackground.css({'background-position': 'center ' + (titleYPos+mkdGlobalVars.vars.mkdAddForAdminBar) + 'px' });
                parallaxBackgroundWithZoomOut.css({'background-size': backgroundSizeWidth-mkd.scroll + 'px auto'});
            });

        }
    }

})(jQuery);

(function($) {
	'use strict';

	var shortcodes = {};

	mkd.modules.shortcodes = shortcodes;

	shortcodes.mkdInitCounter = mkdInitCounter;
	shortcodes.mkdInitProgressBars = mkdInitProgressBars;
	shortcodes.mkdInitCountdown = mkdInitCountdown;
	shortcodes.mkdInitMessages = mkdInitMessages;
	shortcodes.mkdInitMessageHeight = mkdInitMessageHeight;
	shortcodes.mkdInitTestimonials = mkdInitTestimonials;
	shortcodes.mkdInitCarousels = mkdInitCarousels;
	shortcodes.mkdInitPieChart = mkdInitPieChart;
	shortcodes.mkdInitPieChartDoughnut = mkdInitPieChartDoughnut;
	shortcodes.mkdInitTabs = mkdInitTabs;
	shortcodes.mkdInitTabIcons = mkdInitTabIcons;
	shortcodes.mkdInitBlogListMasonry = mkdInitBlogListMasonry;
	shortcodes.mkdCustomFontResize = mkdCustomFontResize;
	shortcodes.mkdInitImageGallery = mkdInitImageGallery;
	shortcodes.mkdInitAccordions = mkdInitAccordions;
	shortcodes.mkdShowGoogleMap = mkdShowGoogleMap;
	shortcodes.mkdInitPortfolio = mkdInitPortfolio;
	shortcodes.mkdInitPortfolioMarquee = mkdInitPortfolioMarquee;
	shortcodes.mkdInitPortfolioLoadMore = mkdInitPortfolioLoadMore;
	shortcodes.mkdCheckSliderForHeaderStyle = mkdCheckSliderForHeaderStyle;
	shortcodes.mkdInfoBox = mkdInfoBox;
	shortcodes.mkdPricingTables = mkdPricingTables;
	shortcodes.mkdProcess = mkdProcess;
	shortcodes.mkdTwitterSlider = mkdTwitterSlider;
	shortcodes.mkdComparisonPricingTables = mkdComparisonPricingTables;
	shortcodes.mkdIconProgressBar = mkdIconProgressBar;
	shortcodes.mkdBlogSlider = mkdBlogSlider;
	shortcodes.mkdInitMiniTextSlider = mkdInitMiniTextSlider;
	shortcodes.mkdInitTeamSlider = mkdInitTeamSlider;
	shortcodes.mkdInitCardSlider = mkdInitCardSlider;
	shortcodes.mkdOnDocumentReady = mkdOnDocumentReady;
	shortcodes.mkdOnWindowLoad = mkdOnWindowLoad;
	shortcodes.mkdOnWindowResize = mkdOnWindowResize;
	shortcodes.mkdOnWindowScroll = mkdOnWindowScroll;
	shortcodes.emptySpaceResponsive = emptySpaceResponsive;
	shortcodes.mkdBMICalcSelect2 = mkdBMICalcSelect2;
	shortcodes.mkdInitTabSlider = mkdInitTabSlider;
	shortcodes.mkdCoverBoxes = mkdCoverBoxes;
	shortcodes.mkdBookingForm = mkdBookingForm;

	$(document).ready(mkdOnDocumentReady);
	$(window).load(mkdOnWindowLoad);
	$(window).resize(mkdOnWindowResize);
	$(window).scroll(mkdOnWindowScroll);

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		mkdInitCounter();
		mkdInitProgressBars();
		mkdInitCountdown();
		mkdIcon().init();
		mkdInitMessages();
		mkdInitMessageHeight();
		mkdInitTestimonials();
		mkdInitCarousels();
		mkdInitPieChart();
		mkdInitPieChartDoughnut();
		mkdInitTabs();
		mkdInitTabIcons();
		mkdButton().init();
		mkdInitBlogListMasonry();
		mkdCustomFontResize();
		mkdInitImageGallery();
		mkdTwitterSlider();
		mkdBlogSlider();
		mkdInitAccordions();
		mkdShowGoogleMap();
		mkdInitPortfolio();
		mkdInitPortfolioMarquee();
		mkdInitPortfolioLoadMore();
		mkdSlider().init();
		mkdSocialIconWidget().init();
		mkdPricingTables();
		mkdProcess().init();
		mkdComparisonPricingTables().init();
		mkdIconProgressBar().init();
		emptySpaceResponsive().init();
		mkdInitMiniTextSlider();
		mkdInitTeamSlider();
		mkdInitCardSlider();
		mkdBMICalcSelect2();
		mkdInitTabSlider();
		mkdCoverBoxes.init();
		mkdBookingForm();
	}

	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdOnWindowLoad() {
		mkdInfoBox();
	}

	/*
	 All functions to be called on $(window).resize() should be in this function
	 */
	function mkdOnWindowResize() {
		mkdInitBlogListMasonry();
		mkdCustomFontResize();
		mkdCoverBoxes.handleSize();
	}

	/*
	 All functions to be called on $(window).scroll() should be in this function
	 */
	function mkdOnWindowScroll() {

	}


	/**
	 * Counter Shortcode
	 */
	function mkdInitCounter() {

		var counters = $('.mkd-counter');


		if(counters.length) {
			counters.each(function() {
				var counter = $(this);
				counter.appear(function() {
					counter.parent().addClass('mkd-counter-holder-show');

					//Counter zero type
					if(counter.hasClass('zero')) {
						var max = parseFloat(counter.text());
						counter.countTo({
							from: 0,
							to: max,
							speed: 1500,
							refreshInterval: 100
						});
					} else {
						counter.absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					}

				}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			});
		}

	}

	/*
	 **	Horizontal progress bars shortcode
	 */
	function mkdInitProgressBars() {

		var progressBar = $('.mkd-progress-bar');

		if(progressBar.length) {

			progressBar.each(function() {

				var thisBar = $(this);

				thisBar.appear(function() {
					mkdInitToCounterProgressBar(thisBar);
					if(thisBar.find('.mkd-floating.mkd-floating-inside') !== 0) {
						var floatingInsideMargin = thisBar.find('.mkd-progress-content').height();
						floatingInsideMargin += parseFloat(thisBar.find('.mkd-progress-title-holder').css('padding-bottom'));
						floatingInsideMargin += parseFloat(thisBar.find('.mkd-progress-title-holder').css('margin-bottom'));
						thisBar.find('.mkd-floating-inside').css('margin-bottom', -(floatingInsideMargin) + 'px');
					}
					var percentage = thisBar.find('.mkd-progress-content').data('percentage'),
						progressContent = thisBar.find('.mkd-progress-content'),
						progressNumber = thisBar.find('.mkd-progress-number');

					progressContent.css('width', '0%');
					progressContent.animate({'width': percentage + '%'}, 1500);
					progressNumber.css('left', '0%');
					progressNumber.animate({'left': percentage + '%'}, 1500);

				});
			});
		}
	}

	/*
	 **	Counter for horizontal progress bars percent from zero to defined percent
	 */
	function mkdInitToCounterProgressBar(progressBar) {
		var percentage = parseFloat(progressBar.find('.mkd-progress-content').data('percentage'));
		var percent = progressBar.find('.mkd-progress-number .mkd-percent');
		if(percent.length) {
			percent.each(function() {
				var thisPercent = $(this);
				thisPercent.parents('.mkd-progress-number-wrapper').css('opacity', '1');
				thisPercent.countTo({
					from: 0,
					to: percentage,
					speed: 1500,
					refreshInterval: 50
				});
			});
		}
	}

	/*
	 **	Function to close message shortcode
	 */
	function mkdInitMessages() {
		var message = $('.mkd-message');
		if(message.length) {
			message.each(function() {
				var thisMessage = $(this);
				thisMessage.find('.mkd-close').click(function(e) {
					e.preventDefault();
					$(this).parent().parent().fadeOut(500);
				});
			});
		}
	}

	/*
	 **	Init message height
	 */
	function mkdInitMessageHeight() {
		var message = $('.mkd-message.mkd-with-icon');
		if(message.length) {
			message.each(function() {
				var thisMessage = $(this);
				var textHolderHeight = thisMessage.find('.mkd-message-text-holder').height();
				var iconHolderHeight = thisMessage.find('.mkd-message-icon-holder').height();

				if(textHolderHeight > iconHolderHeight) {
					thisMessage.find('.mkd-message-icon-holder').height(textHolderHeight);
				} else {
					thisMessage.find('.mkd-message-text-holder').height(iconHolderHeight);
				}
			});
		}
	}

	/**
	 * Countdown Shortcode
	 */
	function mkdInitCountdown() {

		var countdowns = $('.mkd-countdown'),
			year,
			month,
			day,
			hour,
			minute,
			timezone,
			monthLabel,
			dayLabel,
			hourLabel,
			minuteLabel,
			secondLabel;

		if(countdowns.length) {

			countdowns.each(function() {

				//Find countdown elements by id-s
				var countdownId = $(this).attr('id'),
					countdown = $('#' + countdownId),
					digitFontSize,
					labelFontSize;

				//Get data for countdown
				year = countdown.data('year');
				month = countdown.data('month');
				day = countdown.data('day');
				hour = countdown.data('hour');
				minute = countdown.data('minute');
				timezone = countdown.data('timezone');
				monthLabel = countdown.data('month-label');
				dayLabel = countdown.data('day-label');
				hourLabel = countdown.data('hour-label');
				minuteLabel = countdown.data('minute-label');
				secondLabel = countdown.data('second-label');
				digitFontSize = countdown.data('digit-size');
				labelFontSize = countdown.data('label-size');


				//Initialize countdown
				countdown.countdown({
					until: new Date(year, month - 1, day, hour, minute, 44),
					labels: ['Years', monthLabel, 'Weeks', dayLabel, hourLabel, minuteLabel, secondLabel],
					format: 'ODHMS',
					timezone: timezone,
					padZeroes: true,
					onTick: setCountdownStyle
				});

				function setCountdownStyle() {
					countdown.find('.countdown-amount').css({
						'font-size': digitFontSize + 'px',
						'line-height': digitFontSize + 'px'
					});
					countdown.find('.countdown-period').css({
						'font-size': labelFontSize + 'px'
					});
				}

			});

		}

	}

	/**
	 * Object that represents icon shortcode
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdIcon = mkd.modules.shortcodes.mkdIcon = function() {
		//get all icons on page
		var icons = $('.mkd-icon-shortcode');

		/**
		 * Function that triggers icon animation and icon animation delay
		 */
		var iconAnimation = function(icon) {
			if(icon.hasClass('mkd-icon-animation')) {
				icon.appear(function() {
					icon.parent('.mkd-icon-animation-holder').addClass('mkd-icon-animation-show');
				}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			}
		};

		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};

				var iconElement = icon.find('.mkd-icon-element');
				var hoverColor = icon.data('hover-color');
				var originalColor = iconElement.css('color');

				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		};

		/**
		 * Function that triggers icon holder background color hover functionality
		 */
		var iconHolderBackgroundHover = function(icon) {
			if(typeof icon.data('hover-background-color') !== 'undefined') {
				var changeIconBgColor = function(event) {
					event.data.icon.css('background-color', event.data.color);
				};

				var hoverBackgroundColor = icon.data('hover-background-color');
				var originalBackgroundColor = icon.css('background-color');

				if(hoverBackgroundColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				}
			}
		};

		/**
		 * Function that initializes icon holder border hover functionality
		 */
		var iconHolderBorderHover = function(icon) {
			if(typeof icon.data('hover-border-color') !== 'undefined') {
				var changeIconBorder = function(event) {
					event.data.icon.css('border-color', event.data.color);
				};

				var hoverBorderColor = icon.data('hover-border-color');
				var originalBorderColor = icon.css('border-color');

				if(hoverBorderColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBorderColor}, changeIconBorder);
					icon.on('mouseleave', {icon: icon, color: originalBorderColor}, changeIconBorder);
				}
			}
		};

		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconAnimation($(this));
						iconHoverColor($(this));
						iconHolderBackgroundHover($(this));
						iconHolderBorderHover($(this));
					});

				}
			}
		};
	};

	/**
	 * Object that represents social icon widget
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdSocialIconWidget = mkd.modules.shortcodes.mkdSocialIconWidget = function() {
		//get all social icons on page
		var icons = $('.mkd-social-icon-widget-holder');

		/**
		 * Function that triggers icon hover color functionality
		 */
		var socialIconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};

				var iconElement = icon;
				var hoverColor = icon.data('hover-color');
				var originalColor = iconElement.css('color');

				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		};

		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						socialIconHoverColor($(this));
					});

				}
			}
		};
	};

	/**
	 * Init testimonials shortcode
	 */
	function mkdInitTestimonials() {

		var testimonial = $('.mkd-testimonials.testimonials-slider');
		if(testimonial.length) {
			testimonial.each(function() {

				var thisTestimonial = $(this);

				thisTestimonial.appear(function() {
					thisTestimonial.css('visibility', 'visible');
				}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});

				var interval = 5000;
				var controlNav = false;
				var directionNav = true;
				var animationSpeed = 750;
				if(typeof thisTestimonial.data('animation-speed') !== 'undefined' && thisTestimonial.data('animation-speed') !== false) {
					animationSpeed = thisTestimonial.data('animation-speed');
				}

				//var iconClasses = getIconClassesForNavigation(directionNavArrowsTestimonials); TODO

				thisTestimonial.owlCarousel({
					singleItem: true,
					autoPlay: interval,
					navigation: false,
					// transitionStyle: 'fade', //fade, fadeUp, backSlide, goDown
					autoHeight: true,
					pagination: controlNav,
					slideSpeed: animationSpeed,
					addClassActive: true
				});

			});

		}

	}

	/**
	 * Init Carousel shortcode
	 */
	function mkdInitCarousels() {

		var carouselHolders = $('.mkd-carousel-holder'),
			carousel,
			numberOfItems;

		if(carouselHolders.length) {
			carouselHolders.each(function() {
				carousel = $(this).children('.mkd-carousel');
				numberOfItems = carousel.data('items');

				//Responsive breakpoints
				var items = [
					[0, 1],
					[480, 2],
					[600, 3],
					[768, 4],
					[1024, 5],
					[1280, 6]
				];
				var newItems = [];
				for(var i = 0; i < items.length; i++) {
					if(items[i][1] <= numberOfItems) {
						newItems.push(items[i]);
					}
					else {
						break;
					}
				}

				var showNav = carousel.data('navigation');

				if(typeof showNav !== 'undefined') {
					showNav = showNav === 'yes';
				} else {
					showNav = false;
				}

				carousel.owlCarousel({
					autoPlay: 4000,
					items: numberOfItems,
					itemsCustom: newItems,
					pagination: showNav,
					slideSpeed: 450,
					stopOnHover: true,
					afterInit: function() {
						carousel.css('visibility','visible');
					}
				});

			});
		}

	}

	function mkdTwitterSlider() {
		var twitterSliders = $('.mkd-twitter-slider-inner:not(.slick-initialized)');

		if(twitterSliders.length) {
			twitterSliders.each(function() {

				$(this).slick({
					centerMode: true,
					slidesToShow: 1,
					autoplay: true,
					arrows: false,
					centerPadding: '0px',
					dots: false,
					speed: 750,
					cssEase: 'cubic-bezier(.19,1,.22,1)',
					swipeToSlide: true,
				});
			});
		}
	}

	/**
	 * Init Pie Chart and Pie Chart With Icon shortcode
	 */
	function mkdInitPieChart() {

		var pieCharts = $('.mkd-pie-chart-holder, .mkd-pie-chart-with-icon-holder');

		if(pieCharts.length) {

			pieCharts.each(function() {

				var pieChart = $(this),
					percentageHolder = pieChart.children('.mkd-percentage, .mkd-percentage-with-icon'),
					barColor,
					trackColor,
					lineWidth,
					size = 155;

				if(typeof percentageHolder.data('size') !== 'undefined' && percentageHolder.data('size') !== '') {
					size = percentageHolder.data('size');
				}

				if(typeof pieChart.data('bar-color') !== 'undefined' && pieChart.data('bar-color') !== '') {
					barColor = pieChart.data('bar-color');
				}

				if(typeof pieChart.data('track-color') !== 'undefined' && pieChart.data('track-color') !== '') {
					trackColor = pieChart.data('track-color');
				}

				percentageHolder.appear(function() {
					initToCounterPieChart(pieChart);
					percentageHolder.css('opacity', '1');

					percentageHolder.easyPieChart({
						barColor: barColor,
						trackColor: trackColor,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: 6,
						animate: 1500,
						size: size
					});
				}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});

			});

		}

	}

	/*
	 **	Counter for pie chart number from zero to defined number
	 */
	function initToCounterPieChart(pieChart) {

		pieChart.css('opacity', '1');
		var counter = pieChart.find('.mkd-to-counter'),
			max = parseFloat(counter.text());
		counter.countTo({
			from: 0,
			to: max,
			speed: 1500,
			refreshInterval: 50
		});

	}

	/**
	 * Init Pie Chart shortcode
	 */
	function mkdInitPieChartDoughnut() {

		var pieCharts = $('.mkd-pie-chart-doughnut-holder, .mkd-pie-chart-pie-holder');

		pieCharts.each(function() {

			var pieChart = $(this),
				canvas = pieChart.find('canvas'),
				chartID = canvas.attr('id'),
				chart = document.getElementById(chartID).getContext('2d'),
				data = [],
				jqChart = $(chart.canvas); //Convert canvas to JQuery object and get data parameters

			for(var i = 1; i <= 10; i++) {

				var chartItem,
					value = jqChart.data('value-' + i),
					color = jqChart.data('color-' + i);

				if(typeof value !== 'undefined' && typeof color !== 'undefined') {
					chartItem = {
						value: value,
						color: color
					};
					data.push(chartItem);
				}

			}

			if(canvas.hasClass('mkd-pie')) {
				new Chart(chart).Pie(data,
					{segmentStrokeColor: 'transparent'}
				);
			} else {
				new Chart(chart).Doughnut(data,
					{segmentStrokeColor: 'transparent'}
				);
			}

		});

	}

	/**
	 * Tab Slider
	 */
	function mkdInitTabSlider() {
		var tabSliders = $('.mkd-tab-slider-holder');

		if(tabSliders.length) {
			tabSliders.each(function() {
				var sliderNav = $(this).children('.mkd-tab-slider-nav');
				var sliderCont = $(this).children('.mkd-tab-slider-container');

				sliderCont.find('.mkd-tab-slider-item').each(function(i) {
					var item = $(this);
					var icon = '';
					var customIcon = '';
					if(typeof item.data('icon-html') !== 'undefined' || item.data('icon-html') !== 'false') {
						icon = item.data('icon-html');
					}
					if(typeof item.data('custom-icon-url') !== 'undefined' && item.data('custom-icon-url') !== '') {
						customIcon = '<img class="mkd-tab-slider-icon-image" alt="mkd-tab-slider-icon" src="' + item.data('custom-icon-url') + '">';
					}

					var tabNav = sliderNav.children('.mkd-tab-slider-nav-item').eq(i);

					if(typeof(tabNav) !== 'undefined') {
						var cont = customIcon != '' ? customIcon : icon;
						tabNav.find('.mkd-tab-slider-nav-icon').html(cont);
					}

				});

				sliderCont.flexslider({
					animation: 'slide',
					manualControls: '.mkd-tab-slider-nav .mkd-tab-slider-nav-item',
					selector: '.mkd-tab-slider-container-inner li',
					directionNav: false
				});
			});
		}
	}

	/*
	 **	Init tabs shortcode
	 */
	function mkdInitTabs() {

		var tabs = $('.mkd-tabs');
		if(tabs.length) {
			tabs.each(function() {
				var thisTabs = $(this);

				thisTabs.waitForImages(function(){
					thisTabs.css('visibility', 'visible');
				});

				thisTabs.children('.mkd-tab-container').each(function(index) {
					index = index + 1;
					var that = $(this),
						link = that.attr('id'),
						navItem = that.parent().find('.mkd-tabs-nav li:nth-child(' + index + ') a'),
						navLink = navItem.attr('href');

					link = '#' + link;

					if(link.indexOf(navLink) > -1) {
						navItem.attr('href', link);
					}
				});

				if(thisTabs.hasClass('mkd-horizontal')) {
					thisTabs.tabs();
				}
				else if(thisTabs.hasClass('mkd-vertical')) {
					thisTabs.tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
					thisTabs.find('.mkd-tabs-nav > ul >li').removeClass('ui-corner-top').addClass('ui-corner-left');
				}

				//animated tabs
				if (thisTabs.hasClass('mkd-animated-tabs')) {
					
					var tabContent = thisTabs.find('.mkd-tab-container');

					thisTabs.appear(function(){
						setTimeout(function(){
							tabContent.eq(0).addClass('mkd-appeared');
						},10);
					}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});

					thisTabs.find('li').each(function(){
						var thisTab = $(this);
							
						thisTab.on('click', function(){
							tabContent.removeClass('mkd-appeared');

							setTimeout(function(){
								tabContent.filter(':visible').addClass('mkd-appeared');
							}, 10);
						});
					});
				}
			});
		}
	}

	/*
	 **	Generate icons in tabs navigation
	 */
	function mkdInitTabIcons() {

		var tabContent = $('.mkd-tab-container');
		if(tabContent.length) {

			tabContent.each(function() {
				var thisTabContent = $(this);

				var id = thisTabContent.attr('id');
				var icon = '';
				if(typeof thisTabContent.data('icon-html') !== 'undefined' || thisTabContent.data('icon-html') !== 'false') {
					icon = thisTabContent.data('icon-html');
				}

				var tabNav = thisTabContent.parents('.mkd-tabs').find('.mkd-tabs-nav > li > a[href="#' + id + '"]');

				if(typeof(tabNav) !== 'undefined') {
					tabNav.children('.mkd-icon-frame').append(icon);
				}
			});
		}
	}

	/**
	 * Button object that initializes whole button functionality
	 * @type {Function}
	 */
	var mkdButton = mkd.modules.shortcodes.mkdButton = function() {
		//all buttons on the page
		var buttons = $('.mkd-btn');

		/**
		 * Initializes button hover color
		 * @param button current button
		 */
		var buttonHoverColor = function(button) {
			if(typeof button.data('hover-color') !== 'undefined') {
				var changeButtonColor = function(event) {
					event.data.button.css('color', event.data.color);
				};

				var originalColor = button.css('color');
				var hoverColor = button.data('hover-color');

				button.on('mouseenter', {button: button, color: hoverColor}, changeButtonColor);
				button.on('mouseleave', {button: button, color: originalColor}, changeButtonColor);
			}
		};


		/**
		 * Initializes button hover background color
		 * @param button current button
		 */
		var buttonHoverBgColor = function(button) {
			if(typeof button.data('hover-bg-color') !== 'undefined') {
				var changeButtonBg = function(event) {
					event.data.button.css('background-color', event.data.color);
				};

				var originalBgColor = button.css('background-color');
				var hoverBgColor = button.data('hover-bg-color');

				button.on('mouseenter', {button: button, color: hoverBgColor}, changeButtonBg);
				button.on('mouseleave', {button: button, color: originalBgColor}, changeButtonBg);
			}
		};

		/**
		 * Initializes button border color
		 * @param button
		 */
		var buttonHoverBorderColor = function(button) {
			if(typeof button.data('hover-border-color') !== 'undefined') {
				var changeBorderColor = function(event) {
					event.data.button.css('border-color', event.data.color);
				};

				var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
				var hoverBorderColor = button.data('hover-border-color');

				button.on('mouseenter', {button: button, color: hoverBorderColor}, changeBorderColor);
				button.on('mouseleave', {button: button, color: originalBorderColor}, changeBorderColor);
			}
		};

		return {
			init: function() {
				if(buttons.length) {
					buttons.each(function() {
						buttonHoverColor($(this));
						buttonHoverBgColor($(this));
						buttonHoverBorderColor($(this));
					});
				}
			}
		};
	};

	/*
	 **	Init blog list masonry type
	 */
	function mkdInitBlogListMasonry() {
		var blogList = $('.mkd-blog-list-holder.mkd-masonry .mkd-blog-list');
		if(blogList.length) {
			blogList.each(function() {
				var thisBlogList = $(this);
				thisBlogList.animate({opacity: 1});
				thisBlogList.isotope({
					itemSelector: '.mkd-blog-list-masonry-item',
					masonry: {
						columnWidth: '.mkd-blog-list-masonry-grid-sizer',
						gutter: '.mkd-blog-list-masonry-grid-gutter'
					}
				});
			});

		}
	}

	/*
	 **	Custom Font resizing
	 */
	function mkdCustomFontResize() {
		var customFont = $('.mkd-custom-font-holder');
		if(customFont.length) {
			customFont.each(function() {
				var thisCustomFont = $(this);
				var fontSize;
				var lineHeight;
				var coef1 = 1;
				var coef2 = 1;

				if(mkd.windowWidth < 1200) {
					coef1 = 0.8;
				}

				if(mkd.windowWidth < 1000) {
					coef1 = 0.7;
				}

				if(mkd.windowWidth < 768) {
					coef1 = 0.6;
					coef2 = 0.7;
				}

				if(mkd.windowWidth < 600) {
					coef1 = 0.5;
					coef2 = 0.6;
				}

				if(mkd.windowWidth < 480) {
					coef1 = 0.4;
					coef2 = 0.5;
				}

				if(typeof thisCustomFont.data('font-size') !== 'undefined' && thisCustomFont.data('font-size') !== false) {
					fontSize = parseInt(thisCustomFont.data('font-size'));

					if(fontSize > 70) {
						fontSize = Math.round(fontSize * coef1);
					}
					else if(fontSize > 35) {
						fontSize = Math.round(fontSize * coef2);
					}

					thisCustomFont.css('font-size', fontSize + 'px');
				}

				if(typeof thisCustomFont.data('line-height') !== 'undefined' && thisCustomFont.data('line-height') !== false) {
					lineHeight = parseInt(thisCustomFont.data('line-height'));

					if(lineHeight > 70 && mkd.windowWidth < 1200) {
						lineHeight = '1.2em';
					}
					else if(lineHeight > 35 && mkd.windowWidth < 768) {
						lineHeight = '1.2em';
					}
					else {
						lineHeight += 'px';
					}

					thisCustomFont.css('line-height', lineHeight);
				}
			});
		}
	}

	/*
	 **	Show Google Map
	 */
	function mkdShowGoogleMap() {

		if($('.mkd-google-map').length) {
			$('.mkd-google-map').each(function() {

				var element = $(this);

				var customMapStyle;
				if(typeof element.data('custom-map-style') !== 'undefined') {
					customMapStyle = element.data('custom-map-style');
				}

				var colorOverlay;
				if(typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
					colorOverlay = element.data('color-overlay');
				}

				var saturation;
				if(typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
					saturation = element.data('saturation');
				}

				var lightness;
				if(typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
					lightness = element.data('lightness');
				}

				var zoom;
				if(typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
					zoom = element.data('zoom');
				}

				var pin;
				if(typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
					pin = element.data('pin');
				}

				var mapHeight;
				if(typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
					mapHeight = element.data('height');
				}

				var uniqueId;
				if(typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
					uniqueId = element.data('unique-id');
				}

				var scrollWheel;
				if(typeof element.data('scroll-wheel') !== 'undefined') {
					scrollWheel = element.data('scroll-wheel');
				}
				var addresses;
				if(typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
					addresses = element.data('addresses');
				}

				var map = "map_" + uniqueId;
				var geocoder = "geocoder_" + uniqueId;
				var holderId = "mkd-map-" + uniqueId;

				mkdInitializeGoogleMap(customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin, map, geocoder, addresses);
			});
		}

	}

	/*
	 **	Init Google Map
	 */
	function mkdInitializeGoogleMap(customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin, map, geocoder, data) {

		var mapStyles = [
			{
				stylers: [
					{hue: color},
					{saturation: saturation},
					{lightness: lightness},
					{gamma: 1}
				]
			}
		];

		var googleMapStyleId;

		if(customMapStyle) {
			googleMapStyleId = 'mkd-style';
		} else {
			googleMapStyleId = google.maps.MapTypeId.ROADMAP;
		}

		var qoogleMapType = new google.maps.StyledMapType(mapStyles,
			{name: "Mikado Google Map"});

		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-34.397, 150.644);

		if(!isNaN(height)) {
			height = height + 'px';
		}

		var myOptions = {

			zoom: zoom,
			scrollwheel: wheel,
			center: latlng,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false,
			scaleControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: false,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'mkd-style'],
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeId: googleMapStyleId
		};

		map = new google.maps.Map(document.getElementById(holderId), myOptions);
		map.mapTypes.set('mkd-style', qoogleMapType);

		var index;

		for(index = 0; index < data.length; ++index) {
			mkdInitializeGoogleAddress(data[index], pin, map, geocoder);
		}

		var holderElement = document.getElementById(holderId);
		holderElement.style.height = height;
	}

	/*
	 **	Init Google Map Addresses
	 */
	function mkdInitializeGoogleAddress(data, pin, map, geocoder) {
		if(data === '')
			return;
		var contentString = '<div id="content">' +
			'<div id="siteNotice">' +
			'</div>' +
			'<div id="bodyContent">' +
			'<p>' + data + '</p>' +
			'</div>' +
			'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		geocoder.geocode({'address': data}, function(results, status) {
			if(status === google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon: pin,
					title: data['store_title']
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});

				google.maps.event.addDomListener(window, 'resize', function() {
					map.setCenter(results[0].geometry.location);
				});

			}
		});
	}

	function mkdInitAccordions() {
		var accordion = $('.mkd-accordion-holder');
		if(accordion.length) {
			accordion.each(function() {

				var thisAccordion = $(this);

				if(thisAccordion.hasClass('mkd-accordion')) {

					thisAccordion.accordion({
						animate: "swing",
						collapsible: false,
						active: 0,
						icons: "",
						heightStyle: "content"
					});
				}

				if(thisAccordion.hasClass('mkd-toggle')) {

					var toggleAccordion = $(this);
					var toggleAccordionTitle = toggleAccordion.find('.mkd-title-holder');
					var toggleAccordionContent = toggleAccordionTitle.next();

					toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
					toggleAccordionTitle.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom");
					toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

					toggleAccordionTitle.each(function() {
						var thisTitle = $(this);
						thisTitle.hover(function() {
							thisTitle.toggleClass("ui-state-hover");
						});

						thisTitle.on('click', function() {
							thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
							thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
						});
					});
				}
			});
		}
	}

	function mkdInitImageGallery() {

		var galleries = $('.mkd-image-gallery');

		if(galleries.length) {
			galleries.each(function() {
				var gallery = $(this).children('.mkd-image-gallery-slider'),
					autoplay = gallery.data('autoplay'),
					animation = (gallery.data('animation') == 'slide') ? false : gallery.data('animation'),
					navigation = (gallery.data('navigation') == 'yes'),
					pagination = (gallery.data('pagination') == 'yes');

				gallery.owlCarousel({
					singleItem: true,
					autoPlay: autoplay * 1000,
					navigation: navigation,
					transitionStyle: animation, //fade, fadeUp, backSlide, goDown
					autoHeight: true,
					pagination: pagination,
					slideSpeed: 450,
					stopOnHover: true,
					navigationText: [
						'<span class="mkd-prev-icon"><i class="fa fa-angle-left"></i></span>',
						'<span class="mkd-next-icon"><i class="fa fa-angle-right"></i></span>'
					]
				});
			});
		}

	}

	/**
	 * Initializes portfolio list
	 */
	function mkdInitPortfolio() {
		var portList = $('.mkd-portfolio-list-holder-outer.mkd-ptf-standard, .mkd-portfolio-list-holder-outer.mkd-ptf-gallery');
		if(portList.length) {
			portList.each(function() {
				var thisPortList = $(this);
				mkdInitPortMixItUp(thisPortList);
			});
		}
	}

	/**
	 * Initializes portfolio marquee
	 */
	function mkdInitPortfolioMarquee() {
		var ptfm = $('.mkd-portfolio-marquee');

		if(ptfm.length) {
			ptfm.each(function() {
				var numberOfItems = $(this).data('columns');
				var customColumns = [
					[0, 1],
					[480, 2],
					[768, 3],
					[1024, 4],
					[1400, 5]
				];
				var newCols = [];
				for(var i = 0; i < customColumns.length; i++) {
					if(numberOfItems > i) newCols.push(customColumns[i]);
					else break;
				}

				var autoplay = $(this).data('autoplay') === 'disable' ? false : $(this).data('autoplay');
				var ptfmSlider = $(this).children('.mkd-portfolio-marquee-inner');

				ptfmSlider.owlCarousel({
					items: numberOfItems,
					autoPlay: autoplay * 1000,
					navigation: false,
					autoHeight: true,
					pagination: false,
					slideSpeed: 450,
					itemsCustom: newCols,
					stopOnHover: true,
					afterInit: function() {
						ptfmSlider.css('visibility','visible');
					}
				});
			});
		}
	}

	/**
	 * Initializes mixItUp function for specific container
	 */
	function mkdInitPortMixItUp(container) {
		var filterClass = '';
		if(container.hasClass('mkd-ptf-has-filter')) {
			filterClass = container.find('.mkd-portfolio-filter-holder-inner ul li').data('class');
			filterClass = '.' + filterClass;
		}

		var holderInner = container.find('.mkd-portfolio-list-holder');
		holderInner.mixItUp({
			callbacks: {
				onMixLoad: function() {
					holderInner.find('article').css('visibility', 'visible');
				},
				onMixStart: function() {
					holderInner.find('article').css('visibility', 'visible');
				},
				onMixBusy: function() {
					holderInner.find('article').css('visibility', 'visible');
				}
			},
			selectors: {
				filter: filterClass
			},
			animation: {
				effects: 'fade',
				duration: 400
			}
		});

	}

	/**
	 * Initializes portfolio load more function
	 */
	function mkdInitPortfolioLoadMore() {
		var portList = $('.mkd-portfolio-list-holder-outer.mkd-ptf-load-more');
		if(portList.length) {
			portList.each(function() {

				var thisPortList = $(this);
				var thisPortListInner = thisPortList.find('.mkd-portfolio-list-holder');
				var nextPage;
				var maxNumPages;
				var loadMoreButton = thisPortList.find('.mkd-ptf-list-load-more a');

				if(typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
					maxNumPages = thisPortList.data('max-num-pages');
				}

				loadMoreButton.on('click', function(e) {
					var loadMoreDatta = mkdGetPortfolioAjaxData(thisPortList);
					nextPage = loadMoreDatta.nextPage;
					e.preventDefault();
					e.stopPropagation();
					if(nextPage <= maxNumPages) {
						var ajaxData = mkdSetPortfolioAjaxData(loadMoreDatta);
						$.ajax({
							type: 'POST',
							data: ajaxData,
							url: mkdCoreAjaxUrl,
							success: function(data) {
								nextPage++;
								thisPortList.data('next-page', nextPage);
								var response = $.parseJSON(data);
								var responseHtml = mkdConvertHTML(response.html); //convert response html into jQuery collection that Mixitup can work with
								thisPortList.waitForImages(function() {
									setTimeout(function() {
										thisPortListInner.mixItUp('append', responseHtml);
									}, 400);
								});
							}
						});
					}
					if(nextPage === maxNumPages) {
						loadMoreButton.hide();
					}
				});

			});
		}
	}

	function mkdConvertHTML(html) {
		var newHtml = $.trim(html),
			$html = $(newHtml),
			$empty = $();

		$html.each(function(index, value) {
			if(value.nodeType === 1) {
				$empty = $empty.add(this);
			}
		});

		return $empty;
	}

	/**
	 * Initializes portfolio load more data params
	 * @param portfolio list container with defined data params
	 * return array
	 */
	function mkdGetPortfolioAjaxData(container) {
		var returnValue = {};

		returnValue.type = '';
		returnValue.columns = '';
		returnValue.gridSize = '';
		returnValue.orderBy = '';
		returnValue.order = '';
		returnValue.number = '';
		returnValue.imageSize = '';
		returnValue.customImageDimensions = '';
		returnValue.filter = '';
		returnValue.filterOrderBy = '';
		returnValue.category = '';
		returnValue.selectedProjectes = '';
		returnValue.showLoadMore = '';
		returnValue.titleTag = '';
		returnValue.nextPage = '';
		returnValue.maxNumPages = '';
		returnValue.showExcerpt = '';

		if(typeof container.data('type') !== 'undefined' && container.data('type') !== false) {
			returnValue.type = container.data('type');
		}

		if(typeof container.data('grid-size') !== 'undefined' && container.data('grid-size') !== false) {
			returnValue.gridSize = container.data('grid-size');
		}

		if(typeof container.data('columns') !== 'undefined' && container.data('columns') !== false) {
			returnValue.columns = container.data('columns');
		}

		if(typeof container.data('order-by') !== 'undefined' && container.data('order-by') !== false) {
			returnValue.orderBy = container.data('order-by');
		}

		if(typeof container.data('order') !== 'undefined' && container.data('order') !== false) {
			returnValue.order = container.data('order');
		}

		if(typeof container.data('number') !== 'undefined' && container.data('number') !== false) {
			returnValue.number = container.data('number');
		}

		if(typeof container.data('image-size') !== 'undefined' && container.data('image-size') !== false) {
			returnValue.imageSize = container.data('image-size');
		}

		if(typeof container.data('custom-image-dimensions') !== 'undefined' && container.data('custom-image-dimensions') !== false) {
			returnValue.customImageDimensions = container.data('custom-image-dimensions');
		}

		if(typeof container.data('filter') !== 'undefined' && container.data('filter') !== false) {
			returnValue.filter = container.data('filter');
		}

		if(typeof container.data('filter-order-by') !== 'undefined' && container.data('filter-order-by') !== false) {
			returnValue.filterOrderBy = container.data('filter-order-by');
		}

		if(typeof container.data('category') !== 'undefined' && container.data('category') !== false) {
			returnValue.category = container.data('category');
		}

		if(typeof container.data('selected-projects') !== 'undefined' && container.data('selected-projects') !== false) {
			returnValue.selectedProjectes = container.data('selected-projects');
		}

		if(typeof container.data('show-load-more') !== 'undefined' && container.data('show-load-more') !== false) {
			returnValue.showLoadMore = container.data('show-load-more');
		}

		if(typeof container.data('title-tag') !== 'undefined' && container.data('title-tag') !== false) {
			returnValue.titleTag = container.data('title-tag');
		}

		if(typeof container.data('next-page') !== 'undefined' && container.data('next-page') !== false) {
			returnValue.nextPage = container.data('next-page');
		}

		if(typeof container.data('max-num-pages') !== 'undefined' && container.data('max-num-pages') !== false) {
			returnValue.maxNumPages = container.data('max-num-pages');
		}

		if(typeof container.data('show-excerpt') !== 'undefined' && container.data('show-excerpt') !== false) {
			returnValue.showExcerpt = container.data('show-excerpt');
		}

		return returnValue;
	}

	/**
	 * Sets portfolio load more data params for ajax function
	 * @param portfolio list container with defined data params
	 * return array
	 */
	function mkdSetPortfolioAjaxData(container) {
		var returnValue = {
			action: 'mkd_core_portfolio_ajax_load_more',
			type: container.type,
			columns: container.columns,
			gridSize: container.gridSize,
			orderBy: container.orderBy,
			order: container.order,
			number: container.number,
			imageSize: container.imageSize,
			customImageDimensions: container.customImageDimensions,
			filter: container.filter,
			filterOrderBy: container.filterOrderBy,
			category: container.category,
			selectedProjectes: container.selectedProjectes,
			showLoadMore: container.showLoadMore,
			titleTag: container.titleTag,
			nextPage: container.nextPage,
			showExcerpt: container.showExcerpt
		};
		return returnValue;
	}

	/**
	 * Slider object that initializes whole slider functionality
	 * @type {Function}
	 */
	var mkdSlider = mkd.modules.shortcodes.mkdSlider = function() {

		//all sliders on the page
		var sliders = $('.mkd-slider .carousel');
		//image regex used to extract img source
		var imageRegex = /url\(["']?([^'")]+)['"]?\)/;
		//default responsive breakpoints set
		var responsiveBreakpointSet = [1600, 1200, 900, 650, 500, 320];
		//var init for coefficiens array
		var coefficientsGraphicArray;
		var coefficientsTitleArray;
		var coefficientsSubtitleArray;
		var coefficientsTextArray;
		var coefficientsButtonArray;
		//var init for slider elements responsive coefficients
		var sliderGraphicCoefficient;
		var sliderTitleCoefficient;
		var sliderSubtitleCoefficient;
		var sliderTextCoefficient;
		var sliderButtonCoefficient;
		var sliderTitleCoefficientLetterSpacing;
		var sliderSubtitleCoefficientLetterSpacing;
		var sliderTextCoefficientLetterSpacing;

		/*** Functionality for translating image in slide - START ***/

		var matrixArray = {
			zoom_center: '1.2, 0, 0, 1.2, 0, 0',
			zoom_top_left: '1.2, 0, 0, 1.2, -150, -150',
			zoom_top_right: '1.2, 0, 0, 1.2, 150, -150',
			zoom_bottom_left: '1.2, 0, 0, 1.2, -150, 150',
			zoom_bottom_right: '1.2, 0, 0, 1.2, 150, 150'
		};

		// regular expression for parsing out the matrix components from the matrix string
		var matrixRE = /\([0-9epx\.\, \t\-]+/gi;

		// parses a matrix string of the form "matrix(n1,n2,n3,n4,n5,n6)" and
		// returns an array with the matrix components
		var parseMatrix = function(val) {
			return val.match(matrixRE)[0].substr(1).split(",").map(function(s) {
				return parseFloat(s);
			});
		};

		// transform css property names with vendor prefixes;
		// the plugin will check for values in the order the names are listed here and return as soon as there
		// is a value; so listing the W3 std name for the transform results in that being used if its available
		var transformPropNames = [
			"transform",
			"-webkit-transform"
		];

		var getTransformMatrix = function(el) {
			// iterate through the css3 identifiers till we hit one that yields a value
			var matrix = null;
			transformPropNames.some(function(prop) {
				matrix = el.css(prop);
				return (matrix !== null && matrix !== "");
			});

			// if "none" then we supplant it with an identity matrix so that our parsing code below doesn't break
			matrix = (!matrix || matrix === "none") ?
				"matrix(1,0,0,1,0,0)" : matrix;
			return parseMatrix(matrix);
		};

		// set the given matrix transform on the element; note that we apply the css transforms in reverse order of how its given
		// in "transformPropName" to ensure that the std compliant prop name shows up last
		var setTransformMatrix = function(el, matrix) {
			var m = "matrix(" + matrix.join(",") + ")";
			for(var i = transformPropNames.length - 1; i >= 0; --i) {
				el.css(transformPropNames[i], m + ' rotate(0.01deg)');
			}
		};

		// interpolates a value between a range given a percent
		var interpolate = function(from, to, percent) {
			return from + ((to - from) * (percent / 100));
		};

		$.fn.transformAnimate = function(opt) {
			// extend the options passed in by caller
			var options = {
				transform: "matrix(1,0,0,1,0,0)"
			};
			$.extend(options, opt);

			// initialize our custom property on the element to track animation progress
			this.css("percentAnim", 0);

			// supplant "options.step" if it exists with our own routine
			var sourceTransform = getTransformMatrix(this);
			var targetTransform = parseMatrix(options.transform);
			options.step = function(percentAnim, fx) {
				// compute the interpolated transform matrix for the current animation progress
				var $this = $(this);
				var matrix = sourceTransform.map(function(c, i) {
					return interpolate(c, targetTransform[i],
						percentAnim);
				});

				// apply the new matrix
				setTransformMatrix($this, matrix);

				// invoke caller's version of "step" if one was supplied;
				if(opt.step) {
					opt.step.apply(this, [matrix, fx]);
				}
			};

			// animate!
			return this.stop().animate({percentAnim: 100}, options);
		};

		/*** Functionality for translating image in slide - END ***/


		/**
		 * Calculate heights for slider holder and slide item, depending on window width, but only if slider is set to be responsive
		 * @param slider, current slider
		 * @param defaultHeight, default height of slider, set in shortcode
		 * @param responsive_breakpoint_set, breakpoints set for slider responsiveness
		 * @param reset, boolean for reseting heights
		 */
		var setSliderHeight = function(slider, defaultHeight, responsive_breakpoint_set, reset) {
			var sliderHeight = defaultHeight;
			if(!reset) {
				if(mkd.windowWidth > responsive_breakpoint_set[0]) {
					sliderHeight = defaultHeight;
				} else if(mkd.windowWidth > responsive_breakpoint_set[1]) {
					sliderHeight = defaultHeight * 0.75;
				} else if(mkd.windowWidth > responsive_breakpoint_set[2]) {
					sliderHeight = defaultHeight * 0.6;
				} else if(mkd.windowWidth > responsive_breakpoint_set[3]) {
					sliderHeight = defaultHeight * 0.55;
				} else if(mkd.windowWidth <= responsive_breakpoint_set[3]) {
					sliderHeight = defaultHeight * 0.45;
				}
			}

			slider.css({'height': (sliderHeight) + 'px'});
			slider.find('.mkd-slider-preloader').css({'height': (sliderHeight) + 'px'});
			slider.find('.mkd-slider-preloader .mkd-ajax-loader').css({'display': 'block'});
			slider.find('.item').css({'height': (sliderHeight) + 'px'});
		};

		/**
		 * Calculate heights for slider holder and slide item, depending on window size, but only if slider is set to be full height
		 * @param slider, current slider
		 */
		var setSliderFullHeight = function(slider) {
			var mobileHeaderHeight = mkd.windowWidth < 1000 ? mkdGlobalVars.vars.mkdMobileHeaderHeight + $('.mkd-top-bar').height() : 0;
			slider.css({'height': (mkd.windowHeight - mobileHeaderHeight) + 'px'});
			slider.find('.mkd-slider-preloader').css({'height': (mkd.windowHeight) + 'px'});
			slider.find('.mkd-slider-preloader .mkd-ajax-loader').css({'display': 'block'});
			slider.find('.item').css({'height': (mkd.windowHeight) + 'px'});
		};

		/**
		 * Set initial sizes for slider elements and put them in global variables
		 * @param slideItem, each slide
		 * @param index, index od slide item
		 */
		var setSizeGlobalVariablesForSlideElements = function(slideItem, index) {
			window["slider_graphic_width_" + index] = [];
			window["slider_graphic_height_" + index] = [];
			window["slider_title_" + index] = [];
			window["slider_subtitle_" + index] = [];
			window["slider_text_" + index] = [];
			window["slider_button1_" + index] = [];
			window["slider_button2_" + index] = [];

			//graphic size
			window["slider_graphic_width_" + index].push(parseFloat(slideItem.find('.mkd-thumb img').data("width")));
			window["slider_graphic_height_" + index].push(parseFloat(slideItem.find('.mkd-thumb img').data("height")));

			// font-size (0)
			window["slider_title_" + index].push(parseFloat(slideItem.find('.mkd-slide-title').css("font-size")));
			window["slider_subtitle_" + index].push(parseFloat(slideItem.find('.mkd-slide-subtitle').css("font-size")));
			window["slider_text_" + index].push(parseFloat(slideItem.find('.mkd-slide-text').css("font-size")));
			window["slider_button1_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(0)').css("font-size")));
			window["slider_button2_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(1)').css("font-size")));

			// line-height (1)
			window["slider_title_" + index].push(parseFloat(slideItem.find('.mkd-slide-title').css("line-height")));
			window["slider_subtitle_" + index].push(parseFloat(slideItem.find('.mkd-slide-subtitle').css("line-height")));
			window["slider_text_" + index].push(parseFloat(slideItem.find('.mkd-slide-text').css("line-height")));
			window["slider_button1_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(0)').css("line-height")));
			window["slider_button2_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(1)').css("line-height")));

			// letter-spacing (2)
			window["slider_title_" + index].push(parseFloat(slideItem.find('.mkd-slide-title').css("letter-spacing")));
			window["slider_subtitle_" + index].push(parseFloat(slideItem.find('.mkd-slide-subtitle').css("letter-spacing")));
			window["slider_text_" + index].push(parseFloat(slideItem.find('.mkd-slide-text').css("letter-spacing")));
			window["slider_button1_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(0)').css("letter-spacing")));
			window["slider_button2_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(1)').css("letter-spacing")));

			// margin-bottom (3)
			window["slider_title_" + index].push(parseFloat(slideItem.find('.mkd-slide-title').css("margin-bottom")));
			window["slider_subtitle_" + index].push(parseFloat(slideItem.find('.mkd-slide-subtitle').css("margin-bottom")));


			// slider_button padding top/bottom(3), padding left/right(4)
			window["slider_button1_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(0)').css("padding-top")));
			window["slider_button2_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(1)').css("padding-top")));

			window["slider_button1_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(0)').css("padding-left")));
			window["slider_button2_" + index].push(parseFloat(slideItem.find('.mkd-btn:eq(1)').css("padding-left")));
		};

		/**
		 * Set responsive coefficients for slider elements
		 * @param responsiveBreakpointSet, responsive breakpoints
		 * @param coefficientsGraphicArray, responsive coeaficcients for graphic
		 * @param coefficientsTitleArray, responsive coeaficcients for title
		 * @param coefficientsSubtitleArray, responsive coeaficcients for subtitle
		 * @param coefficientsTextArray, responsive coeaficcients for text
		 * @param coefficientsButtonArray, responsive coeaficcients for button
		 */
		var setSliderElementsResponsiveCoeffeicients = function(responsiveBreakpointSet, coefficientsGraphicArray, coefficientsTitleArray, coefficientsSubtitleArray, coefficientsTextArray, coefficientsButtonArray) {

			function coefficientsSetter(graphicArray, titleArray, subtitleArray, textArray, buttonArray) {
				sliderGraphicCoefficient = graphicArray;
				sliderTitleCoefficient = titleArray;
				sliderSubtitleCoefficient = subtitleArray;
				sliderTextCoefficient = textArray;
				sliderButtonCoefficient = buttonArray;
			}

			if(mkd.windowWidth > responsiveBreakpointSet[0]) {
				coefficientsSetter(coefficientsGraphicArray[0], coefficientsTitleArray[0], coefficientsSubtitleArray[0], coefficientsTextArray[0], coefficientsButtonArray[0]);
			} else if(mkd.windowWidth > responsiveBreakpointSet[1]) {
				coefficientsSetter(coefficientsGraphicArray[1], coefficientsTitleArray[1], coefficientsSubtitleArray[1], coefficientsTextArray[1], coefficientsButtonArray[1]);
			} else if(mkd.windowWidth > responsiveBreakpointSet[2]) {
				coefficientsSetter(coefficientsGraphicArray[2], coefficientsTitleArray[2], coefficientsSubtitleArray[2], coefficientsTextArray[2], coefficientsButtonArray[2]);
			} else if(mkd.windowWidth > responsiveBreakpointSet[3]) {
				coefficientsSetter(coefficientsGraphicArray[3], coefficientsTitleArray[3], coefficientsSubtitleArray[3], coefficientsTextArray[3], coefficientsButtonArray[3]);
			} else if(mkd.windowWidth > responsiveBreakpointSet[4]) {
				coefficientsSetter(coefficientsGraphicArray[4], coefficientsTitleArray[4], coefficientsSubtitleArray[4], coefficientsTextArray[4], coefficientsButtonArray[4]);
			} else if(mkd.windowWidth > responsiveBreakpointSet[5]) {
				coefficientsSetter(coefficientsGraphicArray[5], coefficientsTitleArray[5], coefficientsSubtitleArray[5], coefficientsTextArray[5], coefficientsButtonArray[5]);
			} else {
				coefficientsSetter(coefficientsGraphicArray[6], coefficientsTitleArray[6], coefficientsSubtitleArray[6], coefficientsTextArray[6], coefficientsButtonArray[6]);
			}

			// letter-spacing decrease quicker
			sliderTitleCoefficientLetterSpacing = sliderTitleCoefficient;
			sliderSubtitleCoefficientLetterSpacing = sliderSubtitleCoefficient;
			sliderTextCoefficientLetterSpacing = sliderTextCoefficient;
			if(mkd.windowWidth <= responsiveBreakpointSet[0]) {
				sliderTitleCoefficientLetterSpacing = sliderTitleCoefficient / 2;
				sliderSubtitleCoefficientLetterSpacing = sliderSubtitleCoefficient / 2;
				sliderTextCoefficientLetterSpacing = sliderTextCoefficient / 2;
			}
		};

		/**
		 * Set sizes for slider elements
		 * @param slideItem, each slide
		 * @param index, index od slide item
		 * @param reset, boolean for reseting sizes
		 */
		var setSliderElementsSize = function(slideItem, index, reset) {

			if(reset) {
				sliderGraphicCoefficient = sliderTitleCoefficient = sliderSubtitleCoefficient = sliderTextCoefficient = sliderButtonCoefficient = sliderTitleCoefficientLetterSpacing = sliderSubtitleCoefficientLetterSpacing = sliderTextCoefficientLetterSpacing = 1;
			}

			slideItem.find('.mkd-thumb').css({
				"width": Math.round(window["slider_graphic_width_" + index][0] * sliderGraphicCoefficient) + 'px',
				"height": Math.round(window["slider_graphic_height_" + index][0] * sliderGraphicCoefficient) + 'px'
			});

			slideItem.find('.mkd-slide-title').css({
				"font-size": Math.round(window["slider_title_" + index][0] * sliderTitleCoefficient) + 'px',
				"line-height": Math.round(window["slider_title_" + index][1] * sliderTitleCoefficient) + 'px',
				"letter-spacing": Math.round(window["slider_title_" + index][2] * sliderTitleCoefficient) + 'px',
				"margin-bottom": Math.round(window["slider_title_" + index][3] * sliderTitleCoefficient) + 'px'
			});

			slideItem.find('.mkd-slide-subtitle').css({
				"font-size": Math.round(window["slider_subtitle_" + index][0] * sliderSubtitleCoefficient) + 'px',
				"line-height": Math.round(window["slider_subtitle_" + index][1] * sliderSubtitleCoefficient) + 'px',
				"margin-bottom": Math.round(window["slider_subtitle_" + index][3] * sliderSubtitleCoefficient) + 'px',
				"letter-spacing": Math.round(window["slider_subtitle_" + index][2] * sliderSubtitleCoefficientLetterSpacing) + 'px'
			});

			slideItem.find('.mkd-slide-text').css({
				"font-size": Math.round(window["slider_text_" + index][0] * sliderTextCoefficient) + 'px',
				"line-height": Math.round(window["slider_text_" + index][1] * sliderTextCoefficient) + 'px',
				"letter-spacing": Math.round(window["slider_text_" + index][2] * sliderTextCoefficientLetterSpacing) + 'px'
			});

			slideItem.find('.mkd-btn:eq(0)').css({
				"font-size": Math.round(window["slider_button1_" + index][0] * sliderButtonCoefficient) + 'px',
				"line-height": Math.round(window["slider_button1_" + index][1] * sliderButtonCoefficient) + 'px',
				"letter-spacing": Math.round(window["slider_button1_" + index][2] * sliderButtonCoefficient) + 'px',
				"padding-top": Math.round(window["slider_button1_" + index][3] * sliderButtonCoefficient) + 'px',
				"padding-bottom": Math.round(window["slider_button1_" + index][3] * sliderButtonCoefficient) + 'px',
				"padding-left": Math.round(window["slider_button1_" + index][4] * sliderButtonCoefficient) + 'px',
				"padding-right": Math.round(window["slider_button1_" + index][4] * sliderButtonCoefficient) + 'px'
			});
			slideItem.find('.mkd-btn:eq(1)').css({
				"font-size": Math.round(window["slider_button2_" + index][0] * sliderButtonCoefficient) + 'px',
				"line-height": Math.round(window["slider_button2_" + index][1] * sliderButtonCoefficient) + 'px',
				"letter-spacing": Math.round(window["slider_button2_" + index][2] * sliderButtonCoefficient) + 'px',
				"padding-top": Math.round(window["slider_button2_" + index][3] * sliderButtonCoefficient) + 'px',
				"padding-bottom": Math.round(window["slider_button2_" + index][3] * sliderButtonCoefficient) + 'px',
				"padding-left": Math.round(window["slider_button2_" + index][4] * sliderButtonCoefficient) + 'px',
				"padding-right": Math.round(window["slider_button2_" + index][4] * sliderButtonCoefficient) + 'px'
			});
		};

		/**
		 * Set heights for slider and elemnts depending on slider settings (full height, responsive height od set height)
		 * @param slider, current slider
		 */
		var setHeights = function(slider) {

			slider.find('.item').each(function(i) {
				setSizeGlobalVariablesForSlideElements($(this), i);
				setSliderElementsSize($(this), i, false);
			});

			if(slider.hasClass('mkd-full-screen')) {

				setSliderFullHeight(slider);

				$(window).resize(function() {
					setSliderElementsResponsiveCoeffeicients(responsiveBreakpointSet, coefficientsGraphicArray, coefficientsTitleArray, coefficientsSubtitleArray, coefficientsTextArray, coefficientsButtonArray);
					setSliderFullHeight(slider);
					slider.find('.item').each(function(i) {
						setSliderElementsSize($(this), i, false);
					});
				});

			} else if(slider.hasClass('mkd-responsive-height')) {

				var defaultHeight = slider.data('height');
				setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);

				$(window).resize(function() {
					setSliderElementsResponsiveCoeffeicients(responsiveBreakpointSet, coefficientsGraphicArray, coefficientsTitleArray, coefficientsSubtitleArray, coefficientsTextArray, coefficientsButtonArray);
					setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);
					slider.find('.item').each(function(i) {
						setSliderElementsSize($(this), i, false);
					});
				});

			} else {
				var defaultHeight = slider.data('height');

				slider.find('.mkd-slider-preloader').css({'height': (slider.height()) + 'px'});
				slider.find('.mkd-slider-preloader .mkd-ajax-loader').css({'display': 'block'});

				mkd.windowWidth < 1000 ? setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false) : setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, true);

				$(window).resize(function() {
					setSliderElementsResponsiveCoeffeicients(responsiveBreakpointSet, coefficientsGraphicArray, coefficientsTitleArray, coefficientsSubtitleArray, coefficientsTextArray, coefficientsButtonArray);
					if(mkd.windowWidth < 1000) {
						setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, false);
						slider.find('.item').each(function(i) {
							setSliderElementsSize($(this), i, false);
						});
					} else {
						setSliderHeight(slider, defaultHeight, responsiveBreakpointSet, true);
						slider.find('.item').each(function(i) {
							setSliderElementsSize($(this), i, true);
						});
					}
				});
			}
		};

		/**
		 * Set prev/next numbers on navigation arrows
		 * @param slider, current slider
		 * @param currentItem, current slide item index
		 * @param totalItemCount, total number of slide items
		 */
		var setPrevNextNumbers = function(slider, currentItem, totalItemCount) {
			if(currentItem == 1) {
				slider.find('.left.carousel-control .prev').html(totalItemCount);
				slider.find('.right.carousel-control .next').html(currentItem + 1);
			} else if(currentItem == totalItemCount) {
				slider.find('.left.carousel-control .prev').html(currentItem - 1);
				slider.find('.right.carousel-control .next').html(1);
			} else {
				slider.find('.left.carousel-control .prev').html(currentItem - 1);
				slider.find('.right.carousel-control .next').html(currentItem + 1);
			}
		};

		/**
		 * Set video background size
		 * @param slider, current slider
		 */
		var initVideoBackgroundSize = function(slider) {
			var min_w = 1500; // minimum video width allowed
			var video_width_original = 1920;  // original video dimensions
			var video_height_original = 1080;
			var vid_ratio = 1920 / 1080;

			slider.find('.item .mkd-video .mkd-video-wrap').each(function() {

				var slideWidth = mkd.windowWidth;
				var slideHeight = $(this).closest('.carousel').height();

				$(this).width(slideWidth);

				min_w = vid_ratio * (slideHeight + 20);
				$(this).height(slideHeight);

				var scale_h = slideWidth / video_width_original;
				var scale_v = (slideHeight - mkdGlobalVars.vars.mkdMenuAreaHeight) / video_height_original;
				var scale = scale_v;
				if(scale_h > scale_v)
					scale = scale_h;
				if(scale * video_width_original < min_w) {
					scale = min_w / video_width_original;
				}

				$(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * video_width_original + 2));
				$(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * video_height_original + 2));
				$(this).scrollLeft(($(this).find('video').width() - slideWidth) / 2);
				$(this).find('.mejs-overlay, .mejs-poster').scrollTop(($(this).find('video').height() - slideHeight) / 2);
				$(this).scrollTop(($(this).find('video').height() - slideHeight) / 2);
			});
		};

		/**
		 * Init video background
		 * @param slider, current slider
		 */
		var initVideoBackground = function(slider) {
			$('.item .mkd-video-wrap .video').mediaelementplayer({
				enableKeyboard: false,
				iPadUseNativeControls: false,
				pauseOtherPlayers: false,
				// force iPhone's native controls
				iPhoneUseNativeControls: false,
				// force Android's native controls
				AndroidUseNativeControls: false
			});

			$(window).resize(function() {
				initVideoBackgroundSize(slider);
			});

			//mobile check
			if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
				$('.mkd-slider .mkd-mobile-video-image').show();
				$('.mkd-slider .mkd-video-wrap').remove();
			}
		};

		/**
		 * initiate slider
		 * @param slider, current slider
		 * @param currentItem, current slide item index
		 * @param totalItemCount, total number of slide items
		 * @param slideAnimationTimeout, timeout for slide change
		 */
		var initiateSlider = function(slider, totalItemCount, slideAnimationTimeout) {

			//set active class on first item
			slider.find('.carousel-inner .item:first-child').addClass('active');
			//check for header style
			mkdCheckSliderForHeaderStyle($('.carousel .active'), slider.hasClass('mkd-header-effect'));
			// setting numbers on carousel controls
			if(slider.hasClass('mkd-slider-numbers')) {
				setPrevNextNumbers(slider, 1, totalItemCount);
			}
			// set video background if there is video slide
			if(slider.find('.item video').length) {
				initVideoBackgroundSize(slider);
				initVideoBackground(slider);
			}

			//init slider
			if(slider.hasClass('mkd-auto-start')) {
				slider.carousel({
					interval: slideAnimationTimeout,
					pause: false
				});

				//pause slider when hover slider button
				slider.find('.slide_buttons_holder .qbutton')
					.mouseenter(function() {
						slider.carousel('pause');
					})
					.mouseleave(function() {
						slider.carousel('cycle');
					});
			} else {
				slider.carousel({
					interval: 0,
					pause: false
				});
			}


			//initiate image animation
			if($('.carousel-inner .item:first-child').hasClass('mkd-animate-image') && mkd.windowWidth > 1000) {
				slider.find('.carousel-inner .item.mkd-animate-image:first-child .mkd-image').transformAnimate({
					transform: "matrix(" + matrixArray[$('.carousel-inner .item:first-child').data('mkd_animate_image')] + ")",
					duration: 30000
				});
			}
		};

		return {
			init: function() {
				if(sliders.length) {
					sliders.each(function() {
						var $this = $(this);
						var slideAnimationTimeout = $this.data('slide_animation_timeout');
						var totalItemCount = $this.find('.item').length;
						if($this.data('mkd_responsive_breakpoints')) {
							if($this.data('mkd_responsive_breakpoints') == 'set2') {
								responsiveBreakpointSet = [1600, 1300, 1000, 768, 567, 320];
							}
						}
						coefficientsGraphicArray = $this.data('mkd_responsive_graphic_coefficients').split(',');
						coefficientsTitleArray = $this.data('mkd_responsive_title_coefficients').split(',');
						coefficientsSubtitleArray = $this.data('mkd_responsive_subtitle_coefficients').split(',');
						coefficientsTextArray = $this.data('mkd_responsive_text_coefficients').split(',');
						coefficientsButtonArray = $this.data('mkd_responsive_button_coefficients').split(',');

						setSliderElementsResponsiveCoeffeicients(responsiveBreakpointSet, coefficientsGraphicArray, coefficientsTitleArray, coefficientsSubtitleArray, coefficientsTextArray, coefficientsButtonArray);

						setHeights($this);

						/*** wait until first video or image is loaded and than initiate slider - start ***/
						if(mkd.htmlEl.hasClass('touch')) {
							if($this.find('.item:first-child .mkd-mobile-video-image').length > 0) {
								var src = imageRegex.exec($this.find('.item:first-child .mkd-mobile-video-image').attr('style'));
							} else {
								var src = imageRegex.exec($this.find('.item:first-child .mkd-image').attr('style'));
							}
							if(src) {
								var backImg = new Image();
								backImg.src = src[1];
								$(backImg).load(function() {
									$('.mkd-slider-preloader').fadeOut(500);
									initiateSlider($this, totalItemCount, slideAnimationTimeout);
								});
							}
						} else {
							if($this.find('.item:first-child video').length > 0) {
								$this.find('.item:first-child video').get(0).addEventListener('loadeddata', function() {
									$('.mkd-slider-preloader').fadeOut(500);
									initiateSlider($this, totalItemCount, slideAnimationTimeout);
								});
							} else {
								var src = imageRegex.exec($this.find('.item:first-child .mkd-image').attr('style'));
								if(src) {
									var backImg = new Image();
									backImg.src = src[1];
									$(backImg).load(function() {
										$('.mkd-slider-preloader').fadeOut(500);
										initiateSlider($this, totalItemCount, slideAnimationTimeout);
									});
								}
							}
						}
						/*** wait until first video or image is loaded and than initiate slider - end ***/

						/* before slide transition - start */
						$this.on('slide.bs.carousel', function() {
							$this.addClass('mkd-in-progress');
							$this.find('.active .mkd-slider-content-outer').fadeTo(250, 0);
						});
						/* before slide transition - end */

						/* after slide transition - start */
						$this.on('slid.bs.carousel', function() {
							$this.removeClass('mkd-in-progress');
							$this.find('.active .mkd-slider-content-outer').fadeTo(0, 1);

							// setting numbers on carousel controls
							if($this.hasClass('mkd-slider-numbers')) {
								var currentItem = $('.item').index($('.item.active')[0]) + 1;
								setPrevNextNumbers($this, currentItem, totalItemCount);
							}

							// initiate image animation on active slide and reset all others
							$('.item.mkd-animate-image .mkd-image').stop().css({
								'transform': '',
								'-webkit-transform': ''
							});
							if($('.item.active').hasClass('mkd-animate-image') && mkd.windowWidth > 1000) {
								$('.item.mkd-animate-image.active .mkd-image').transformAnimate({
									transform: "matrix(" + matrixArray[$('.item.mkd-animate-image.active').data('mkd_animate_image')] + ")",
									duration: 30000
								});
							}
						});
						/* after slide transition - end */

						/* swipe functionality - start */
						$this.swipe({
							swipeLeft: function() {
								$this.carousel('next');
							},
							swipeRight: function() {
								$this.carousel('prev');
							},
							threshold: 20
						});
						/* swipe functionality - end */

					});

					//adding parallax functionality on slider
					if($('.no-touch .carousel').length) {
						var skrollr_slider = skrollr.init({
							smoothScrolling: false,
							forceHeight: false
						});
						skrollr_slider.refresh();
					}

					$(window).scroll(function() {
						//set control class for slider in order to change header style
						if($('.mkd-slider .carousel').height() < mkd.scroll) {
							$('.mkd-slider .carousel').addClass('mkd-disable-slider-header-style-changing');
						} else {
							$('.mkd-slider .carousel').removeClass('mkd-disable-slider-header-style-changing');
							mkdCheckSliderForHeaderStyle($('.mkd-slider .carousel .active'), $('.mkd-slider .carousel').hasClass('mkd-header-effect'));
						}

						//hide slider when it is out of viewport
						if($('.mkd-slider .carousel').hasClass('mkd-full-screen') && mkd.scroll > mkd.windowHeight && mkd.windowWidth > 1000) {
							$('.mkd-slider .carousel').find('.carousel-inner, .carousel-indicators').hide();
						} else if(!$('.mkd-slider .carousel').hasClass('mkd-full-screen') && mkd.scroll > $('.mkd-slider .carousel').height() && mkd.windowWidth > 1000) {
							$('.mkd-slider .carousel').find('.carousel-inner, .carousel-indicators').hide();
						} else {
							$('.mkd-slider .carousel').find('.carousel-inner, .carousel-indicators').show();
						}
					});
				}
			}
		};
	};

	/**
	 * Check if slide effect on header style changing
	 * @param slide, current slide
	 * @param headerEffect, flag if slide
	 */

	function mkdCheckSliderForHeaderStyle(slide, headerEffect) {

		if($('.mkd-slider .carousel').not('.mkd-disable-slider-header-style-changing').length > 0) {

			var slideHeaderStyle = "";
			if(slide.hasClass('light')) {
				slideHeaderStyle = 'mkd-light-header';
			}
			if(slide.hasClass('dark')) {
				slideHeaderStyle = 'mkd-dark-header';
			}

			if(slideHeaderStyle !== "") {
				if(headerEffect) {
					mkd.body.removeClass('mkd-dark-header mkd-light-header').addClass(slideHeaderStyle);
				}
			} else {
				if(headerEffect) {
					mkd.body.removeClass('mkd-dark-header mkd-light-header').addClass(mkd.defaultHeaderStyle);
				}

			}
		}
	}

	function mkdInfoBox() {
		var infoBoxes = $('.mkd-info-box-holder');

		var getBottomHeight = function(bottomHolder) {
			if(bottomHolder.length) {
				return bottomHolder.height();
			}

			return false;
		}

		var infoBoxesHeight = function() {
			if(infoBoxes.length) {
				var maxHeight = 0;
				var heightestBox;

				infoBoxes.each(function() {
					var bottomHolder = $(this).find('.mkd-ib-bottom-holder');
					var topHolder = $(this).find('.mkd-ib-top-holder')

					var currentHeight = getBottomHeight(bottomHolder) + topHolder.height();

					maxHeight = Math.max(maxHeight, currentHeight);

					if(maxHeight <= currentHeight) {
						heightestBox = $(this);
						maxHeight = currentHeight;
					}
				});

				infoBoxes.height(maxHeight);
			}
		}

		var initHover = function(infoBox) {
			var timeline = new TimelineLite({paused: true}),
				topHolder = infoBox.find('.mkd-ib-top-holder'),
				bottomHolder = infoBox.find('.mkd-ib-bottom-holder'),
				bottomHeight = getBottomHeight(bottomHolder);

			timeline.to(topHolder, 0.6, {y: -(bottomHeight / 2), ease: Back.easeInOut.config(2)});
			timeline.to(bottomHolder, 0.4, {y: -(bottomHeight / 2), opacity: 1, ease: Back.easeOut}, '-=0.3');

			infoBox.hover(function() {
				timeline.restart();
			}, function() {
				timeline.reverse();
			});
		}

		if(infoBoxes.length) {
			infoBoxesHeight();

			$(mkd.window).resize(function() {
				infoBoxesHeight();
			});

			infoBoxes.each(function() {
				var thisInfoBox = $(this);
				initHover(thisInfoBox);

				$(mkd.window).resize(function() {
					initHover(thisInfoBox);
				});
			});
		}
	}

	/*
	* Pricing tables appear effect
	*/
	function mkdPricingTables() {
		var pricingTablesShortcodes = $('.mkd-pricing-tables.mkd-appear-effect-yes');

		if (pricingTablesShortcodes.length) {
			pricingTablesShortcodes.each(function(){
				var pricingTablesShortcode = $(this),
					pricingTables = pricingTablesShortcode.find('.mkd-price-table');

					pricingTables.each(function(i){
						var pricingTable = $(this);

						pricingTablesShortcode.appear(function(){
							setTimeout(function(){
								pricingTable.addClass('mkd-appeared');
							}, i*250);
						}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
					});
			});
		}
	}

	function mkdProcess() {
		var processes = $('.mkd-process-holder');

		var processLoad = function(process) {
			process.waitForImages(function(){
				process.css('visibility','visible');
			});
		}

		var setProcessItemsPosition = function(process) {
			var items = process.find('.mkd-process-item-holder');
			var highlighted = items.filter('.mkd-pi-highlighted');

			if(highlighted.length) {
				if(highlighted.length === 1) {
					var afterHighlighed = highlighted.nextAll();

					if(afterHighlighed.length) {
						afterHighlighed.addClass('mkd-pi-push-right');
					}
				} else {
					process.addClass('mkd-process-multiple-highlights');
				}
			}
		}

		var processAnimation = function(process) {
			if(!mkd.body.hasClass('mkd-no-animations-on-touch')) {
				var items = process.find('.mkd-process-item-holder');
				var background = process.find('.mkd-process-bg-holder');

				process.appear(function() {
					var tl = new TimelineLite();
					tl.fromTo(background, 0.2, {y: 50, opacity: 0, delay: 0.1}, {opacity: 1, y: 0, delay: 0.1});
					tl.staggerFromTo(items, 0.3, {opacity: 0, y: 50, ease: Back.easeOut.config(2)}, {
						opacity: 1,
						y: 0,
						ease: Back.easeOut.config(2)
					}, 0.2);
				}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
			}
		}

		return {
			init: function() {
				if(processes.length) {
					processes.each(function() {
						processLoad($(this));
						setProcessItemsPosition($(this));
						processAnimation($(this));
					});
				}
			}
		}
	};

	function mkdComparisonPricingTables() {
		var pricingTablesHolder = $('.mkd-comparision-pricing-tables-holder');

		var alterPricingTableColumn = function(holder) {
			var featuresHolder = holder.find('.mkd-cpt-features-item');
			var pricingTables = holder.find('.mkd-comparision-table-holder');

			if(pricingTables.length) {
				pricingTables.each(function() {
					var currentPricingTable = $(this);
					var pricingItems = currentPricingTable.find('.mkd-cpt-table-content li');

					if(currentPricingTable.is('.mkd-cpt-featured')) {
						var marginTop = parseInt(currentPricingTable.find('.mkd-cpt-table-border-top').css('margin-top'), 10);
						pricingTablesHolder.css('padding-top', Math.abs(marginTop) + 'px');
					}
					if(pricingItems.length) {
						pricingItems.each(function(i) {
							var pricingItemFeature = featuresHolder[i];
							var pricingItem = this;
							var pricingItemContent = pricingItem.innerHTML;

							if(typeof pricingItemFeature !== 'undefined') {
								pricingItem.innerHTML = '<span class="mkd-cpt-table-item-feature">' + $(pricingItemFeature).text() + ': </span>' + pricingItemContent;
							}
						});
					}
				});
			}
		};

		return {
			init: function() {
				if(pricingTablesHolder.length) {
					pricingTablesHolder.each(function() {
						alterPricingTableColumn($(this));
					});
				}
			}
		}
	}

	function mkdIconProgressBar() {
		var progressBars = $('.mkd-icon-progress-bar');

		var animateActiveIcons = function(progressBar) {
			var timeouts = [];
			progressBar.appear(function() {
				var numberOfActive = parseInt(progressBar.data('number-of-active-icons'));
				var icons = progressBar.find('.mkd-ipb-icon');
				var customColor = progressBar.data('icon-active-color');

				if(typeof numberOfActive !== 'undefined') {

					icons.each(function(i) {
						if(i < numberOfActive) {
							var time = (i + 1) * 150;
							var currentIcon = $(this);

							timeouts[i] = setTimeout(function() {
								animateSingleIcon(currentIcon, customColor);
								$(icons[i]).addClass('active');
							}, time);
						}
					});
				}
			}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
		};

		var animateSingleIcon = function(icon, customColor) {
			icon.addClass('mkd-ipb-active');

			if(typeof customColor !== 'undefined' && customColor !== '') {
				icon.find('.mkd-ipb-icon-elem').css('color', customColor);
			}
		}

		return {
			init: function() {
				if(progressBars.length) {
					progressBars.each(function() {
						animateActiveIcons($(this));
					});
				}
			}
		}
	}

	function mkdBlogSlider() {
		var blogSliders = $('.mkd-blog-slider-holder:not(.slick-initialized)');
		var verticalHeader = $('body').hasClass('mkd-header-vertical') ? true : false;

		if(blogSliders.length) {
			blogSliders.each(function() {
				var thisSlider = $(this);
				var postsToShow = 3;

				if(typeof $(this).data('posts_to_show') !== 'undefined') {
					postsToShow = $(this).data('posts_to_show');
				}

				thisSlider.on('init', function () {
					thisSlider.css({'opacity': '1'});

				}).slick({
					autoplay: true,
					autoplaySpeed: 4500,
					infinite: true,
					cssEase: 'cubic-bezier(0.77, 0, 0.175, 1)',
					speed: 850,
					arrows: true,
					slidesToShow: postsToShow,
					slidesToScroll: 1,
					responsive: [
						{
							breakpoint: 1441,
							settings: {
								slidesToShow: verticalHeader ? 2 : 3,
								slidesToScroll: verticalHeader ? 2 : 3
							}
						},
						{
							breakpoint: 1025,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						},
						{
							breakpoint: 769,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 481,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false
							}
						}
					]
				});
			});
		}
	}

	function mkdInitMiniTextSlider() {
		var sliders = $('.mkd-mini-text-slider');

		if(sliders.length) {
			sliders.each(function() {
				var mts = $(this).find('.mkd-mts-inner');

				mts.owlCarousel({
					singleItem: true,
					autoPlay: 4000,
					navigation: true,
					autoHeight: false,
					pagination: false,
					slideSpeed: 450,
					stopOnHover: true,
                    transitionStyle : 'backSlide', //fade, fadeUp, backSlide, goDown
					navigationText: [
						'<span class="mkd-prev-icon"><span class="arrow_carrot-left"></span></span>',
						'<span class="mkd-next-icon"><span class="arrow_carrot-right"></span></span>'
					],
					afterInit: function() {
						mts.css('visibility','visible');
					}
				});
			});
		}
	}

	function mkdInitTeamSlider() {
		var sliders = $('.mkd-team-slider');

		if(sliders.length) {
			sliders.each(function() {
				var mts = $(this).find('.mkd-team-slider-inner');
				var columns = typeof $(this).data('columns') !== 'undefined' ? $(this).data('columns') : 4;
				//Responsive breakpoints
				var items = [
					[0, 1],
					[481, 2],
					[769, 3],
					[1025, columns]
				];

				mts.owlCarousel({
					items: columns,
					itemsCustom: items,
					autoPlay: 4000,
					navigation: true,
					autoHeight: false,
					pagination: false,
					slideSpeed: 450,
					stopOnHover: true,
					navigationText: [
						'<span class="mkd-prev-icon"><span class="lnr lnr-chevron-left"></span></span>',
						'<span class="mkd-next-icon"><span class="lnr lnr-chevron-right"></span></span>'
					]
				});
			});
		}
	}

	function mkdInitCardSlider() {
		var sliders = $('.mkd-card-slider');

		if(sliders.length) {
			sliders.each(function() {
				var space = typeof $(this).data('space') !== 'undefined' ? $(this).data('space') + 'px' : '';
				var columns = typeof $(this).data('columns') !== 'undefined' ? $(this).data('columns') : 4;
				var separation = typeof $(this).data('separation') !== 'undefined' ? parseInt($(this).data('separation'), 10) : 0;
				$(this).css('margin', '0 -' + (separation / 2) + 'px');

				var cs = $(this).find('.mkd-card-slider-inner');
				var cards = cs.find('.mkd-card');
				cards.each(function() {
					$(this).css('padding', '0 ' + (separation / 2) + 'px');
					$(this).find('.mkd-card-below-image').css('height', space);
				});
				//Responsive breakpoints
				var items = [
					[0, 1],
					[481, 2],
					[769, 2],
					[1025, columns]
				];
				cs.owlCarousel({
					items: columns,
					margin: 20,
					autoPlay: 4000,
					navigation: true,
					autoHeight: false,
					pagination: false,
					slideSpeed: 450,
					stopOnHover: true,
					itemsCustom: items,
					navigationText: [
						'<span class="mkd-prev-icon"><span class="lnr lnr-chevron-left"></span></span>',
						'<span class="mkd-next-icon"><span class="lnr lnr-chevron-right"></span></span>'
					],
					afterInit: function() {
						cs.css('visibility','visible');
					}
				});

				//appear effect for 3 column layout
				if (columns == 3) {
					if (cs.find('.mkd-card').length == 3) {
						cards.each(function(i) { 
							var card = $(this);

							card.appear(function(){
								setTimeout(function(){
									card.addClass('mkd-appeared');
								}, i*250);
							}, {accX: 0, accY: mkdGlobalVars.vars.mkdElementAppearAmount});
						});
					} else {
						cards.addClass('mkd-appeared');
					}
				}
			});
		}
	}

	function mkdBMICalcSelect2() {
		var BMICalcHolder = $('.mkd-bmi-calculator-holder'),
			select;

		if(BMICalcHolder.length) {
			select = BMICalcHolder.find('select');

			select.each(function() {
				$(this).select2({
					minimumResultsForSearch: Infinity
				});
			});
		}
	}

	function emptySpaceResponsive() {
		var emptySpaces = $('.vc_empty_space');

		var sizes = {
			'large_laptop': 1559,
			'laptop': 1279,
			'tablet_landscape': 1023,
			'tablet_portrait': 767,
			'phone_landscape': 599,
			'phone_portrait': 479
		}

		var sizeValues = function() {
			var values = [];
			for(var size in sizes) {
				values.push(sizes[size]);
			}
			;

			return values;
		}();

		var getHeights = function(emptySpace) {
			var heights = {};

			for(var size in sizes) {
				var dataValue = emptySpace.data(size);
				if(typeof dataValue !== 'undefined' && dataValue !== '') {
					heights[size] = dataValue;
				}
			}

			return heights;
		};

		var usedSizes = function(emptySpace) {
			var usedSizes = [];

			for(var size in sizes) {
				var dataValue = emptySpace.data(size);
				if(typeof dataValue !== 'undefined' && dataValue !== '') {
					usedSizes.push(sizes[size]);
				}
			}

			return usedSizes;
		};

		var resizeEmptySpace = function(heights, emptySpace) {
			if(typeof heights !== 'undefined') {
				var originalHeight = emptySpace.data('original-height');
				var sizeValues = usedSizes(emptySpace);
				var heightestSize = Math.max.apply(null, sizeValues);

				for(var size in sizes) {
					if(mkd.windowWidth <= sizes[size]) {
						emptySpace.height(heights[size]);
					} else if(mkd.windowWidth > heightestSize) {
						emptySpace.height(originalHeight);
					}
				}
			}
		};

		return {
			init: function() {
				if(emptySpaces.length) {
					emptySpaces.each(function() {
						var heights = getHeights($(this));

						resizeEmptySpace(heights, $(this));

						var thisEmptySpace = $(this);

						$(window).resize(function() {
							resizeEmptySpace(heights, thisEmptySpace);
						});
					});
				}
			}
		}
	}

	var mkdCoverBoxes = new function() {
		mkd.modules.shortcodes.mkdCoverBoxes = this;
		this.holders = $('.mkd-cover-boxes');
		this.columns = 0;

		this.init = function() {
			mkdCoverBoxes.holders.each(function() {
				var holder = $(this);
				var boxes = holder.find('.mkd-cover-box');
				boxes.eq(0).addClass('active');
				boxes
					.mouseenter(function() {
						if (typeof holder.data('final-columns') !== 'undefined') {
							var cols = holder.data('final-columns');
							if(cols >= 2) {
								var offset = Math.floor(boxes.index($(this)) / cols) * cols;
								for(var i = 0; i < cols; i++) {
									boxes.eq(offset + i).removeClass('active');
								}
							}
							$(this).addClass('active');
						}
					});
			});
			mkdCoverBoxes.handleSize();
		};

		this.determineActive = function(boxes) {
			var holder = boxes.eq(0).closest('.mkd-cover-boxes');
			var cols = holder.data('final-columns');
			if(cols >= 2) {
				var activeArrStr = '';
				var activeArr = [];
				if (cols == 2) {
					activeArrStr = holder.data('active-two');
				}
				else if (cols == 3) {
					activeArrStr = holder.data('active-three');
				}

				if (typeof activeArrStr !== 'undefined' && activeArrStr != '') {
					var tempArr = activeArrStr.trim().split(',');
					for (var i=0; i<tempArr.length; i++) {
						activeArr.push(parseInt(tempArr[i].trim()));
					}
				}

				if (activeArr.length) {
					boxes.each(function(i) {
						if ($.inArray(i+1,activeArr) >= 0) {
							$(this).addClass('active');
						}
						else {
							$(this).removeClass('active');
						}
					});
				}
				else {
					boxes.each(function(i) {
						if(i % cols == 0) {
							$(this).addClass('active');
						}
						else {
							$(this).removeClass('active');
						}
					});
				}
			}

		};

		this.handleSize = function() {
			mkdCoverBoxes.holders.each(function() {
				var boxes = $(this).find('.mkd-cover-box');
				boxes.css('transition', 'none');
				var totalWidth = $(this).innerWidth();
				var columns = parseInt($(this).data('columns'), 10);
				var maxColumns = totalWidth <= 600 ? 0 : (totalWidth <= 800 ? 1 : (totalWidth <= 1200 ? 2 : 3));
				var finalColumns = Math.min(columns, maxColumns);
				$(this).data('final-columns', finalColumns).removeClass('mkd-cb-columns-0 mkd-cb-columns-1 mkd-cb-columns-2 mkd-cb-columns-3').addClass('mkd-cb-columns-' + finalColumns);
				var activeSize = boxes.filter('.active').eq(0).children('.mkd-cover-box-inner').innerWidth();
				boxes.find('.mkd-cb-content').width(activeSize);
				mkdCoverBoxes.determineActive(boxes);
				boxes.css('transition', '');
			});
		};
	};

	function mkdBookingForm() {
		function handleSize(form) {
			if (form.is('.mkd-bf-layout-horizontal')) {
				var container = form.closest('.mkd-vertical-align-containers');
				var menuArea = container.closest('.mkd-menu-area');
				var formInner = form.find('.mkd-booking-form-inner');

				formInner.css({
					width: menuArea.width() + 'px',
					left: -form.offset().left + 'px',
					top: form.height()/2 + menuArea.height()/2 + 'px',
					'padding-left': (menuArea.width() - container.width())/2+'px',
					'padding-right': (menuArea.width() - container.width())/2+'px'
				});
			}

			if (form.is('.mkd-bf-floating')) {
				var prevSection = form.closest('.mkd-section').prev('.mkd-section');
				if (!prevSection.length) {
					form.hide();
				}
				else {
					form.css('bottom', ((prevSection.outerHeight() - form.find('.mkd-booking-form-inner').outerHeight())/2 + parseInt(prevSection.css('margin-bottom'))) + 'px');
					var revSlider = prevSection.find('.rev_slider');
					if (revSlider.length) {
						revSlider.eq(0).on('revolution.slide.onloaded', function() {
							form.css('bottom', ((prevSection.outerHeight() - form.find('.mkd-booking-form-inner').outerHeight())/2 + parseInt(prevSection.css('margin-bottom'))) + 'px');
						});
					}
				}
			}
		}

		var bookingForms = $('.mkd-booking-form');
		var timePickers;
		bookingForms.each(function(index) {
			var form = $(this);
			var formInner = form.find('.mkd-booking-form-inner');
			var formItself = form.find('form');
			var responseDiv = formItself.find('.mkd-bf-form-response-holder');
			var deptDocs = form.data('depts-doctors');
			var formDoctors = form.find('select.mkd-bf-select-doctor');

			form.filter('.mkd-bf-layout-horizontal').closest('.widget_mkd_booking_form_widget') //.find('.mkd-booking-form-widget-button')
			.mouseenter(function() {
				formInner.stop().slideDown(300, 'easeOutQuint');
			})
			.mouseleave(function() {
				if (typeof timePickers === 'undefined' || !timePickers.length) {
					timePickers = $('.xdsoft_datetimepicker');
				}
				var select2Active = form.find('.select2-dropdown-open');
				var datePicker = timePickers.eq(index*2),
					timePicker = timePickers.eq(index*2+1);
				if (!select2Active.length && !datePicker.is(':visible') && !timePicker.is(':visible')) {
					formInner.stop().slideUp(400, 'easeInOutQuint');
				}
			});

			form.find('select.mkd-bf-select-department')
			.select2({
				minimumResultsForSearch: Infinity
			}).
			on('change', function (ev) {
				formDoctors.find('option').not(':first-child').remove();
				formDoctors.select2({
					minimumResultsForSearch: Infinity
				});
				var newHtml = '';
				var newDoctors = deptDocs[ev.val];
				for (var i=0; typeof newDoctors !== 'undefined' && i < newDoctors.length; i++) {
					newHtml += '<option value="' + newDoctors[i] + '">' + newDoctors[i] + '</option>';
				}
				formDoctors.append(newHtml);
			});

			formDoctors.select2({
				minimumResultsForSearch: Infinity
			});

			form.find('.mkd-bf-input-date').datetimepicker({
				timepicker: false,
				minDate: 0,
				format: 'Y-m-d'
			});
			form.find('.mkd-bf-input-time').datetimepicker({
				datepicker: false,
				step: 15,
				format: 'H:i'
			});

			formItself.submit(function(e) {
				e.preventDefault();

				var enquiryData = {
					department: formItself.find('select.mkd-bf-select-department').val(),
					doctor: formItself.find('select.mkd-bf-select-doctor').val(),
					date: formItself.find('input.mkd-bf-input-date').val(),
					time: formItself.find('input.mkd-bf-input-time').val(),
					name: formItself.find('input.mkd-bf-input-name').val(),
					contact: formItself.find('input.mkd-bf-input-contact').val(),
					message: formItself.find('textarea.mkd-bf-input-request').val(),
					nonce: formItself.find('.nonce input:first-child').val()
				};

				var requestData = {
					action: 'mkd_action_send_booking_form',
					data: enquiryData
				};

				
				$.ajax({
					type: 'POST',
					data: requestData,
					url: MikadoAjaxUrl,
					success: function( response ) {
                                                //var obj = JSON && JSON.parse(response) || $.parseJSON(response);
//console.log(obj);
						responseDiv.html(response.data).slideDown(300);
						setTimeout(function() {
							responseDiv.slideUp(300, function() {
								responseDiv.html('');
							});
						}, 3000);
					}
				});
			});

			handleSize(form);
			$(window).resize(function() {
				handleSize(form);
			});
		});
	}

})(jQuery);
(function($) {
    'use strict';

    var woocommerce = {};
    mkd.modules.woocommerce = woocommerce;

    woocommerce.mkdInitQuantityButtons = mkdInitQuantityButtons;
    woocommerce.mkdInitSelect2 = mkdInitSelect2;
	woocommerce.mkdProductImagesMinHeight = mkdProductImagesMinHeight;

    woocommerce.mkdOnDocumentReady = mkdOnDocumentReady;
    woocommerce.mkdOnWindowLoad = mkdOnWindowLoad;
    woocommerce.mkdOnWindowResize = mkdOnWindowResize;
    woocommerce.mkdOnWindowScroll = mkdOnWindowScroll;

    $(document).ready(mkdOnDocumentReady);
    $(window).load(mkdOnWindowLoad);
    $(window).resize(mkdOnWindowResize);
    $(window).scroll(mkdOnWindowScroll);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdOnDocumentReady() {
        mkdInitQuantityButtons();
        mkdInitSelect2();
        mkdReInitSelect2CartAjax();
		mkdProductImagesMinHeight();
        mkdAddingToCart();
    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdOnWindowLoad() {

    }

    /*
     All functions to be called on $(window).resize() should be in this function
     */
    function mkdOnWindowResize() {
		mkdProductImagesMinHeight();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdOnWindowScroll() {

    }

    /*
     ** Init quantity buttons to increase/decrease products for cart
     */
    function mkdInitQuantityButtons() {

        $(document).on( 'click', '.mkd-quantity-minus, .mkd-quantity-plus', function(e) {
            e.stopPropagation();

            var button = $(this),
                inputField = button.siblings('.mkd-quantity-input'),
                step = parseFloat(inputField.attr('step')),
                max = parseFloat(inputField.attr('max')),
                minus = false,
                inputValue = parseFloat(inputField.val()),
                newInputValue;

            if (button.hasClass('mkd-quantity-minus')) {
                minus = true;
            }

            if (minus) {
                newInputValue = inputValue - step;
                if (newInputValue >= 1) {
                    inputField.val(newInputValue);
                } else {
                    inputField.val(1);
                }
            } else {
                newInputValue = inputValue + step;
                if ( max === undefined ) {
                    inputField.val(newInputValue);
                } else {
                    if ( newInputValue >= max ) {
                        inputField.val(max);
                    } else {
                        inputField.val(newInputValue);
                    }
                }
            }

            inputField.trigger( 'change' );
        });
    }

    /*
     ** Init select2 script for select html dropdowns
     */
    function mkdInitSelect2() {

        if ($('.woocommerce-ordering .orderby').length ||  $('#calc_shipping_country').length ) {

            $('.woocommerce-ordering .orderby').select2({
                minimumResultsForSearch: Infinity
            });

            $('#calc_shipping_country').select2();
        }
    }

    /*
     ** Re Init select2 script for select html dropdowns
     */
    function mkdReInitSelect2CartAjax() {

        $(document).ajaxComplete(function() {
            if ($('#calc_shipping_country').length) {

                $('#calc_shipping_country').select2();
            }
        });
    }


	function mkdProductImagesMinHeight(){
		var hh = $('.mkd-woo-single-page .product .images a.woocommerce-main-image').height();
		$('.mkd-woo-single-page .product .images').css({'min-height':hh});
	}

    function mkdAddingToCart() {
        var addToCartBtns = $('.ajax_add_to_cart:not(.added)');

        if (addToCartBtns.length) {
            addToCartBtns.each(function(){
                var addToCartBtn = $(this);

                addToCartBtn.on('click', function(){
                    addToCartBtn.text(mkdGlobalVars.vars.mkdAddingToCartMsg);
                });
            });
        }
    }

})(jQuery);
(function($) {
	'use strict';

	var portfolio = {};
	mkd.modules.portfolio = portfolio;

	portfolio.mkdOnDocumentReady = mkdOnDocumentReady;
	portfolio.mkdOnWindowLoad = mkdOnWindowLoad;
	portfolio.mkdOnWindowResize = mkdOnWindowResize;
	portfolio.mkdOnWindowScroll = mkdOnWindowScroll;

	$(document).ready(mkdOnDocumentReady);
	$(window).load(mkdOnWindowLoad);
	$(window).resize(mkdOnWindowResize);
	$(window).scroll(mkdOnWindowScroll);

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdOnDocumentReady() {
		portfolio.mkdPortfolioSlider();
	}

	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdOnWindowLoad() {
		mkdPortfolioSingleFollow().init();
	}

	/*
	 All functions to be called on $(window).resize() should be in this function
	 */
	function mkdOnWindowResize() {

	}

	/*
	 All functions to be called on $(window).scroll() should be in this function
	 */
	function mkdOnWindowScroll() {

	}

	portfolio.mkdPortfolioSlider = function() {
		var sliders = $('.mkd-portfolio-slider-holder');

		var setPortfolioResponsiveOptions = function(slider, options) {
			var columns = slider.data('columns');
			if(typeof columns === 'number') {
				switch(columns) {
					case 1:
						options.singleItem = true;
						break;
					default:
						options.items = columns;
						options.itemsDesktop = false;
						break;
				}
			}
		};

		if(sliders.length) {
			sliders.each(function() {
				var sliderHolder = $(this).find('.mkd-portfolio-slider-list');
				var options = {};

				options.pagination = typeof sliderHolder.data('enable-pagination') !== 'undefined' && sliderHolder.data('enable-pagination') === 'yes';

				setPortfolioResponsiveOptions(sliderHolder, options);

				sliderHolder.owlCarousel(options);
			});

		}
	};


	var mkdPortfolioSingleFollow = function() {

		var info = $('.mkd-follow-portfolio-info .small-images.mkd-portfolio-single-holder .mkd-portfolio-info-holder, ' +
			'.mkd-follow-portfolio-info .small-slider.mkd-portfolio-single-holder .mkd-portfolio-info-holder');

		if(info.length) {
			var infoHolder = info.parent(),
				infoHolderOffset = infoHolder.offset().top,
				infoHolderHeight = infoHolder.height(),
				mediaHolder = $('.mkd-portfolio-media'),
				mediaHolderHeight = mediaHolder.height(),
				header = $('.header-appear, .mkd-fixed-wrapper'),
				headerHeight = (header.length) ? header.height() : 0;
		}

		var infoHolderPosition = function() {

			if(info.length) {

				if(mediaHolderHeight > infoHolderHeight) {
					if(mkd.scroll > infoHolderOffset) {
						info.animate({
							marginTop: (mkd.scroll - (infoHolderOffset) + mkdGlobalVars.vars.mkdAddForAdminBar + headerHeight + 20) //20 px is for styling, spacing between header and info holder
						});
					}
				}

			}
		};

		var recalculateInfoHolderPosition = function() {

			if(info.length) {
				if(mediaHolderHeight > infoHolderHeight) {
					if(mkd.scroll > infoHolderOffset) {

						if(mkd.scroll + headerHeight + mkdGlobalVars.vars.mkdAddForAdminBar + infoHolderHeight + 20 < infoHolderOffset + mediaHolderHeight) {    //20 px is for styling, spacing between header and info holder

							//Calculate header height if header appears
							if($('.header-appear, .mkd-fixed-wrapper').length) {
								headerHeight = $('.header-appear, .mkd-fixed-wrapper').height();
							}
							info.stop().animate({
								marginTop: (mkd.scroll - (infoHolderOffset) + mkdGlobalVars.vars.mkdAddForAdminBar + headerHeight + 20) //20 px is for styling, spacing between header and info holder
							});
							//Reset header height
							headerHeight = 0;
						}
						else {
							info.stop().animate({
								marginTop: mediaHolderHeight - infoHolderHeight
							});
						}
					} else {
						info.stop().animate({
							marginTop: 0
						});
					}
				}
			}
		};

		return {

			init: function() {
				if(!mkd.modules.common.mkdIsTouchDevice()) {
					infoHolderPosition();
					$(window).scroll(function() {
						recalculateInfoHolderPosition();
					});
				}
			}

		};

	};

})(jQuery);