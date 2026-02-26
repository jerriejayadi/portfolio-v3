import { Badge } from "@/components/atoms/Badge";
import { Github, Linkedin, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BlogListProps {
  onBack: () => void;
}

export function BlogList({ onBack }: BlogListProps) {
  return (
    <div className="min-h-screen w-full bg-background font-mono text-text-primary p-4 md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12 pb-24">
        {/* Header */}
        <header className="border-b border-surface-border pb-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-text-muted hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Map</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-primary">{"<Digital Garden />"}</span>
          </h1>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <span>v2.4.0</span>
            <span className="size-1 rounded-full bg-surface-border" />
            <span className="uppercase tracking-widest">Directory Mode</span>
          </div>
        </header>

        {/* Projects Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-primary font-bold">#</span>
            <h2 className="text-xl font-bold uppercase tracking-wider">
              Projects
            </h2>
          </div>

          <div className="grid gap-8">
            {/* Project 1 */}
            <div className="group border border-surface-border bg-surface/30 p-6 rounded-lg hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  SaaS Dashboard V2
                </h3>
                <span className="text-xs text-text-muted font-mono">
                  /projects/analytics-suite
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed mb-4">
                High-performance analytics platform handling 1M+ data points
                with real-time WebSocket updates. Built to visualize complex
                datasets with sub-second latency.
              </p>
              <div className="flex gap-2">
                <Badge variant="primary">React</Badge>
                <Badge variant="neutral">D3.js</Badge>
                <Badge variant="neutral">TypeScript</Badge>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group border border-surface-border bg-surface/30 p-6 rounded-lg hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  E-Commerce API
                </h3>
                <span className="text-xs text-text-muted font-mono">
                  /projects/headless-shop
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed mb-4">
                Headless e-commerce solution architected for scalability.
                Features distinct customer/admin auth flows, inventory
                management, and payment gateway integration.
              </p>
              <div className="flex gap-2">
                <Badge variant="primary">Node.js</Badge>
                <Badge variant="neutral">PostgreSQL</Badge>
                <Badge variant="neutral">Redis</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Thoughts Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-primary font-bold">#</span>
            <h2 className="text-xl font-bold uppercase tracking-wider">
              Thoughts
            </h2>
          </div>

          <div className="grid gap-6">
            {/* Thought 1 */}
            <article className="group border-l-2 border-surface-border pl-6 py-2 hover:border-primary transition-colors">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                  Future of Interfaces
                </h3>
                <span className="text-xs text-text-muted">
                  /thoughts/ui-ux-trends
                </span>
              </div>
              <p className="text-text-secondary italic mb-2">
                &quot;The screen is disappearing. We are moving towards ambient
                computing where interfaces are...&quot;
              </p>
              <p className="text-sm text-text-muted">
                Essay on the evolution of spatial computing and non-diegetic UI
                elements.
              </p>
            </article>
            {/* Thought 2 */}
            <article className="group border-l-2 border-surface-border pl-6 py-2 hover:border-primary transition-colors">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                  The Art of Code
                </h3>
                <span className="text-xs text-text-muted">
                  /thoughts/mindful-engineering
                </span>
              </div>
              <p className="text-text-secondary italic mb-2">
                &quot;Code is not just logic; it&apos;s a form of
                expression...&quot;
              </p>
              <p className="text-sm text-text-muted">
                Reflections on software craftsmanship and the aesthetic of clean
                architecture.
              </p>
            </article>
          </div>
        </section>

        {/* System Footer */}
        <footer className="pt-12 border-t border-surface-border grid md:grid-cols-2 gap-8">
          {/* System Status */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
              System Status / Activity Log
            </h4>
            <div className="space-y-3 text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  ○ Updated dependencies
                </span>
                <span className="text-text-muted opacity-50">
                  Today, 09:42 AM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-400">
                  ● Deployed &apos;SaaS Dashboard&apos;
                </span>
                <span className="text-text-muted opacity-50">
                  Yesterday, 14:20 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  ○ Archived &apos;Legacy Blog&apos;
                </span>
                <span className="text-text-muted opacity-50">Oct 24, 2023</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 md:items-end">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-2 md:text-right">
              Connect
            </h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
              >
                <Github className="size-4" />
                <span>Github</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
              >
                <Twitter className="size-4" />
                <span>Twitter</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
              >
                <Linkedin className="size-4" />
                <span>LinkedIn</span>
              </Link>
            </div>
            <div className="mt-4 text-xs text-text-muted md:text-right">
              <p>© 2026 Digital Garden Exploratory.</p>
              <p>Designed & Coded in VSC.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

