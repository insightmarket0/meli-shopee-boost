import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
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

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInput("");
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
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-background p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">IA Assistente</h1>
          </div>
          <p className="text-muted-foreground">
            Pergunte qualquer coisa sobre suas vendas e métricas
          </p>
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="space-y-3 animate-slide-up">
            <p className="text-sm font-medium text-muted-foreground">Perguntas sugeridas:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 px-4"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
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
                      className={`flex-1 max-w-[80%] space-y-1 ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground px-2">
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Faça sua pergunta..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="gradient-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              💡 A IA tem acesso a todos os seus dados de vendas, estoque, produtos e finanças em
              tempo real
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IA;
