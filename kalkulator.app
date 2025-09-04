- tytul: "Kalkulator"
  ikona: "🧮"
  resizable: "false"
  content: >
    <div class="content calculator-content" style="display: flex; flex-direction: column; padding: 20px; gap: 15px; justify-content: flex-start;">
        
        <!-- Wyświetlacz -->
        <div id="display" style="
            background: var(--background-color, #1a1a1a);
            border: 2px solid var(--kolor);
            border-radius: 8px;
            padding: 20px;
            text-align: right;
            font-size: 32px;
            font-weight: bold;
            font-family: Tahoma, sans-serif;
            color: var(--kolor);
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);
        ">
            0
        </div>
        
        <!-- Przyciski kalkulatora -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; flex: 1;">
            
            <!-- Pierwszy rząd -->
            <button class="calc-btn function-btn" onclick="clearDisplay()" style="grid-column: span 2;">
                C
            </button>
            <button class="calc-btn function-btn" onclick="deleteLastChar()">
                ⌫
            </button>
            <button class="calc-btn operator-btn" onclick="setOperator('/')">
                ÷
            </button>
            
            <!-- Drugi rząd -->
            <button class="calc-btn number-btn" onclick="appendNumber('7')">7</button>
            <button class="calc-btn number-btn" onclick="appendNumber('8')">8</button>
            <button class="calc-btn number-btn" onclick="appendNumber('9')">9</button>
            <button class="calc-btn operator-btn" onclick="setOperator('*')">×</button>
            
            <!-- Trzeci rząd -->
            <button class="calc-btn number-btn" onclick="appendNumber('4')">4</button>
            <button class="calc-btn number-btn" onclick="appendNumber('5')">5</button>
            <button class="calc-btn number-btn" onclick="appendNumber('6')">6</button>
            <button class="calc-btn operator-btn" onclick="setOperator('-')">−</button>
            
            <!-- Czwarty rząd -->
            <button class="calc-btn number-btn" onclick="appendNumber('1')">1</button>
            <button class="calc-btn number-btn" onclick="appendNumber('2')">2</button>
            <button class="calc-btn number-btn" onclick="appendNumber('3')">3</button>
            <button class="calc-btn operator-btn" onclick="setOperator('+')">+</button>
            
            <!-- Piąty rząd -->
            <button class="calc-btn function-btn" onclick="changeSign()">±</button>
            <button class="calc-btn number-btn" onclick="appendNumber('0')">0</button>
            <button class="calc-btn number-btn" onclick="appendNumber('.')">.</button>
            <button class="calc-btn equals-btn" onclick="calculate()">=</button>
        </div>
    </div>
    
    <style>
        /* Style dla przycisków kalkulatora */
        .calculator-content {
            align-items: inherit;
        }

        .calc-btn {
            padding: 15px;
            border: 1px solid rgb(78, 78, 78);
            border-radius: 8px;
            background: var(--background-color, #1a1a1a);
            color: var(--kolor);
            font-size: 18px;
            font-weight: bold;
            font-family: Tahoma, sans-serif;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 50px;
            min-width: 0px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8);
        }

        .calc-btn:hover {
            background: color-mix(in srgb, var(--kolor) 20%, transparent);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .calc-btn:active {
            background: color-mix(in srgb, var(--kolor) 40%, transparent);
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transform: translateY(1px);
        }
        
        /* Style dla różnych typów przycisków */
        .number-btn {
            background: var(--background-color, #1a1a1a);
            color: inherit;
        }
        
        .operator-btn {
            background: color-mix(in srgb, var(--kolor) 15%, transparent);
            color: var(--kolor);
            font-weight: bold;
        }
        
        .function-btn {
            background: color-mix(in srgb, var(--kolor) 25%, transparent);
            color: var(--kolor);
            font-weight: bold;
        }
        
        .equals-btn {
            background: var(--kolor);
            color: white;
            font-weight: bold;
        }
        
        .equals-btn:hover {
            background: color-mix(in srgb, var(--kolor) 80%, black);
        }
        
        .equals-btn:active {
            background: color-mix(in srgb, var(--kolor) 60%, black);
            transform: translateY(1px);
        }
        
        /* Style dla trybu jasnego */
        .light .calc-btn {
            background: #f5f5f5;
            color: #333;
            border-color: #ddd;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8), 1px -1px 2px rgba(255, 255, 255, 0.8), -1px 1px 2px rgba(255, 255, 255, 0.8);
        }
        
        .light .number-btn {
            background: #ffffff;
            color: #333;
        }
        
        .light .operator-btn {
            background: color-mix(in srgb, var(--kolor) 15%, white);
            color: var(--kolor);
            border-color: color-mix(in srgb, var(--kolor) 30%, #ddd);
        }
        
        .light .function-btn {
            background: color-mix(in srgb, var(--kolor) 20%, white);
            color: var(--kolor);
            border-color: color-mix(in srgb, var(--kolor) 40%, #ddd);
        }
        
        .light .equals-btn {
            background: var(--kolor);
            color: white;
            border-color: var(--kolor);
        }
        
        .light .equals-btn:hover {
            background: color-mix(in srgb, var(--kolor) 90%, white);
        }
        
        .light .calc-btn:hover {
            background: color-mix(in srgb, var(--kolor) 10%, #f0f0f0);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .light .number-btn:hover {
            background: color-mix(in srgb, var(--kolor) 5%, white);
        }
        
        .light .operator-btn:hover {
            background: color-mix(in srgb, var(--kolor) 25%, white);
        }
        
        .light .function-btn:hover {
            background: color-mix(in srgb, var(--kolor) 30%, white);
        }
        
        /* Style dla stanu active w trybie jasnym */
        .light .calc-btn:active {
            background: color-mix(in srgb, var(--kolor) 20%, #e0e0e0);
            transform: translateY(1px);
        }
        
        .light .number-btn:active {
            background: color-mix(in srgb, var(--kolor) 10%, #e8e8e8);
        }
        
        .light .operator-btn:active {
            background: color-mix(in srgb, var(--kolor) 30%, #e0e0e0);
        }
        
        .light .function-btn:active {
            background: color-mix(in srgb, var(--kolor) 35%, #e0e0e0);
        }
        
        .light .equals-btn:active {
            background: color-mix(in srgb, var(--kolor) 80%, #e0e0e0);
        }
        
        /* Responsywność */
        @media (max-width: 500px) {
            .calc-btn {
                padding: 12px;
                font-size: 16px;
                min-height: 45px;
            }
            
            #display {
                font-size: 28px;
                padding: 15px;
            }
        }
        
        /* Style dla wyświetlacza */
        #display {
            overflow: hidden;
            white-space: nowrap;
        }
        
        /* Style dla nieaktywnych przycisków */
        .calc-btn:disabled {
            opacity: 0.5;
            background: #666 !important;
            color: #999 !important;
            border-color: #555 !important;
        }
        
        .calc-btn:disabled:hover {
            background: #666 !important;
            box-shadow: none !important;
            transform: none !important;
        }
        
        /* Wyjątek dla przycisku C w stanie błędu */
        .calc-btn:disabled.function-btn[onclick="clearDisplay()"] {
            opacity: 1;
            background: color-mix(in srgb, var(--kolor) 25%, transparent) !important;
            color: var(--kolor) !important;
            border-color: var(--kolor) !important;
        }
        
        .calc-btn:disabled.function-btn[onclick="clearDisplay()"]:hover {
            background: color-mix(in srgb, var(--kolor) 35%, transparent) !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
        }
        
        .calc-btn:disabled.function-btn[onclick="clearDisplay()"]:active {
            background: color-mix(in srgb, var(--kolor) 45%, transparent) !important;
            transform: translateY(1px) !important;
        }
        
        /* Style dla trybu jasnego - nieaktywne przyciski */
        .light .calc-btn:disabled {
            background: #ccc !important;
            color: #666 !important;
            border-color: #bbb !important;
        }
        
        .light .calc-btn:disabled.function-btn[onclick="clearDisplay()"] {
            background: color-mix(in srgb, var(--kolor) 20%, white) !important;
            color: var(--kolor) !important;
            border-color: color-mix(in srgb, var(--kolor) 40%, #ddd) !important;
        }
        
        .light .calc-btn:disabled.function-btn[onclick="clearDisplay()"]:hover {
            background: color-mix(in srgb, var(--kolor) 30%, white) !important;
        }
        
        .light .calc-btn:disabled.function-btn[onclick="clearDisplay()"]:active {
            background: color-mix(in srgb, var(--kolor) 35%, white) !important;
        }
    </style>
    
    <script>
        // Inicjalizacja zmiennych - sprawdź czy już istnieją
        if (typeof window.calculatorVars === 'undefined') {
            window.calculatorVars = {
                currentNumber: '0',
                previousNumber: null,
                currentOperator: null,
                shouldResetDisplay: false,
                lastOperand: null,  // Ostatni składnik do powtarzania operacji
                keyboardInputEnabled: true,  // Flaga kontrolująca wprowadzanie z klawiatury
                errorState: false  // Flaga stanu błędu
            };
        }
        
        // Pobierz element wyświetlacza - zawsze aktualizuj referencję
        window.calculatorDisplay = document.getElementById('display');
        
        // Funkcja resetowania kalkulatora
        function resetCalculator() {
            window.calculatorVars.currentNumber = '0';
            window.calculatorVars.previousNumber = null;
            window.calculatorVars.currentOperator = null;
            window.calculatorVars.shouldResetDisplay = false;
            window.calculatorVars.lastOperand = null;
            window.calculatorVars.keyboardInputEnabled = true;
            window.calculatorVars.errorState = false;
            
            // Przywróć normalny wygląd wyświetlacza
            if (window.calculatorDisplay) {
                window.calculatorDisplay.style.color = 'var(--kolor)';
                window.calculatorDisplay.style.borderColor = 'var(--kolor)';
            }
            
            // Aktywuj wszystkie przyciski
            enableAllButtons();
            
            updateDisplay();
        }
        
        // Resetuj kalkulator przy każdym otwarciu
        resetCalculator();
        
        // Funkcja dodawania liczby
        function appendNumber(num) {
            // Tymczasowo wyłącz wprowadzanie z klawiatury
            window.calculatorVars.keyboardInputEnabled = false;
            
            if (window.calculatorVars.shouldResetDisplay) {
                window.calculatorVars.currentNumber = '';
                window.calculatorVars.shouldResetDisplay = false;
            }
            
            if (num === '.' && window.calculatorVars.currentNumber.includes('.')) {
                // Włącz ponownie wprowadzanie z klawiatury
                setTimeout(() => { window.calculatorVars.keyboardInputEnabled = true; }, 100);
                return; // Nie pozwól na więcej niż jedną kropkę
            }
            
            if (window.calculatorVars.currentNumber === '0' && num !== '.') {
                window.calculatorVars.currentNumber = num;
            } else {
                window.calculatorVars.currentNumber += num;
            }
            
            updateDisplay();
            
            // Włącz ponownie wprowadzanie z klawiatury po krótkim opóźnieniu
            setTimeout(() => { window.calculatorVars.keyboardInputEnabled = true; }, 100);
        }
        
        // Funkcja zmiany znaku liczby
        function changeSign() {
            if (window.calculatorVars.currentNumber !== '0') {
                if (window.calculatorVars.currentNumber.startsWith('-')) {
                    window.calculatorVars.currentNumber = window.calculatorVars.currentNumber.substring(1);
                } else {
                    window.calculatorVars.currentNumber = '-' + window.calculatorVars.currentNumber;
                }
                updateDisplay();
            }
        }
        
        // Funkcja ustawiania operatora
        function setOperator(operator) {
            if (window.calculatorVars.currentOperator && !window.calculatorVars.shouldResetDisplay) {
                calculate();
            }
            
            window.calculatorVars.previousNumber = parseFloat(window.calculatorVars.currentNumber);
            window.calculatorVars.currentOperator = operator;
            window.calculatorVars.shouldResetDisplay = true;
            
            // Zapisz ostatni składnik tylko gdy ustawiamy nowy operator
            if (operator !== '=') {
                window.calculatorVars.lastOperand = parseFloat(window.calculatorVars.currentNumber);
            }
        }
        
        // Funkcja obliczania
        function calculate() {
            let result;
            
            if (window.calculatorVars.currentOperator && window.calculatorVars.previousNumber !== null) {
                // Normalne obliczenie
                const current = parseFloat(window.calculatorVars.currentNumber);
                
                switch (window.calculatorVars.currentOperator) {
                    case '+':
                        result = window.calculatorVars.previousNumber + current;
                        break;
                    case '-':
                        result = window.calculatorVars.previousNumber - current;
                        break;
                    case '*':
                        result = window.calculatorVars.previousNumber * current;
                        break;
                    case '/':
                        if (current === 0) {
                            showError('Dzielenie przez 0');
                            return;
                        }
                        result = window.calculatorVars.previousNumber / current;
                        break;
                }
                
                // Sprawdź czy wynik to Infinity lub -Infinity
                if (!isFinite(result)) {
                    showError('Poza zakresem');
                    return;
                }
                
                // Zapisz wynik jako nową liczbę aktualną
                window.calculatorVars.currentNumber = result.toString();
                
                // Zachowaj operator i ostatni składnik dla powtarzania
                // window.calculatorVars.currentOperator pozostaje ustawiony
                // window.calculatorVars.lastOperand pozostaje ustawiony
                
                window.calculatorVars.shouldResetDisplay = true;
                updateDisplay();
                
            } else if (window.calculatorVars.currentOperator && window.calculatorVars.lastOperand !== null) {
                // Powtarzanie ostatniej operacji (ponowne wciśnięcie =)
                const current = parseFloat(window.calculatorVars.currentNumber);
                
                switch (window.calculatorVars.currentOperator) {
                    case '+':
                        result = current + window.calculatorVars.lastOperand;
                        break;
                    case '-':
                        result = current - window.calculatorVars.lastOperand;
                        break;
                    case '*':
                        result = current * window.calculatorVars.lastOperand;
                        break;
                    case '/':
                        if (window.calculatorVars.lastOperand === 0) {
                            showError('Błąd: Dzielenie przez zero');
                            return;
                        }
                        result = current / window.calculatorVars.lastOperand;
                        break;
                }
                
                // Sprawdź czy wynik to Infinity lub -Infinity
                if (!isFinite(result)) {
                    showError('Błąd');
                    return;
                }
                
                window.calculatorVars.currentNumber = result.toString();
                window.calculatorVars.shouldResetDisplay = true;
                updateDisplay();
            }
        }
        
        // Funkcja wyświetlania błędu
        function showError(message) {
            window.calculatorVars.currentNumber = '0';
            window.calculatorVars.previousNumber = null;
            window.calculatorVars.currentOperator = null;
            window.calculatorVars.shouldResetDisplay = false;
            window.calculatorVars.lastOperand = null;
            window.calculatorVars.errorState = true;
            
            // Wyświetl błąd na wyświetlaczu
            window.calculatorDisplay.textContent = message;
            window.calculatorDisplay.style.color = '#ff4444';
            window.calculatorDisplay.style.borderColor = '#ff4444';
            
            // Dezaktywuj wszystkie przyciski oprócz C
            disableButtonsExceptClear();
        }
        
        // Funkcja dezaktywacji przycisków oprócz C
        function disableButtonsExceptClear() {
            const buttons = document.querySelectorAll('.calc-btn:not(.function-btn[onclick="clearDisplay()"])');
            buttons.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = '';
            });
        }
        
        // Funkcja aktywacji wszystkich przycisków
        function enableAllButtons() {
            const buttons = document.querySelectorAll('.calc-btn');
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = '';
            });
        }
        
        // Funkcja czyszczenia wyświetlacza
        function clearDisplay() {
            window.calculatorVars.currentNumber = '0';
            window.calculatorVars.previousNumber = null;
            window.calculatorVars.currentOperator = null;
            window.calculatorVars.shouldResetDisplay = false;
            window.calculatorVars.lastOperand = null;  // Zapomnij ostatni składnik
            window.calculatorVars.errorState = false;
            
            // Przywróć normalny wygląd wyświetlacza
            window.calculatorDisplay.style.color = 'var(--kolor)';
            window.calculatorDisplay.style.borderColor = 'var(--kolor)';
            
            // Aktywuj wszystkie przyciski
            enableAllButtons();
            
            updateDisplay();
        }
        
        // Funkcja usuwania ostatniego znaku
        function deleteLastChar() {
            if (window.calculatorVars.currentNumber.length > 1) {
                window.calculatorVars.currentNumber = window.calculatorVars.currentNumber.slice(0, -1);
            } else {
                window.calculatorVars.currentNumber = '0';
            }
            updateDisplay();
        }
        
        // Funkcja aktualizacji wyświetlacza
        function updateDisplay() {
            let displayValue = window.calculatorVars.currentNumber;
            
            // Sprawdź czy liczba jest zbyt długa (więcej niż 12 cyfr)
            const digitCount = displayValue.replace(/[^0-9]/g, '').length;
            
            if (digitCount > 12) {
                // Konwertuj na notację naukową
                const num = parseFloat(displayValue);
                if (!isNaN(num)) {
                    displayValue = num.toExponential(6); // 6 miejsc po przecinku w notacji naukowej
                }
            } else {
                // Normalne formatowanie dla liczb <= 12 cyfr
                if (displayValue.includes('.')) {
                    // Dla liczb dziesiętnych, pokaż maksymalnie 8 miejsc po przecinku
                    const parts = displayValue.split('.');
                    if (parts[1].length > 8) {
                        displayValue = parseFloat(window.calculatorVars.currentNumber).toFixed(8);
                        // Usuń niepotrzebne zera na końcu
                        displayValue = parseFloat(displayValue).toString();
                    }
                } else {
                    // Dla liczb całkowitych, dodaj separator tysięcy jeśli liczba jest duża
                    const num = parseFloat(displayValue);
                    if (num >= 1000) {
                        displayValue = num.toLocaleString('pl-PL');
                    }
                }
            }
            
            window.calculatorDisplay.textContent = displayValue;
        }
        
        // Obsługa klawiatury
        document.addEventListener('keydown', function(event) {
            // Sprawdź czy wprowadzanie z klawiatury jest włączone
            if (!window.calculatorVars.keyboardInputEnabled) {
                return;
            }
            
            const key = event.key;
            
            if (key >= '0' && key <= '9' || key === '.') {
                appendNumber(key);
            } else if (key === '+' || key === '-') {
                setOperator(key);
            } else if (key === '*' || key === 'x' || key === 'X') {
                setOperator('*');
            } else if (key === '/') {
                setOperator('/');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape') {
                clearDisplay();
            } else if (key === 'Backspace') {
                deleteLastChar();
            }
        });
        
        // Inicjalizacja
        updateDisplay();
        
        // Obsługa zamknięcia okna - resetuj kalkulator
        window.addEventListener('beforeunload', function() {
            resetCalculator();
        });
        
        // Dodatkowa obsługa dla systemu KusOS - reset przy zamknięciu
        if (typeof window.addEventListener === 'function') {
            window.addEventListener('unload', function() {
                resetCalculator();
            });
        }
    </script>
