export interface CatchDialogProps {
  display: boolean;
  id: number;
  name: string;
  onClose: (data?: string) => void;
}
