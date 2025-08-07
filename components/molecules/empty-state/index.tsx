import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { FC } from "react";

type EmptyProps = {
  title: string;
  text: string;
  onClick?: () => void;
  buttonText: string;
};

export const Empty: FC<EmptyProps> = ({ title, text, onClick, buttonText }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Card className="border-dashed p-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{text}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" className="w-full" onClick={onClick}>
            <PlusCircle className="mr-2" />
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
