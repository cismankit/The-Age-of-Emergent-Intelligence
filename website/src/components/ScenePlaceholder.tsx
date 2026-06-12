interface Props {
  description: string;
  chapterId: number;
}

export function ScenePlaceholder({ description, chapterId }: Props) {
  const gradients = [
    'from-blue-900 via-indigo-800 to-violet-900',
    'from-emerald-900 via-teal-800 to-cyan-900',
    'from-violet-900 via-purple-800 to-fuchsia-900',
    'from-amber-900 via-orange-800 to-red-900',
    'from-rose-900 via-pink-800 to-purple-900',
    'from-teal-900 via-cyan-800 to-blue-900',
  ];
  const gradient = gradients[(chapterId - 1) % gradients.length];

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-8 text-white`}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
      </div>
      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur">
            Fable 5 Scene
          </span>
          <span className="text-xs text-white/60">Chapter {chapterId}</span>
        </div>
        <p className="font-display text-lg leading-relaxed text-white/90 italic">
          "{description}"
        </p>
        <p className="mt-3 text-xs text-white/50">
          QR-linked cinematic scene — generate with Fable 5 using this prompt
        </p>
      </div>
    </div>
  );
}
