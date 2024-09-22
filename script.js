build = "v 1.0 Final Version";

const dlugoscAnimacji = 250;
var oknoIdtoggleOkna = 0;
let debounceTimer = null;
var czyZaladowane = false;
var czyAnimacja = false;

var zindex = 1;
var oknoXpos = [];
var oknoYpos = [];
var oknoHeight = [];
var oknoWidth = [];
var oknoContent = [];

$(document).on('keydown', handleShortcuts);

function wolneId() {
    let idWolne = 1;

    while ($("#okno" + idWolne).length === 1) {
        idWolne++;
    }

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

    delete oknoContent[oknoId];
    $przycisk.removeClass("pasekprzyciskOnScreen");
    $blok.css({
        "opacity": "0%",
        "transform": "scale(0.9) rotateX(20deg)",
    });
    setClickState($blok, false);

    setTimeout(() => {
        $blok.hide().css({
            "width": "",
            "height": ""
        });
    }, dlugoscAnimacji);

    if (min != 1) {
        setTimeout(() => {
            $przycisk.css({
                "transform": "scale(0.9) rotateX(20deg)"
            });
        }, 100);
        $przycisk.empty().animate({
            "width": "0"
        }, 200, () => {
            $przycisk.hide();
        });
        setClickState($przycisk, false);
    }

    setTimeout(() => {
        $blok.add($przycisk).add($context).remove();
    }, dlugoscAnimacji);
}

function handleShortcuts(event) {
    const activeElement = document.activeElement;
    const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

    const oknoActiveId = $(".oknoActive").prop("id");

    if (event.shiftKey && event.key === 'F4' && typeof oknoActiveId !== "undefined") {
        closeModal(parseInt(oknoActiveId.substr(oknoActiveId.length - 1)), 0);
        $(".context-menu").hide();
    }
    else if (event.shiftKey && event.key === 'ArrowDown' && typeof oknoActiveId !== "undefined") {
        minimalizujModal(parseInt(oknoActiveId.substr(oknoActiveId.length - 1)));
        $(".context-menu").hide();
    }
    else if (event.shiftKey && event.key === 'ArrowUp' && typeof oknoActiveId !== "undefined" && $(".oknoActive").attr("resizable") !== "false" && $(".oknoActive").hasClass("minimized")) {
        maksymalizujModal(parseInt(oknoActiveId.substr(oknoActiveId.length - 1)));
        $(".context-menu").hide();
    }

    if (isInput) {
        return;
    }
    else if (event.shiftKey && event.key.toLowerCase() === 'm') {
        if (!debounceTimer) {
            toggleOkna();
            debounceTimer = setTimeout(() => {
                debounceTimer = null;
            }, dlugoscAnimacji);
        }
        $(".context-menu").hide();
    }
    else if (event.key === 'Escape') {
        $(".context-menu").hide();
    }
}

function playSound(nazwa) {
    $("#audio source").attr("src", nazwa);
    $("#audio")[0].load();
    $("#audio")[0].play();
}

function stworzOkno(dane) {
    var { tytul, ikona, resizable, content } = dane;
    oknoIlosc = wolneId();

    oknoContent[oknoIlosc] = content + tytul + resizable;
    content = content.replace("oknoIlosc", oknoIlosc);

    $(".pasekprzyciski").append("<div class='pasekprzycisk pasekprzyciskOnScreen' id='oknoprzycisk" + oknoIlosc + "' style='transform: scale(0.9) rotateX(20deg); 'onclick='minimalizujPrzycisk(" + oknoIlosc + ")'>" + ikona + " " + tytul + "</div>");

    $(document).ready(() => {
        $(".pasekprzyciski").sortable({
            axis: "x",
            containment: ".pasekprzyciski",
            tolerance: "pointer",
            revert: 50,
            update: (event, ui) => {
                var changedItem = ui.item;
                var newIndex = changedItem.index();
            },
        });

        $(".przycisk").disableSelection();
    });
    var textDane = "<div id='okno" + oknoIlosc + "' class='okno resizable minimized' onmousedown='fokus(" + oknoIlosc + ")' style='opacity: 0; transform: scale(0.9) rotateX(20deg); pointer-events: none; display: none;' resizable='" + resizable + "'><div class='pasek'><div class='pasekNazwa'><div class='pasekIkona'>" + ikona + "</div>" + tytul + "</div><div class='przelaczniki'><div class='button-pasek minimalizuj' title='Minimalizuj' onclick='minimalizujModal(" + oknoIlosc + ")'><svg class='svgpasek' fill='#eeeeee' height='24' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='17' xmlns='http://www.w3.org/2000/svg'><line x1='3' x2='21' y1='21' y2='21'/></svg></div>";
    if (resizable === "true") {
        textDane += "<div class='button-pasek maksymalizuj' title='Maksymalizuj' onclick='maksymalizujModal(" + oknoIlosc + ")'><svg class='svgpasek' fill='none' height='24' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='17' xmlns='http://www.w3.org/2000/svg'><rect height='18' rx='2' ry='2' width='18' x='3' y='3'/></svg></div>";
    }
    textDane += "<div class='button-pasek close' title='Zamnkij' onclick='closeModal(" + oknoIlosc + ", 0)'><svg class='svgpasek' fill='#eeeeee' height='24' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='17' xmlns='http://www.w3.org/2000/svg'><line x1='22' x2='2' y1='3' y2='21'/><line x1='2' x2='22' y1='3' y2='21'/></svg></div></div></div>" + content + "</div>";

    textDane += "<div class='context-menu' id='context-menuOkno" + oknoIlosc + "'><div class='przyciskMenu minimalizujMenu' onclick='minimalizujModal(" + oknoIlosc + ")'><div class='minimalizujTekst'>Minimalizuj</div><div class='shortcut'>Shift + 🡇</div></div>";
    if (resizable === "true") {
        textDane += "<div class='przyciskMenu maksymalizujMenu' onclick='maksymalizujModal(" + oknoIlosc + ")'><div class='maksymalizujTekst'>Maksymalizuj</div><div class='shortcut'>Shift + 🡅</div></div>";
    }

    textDane += "<div class='przyciskMenu' onclick='closeModal(" + oknoIlosc + ", 0)'><div>Zamnkij</div><div class='shortcut'>Shift + F4</div></div></div>";
    $("body").append(textDane);

    $("#okno" + oknoIlosc + " .przyciski #OK").attr("onclick", "closeModal(" + oknoIlosc + ")");
    $(".context-menu").hide();
    openModal(oknoIlosc, 0);
}

function otworzOkno(nazwaYAML) {
    $("body").css("cursor", "wait");
    $("body").hide().show(0);

    async function wczytajDaneZYAML() {
        try {
            const response = await fetch(nazwaYAML);
            const yamlText = await response.text();

            const yamlData = jsyaml.load(yamlText);

            if (typeof (yamlData) === "object") {
                return yamlData;
            } else {
                return blad;
            }

        } catch (error) {
            oknoIlosc = wolneId();
            playSound("./error.mp3");

            if (error.message.includes('Failed to fetch')) {
                $("body").css("cursor", "auto");
                $("body").hide().show(0);
                $(".loadingNapis").text("Wystąpił błąd krytyczny");
                $(".loading-blad").show();
                $(".loading-blad").css({
                    "opacity": "100%"
                });
            } else {
                const dane = [{
                    "tytul": "Wystąpił błąd",
                    "ikona": "🛑",
                    "resizable": "false",
                    "content": "<div class='content'><span class='ikona'>🛑</span>Aplikacja " + nazwaYAML + " nie może zostać uruchomiona. Upewnij się, że nazwa programu jest prawidłowa i spróbuj ponownie.</div><div class='przyciski'><div id='OK' class='przycisk' onclick='closeModal(" + oknoIlosc + ")'>OK</div></div>"
                }];

                return dane;
            }
        }
    }

    wczytajDaneZYAML().then((dane) => {
        dane.forEach((okno) => {
            oknoId = $.inArray(dane[0].content + dane[0].tytul + dane[0].resizable, oknoContent);

            if (oknoId === -1) {
                stworzOkno(okno);
            } else {
                if ($("#oknoprzycisk" + oknoId).hasClass("pasekprzyciskOnScreen")) {
                    fokus(oknoId);
                } else {
                    przywrocModal(oknoId);
                }

                $("body").css("cursor", "auto");
                $("body").hide().show(0);
            }
        });
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
        setTimeout(() => {
            $przycisk.css({
                "opacity": "100%",
                "transform": "scale(1) rotateX(0deg)"
            });
        }, 1);
    }
    $blok.show();
    setClickState($blok, true);
    fokus(oknoId);
    setTimeout(() => {
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

    $(document).ready(() => {
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

            setTimeout(() => {
                $context.css({
                    "opacity": "100%"
                });
            }, 1);
        }

        $("#okno" + oknoId + " .pasek").on("contextmenu", showContextMenu);
        $("#oknoprzycisk" + oknoId).on("contextmenu", showContextMenu);

        $(".przyciskMenu").on("click", (event) => {
            $(".context-menu").hide();
        })

        $("#okno" + oknoId + " .pasek").on("dblclick", () => {
            dblclickPasek(oknoId);
        });
    });

    $(() => {
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
    setTimeout(() => {
        $blok.css({
            "opacity": "100%",
            "transform": "scale(1) rotateX(0deg)"
        });
    }, 1);
    toggleModal(oknoId, "minimalizujPrzycisk(" + oknoId + ")");

    setTimeout(() => {
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
        left: $przycisk.position().left + ($przycisk.width() / 2) - ($blok.width() / 2) + "px",
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
    setTimeout(() => {
        $blok.hide();
    }, dlugoscAnimacji);
    toggleModal(oknoId, "przywrocPrzycisk(" + oknoId + ")");

    setTimeout(() => {
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
    $blok.removeClass("minimized");
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
    $blok.addClass("minimized");
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

$(document).ready(() => {
    $(document).on('contextmenu', (e) => {
        e.preventDefault();
    });
    // otworzOkno("ustawienia.app");
});

function czyZaladowaneOrazAnimacja() {
    if(czyZaladowane && czyAnimacja) {
        setTimeout(() => {
            closeModal(1, 0);
        }, 0);
        setTimeout(() => {
            $(".loading-intro").css({
                "opacity": "0%"
            });
            $(".box").addClass("znikanie");
            setTimeout(() => {
                $(".loading-intro").hide();
                setTimeout(() => {
                    $(".loading-intro").remove();
                }, 200);
            }, 200);
        }, 250);
    }
}

$(document).ready(() => {
    $(".kusOS-text").on("animationend", () => {
        czyAnimacja = true;
        czyZaladowaneOrazAnimacja();
    });
})

$(window).on("load", function () {
    czyZaladowane = true;
    czyZaladowaneOrazAnimacja();
});

function toggleOkna() {
    if ($(".pasekprzyciskOnScreen").length != 0) {
        minimalizujModal();
    } else {
        przywrocModal();
    }
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

$(document).ready(() => {
    $(".pulpit").on("contextmenu", (event) => {
        event.preventDefault();

        var menu = $("#context-menuPulpit");
        var menuWidth = menu.outerWidth();
        var menuHeight = menu.outerHeight();

        var posX = event.pageX;
        var posY = event.pageY;

        if (posX + menuWidth > $(window).width()) {
            posX -= menuWidth;
        }

        if (posY + menuHeight > $(window).height()) {
            posY -= menuHeight;
        }

        setTimeout(() => {
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

        setTimeout(() => {
            menu.css({
                "opacity": "100%"
            });
        }, 1);
    });

    $(document).on("mousedown", (event) => {
        if (!$(event.target).closest(".context-menu").length) {
            setTimeout(() => {
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
    $(document).ready(() => {
        aktualizujDateGodzine();
    });

    $("#audio")[0].volume = 0.5;

    $(".build").text(build);
});

function zegarAnalogowy() {
    $("#clock").toggle();
}

function ustawienia() {
    function pasekPozycja() {
        $('[id^="oknoprzycisk"]').each(function () {
            oknoId = parseInt(this.id.substr(this.id.length - 1, 1));

            var $przycisk = $('[id^="oknoprzycisk' + oknoId + '"]');
            var $blok = $('[id^="okno' + oknoId + '"]');

            if (!$("#oknoprzycisk" + oknoId).hasClass("pasekprzyciskOnScreen")) {
                $blok.css({
                    left: $przycisk.position().left + ($przycisk.width() / 2) - ($blok.width() / 2) + "px",
                    top: $(".pasekzadan").position().top + "px",
                });
            }
        });
    }

    function kolorInputF() {
        $('body').css('--kolor', $("#kolorInput").val());
        document.cookie = "kolorInput =" + $("#kolorInput").val() + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }

    $("#kolorInput").change(() => {
        kolorInputF();
    });

    function modeSelectF() {
        if ($('#modeSelect').val() === "light") {
            $("body").addClass("light");
        } else if ($('#modeSelect').val() === "dark") {
            $("body").removeClass("light");
        }
        document.cookie = "modeSelect=" + $('#modeSelect').val() + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }

    $('#modeSelect').change(function () {
        modeSelectF();
    });

    function pasekSelectF() {
        var pasekzadan = $(".pasekzadan");
        var pulpit = $(".pulpit");
        if ($("#pasekSelect").val() === "gora") {
            pasekzadan.after(pulpit);
            pasekzadan.removeClass("pasekzadanDol");
        } else if ($("#pasekSelect").val() === "dol") {
            pulpit.after(pasekzadan);
            pasekzadan.addClass("pasekzadanDol");
        }
        document.cookie = "pasekSelect=" + $("#pasekSelect").val() + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
        pasekPozycja();
    }

    $("#pasekSelect").change(function () {
        pasekSelectF();
    });

    function zegarSelectF() {
        if ($("#zegarSelect").val() === "wlZegar") {
            $("#clock").show();
        } else if ($("#zegarSelect").val() === "wylZegar") {
            $("#clock").hide();
        }
        document.cookie = "zegarSelect=" + $("#zegarSelect").val() + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }

    $("#zegarSelect").change(function () {
        zegarSelectF();
    });

    function tapetaSelectF() {
        if ($("#tapetaSelect").val() === "nic") {
            $("body").css({
                "background-image": "none",
                "background-color": "#111111"
            });
        } else {
            $("body").css("background-image", "url(./wallpaper/" + $("#tapetaSelect").val() + ")");
        }
        document.cookie = "tapetaSelect=" + $("#tapetaSelect").val() + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }

    $("#tapetaSelect").change(function () {
        tapetaSelectF();
    });

    function wersjaSelectF() {
        if ($("#wersjaSelect").val() === "wlWersja") {
            $(".wersja").animate({
                "opacity": "100%"
            }, dlugoscAnimacji);
            $(".wersja").show();
        } else {
            $(".wersja").animate({
                "opacity": "0%"
            }, dlugoscAnimacji);
            setTimeout(() => {
                $(".wersja").hide();
            }, dlugoscAnimacji);
        }
        document.cookie = "wersjaSelect=" + $("#wersjaSelect").val() + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }

    $("#wersjaSelect").change(function () {
        wersjaSelectF();
    });

    var kolorInput = getCookie("kolorInput");
    var modeSelect = getCookie("modeSelect");
    var pasekSelect = getCookie("pasekSelect");
    var zegarSelect = getCookie("zegarSelect");
    var tapetaSelect = getCookie("tapetaSelect");
    var wersjaSelect = getCookie("wersjaSelect");

    $('#kolorInput').val(kolorInput);
    $('#modeSelect').val(modeSelect);
    $('#pasekSelect').val(pasekSelect);
    $('#zegarSelect').val(zegarSelect);
    $('#tapetaSelect').val(tapetaSelect);
    $('#wersjaSelect').val(wersjaSelect);

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
    }

    if(kolorInput != null) kolorInputF();
    if(modeSelect != null) modeSelectF();
    if(pasekSelect != null) pasekSelectF();
    if(zegarSelect != null) zegarSelectF();
    if(tapetaSelect != null) tapetaSelectF();
    if(wersjaSelect != null) wersjaSelectF();

    $("#kolorInput").val($("body").css("--kolor"));

    if ($(".pasekzadan").hasClass("pasekzadanDol")) {
        $("#dol").attr("selected", "");
    } else {
        $("#gora").attr("selected", "");
    }

    if (!$("body").hasClass("light")) {
        $("#ciemny").attr("selected", "");
    } else {
        $("#jasny").attr("selected", "");
    }

    if ($("#clock").css("display") === "none") {
        $("#wylZegar").attr("selected", "");
    } else {
        $("#wlZegar").attr("selected", "");
    }

    if ($("body").css("background-image").substr($("body").css("background-image").length - 5, 3) != "jpg") {
        $("#nic").attr("selected", "");
    } else {
        tapetaNazwa = '#' + $("body").css("background-image").substr($("body").css("background-image").length - 16, 10);
        $(tapetaNazwa).attr("selected", "");
    }

    if ($(".wersja").css("display") === "none") {
        $("#wylWersja").attr("selected", "");
    } else {
        $("#wlWersja").attr("selected", "");
    }
}
