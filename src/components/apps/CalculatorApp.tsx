"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { cn } from "@/lib/utils";
import { History, LayoutGrid, Delete } from "lucide-react";
import { AnimatePresence } from "framer-motion";

type Mode = "basic" | "scientific";

export default function CalculatorApp() {
  const [mode, setMode] = useState<Mode>("basic");
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const equationRef = useRef<HTMLDivElement>(null);

  // Scroll equation to right on change
  useEffect(() => {
    if (equationRef.current) {
      equationRef.current.scrollLeft = equationRef.current.scrollWidth;
    }
  }, [equation]);

  // Handle digit input
  const inputDigit = useCallback((digit: string) => {
    if (display === "0" || shouldReset) {
      setDisplay(digit);
      setShouldReset(false);
    } else {
      setDisplay(display + digit);
    }
  }, [display, shouldReset]);

  // Handle decimal
  const inputDecimal = useCallback(() => {
    if (shouldReset) {
      setDisplay("0.");
      setShouldReset(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, shouldReset]);

  // Handle clear/reset
  const clearAll = useCallback(() => {
    setDisplay("0");
    setEquation("");
    setShouldReset(false);
  }, []);

  // Handle backspace
  const backspace = useCallback(() => {
    if (shouldReset) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display, shouldReset]);

  // Handle +/- sign
  const toggleSign = useCallback(() => {
    setDisplay((prev) => {
      const val = parseFloat(prev);
      if (isNaN(val)) return prev;
      return (val * -1).toString();
    });
  }, []);

  // Handle standard operations
  const inputOperator = useCallback((op: string) => {
    setEquation((prev) => {
      // If we just got a result, chain from it
      const base = shouldReset ? display : prev + display;
      setShouldReset(true);
      return `${base} ${op} `;
    });
  }, [display, shouldReset]);

  // Handle percentage
  const percentage = useCallback(() => {
    setDisplay((prev) => {
      const val = parseFloat(prev);
      if (isNaN(val)) return prev;
      return (val / 100).toString();
    });
  }, []);

  // Scientific specific functions
  const inputScientificFunc = useCallback((func: string) => {
    setDisplay((prev) => {
      const val = parseFloat(prev);
      if (isNaN(val)) return prev;
      let result = 0;
      switch (func) {
        case "sin": result = Math.sin((val * Math.PI) / 180); break; // degrees
        case "cos": result = Math.cos((val * Math.PI) / 180); break;
        case "tan": result = Math.tan((val * Math.PI) / 180); break;
        case "ln": result = Math.log(val); break;
        case "log": result = Math.log10(val); break;
        case "sqrt": result = Math.sqrt(val); break;
        case "sqr": result = Math.pow(val, 2); break;
        case "cube": result = Math.pow(val, 3); break;
        case "abs": result = Math.abs(val); break;
        case "exp": result = Math.exp(val); break;
        default: return prev;
      }
      setShouldReset(true);
      return Number(result.toFixed(10)).toString(); // format float
    });
  }, []);

  // Input constants
  const inputConstant = useCallback((constant: string) => {
    if (constant === "pi") {
      setDisplay(Math.PI.toString());
    } else if (constant === "e") {
      setDisplay(Math.E.toString());
    }
    setShouldReset(true);
  }, []);

  // Calculate results
  const calculate = useCallback(() => {
    if (!equation) return;
    const fullEq = equation + display;
    
    // Evaluate safely
    try {
      // Replace display division/multiplication signs
      let cleaned = fullEq
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**");

      // Basic evaluation
      const evalResult = eval(cleaned);
      const formatted = Number(Number(evalResult).toFixed(10)).toString();
      
      setDisplay(formatted);
      setEquation("");
      setShouldReset(true);
      setHistory((prev) => [`${fullEq} = ${formatted}`, ...prev.slice(0, 19)]);
    } catch (e) {
      setDisplay("Error");
      setEquation("");
      setShouldReset(true);
    }
  }, [equation, display]);

  // Memory functions
  const handleMemory = useCallback((action: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    switch (action) {
      case "MC": setMemory(0); break;
      case "MR": setDisplay(memory.toString()); setShouldReset(true); break;
      case "M+": setMemory((m) => m + val); setShouldReset(true); break;
      case "M-": setMemory((m) => m - val); setShouldReset(true); break;
    }
  }, [display, memory]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if input is focused
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;

      const key = e.key;

      if (/[0-9]/.test(key)) {
        e.preventDefault();
        inputDigit(key);
      } else if (key === ".") {
        e.preventDefault();
        inputDecimal();
      } else if (key === "+") {
        e.preventDefault();
        inputOperator("+");
      } else if (key === "-") {
        e.preventDefault();
        inputOperator("-");
      } else if (key === "*") {
        e.preventDefault();
        inputOperator("×");
      } else if (key === "/") {
        e.preventDefault();
        inputOperator("÷");
      } else if (key === "%") {
        e.preventDefault();
        percentage();
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        e.preventDefault();
        backspace();
      } else if (key === "Escape") {
        e.preventDefault();
        clearAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputDigit, inputDecimal, inputOperator, percentage, calculate, backspace, clearAll]);

  // Button components
  const CalcButton = ({
    label,
    onClick,
    className,
    variant = "gray",
  }: {
    label: string | React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: "gray" | "dark-gray" | "orange" | "scientific";
  }) => {
    return (
      <button
        onClick={onClick}
        className={cn(
          "h-10 text-[13px] font-medium rounded-full flex items-center justify-center transition-all select-none active:brightness-125 focus:outline-none shadow",
          variant === "gray" && "bg-neutral-300 hover:bg-neutral-400 text-black",
          variant === "dark-gray" && "bg-zinc-700 hover:bg-zinc-600 text-white",
          variant === "orange" && "bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[15px]",
          variant === "scientific" && "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px]",
          className
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <AppShell noPadding>
      <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
        {/* App Titlebar controls */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => setMode(mode === "basic" ? "scientific" : "basic")}
              className="p-1.5 hover:bg-white/10 rounded transition-colors text-xs flex items-center gap-1 opacity-70 hover:opacity-100"
              title="Toggle Layout"
            >
              <LayoutGrid size={13} />
              <span className="capitalize">{mode}</span>
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "p-1.5 rounded transition-colors text-xs flex items-center gap-1 opacity-70 hover:opacity-100",
                showHistory && "bg-white/10"
              )}
              title="Calculation History"
            >
              <History size={13} />
            </button>
          </div>
          <span className="text-[10px] opacity-40 uppercase tracking-widest font-mono">Calculator</span>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Calculator */}
          <div className="flex-1 flex flex-col p-4 justify-end gap-3 min-w-[280px]">
            {/* Display screen */}
            <div className="flex flex-col items-end pr-2 select-text shrink-0 justify-end overflow-hidden">
              <div 
                ref={equationRef}
                className="text-[11px] opacity-50 tracking-wide font-mono truncate max-w-full text-right overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth h-5"
              >
                {equation}
              </div>
              <div className="text-3xl font-light tracking-tight truncate max-w-full leading-none mt-1 h-9 select-text">
                {display}
              </div>
            </div>

            {/* Scientific Memory keys row */}
            <div className="grid grid-cols-4 gap-1.5">
              {["MC", "MR", "M+", "M-"].map((mem) => (
                <CalcButton
                  key={mem}
                  label={mem}
                  onClick={() => handleMemory(mem)}
                  variant={mode === "scientific" ? "scientific" : "dark-gray"}
                  className="h-7 text-[10px] rounded-lg"
                />
              ))}
            </div>

            {/* Buttons Layout */}
            <div className="flex gap-2 select-none">
              {/* Scientific keypad */}
              {mode === "scientific" && (
                <div className="grid grid-cols-3 gap-1.5 w-[140px] shrink-0">
                  <CalcButton label="sin" onClick={() => inputScientificFunc("sin")} variant="scientific" />
                  <CalcButton label="cos" onClick={() => inputScientificFunc("cos")} variant="scientific" />
                  <CalcButton label="tan" onClick={() => inputScientificFunc("tan")} variant="scientific" />
                  <CalcButton label="ln" onClick={() => inputScientificFunc("ln")} variant="scientific" />
                  <CalcButton label="log" onClick={() => inputScientificFunc("log")} variant="scientific" />
                  <CalcButton label="√" onClick={() => inputScientificFunc("sqrt")} variant="scientific" />
                  <CalcButton label="x²" onClick={() => inputScientificFunc("sqr")} variant="scientific" />
                  <CalcButton label="x³" onClick={() => inputScientificFunc("cube")} variant="scientific" />
                  <CalcButton label="^" onClick={() => inputOperator("^")} variant="scientific" />
                  <CalcButton label="π" onClick={() => inputConstant("pi")} variant="scientific" />
                  <CalcButton label="e" onClick={() => inputConstant("e")} variant="scientific" />
                  <CalcButton label="abs" onClick={() => inputScientificFunc("abs")} variant="scientific" />
                </div>
              )}

              {/* Standard keypad */}
              <div className="grid grid-cols-4 gap-1.5 flex-1">
                {/* Row 1 */}
                <CalcButton label="AC" onClick={clearAll} variant="gray" />
                <CalcButton label="+/-" onClick={toggleSign} variant="gray" />
                <CalcButton label="%" onClick={percentage} variant="gray" />
                <CalcButton label="÷" onClick={() => inputOperator("÷")} variant="orange" />

                {/* Row 2 */}
                <CalcButton label="7" onClick={() => inputDigit("7")} variant="dark-gray" />
                <CalcButton label="8" onClick={() => inputDigit("8")} variant="dark-gray" />
                <CalcButton label="9" onClick={() => inputDigit("9")} variant="dark-gray" />
                <CalcButton label="×" onClick={() => inputOperator("×")} variant="orange" />

                {/* Row 3 */}
                <CalcButton label="4" onClick={() => inputDigit("4")} variant="dark-gray" />
                <CalcButton label="5" onClick={() => inputDigit("5")} variant="dark-gray" />
                <CalcButton label="6" onClick={() => inputDigit("6")} variant="dark-gray" />
                <CalcButton label="-" onClick={() => inputOperator("-")} variant="orange" />

                {/* Row 4 */}
                <CalcButton label="1" onClick={() => inputDigit("1")} variant="dark-gray" />
                <CalcButton label="2" onClick={() => inputDigit("2")} variant="dark-gray" />
                <CalcButton label="3" onClick={() => inputDigit("3")} variant="dark-gray" />
                <CalcButton label="+" onClick={() => inputOperator("+")} variant="orange" />

                {/* Row 5 */}
                <CalcButton label="0" onClick={() => inputDigit("0")} variant="dark-gray" className="col-span-2 rounded-2xl" />
                <CalcButton label="." onClick={inputDecimal} variant="dark-gray" />
                <CalcButton label="=" onClick={calculate} variant="orange" />
              </div>
            </div>
          </div>

          {/* History drawer */}
          <AnimatePresence>
            {showHistory && (
              <div
                className="w-48 border-l border-white/5 bg-[#171717] flex flex-col p-3 shrink-0 h-full overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] font-semibold tracking-wide text-zinc-400 mb-2 shrink-0 border-b border-white/5 pb-1 uppercase">
                  <span>History Tape</span>
                  <button 
                    onClick={() => setHistory([])}
                    className="hover:underline text-[9px]"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] text-right scrollbar-none pr-1">
                  {history.map((h, i) => {
                    const parts = h.split(" = ");
                    return (
                      <div key={i} className="border-b border-white/5 pb-2">
                        <div className="opacity-45 truncate">{parts[0]}</div>
                        <div className="text-amber-500 font-semibold mt-0.5 truncate">{parts[1]}</div>
                      </div>
                    );
                  })}
                  {history.length === 0 && (
                    <div className="text-center opacity-30 mt-12 italic">Tape Empty</div>
                  )}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  );
}
