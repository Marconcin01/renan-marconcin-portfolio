import { Linkedin, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
  excerpt: string;
}

export default function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const message = `Confira este artigo: "${title}"\n\n${excerpt}\n\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <span className="text-sm font-bold text-foreground">Compartilhar:</span>
      
      <button
        onClick={shareOnLinkedIn}
        className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-4 py-2 font-semibold hover:bg-[#084399] transition-colors"
        aria-label="Compartilhar no LinkedIn"
      >
        <Linkedin size={18} />
        LinkedIn
      </button>

      <button
        onClick={shareOnWhatsApp}
        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 font-semibold hover:bg-[#1EA952] transition-colors"
        aria-label="Compartilhar no WhatsApp"
      >
        <MessageCircle size={18} />
        WhatsApp
      </button>

      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 bg-muted text-foreground px-4 py-2 font-semibold hover:bg-border transition-colors"
        aria-label="Copiar link"
      >
        {copied ? (
          <>
            <Check size={18} />
            Copiado!
          </>
        ) : (
          <>
            <Copy size={18} />
            Copiar Link
          </>
        )}
      </button>
    </div>
  );
}
