
import '../styles/globals.css';
import Head from 'next/head';
import { AppDataProvider } from '../context/AppDataContext';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>RoomMatch Demo</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <AppDataProvider>
                <Component {...pageProps} />
            </AppDataProvider>
        </>
    );
}
