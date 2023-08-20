import '../styles/index.scss';
import '../styles/prism.scss';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}
