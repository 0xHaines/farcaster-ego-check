// api/index.ts
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Sizin kriterlerinize uygun, sert ve felsefi yanıtlar listesi:
const EGO_RESPONSES = [
  "Zafer anlık, irade sonsuzdur. Kendine daha büyük bir yük bul. (Aurelius)",
  "İlerliyor musun, yoksa sadece sürünüyor musun? Cevap, kodlarında değil, eyleminde. (Nietzsche)",
  "Korku, fırsatı gizleyen illüzyondur. Çeliği dövmek için ateşe gir. (Caesar)",
  "Topluluk seni izliyor. Kibir, düşüşün ilk adımıdır. Dik dur. (Seneca)",
  "Disiplin, kaderin en güçlü silahıdır. Bugün, dünden daha iyi ol. (Einstein)",
  "Sessizlikte çalış. Başarı, gürültü yapacaktır. Gösteri bitmeli, inşaat başlamalı. (Eliot)",
];

function getRandomResponse(): string {
  const index = Math.floor(Math.random() * EGO_RESPONSES.length);
  return EGO_RESPONSES[index];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const body: FrameRequest = req.body;

    // Farcaster Mesajını Doğrula (Güvenlik Kontrolü)
    const { message } = await getFrameMessage(body);

    if (!message) {
      return res.status(500).send('Invalid Frame Message');
    }

    const responseText = getRandomResponse();

    // FRAME YANITI: Yeni görseli ve butonu geri gönder
    const frameResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://placehold.co/600x400/000000/FFFFFF/png?text=${encodeURIComponent(responseText)}" />
          <meta property="fc:frame:button:1" content="Yeniden Kontrol Et" />
          <meta property="fc:frame:post_url" content="https://[VERCEL URL'NİZ]/api" />
        </head>
        <body><p>Ego Kontrol Sonucu</p></body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(frameResponse);

  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}
