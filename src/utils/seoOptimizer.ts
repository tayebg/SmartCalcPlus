// SEO and Performance Optimization Utilities

export const updatePageMeta = (title: string, description: string, keywords?: string) => {
  // Update title
  document.title = `${title} | SmartCalc+`;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update meta keywords if provided
  if (keywords) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', `${title} | SmartCalc+`);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
};

export const preloadCriticalResources = () => {
  // Preload critical fonts
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  link.as = 'style';
  document.head.appendChild(link);
};

export const optimizeImages = () => {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

export const trackPageView = (pageName: string) => {
  // Basic analytics tracking (would integrate with Google Analytics in production)
  console.log(`Page view: ${pageName} - ${new Date().toISOString()}`);
};

export const generateSitemap = () => {
  const pages = [
    '/',
    '/calculs',
    '/drives',
    '/videos',
    '/canevas',
    '/roadmap',
    '/notes',
    '/contact',
    '/calculs/licence/l1',
    '/calculs/licence/l2',
    '/calculs/licence/l3',
    '/calculs/master/m1',
    '/calculs/master/m2',
    '/calculs/doctorat'
  ];
  
  return pages.map(page => ({
    url: `https://smartcalc-plus.vercel.app${page}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: page === '/' ? '1.0' : '0.8'
  }));
};