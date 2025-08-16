'use client';

import { RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppUpdates } from '@/hooks/useAppUpdates';

export function UpdateButton() {
  const { updateAvailable, installing, applyUpdate, checkForUpdates } =
    useAppUpdates();

  if (installing) {
    return (
      <Button variant='outline' disabled className='gap-2'>
        <RefreshCw className='h-4 w-4 animate-spin' />
        Wird aktualisiert...
      </Button>
    );
  }

  if (updateAvailable) {
    return (
      <Button
        onClick={applyUpdate}
        className='gap-2 bg-orange-500 hover:bg-orange-600 text-white'>
        <Download className='h-4 w-4' />
        Update installieren
      </Button>
    );
  }

  return (
    <Button variant='outline' onClick={checkForUpdates} className='gap-2'>
      <RefreshCw className='h-4 w-4' />
      Nach Updates suchen
    </Button>
  );
}
