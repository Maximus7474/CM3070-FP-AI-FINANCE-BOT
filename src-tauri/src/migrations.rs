use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_core_chat_tables",
            sql: "
                CREATE TABLE channels (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                );

                CREATE TABLE conversations (
                    id TEXT PRIMARY KEY,
                    channel_id TEXT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
                    title TEXT,
                    created_at INTEGER NOT NULL
                );

                CREATE TABLE messages (
                    id TEXT PRIMARY KEY,
                    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
                    role TEXT NOT NULL CHECK(role IN ('user','assistant','system')),
                    content TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                );

                CREATE INDEX idx_conversations_channel ON conversations(channel_id);
                CREATE INDEX idx_messages_conversation ON messages(conversation_id);

                INSERT INTO channels (id, name, created_at) VALUES ('general', 'General', unixepoch());
            ",
            kind: MigrationKind::Up,
        },
    ]
}
