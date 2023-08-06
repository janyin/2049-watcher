import '../styles/index.scss';
import '../styles/prism.scss';
import { ThemeProvider } from 'next-themes';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
