- tytul: "Ustawienia"
  ikona: "🛠️"
  resizable: "false"
  maximize: "false"
  content: >
    <div class="content" style="display: flex; flex-direction: column">
        <div style=" width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Ustaw kolor wiodący:</div>
            <input  style="margin-left: 100px;" type="color" id="kolorInput" value="#000000">
        </div>
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Tryb wyświetlania:</div>
            <select style="margin-left: 100px;" id="modeSelect">
                <option value="light">Jasny</option>
                <option value="dark" id='ciemny'>Ciemny</option>
            </select>
        </div>
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Pozycja paska:</div>
            <select style="margin-left: 100px;" id="pasekSelect">
                <option value="gora" id="gora">Góra</option>
                <option value="dol" id="dol">Dół</option>
            </select>
        </div>
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Zegar analogowy:</div>
            <select style="margin-left: 100px;" id="zegarSelect">
                <option value="wylZegar" id="wylZegar">Wyłącz</option>
                <option value="wlZegar" id="wlZegar">Włącz</option>
            </select>
        </div>
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Tapeta:</div>
            <select style="margin-left: 100px;" id="tapetaSelect">
                <option value="wallpaper1.jpg" id="wallpaper1">kusOS</option>
                <option value="wallpaper2.jpg" id="wallpaper2">Tutel</option>
                <option value="wallpaper3.jpg" id="wallpaper3">Pracownik</option>
                <option value="wallpaper4.jpg" id="wallpaper4">Pływak</option>
                <option value="nic" id="nic">Nic</option>
            </select>
        </div>
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Wyświetl wersję systemu:</div>
            <select style="margin-left: 100px;" id="wersjaSelect">
                <option value="wlWersja" id="wlWersja">Włącz</option>
                <option value="wylWersja" id="wylWersja">Wyłącz</option>
            </select>
        </div>
    </div>
    <script>
        $(document).ready(function() {
            function pasekPozycja() {
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

            var kolorInput = $("#kolorInput");

            kolorInput.attr("value", $("body").css("--kolor"));
            kolorInput.change(function() {
                var nowyKolor = kolorInput.val();
                $('body').css('--kolor', nowyKolor);
            });

            if(!$("body").hasClass("light")) {
                $("#ciemny").attr("selected", "");
            }
            $('#modeSelect').change(function () {
                if($(this).val() === "light") {
                    $("body").addClass("light");
                } else if($(this).val() === "dark") {
                    $("body").removeClass("light");
                }
            });

            $("#pasekSelect").change(function () {
                var pasekzadan = $(".pasekzadan");
                var pulpit = $(".pulpit");
                if($(this).val() === "gora") {
                    pasekzadan.after(pulpit);
                    pasekzadan.removeClass("pasekzadanDol");
                } else if($(this).val() === "dol") {
                    pulpit.after(pasekzadan);
                    pasekzadan.addClass("pasekzadanDol");
                }
                pasekPozycja();
            });
            if($(".pasekzadan").hasClass("pasekzadanDol")) {
                $("#dol").attr("selected", "");
            } else {
                $("#gora").attr("selected", "");
            }

            $("#zegarSelect").change(function () {
                if($(this).val() === "wlZegar") {
                    $("#clock").show();
                } else if($(this).val() === "wylZegar") {
                    $("#clock").hide();
                }
            });
            if($("#clock").css("display") === "none") {
                $("#wylZegar").attr("selected", "");
            } else {
                $("#wlZegar").attr("selected", "");
            }

            $("#tapetaSelect").change(function () {
                if($(this).val() === "nic") {
                    $("body").css({
                        "background-image": "none",
                        "background-color": "#111111"
                    });
                } else {
                    $("body").css("background-image", "url(./wallpaper/"+$(this).val()+")");
                }
            });
            if($("body").css("background-image").substr($("body").css("background-image").length-5, 3) != "jpg") {
                $("#nic").attr("selected", "");
            } else {
                tapetaNazwa = '#' + $("body").css("background-image").substr($("body").css("background-image").length-16, 10);
                $(tapetaNazwa).attr("selected", "");
            }

            $("#wersjaSelect").change(function () {
                if($(this).val() === "wlWersja") {
                    $(".wersja").animate({
                        "opacity": "100%"
                    }, dlugoscAnimacji);
                    $(".wersja").show();
                } else {
                    $(".wersja").animate({
                        "opacity": "0%"
                    }, dlugoscAnimacji);
                    setTimeout(function() {
                        $(".wersja").hide();
                    }, dlugoscAnimacji);
                    
                }
            });
        });
    </script>