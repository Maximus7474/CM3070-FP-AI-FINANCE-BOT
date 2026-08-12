import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainSettings } from "./main-settings";
import { TrainModel } from "./train-model";
import { ViewModels } from "./view-models";

export default function Settings() {
  return (
    <div className="space-y-6 container mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          System Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure application preferences, train reinforcement learning agents, and view trained models.
        </p>
      </div>

      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="main">Main Settings</TabsTrigger>
          <TabsTrigger value="train">Train Agent</TabsTrigger>
          <TabsTrigger value="models">View Trained Models</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <MainSettings />
        </TabsContent>

        <TabsContent value="train">
          <TrainModel />
        </TabsContent>

        <TabsContent value="models">
          <ViewModels />
        </TabsContent>
      </Tabs>
    </div>
  );
}
