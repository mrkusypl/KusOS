function ustawienia() {
    $(".pasekprzyciski").append("<div class='pasekprzycisk' id='oknoprzycisk" + oknoIlosc +"' style='order: " + oknoIlosc +"; pointer-events: none; opacity: 0; transform: scale(0.9) rotateX(20deg); display: none;' onclick = 'przywrocPrzycisk(" + oknoIlosc +")' >⚙️ Ustawienia</div > ");
    $(".powiadomienie").before("<div id='okno" + oknoIlosc +"' class='okno' resizable='true' onmousedown='fokus(" + oknoIlosc +")' style='pointer-events: none; opacity: 0; transform: scale(0.9) rotateX(20deg); display: none;'><div class='pasek'>⚙️ Ustawienia<div class='przelaczniki'><div class='button-pasek minimalizuj' title='Minimalizuj' onclick='minimalizujModal(" + oknoIlosc +")'>    _</div><div class='button-pasek close' title='Zamnkij' onclick='closeModal(" + oknoIlosc +", 0)'>⨉</div></div></div><div class='content'><span class='ikona'>⚙️</span>W tym miejscu mogą pojawić się ustawienia...</div></div>");
    $(".powiadomienie").before("<div class='context-menu' id='context-menuOkno" + oknoIlosc +"'><div class='przyciskMenu' onclick='minimalizujModal(" + oknoIlosc +")'><div>Minimalizuj</div><div class='shortcut'>Shift + M</div></div><div class='przyciskMenu' onclick='closeModal(" + oknoIlosc +", 0)'><div>Zamnkij</div><div class='shortcut'>Shift + F4</div></div></div>");
    openModal(oknoIlosc, 0);
}