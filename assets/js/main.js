/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');
})
	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
	$('.scrolly').scrolly({
    speed: 2000
});

$(function() {
    function moveGallery($container, direction) {
        var $photos = $container.find('.photo');
        var $active = $container.find('.photo.active');
        var index = $photos.index($active);

        $active.removeClass('active');

        if (direction === 'next') {
            index = (index + 1) % $photos.length;
        } else {
            index = (index - 1 + $photos.length) % $photos.length;
        }

        $photos.eq(index).addClass('active');
        console.log("Cambiata foto a: " + index + " nella galleria: " + $container.attr('id'));
    }

    // Gestione CLICK (Cerca le CLASSI .btn-next e .btn-prev)
    $(document).on('click', '.btn-next', function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.gallery-container');
        moveGallery($parent, 'next');
    });

    $(document).on('click', '.btn-prev', function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.gallery-container');
        moveGallery($parent, 'prev');
    });

    // Autoplay
    setInterval(function() { 
        if($('#gallery1').length) moveGallery($('#gallery1'), 'next'); 
    }, 7500);
    
    setInterval(function() { 
        if($('#gallery2').length) moveGallery($('#gallery2'), 'next'); 
    }, 7500);
});