import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface TalkCardProps {
  title: string;
  participants: string[];
  time: string;
  location: string;
  locationUrl?: string;
  categories?: string[];
}

export function TalkCard({ title, participants, time, location, locationUrl, categories }: TalkCardProps) {
  
  return (
    <Card className="transform-gpu hover:shadow-[0_0_30px_rgba(238,38,145,0.3)] transition-all hover:border-secondary/60 border-2 border-secondary/20 bg-card/60 backdrop-blur-lg isolate">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="flex-1 text-foreground">{title}</CardTitle>
          {categories && categories.length > 0 && (
            <div className="flex flex-col gap-1.5 items-end shrink-0 max-w-[50%]">
              {categories.map((category, index) => (
                <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground whitespace-normal text-right break-words">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="size-4 shrink-0 text-primary" />
          <span>{participants.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="size-4 shrink-0 text-secondary" />
          <span>{time}</span>
        </div>
        {locationUrl ? (
          <a 
            href={locationUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <MapPin className="size-4 shrink-0 text-primary" />
            <span className="flex-1">{location}</span>
            <ExternalLink className="size-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-primary" />
            <span>{location}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
