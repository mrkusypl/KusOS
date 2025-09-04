- tytul: "Ustawienia"
  ikona: "🛠️"
  resizable: "false"
  content: >
    <div class="content" style="display: flex; flex-direction: column; padding: 20px; gap: 0; height: 160px; justify-content: flex-start;">
        
        <!-- Pasek zakładek -->
        <div style="display: flex; border-bottom: 2px solid var(--kolor); margin-bottom: 20px;">
            <button class="tab-button active" onclick="showTab('wyglad')" style="padding: 12px 20px; font-weight: bold; border-radius: 8px 8px 0 0; margin-right: 2px; white-space: nowrap; display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);">
                🎨 Wygląd
            </button>
            <button class="tab-button" onclick="showTab('pulpit')" style="padding: 12px 20px; font-weight: bold; border-radius: 8px 8px 0 0; margin-right: 2px; white-space: nowrap; display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);">
                🖥️ Pulpit
            </button>
            <button class="tab-button" onclick="showTab('pasek')" style="padding: 12px 20px; font-weight: bold; border-radius: 8px 8px 0 0; margin-right: 2px; white-space: nowrap; display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);">
                📋 Pasek zadań
            </button>
            <button class="tab-button" onclick="showTab('system')" style="padding: 12px 20px; font-weight: bold; border-radius: 8px 8px 0 0; margin-right: 2px; white-space: nowrap; display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);">
                ⚙️ System
            </button>
            <button class="tab-button" onclick="showTab('przywracanie')" style="padding: 12px 20px; font-weight: bold; border-radius: 8px 8px 0 0; white-space: nowrap; display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);">
                🔄 Przywracanie
            </button>
        </div>
        
        <!-- Zakładka Wygląd -->
        <div id="tab-wyglad" class="tab-content" style="display: block;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px; justify-content: center;">
                        Kolor wiodący
                    </label>
                    <input type="color" id="kolorInput" style="width: 100%; height: 45px; border-radius: 8px; border: 2px solid var(--kolor);">
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px; justify-content: center;">
                        Tryb wyświetlania
                    </label>
                    <select id="modeSelect" style="padding: 12px; border-radius: 8px;">
                        <option value="light" id='jasny'>Jasny</option>
                        <option value="dark" id='ciemny'>Ciemny</option>
                    </select>
                </div>
            </div>
        </div>
        
        <!-- Zakładka Pulpit -->
        <div id="tab-pulpit" class="tab-content" style="display: none;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px; justify-content: center;">
                        Wyrównywanie ikon do siatki
                    </label>
                    <select id="gridSnapSelect" style="padding: 12px; border-radius: 8px;">
                        <option value="wlGridSnap" id="wlGridSnap">Włącz</option>
                        <option value="wylGridSnap" id="wylGridSnap">Wyłącz</option>
                    </select>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px; justify-content: center;">
                        Tapeta pulpitu
                    </label>
                    <select id="tapetaSelect" style="padding: 12px; border-radius: 8px;">
                        <option value="wallpaper1.jpg" id="wallpaper1">kusOS</option>
                        <option value="wallpaper2.jpg" id="wallpaper2">Tutel</option>
                        <option value="wallpaper3.jpg" id="wallpaper3">Pracownik</option>
                        <option value="wallpaper4.jpg" id="wallpaper4">Pływak</option>
                        <option value="wallpaper5.jpg" id="wallpaper5">Logo</option>
                        <option value="nic" id="nic">Brak</option>
                    </select>
                </div>
            </div>
        </div>
        
        <!-- Zakładka Pasek zadań -->
        <div id="tab-pasek" class="tab-content" style="display: none;">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px; justify-content: center;">
                        Pozycja paska
                    </label>
                    <select id="pasekSelect" style="padding: 12px; border-radius: 8px;">
                        <option value="gora" id="gora">Góra</option>
                        <option value="dol" id="dol">Dół</option>
                    </select>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px;">
                        Zegar analogowy
                    </label>
                    <select id="zegarSelect" style="padding: 12px; border-radius: 8px;">
                        <option value="wylZegar" id="wylZegar">Wyłącz</option>
                        <option value="wlZegar" id="wlZegar">Włącz</option>
                    </select>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px;">
                        Pokaż sekundy
                    </label>
                    <select id="wyswietlSekundy" style="padding: 12px; border-radius: 8px;">
                        <option value="wylSekundy" id="wylSekundy">Wyłącz</option>
                        <option value="wlSekundy" id="wlSekundy">Włącz</option>
                    </select>
                </div>
            </div>
        </div>
        
        <!-- Zakładka System -->
        <div id="tab-system" class="tab-content" style="display: none;">
            <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 12px; width: 300px;">
                    <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px; justify-content: center;">
                        Wyświetl logo na pulpicie
                    </label>
                    <select id="wersjaSelect" style="padding: 12px; border-radius: 8px;">
                        <option value="wlWersja" id="wlWersja">Włącz</option>
                        <option value="wylWersja" id="wylWersja">Wyłącz</option>
                    </select>
                </div>
            </div>
        </div>
        
        <!-- Zakładka Przywracanie -->
        <div id="tab-przywracanie" class="tab-content" style="display: none;">
            <div style="display: flex; flex-direction: column; gap: 20px; align-items: center; text-align: center;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%;">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px; justify-content: center;">
                            Przywróć wszystkie ustawienia
                        </label>
                        <button id="ustawieniaFabryczne" onclick="showConfirmDialog('wszystko')" style="padding: 16px 24px; border-radius: 8px; font-weight: bold; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);">
                            Przywróć domyślne
                        </button>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <label style="justify-content: center; font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 8px; justify-content: center;">
                            Przywróć tylko układ ikon
                        </label>
                        <button onclick="resetIconPositions()" style="padding: 16px 24px; border-radius: 8px; font-weight: bold; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);">
                            Przywróć układ ikon
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>

        
        /* Style dla przycisków w zakładce Przywracania - w stylu gry */
        #ustawieniaFabryczne {
            width: auto !important;
            height: auto !important;
            border: 1px solid rgb(78, 78, 78) !important;
            background-color: rgb(102, 102, 102) !important;
            color: #eeeeee !important;
            transition: background-color 0.1s !important;
        }
        
        #ustawieniaFabryczne:hover {
            background-color: var(--kolor) !important;
        }
        
        #ustawieniaFabryczne:active {
             background-color: rgb(54, 54, 54) !important;
             transform: scale(0.98) !important;
             transition: background-color 0.05s !important;
         }
         
         /* Style dla przycisków w zakładce Przywracania w trybie jasnym */
         .light #ustawieniaFabryczne {
             background-color: rgb(212, 212, 212) !important;
             color: #eeeeee !important;
             border: 1px solid rgb(238, 238, 238) !important;
         }
         
         .light #ustawieniaFabryczne:hover {
             background-color: var(--kolor) !important;
         }
         
         .light #ustawieniaFabryczne:active {
             background-color: rgb(167, 167, 167) !important;
             transform: scale(0.98) !important;
             transition: background-color 0.05s !important;
         }
         
         /* Style dla przycisku resetowania układu ikon - w stylu gry */
         button[onclick="resetIconPositions()"] {
             width: auto !important;
             height: auto !important;
             border: 1px solid rgb(78, 78, 78) !important;
             background-color: rgb(102, 102, 102) !important;
             color: #eeeeee !important;
             transition: background-color 0.1s !important;
         }
         
         button[onclick="resetIconPositions()"]:hover {
             background-color: var(--kolor) !important;
         }
         
         button[onclick="resetIconPositions()"]:active {
             background-color: rgb(54, 54, 54) !important;
             transform: scale(0.98) !important;
             transition: background-color 0.05s !important;
         }
         
         /* Style dla przycisku resetowania układu ikon w trybie jasnym */
         .light button[onclick="resetIconPositions()"] {
             background-color: rgb(212, 212, 212) !important;
             color: #eeeeee !important;
             border: 1px solid rgb(238, 238, 238) !important;
         }
         
         .light button[onclick="resetIconPositions()"]:hover {
             background-color: var(--kolor) !important;
         }
         
         .light button[onclick="resetIconPositions()"]:active {
             background-color: rgb(167, 167, 167) !important;
             transform: scale(0.98) !important;
             transition: background-color 0.05s !important;
         }
         
         /* Style dla przycisków w oknach dialogowych - w stylu gry */
        .dialog-button {
            width: auto !important;
            height: auto !important;
            border: 1px solid rgb(78, 78, 78) !important;
            background-color: rgb(102, 102, 102) !important;
            color: #eeeeee !important;
            transition: background-color 0.1s !important;
        }
        
        .dialog-button:hover {
            background-color: var(--kolor) !important;
        }
        
        .dialog-button:active {
            background-color: rgb(54, 54, 54) !important;
            transform: scale(0.98) !important;
            transition: background-color 0.05s !important;
        }
        
        /* Style dla przycisków w oknach dialogowych w trybie jasnym */
        .light .dialog-button {
            background-color: rgb(212, 212, 212) !important;
            color: #eeeeee !important;
            border: 1px solid rgb(238, 238, 238) !important;
        }
        
        .light .dialog-button:hover {
            background-color: var(--kolor) !important;
        }
        
        .light .dialog-button:active {
            background-color: rgb(167, 167, 167) !important;
            transform: scale(0.98) !important;
            transition: background-color 0.05s !important;
        }
        
        /* Style dla okna dialogowego - reakcja na tryb ciemny/jasny */
        #confirmDialog {
            background: rgba(0,0,0,0.7) !important;
        }
        
        .light #confirmDialog {
            background: rgba(0,0,0,0.3) !important;
        }
        
        /* Style dla ekranu "Trwa przywracanie ustawień..." */
        #confirmDialog.loading {
            background: rgba(0,0,0,1) !important;
        }
        
        /* Style dla ekranu "Trwa przywracanie ustawień..." w trybie jasnym */
        .light #confirmDialog.loading {
            background: rgba(0,0,0,1) !important;
        }
        
        /* Style dla ekranu "Trwa przywracanie ustawień..." - najwyższy priorytet */
        #confirmDialog.loading {
            background: rgba(0,0,0,1) !important;
            background-color: rgba(0,0,0,1) !important;
        }
        
        .light #confirmDialog.loading {
            background: rgba(0,0,0,1) !important;
            background-color: rgba(0,0,0,1) !important;
        }
        
        #confirmDialog > div {
            background: var(--background-color, #3d3d3d) !important;
            color: var(--text-color, #eeeeee) !important;
            border: 2px solid var(--kolor) !important;
        }
        
        .light #confirmDialog > div {
            background: var(--background-color, #eeeeee) !important;
            color: var(--text-color, #111111) !important;
            border: 2px solid var(--kolor) !important;
        }
        
        #confirmDialog h3 {
            color: var(--kolor) !important;
        }
        
        #confirmDialog p {
            color: inherit !important;
        }
        
        /* Style dla napisu "Trwa przywracanie ustawień..." */
        .loading-text {
            color: #eeeeee !important;
        }
        
        /* Na ekranie "Trwa przywracania ustawień..." tekst zawsze biały */
        .light .loading-text {
            color: #eeeeee !important;
        }
        
        /* Style dla tytułu "Przywracanie wszystkich ustawień" - ciemny motyw */
        #confirmDialog h3 {
            color: var(--kolor) !important;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8), 1px -1px 2px rgba(255, 255, 255, 0.8), -1px 1px 2px rgba(255, 255, 255, 0.8) !important;
        }
        
        /* Style dla tytułu "Przywracanie wszystkich ustawień" - jasny motyw */
        .light #confirmDialog h3 {
            color: var(--kolor) !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8) !important;
        }
        
        /* Style dla przycisków zakładek - w stylu gry */
        .tab-button {
            border: 1px solid rgb(78, 78, 78) !important;
            background-color: rgb(102, 102, 102) !important;
            color: #eeeeee !important;
            transition: background-color 0.1s !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8) !important;
        }
        
        .tab-button:hover {
            background-color: var(--kolor) !important;
        }
        
        .tab-button:active {
            background-color: rgb(54, 54, 54) !important;
            transform: scale(0.98) !important;
            transition: background-color 0.05s !important;
        }
        
        /* Style dla aktywnej zakładki */
        .tab-button.active {
            background-color: var(--kolor) !important;
            border-color: var(--kolor) !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8) !important;
        }
        
        /* Style dla przycisków zakładek w trybie jasnym */
        .light .tab-button {
            background-color: rgb(240, 240, 240) !important;
            color: #111111 !important;
            border-top: 1px solid rgb(200, 200, 200) !important;
            border-left: 1px solid rgb(200, 200, 200) !important;
            border-right: 1px solid rgb(200, 200, 200) !important;
            border-bottom: 1px solid var(--kolor) !important;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8), 1px -1px 2px rgba(255, 255, 255, 0.8), -1px 1px 2px rgba(255, 255, 255, 0.8) !important;
        }
        
        .light .tab-button:hover {
            background-color: var(--kolor) !important;
        }
        
        .light .tab-button:active {
            background-color: rgb(220, 220, 220) !important;
            transform: scale(0.98) !important;
            transition: background-color 0.05s !important;
        }
        
        /* Style dla aktywnej zakładki w trybie jasnym */
        .light .tab-button.active {
            background-color: var(--kolor) !important;
            border-color: var(--kolor) !important;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8), 1px -1px 2px rgba(255, 255, 255, 0.8), -1px 1px 2px rgba(255, 255, 255, 0.8) !important;
        }
        
        /* Style dla elementów select - w stylu gry */
        select {
            border: 1px solid rgb(78, 78, 78) !important;
            background-color: rgb(102, 102, 102) !important;
            color: #eeeeee !important;
            transition: background-color 0.1s !important;
        }
        
        select:hover {
            background-color: rgb(120, 120, 120) !important;
        }
        
        select:focus {
            background-color: var(--background-color, #3d3d3d) !important;
            color: #eeeeee !important;
        }
        
        /* Style dla elementów select w trybie jasnym */
        .light select {
            background-color: rgb(212, 212, 212) !important;
            color: #111111 !important;
            border: 1px solid rgb(238, 238, 238) !important;
        }
        
        .light select:hover {
            background-color: rgb(228, 228, 228) !important;
        }
        
        .light select:focus {
            background-color: var(--background-color, #eeeeee) !important;
            color: #111111 !important;
        }
        
        /* Style dla elementów select w trybie jasnym */
        .light select {
            background-color: rgb(212, 212, 212) !important;
            color: #111111 !important;
            border: 1px solid rgb(238, 238, 238) !important;
        }
        
        .light select:hover {
            background-color: rgb(228, 228, 228) !important;
        }
    </style>
    
    <script>
        ustawienia();

        // Funkcja przełączania zakładek
        function showTab(tabName) {
            // Ukryj wszystkie zakładki
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(tab => tab.style.display = 'none');
            
            // Pokaż wybraną zakładkę
            document.getElementById('tab-' + tabName).style.display = 'block';
            
            // Zaktualizuj style przycisków zakładek
            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(button => {
                button.classList.remove('active');
            });
            
            // Zaznacz aktywną zakładkę
            event.target.classList.add('active');
        }

        function ustawieniaFabryczne() {
            function deleteAllCookies() {
                var cookies = document.cookie.split(";");

                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
            }

            // Usuń wszystkie cookies
            deleteAllCookies();
            
            // Przywróć domyślny układ ikon
            resetIconPositions();
            
            // Odśwież stronę po krótkim opóźnieniu
            setTimeout(() => {
                location.reload();
            }, 500);
        }

                 // Funkcja wyświetlania okna dialogowego z potwierdzeniem
         function showConfirmDialog(type) {
             let message, title, confirmText;
             
             if (type === 'wszystko') {
                 title = 'Przywracanie wszystkich ustawień';
                 message = 'Czy na pewno chcesz przywrócić wszystkie ustawienia do wartości domyślnych? Ta operacja jest nieodwracalna i usunie wszystkie Twoje personalizacje.';
                 confirmText = 'Tak, przywróć wszystko';
             }
             
             // Sprawdź czy już istnieje okno dialogowe
             if (document.getElementById('confirmDialog')) {
                 document.getElementById('confirmDialog').remove();
             }
             
             // Utwórz okno dialogowe
             const dialog = document.createElement('div');
             dialog.id = 'confirmDialog';
             dialog.style.cssText = `
                 position: fixed;
                 top: 0;
                 left: 0;
                 width: 100%;
                 height: 100%;
                 background: rgba(0,0,0,0);
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 z-index: 10000;
                 transition: background 0.3s ease;
             `;
             
             const dialogContent = document.createElement('div');
             dialogContent.style.cssText = `
                 border-radius: 12px;
                 padding: 30px;
                 max-width: 500px;
                 width: 90%;
                 text-align: center;
                 box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                 opacity: 0;
                 transform: scale(0.8);
                 transition: all 0.3s ease;
             `;
            
                         dialogContent.innerHTML = `
                 <h3 style="margin: 0 0 20px 0; font-size: 20px; user-select: none;">
                     ${title}
                 </h3>
                 <p style="margin: 0 0 25px 0; line-height: 1.6; user-select: none;">
                     ${message}
                 </p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                                         <button onclick="closeConfirmDialog()" class="dialog-button cancel-button" style="
                         padding: 12px 24px;
                         border-radius: 8px;
                         font-weight: bold;
                         font-size: 16px;
                         margin: 5px;
                         text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);
                     ">
                         Anuluj
                     </button>
                     <button id="confirmButton" onclick="executeAction('${type}')" class="dialog-button confirm-button" disabled style="
                         padding: 12px 24px;
                         border-radius: 8px;
                         font-weight: bold;
                         font-size: 16px;
                         margin: 5px;
                         cursor: not-allowed;
                         opacity: 0.6;
                         text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);
                     ">
                         <span id="countdown">(3)</span> ${confirmText}
                     </button>
                </div>
            `;
            
                         dialog.appendChild(dialogContent);
             document.body.appendChild(dialog);
             
             // Animacja otwierania
             setTimeout(() => {
                 dialog.style.background = 'rgba(0,0,0,0.7)';
                 dialogContent.style.opacity = '1';
                 dialogContent.style.transform = 'scale(1)';
             }, 10);
             
             // Start licznika dla przycisku potwierdzenia (tylko dla typu 'wszystko')
             if (type === 'wszystko') {
                 startCountdown();
             }
        }
        
                 // Funkcja zamykania okna dialogowego
         function closeConfirmDialog() {
             const dialog = document.getElementById('confirmDialog');
             if (dialog) {
                 // Resetuj licznik przed zamknięciem
                 resetCountdown();
                 
                 // Animacja zamykania
                 const dialogContent = dialog.querySelector('div');
                 dialogContent.style.opacity = '0';
                 dialogContent.style.transform = 'scale(0.8)';
                 dialog.style.background = 'rgba(0,0,0,0)';
                 
                 setTimeout(() => {
                     dialog.remove();
                 }, 300);
             }
         }
        
                 // Funkcja wykonująca akcję po potwierdzeniu
         function executeAction(type) {
             // Sprawdź czy przycisk jest aktywny (tylko dla typu 'wszystko')
             if (type === 'wszystko') {
                 const confirmButton = document.getElementById('confirmButton');
                 if (confirmButton && confirmButton.disabled) {
                     return; // Nie wykonuj akcji jeśli przycisk jest nieaktywny
                 }
             }
             
             if (type === 'wszystko') {
                 // Animacja całkowitego ściemnienia przed przywracaniem
                 const dialog = document.getElementById('confirmDialog');
                 if (dialog) {
                     const dialogContent = dialog.querySelector('div');
                     
                     // Ukryj treść okna
                     dialogContent.style.opacity = '0';
                     dialogContent.style.transform = 'scale(0.8)';
                     
                     // Ściemnij ekran do zera
                     dialog.style.background = 'rgba(0,0,0,0)';
                     
                     setTimeout(() => {
                         // Dodaj klasę loading i ustaw czarne tło
                         dialog.classList.add('loading');
                         dialog.style.setProperty('background', 'rgba(0,0,0,1)', 'important');
                         dialog.style.setProperty('background-color', 'rgba(0,0,0,1)', 'important');
                         
                         // Dodaj napis "Trwa przywracanie ustawień..."
                         const loadingText = document.createElement('div');
                         loadingText.style.cssText = `
                             position: fixed;
                             top: 50%;
                             left: 50%;
                             transform: translate(-50%, -50%);
                             font-size: 30px;
                             font-family: Verdana;
                             user-select: none;
                             z-index: 10001;
                             text-align: center;
                         `;
                         loadingText.textContent = 'Trwa przywracanie ustawień...';
                         loadingText.className = 'loading-text';
                         document.body.appendChild(loadingText);
                     }, 300);
                     
                     // Nie usuwaj okna dialogowego - zostaw ściemniony ekran
                     // i wywołaj funkcję przywracania, która przeładuje stronę
                     setTimeout(() => {
                         ustawieniaFabryczne();
                     }, 600);
                 }
             } else if (type === 'ikony') {
                 closeConfirmDialog();
                 resetIconPositions();
             }
         }

        // Funkcja przywracania układu ikon (wywoływana z przycisku)
        function resetIconPositions() {
            const icons = document.querySelectorAll('.desktop-icon');
            
            icons.forEach(icon => {
                const appName = icon.getAttribute('data-app');
                // Usuń zapisaną pozycję
                localStorage.removeItem(`icon_${appName}`);
            });
            
            // Przywróć domyślne pozycje zgodnie z siatką
            const defaultPositions = {
                'kutaksuck.app': { left: 30, top: 30 },
                'kalkulator.app': { left: 30, top: 170 },
                'terminal.app': { left: 30, top: 310 },
                'ustawienia.app': { left: 30, top: 450 }
                
            };
            
            icons.forEach(icon => {
                const appName = icon.getAttribute('data-app');
                const defaultPos = defaultPositions[appName];
                
                if (defaultPos) {
                    // Animuj przesunięcie do pozycji domyślnej
                    icon.style.transition = 'left 0.5s ease, top 0.5s ease';
                    icon.style.left = defaultPos.left + 'px';
                    icon.style.top = defaultPos.top + 'px';
                    
                    // Usuń animację po zakończeniu
                    setTimeout(() => {
                        icon.style.transition = '';
                    }, 500);
                }
            });
        }
        

        
        // Funkcja licznika dla przycisku potwierdzenia
        function startCountdown() {
            const confirmButton = document.getElementById('confirmButton');
            const countdownSpan = document.getElementById('countdown');
            let countdown = 3;
            
            // Wyczyść poprzedni interwał jeśli istnieje
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            
            // Aktualizuj licznik co sekundę
            countdownInterval = setInterval(() => {
                countdown--;
                countdownSpan.textContent = `(${countdown})`;
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                    enableConfirmButton();
                }
            }, 1000);
        }
        
        // Funkcja aktywacji przycisku potwierdzenia
        function enableConfirmButton() {
            const confirmButton = document.getElementById('confirmButton');
            const countdownSpan = document.getElementById('countdown');
            
            // Usuń licznik
            countdownSpan.remove();
            
            // Aktywuj przycisk
            confirmButton.disabled = false;
            confirmButton.style.cursor = 'default';
            confirmButton.style.opacity = '1';
            confirmButton.style.background = 'var(--kolor)';
            confirmButton.style.color = 'white';
            
            // Dodaj efekt hover
            confirmButton.addEventListener('mouseenter', function() {
                this.style.background = 'color-mix(in srgb, var(--kolor) 80%, black)';
            });
            
            confirmButton.addEventListener('mouseleave', function() {
                this.style.background = 'var(--kolor)';
            });
        }
        
        // Funkcja resetowania licznika
        function resetCountdown() {
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
        }
    </script>