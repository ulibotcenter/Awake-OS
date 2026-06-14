'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0B1F2E] text-[#E0F7FF]">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] mb-3">Something went wrong</h2>
        <p className="text-sm text-[#B8F5FF] mb-6 leading-relaxed">
          The page failed to load. This is usually fixed by refreshing or restarting the dev server.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-luminous px-6 py-3 rounded-full text-sm font-medium"
        >
          Try again
        </button>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-6 text-left text-[10px] text-[#B8F5FF]/70 overflow-auto max-h-32 p-3 rounded-lg border border-[rgba(0,229,192,0.2)]">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
}