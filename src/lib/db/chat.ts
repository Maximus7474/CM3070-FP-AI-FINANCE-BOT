import { generateId } from "../utils";
import { getDb } from "./client";
import type { Channel, Conversation, StoredMessage } from "@/types";

export const channelsRepo = {
  async list(): Promise<Channel[]> {
    const db = await getDb();
    return db.select<Channel[]>("SELECT * FROM channels ORDER BY created_at ASC");
  },

  async create(name: string): Promise<Channel> {
    const db = await getDb();
    const channel: Channel = { id: generateId(), name, created_at: Date.now() };
    await db.execute(
      "INSERT INTO channels (id, name, created_at) VALUES (?, ?, ?)",
      [channel.id, channel.name, channel.created_at]
    );
    return channel;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    await db.execute(
      "DELETE FROM channels WHERE id = ?",
      [id]
    );
  },
};

export const conversationsRepo = {
  async listByChannel(channelId: string): Promise<Conversation[]> {
    const db = await getDb();
    return db.select<Conversation[]>(
      "SELECT * FROM conversations WHERE channel_id = ? ORDER BY created_at DESC",
      [channelId]
    );
  },

  async create(channelId: string, title?: string): Promise<Conversation> {
    const db = await getDb();
    const convo: Conversation = {
      id: generateId(),
      channel_id: channelId,
      title: title ?? null,
      created_at: Date.now(),
    };
    await db.execute(
      "INSERT INTO conversations (id, channel_id, title, created_at) VALUES (?, ?, ?, ?)",
      [convo.id, convo.channel_id, convo.title, convo.created_at]
    );
    return convo;
  },

  /** Convenience: get the most recent conversation for a channel, or create one. */
  async getOrCreateLatest(channelId: string): Promise<Conversation> {
    const existing = await this.listByChannel(channelId);
    if (existing.length > 0) return existing[0];
    return this.create(channelId);
  },
};

export const messagesRepo = {
  async listByConversation(conversationId: string): Promise<StoredMessage[]> {
    const db = await getDb();
    return db.select<StoredMessage[]>(
      "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
      [conversationId]
    );
  },

  async insert(
    conversationId: string,
    role: StoredMessage["role"],
    content: string
  ): Promise<StoredMessage> {
    const db = await getDb();
    const msg: StoredMessage = {
      id: generateId(),
      conversation_id: conversationId,
      role,
      content,
      created_at: Date.now(),
    };
    await db.execute(
      "INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)",
      [msg.id, msg.conversation_id, msg.role, msg.content, msg.created_at]
    );
    return msg;
  },

  async clear(conversationId: string): Promise<void> {
    const db = await getDb();
    await db.execute("DELETE FROM messages WHERE conversation_id = ?", [conversationId]);
  },
};
