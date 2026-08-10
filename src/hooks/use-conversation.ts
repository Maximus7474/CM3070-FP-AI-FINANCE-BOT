import { useState, useEffect, useCallback } from "react";
import {
  conversationsRepo,
  messagesRepo,
  type Conversation,
  type StoredMessage,
} from "@/lib/db/chat";

export function useConversation(channelId: string) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const convo = await conversationsRepo.getOrCreateLatest(channelId);
      const history = await messagesRepo.listByConversation(convo.id);
      if (!cancelled) {
        setConversation(convo);
        setMessages(history);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [channelId]);

  const appendMessage = useCallback(
    async (role: StoredMessage["role"], content: string) => {
      if (!conversation) return;
      const saved = await messagesRepo.insert(conversation.id, role, content);
      setMessages((prev) => [...prev, saved]);
      return saved;
    },
    [conversation]
  );

  const clearHistory = useCallback(async () => {
    if (!conversation) return;
    await messagesRepo.clear(conversation.id);
    setMessages([]);
  }, [conversation]);

  return { conversation, messages, loading, appendMessage, clearHistory };
}
