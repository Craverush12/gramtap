"use client";

interface DeviceGuardProps {
  isSupported: boolean;
  isSafari: boolean;
  onContinueAnyway: () => void;
}

export default function DeviceGuard({
  isSupported,
  isSafari,
  onContinueAnyway
}: DeviceGuardProps) {
  const title = !isSafari
    ? "Please open this page in Safari."
    : "3D Touch Not Detected.";
  const description = !isSafari
    ? "Force touch events only work in Safari on iOS. Chrome and Firefox do not support this API."
    : "This app requires an iPhone 6S, 7, 8, X, or XS. iPhone 11 and later use Haptic Touch and cannot measure weight.";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#101010] p-6 text-center shadow-2xl shadow-black/40">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl">
          {!isSafari ? "🌐" : "⚠️"}
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/80">
          GramTap works best in Safari on iPhone models with real 3D Touch force sensing.
        </div>
        <button
          type="button"
          onClick={onContinueAnyway}
          className="mt-8 w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:border-white/40 hover:bg-white/5"
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
}
