- tytul: "Ustawienia"
  ikona: "🛠️"
  resizable: "false"
  content: >
    <div class="content" style="display: flex; flex-direction: column">
        <div style=" width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Ustaw kolor wiodący:</div>
            <input style="margin-left: 100px;" type="color" id="kolorInput">
        </div>
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Tryb wyświetlania:</div>
            <select style="margin-left: 100px;" id="modeSelect">
                <option value="light" id='jasny'>Jasny</option>
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
        <div style="width: 100%; border-bottom: 2px solid var(--kolor); margin: 20px 0 20px 0"></div>
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="font-size: 21px">Ustawienia fabryczne:</div>
            <button style="margin-left: 100px;" id="ustawieniaFabryczne" onclick="ustawieniaFabryczne()">Przywróć</button>
        </div>
    </div>
    <script>
        ustawienia();

        function ustawieniaFabryczne() {
            function removeAllCookies() {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
            }

            removeAllCookies();
            setTimeout(() => {
                location.reload();
            }, 250);
        }
    </script>