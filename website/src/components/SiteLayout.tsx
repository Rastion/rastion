import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Github, FileText } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            Rastion
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
            <NavLink
              to="/examples"
              className="transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Examples
            </NavLink>
            <NavLink
              to="/create-a-dmp"
              className="transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Create a DMP
            </NavLink>
            <NavLink
              to="/contribute"
              className="transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Contribute
            </NavLink>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/DMP_v0.1.md"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Specification
            </a>
            <a
              href="https://github.com/Rastion/rastion"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
      {children}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/Rastion/rastion"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/DMP_v0.1.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              DMP v0.1 Spec
            </a>
            <a
              href="https://github.com/Rastion/rastion/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Apache-2.0
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
