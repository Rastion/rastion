import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, FileCode, Github, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/concept", label: "Concept", icon: Lightbulb },
    { path: "/examples", label: "Examples", icon: FileCode },
    { path: "/get-started", label: "Get Started", icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">R</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">Rastion</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Rastion/rastion"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </a>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive(path) ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 border-t border-border mt-2">
              <a
                href="https://github.com/Rastion/rastion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
