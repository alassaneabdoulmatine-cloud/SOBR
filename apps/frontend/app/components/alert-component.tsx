import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

type AlertComponentProps = {
  title: string;
  description: string;
  variant: 'destructive' | 'default';
};

export function AlertComponent({ title, description, variant }: AlertComponentProps) {
  return (
    <Alert variant={variant} className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
