import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Star, Calendar } from "lucide-react";
import { DecisionPackage } from "@/data/packages";

interface PackageCardProps {
  pkg: DecisionPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  return (
    <Link to={`/packages/${pkg.slug}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                {pkg.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                by <span className="text-foreground">{pkg.author}</span>
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {pkg.problemClass}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 mt-2">
            {pkg.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5 mb-4">
            <Badge variant="outline" className="text-xs">
              {pkg.backend}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {pkg.solver}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>{pkg.downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              <span>{pkg.stars}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <Calendar className="h-3.5 w-3.5" />
              <span>{pkg.lastUpdated}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PackageCard;