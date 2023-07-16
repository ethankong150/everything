import { useState, useCallback} from 'react';
import axios from 'axios';
import {
  Container,
  Text,
} from '@chakra-ui/react';

import { ShortenUrlForm } from '../components/shortenurlform'
import { UrlList} from '../components/urllist'
import Shortened from '../components/types'



export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);

  const [QRCodes, setQRCodes] = useState<Array<string>>([]);

  const requestShortUrl = useCallback(
    async (inputUrl: string) => {
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });
      const newUrl = response.data as Shortened;
      setUrls([newUrl, ...urls]);
    },
    [urls, setUrls]
  );

  const requestQRCode = useCallback(
    async (inputUrl: string) => {
      let QRresponse;
      try {
        const response = await axios.get('https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(inputUrl) + '&size=50x50')
        QRresponse = response.config.url as string;

      } catch (error) {
        console.error('Error occurred while fetching QR code:', error)
        // Handle the error or provide a default value for QRresponse
        QRresponse = ''; // Default value
      }

      setQRCodes([QRresponse, ...QRCodes])
    },
    [QRCodes, setQRCodes]
  )

  return (
    <Container maxWidth="4xl" marginBlock={10} textAlign="center">
    <Text fontSize="4xl">My URL Shortener</Text>
    <ShortenUrlForm requestShortUrl={requestShortUrl} requestQRCode={requestQRCode}/>
    <UrlList urls={urls} QRCodes={QRCodes} />
  </Container>
  );
}

export default App;
