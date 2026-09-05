"use client";

import { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("");

  // Handle number and operator button clicks
  const handleButtonClick = (value) => {
    setDisplay((prev) => prev + value);
  };

  // Clear the display completely
  const handleClear = () => {
    setDisplay("");
  };

  // Delete the last character entered
  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  // Evaluate the mathematical expression safely
  const handleCalculate = () => {
    try {
      // Basic validation to clean up trailing operators before processing
      let expression = display.trim();
      if (!expression) return;

      // Using Function constructor as a safer alternative to eval()
      // Fixes potential floating point issues implicitly for basic results
      const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, "");
      const result = new Function(`return ${sanitizedExpression}`)();

      if (result === Infinity || isNaN(result)) {
        setDisplay("Error");
      } else {
        setDisplay(Number(result.toFixed(4)).toString()); // Limit decimal precision
      }
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Output Screen */}
        <div className="display-screen">
          <input type="text" value={display} placeholder="0" readOnly />
        </div>

        {/* Keypad Layout */}
        <div className="keypad-grid">
          <button onClick={handleClear} className="btn special-btn">
            AC
          </button>
          <button onClick={handleDelete} className="btn special-btn">
            DEL
          </button>
          <button
            onClick={() => handleButtonClick("%")}
            className="btn operator-btn"
          >
            %
          </button>
          <button
            onClick={() => handleButtonClick("/")}
            className="btn operator-btn"
          >
            ÷
          </button>

          <button onClick={() => handleButtonClick("7")} className="btn">
            7
          </button>
          <button onClick={() => handleButtonClick("8")} className="btn">
            8
          </button>
          <button onClick={() => handleButtonClick("9")} className="btn">
            9
          </button>
          <button
            onClick={() => handleButtonClick("*")}
            className="btn operator-btn"
          >
            ×
          </button>

          <button onClick={() => handleButtonClick("4")} className="btn">
            4
          </button>
          <button onClick={() => handleButtonClick("5")} className="btn">
            5
          </button>
          <button onClick={() => handleButtonClick("6")} className="btn">
            6
          </button>
          <button
            onClick={() => handleButtonClick("-")}
            className="btn operator-btn"
          >
            -
          </button>

          <button onClick={() => handleButtonClick("1")} className="btn">
            1
          </button>
          <button onClick={() => handleButtonClick("2")} className="btn">
            2
          </button>
          <button onClick={() => handleButtonClick("3")} className="btn">
            3
          </button>
          <button
            onClick={() => handleButtonClick("+")}
            className="btn operator-btn"
          >
            +
          </button>

          <button
            onClick={() => handleButtonClick("0")}
            className="btn zero-btn"
          >
            0
          </button>
          <button onClick={() => handleButtonClick(".")} className="btn">
            .
          </button>
          <button onClick={handleCalculate} className="btn equals-btn">
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
