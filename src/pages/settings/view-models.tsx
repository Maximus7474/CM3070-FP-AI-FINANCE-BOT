import { useEffect, useState } from "react";
import { modelsRepo, TrainedModel } from "@/lib/db/model";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ViewModels = () => {
  const [models, setModels] = useState<TrainedModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);

  async function loadModels() {
    setLoadingModels(true);
    try {
      const data = await modelsRepo.list();
      setModels(data);
    } catch (e) {
      console.error("Failed to load models", e);
    } finally {
      setLoadingModels(false);
    }
  }

  async function handleDeleteModel(id: string) {
    try {
      await modelsRepo.delete(id);
      await loadModels();
    } catch (e) {
      console.error("Failed to delete model", e);
    }
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trained Models Database</CardTitle>
        <CardDescription>
          List of trained reinforcement learning models stored on this device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingModels ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Loading models...</p>
        ) : models.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No models found in database.</p>
        ) : (
          <div className="space-y-3">
            {models.map((model) => (
              <div
                key={model.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{model.model_name}</p>
                  <p className="text-xs text-muted-foreground">
                    Tickers: <span className="text-foreground font-mono">{model.tickers}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Range: {model.start_date} to {model.end_date}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Created: {new Date(model.created_at).toLocaleString()}
                  </p>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteModel(model.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
