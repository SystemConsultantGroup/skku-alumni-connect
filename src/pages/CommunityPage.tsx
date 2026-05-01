import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { CLUBS, RESEARCH_GROUPS, type Club } from "@/data/community";

type CommunityTab = "club" | "research";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<CommunityTab>("club");

  const items = tab === "club" ? CLUBS : RESEARCH_GROUPS;

  const ClubCard = ({ club }: { club: Club }) => {
    const basePath = club.type === "club" ? "/main/community/club" : "/main/community/research";
    return (
      <button
        onClick={() => navigate(`${basePath}/${club.id}`)}
        className="w-full text-left bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{club.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{club.intro}</p>
            <p className="text-xs text-muted-foreground mt-2">
              회장: {club.presidentTitle} {club.president}
            </p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <Tabs value={tab} onValueChange={(v) => setTab(v as CommunityTab)}>
        <TabsList className="w-full">
          <TabsTrigger value="club" className="flex-1">취미동호회</TabsTrigger>
          <TabsTrigger value="research" className="flex-1">발전연구회</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
