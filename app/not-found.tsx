import Link from "next/link";
import { config } from "@/lib/config";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-base font-mono">
      <div className="w-full max-w-lg rounded-lg border border-edge bg-base neon-glow overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-edge">
          <span className="text-dim text-xs">[×]</span>
          <span className="flex-1 text-center text-xs text-dim truncate">
            visitor@{config.handle}:~
          </span>
          <span className="w-[42px]" />
        </div>

        {/* Terminal body */}
        <div className="p-8 space-y-4">
          <p className="text-sm">
            <span className="text-accent">visitor</span>
            <span className="text-dim">@</span>
            <span className="text-primary">{config.handle}</span>
            <span className="text-dim">:~$&nbsp;</span>
            <span className="text-content">cd {"{unknown path}"}</span>
          </p>

          <p className="text-danger text-sm">
            bash: cd: {"{unknown path}"}: No such file or directory
          </p>

          <div className="text-dim text-xs space-y-1 pt-2 border-t border-edge">
            <p>exit code: <span className="text-warn">404</span></p>
            <p>// the path you requested does not exist</p>
          </div>

          <div className="pt-4">
            <p className="text-sm">
              <span className="text-accent">visitor</span>
              <span className="text-dim">@</span>
              <span className="text-primary">{config.handle}</span>
              <span className="text-dim">:~$&nbsp;</span>
              <Link
                href="/"
                className="text-primary hover:neon-text underline underline-offset-4 decoration-dim transition-all"
              >
                cd ~
              </Link>
              <span className="cursor-blink" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
