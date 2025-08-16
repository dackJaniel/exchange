'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Share2, MessageCircle, Send, Mail, Copy, Check } from 'lucide-react';

export function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : 'https://exchange.danielhilmer.de';
  const shareTitle =
    'Currency Exchange Calculator - Kostenloser Währungsrechner';
  const shareText =
    'Schau dir diesen kostenlosen Währungsrechner an! Über 170 Währungen mit aktuellen Wechselkursen. 📱💱';

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setIsOpen(false);
      } catch (error) {
        console.log('Share canceled or failed:', error);
      }
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${shareText} ${shareUrl}`
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleEmailShare = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(
      shareTitle
    )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(emailUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        console.error('Failed to copy link:', fallbackError);
      }
      document.body.removeChild(textArea);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: handleWhatsAppShare,
      color: 'hover:bg-green-600/20 hover:text-green-400',
      description: 'Mit Freunden teilen',
    },
    {
      name: 'Telegram',
      icon: Send,
      action: handleTelegramShare,
      color: 'hover:bg-blue-600/20 hover:text-blue-400',
      description: 'Über Telegram senden',
    },
    {
      name: 'E-Mail',
      icon: Mail,
      action: handleEmailShare,
      color: 'hover:bg-orange-600/20 hover:text-orange-400',
      description: 'Per E-Mail versenden',
    },
    {
      name: copied ? 'Kopiert!' : 'Link kopieren',
      icon: copied ? Check : Copy,
      action: handleCopyLink,
      color: copied
        ? 'bg-green-600/20 text-green-400'
        : 'hover:bg-zinc-600/20 hover:text-zinc-300',
      description: 'Link in Zwischenablage',
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='w-full text-white hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-zinc-800 justify-start'>
          <Share2 className='h-4 w-4 mr-3' />
          App teilen
        </Button>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='bg-zinc-900 border-zinc-700 rounded-t-xl max-h-[400px]'>
        <SheetHeader className='text-center pb-4'>
          <SheetTitle className='text-white text-lg'>App teilen</SheetTitle>
          <SheetDescription className='text-zinc-400 text-sm'>
            Teile den kostenlosen Währungsrechner mit deinen Freunden
          </SheetDescription>
        </SheetHeader>

        <div className='grid grid-cols-1 gap-3 mt-4'>
          {/* Native Share (if available) */}
          {typeof window !== 'undefined' && 'share' in navigator && (
            <Button
              variant='ghost'
              onClick={handleNativeShare}
              className='w-full justify-start text-left p-4 h-auto hover:bg-zinc-800 border border-zinc-700 rounded-lg'>
              <div className='flex items-center space-x-3'>
                <Share2 className='h-5 w-5 text-orange-500' />
                <div>
                  <div className='text-white font-medium'>Teilen</div>
                  <div className='text-zinc-400 text-sm'>
                    System Share verwenden
                  </div>
                </div>
              </div>
            </Button>
          )}

          {/* Share Options */}
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant='ghost'
              onClick={option.action}
              className={`w-full justify-start text-left p-4 h-auto hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors ${option.color}`}>
              <div className='flex items-center space-x-3'>
                <option.icon className='h-5 w-5' />
                <div>
                  <div className='text-white font-medium'>{option.name}</div>
                  <div className='text-zinc-400 text-sm'>
                    {option.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className='mt-4 pt-4 border-t border-zinc-700'>
          <div className='text-center text-xs text-zinc-500'>
            💱 Kostenloser Währungsrechner für alle!
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
