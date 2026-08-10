import { useState, useEffect, useCallback } from "react";
import { channelsRepo, type Channel } from "@/lib/db/chat";

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);

  const refresh = useCallback(async () => {
    setChannels(await channelsRepo.list());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createChannel = useCallback(
    async (name: string) => {
      await channelsRepo.create(name);
      await refresh();
    },
    [refresh]
  );

  const deleteChannel = useCallback(
    async (id: string) => {
      await channelsRepo.delete(id);
      await refresh();
    },
    [refresh]
  );

  return { channels, createChannel, deleteChannel };
}
