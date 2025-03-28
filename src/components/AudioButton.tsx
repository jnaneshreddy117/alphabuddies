
import React from 'react';
import { Volume, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioButtonProps {
  text: string;
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text, className }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const speakText = () => {
    setIsPlaying(true);
    
    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slightly slower for learning
      utterance.onend = () => {
        setIsPlaying(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Browser does not support Web Speech API');
      setIsPlaying(false);
    }
  };

  return (
    <Button 
      onClick={speakText} 
      className={`rounded-full p-2 ${className}`}
      disabled={isPlaying}
      variant="outline"
      size="icon"
    >
      {isPlaying ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume className="h-5 w-5" />
      )}
    </Button>
  );
};

export default AudioButton;
