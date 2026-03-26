"use client";

interface TareButtonProps {
  onTare: () => void;
  onReset: () => void;
  hasTare: boolean;
}

export default function TareButton({
  onTare,
  onReset,
  hasTare
}: TareButtonProps) {
  return (
    <div className="flex min-w-[124px] flex-col items-center gap-2">
      <button
        type="button"
        onClick={onTare}
        className="w-full rounded-2xl bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-accent/20 transition hover:bg-blue-400"
      >
        TARE
      </button>

      {hasTare ? (
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium uppercase tracking-[0.24em] text-muted transition hover:text-white"
        >
          Reset
        </button>
      ) : (
        <span className="text-xs uppercase tracking-[0.24em] text-transparent">
          Reset
        </span>
      )}
    </div>
  );
}
