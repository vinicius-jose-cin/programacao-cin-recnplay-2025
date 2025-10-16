import { useState } from "react";
import { Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { TalkCard } from "./components/TalkCard";
import { CinLogo } from "./components/CinLogo";
import { Logo2025 } from "./components/Logo2025";
import { Footer } from "./components/Footer";

type FilterType = "all" | "arenas" | "talks";

interface Talk {
  id: string;
  title: string;
  participants: string[];
  time: string;
  location: string;
  locationUrl?: string;
  categories?: string[];
}

const talks: Record<string, Talk[]> = {
  "15": [
    {
      id: "1",
      title: "Além do prontuário: dados integrados e o futuro da saúde no HC-UFPE",
      participants: ["Robson Fidalgo (CIn-UFPE), Shirley Cruz (HC-UFPE), Vinicius de Oliveira Menezes (HC-UFPE), Aurilio José dos santos Filho (HC - UFPE)"],
      time: "13:00 - 14:15",
      location: "Cesar School - Cais do Apolo - Sala 205",
      locationUrl: "https://maps.app.goo.gl/o74AsYuSXidyk6v89",
      categories: ["Saúde Digital"],
    },
    {
      id: "2",
      title: "Mitos e Realidades no Desenvolvimento de Software com IA",
      participants: ["Paulo Borba"],
      time: "13:30 - 14:15",
      location: "Accenture Innovation Center",
      locationUrl: "https://maps.app.goo.gl/1UxXLY2mhZNpPFf1A",
      categories: ["IA"],
    },
    {
      id: "3",
      title: "Estratégia Nacional de IA: oportunidades e desafios para o Brasil",
      participants: ["Geber Ramalho (CIn-UFPE), Hugo Siqueira (DECTI), Leo Branco (EXAME), Germano Vasconcelos (CIn-UFPE)"],
      time: "13:40 - 14:40",
      location: "Cesar School - Sala 104",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["IA"],
    },
    {
      id: "4",
      title: "Cachorro Robô e Câmera Térmica: Machine Learning em Aplicações Industriais",
      participants: ["João Nascimento"],
      time: "14:10 - 14:50",
      location: "Moinho Recife - Cesar Sala Manguezal",
      locationUrl: "https://maps.app.goo.gl/wFGxTJ6ZGf5nPKuK8",
      categories: ["Machine Learning"],
    },
    {
      id: "5",
      title: "Mulheres em STEM: o que eu gostaria que tivessem me contado",
      participants: ["Karem Leticia dos Santos (Mestranda em Ciência da Computação - CIn-UFPE), Iasmin Maria Gomes dos Santos (Ciência da Computação - CIn-UFPE), Beatriz Mergulhão dos Anjos (Sistemas de Informação - CIn-UFPE, Gabriela Taina Costa Brito (Ciência da Computação - CIn-UFPE), Maiara da Silva Lira (Cintia CIn-UFPE), Giovanna Paula Machado (Sistemas de Informação - CIn-UFPE)"],
      time: "16:30 - 17:30",
      location: "Secretaria da Mulher de Pernambuco",
      locationUrl: "https://maps.app.goo.gl/bMhMgDjJnz1TcZXH6",
      categories: ["Carreira"],
    },
    {
      id: "22",
      title: "Conectando Mentes: O Poder das Comunidades no Futuro da Tecnologia",
      participants: ["Larissa Albuquerque - Mestranda do CIn-UFPE (Desenvolvedora de Software Pleno - Banco do Brasil), Zeca Correia (Prefeitura da Cidade do Recife), Elisa Maria Batista (FIAP), Elynne Lima (UNICAP)"],
      time: "17:30 - 18:30",
      location: "Moinho Recife - NTT DATA - Auditório",
      locationUrl: "https://maps.app.goo.gl/wFGxTJ6ZGf5nPKuK8",
      categories: ["Carreira"],
    },
    {
      id: "6",
      title: "Mestrado e Doutorado profissional: relações saudáveis entre academia e indústria",
      participants: ["Alexandre Vasconcelos (Programa de Pós-graduação Profissional em Ciência da Computação - CIn-UFPE), Alex Sandro Gomes (Programa de Pós-graduação Profissional em Ciência da Computação - CIn-UFPE), João Guilherme Peixoto (UNICAP)"],
      time: "17:35 - 18:35",
      location: "E.T.E. Porto Digital - Auditório",
      locationUrl: "https://maps.app.goo.gl/RN58EJyAGucNRbHF6",
      categories: ["Academia"],
    },
    {
      id: "23",
      title: "Inteligência Artificial: sua próxima graduação? Por quê?",
      participants: ["Paulo Salgado"],
      time: "18:00 - 19:00",
      location: "Moinho Recife - Neurotech",
      locationUrl: "https://maps.app.goo.gl/wFGxTJ6ZGf5nPKuK8",
      categories: ["Academia"],
    },
  ],
  "16": [
    {
      id: "7",
      title: "Inovação aberta na prática: startups em ação no HC-UFPE",
      participants: ["José William Nascimento - doutorando em IA pelo CIn-UFPE e Co-founder & Head de Projetos (Startup Aicury), Conceição Moraes - SEBRAE/PE, Francisco Amorim de Barros - HC-UFPE, Danilo Novelino - Startup Cinco Saúde, Andreza Gomes - HC-UFPE"],
      time: "10:00 - 11:15",
      location: "Ti. Saúde",
      locationUrl: "https://maps.app.goo.gl/7jJFUN6tH6W8Fb7g7",
      categories: ["Startups"],
    },
    {
      id: "8",
      title: "Vibe Coding, Engenharia de Contexto, Agentes e o que mais? Dando sentido as Hypes da IA Generativa",
      participants: ["Filipe Calegario (CIn-UFPE)"],
      time: "11:30 - 12:30",
      location: "Cesar School - Sala 102",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["IA Generativa"],
    },
    {
      id: "10",
      title: "Desmistificando o Quântico: Conceitos, Verdades e Mitos",
      participants: ["LACIQ - Larissa Bourbon, Ludmilla Magnani e Beatriz Férre"],
      time: "11:35 - 12:35",
      location: "Cesar School - Sala 004",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["Computação Quântica"],
    },
    {
      id: "11",
      title: "Inteligência Artificial para Non-Techs - O que está além do código",
      participants: ["Paulo Salgado (CIn-UFPE), Izabella Barros Melo (Uniaeso), Célio Santana (DCI - UFPE)"],
      time: "11:45 - 12:45",
      location: "UNIAESO - Sala 1",
      locationUrl: "https://maps.app.goo.gl/ex7jekGznYBXb8dd6",
      categories: ["IA"],
    },
    {
      id: "12",
      title: "Decisões Inteligentes: Como a Ciência de Dados Está Transformando os Negócios",
      participants: ["Sara Pereira (LIGIA/CIn-UFPE) , Fábio Papais (LIGIA/CIn-UFPE)"],
      time: "13:50 - 14:50",
      location: "Cesar School - Sala 102",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["Data Science"],
    },
    {
      id: "13",
      title: "Como desenvolver e aplicar aprendizagem de máquina (TinyML) em sistemas embarcados",
      participants: ["LASER: Silvanio da Silva Assunção, Arthur Calabria Villar de Morais Guerra, Marcelo Henrique Alexandre Barreiros, Jaubert Gualberto Lima de Souza Gouveia, Paulo Vitor Barbosa Santana, Paulo Emilio Gestosa Vieira"],
      time: "16:00 - 17:00",
      location: "Casa Zero - Educação Sem Fronteiras",
      locationUrl: "https://maps.app.goo.gl/H9YzvAi59RQijrZU7",
      categories: ["IoT"],
    },
    {
      id: "14",
      title: "Combatendo Discurso de Ódio e Fake News com Inteligência Artificial",
      participants: ["George Darmiton da Cunha Cavalcanti - Professor e Coordenador de Inteligência Artificial - CIn-UFPE, Breno Cavalcanti - Estudante de Engenharia da Computação - CIn-UFPE, Camila Barbosa Vieira - Estudante de Engenharia de Computação - CIn-UFPE, José Vinicius de Santana Souza - Estudante de Engenharia da Computação - CIn-UFPE"],
      time: "18:00 - 19:00",
      location: "Cesar School - Sala 104",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["IA"],
    },
    {
      id: "15",
      title: "Das Ideias ao Usuário: A Jornada de Inovação, Design e Desenvolvimento Ágil",
      participants: ["Camila Xavier - Estudante de Ciência da Computação e de Desenvolvimento iOS na Apple Developer Academy (CIn-UFPE), Maria Clara Albuquerque Moura - Estudante de Ciência da Computação e de desenvolvimento iOS na Apple Developer Academy e estagiária em Desenvolvimento de Sotware na Amazon (CIn - UFPE), Júlia Mayara da Silva Oliveira - estudante de Design e desenvolvimento iOS na Apple  (CIn-UFPE)"],
      time: "18:15 - 19:00",
      location: "Cesar School - Sala 101",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["Design"],
    },
  ],
  "17": [
    {
      id: "9",
      title: "Uma Receita de IA: Integrando Data Warehouse e Data Lake em Lakehouse",
      participants: ["Liga Acadêmica de Engenharia de Dados: Lucas Lucena, Erick Lima, Allyson Silva, Igor Varela, Luis Paulo Trevisan"],
      time: "10:10 - 10:55",
      location: "Cesar School - Sala 205",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["Dados"],
    },
    {
      id: "16",
      title: "Veículos Autônomos na América Latina: De Sci-Fi à Realidade?",
      participants: ["Willams de Lima (Voxar Labs - CIn-UFPE)"],
      time: "11:30 - 12:30",
      location: "Casa Zero - Educação Sem Fronteiras",
      locationUrl: "https://maps.app.goo.gl/H9YzvAi59RQijrZU7",
      categories: ["IA"],
    },
    {
      id: "17",
      title: "Reaact: Comunicação Alternativa para pessoas com limitação na fala",
      participants: ["Robson Fidalgo (CIn-UFPE)"],
      time: "14:00 - 15:00",
      location: "Cesar School - Sala 205",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["Acessibilidade"],
    },
    {
      id: "18",
      title: "Tecnologias quânticas: A nova fronteira da inovação",
      participants: ["Daniel Felinto (UFPE), Nadja Bernardes (UFPE), Conceição Moraes (SEBRAE/PE), Roberto Guerra (Parque TeC UFPE), Adenilton Silva (Prof. CIn-UFPE), Samuraí Brito (ICTi)"],
      time: "14:00 - 15:30",
      location: "Cesar School - Sala 004",
      locationUrl: "https://maps.app.goo.gl/dGgrrbU8YYKPDXtc6",
      categories: ["Computação Quântica"],
    },
    {
      id: "19",
      title: "GP2: 20 ANOS de pesquisas em gestão de projetos no CIn-UFPE",
      participants: ["Hermano Perrelli de Moura (Prof. do CIn-UFPE e Coordenador do GP2)"],
      time: "15:30 - 16:30",
      location: "HUB Plural - Refeitório",
      locationUrl: "https://maps.app.goo.gl/FK1dNsmBJcjvkJrm7",
      categories: ["Gestão"],
    },
    {
      id: "20",
      title: "A Experiência CIn-UFPE: Transformando Curiosidade em Carreira",
      participants: ["LIGIA: Isabela Moura, Gabriel Matias, Matheus Menezes, Victor Amarante, Júlia Nunes, Fabriely Santos"],
      time: "16:45 - 17:45",
      location: "E.T.E. Porto Digital - Auditório",
      locationUrl: "https://maps.app.goo.gl/RN58EJyAGucNRbHF6",
      categories: ["Carreira"],
    },
    {
      id: "21",
      title: "Armadilhas na Engenharia de Software: Do Entusiamo ao Código Esquecido",
      participants: ["SEAL - Liga de Engenharia de Software: Lucas Torres, Welton Felix, Marcelo Bastos, Josias Netto"],
      time: "17:00 - 17:45",
      location: "HUB Plural - Refeitório",
      locationUrl: "https://maps.app.goo.gl/FK1dNsmBJcjvkJrm7",
      categories: ["Engenharia de Software"],
    },
  ],
  "18": [
    {
    id: "24",
    title: "Inteligência Artificial na educação: estudantes que transformam",
    participants: ["Ana Júlia Soares (Colégio Apoio), Carlos Eduardo Toledo de Brito (Psicologia/UFPE), Davi da Costa Silvestre (Psicologia/UFPE), Yasmin Wanderley Soares (CIn-UFPE), Carlos Henrique Silva (ETE Porto Digital), Giselle Santos (Instituto Escolas Criativas)"],
    time: "10:00 - 11:00",
    location: "Livraria Jaqueira - Galeria",
    locationUrl: "https://maps.app.goo.gl/atikYjJEJRixyT4n7",
    categories: ["IA", "Educação"]
  },
  ],
};

const arenas: Record<string, Talk[]> = {
  "15": [
    {
      id: "arena-1",
      title: "Pesquisas e Inovações em Computação",
      participants: ["Filipe Calegario"],
      time: "10:00 - 19:00",
      location: "Arena de Inovação Petrobrás",
      locationUrl: "https://maps.app.goo.gl/GfR5R7XeE7s4YVjs6",
      categories: ["IA, Tecnologias Imersivas e Metaverso", "Robótica"],
    },
    {
      id: "arena-2",
      title: "LIVE",
      participants: ["Equipe LIVE"],
      time: "10:00 - 19:00",
      location: "Espaço CIn-UFPE (Stand)",
      locationUrl: "https://maps.app.goo.gl/Ej6mvubtszPcLb338",
      categories: ["IA, Tecnologias Imersivas e Metaverso", "Computação Avançada"],
    },
    {
      id: "arena-3",
      title: "Cooperação",
      participants: ["Coordenação de Cooperação e Inovação CIn-UFPE"],
      time: "10:00 - 19:00",
      location: "Arena de Negócios, Sala Ponte Tech",
      locationUrl: "https://maps.app.goo.gl/ZCHoJz1ZbyRdQJgc6",
      categories: ["Negócios"],
    },
  ],
  "16": [
    {
      id: "arena-4",
      title: "Pesquisas e Inovações em Computação",
      participants: ["Filipe Calegario"],
      time: "10:00 - 19:00",
      location: "Arena de Inovação Petrobrás",
      locationUrl: "https://maps.app.goo.gl/GfR5R7XeE7s4YVjs6",
      categories: ["IA, Tecnologias Imersivas e Metaverso", "Robótica"],
    },
    {
      id: "arena-5",
      title: "LIVE",
      participants: ["Equipe LIVE"],
      time: "10:00 - 19:00",
      location: "Espaço CIn-UFPE (Stand)",
      locationUrl: "https://maps.app.goo.gl/Ej6mvubtszPcLb338",
      categories: ["IA, Tecnologias Imersivas e Metaverso", "Computação Avançada"],
    },
    {
      id: "arena-6",
      title: "Cooperação",
      participants: ["Coordenação de Cooperação e Inovação CIn-UFPE"],
      time: "10:00 - 19:00",
      location: "Arena de Negócios, Sala Ponte Tech",
      locationUrl: "https://maps.app.goo.gl/ZCHoJz1ZbyRdQJgc6",
      categories: ["Negócios"],
    },
  ],
  "17": [
    {
      id: "arena-7",
      title: "Pesquisas e Inovações em Computação",
      participants: ["Filipe Calegario"],
      time: "10:00 - 19:00",
      location: "Arena de Inovação Petrobrás",
      locationUrl: "https://maps.app.goo.gl/GfR5R7XeE7s4YVjs6",
      categories: ["IA, Tecnologias Imersivas e Metaverso", "Robótica"],
    },
    {
      id: "arena-8",
      title: "Cooperação",
      participants: ["Coordenação de Cooperação e Inovação CIn-UFPE"],
      time: "10:00 - 19:00",
      location: "Arena de Negócios",
      locationUrl: "https://maps.app.goo.gl/ZCHoJz1ZbyRdQJgc6",
      categories: ["Negócios"],
    },
    {
      id: "arena-9",
      title: "RobôCIn",
      participants: ["Equipe RobôCIn"],
      time: "10:00 - 19:00",
      location: "Espaço CIn-UFPE (Stand)",
      locationUrl: "https://maps.app.goo.gl/Ej6mvubtszPcLb338",
      categories: ["Robótica"],
    },
  ],
  "18": [
    {
      id: "arena-10",
      title: "Pesquisas e Inovações em Computação",
      participants: ["Filipe Calegario"],
      time: "10:00 - 19:00",
      location: "Arena de Inovação Petrobrás",
      locationUrl: "https://maps.app.goo.gl/GfR5R7XeE7s4YVjs6",
      categories: ["IA, Tecnologias Imersivas e Metaverso", "Robótica"],
    },
    {
      id: "arena-11",
      title: "RobôCIn",
      participants: ["Equipe RobôCIn"],
      time: "10:00 - 19:00",
      location: "Espaço CIn-UFPE (Stand)",
      locationUrl: "https://maps.app.goo.gl/Ej6mvubtszPcLb338",
      categories: ["Robótica"],
    },
  ],
};

export default function App() {
  const [filter, setFilter] = useState<FilterType>("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010101] via-[#0a0a0a] to-[#010101] p-6 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] pointer-events-none w-[1200px] h-[1200px] -z-10">
          <CinLogo className="w-full h-full opacity-[0.8]" />
        </div>

        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-5 p-5">
            <Logo2025 className="h-20 md:h-24 w-auto" />
          </div>
        </header>

        <Tabs defaultValue="15" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 backdrop-blur-md border-2 border-primary/20 p-3 gap-3 isolate">
            <TabsTrigger value="15" className="min-h-[80px]">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-lg">Dia 15</span>
                <span className="text-[10px] sm:text-sm opacity-60">Quarta-feira</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="16" className="min-h-[80px]">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-lg">Dia 16</span>
                <span className="text-[10px] sm:text-sm opacity-60">Quinta-feira</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="17" className="min-h-[80px]">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-lg">Dia 17</span>
                <span className="text-[10px] sm:text-sm opacity-60">Sexta-feira</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="18" className="min-h-[80px]">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-lg">Dia 18</span>
                <span className="text-[10px] sm:text-sm opacity-60">Sábado</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Filter Buttons */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-primary text-primary-foreground" : "border-primary/30 text-foreground hover:bg-primary/10"}
            >
              Tudo
            </Button>
            <Button
              variant={filter === "arenas" ? "default" : "outline"}
              onClick={() => setFilter("arenas")}
              className={filter === "arenas" ? "bg-primary text-primary-foreground" : "border-primary/30 text-foreground hover:bg-primary/10"}
            >
              Arenas
            </Button>
            <Button
            variant={filter === "talks" ? "default" : "outline"}
            onClick={() => setFilter("talks")}
            className={filter === "talks" ? "bg-primary text-primary-foreground" : "border-primary/30 text-foreground hover:bg-primary/10"}
          >
            Palestras
          </Button>
          </div>

          {["15", "16", "17", "18"].map((day) => {
            const dayTalks = talks[day] || [];
            const dayArenas = arenas[day] || [];
            
            return (
              <TabsContent key={day} value={day} className="space-y-8">
                {/* Palestras */}
                {(filter === "all" || filter === "talks") && dayTalks.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-primary border-l-4 border-primary pl-4">Palestras</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {dayTalks.map((talk) => (
                        <TalkCard
                          key={talk.id}
                          title={talk.title}
                          participants={talk.participants}
                          time={talk.time}
                          location={talk.location}
                          locationUrl={talk.locationUrl}
                          categories={talk.categories}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Arenas */}
                {(filter === "all" || filter === "arenas") && dayArenas.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-primary border-l-4 border-primary pl-4">Arenas</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {dayArenas.map((arena) => (
                        <TalkCard
                          key={arena.id}
                          title={arena.title}
                          participants={arena.participants}
                          time={arena.time}
                          location={arena.location}
                          locationUrl={arena.locationUrl}
                          categories={arena.categories}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        <Footer />
      </div>
    </div>
  );
}
