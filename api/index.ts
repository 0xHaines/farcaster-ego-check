import { ImageResponse } from "@vercel/og";
import React from 'react';
import EgoCheckImage from '../$$text{og-image}/EgoCheck'; 

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url);
    const text = url.searchParams.get("text") || "Ego Kontrol Motoru Hazır.";

    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Farcaster Ego Check Frame</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${url.origin}/api/image?text=${encodeURIComponent(text)}" />
          <meta property="fc:frame:button:1" content="EGO'nu Kontrol Et" />
          <meta property="fc:frame:post_url" content="${url.origin}/api/index" /> 
        </head>
        <body>
          <h1>Ego Check Frame Aktif!</h1>
        </body>
      </html>
    `;

    return new Response(frameHtml, { status: 200, headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error: Function Crashed', { status: 500 });
  }
}

export async function image(req: Request) {
  const url = new URL(req.url);
  const text = url.searchParams.get("text") || "Ego Kontrol Motoru Hazır.";
  const image = React.createElement(EgoCheckImage, { text: text });
  
  return new ImageResponse(image, { width: 1200, height: 630 });
}
