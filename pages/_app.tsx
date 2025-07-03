import { type FC, Suspense, useEffect, useMemo } from 'react';

import type { AppProps } from 'next/app';
import { useRouter as useNavigationRouter } from 'next/navigation';
import { useRouter } from 'next/router';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loader } from '@/components/Loader';
import '@/styles/globals.css';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { Toaster } from 'react-hot-toast';
import { base } from 'wagmi/chains';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>{error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error)}</code>
    </blockquote>
  </div>
);

// we replace this with farcaster back button
const BackButtonManipulator: FC = () => {
  const router = useRouter();
  const { back } = useNavigationRouter();

  useEffect(() => {}, [router]);

  return null;
};

const App: FC<AppProps> = ({ pageProps, Component }) => {
  return (
    <>
      <MiniKitProvider
        chain={base}
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        config={{
          appearance: {
            mode: 'auto',
            theme: 'mini-app-theme',
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          },
        }}
      >
        <Suspense fallback={<Loader />}>
          <BackButtonManipulator />
          <main className="relative bgcover overflowxhidden" style={{ background: `url('/img/stars.svg')` }}>
            <Component {...pageProps} />
          </main>
          <Toaster />
        </Suspense>
      </MiniKitProvider>
    </>
  );
};

const Inner: FC<AppProps> = props => {
  const debug = useMemo(() => {
    return true;
  }, []);

  useEffect(() => {
    if (debug) {
      let el = document.createElement('div');
      document.body.appendChild(el);
      import('eruda').then(lib =>
        lib.default.init({
          container: el,
          tool: ['console', 'elements'],
        }),
      );
    }
  }, [debug]);

  return <App {...props} />;
};

export default function CustomApp(props: AppProps) {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <Inner {...props} />
    </ErrorBoundary>
  );
}
