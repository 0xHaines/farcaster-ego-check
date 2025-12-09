// og-image/index.tsx
import { ImageResponse } from '@vercel/og';
import EgoCheck from './EgoCheck';

export const config = {
  runtime: 'edge', 
};

export default function Handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get('text') || 'Disiplin, kaderin en güçlü silahıdır.'; 

    return new ImageResponse(
      <EgoCheck text={text} />,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Görsel oluşturma hatası: ${e.message}`, {
      status: 500,
    });
  }
}
