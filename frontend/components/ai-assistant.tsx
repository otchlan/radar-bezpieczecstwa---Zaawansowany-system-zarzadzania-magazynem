'use client';

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Scenariusz kryzysowy: pytania wstępne (zaktualizowane)
const scenarioQuestions: Message[] = [
  {
    id: 'q1',
    text: 'Protokoł postępowania dla kryzysu: Proszę opisać rodzaj kryzysu.',
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: 'q2',
    text: 'Czy chcesz raport stanów zasobów? (tak/nie)',
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: 'q3',
    text: 'Ile osób jest obecnie w gotowości i wspiera, może wesprzeć działania polowe? Straż, policja, ludność.',
    isUser: false,
    timestamp: new Date(),
  },
];

// Scenariusz kryzysowy: zaktualizowana instrukcja końcowa z raportem
const crisisDialogue: Message[] = [
  {
    id: 'report1',
    text: 'RAPORT STATUSU MAGAZYNÓW:\n\n' +
          'Magazyn 2: Status PEŁNY\n' +
          'Lokalizacja: Lublin, Czuby\n' +
          'Poziom wypełnienia: 95%\n\n' +
          'Magazyn 3: Status NISKI\n' +
          'Lokalizacja: Lublin, Kalinowszczyzna\n' +
          'Brakuje: wody\n\n' +
          'ZALECENIE: Skieruj ochotników do przeniesienia zasobów z magazynu 2 do magazynu 3 lub odpowiedniego paczkomatu.',
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: 'report2',
    text: 'RAPORT ZASOBÓW LUDZKICH:\n\n' +
          'Obecne stany są wystarczające.\n' +
          'ZALECENIE: Zgromadź wokół siebie ochotników w razie gotowości.',
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: 'instr1',
    text: 'Na podstawie dostarczonych informacji, oto instrukcja postępowania:\n\n' +
          '1. Zidentyfikuj i zabezpiecz obszar zagrożenia.\n' +
          '2. Skieruj dostępne zasoby do krytycznych punktów (zasilanie, łączność).\n' +
          '3. Utrzymuj stałą komunikację z zespołami terenowymi i centrum dowodzenia.\n' +
          '4. Rozdystrybuuj niezbędne zaopatrzenie zgodnie z raportem zasobów.\n' +
          '5. Regularnie aktualizuj raport sytuacyjny co 2 godziny.\n' +
          '6. Przygotuj się na ewakuację lub dalsze wsparcie w zależności od rozwoju sytuacji.',
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: 'instr2',
    text: 'DALSZE KROKI:\n\n' +
          '1. Wyślij po dwie osoby, żeby zebrały informacje statusowe ze szpitali.\n' +
          '2. Poproś o pomoc policję, by udrożnić kanał komunikacji.',
    isUser: false,
    timestamp: new Date(),
  },
];


export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'start',
      text: 'Witaj! Jestem asystentem zarządzania kryzysowego. Opisz, co się dzieje, abyśmy mogli zacząć.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scenarioStep, setScenarioStep] = useState<number>(-1); // -1 = not started, 0...questions, after = final instr
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const startScenario = () => {
    setMessages(scenarioQuestions);
    setScenarioStep(0);
  };

  const handleUserInput = (text: string) => {
    // Obsługa specjalnego raportu magazynowego
    if (text.toLowerCase().includes('potrzebuje stanów magazynowych')) {
      // Dodaj wiadomość użytkownika
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), text, isUser: true, timestamp: new Date() },
        // Raport
        { id: 'r1', text: 'Raport stanów magazynowych:\n\nZS2 - Magazyn Żywnościowo-Sanitarny 2\nStatus: Pełny\nLokalizacja: Lublin, Czuby\nPoziom: 95%\n\nZS3 - Magazyn Żywnościowo-Sanitarny 3\nStatus: Niski\nLokalizacja: Lublin, Kalinowszczyzna', isUser: false, timestamp: new Date() },
        // Rekomendacja
        { id: 'rec1', text: 'Rekomendacja: Przekieruj personel i zasoby z magazynu 3 do magazynu 2.', isUser: false, timestamp: new Date() }
      ]);
      return;
    }

    if (scenarioStep === -1) {
      startScenario();
      return;
    }

    if (scenarioStep >= 0 && scenarioStep < scenarioQuestions.length) {
      setMessages(prev => [...prev, { id: Date.now().toString(), text, isUser: true, timestamp: new Date() }]);
      const next = scenarioStep + 1;
      if (next < scenarioQuestions.length) {
        setTimeout(() => {
          setMessages(prev => [...prev, { ...scenarioQuestions[next], id: `q${next + 1}` }]);
          setScenarioStep(next);
        }, 800);
      } else {
        setScenarioStep(scenarioQuestions.length);
        setTimeout(() => autoDialogue(0), 1000);
      }
      setScenarioStep(next);
      return;
    }

    appendUserMessage(text);
  };

  const appendUserMessage = (text: string) => {
    const msg: Message = { id: Date.now().toString(), text, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, msg]);
  };

  const autoDialogue = (index: number) => {
    if (index >= crisisDialogue.length) return;
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, crisisDialogue[index]]);
      setIsTyping(false);
      autoDialogue(index + 1);
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue('');
    handleUserInput(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Card className={`
        h-full flex flex-col transition-all duration-300 ease-in-out
        ${isExpanded ? 'absolute bottom-0 left-0 right-0 h-1/2 z-20' : ''}
      `} onClick={isExpanded ? undefined : toggleExpand}>
      <CardHeader className="py-1 px-3 flex-shrink-0 cursor-pointer" onClick={toggleExpand}>
        <CardTitle className="text-sm flex justify-between items-center">
          <div className="flex items-center gap-2">
            Asystent AI
            <Badge variant="outline" className="ml-1 text-xs">Online</Badge>
          </div>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={e => { e.stopPropagation(); toggleExpand(); }}>
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full px-3 py-1" ref={scrollAreaRef}>
          <div className="space-y-2 pb-1">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${msg.isUser ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-100'}`}>{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-3 py-2 text-xs bg-zinc-800 text-zinc-100">
                  <span className="flex gap-1 items-center">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-2 pt-0 flex-shrink-0">
        <div className="flex w-full gap-2" onClick={e => e.stopPropagation()}>
          <Input placeholder="Zadaj pytanie..." value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 h-7 text-xs" />
          <Button size="sm" onClick={handleSendMessage} disabled={isTyping} className="h-7 w-7 p-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}