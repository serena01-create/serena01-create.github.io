/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var $window = $(window),
        $body = $('body'),
        $main = $('#main');

    // Breakpoints.
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ '361px',   '480px'  ],
        xxsmall:  [ null,      '360px'  ]
    })


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
        $main.scrollex({
            mode: 'top',
            enter: function() { $nav.addClass('alt'); },
            leave: function() { $nav.removeClass('alt'); },
        });

        // Links.
        var $nav_a = $nav.find('a');

        $nav_a.scrolly({
            speed: 1000,
            offset: function() { return $nav.height(); }
        })
        .on('click', function() {
            var $this = $(this);
            if ($this.attr('href').charAt(0) != '#') return;
            $nav_a.removeClass('active').removeClass('active-locked');
            $this.addClass('active').addClass('active-locked');
        })
        .each(function() {
            var $this = $(this),
                id = $this.attr('href'),
                $section = $(id);

            if ($section.length < 1) return;

            $section.scrollex({
                mode: 'middle',
                initialize: function() {
                    if (browser.canUse('transition')) $section.addClass('inactive');
                },
                enter: function() {
                    $section.removeClass('inactive');
                    if ($nav_a.filter('.active-locked').length == 0) {
                        $nav_a.removeClass('active');
                        $this.addClass('active');
                    }
                    else if ($this.hasClass('active-locked'))
                        $this.removeClass('active-locked');
                }
            });
        });
    }

    
    // --- EFFETTO NEON PULSANTI (FUORI DAL BLOCCO PRECEDENTE) ---
    $('.button').on('mousemove', function(e) {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        $(this).css({
            'background': `radial-gradient(circle at ${x}px ${y}px, #a399d6, #8d82c4)`
        });
    }).on('mouseleave', function() {
        $(this).css('background', '');
    });

// --- HEADER INTERATTIVO --- 
   $(document).ready(function() {
    $('#discover-more').on('click', function(e) {
        e.preventDefault(); // Evita il salto immediato

        // 1. Fa sparire il pulsante
        $(this).fadeOut(300);

        // 2. Rimpicciolisce l'header (togliendo la classe full-screen)
        $('#header').removeClass('full-screen');

        // 3. Fa apparire Menu, Contenuto e Footer
        $('#nav, #main, #footer').addClass('show-content');

        // 4. Scroll dolce verso il contenuto bianco
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $("#main").offset().top
            }, 800);
        }, 100);
    });
});

// --- TIP TAP
(function($) {
    var tapInterval;
    var sound = document.getElementById('tap-sound');

    function startDancing() {
        $('.shoes-icon-skill').addClass('dancing');
        if (sound) {
            sound.playbackRate = 0.6;
            sound.play();
            if (!tapInterval) {
                tapInterval = setInterval(function() {
                    sound.currentTime = 0;
                    sound.play();
                }, 800);
            }
        }
    }

    function stopDancing() {
        $('.shoes-icon-skill').removeClass('dancing');
        if (tapInterval) { 
            clearInterval(tapInterval); 
            tapInterval = null; 
        }
        if (sound) { 
            sound.pause(); 
            sound.currentTime = 0; 
        }
    }

    // GESTIONE UNIFICATA
    $(document).on('click touchend', '.shoes-icon-skill', function(e) {
        // Blocca la propagazione e il comportamento di default
        // Questo evita che il browser "clicchi due volte" (touch + click)
        e.preventDefault();
        e.stopPropagation();

        if ($(this).hasClass('dancing')) {
            stopDancing();
        } else {
            startDancing();
        }
    });

    // Per PC: Fermiamo se il mouse esce (opzionale)
    // Aggiungiamo un controllo per non attivarlo su mobile
    $(document).on('mouseleave', '.shoes-icon-skill', function() {
        if (window.matchMedia("(min-width: 1024px)").matches) {
            stopDancing();
        }
    });

})(jQuery);

// Scrolly.
    $('.scrolly').scrolly({
        speed: 2000
    });

    // --- SEZIONE GALLERIE ---
    function moveGallery($container, direction) {
        // Cerchiamo le foto SOLO dentro questa specifica galleria ($container)
        var $photos = $container.find('.photo');
        var $active = $container.find('.photo.active');
        
        // Se per qualche motivo non c'è una foto active, impostiamo la prima
        if ($active.length === 0) {
            $photos.first().addClass('active');
            $active = $container.find('.photo.active');
        }

        var index = $photos.index($active);
        $active.removeClass('active');

        if (direction === 'next') {
            index = (index + 1) % $photos.length;
        } else {
            index = (index - 1 + $photos.length) % $photos.length;
        }

        $photos.eq(index).addClass('active');
    }

    // Gestione CLICK tasto AVANTI
    $(document).on('click', '.btn-next', function(e) {
        e.preventDefault();
        // .prev('.gallery') cerca l'elemento .gallery che sta SUBITO PRIMA del blocco pulsanti
        var $parent = $(this).parent().prev('.gallery'); 
        moveGallery($parent, 'next');
    });

    // Gestione CLICK tasto INDIETRO
    $(document).on('click', '.btn-prev', function(e) {
        e.preventDefault();
        // .prev('.gallery') cerca l'elemento .gallery che sta SUBITO PRIMA del blocco pulsanti
        var $parent = $(this).parent().prev('.gallery');
        moveGallery($parent, 'prev');
    });

    // AUTOPLAY: Sfoglia tutte le gallerie ogni 5 secondi
    var galleryInterval = setInterval(function() { 
        $('.gallery').each(function() {
            var $thisGallery = $(this);
            // Muove solo se la galleria è visibile o esiste
            if ($thisGallery.length > 0) {
                moveGallery($thisGallery, 'next');
            }
        });
    }, 5000); // 5 secondi per renderlo più dinamico


})(jQuery); 


