"use client";

import Link from "next/link";
import {
  Mail,
  ArrowUpRight,
  Linkedin,
  ThumbsUp,
  Instagram,
} from "lucide-react";
import { TerminalModal } from "./TerminalModal";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  className?: string; // Kept for compatibility if needed
}

export function ContactModal({ open, onClose, className }: ContactModalProps) {
  return (
    <TerminalModal
      open={open}
      onClose={onClose}
      filename="contact.js"
      className={cn("max-w-md", className)}
    >
      <div className="font-mono text-text-primary">
        <div className="mb-6">
          <h3 className="text-lg text-primary font-bold mb-1">{`> Initiate_Connection`}</h3>
          <p className="text-sm text-text-muted">
            {`// Contact me through the following options`}
          </p>
        </div>

        <div className="space-y-3">
          {/* LinkedIn Option - The "Active" Choice */}
          <Link
            href="https://linkedin.com/in/jerriejayadi"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full text-left"
          >
            <div className="flex items-center justify-between p-4 rounded bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-bold text-text-primary flex items-center gap-1">
                    LinkedIn <ThumbsUp className="size-3 text-primary" />
                  </div>
                  <div className="text-xs text-text-secondary">
                    Response latency: ~2h
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="animate-pulse w-2 h-2 rounded-full bg-green-400"></span>
              </div>
            </div>
          </Link>

          {/* Instagram */}
          <Link
            href="https://instagram.com/jerriejayadi"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full text-left"
          >
            <div className="flex items-center justify-between p-4 rounded bg-surface-hover/30 border border-transparent hover:border-surface-border transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-text-muted group-hover:text-text-primary" />
                <div>
                  <div className="text-sm font-bold text-text-secondary group-hover:text-text-primary">
                    Instagram
                  </div>
                  <div className="text-xs text-text-muted group-hover:text-text-secondary">
                    Follow me on Instagram
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-secondary" />
            </div>
          </Link>

          {/* Email Option - The "Passive" Choice */}
          <Link
            href="mailto:hello@jerriejayadi.com"
            className="group block w-full text-left"
          >
            <div className="flex items-center justify-between p-4 rounded bg-surface-hover/30 border border-transparent hover:border-surface-border transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-text-muted group-hover:text-text-primary" />
                <div>
                  <div className="text-sm font-bold text-text-secondary group-hover:text-text-primary">
                    Email
                  </div>
                  <div className="text-xs text-text-muted group-hover:text-text-secondary">
                    Async communication
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-secondary" />
            </div>
          </Link>
        </div>
      </div>
    </TerminalModal>
  );
}

