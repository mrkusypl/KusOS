const dlugoscAnimacji = 250;
var oknoIdtoggleOkna = 0;

var zindex = 1;
var oknoXpos = [];
var oknoYpos = [];
var oknoHeight = [];
var oknoWidth = [];

$(document).on('keydown', handleShortcuts);

function wolneId() {
    var idWolne = 0;

    do {
        idWolne = idWolne + 1;
    } while ($("#okno" + idWolne).length === 1);

    return idWolne;
}

function setClickState(name, isEnabled) {
    const pointerEventsValue = isEnabled ? "auto" : "none";
    $(name).css("pointer-events", pointerEventsValue);
}

function closeModal(oknoId, min) {
    const $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
    const $blok = $('[id^="okno' + oknoId + '"]');
    const $context = $('[id^="context-menuOkno' + oknoId + '"]');
    $przycisk.removeClass("pasekprzyciskOnScreen");
    $blok.css({
        "opacity": "0%",
        "transform": "scale(0.9) rotateX(20deg)",
    });
    setClickState($blok, false);
    setTimeout(function () {
        $blok.hide();
        $blok.css({
            "width": "",
            "height": ""
        });
    }, dlugoscAnimacji);
    if (min != 1) {
        setTimeout(function () {
            $przycisk.css({
                "opacity": "0%",
                "transform": "scale(0.9) rotateX(20deg)"
            });
        }, 100);
        $przycisk.empty();
        $przycisk.animate({
            "width": "0"
        }, 200);
        setClickState($przycisk, false);
        setTimeout(function () {
            $przycisk.hide();
        }, dlugoscAnimacji);
    }
    setTimeout(function () {
        $blok.remove();
        $przycisk.remove();
        $context.remove();
    }, dlugoscAnimacji);
}

function handleShortcuts(event) {
    if (event.shiftKey && event.key === 'F4') {
        if (typeof ($(".oknoActive").prop("id")) != "undefined") {
            closeModal(parseInt($(".oknoActive").prop("id").substr($(".oknoActive").prop("id").length - 1)), 0);
            $(".context-menu").hide();
        }
    }
    else if (event.shiftKey && event.key === 'ArrowDown') {
        if (typeof ($(".oknoActive").prop("id")) != "undefined") {
            minimalizujModal(parseInt($(".oknoActive").prop("id").substr($(".oknoActive").prop("id").length - 1)));
            $(".context-menu").hide();
        }
    }
    else if (event.shiftKey && event.key === 'ArrowUp') {
        if (typeof ($(".oknoActive").prop("id")) != "undefined") {
            maksymalizujModal(parseInt($(".oknoActive").prop("id").substr($(".oknoActive").prop("id").length - 1)));
            $(".context-menu").hide();
        }
    }
    else if (event.shiftKey && event.key === 'M') {
        toggleModal();
        $(".context-menu").hide();
    }
    else if (event.key === 'Escape') {
        $(".context-menu").hide();
    }
}

function playSound(nazwa) {
    $("#audio source").attr("src", nazwa);
    $("#audio")[0].load()
    $("#audio")[0].play();
}

function otworzOkno(nazwaJson) {
    $("body").css("cursor", "wait");
    $("body").hide().show(0);

    async function wczytajDaneZJSON() {
        try {
            const response = await fetch(nazwaJson);
            const dane = await response.json();
            return dane;
        } catch (error) {
            oknoIlosc = wolneId();

            playSound("./error.mp3");

            if (error.message.includes('Failed to fetch')) {
                $("body").css("cursor", "auto");
                $("body").hide().show(0);
                $(".loadingNapis").text("Wystąpił błąd krytyczny");
                $(".loading").show();
                $(".loading").css({
                    "opacity": "100%"
                });
            } else {
                const dane = [{
                    "tytul": "Wystąpił błąd",
                    "ikona": "🛑",
                    "resizable": "false",
                    "maximize": "false",
                    "content": "<div class='content'><span class='ikona'>🛑</span>Aplikacja " + nazwaJson + " nie może zostać uruchomiona. Upewnij się, że nazwa programu jest prawidłowa.</div><div class='przyciski'><div id='OK' class='przycisk' onclick='closeModal(" + oknoIlosc + ")'>OK</div></div>"
                }];

                return dane;
            }
        }
    }

    function stworzOkno(dane) {
        const { tytul, ikona, resizable, maximize, content } = dane;
        oknoIlosc = wolneId();

        $(".pasekprzyciski").append("<div class='pasekprzycisk pasekprzyciskOnScreen' id='oknoprzycisk" + oknoIlosc + "' style='order: " + zindex + "; transform: scale(0.9) rotateX(20deg); 'onclick='minimalizujPrzycisk(" + oknoIlosc + ")'>" + ikona + " " + tytul + "</div>");

        var textDane = "<div id='okno" + oknoIlosc + "' class='okno resizable' onmousedown='fokus(" + oknoIlosc + ")' style='opacity: 0; transform: scale(0.9) rotateX(20deg); pointer-events: none; display: none;' resizable='" + resizable + "'><div class='pasek'><div class='pasekNazwa'><div class='pasekIkona'>" + ikona + "</div>" + tytul + "</div><div class='przelaczniki'><div class='button-pasek minimalizuj' title='Minimalizuj' onclick='minimalizujModal(" + oknoIlosc + ")'><svg class='svgpasek' fill='#eeeeee' height='24' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='17' xmlns='http://www.w3.org/2000/svg'><line x1='3' x2='21' y1='21' y2='21'/></svg></div>";
        if (maximize === "true") {
            textDane += "<div class='button-pasek maksymalizuj' title='Maksymalizuj' onclick='maksymalizujModal(" + oknoIlosc + ")'><svg class='svgpasek' fill='none' height='24' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='17' xmlns='http://www.w3.org/2000/svg'><rect height='18' rx='2' ry='2' width='18' x='3' y='3'/></svg></div>";
        }
        textDane += "<div class='button-pasek close' title='Zamnkij' onclick='closeModal(" + oknoIlosc + ", 0)'><svg class='svgpasek' fill='#eeeeee' height='24' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='17' xmlns='http://www.w3.org/2000/svg'><line x1='22' x2='2' y1='3' y2='21'/><line x1='2' x2='22' y1='3' y2='21'/></svg></div></div></div>" + content + "</div>";

        textDane += "<div class='context-menu' id='context-menuOkno" + oknoIlosc + "'><div class='przyciskMenu minimalizujMenu' onclick='minimalizujModal(" + oknoIlosc + ")'><div class='minimalizujTekst'>Minimalizuj</div><div class='shortcut'>Shift + 🡇</div></div>";
        if (maximize === "true") {
            textDane += "<div class='przyciskMenu maksymalizujMenu' onclick='maksymalizujModal(" + oknoIlosc + ")'><div class='maksymalizujTekst'>Maksymalizuj</div><div class='shortcut'>Shift + 🡅</div></div>";
        }

        textDane += "<div class='przyciskMenu' onclick='closeModal(" + oknoIlosc + ", 0)'><div>Zamnkij</div><div class='shortcut'>Shift + F4</div></div></div>";
        $("body").append(textDane);

        $("#okno" + oknoIlosc + " .przyciski #OK").attr("onclick", "closeModal(" + oknoIlosc + ")");
        $(".context-menu").hide();
        openModal(oknoIlosc, 0);
    }

    wczytajDaneZJSON().then((dane) => {
        dane.forEach((okno) => stworzOkno(okno));
    });
}

function dblclickPasek(oknoId) {
    if ($("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").length != 0) {
        if ($("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("onclick").substr(0, 4) === 'maks') {
            maksymalizujModal(oknoId);
        } else {
            przywrocNormalModal(oknoId);
        }
    }
}

function openModal(oknoId, przy) {
    const $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
    const $context = $("#context-menuOkno" + oknoId);
    const $blok = $('[id^="okno' + oknoId + '"]');

    oknoIlosc++;
    $przycisk.addClass("pasekprzyciskOnScreen");

    $przycisk.show();

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var divWidth = $blok.outerWidth();
    var divHeight = $blok.outerHeight();

    var leftValue = (windowWidth - divWidth) / 2;
    var topValue = (windowHeight - divHeight) / 2;

    if (przy == 0) {
        $blok.css({
            "left": leftValue + "px",
            "top": topValue + "px"
        });
        $przycisk.show();
        setClickState($przycisk, true);
        setTimeout(function () {
            $przycisk.css({
                "opacity": "100%",
                "transform": "scale(1) rotateX(0deg)"
            });
        }, 1);
    }
    $blok.show();
    setClickState($blok, true);
    fokus(oknoId);
    setTimeout(function () {
        $blok.css({
            "opacity": "100%",
            "transform": "scale(1) rotateX(0deg)"
        });
    }, 1);

    if ($blok.attr("resizable") == "true") {
        $blok.resizable({
            minHeight: divHeight,
            minWidth: divWidth,
            handles: "n, e, s, w, ne, se, sw, nw",
            autoHide: true
        });
    }
    $("#okno" + oknoId).css("z-index", zindex);

    $(document).ready(function () {
        function showContextMenu(event) {
            event.preventDefault();

            var menuWidth = $context.outerWidth();
            var menuHeight = $context.outerHeight();

            var posX = event.pageX;
            var posY = event.pageY;

            if (posX + menuWidth > $(window).width()) {
                posX -= menuWidth;
            }

            if (posY + menuHeight > $(window).height()) {
                posY -= menuHeight;
            }

            $context.show();
            $context.css({
                "left": posX + "px",
                "top": posY + "px",
            });

            setTimeout(function () {
                $context.css({
                    "opacity": "100%"
                });
            }, 1);
        }

        $("#okno" + oknoId + " .pasek").on("contextmenu", showContextMenu);
        $("#oknoprzycisk" + oknoId).on("contextmenu", showContextMenu);

        $(".przyciskMenu").on("click", function (event) {
            $(".context-menu").hide();
        })

        $("#okno" + oknoId + " .pasek").on("dblclick", function () {
            dblclickPasek(oknoId);
        });
    });

    $(function () {
        $(".okno").draggable({ handle: ".pasek", cancel: ".button-pasek", scroll: false });
    });

    $("body").css("cursor", "auto");
    $("body").hide().show(0);
}

function toggleModal(oknoId, callback) {
    const $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');

    if (callback) {
        $przycisk.attr("onclick", callback);
    }
}

function przywrocModal(oknoId) {
    if (typeof oknoId === 'undefined') {
        $('[id^="oknoprzycisk"]').each(function () {
            oknoIdtoggleOkna = parseInt(this.id.substr(this.id.length - 1, 1));
            przywrocOkno(oknoIdtoggleOkna);
        });
    } else {
        przywrocOkno(oknoId);
    }
}

function przywrocOkno(oknoId) {
    const $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
    const $blok = $('[id^="okno' + oknoId + '"]');

    setClickState($przycisk, false);
    fokus(oknoId);

    if ($("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("onclick") != undefined) {
        if ($("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("onclick").substr(0, 4) === 'maks') {
            $blok.animate({
                left: oknoXpos[oknoId] + "px",
                top: oknoYpos[oknoId] + "px"
            }, dlugoscAnimacji);
        } else {
            $blok.css({
                left: 0,
                top: $(".pulpit").position().top
            })
        }
    } else {
        $blok.animate({
            left: oknoXpos[oknoId] + "px",
            top: oknoYpos[oknoId] + "px"
        }, dlugoscAnimacji);
    }

    $blok.show();
    setClickState($blok, true);
    $przycisk.addClass("pasekprzyciskOnScreen");
    setTimeout(function () {
        $blok.css({
            "opacity": "100%",
            "transform": "scale(1) rotateX(0deg)"
        });
    }, 1);
    toggleModal(oknoId, "minimalizujPrzycisk(" + oknoId + ")");

    setTimeout(function () {
        setClickState($przycisk, true);
    }, dlugoscAnimacji);

    $("#context-menuOkno" + oknoId + " .minimalizujMenu").attr("onclick", "minimalizujModal(" + oknoId + ");");
    $("#context-menuOkno" + oknoId + " .minimalizujMenu .minimalizujTekst").text("Minimalizuj");
    $("#context-menuOkno" + oknoId + " .minimalizujMenu .shortcut").text("Shift + 🡇");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu").show();
}

function minimalizujModal(oknoId) {
    if (typeof oknoId === 'undefined') {
        $('[id^="okno"].pasekprzyciskOnScreen').each(function () {
            oknoIdtoggleOkna = parseInt(this.id.substr(this.id.length - 1, 1));
            minimalizujOkno(oknoIdtoggleOkna);
        });
    } else {
        minimalizujOkno(oknoId);
    }
}

function minimalizujOkno(oknoId) {
    var $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
    var $blok = $('[id^="okno' + oknoId + '"]');

    setClickState($przycisk, false);

    if ($("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("onclick") != undefined) {
        if ($("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("onclick").substr(0, 4) === 'maks') {
            oknoXpos[oknoId] = $blok.position().left;
            oknoYpos[oknoId] = $blok.position().top;
        }
    } else {
        oknoXpos[oknoId] = $blok.position().left;
        oknoYpos[oknoId] = $blok.position().top;
    }

    $blok.animate({
        left: $przycisk.position().left + ($przycisk.width()/2) - ($blok.width()/2) + "px",
        top: $(".pasekzadan").position().top + "px",
    }, dlugoscAnimacji);
    $blok.css({
        "opacity": "0%",
        "transform": "scale(0.5)"
    });
    $blok.removeClass("oknoActive");
    $przycisk.removeClass("pasekprzyciskActive");
    $przycisk.removeClass("pasekprzyciskOnScreen");
    setClickState($blok, false);
    setTimeout(function () {
        $blok.hide();
    }, dlugoscAnimacji);
    toggleModal(oknoId, "przywrocPrzycisk(" + oknoId + ")");

    setTimeout(function () {
        setClickState($przycisk, true);
    }, dlugoscAnimacji);

    $("#context-menuOkno" + oknoId + " .minimalizujMenu").attr("onclick", "przywrocModal(" + oknoId + ");");
    $("#context-menuOkno" + oknoId + " .minimalizujMenu .minimalizujTekst").text("Przywróć");
    $("#context-menuOkno" + oknoId + " .minimalizujMenu .shortcut").text("");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu").hide();
}

function maksymalizujModal(oknoId) {
    var $blok = $('[id^="okno' + oknoId + '"]');
    oknoXpos[oknoId] = $blok.position().left;
    oknoYpos[oknoId] = $blok.position().top;
    oknoHeight[oknoId] = $blok.height();
    oknoWidth[oknoId] = $blok.width();

    $blok.animate({
        left: 0,
        top: $(".pulpit").position().top,
        width: $("body").width() - 2 + "px",
        height: $("body").height() - 52 + "px"
    }, dlugoscAnimacji);

    $("#okno" + oknoId + " .pasek").css({
        "border-radius": "0"
    });
    $blok.css({
        "border-radius": "0"
    });

    $blok.draggable("disable");
    $blok.resizable("disable");

    $("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("onclick", "przywrocNormalModal(" + oknoId + ");");
    $("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("title", "Przywróć");

    $("#context-menuOkno" + oknoId + " .maksymalizujMenu").attr("onclick", "przywrocNormalModal(" + oknoId + ");");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu .maksymalizujTekst").text("Przywróć");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu .shortcut").text("");

    $("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj svg").html("<rect height='13' rx='2' ry='2' width='13' x='9' y='9'/><path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/>");
}

function przywrocNormalModal(oknoId) {
    var $blok = $('[id^="okno' + oknoId + '"]');

    $blok.animate({
        left: oknoXpos[oknoId],
        top: oknoYpos[oknoId],
        width: oknoWidth[oknoId],
        height: oknoHeight[oknoId]
    }, dlugoscAnimacji);

    $("#okno" + oknoId + " .pasek").css({
        "border-radius": ""
    });
    $blok.css({
        "border-radius": ""
    });

    $blok.draggable("enable");
    $blok.resizable("enable");

    $("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("onclick", "maksymalizujModal(" + oknoId + ");");
    $("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("title", "Maksymalizuj");

    $("#context-menuOkno" + oknoId + " .maksymalizujMenu").attr("onclick", "maksymalizujModal(" + oknoId + ");");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu .maksymalizujTekst").text("Maksymalizuj");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu .shortcut").text("Shift + 🡅");

    $("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj svg").html("<rect height='18' rx='2' ry='2' width='18' x='3' y='3'/>");

}

function minimalizujPrzycisk(oknoId) {
    const $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
    const $blok = $('[id^="okno' + oknoId + '"]');

    if ($blok.css("z-index") == zindex - 1) {
        minimalizujModal(oknoId);
        $przycisk.removeClass("pasekprzyciskOnScreen");
        toggleModal(oknoId, "przywrocPrzycisk(" + oknoId + ")");
        fokus(oknoId);
        $(".pasekprzycisk").removeClass("pasekprzyciskActive");
    } else {
        fokus(oknoId);
        $(".pasekprzycisk").removeClass("pasekprzyciskActive");
        $("#oknoprzycisk" + oknoId).addClass("pasekprzyciskActive");
    }
}

function przywrocPrzycisk(oknoId) {
    const $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
    const $blok = $('[id^="okno' + oknoId + '"]');

    przywrocModal(oknoId);
    $przycisk.addClass("pasekprzyciskOnScreen");
    toggleModal(oknoId, "minimalizujPrzycisk(" + oknoId + ")");
}

$(document).ready(function () {
    $(document).on('contextmenu', function (e) {
        e.preventDefault();
    });
    otworzOkno("ustawienia.app");
});

$(window).on('load', function () {
    $(".loading").css({
        "opacity": "0%"
    });
    setTimeout(function () {
        $(".loading").hide();
    }, 200);
});

function toggleOkna() {
    if ($(".pasekprzyciskOnScreen").length != 0) {
        minimalizujModal();
    } else {
        przywrocModal();
    }
}

function lightMode() {
    $('body').toggleClass('light');
}

function fokus(oknoId) {
    zindex += 1;
    $(".pasek").addClass("pasekBlur");
    $(".okno").removeClass("oknoActive");
    $(".pasekprzycisk").removeClass("pasekprzyciskActive");
    if (oknoId != 0) {
        $("#okno" + oknoId).css("z-index", zindex);
        $("#okno" + oknoId + " .pasek").removeClass("pasekBlur");
        $("#okno" + oknoId).addClass("oknoActive");
        $("#oknoprzycisk" + oknoId).addClass("pasekprzyciskActive");
    }
    else if (oknoId != -1) {
        $(".pasekzadan").css("z-index", zindex);
    }
}

$(document).ready(function () {
    $(".pulpit").on("contextmenu", function (event) {
        event.preventDefault();

        var menu = $("#context-menuPulpit");
        var menuWidth = menu.outerWidth();
        var menuHeight = menu.outerHeight();

        var posX = event.pageX;
        var posY = event.pageY;

        // Dostosuj pozycję X, aby kursor był w lewym lub prawym rogu menu
        if (posX + menuWidth > $(window).width()) {
            posX -= menuWidth;
        }

        // Dostosuj pozycję Y, aby kursor był w górnym lub dolnym rogu menu
        if (posY + menuHeight > $(window).height()) {
            posY -= menuHeight;
        }

        setTimeout(function () {
            $(".context-menu").css({
                "opacity": "0%"
            });
        }, 1);

        $(".context-menu").hide();

        menu.show();
        menu.css({
            "left": posX + "px",
            "top": posY + "px",
        });

        setTimeout(function () {
            menu.css({
                "opacity": "100%"
            });
        }, 1);
    });

    $(document).on("mousedown", function (event) {
        if (!$(event.target).closest(".context-menu").length) {
            setTimeout(function () {
                $(".context-menu").css({
                    "opacity": "0%"
                });
            }, 1);

            $(".context-menu").hide();
        }
    });

    async function aktualizujDateGodzine() {
        var teraz = new Date();

        var godzina = teraz.getHours();
        var godzinaKat = (360 / 12 * godzina) + 90;
        $("#hour").css("transform", "rotate(" + godzinaKat + "deg)");
        godzina = (godzina < 10 ? "0" : "") + godzina;

        var minuta = teraz.getMinutes();
        var minutaKat = 360 / 60 * minuta + 90;
        $("#minute").css("transform", "rotate(" + minutaKat + "deg)");
        minuta = (minuta < 10 ? "0" : "") + minuta;

        var sekunda = teraz.getSeconds();
        var sekundaKat = 360 / 60 * sekunda + 90;
        $("#second").css("transform", "rotate(" + sekundaKat + "deg)");
        sekunda = (sekunda < 10 ? "0" : "") + sekunda;

        var dzien = teraz.getDate();
        dzien = (dzien < 10 ? "0" : "") + dzien;

        var miesiac = teraz.getMonth() + 1;
        miesiac = (miesiac < 10 ? "0" : "") + miesiac;

        var rok = teraz.getFullYear();

        var godzinaElement = $("#godzina");
        var dataElement = $("#data");
        var czasElement = $(".czas");

        godzinaElement.text(godzina + ":" + minuta + ":" + sekunda);
        dataElement.text(dzien + "." + miesiac + "." + rok);

        function ustawAtrybutTitle() {
            var dniTygodnia = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
            var dzienTygodnia = dniTygodnia[teraz.getDay()];
            var pelnaData = dzienTygodnia + ', ' + dzien + ' ' + nazwaMiesiaca(miesiac) + ' ' + rok;
            czasElement.attr("title", pelnaData);
        }
    
        function nazwaMiesiaca(miesiac) {
            var nazwyMiesiecy = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
            return nazwyMiesiecy[miesiac - 1];
        }

        ustawAtrybutTitle();
    }

    setInterval(aktualizujDateGodzine, 1000);
    $(document).ready(function () {
        aktualizujDateGodzine();
    });

    $("#audio")[0].volume = 0.1;
});

function pasekPozycja() {
    var pasekzadan = $(".pasekzadan");
    var pulpit = $(".pulpit");

    var czyZamienione = pasekzadan.next().attr("class") === "pulpit";

    if (czyZamienione) {
        pulpit.after(pasekzadan);
    } else {
        pasekzadan.after(pulpit);
    }

    $('[id^="oknoprzycisk"]').each(function () {
        oknoId = parseInt(this.id.substr(this.id.length - 1, 1));

        var $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
        var $blok = $('[id^="okno' + oknoId + '"]');
        
        if(!$("#oknoprzycisk" + oknoId).hasClass("pasekprzyciskOnScreen")) {
            $blok.css({
                left: $przycisk.position().left + ($przycisk.width()/2) - ($blok.width()/2) + "px",
                top: $(".pasekzadan").position().top + "px",
            });
        }
    });
}

function zegarAnalogowy() {
    $("#clock").toggle();
}