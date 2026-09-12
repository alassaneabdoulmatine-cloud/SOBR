import { ChevronDown, Gift, HelpCircle } from 'lucide-react';

export function TopBar() {
  return (
    <div className="flex items-center gap-2">
      {/* Credits */}
      <button
        className="
              flex h-9 items-center gap-2
              rounded-full
              bg-muted
              px-3.5
              text-sm font-medium
              text-foreground
              hover:bg-accent
            "
      >
        <span
          className="
                flex size-4 items-center justify-center
                rounded-full
                bg-primary
                text-[10px]
                font-bold
                text-primary-foreground
              "
        >
          ✦
        </span>
        0 credits
        <ChevronDown className="size-3.5" />
      </button>

      <button
        className="
              flex size-9 items-center justify-center
              rounded-full bg-muted
              hover:bg-accent
            "
        aria-label="Gifts"
      >
        <Gift className="size-4" />
      </button>

      <button
        className="
              flex size-9 items-center justify-center
              rounded-full bg-muted
              hover:bg-accent
            "
        aria-label="Help"
      >
        <HelpCircle className="size-4" />
      </button>

      {/* Avatar */}
      <button
        className="
              flex size-9 items-center justify-center
              rounded-full
              bg-sidebar-primary
              text-sm font-medium
              text-sidebar-primary-foreground
            "
      >
        A
      </button>
    </div>
  );
}
