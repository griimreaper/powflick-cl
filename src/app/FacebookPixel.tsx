'use client';
import { useEffect } from 'react';

const FacebookPixel = () => {
    const pixelId = '2327119294354057'; // o usa process.env.NEXT_PUBLIC_FB_PIXEL_ID

    useEffect(() => {
        if (!pixelId) return;

        // Agrega el script de Facebook Pixel
        const script = document.createElement('script');
        script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
        document.head.appendChild(script);

        // Agrega el <noscript> con <img> al body
        const noscript = document.createElement('noscript');
        const img = document.createElement('img');
        img.height = 1;
        img.width = 1;
        img.style.display = 'none';
        img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
        noscript.appendChild(img);

        const body = document.body;
        if (body.firstChild) {
            body.insertBefore(noscript, body.firstChild);
        } else {
            body.appendChild(noscript);
        }
    }, [pixelId]);

    return null;
};

export default FacebookPixel;
