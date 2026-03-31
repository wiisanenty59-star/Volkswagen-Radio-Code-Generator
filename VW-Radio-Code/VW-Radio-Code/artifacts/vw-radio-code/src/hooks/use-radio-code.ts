import { useState, useMemo } from 'react';

export interface CodeResult {
  code: string;
  usedDigits: string;
  breakdown: {
    formula: string;
    result: string;
  }[];
}

export function useRadioCode() {
  const [serial, setSerial] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateCode = () => {
    if (!serial.trim()) {
      setError("Please enter a serial number.");
      setResult(null);
      return;
    }

    // Extract only the digits from the input
    const digits = serial.replace(/\D/g, '');

    if (digits.length < 8) {
      setError(`Serial must contain at least 8 numbers. Found: ${digits.length}`);
      setResult(null);
      return;
    }

    setError(null);
    setIsGenerating(true);

    // Simulate calculation delay for dramatic effect
    setTimeout(() => {
      // Core VW Algorithm: Take first 8 digits, pair them up with an offset of 4
      const d = digits.split('').map(Number);
      
      const c1 = (d[0] + d[4]) % 10;
      const c2 = (d[1] + d[5]) % 10;
      const c3 = (d[2] + d[6]) % 10;
      const c4 = (d[3] + d[7]) % 10;

      const generatedCode = `${c1}${c2}${c3}${c4}`;

      setResult({
        code: generatedCode,
        usedDigits: digits.substring(0, 8),
        breakdown: [
          { formula: `${d[0]} + ${d[4]} = ${d[0] + d[4]}`, result: c1.toString() },
          { formula: `${d[1]} + ${d[5]} = ${d[1] + d[5]}`, result: c2.toString() },
          { formula: `${d[2]} + ${d[6]} = ${d[2] + d[6]}`, result: c3.toString() },
          { formula: `${d[3]} + ${d[7]} = ${d[3] + d[7]}`, result: c4.toString() },
        ]
      });
      setIsGenerating(false);
    }, 1200); // 1.2s delay
  };

  const reset = () => {
    setSerial('');
    setResult(null);
    setError(null);
  };

  return {
    serial,
    setSerial,
    isGenerating,
    result,
    error,
    calculateCode,
    reset
  };
}
