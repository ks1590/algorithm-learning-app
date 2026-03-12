import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PalindromeStep } from '@/hooks/usePalindrome';

interface PalindromeVisualizerCardProps {
  inputString: string;
  steps: PalindromeStep[];
  result: boolean | null;
}

export const PalindromeVisualizerCard: React.FC<PalindromeVisualizerCardProps> = ({ inputString, steps, result }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden pt-0 gap-0 border-2 border-black shadow-[4px_4px_0_0_#000]">
      <CardHeader className="bg-slate-100 border-b-2 border-black p-4">
        <CardTitle className="text-2xl font-bold">視覚化</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-6 flex flex-col items-center justify-center min-h-[400px] overflow-auto bg-white relative">
        <AnimatePresence>
          {result !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: steps.length * 0.5 }}
              className={`absolute top-4 right-6 border-2 border-black px-4 py-2 font-bold transform rotate-[-2deg] shadow-[2px_2px_0_0_#000] z-10 ${
                result ? 'bg-emerald-300' : 'bg-red-300'
              }`}
            >
              判定 = {result ? '回文' : '非回文'}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-8 w-full max-w-2xl mt-8 pt-6">
          {!inputString ? (
            <div className="text-center text-muted-foreground font-medium">文字列を入力してください</div>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <AnimatePresence mode="popLayout">
                {steps.map((step, index) => (
                  <motion.div
                    key={`${index}-${step.leftIndex}-${step.rightIndex}`}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                      delay: index * 0.5,
                    }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="relative flex justify-center gap-2 text-2xl font-mono font-bold w-full pb-4 pt-10">
                      {inputString.split('').map((char, charIndex) => {
                        const isLeft = charIndex === step.leftIndex;
                        const isRight = charIndex === step.rightIndex;
                        const isCenter = isLeft && isRight;
                        const isHighlighted = isLeft || isRight;

                        let bgColor = 'bg-white text-black';

                        // Default
                        if (charIndex < step.leftIndex || charIndex > step.rightIndex) {
                          bgColor = 'bg-emerald-50 text-emerald-800/60 opacity-60'; // visually de-emphasize
                        }

                        if (isHighlighted) {
                          if (step.isMatch) {
                            bgColor = 'bg-emerald-200 text-black border-black shadow-[2px_2px_0_0_#000] -translate-y-1';
                          } else {
                            bgColor = 'bg-red-200 text-black border-black shadow-[2px_2px_0_0_#000] translate-y-1';
                          }
                        }

                        return (
                          <div key={charIndex} className="flex flex-col items-center relative">
                            {/* Top Pointer */}
                            {isHighlighted && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-sm absolute -top-8 font-bold flex flex-col items-center ${
                                  step.isMatch ? 'text-emerald-700' : 'text-red-700'
                                }`}
                              >
                                {isCenter ? 'L,R' : isLeft ? 'L' : 'R'}
                                <div className="h-4 w-0.5 bg-current mt-1"></div>
                              </motion.div>
                            )}

                            {/* Character Block */}
                            <motion.div
                              className={`w-12 h-16 flex items-center justify-center rounded-none border-2 border-black transition-all ${bgColor}`}
                              animate={isHighlighted ? { scale: [1, 1.05, 1] } : {}}
                              transition={{ duration: 0.3 }}
                              style={
                                !isHighlighted && (charIndex < step.leftIndex || charIndex > step.rightIndex)
                                  ? { borderStyle: 'solid', borderColor: 'rgba(0,0,0,0.2)' }
                                  : {}
                              }
                            >
                              {char}
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Status Text under string */}
                    <div className="h-6 flex items-center justify-center font-bold text-sm">
                      {step.isMatch ? (
                        <span className="text-emerald-600">match</span>
                      ) : (
                        <span className="text-red-600">diff</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
