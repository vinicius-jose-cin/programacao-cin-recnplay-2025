import { Heart } from "lucide-react";

export function Footer() {
  const lastUpdate = "14 de outubro de 2025";
  const lastHour = "11:18"
  
  return (
    <footer className="mt-10 pb-6 text-center space-y-4 relative z-10">
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <span>Feito com</span>
        <Heart className="size-4 fill-primary text-primary" />
        <span>pela</span>
        <a 
          href="https://ascom.cin.ufpe.br/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors underline"
        >
          ASCOM CIn
        </a>
      </div>
      
      <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto px-4">
        Não nos responsabilizamos por eventuais mudanças na programação do Rec n' Play
      </p>
      
      <p className="text-xs text-muted-foreground/60">
        Última atualização: {lastUpdate}, {lastHour}
      </p>
    </footer>
  );
}
