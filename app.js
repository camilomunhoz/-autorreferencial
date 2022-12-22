$(function() {

    setTimeout(() => $('#content').css({
        opacity: 1,
        transform: 'translateY(0)'
    }), 200);

    $('.raffle').on('click', exec);
    $('.reload').on('click', bootBoxes);

    function bootBoxes() {
        $('.chosen').empty();
        $('.boxes').empty();
        $('.vignette').remove();

        let items = [
            ['Futebol', 'fa-solid fa-futbol'],
            ['Vôlei', 'fa-solid fa-volleyball'],
                // ['Atletismo', 'fa-solid fa-person-running'],
            ['Tênis de Mesa', 'fa-solid fa-table-tennis'],
                // ['Capoeira', 'fa-solid fa-user-ninja'],
            ['Jogos Eletrônicos', 'fa-solid fa-gamepad'],
            ['Design', 'fa-solid fa-swatchbook'],
            ['Modelagem 3D', 'fa-solid fa-cubes'],
                // ['Motion Design', 'fa-solid fa-explosion'],
                // ['Crochê', 'fa-solid fa-certificate'],
                // ['Manwha', 'fa-solid fa-user-n'],
            ['Séries, Filmes, Animes', 'fa-solid fa-tv'],
            ['Bicicleta', 'fa-solid fa-person-biking'],
            ['Programação', 'fa-solid fa-code'],
                // ['Pen Spinning', 'fa-solid fa-pen'],
                // ['Física', 'fa-solid fa-satellite'],
                // ['Matemática', 'fa-solid fa-square-root-alt'],
            ['Música e Instrumentos', 'fa-solid fa-music'],
            ['Cubo Mágico', 'fa-solid fa-cube'],
            ['Desenho', 'fa-solid fa-pen-ruler'],
            ['Leitura', 'fa-solid fa-book'],
            ['Contato com a natureza', 'fa-solid fa-tree'],
                // ['Colecionar alguma coisa', 'fa-solid fa-th'],
            ['Cozinhar', 'fa-solid fa-kitchen-set'],
            ['Academia', 'fa-solid fa-dumbbell'],
        ].sort(() => Math.random() - 0.5);

        let row = null;
        const qty = Math.sqrt(items.length);

        for (let i = 0; i < items.length; i++)
        {
            if (i % qty === 0) {
                row = $('<tr/>');
            }

            const term   = items[i][0];
            const faicon = items[i][1];

            const box = $('<div/>', {
                class: 'box',
                'data-term': term,
            }).append($('<span/>', {class: `icon ${faicon}`}));

            row.append($('<td/>').append(box));

            if (i % qty === 0) {
                $('.boxes').append(row);
            }
        }

        $('.box').each(function() {
            const size = randomIntFromInterval(50, 100);
            $(this).css({
                height: size,
                width: size,
                fontSize: size,
            });
            $(this).on('mouseenter', function() {
                $('.chosen').html($(this).data('term'));
            });
            $(this).on('mouseleave', function() {
                $('.chosen').html(null);
                $('.chosen').html($('.active').data('term'));
            });
            $(this).on('click', function() {
                $(this).hide(200);

                setTimeout(() => {
                    $(this).remove();
                    if (!$('.box').length) bootBoxes();
                    $('.chosen').empty();
                }, 200);
            });
        });

        $('body').prepend($('<div/>',{class:'vignette'}));
    };

    bootBoxes();

    let timeout = 0;
    const sleep = ms => new Promise(_ => setTimeout(_, ms));

    async function exec() {
        $(this).off('click');
        do {
            await sleep(timeout);
            timeout += 50;
            $('.box').css('background', 'none').removeClass('active');

            let box = $($('.box').sort(() => Math.random() - 0.5)[0])
                .addClass('active');

            $('.chosen').html(box.data('term'));
        } while (timeout < 700);
        timeout = 0;
        $(this).on('click', exec);
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const cursor = $('.cursor');

    const moveCursor = e => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        const half = parseInt(cursor.css('width'))/2;
        cursor.show();
        cursor.css('transform', `translate3d(${mouseX-half}px, ${mouseY-half}px, 0)`);
    }
    window.addEventListener('mousemove', moveCursor)

    $('.btn--f11').on('click', toggleFullScreen)

    $('.btn--about').on('click', function() {
        $('#about').fadeIn(200).css('display', 'flex');
        $('body').css('cursor', 'default');
        $(this).css('animation', 'none');
    });

    $('.btn--actions').on('click', function() {
        if ($('.actions').is(':visible')) {
            $(this).html('<i class="fa fa-bars"></i>');
            $('.actions').slideUp(200);
        } else {
            $(this).html('<i class="fa fa-times"></i>');
            $('.actions').slideDown(200);
            // $('.actions, .btn--actions').css('transform', 'translateY(-50px)');
        }
    });

    $('#about .x').on('click', () => {
        $('#about').fadeOut(200);
        $('body').css('cursor', 'none');
    });

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    // $('.btn--about').click();
});