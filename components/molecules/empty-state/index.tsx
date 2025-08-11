import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { FC, ReactNode, ComponentProps } from "react";

type EmptyProps = {
  title: string;
  text: string;
  buttons: ReactNode;
};

export const Empty: FC<EmptyProps> = ({ title, text, buttons }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Card className="border-dashed p-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{text}</p>
        </CardContent>
        <CardFooter className="flex justify-center">{buttons}</CardFooter>
      </Card>
    </div>
  );
};

type EmptyButtonProps = ComponentProps<typeof Button> & {
  onClick?: () => void;
  children: string;
};

export const EmptyButton = ({
  onClick,
  children,
  ...props
}: EmptyButtonProps) => {
  return (
    <Button size="lg" className="w-full" onClick={onClick} {...props}>
      <PlusCircle className="mr-2" />
      {children}
    </Button>
  );
};
