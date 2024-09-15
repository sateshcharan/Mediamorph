import { useToast } from "./use-toast";

export function useErrorToast() {
  const { toast } = useToast();

  const showErrorToast = (errorMessage: string) => {
    toast({
      variant: "destructive", // or your custom variant
      title: "Oh no! Something went wrong.",
      description: errorMessage,
      duration: 4000, // Auto dismiss after 5 seconds
    });
  };

  return { showErrorToast };
}
