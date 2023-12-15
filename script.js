const dlugoscAnimacji = 250;

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
        closeModal(parseInt($(".oknoActive").prop("id").substr($(".oknoActive").prop("id").length - 1)), 0);
        $(".context-menu").hide();
    }

    else if (event.shiftKey && event.key === 'M') {
        minimalizujModal(parseInt($(".oknoActive").prop("id").substr($(".oknoActive").prop("id").length - 1)));
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
            }
            else {
                $(".pasekprzyciski").append("<div class='pasekprzycisk pasekprzyciskOnScreen' id='oknoprzycisk" + oknoIlosc + "' style='order: " + zindex + "; transform: scale(0.9) rotateX(20deg); 'onclick='minimalizujPrzycisk(" + oknoIlosc + ")'>🛑 Wystąpił błąd</div>");
                $(".powiadomienie").before("<div id='okno" + oknoIlosc + "' class='okno resizable' onmousedown='fokus(" + oknoIlosc + ")' style='opacity: 0; transform: scale(0.9) rotateX(20deg); pointer-events: none; display: none;'><div class='pasek'><div class='pasekNazwa'><div class='pasekIkona'>🛑</div> Wystąpił błąd</div><div class='przelaczniki'><div class='button-pasek minimalizuj' title='Minimalizuj' onclick='minimalizujModal(" + oknoIlosc + ")'>_</div><div class='button-pasek close' title='Zamnkij' onclick='closeModal(" + oknoIlosc + ", 0)'>⨉</div></div></div><div class='content'><span class='ikona'>🛑</span>Aplikacja " + nazwaJson + " nie może zostać uruchomiona. Upewnij się, że nazwa programu jest prawidłowa.</div><div class='przyciski'><div id='OK' class='przycisk' onclick='closeModal(" + oknoIlosc + ")'>OK</div></div></div>");
                $(".powiadomienie").before("<div class='context-menu' id='context-menuOkno" + oknoIlosc + "'><div class='przyciskMenu' onclick='minimalizujModal(" + oknoIlosc + ")'><div>Minimalizuj</div><div class='shortcut'>Shift + M</div></div><div class='przyciskMenu' onclick='closeModal(" + oknoIlosc + ", 0)'><div>Zamnkij</div><div class='shortcut'>Shift + F4</div></div></div>");

                $("#okno" + oknoIlosc + " .przyciski #OK").attr("onclick", "closeModal(" + oknoIlosc + ")");
                $(".context-menu").hide();
                openModal(oknoIlosc, 0);
            }
        }
    }

    function stworzOkno(dane) {
        const { tytul, ikona, resizable, content } = dane;
        oknoIlosc = wolneId();

        $(".pasekprzyciski").append("<div class='pasekprzycisk pasekprzyciskOnScreen' id='oknoprzycisk" + oknoIlosc + "' style='order: " + zindex + "; transform: scale(0.9) rotateX(20deg); 'onclick='minimalizujPrzycisk(" + oknoIlosc + ")'>" + ikona + " " + tytul + "</div>");
        $(".powiadomienie").before("<div id='okno" + oknoIlosc + "' class='okno resizable' onmousedown='fokus(" + oknoIlosc + ")' style='opacity: 0; transform: scale(0.9) rotateX(20deg); pointer-events: none; display: none;' resizable='" + resizable + "'><div class='pasek'><div class='pasekNazwa'><div class='pasekIkona'>" + ikona + "</div>" + tytul + "</div><div class='przelaczniki'><div class='button-pasek minimalizuj' title='Minimalizuj' onclick='minimalizujModal(" + oknoIlosc + ")'>_</div><div class='button-pasek maksymalizuj' title='Maksymalizuj' onclick='maksymalizujModal(" + oknoIlosc + ")'>🗖</div><div class='button-pasek close' title='Zamnkij' onclick='closeModal(" + oknoIlosc + ", 0)'>⨉</div></div></div>" + content + "</div>");
        $(".powiadomienie").before("<div class='context-menu' id='context-menuOkno" + oknoIlosc + "'><div class='przyciskMenu' onclick='minimalizujModal(" + oknoIlosc + ")'><div>Minimalizuj</div><div class='shortcut'>Shift + M</div></div><div class='przyciskMenu' onclick='closeModal(" + oknoIlosc + ", 0)'><div>Zamnkij</div><div class='shortcut'>Shift + F4</div></div></div>");

        $("#okno" + oknoIlosc + " .przyciski #OK").attr("onclick", "closeModal(" + oknoIlosc + ")");
        $(".context-menu").hide();
        openModal(oknoIlosc, 0);
    }

    wczytajDaneZJSON().then((dane) => {
        dane.forEach((okno) => stworzOkno(okno));
    });
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
            "left": leftValue,
            "top": topValue
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
        $(".pasek").on("contextmenu", function (event) {
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
        });

        $(".przyciskMenu").on("click", function (event) {
            $(".context-menu").hide();
        })

        $("#okno" + oknoId + " .pasek").on("dblclick", function () {
            maksymalizujModal(oknoId);
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
        var oknoIdtoggleOkna = 1;
        $('[id^="okno"]').each(function () {
            przywrocOkno(oknoIdtoggleOkna);
            oknoIdtoggleOkna++;
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
    $blok.animate({
        left: oknoXpos[oknoId],
        top: oknoYpos[oknoId]
    }, dlugoscAnimacji);
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
}

function minimalizujModal(oknoId) {
    if (typeof oknoId === 'undefined') {
        var oknoIdtoggleOkna = 1;
        $('[id^="okno"].pasekprzyciskOnScreen').each(function () {
            minimalizujOkno(oknoIdtoggleOkna);
            oknoIdtoggleOkna++;
        });
    } else {
        minimalizujOkno(oknoId);
    }
}

function minimalizujOkno(oknoId) {
    var $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
    var $blok = $('[id^="okno' + oknoId + '"]');

    setClickState($przycisk, false);

    oknoXpos[oknoId] = $blok.position().left;
    oknoYpos[oknoId] = $blok.position().top;

    $blok.animate({
        left: $przycisk.position().left,
        top: 0
    }, dlugoscAnimacji);
    $blok.css({
        "opacity": "0%",
        "transform": "scale(0.5)"
    });
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
}

function maksymalizujModal(oknoId) {
    var $blok = $('[id^="okno' + oknoId + '"]');
    oknoXpos[oknoId] = $blok.position().left;
    oknoYpos[oknoId] = $blok.position().top;
    oknoHeight[oknoId] = $blok.width();
    oknoWidth[oknoId] = $blok.height();

    $blok.animate({
        left: 0,
        top: "50px",
        width: "100%",
        height: screen.height - 50
    }, 50);

    $("#okno" + oknoId + " .pasek").css({
        "border-radius": "0"
    });
    $blok.css({
        "border-radius": "0"
    });
    
    toggleModal(oknoId, "przywrocPrzycisk(" + oknoId + ")");
    $blok.draggable("disable");
    $blok.resizable("disable");

    $("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj").attr("onclick", "przywrocNormalModal(" + oknoId +");")
}

function przywrocNormalModal(oknoId) {
    console.log("jebac kurwy");
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
    }
    else {
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
    otworzOkno("ustawienia.json");
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
    }
    else {
        przywrocModal();
    }
}

function lightMode() {
    $('body').toggleClass('light');
    showNotification();
}

function showNotification() {
    var notification = $("#powiadomienie");
    notification.slideDown().delay(2000).slideUp();
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
        godzina = (godzina < 10 ? "0" : "") + godzina;

        var minuta = teraz.getMinutes();
        minuta = (minuta < 10 ? "0" : "") + minuta;

        var sekunda = teraz.getSeconds();
        sekunda = (sekunda < 10 ? "0" : "") + sekunda;

        var dzien = teraz.getDate();
        dzien = (dzien < 10 ? "0" : "") + dzien;

        var miesiac = teraz.getMonth() + 1;
        miesiac = (miesiac < 10 ? "0" : "") + miesiac;

        var rok = teraz.getFullYear();

        var godzinaElement = $("#godzina");
        var dataElement = $("#data");

        godzinaElement.text(godzina + ":" + minuta + ":" + sekunda);
        dataElement.text(dzien + "." + miesiac + "." + rok);
    }

    setInterval(aktualizujDateGodzine, 1000);
    $(document).ready(function () {
        aktualizujDateGodzine();
    });

    $("#audio")[0].volume = 0.1;
});