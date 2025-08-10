'use client';

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UnitDef = { name: string; factor: number };
type UnitsMap = Record<string, UnitDef>;
type Mode = "length" | "weight";

interface HistoryEntry {
  id: number;
  mode: Mode;
  input: string;
  fromUnit: string;
  toUnit: string;
  result: string;
  when: string;
}

const LENGTH_UNITS: UnitsMap = {
  m: { name: "Meter (m)", factor: 1 },
  km: { name: "Kilometer (km)", factor: 1e3 },
  cm: { name: "Centimeter (cm)", factor: 1e-2 },
  mm: { name: "Millimeter (mm)", factor: 1e-3 },
  "µm": { name: "Micrometer (µm)", factor: 1e-6 },
  nm: { name: "Nanometer (nm)", factor: 1e-9 },
  mi: { name: "Mile (mi)", factor: 1609.344 },
  yd: { name: "Yard (yd)", factor: 0.9144 },
  ft: { name: "Foot (ft)", factor: 0.3048 },
  in: { name: "Inch (in)", factor: 0.0254 },
};

const WEIGHT_UNITS: UnitsMap = {
  g: { name: "Gram (g)", factor: 1 },
  kg: { name: "Kilogram (kg)", factor: 1e3 },
  mg: { name: "Milligram (mg)", factor: 1e-3 },
  "µg": { name: "Microgram (µg)", factor: 1e-6 },
  t: { name: "Tonne (t)", factor: 1e6 },
  lb: { name: "Pound (lb)", factor: 453.59237 },
  oz: { name: "Ounce (oz)", factor: 28.349523125 },
};

function smartParseNumber(input: string): number | null {
  if (input === "" || input == null) return null;
  const trimmed = String(input).trim();
  const cleaned = trimmed.replace(/−/g, "-");
  const val = Number(cleaned);
  if (!Number.isFinite(val)) return null;
  return val;
}

export default function UnitConverter() {
  const [mode, setMode] = useState<Mode>("length");
  const units: UnitsMap = mode === "length" ? LENGTH_UNITS : WEIGHT_UNITS;
  const unitKeys = useMemo<string[]>(() => Object.keys(units), [units]);

  const [fromUnit, setFromUnit] = useState<string>(unitKeys[0] ?? "");
  const [toUnit, setToUnit] = useState<string>(unitKeys[1] ?? unitKeys[0] ?? "");
  const [inputValue, setInputValue] = useState<string>("1");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Ensure fromUnit/toUnit are valid whenever units (mode) changes
  useEffect(() => {
    const keys = Object.keys(units);
    if (keys.length === 0) return;
    if (!keys.includes(fromUnit)) setFromUnit(keys[0]);
    if (!keys.includes(toUnit)) setToUnit(keys[1] ?? keys[0]);
    // intentionally leaving out fromUnit/toUnit from deps to only run when units changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  const result = useMemo<string>(() => {
    const num = smartParseNumber(inputValue);
    if (num === null) return "";
    // guard in case fromUnit/toUnit are temporarily invalid
    const from = units[fromUnit];
    const to = units[toUnit];
    if (!from || !to) return "";
    const inBase = num * from.factor;
    const out = inBase / to.factor;
    const absOut = Math.abs(out);
    if ((absOut !== 0 && (absOut < 1e-6 || absOut >= 1e6))) return out.toExponential(6);
    return parseFloat(out.toPrecision(12)).toString();
  }, [inputValue, fromUnit, toUnit, units]);

  function doSwap(): void {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(result === "" ? inputValue : result);
  }

  function addToHistory(): void {
    if (inputValue.trim() === "" || result === "") return;
    const entry: HistoryEntry = {
      id: Date.now(),
      mode,
      input: inputValue,
      fromUnit,
      toUnit,
      result,
      when: new Date().toLocaleString(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, 20));
  }

  function clearHistory(): void {
    setHistory([]);
  }

  function onCopy(): void {
    const fromName = units[fromUnit]?.name ?? fromUnit;
    const toName = units[toUnit]?.name ?? toUnit;
    const text = `${inputValue} ${fromName} = ${result} ${toName}`;
    navigator.clipboard?.writeText(text).catch(() => { });
  }

  return (
    <>
      <main className="min-h-screen p-6 flex flex-col gap-6">
        <div className="max-w-4xl mx-auto w-full">
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Unit Converter — Length & Weight</h1>
            <div className="flex gap-2 items-center">
              <label className="text-sm">Mode</label>
              <div className="inline-flex rounded-md shadow-sm">
                <Button
                  variant={mode === "length" ? "default" : "outline"}
                  onClick={() => setMode("length")}
                >
                  Length
                </Button>
                <Button
                  variant={mode === "weight" ? "default" : "outline"}
                  onClick={() => setMode("weight")}
                >
                  Weight
                </Button>
              </div>
            </div>
          </header>

          <section className="bg-card/5 p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm mb-1">Value</label>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  inputMode="decimal"
                  placeholder="Enter number, e.g. 1, 2.5, 3e4"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">From</label>
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {unitKeys.map((k) => (
                          <SelectItem key={k} value={k}>
                            {units[k]?.name ?? k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-1">To</label>
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {unitKeys.map((k) => (
                          <SelectItem key={k} value={k}>
                            {units[k]?.name ?? k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-3 flex gap-2 flex-wrap">
                  <Button variant="outline" onClick={doSwap}>
                    Swap
                  </Button>
                  <Button variant="outline" onClick={() => setInputValue("")}>Clear</Button>
                  <Button variant="outline" onClick={addToHistory}>Save</Button>
                  <Button variant="outline" onClick={onCopy}>Copy</Button>
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm mb-1">Result</label>
                <div className="min-h-[96px] px-3 py-4 rounded-lg border flex flex-col justify-center">
                  {result === "" ? (
                    <span className="text-sm opacity-80">Enter a number to see result</span>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-sm">{inputValue} {units[fromUnit]?.name}</div>
                      <div className="text-lg font-medium">{result} {units[toUnit]?.name}</div>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Tip: you can use scientific notation like <code>3e8</code> or <code>2.5E-4</code>.
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">History</h2>
              <Button variant="outline" size="sm" onClick={clearHistory}>Clear</Button>
            </div>

            {history.length === 0 ? (
              <div className="p-4 rounded-lg border">No saved conversions yet — hit Save to store one.</div>
            ) : (
              <ul className="space-y-2">
                {history.map((h) => {
                  const entryUnits = h.mode === "length" ? LENGTH_UNITS : WEIGHT_UNITS;
                  return (
                    <li key={h.id} className="p-3 rounded-lg border flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <div className="text-sm">{h.input} → {h.result}</div>
                        <div className="text-xs text-muted-foreground">{(entryUnits[h.fromUnit]?.name ?? h.fromUnit)} → {(entryUnits[h.toUnit]?.name ?? h.toUnit)} • {h.when}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          // load entry: ensure mode is set first then units/values
                          setMode(h.mode);
                          setInputValue(h.input);
                          setFromUnit(h.fromUnit);
                          setToUnit(h.toUnit);
                        }}>Load</Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          navigator.clipboard?.writeText(`${h.input} ${(entryUnits[h.fromUnit]?.name ?? h.fromUnit)} = ${h.result} ${(entryUnits[h.toUnit]?.name ?? h.toUnit)}`);
                        }}>Copy</Button>
                        <Button variant="outline" size="sm" onClick={() => setHistory(prev => prev.filter(x => x.id !== h.id))}>Delete</Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>



          <section className="mt-6 max-w-none">
            <h2 className="text-2xl font-bold mt-6 mb-2">About This Converter ✨</h2>
            <p className="mb-4">
              This lightweight Unit Converter supports common <strong>length</strong> and <strong>weight</strong> units — including SI prefixes and popular imperial units. It’s built for speed and accuracy so you can quickly convert values while coding, studying, or working on projects.
            </p>

            <h3 className="text-xl font-semibold mt-5 mb-2">Why use this tool? 🚀</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Fast:</strong> instant client-side conversions — no network required.</li>
              <li><strong>Accurate:</strong> factors use standard international definitions.</li>
              <li><strong>Convenient:</strong> swap, save history, and copy results with one click.</li>
              <li><strong>Developer friendly:</strong> easy to extend — add temperature, volume, or time units quickly.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-5 mb-2">Quick Tips</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Use scientific notation (e.g., <code>3e8</code>) for very large/small numbers.</li>
              <li>Press <strong>Save</strong> to store frequently used conversions in the local session.</li>
              <li>Use <strong>Swap</strong> to instantly reverse the conversion direction.</li>
            </ol>

            <h3 className="text-xl font-semibold mt-5 mb-2">Examples</h3>
            <p className="mb-2">Some quick conversions you can try:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="rounded-md border p-3">
                <div className="text-sm text-muted-foreground">Length</div>
                <div className="text-md font-medium">1 km → 1000 m</div>
                <div className="text-sm">0.621371 mi → ~1 km</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm text-muted-foreground">Weight</div>
                <div className="text-md font-medium">1 kg → 1000 g</div>
                <div className="text-sm">1 lb → 453.59 g</div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-5 mb-2">Accessibility & Performance</h3>
            <p className="mb-4">
              The converter is keyboard-accessible and optimized for low-latency interaction. It performs all math locally, so conversions remain private and fast even on mobile devices.
            </p>

            <h3 className="text-xl font-semibold mt-5 mb-2">Want more units? 🔧</h3>
            <p>
              I can add <em>temperature</em>, <em>volume</em>, <em>time</em>, or <em>pressure</em> units — and wire up persistence to <code>localStorage</code> or a backend. Tell me which units you need and I’ll add them.
            </p>
          </section>





          <footer className="mt-6 text-sm text-muted-foreground">
            Built with ❤️ — supports SI prefixes and common imperial units.
          </footer>
        </div>
      </main>



    </>

  );
}
