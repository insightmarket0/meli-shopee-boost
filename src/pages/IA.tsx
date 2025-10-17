import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "Qual foi meu produto mais vendido na última semana?",
  "Quanto faturei ontem no Mercado Livre?",
  "Quais produtos estão prestes a esgotar?",
  "Quais 5 SKUs mais críticos para Full essa semana?",
  "Quais produtos têm margem baixa?",
];

const IA = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Olá! 👋 Sou sua assistente de IA para análise de vendas. Posso te ajudar com informações sobre faturamento, produtos, estoque e muito mais. Como posso ajudar você hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes("mais vendido") || q.includes("produto") && q.includes("semana")) {
      return "📊 Seu produto mais vendido na última semana foi o **Fone Bluetooth Premium** com 124 unidades vendidas, gerando R$ 15.480,00 em receita. Isso representa um aumento de 28% em relação à semana anterior!";
    }
    
    if (q.includes("faturei") || q.includes("faturamento")) {
      return "💰 Ontem você faturou R$ 8.340,00 no Mercado Livre, distribuídos entre 47 pedidos. Seu produto campeão foi o Carregador USB-C (18 vendas). Ótimo desempenho!";
    }
    
    if (q.includes("esgotar") || q.includes("estoque")) {
      return "⚠️ Você tem 3 produtos críticos:\n\n1. **Fone Bluetooth Premium** - apenas 45 unidades (2.5 dias de cobertura)\n2. **Mouse Gamer RGB** - apenas 38 unidades (3.1 dias)\n3. **Carregador USB-C** - 82 unidades mas com vendas aceleradas (5.8 dias)\n\nRecomendo repor urgentemente os 2 primeiros!";
    }
    
    if (q.includes("full") || q.includes("críticos")) {
      return "📦 Os 5 SKUs mais críticos para Full esta semana:\n\n1. **PROD-001** (Fone BT) - 150 unidades\n2. **PROD-003** (Mouse Gamer) - 100 unidades\n3. **PROD-002** (Carregador) - 120 unidades\n4. **PROD-004** (Teclado) - 75 unidades\n5. **PROD-005** (Webcam) - 60 unidades\n\nCusto total estimado: R$ 15.300,00";
    }
    
    if (q.includes("margem")) {
      return "📉 Produtos com margem abaixo de 25%:\n\n1. **Hub USB 4 Portas** - margem de 18%\n2. **Cabo HDMI 2m** - margem de 22%\n\nSugestão: Revisar custos de frete e fornecedores, ou ajustar preços para melhorar rentabilidade.";
    }
    
    return "Entendi sua pergunta! Com base nos dados do seu negócio, posso te ajudar a analisar vendas, estoque, margens e muito mais. Pode reformular ou fazer outra pergunta sobre suas métricas?";
  };

  const handleSuggestedQuestion = (question: string) => {
    if (isLoading) return;
    setInput(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateResponse = () => {
    if (messages.length < 2 || isLoading) return;
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (lastUserMessage) {
      setInput(lastUserMessage.content);
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header - Mais Compacto */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">IA Assistente</h1>
              <p className="text-xs text-muted-foreground">Insights em tempo real</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={regenerateResponse}
            disabled={isLoading || messages.length < 2}
            className="gap-2"
          >
            <RotateCw className="h-3 w-3" />
            Regenerar
          </Button>
        </div>

        {/* Chat Area - Otimizado */}
        <Card className="shadow-elevated animate-slide-up border-primary/10" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-280px)] min-h-[400px]" ref={scrollAreaRef}>
              <div className="space-y-4 p-4 md:p-6">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 md:gap-3 animate-fade-in ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "gradient-primary text-primary-foreground"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`flex-1 max-w-[85%] md:max-w-[80%] space-y-2 ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl p-3 md:p-4 transition-all hover:shadow-md ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted text-foreground border border-border/50"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <p className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {message.role === "assistant" && index > 0 && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-primary/10"
                              onClick={() => copyToClipboard(message.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-green-500/10"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-red-500/10"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {messages.length <= 1 && (
                  <div className="flex gap-2 md:gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 gradient-primary text-primary-foreground shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex-1 max-w-[85%] md:max-w-[80%] space-y-2">
                      <div className="rounded-2xl p-3 md:p-4 bg-primary/5 border border-primary/10 text-foreground space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <p className="text-xs font-semibold text-primary">
                            Perguntas Sugeridas
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {suggestedQuestions.map((question, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              disabled={isLoading}
                              className="h-auto px-3 py-2.5 text-xs leading-relaxed justify-start text-left hover:bg-primary/10 hover:border-primary/30 transition-all"
                              onClick={() => handleSuggestedQuestion(question)}
                            >
                              <span className="line-clamp-2">{question}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-2 md:gap-3 animate-fade-in">
                    <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 gradient-primary text-primary-foreground shadow-sm">
                      <Bot className="h-4 w-4 animate-pulse" />
                    </div>
                    <div className="flex-1 max-w-[85%] md:max-w-[80%]">
                      <div className="rounded-2xl p-3 md:p-4 bg-muted border border-border/50">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area - Melhorado */}
            <div className="border-t bg-muted/30 p-3 md:p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua pergunta aqui..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-1 bg-background border-primary/20 focus-visible:ring-primary/30 rounded-xl"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="gradient-primary rounded-xl shadow-md hover:shadow-lg transition-all px-4 md:px-6"
                >
                  {isLoading ? (
                    <RotateCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Pressione Enter para enviar • Shift + Enter para nova linha
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards - Grid Compacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-md transition-all">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs font-semibold text-foreground">Dados em Tempo Real</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Acesso instantâneo a vendas, estoque e métricas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:shadow-md transition-all">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-xs font-semibold text-foreground">IA Inteligente</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Análises preditivas e recomendações personalizadas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:shadow-md transition-all">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-xs font-semibold text-foreground">100% Seguro</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Suas informações são privadas e protegidas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IA;
