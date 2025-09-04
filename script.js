build = "1.5";

const dlugoscAnimacji = 250;
var oknoIdtoggleOkna = 0;
let debounceTimer = null;
var czyZaladowane = false;
var czyAnimacja = false;

// Zmienne dla szybkiego podglądu pulpitu
let desktopPreviewTimer = null;
let desktopPreviewActive = false;
let hiddenWindows = [];

// Globalne ustawienie wyrównywania do siatki
window.gridSnapEnabled = true;

// Flaga sortowania paska zadań
window.isSorting = false;

// Flaga wyswietlania sekund w zegarze na pasku zadań
window.wyswietlSekundy = true;

var zindex = 1;
var oknoXpos = [];
var oknoYpos = [];
var oknoHeight = [];
var oknoWidth = [];
var oknoContent = [];

// Globalna zmienna do przechowywania interwału licznika dla okna ustawień
var countdownInterval = null;

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
            distance: 10, // Rozpocznij sortowanie dopiero po przesunięciu o 10px
            start: function(event, ui) {
                // Ustaw flagę podczas rozpoczęcia sortowania
                window.isSorting = true;
                // Dodaj timeout aby flaga była aktywna przez krótki czas po sortowaniu
                clearTimeout(window.sortingTimeout);
            },
            stop: function(event, ui) {
                // Usuń flagę z opóźnieniem aby uniknąć przypadkowego kliknięcia
                window.sortingTimeout = setTimeout(() => {
                    window.isSorting = false;
                }, 100);
            },
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

    textDane += "<div class='context-menu' id='context-menuOkno" + oknoIlosc + "'><div class='przyciskMenu' onclick='zresetujPozycjeOkna(" + oknoIlosc + ")'><div>Zresetuj pozycję</div><div class='shortcut'></div></div>";
    textDane += "<div class='przyciskMenu minimalizujMenu' onclick='minimalizujModal(" + oknoIlosc + ")'><div class='minimalizujTekst'>Minimalizuj</div><div class='shortcut'>Shift + 🡇</div></div>";
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

            $("#context-menuOkno" + oknoId + " .minimalizujMenu").attr("onclick", "minimalizujModal(" + oknoId + ")");
    $("#context-menuOkno" + oknoId + " .minimalizujMenu .minimalizujTekst").text("Minimalizuj");
    $("#context-menuOkno" + oknoId + " .minimalizujMenu .shortcut").text("Shift + 🡇");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu").show();
    $("#context-menuOkno" + oknoId + " .przyciskMenu:first").show();
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

            $("#context-menuOkno" + oknoId + " .minimalizujMenu").attr("onclick", "przywrocModal(" + oknoId + ")");
    $("#context-menuOkno" + oknoId + " .minimalizujMenu .minimalizujTekst").text("Przywróć");
    $("#context-menuOkno" + oknoId + " .minimalizujMenu .shortcut").text("");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu").hide();
    $("#context-menuOkno" + oknoId + " .przyciskMenu:first").hide();
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

    $("#context-menuOkno" + oknoId + " .przyciskMenu:first").hide();

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

            $("#context-menuOkno" + oknoId + " .maksymalizujMenu").attr("onclick", "maksymalizujModal(" + oknoId + ")");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu .maksymalizujTekst").text("Maksymalizuj");
    $("#context-menuOkno" + oknoId + " .maksymalizujMenu .shortcut").text("Shift + 🡅");

    $("#context-menuOkno" + oknoId + " .przyciskMenu:first").show();

    $("#okno" + oknoId + " .pasek .przelaczniki .maksymalizuj svg").html("<rect height='18' rx='2' ry='2' width='18' x='3' y='3'/>");
    $blok.addClass("minimized");
}

function zresetujPozycjeOkna(oknoId) {
    var $blok = $('[id^="okno' + oknoId + '"]');
    
    // Oblicz środek ekranu
    var srodekX = ($(window).width() - $blok.width()) / 2;
    var srodekY = ($(window).height() - $blok.height()) / 2;
    
    // Upewnij się, że okno nie wychodzi poza granice ekranu
    srodekX = Math.max(0, Math.min(srodekX, $(window).width() - $blok.width()));
    srodekY = Math.max(0, Math.min(srodekY, $(window).height() - $blok.height()));
    
    // Animuj okno do nowej pozycji
    $blok.animate({
        left: srodekX + "px",
        top: srodekY + "px"
    }, dlugoscAnimacji);
    
    // Zaktualizuj zapisane pozycje
    oknoXpos[oknoId] = srodekX;
    oknoYpos[oknoId] = srodekY;
    
    // Ukryj menu kontekstowe
    $(".context-menu").hide();
}

function minimalizujPrzycisk(oknoId) {
    // Sprawdź czy nie trwa sortowanie - jeśli tak, zignoruj kliknięcie
    if (window.isSorting) {
        return;
    }
    
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
    // Sprawdź czy nie trwa sortowanie - jeśli tak, zignoruj kliknięcie
    if (window.isSorting) {
        return;
    }
    
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
    
    // Inicjalizacja ikon pulpitu
    initDesktopIcons();
    
    // otworzOkno("ustawienia.app");
});

// Funkcja inicjalizacji ikon pulpitu
function initDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    
    // Wczytaj zapisane pozycje ikon
    loadIconPositions();
    
    // Dodaj animację pojawiania się tylko przy pierwszym ładowaniu
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('icon-appearing');
            // Usuń klasę animacji po zakończeniu
            setTimeout(() => {
                icon.classList.remove('icon-appearing');
            }, 500);
        }, index * 100); // Opóźnienie dla każdej ikony
    });
    
    icons.forEach(icon => {
        // Podwójne kliknięcie - uruchomienie aplikacji
        icon.addEventListener('dblclick', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const appName = this.getAttribute('data-app');
            if (appName) {
                otworzOkno(appName);
            }
        });
        
        // Pojedyncze kliknięcie - podświetlenie
        icon.addEventListener('click', function(e) {
            // Usuń klasę clicked z innych ikon
            document.querySelectorAll('.desktop-icon').forEach(otherIcon => {
                if (otherIcon !== this) {
                    otherIcon.classList.remove('clicked');
                }
            });
            
            // Dodaj klasę clicked do tej ikony
            this.classList.add('clicked');
            
            // Usuń klasę clicked po 200ms
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
        
        // Przeciąganie ikon
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        icon.addEventListener('mousedown', function(e) {
            if (e.button === 0) { // Lewy przycisk myszy
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                startLeft = parseInt(this.style.left) || 0;
                startTop = parseInt(this.style.top) || 0;
                
                // Wyłącz transitions dla płynnego przeciągania
                this.style.transition = 'none';
                this.classList.add('dragging');
                e.preventDefault();
            }
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                const newLeft = startLeft + deltaX;
                const newTop = startTop + deltaY;
                
                // Ograniczenie ruchu do granic pulpitu
                const maxLeft = window.innerWidth - 100;
                const maxTop = window.innerHeight - 120;
                
                icon.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
                icon.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
            }
        });
        
        // Obsługa zmiany rozmiaru okna
        window.addEventListener('resize', function() {
            const currentLeft = parseInt(icon.style.left) || 0;
            const currentTop = parseInt(icon.style.top) || 0;
            
            // Sprawdź czy ikona nie wychodzi poza granice po zmianie rozmiaru
            const maxLeft = window.innerWidth - 100;
            const maxTop = window.innerHeight - 120;
            
            if (currentLeft > maxLeft) {
                icon.style.left = maxLeft + 'px';
            }
            if (currentTop > maxTop) {
                icon.style.top = maxTop + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                icon.classList.remove('dragging');
                
                // Przywróć transitions po zakończeniu przeciągania
                icon.style.transition = '';
                
                // Wyrównaj do siatki jeśli ustawienie jest włączone
                if (window.gridSnapEnabled) {
                    snapToGrid(icon);
                }
                
                // Zapisz nową pozycję ikony
                saveIconPosition(icon);
            }
        });
        
        // Zapobieganie przeciąganiu tekstu
        icon.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
        
        // Kontekstowe menu dla ikon
        icon.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Ukryj inne menu kontekstowe
            $('.context-menu').hide();
            
            // Pokaż menu kontekstowe dla ikony
            showIconContextMenu(e, icon);
        });
    });
}

// Funkcja wyświetlania menu kontekstowego dla ikon
function showIconContextMenu(event, icon) {
    const appName = icon.getAttribute('data-app');
    const appLabel = icon.querySelector('.icon-label').textContent;
    
    // Usuń istniejące menu kontekstowe ikony
    $('.icon-context-menu').remove();
    
    // Utwórz nowe menu kontekstowe
    const contextMenu = $(`
        <div class="context-menu icon-context-menu">
            <div class="przyciskMenu" onclick="otworzOkno('${appName}')">
                🚀 Uruchom ${appLabel}
            </div>
        </div>
    `);
    
    $('body').append(contextMenu);
    
    // Pozycjonowanie menu
    const menuWidth = contextMenu.outerWidth();
    const menuHeight = contextMenu.outerHeight();
    
    let posX = event.pageX;
    let posY = event.pageY;
    
    if (posX + menuWidth > $(window).width()) {
        posX -= menuWidth;
    }
    
    if (posY + menuHeight > $(window).height()) {
        posY -= menuHeight;
    }
    
    contextMenu.css({
        left: posX + 'px',
        top: posY + 'px',
        opacity: 0
    });
    
    contextMenu.show();
    
    setTimeout(() => {
        contextMenu.css('opacity', 1);
    }, 1);
}

// Funkcja resetowania pozycji ikony
function resetIconPosition(appName) {
    const icon = document.querySelector(`[data-app="${appName}"]`);
    if (icon) {
        // Usuń zapisaną pozycję
        localStorage.removeItem(`icon_${appName}`);
        
        // Ustaw domyślną pozycję używając siatki
        const defaultPositions = {
            'kutaksuck.app': { left: GRID_MARGIN, top: GRID_MARGIN },
            'terminal.app': { left: GRID_MARGIN + GRID_SIZE, top: GRID_MARGIN },
            'ustawienia.app': { left: GRID_MARGIN, top: GRID_MARGIN + GRID_SIZE },
            'kalkulator.app': { left: GRID_MARGIN, top: GRID_MARGIN + GRID_SIZE * 2 }
        };
        
        const defaultPos = defaultPositions[appName];
        if (defaultPos) {
            // Animuj przesunięcie do pozycji domyślnej
            icon.style.transition = 'left 0.3s ease, top 0.3s ease';
            icon.style.left = defaultPos.left + 'px';
            icon.style.top = defaultPos.top + 'px';
            
            // Usuń animację po zakończeniu
            setTimeout(() => {
                icon.style.transition = '';
                saveIconPosition(icon);
            }, 300);
        }
        

    }
}

// Parametry siatki
const GRID_SIZE = 140; // Rozmiar komórki siatki w pikselach (zwiększony dla lepszego odstępu)
const GRID_MARGIN = 30; // Margines od brzegów ekranu (zwiększony)

// Funkcja wyrównywania ikony do siatki
function snapToGrid(icon) {
    const currentLeft = parseInt(icon.style.left) || 0;
    const currentTop = parseInt(icon.style.top) || 0;
    
    // Oblicz najbliższą pozycję w siatce
    const snappedLeft = Math.round((currentLeft - GRID_MARGIN) / GRID_SIZE) * GRID_SIZE + GRID_MARGIN;
    const snappedTop = Math.round((currentTop - GRID_MARGIN) / GRID_SIZE) * GRID_SIZE + GRID_MARGIN;
    
    // Upewnij się, że ikona nie wychodzi poza granice ekranu
    const maxLeft = window.innerWidth - 100;
    const maxTop = window.innerHeight - 120;
    
    const finalLeft = Math.max(GRID_MARGIN, Math.min(snappedLeft, maxLeft));
    const finalTop = Math.max(GRID_MARGIN, Math.min(snappedTop, maxTop));
    
    // Sprawdź czy pozycja nie jest zajęta przez inną ikonę (szybka wersja)
    const finalPosition = findFreeGridPositionFast(finalLeft, finalTop, icon);
    
    // Natychmiastowe przesunięcie bez animacji dla lepszej responsywności
    icon.style.left = finalPosition.left + 'px';
    icon.style.top = finalPosition.top + 'px';
}

// Szybka wersja funkcji znajdowania wolnej pozycji (maksymalnie 4 sprawdzenia)
function findFreeGridPositionFast(preferredLeft, preferredTop, excludeIcon) {
    const allIcons = document.querySelectorAll('.desktop-icon');
    const occupiedPositions = new Set();
    
    // Zbierz tylko najbliższe zajęte pozycje
    allIcons.forEach(icon => {
        if (icon !== excludeIcon) {
            const left = parseInt(icon.style.left) || 0;
            const top = parseInt(icon.style.top) || 0;
            // Sprawdź tylko pozycje w promieniu 1 komórki
            if (Math.abs(left - preferredLeft) <= GRID_SIZE && Math.abs(top - preferredTop) <= GRID_SIZE) {
                occupiedPositions.add(`${left},${top}`);
            }
        }
    });
    
    // Sprawdź tylko 4 najbliższe pozycje
    const positionsToCheck = [
        { left: preferredLeft, top: preferredTop },
        { left: preferredLeft + GRID_SIZE, top: preferredTop },
        { left: preferredLeft, top: preferredTop + GRID_SIZE },
        { left: preferredLeft - GRID_SIZE, top: preferredTop },
        { left: preferredLeft, top: preferredTop - GRID_SIZE }
    ];
    
    for (const pos of positionsToCheck) {
        if (!occupiedPositions.has(`${pos.left},${pos.top}`)) {
            // Sprawdź granice ekranu
            if (pos.left >= GRID_MARGIN && pos.left <= window.innerWidth - 100 &&
                pos.top >= GRID_MARGIN && pos.top <= window.innerHeight - 120) {
                return pos;
            }
        }
    }
    
    // Jeśli nie znaleziono wolnej pozycji, zwróć preferowaną
    return { left: preferredLeft, top: preferredTop };
}

// Funkcja znajdowania wolnej pozycji w siatce
function findFreeGridPosition(preferredLeft, preferredTop, excludeIcon) {
    const allIcons = document.querySelectorAll('.desktop-icon');
    const occupiedPositions = new Set();
    
    // Zbierz zajęte pozycje
    allIcons.forEach(icon => {
        if (icon !== excludeIcon) {
            const left = parseInt(icon.style.left) || 0;
            const top = parseInt(icon.style.top) || 0;
            occupiedPositions.add(`${left},${top}`);
        }
    });
    
    // Sprawdź czy preferowana pozycja jest wolna
    if (!occupiedPositions.has(`${preferredLeft},${preferredTop}`)) {
        return { left: preferredLeft, top: preferredTop };
    }
    
    // Znajdź najbliższą wolną pozycję
    const maxDistance = 10; // Maksymalna odległość do sprawdzenia
    
    for (let distance = 1; distance <= maxDistance; distance++) {
        for (let deltaRow = -distance; deltaRow <= distance; deltaRow++) {
            for (let deltaCol = -distance; deltaCol <= distance; deltaCol++) {
                if (Math.abs(deltaRow) === distance || Math.abs(deltaCol) === distance) {
                    const newLeft = preferredLeft + deltaCol * GRID_SIZE;
                    const newTop = preferredTop + deltaRow * GRID_SIZE;
                    
                    // Sprawdź granice ekranu
                    if (newLeft >= GRID_MARGIN && newLeft <= window.innerWidth - 100 &&
                        newTop >= GRID_MARGIN && newTop <= window.innerHeight - 120) {
                        
                        if (!occupiedPositions.has(`${newLeft},${newTop}`)) {
                            return { left: newLeft, top: newTop };
                        }
                    }
                }
            }
        }
    }
    
    // Jeśli nie znaleziono wolnej pozycji, zwróć preferowaną
    return { left: preferredLeft, top: preferredTop };
}

// Funkcja wyrównywania wszystkich ikon do siatki
function alignAllIconsToGrid() {
    const icons = Array.from(document.querySelectorAll('.desktop-icon'));
    
    icons.forEach(icon => {
        snapToGrid(icon);
        // Natychmiastowe zapisywanie pozycji
        saveIconPosition(icon);
    });
}

// Funkcja sortowania ikon pulpitu (zmodyfikowana do używania siatki)
function sortDesktopIcons() {
    // Ukryj menu kontekstowe pulpitu
    $(".context-menu").hide();
    
    const icons = Array.from(document.querySelectorAll('.desktop-icon'));
    const sortedIcons = icons.sort((a, b) => {
        const aTop = parseInt(a.style.top) || 0;
        const bTop = parseInt(b.style.top) || 0;
        if (aTop !== bTop) {
            return aTop - bTop;
        }
        return (parseInt(a.style.left) || 0) - (parseInt(b.style.left) || 0);
    });
    
    // Ustaw nowe pozycje używając siatki
    sortedIcons.forEach((icon, index) => {
        const iconsPerRow = Math.floor((window.innerWidth - 2 * GRID_MARGIN) / GRID_SIZE);
        const row = Math.floor(index / iconsPerRow);
        const col = index % iconsPerRow;
        
        const left = GRID_MARGIN + (col * GRID_SIZE);
        const top = GRID_MARGIN + (row * GRID_SIZE);
        
        // Animuj przesunięcie
        icon.style.transition = 'left 0.3s ease, top 0.3s ease';
        icon.style.left = left + 'px';
        icon.style.top = top + 'px';
        
        // Usuń animację i zapisz pozycję
        setTimeout(() => {
            icon.style.transition = '';
            saveIconPosition(icon);
        }, 350);
    });
}

// Funkcja zapisywania pozycji ikony
function saveIconPosition(icon) {
    const appName = icon.getAttribute('data-app');
    const position = {
        left: icon.style.left,
        top: icon.style.top
    };
    localStorage.setItem(`icon_${appName}`, JSON.stringify(position));
}

// Funkcja wczytywania zapisanych pozycji ikon
function loadIconPositions() {
    const icons = document.querySelectorAll('.desktop-icon');
    
    icons.forEach(icon => {
        const appName = icon.getAttribute('data-app');
        const savedPosition = localStorage.getItem(`icon_${appName}`);
        
        if (savedPosition) {
            try {
                const position = JSON.parse(savedPosition);
                if (position.left && position.top) {
                    icon.style.left = position.left;
                    icon.style.top = position.top;
                }
            } catch (e) {
                console.error('Błąd wczytywania pozycji ikony:', e);
            }
        }
    });
}

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

// Funkcja szybkiego podglądu pulpitu
function startDesktopPreview() {
    if (desktopPreviewActive) return;
    
    desktopPreviewActive = true;
    
    // Zapisz wszystkie otwarte okna
    hiddenWindows = [];
    $('[id^="okno"].pasekprzyciskOnScreen').each(function() {
        const oknoId = parseInt(this.id.substr(this.id.length - 1, 1));
        const $okno = $('[id^="okno' + oknoId + '"]');
        
        if ($okno.is(':visible')) {
            hiddenWindows.push({
                id: oknoId,
                $okno: $okno,
                wasVisible: true
            });
            
            // Dodaj widoczną obwódkę i ukryj tło oraz zawartość
            $okno.css({
                "border": "2px solid var(--kolor, #4a90e2)",
                "box-shadow": "0 0 10px rgba(74, 144, 226, 0.5)",
                "background": "transparent"
            });
            
            // Ukryj wszystkie elementy wewnątrz okna (pasek, content, terminal-container, itp.)
            $okno.find('.pasek, .content, .terminal-container, .terminal-body, .console-output, .command-line, td, tr, table, div, span, button, input, svg').css({
                "opacity": "0%"
            });
        }
    });
}

// Funkcja przywracania okien po zjechaniu myszki
function stopDesktopPreview() {
    if (!desktopPreviewActive) return;
    
    desktopPreviewActive = false;
    
    // Przywróć wszystkie ukryte okna
    hiddenWindows.forEach(windowData => {
        if (windowData.wasVisible) {
            const $okno = windowData.$okno;
            
            // Usuń obwódkę i przywróć tło
            $okno.css({
                "border": "",
                "box-shadow": "",
                "background": ""
            });
            
            // Przywróć przezroczystość zawartości
            $okno.find('.pasek, .content, .terminal-container, .terminal-body, .console-output, .command-line, td, tr, table, div, span, button, input, svg').css({
                "opacity": "100%"
            });
        }
    });
    
    hiddenWindows = [];
}

// Funkcja obsługująca najechanie myszką na przycisk "Pokaż pulpit"
function startDesktopPreviewHover() {
    // Wyczyść poprzedni timer jeśli istnieje
    if (desktopPreviewTimer) {
        clearTimeout(desktopPreviewTimer);
    }
    
    // Ustaw timer na 0,5 sekundy
    desktopPreviewTimer = setTimeout(() => {
        startDesktopPreview();
    }, 500);
}

// Funkcja obsługująca zjechanie myszki z przycisku "Pokaż pulpit"
function stopDesktopPreviewHover() {
    // Wyczyść timer
    if (desktopPreviewTimer) {
        clearTimeout(desktopPreviewTimer);
        desktopPreviewTimer = null;
    }
    
    // Zatrzymaj podgląd pulpitu
    stopDesktopPreview();
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

        godzinaElement.text(godzina + ":" + minuta);

        if(window.wyswietlSekundy) {
            godzinaElement.append(":" + sekunda);
        }

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
    
    // Ustaw wartość title na obrazku logo
    $(".wersja img").attr("title", "KusOS v. " + build);
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
        var currentPosition = pasekzadan.hasClass("pasekzadanDol") ? "dol" : "gora";
        var newPosition = $("#pasekSelect").val();
        
        // Jeśli pozycja się nie zmieniła, nie rób nic
        if (currentPosition === newPosition) {
            return;
        }
        
        // Dodaj klasę animacji
        pasekzadan.addClass("pasek-animating");
        
        if (newPosition === "gora") {
            // Pasek idzie z dołu do góry
            if (currentPosition === "dol") {
                // Animacja zwijania w dół (gdy pasek jest na dole)
                pasekzadan.css({
                    "transform": "translateY(100%)",
                    "transition": "transform 0.15s ease-out"
                });
                
                setTimeout(() => {
                    // Zmień pozycję w DOM
                    pasekzadan.after(pulpit);
                    pasekzadan.removeClass("pasekzadanDol");
                    
                    // Ustaw pozycję początkową (poza ekranem u góry)
                    pasekzadan.css({
                        "transform": "translateY(-100%)",
                        "transition": "none"
                    });
                    
                    // Animacja pojawiania się z góry
                    setTimeout(() => {
                        pasekzadan.css({
                            "transform": "translateY(0)",
                            "transition": "transform 0.15s ease-out"
                        });
                        
                        setTimeout(() => {
                            pasekzadan.removeClass("pasek-animating");
                            pasekzadan.css("transform", "");
                        }, 150);
                    }, 10);
                }, 150);
            }
        } else if (newPosition === "dol") {
            // Pasek idzie z góry do dołu
            if (currentPosition === "gora") {
                // Animacja zwijania w górę (gdy pasek jest u góry)
                pasekzadan.css({
                    "transform": "translateY(-100%)",
                    "transition": "transform 0.15s ease-out"
                });
                
                setTimeout(() => {
                    // Zmień pozycję w DOM
                    pulpit.after(pasekzadan);
                    pasekzadan.addClass("pasekzadanDol");
                    
                    // Ustaw pozycję początkową (poza ekranem na dole)
                    pasekzadan.css({
                        "transform": "translateY(100%)",
                        "transition": "none"
                    });
                    
                    // Animacja pojawiania się z dołu
                    setTimeout(() => {
                        pasekzadan.css({
                            "transform": "translateY(0)",
                            "transition": "transform 0.15s ease-out"
                        });
                        
                        setTimeout(() => {
                            pasekzadan.removeClass("pasek-animating");
                            pasekzadan.css("transform", "");
                        }, 150);
                    }, 10);
                }, 150);
            }
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

    function gridSnapSelectF() {
        if ($("#gridSnapSelect").val() === "wlGridSnap") {
            window.gridSnapEnabled = true;
            // Automatycznie wyrównaj wszystkie ikony do siatki po włączeniu
            setTimeout(() => {
                alignAllIconsToGrid();
            }, 100);
        } else {
            window.gridSnapEnabled = false;
        }
        document.cookie = "gridSnapSelect=" + $("#gridSnapSelect").val() + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }

    $("#gridSnapSelect").change(function () {
        gridSnapSelectF();
    });

    function wyswietlSekundyF() {
        if ($("#wyswietlSekundy").val() === "wlSekundy") {
            wyswietlSekundy = "wlSekundy";
            window.wyswietlSekundy = true;
        } else {
            wyswietlSekundy = "wylSekundy";
            window.wyswietlSekundy = false;
        }
        document.cookie = "wyswietlSekundy=" + $("#wyswietlSekundy").val() + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    }

    $("#wyswietlSekundy").change(function () {
        wyswietlSekundyF();
    });

    var kolorInput = getCookie("kolorInput");
    var modeSelect = getCookie("modeSelect");
    var pasekSelect = getCookie("pasekSelect");
    var zegarSelect = getCookie("zegarSelect");
    var tapetaSelect = getCookie("tapetaSelect");
    var wersjaSelect = getCookie("wersjaSelect");
    var gridSnapSelect = getCookie("gridSnapSelect");
    var wyswietlSekundy = getCookie("wyswietlSekundy");

    $('#kolorInput').val(kolorInput);
    $('#modeSelect').val(modeSelect);
    $('#pasekSelect').val(pasekSelect);
    $('#zegarSelect').val(zegarSelect);
    $('#tapetaSelect').val(tapetaSelect);
    $('#wersjaSelect').val(wersjaSelect);
    $('#gridSnapSelect').val(gridSnapSelect);
    $('#wyswietlSekundy').val(wyswietlSekundy);

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
    if(gridSnapSelect != null) gridSnapSelectF();
    if(wyswietlSekundy != null) wyswietlSekundyF()

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

    if (window.gridSnapEnabled === false) {
        $("#wylGridSnap").attr("selected", "");
    } else {
        $("#wlGridSnap").attr("selected", "");
    }

    if ($("#wyswietlSekundy").val() === "wylSekundy") {
        $("#wylSekundy").attr("selected", "");
    } else {
        $("#wlSekundy").attr("selected", "");
    }
}

function showContextMenuOkno1(event) {
    event.preventDefault();
    
    var $context = $("#context-menuOkno1");
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
