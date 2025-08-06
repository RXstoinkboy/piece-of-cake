import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-svh w-full">
      <section className="flex flex-col items-center justify-center gap-4 p-4 h-[calc(100svh/3)]">
        <h1 className="text-4xl font-bold">Welcome {"{USER}"}</h1>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 p-4 min-h-1/2">
        <Card className="w-full max-w-sm p-4">
          <CardHeader>
            <CardTitle>Dodawanie składników</CardTitle>
            <CardContent>
              <p>Input z nazwą składnika i się dodaje do bazy</p>
              <p>Input żeby ustalić cenę</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm p-4">
          <CardHeader>
            <CardTitle>Lista składników</CardTitle>
            <CardContent>
              <p>Lista składników z cenami</p>
              <p>Button do edycji nazwy</p>
              <p>Button do edycji ceny</p>
              <p>Button do usuwania składnika</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm p-4">
          <CardHeader>
            <CardTitle>Tworzenie przepisu na masę/warstwę</CardTitle>
            <CardContent>
              <p>
                Wybór (select) składnika z listy (chyba powinno być w
                przeliczeniu na 100g)
              </p>
              <p>Input do ustalenia ilości składnika w masie w gramach</p>
              <p>Button do edycji ilości</p>
              <p>Button do usuwania</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm p-4">
          <CardHeader>
            <CardTitle>
              Wybieraczka wcześniej przygotowanych konfiguracji tortów
            </CardTitle>
            <CardContent>
              <p>Select do wyboru po nazwie tortu</p>
              <p>Po wybraniu na dole się pojawia karta z listą warstw</p>
              <p>Suwak do zmiany średnicy</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm p-4">
          <CardHeader>
            <CardTitle>
              Tworzenie konfiguracji tortu (dla ustalonej średnicy)
            </CardTitle>
            <CardContent>
              <p>Input do ustalenia nazwy tortu</p>
              <p>Wybór (select) przepisu na masę/warstwę</p>
              <p>Input do ustalenia ilości masy w gramach</p>
              <p>Button do edycji ilości</p>
              <p>Button do usuwania</p>
              <p>Suwak do zmiany średnicy</p>
              <p>
                Po prawej jakiś panel z przeliczeniem docelowej masy i ceną dla
                wybranej średnicy
              </p>
            </CardContent>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
