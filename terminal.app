- tytul: "Terminal"
  ikona: "⌨️"
  resizable: "true"
  content: >
    <div class="terminal-container">
      <div class="terminal-body">
        <div id="console" class="console-output"></div>
        
        <div class="command-line">
          <span class="prompt">root@kusos:~$</span>
          <input id="commandInput" type="text" class="command-input" autocomplete="off" placeholder="Wpisz polecenie...">
        </div>
      </div>
    </div>
    
    <style>
      .terminal-container {
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        border: 1px solid #333;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        height: calc(100% - 43px);
        min-width: 500px;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        overflow: hidden;
      }
      
      .terminal-body {
        flex: 1;
        padding: 16px;
        display: flex;
        flex-direction: column;
        background: #000;
        border-radius: 8px;
        min-height: 0;
        overflow: hidden;
      }
      
      .console-output {
        flex: 1;
        overflow-y: auto;
        overflow-x: auto;
        margin-bottom: 16px;
        padding: 8px;
        background: #000;
        border-radius: 4px;
        border: 1px solid #333;
        font-size: 13px;
        line-height: 1.4;
        color: #fff;
        min-height: 0;
        word-wrap: break-word;
        white-space: normal;
        overflow-wrap: break-word;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .console-output::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      
      .console-output::-webkit-scrollbar-track {
        background: #1a1a1a;
        border-radius: 6px;
        border: 1px solid #333;
      }
      
      .console-output::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 6px;
        border: 1px solid #555;
      }
      
      .console-output::-webkit-scrollbar-thumb:hover {
        background: #666;
      }
      
      .console-output::-webkit-scrollbar-corner {
        background: #1a1a1a;
        border: 1px solid #333;
      }
      
      .command-line {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: #0a0a0a;
        border-radius: 6px;
        border: 1px solid #333;
        flex-shrink: 0;
      }
      
      .prompt {
        color: #00ff00;
        font-weight: bold;
        font-size: 13px;
        text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
        white-space: nowrap;
        flex-shrink: 0;
      }
      
      .command-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-family: inherit;
        font-size: 13px;
        caret-color: #00ff00;
        min-width: 0;
      }
      
      .command-input::placeholder {
        color: #666;
      }
      
      .output-line {
        margin: 2px 0;
        padding: 2px 0;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .command-output {
        color: #fff;
        font-weight: 500;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .error-output {
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        border-left: 3px solid #ff6b6b;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .success-output {
        color: #51cf66;
        background: rgba(81, 207, 102, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        border-left: 3px solid #51cf66;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .info-output {
        color: #74c0fc;
        background: rgba(116, 192, 252, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        border-left: 3px solid #74c0fc;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .welcome-header {
        margin-bottom: 20px;
        padding: 8px 0;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .welcome-title {
        font-size: 18px;
        font-weight: bold;
        color: #00ff00;
        margin-bottom: 8px;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .welcome-info {
        color: #ccc;
        font-size: 13px;
        line-height: 1.5;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .help-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin: 16px 0;
      }
      
      .help-category {
        background: rgba(255, 255, 255, 0.05);
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #333;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .help-category h3 {
        color: #00ff00;
        margin: 0 0 8px 0;
        font-size: 14px;
        border-bottom: 1px solid #333;
        padding-bottom: 4px;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .help-command {
        display: flex;
        justify-content: space-between;
        margin: 4px 0;
        padding: 2px 0;
        flex-wrap: wrap;
        gap: 8px;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .help-command .cmd {
        color: #74c0fc;
        font-weight: bold;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .help-command .desc {
        color: #ccc;
        font-size: 12px;
        word-wrap: break-word;
        max-width: 150px;
        text-align: right;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      

      
      .system-info {
        background: rgba(255, 255, 255, 0.05);
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #333;
        margin: 8px 0;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .system-row {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        border-bottom: 1px solid #333;
        flex-wrap: wrap;
        gap: 8px;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .system-row:last-child {
        border-bottom: none;
      }
      
      .system-label {
        color: #74c0fc;
        font-weight: 500;
        margin-right: 16px;
        word-wrap: break-word;
        min-width: 120px;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .system-value {
        color: #fff;
        text-align: right;
        min-width: 0;
        word-wrap: break-word;
        max-width: 200px;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      @media (max-width: 600px) {
        .help-grid {
          grid-template-columns: 1fr;
        }
        
        .system-row {
          flex-direction: column;
          gap: 4px;
        }
        
        .system-value {
          text-align: left;
        }
      }
      
      /* Responsywność dla małych okien */
      @media (max-width: 500px) {
        .help-grid {
          grid-template-columns: 1fr;
          gap: 12px;
        }
        
        .help-category {
          padding: 8px;
        }
        
        .help-command {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .help-command .desc {
          text-align: left;
          max-width: none;
        }
        
        .system-row {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .system-value {
          text-align: left;
          max-width: none;
        }
      }
      
      /* Zapobieganie automatycznemu powiększaniu się okna */
      .terminal-container * {
        box-sizing: border-box;
      }
      
      /* Style dla listy aplikacji */
      .file-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 16px 0;
      }
      
      .file-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 6px;
        border: 1px solid #333;
        transition: all 0.2s ease;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
      
      .file-item:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #00ff00;
        transform: translateX(4px);
      }
      
      .file-icon {
        font-size: 20px;
        flex-shrink: 0;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      
      .file-name {
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        cursor: text;
      }
    </style>
    
    <script>
    $(document).ready(() => {
      var consoleDiv = $('#console');
      var commandInput = $('#commandInput');
      var commandHistory = [];
      var historyIndex = 0;
      
      // Nowe polecenia
      var commands = {
        'help': {
          description: 'Wyświetla listę dostępnych poleceń',
          execute: function() {
            appendToConsole(`
              <div class="help-grid">
                <div class="help-category">
                  <h3>🔧 Podstawowe polecenia</h3>
                  <div class="help-command">
                    <span class="cmd">help</span>
                    <span class="desc">Lista poleceń</span>
                  </div>
                  <div class="help-command">
                    <span class="cmd">cls</span>
                    <span class="desc">Wyczyść ekran</span>
                  </div>
                  <div class="help-command">
                    <span class="cmd">ver</span>
                    <span class="desc">Wersja systemu</span>
                  </div>
                  <div class="help-command">
                    <span class="cmd">exit</span>
                    <span class="desc">Zamknij terminal</span>
                  </div>
                </div>

                <div class="help-category">
                  <h3>💻 System</h3>
                  <div class="help-command">
                    <span class="cmd">sysinfo</span>
                    <span class="desc">Informacje systemowe</span>
                  </div>
                  <div class="help-command">
                    <span class="cmd">date</span>
                    <span class="desc">Data i czas</span>
                  </div>
                  <div class="help-command">
                    <span class="cmd">echo [tekst]</span>
                    <span class="desc">Wyświetl tekst</span>
                  </div>
                </div>
                <div class="help-category">
                  <h3>🎮 Aplikacje</h3>
                  <div class="help-command">
                    <span class="cmd">[nazwa].app</span>
                    <span class="desc">Uruchom aplikację</span>
                  </div>
                  <div class="help-command">
                    <span class="cmd">apps</span>
                    <span class="desc">Lista aplikacji</span>
                  </div>
                </div>
              </div>
            `);
          }
        },

        'sysinfo': {
          description: 'Informacje o systemie',
          execute: function() {
            var now = new Date();
            appendToConsole(`
              <div class="system-info">
                <div class="system-row">
                  <span class="system-label">System operacyjny:</span>
                  <span class="system-value">KusOS</span>
                </div>
                <div class="system-row">
                  <span class="system-label">Wersja:</span>
                  <span class="system-value">${build}</span>
                </div>
                <div class="system-row">
                  <span class="system-label">Data uruchomienia:</span>
                  <span class="system-value">${now.toLocaleDateString('pl-PL')}</span>
                </div>
                <div class="system-row">
                  <span class="system-label">Czas uruchomienia:</span>
                  <span class="system-value">${now.toLocaleTimeString('pl-PL')}</span>
                </div>
                <div class="system-row">
                  <span class="system-label">Przeglądarka:</span>
                  <span class="system-value">${navigator.userAgent.split(' ').pop()}</span>
                </div>
                <div class="system-row">
                  <span class="system-label">Język:</span>
                  <span class="system-value">${navigator.language}</span>
                </div>
              </div>
            `);
          }
        },
        'date': {
          description: 'Wyświetla aktualną datę i czas',
          execute: function() {
            var now = new Date();
            appendToConsole(`
              <div class="info-output">
                📅 Data: ${now.toLocaleDateString('pl-PL', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div class="info-output">
                🕐 Czas: ${now.toLocaleTimeString('pl-PL')}
              </div>
            `);
          }
        },
        'echo': {
          description: 'Wyświetla podany tekst',
          execute: function(args) {
            if (args.length > 0) {
              appendToConsole(`<div class="command-output">${args.join(' ')}</div>`);
            } else {
              appendToConsole(`<div class="error-output">Błąd: Podaj tekst do wyświetlenia</div>`);
            }
          }
        },


        'apps': {
          description: 'Lista dostępnych aplikacji',
          execute: function() {
            appendToConsole(`
              <div class="file-list">
                <div class="file-item">
                  <span class="file-icon">⌨️</span>
                  <span class="file-name">terminal.app</span>
                </div>
                <div class="file-item">
                  <span class="file-icon">🧮</span>
                  <span class="file-name">kalkulator.app</span>
                </div>
                <div class="file-item">
                  <span class="file-icon">⚙️</span>
                  <span class="file-name">ustawienia.app</span>
                </div>
              </div>
            `);
          }
        }
      };

      function executeCommand(command) {
        var parts = command.trim().split(' ');
        var cmd = parts[0].toLowerCase();
        var args = parts.slice(1);
        
        if (cmd === 'exit' || cmd === 'quit') {
          closeModal(oknoIlosc, 0);
          return;
        }
        
        if (cmd === 'cls' || cmd === 'clear') {
          consoleDiv.empty();
          showWelcome();
          return;
        }
        
        if (cmd === 'ver') {
          appendToConsole(`<div class="success-output">🚀 KusOS <span style="color: #00ff00; font-weight: bold;">${build}</span></div>`);
          return;
        }
        
        if (cmd.endsWith('.app')) {
          otworzOkno(cmd);
          return;
        }
        
        // Sprawdź czy to wbudowane polecenie
        if (commands[cmd]) {
          commands[cmd].execute(args);
          return;
        }
        
        // Próba wykonania jako JavaScript
        try {
          var result = eval(command);
          if (result !== undefined) {
            appendToConsole(`<div class="command-output">${result}</div>`);
          }
        } catch (error) {
          appendToConsole(`<div class="error-output">❌ Błąd: ${error.message}</div>`);
        }
        
        commandHistory.push(command);
        historyIndex = commandHistory.length;
      }

      function appendToConsole(text) {
        consoleDiv.append(`<div class="output-line">${text}</div>`);
        // Automatyczne przewijanie do dołu
        setTimeout(() => {
          consoleDiv.scrollTop(consoleDiv.prop('scrollHeight'));
        }, 10);
      }
      
      function showWelcome() {
        appendToConsole(`
          <div class="welcome-header">
            <div class="welcome-title">KusOS ${build}</div>
            <div class="welcome-info">
              Wpisz 'help' aby zobaczyć listę dostępnych poleceń<br>
              Użyj strzałek ↑↓ do nawigacji po historii poleceń
            </div>
          </div>
        `);
      }

      // Inicjalizacja
      showWelcome();
      
      // Zapobieganie automatycznemu powiększaniu się okna
      function preventAutoResize() {
        var container = $('.terminal-container');
        var currentWidth = container.width();
        var currentHeight = container.height();
        
        // Zapisz aktualny rozmiar
        container.data('user-width', currentWidth);
        container.data('user-height', currentHeight);
      }
      
      // Zapisz rozmiar po załadowaniu
      setTimeout(preventAutoResize, 100);
      
      // Zapisz rozmiar przy zmianie przez użytkownika
      var resizeTimeout;
      $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(preventAutoResize, 100);
      });

      // Obsługa klawiszy
      commandInput.keydown((e) => {
        if (e.which === 38) { // Strzałka w górę
          if (historyIndex > 0) {
            historyIndex--;
            commandInput.val(commandHistory[historyIndex]);
          }
        } else if (e.which === 40) { // Strzałka w dół
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.val(commandHistory[historyIndex]);
          } else {
            historyIndex = commandHistory.length;
            commandInput.val('');
          }
        }
      });

      commandInput.keypress((e) => {
        if (e.which === 13) {
          var command = commandInput.val();
          if (command.trim()) {
            commandInput.val('');
            appendToConsole(`<div class="command-output"><span style="color: #00ff00;">$</span> ${command}</div>`);
            executeCommand(command);
          }
        }
      });
      
      // Fokus na input
      commandInput.focus();
    });
    </script>