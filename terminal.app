- tytul: "Terminal"
  ikona: "⌨️"
  resizable: "true"
  maximize: "true"
  content: >
    <div id="console" style="height: calc(100% - 43px - 56px); min-height: 300px; word-wrap: normal; border-bottom: 1px solid #666666; overflow: auto; padding: 10px; background-color: #111; color: white;"></div>
    <input id="commandInput" type="text" placeholder="Wprowadź polecenie" autocomplete="off" style="width: 100%; padding: 10px; box-sizing: border-box; background-color: #111; border: none; outline: none;">
    <script>
      $(document).ready(function() {
        var consoleDiv = $('#console');
        var commandInput = $('#commandInput');

        function executeCommand(command) {
          if((command.toLowerCase() === "exit") || (command.toLowerCase() === "quit"))
          {
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
                  appendToConsole('>> ' + command);
                  appendToConsole(result);
              } catch (error) {
                  console.error(error);
                    appendToConsole("<span style='background-color: #881111;'>Wystąpił błąd. => " + error.message + "</span>");
                }
              }
        }

        function appendToConsole(text) {
          consoleDiv.append('<div>' + text + '</div>');
          consoleDiv.scrollTop(consoleDiv.prop('scrollHeight'));
        }
        appendToConsole("<span style='font-size: 19px'><span style='font-weight: bold'>KusOS</span>  <span class='build'></span></span></br>");
        commandInput.keypress(function(e) {
          if (e.which === 13) {
            var command = commandInput.val();
            commandInput.val('');
            appendToConsole('> ' + command);
            executeCommand(command);
          }
        });

        $(".build").text(build);
      });
      </script>