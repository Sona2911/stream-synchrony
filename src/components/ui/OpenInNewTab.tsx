
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const OpenInNewTab: React.FC = () => {
  const { toast } = useToast();
  
  const handleOpenInNewTab = () => {
    const currentUrl = window.location.href;
    window.open(currentUrl, '_blank');
    
    toast({
      title: "Opening in new tab",
      description: "The application is now opening in a new browser tab.",
      duration: 3000,
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1 text-sm"
      onClick={handleOpenInNewTab}
      aria-label="Open in new tab"
    >
      <span>Open in New Tab</span>
      <ExternalLink className="h-3.5 w-3.5" />
    </Button>
  );
};

export default OpenInNewTab;
