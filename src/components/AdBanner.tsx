import { useEffect } from 'react';
import { AD_CLIENT, AD_SLOT_HEADER } from '@/constants/ads';

export default function AdBanner() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={AD_SLOT_HEADER}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
