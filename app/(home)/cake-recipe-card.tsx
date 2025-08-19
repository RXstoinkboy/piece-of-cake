"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CircleOff, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export const RecipeCard = () => {
  const [value, setValue] = useState([18]);
  const onChange = (newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <Card className="min-w-full max-w-sm mb-2 ">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          Tort jak z przyjaciól{" "}
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 />
          </Button>
        </CardTitle>
        <CardContent className="grid grid-cols-2 px-0 gap-8">
          <ul>
            <li>Masa śmietanowa</li>
            <li>Masa mięsna</li>
            <li>Groszek</li>
          </ul>
          <section className="flex-1 flex flex-col items-end justify-center gap-3">
            <article className="flex gap-1 items-end">
              <h2 className="text-6xl font-bold">40</h2>
              <h3 className="text-2xl font-semibold">PLN</h3>
            </article>
            <Slider
              min={10}
              max={32}
              step={1}
              value={value}
              onValueChange={onChange}
            />
            <article className="flex gap-1 w-full justify-center items-center">
              <CircleOff size={18} className="rotate-90" />
              <span>{value[0]} cm</span>
            </article>
          </section>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
