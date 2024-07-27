/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function($) {
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        settings = {
            parallax: true,
            parallaxFactor: 20
        };

    // Breakpoints.
    breakpoints({
        xlarge:  [ '1281px',  '1800px' ],
        large:   [ '981px',   '1280px' ],
        medium:  [ '737px',   '980px'  ],
        small:   [ '481px',   '736px'  ],
        xsmall:  [ null,      '480px'  ],
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Touch?
    if (browser.mobile) {
        $body.addClass('is-touch');
        window.setTimeout(function() {
            $window.scrollTop($window.scrollTop() + 1);
        }, 0);
    }

    // Footer.
    breakpoints.on('<=medium', function() {
        $footer.insertAfter($main);
    });

    breakpoints.on('>medium', function() {
        $footer.appendTo($header);
    });

    // Header.
    if (browser.name == 'ie' || browser.mobile) {
        settings.parallax = false;
    }

    if (settings.parallax) {
        breakpoints.on('<=medium', function() {
            $window.off('scroll.strata_parallax');
            $header.css('background-position', '');
        });

        breakpoints.on('>medium', function() {
            $header.css('background-position', 'left 0px');
            $window.on('scroll.strata_parallax', function() {
                $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
            });
        });

        $window.on('load', function() {
            $window.triggerHandler('scroll');
        });
    }
	$(document).ready(function() {
		$('.view-gif-btn').on('click', function() {
			var $gifPreview = $(this).closest('.gif-preview');
			var staticImgUrl = $gifPreview.data('static-img');
			var gifUrl = $gifPreview.data('gif');
			
			$.magnificPopup.open({
				items: {
					src: staticImgUrl
				},
				type: 'image',
				callbacks: {
					open: function() {
						console.log('Popup opened');
					},
					imageLoadComplete: function() {
						var $img = this.content.find('img');
						$img.wrap('<div class="mfp-figure-wrapper"></div>');
						$img.after('<button class="load-gif-btn">Load GIF</button>');
						
						$('.load-gif-btn').on('click', function() {
							var $wrapper = $(this).closest('.mfp-figure-wrapper');
							$wrapper.html('<img src="' + gifUrl + '" class="mfp-img">');
							$wrapper.addClass('gif-loaded');
							
							// Adjust popup size for GIF
							var img = new Image();
							img.onload = function() {
								$wrapper.css({
									'width': 'auto',
									'height': 'auto',
									'max-width': '100%',
									'max-height': '100vh'
								});
								$.magnificPopup.instance.updateSize();
							};
							img.src = gifUrl;
						});
					}
				},
				image: {
					verticalFit: true
				},
				mainClass: 'mfp-img-mobile',
				closeOnContentClick: false,
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'auto',
				closeBtnInside: true,
				preloader: false,
				midClick: true,
				removalDelay: 300,
				mainClass: 'my-mfp-zoom-in'
			});
		});
	});

    // Main Sections: Two.
    $window.on('load', function() {
        $('#two').poptrox({
			caption: function($a) { return $a.next('h3').text(); },
			overlayColor: '#2c2c2c',
			overlayOpacity: 0.85,
			popupCloserText: '',
			popupLoaderText: '',
			selector: '.work-item a.gif-lightbox',
			usePopupDefaultStyling: false,
			usePopupEasyClose: false,
			usePopupNav: true,
			usePopupCaption: true,
			popupWidth: null,
			popupHeight: null,
			onPopupOpen: function($popup) {
				var $img = $popup.find('img');
				$img.wrap('<div class="gif-container"></div>');
				var $container = $img.parent();
				$container.append('<div class="play-overlay">Click to play</div>');
				$img.css('cursor', 'pointer');
				
				$container.on('click', function() {
					var $overlay = $(this).find('.play-overlay');
					if ($overlay.is(':visible')) {
						$overlay.hide();
						$img[0].src = $img[0].src; // This will restart the GIF
					} else {
						$overlay.show();
					}
				});
			}
		});
    });
})(jQuery);

