import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const MainSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Settings</CardTitle>
        <CardDescription>
          Manage local engine settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {/*<Label htmlFor="temp-1">temp-1</Label>
          <Input
            id="temp-1"
            value={"temp-1"}
            onChange={(e) => console.log(e.target.value)}
            placeholder="temp-1"
          />*/}
          <p>Placeholder content, more to come</p>
        </div>
      </CardContent>
    </Card>
  )
}
