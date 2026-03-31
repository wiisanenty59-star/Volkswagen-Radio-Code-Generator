import { motion, AnimatePresence } from "framer-motion";
import { Copy, ShieldAlert, Cpu, KeyRound, Radio, RefreshCcw, CheckCircle2, ChevronRight, AlertTriangle, XCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useRadioCode } from "@/hooks/use-radio-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { serial, setSerial, isGenerating, result, error, calculateCode, reset } = useRadioCode();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden text-foreground">
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary font-medium text-sm mb-4"
          >
            <Cpu className="w-4 h-4" /> VAG Group Unlock Tool
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-glow"
          >
            Radio Code <span className="text-primary">Generator</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Lost your Volkswagen, Audi, Skoda, or Seat radio code? 
            Enter your serial number below to instantly calculate the unlock PIN.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Generator Column */}
          <div className="lg:col-span-7 space-y-8">
            <Card className="glass-panel overflow-hidden border-t-primary/30 border-t-2 relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Radio className="w-32 h-32" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <KeyRound className="w-6 h-6 text-primary" />
                  Calculator
                </CardTitle>
                <CardDescription className="text-base">
                  Locate the 14-character serial number stamped on the side of your radio unit.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider block">
                    Serial Number
                  </label>
                  <Input 
                    placeholder="e.g. VWZ1Z2E4993611" 
                    value={serial}
                    onChange={(e) => setSerial(e.target.value.toUpperCase())}
                    disabled={isGenerating || !!result}
                    className="h-16 text-2xl font-display uppercase tracking-widest bg-black/40 border-white/10"
                  />
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-destructive text-sm font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {!result ? (
                    <motion.div
                      key="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button 
                        size="lg" 
                        className="w-full text-lg group"
                        onClick={calculateCode}
                        disabled={isGenerating || !serial}
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCcw className="mr-2 w-5 h-5 animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          <>
                            Generate Code
                            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="p-8 rounded-2xl bg-black/60 border border-primary/20 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">
                          Calculated PIN
                        </p>
                        
                        <div className="flex justify-center items-center gap-4 mb-6">
                          {result.code.split('').map((digit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="w-16 h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-inner"
                            >
                              <span className="text-5xl digital-display text-primary text-glow font-bold">
                                {digit}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <Button onClick={handleCopy} variant="secondary" className="flex-1">
                            {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                            {copied ? 'Copied!' : 'Copy Code'}
                          </Button>
                          <Button onClick={reset} variant="outline" className="flex-1">
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Start Over
                          </Button>
                        </div>
                      </div>

                      {/* Important warning */}
                      <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-500/30 flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-200/80 space-y-1">
                          <p className="font-semibold text-amber-300">Verify before entering</p>
                          <p>This code is only reliable for supported older models (Gamma 5, RCD 300, Concert, etc.). <strong>Premium 6, Premium 7, RCD 510, MIB units store their code in EEPROM hardware</strong> — no formula can derive it. If this code is wrong, <span className="text-amber-300 font-medium">do not guess further</span> — multiple wrong entries can permanently lock your radio.</p>
                        </div>
                      </div>

                      {/* Algorithm Breakdown */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Algorithm Breakdown</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {result.breakdown.map((item, i) => (
                            <div key={i} className="p-2 bg-black/30 rounded border border-white/5 text-center">
                              <p className="text-xs text-muted-foreground">{item.formula}</p>
                              <p className="font-display font-bold text-primary mt-1">Digit {i+1}: {item.result}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </CardContent>
            </Card>
          </div>

          {/* Side Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-500" />
                  How to enter code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3 text-sm text-muted-foreground counter-reset-list">
                  <li className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-foreground font-bold text-xs">1</span>
                    <span>Turn on the radio. The display should show "SAFE" then "1000".</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-foreground font-bold text-xs">2</span>
                    <span>Use preset button <strong>1</strong> to set the first digit. Press repeatedly to cycle 0-9.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-foreground font-bold text-xs">3</span>
                    <span>Use preset buttons <strong>2, 3, and 4</strong> to set the remaining digits.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-xs">4</span>
                    <span>Press and hold the <strong>AM/FM</strong> or <strong>&gt;&gt;</strong> button until you hear a beep to confirm.</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Supported Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-green-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Formula works</p>
                  <div className="flex flex-wrap gap-2">
                    {['Gamma 5', 'Beta 5', 'Concert', 'Chorus', 'RCD 200', 'RCD 300', 'RCD 500', 'MFD'].map(model => (
                      <span key={model} className="px-3 py-1 bg-green-900/20 border border-green-500/20 rounded-full text-xs font-medium text-green-300/80">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1"><XCircle className="w-3 h-3" /> Formula does NOT work</p>
                  <div className="flex flex-wrap gap-2">
                    {['Premium 6', 'Premium 7', 'RCD 310', 'RCD 510', 'RNS 510', 'MIB', 'Discover Pro'].map(model => (
                      <span key={model} className="px-3 py-1 bg-red-900/20 border border-red-500/20 rounded-full text-xs font-medium text-red-300/80">
                        {model}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">These radios store the code in hardware (EEPROM). Use a database lookup service instead.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-primary" />
                  Code didn't work?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>If your radio isn't supported by the formula, these services look up the real code from actual databases:</p>
                <div className="space-y-2">
                  {[
                    { name: 'freeradiocodes.co.uk', note: 'Free — community database', url: 'https://www.freeradiocodes.co.uk' },
                    { name: 'radiocodefinder.com', note: '~€8 — large paid database', url: 'https://radiocodefinder.com/radio-code-volkswagen' },
                    { name: 'vwcodes.org', note: 'Paid — VW/Skoda/Audi specialist', url: 'https://www.vwcodes.org' },
                  ].map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-colors group">
                      <div>
                        <p className="font-medium text-foreground text-sm">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.note}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-red-400/80 flex gap-1 items-start pt-1">
                  <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  Never guess codes — most radios lock permanently after 3 wrong attempts.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
