- tytul: "Terminal"
  ikona: "⌨️"
  resizable: "true"
  maximize: "true"
  content: >
    <div style="background-color: #111; height: calc(100% - 43px);">
    <div style="padding: 10px 10px 0 10px; min-height: 300px; overflow-wrap: normal; overflow: auto; color: #eeeeee">
      <div id="console" style="background-color: #111; color: white;"></div>
      <span style="float: left; margin-top: 1em; width: 100%;">> <input id="commandInput" type="text" autocomplete="off" style="padding: 0; width:calc(100% - 15px); background-color: inherit; box-sizing: border-box; border: none; outline: none;"></span>
    </div>
    </div>
    <script>
    $(document).ready(function() {
      var consoleDiv = $('#console');
      var commandInput = $('#commandInput');
      var commandHistory = [];
      var historyIndex = 0;

      function executeCommand(command) {
          if((command.toLowerCase() === "exit") || (command.toLowerCase() === "quit"))  {
            closeModal(oknoIlosc, 0);
          } else if(command.toLowerCase().substr(command.length-4) === ".app") {
            otworzOkno(command);
          } else if(command.toLowerCase() === "ver") {
            appendToConsole("KusOS  <span class='build'>"+build+"</span></br>");
          } else if((command.toLowerCase() === "cls")||(command.toLowerCase() === "clear"))
            consoleDiv.text("");
           else {
          try {
            var result = eval(command);
            console.log(result);
            appendToConsole(result);
          } catch (error) {
            console.error(error);
            appendToConsole("<span style='background-color: #881111;'>Wystąpił błąd. => " + error.message + "</span>");
          }
        }

        commandHistory.push(command);
        historyIndex = commandHistory.length;
      }

      function appendToConsole(text) {
        consoleDiv.append('<div>' + text + '</div>');
        consoleDiv.scrollTop(consoleDiv.prop('scrollHeight'));
      }

      appendToConsole("<span style='font-size: 19px'><span style='font-weight: bold'>KusOS</span>  <span class='build'>"+build+"</span></span></br>");

      commandInput.keydown(function(e) {
        if (e.which === 38) {
          if (historyIndex > 0) {
            historyIndex--;
            commandInput.val(commandHistory[historyIndex]);
          }
        } else if (e.which === 40) {
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.val(commandHistory[historyIndex]);
          } else {
            historyIndex = commandHistory.length;
            commandInput.val('');
          }
        }
      });

      commandInput.keypress(function(e) {
        if (e.which === 13) {
          var command = commandInput.val();
          commandInput.val('');
          appendToConsole('> ' + command);
          executeCommand(command);
        }
      });
      });
    </script>