import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded gradient-primary">
              <span className="text-xs font-bold text-primary-foreground">R</span>
            </div>
            <span className="font-semibold">Rastion</span>
            <span className="text-sm text-muted-foreground">v0.1.0</span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link to="/concept" className="text-muted-foreground hover:text-foreground transition-colors">
              Concept
            </Link>
            <Link to="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </Link>
            <Link to="/get-started" className="text-muted-foreground hover:text-foreground transition-colors">
              Get Started
            </Link>
            <a
              href="https://github.com/Rastion/rastion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </nav>

          <div className="text-sm text-muted-foreground">
            Apache-2.0 License
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
