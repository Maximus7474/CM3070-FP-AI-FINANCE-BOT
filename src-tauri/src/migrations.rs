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
        Migration {
            version: 2,
            description: "create_trained_models_table",
            sql: "
                CREATE TABLE trained_models (
                    id TEXT PRIMARY KEY,
                    model_name TEXT NOT NULL,
                    tickers TEXT NOT NULL,
                    start_date TEXT NOT NULL,
                    end_date TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                );

                CREATE INDEX idx_trained_models_created_at ON trained_models(created_at DESC);
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_app_settings_table",
            sql: "
                CREATE TABLE app_settings (
                    key TEXT PRIMARY KEY,
                    value TEXT,
                    updated_at INTEGER NOT NULL
                );
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_learn_tables",
            sql: "
                CREATE TABLE guides (
                    id TEXT PRIMARY KEY,
                    topic TEXT NOT NULL,
                    title TEXT NOT NULL,
                    summary TEXT NOT NULL,
                    steps TEXT NOT NULL,
                    key_takeaways TEXT NOT NULL,
                    sources TEXT NOT NULL,
                    grounded INTEGER NOT NULL DEFAULT 0,
                    created_at INTEGER NOT NULL,
                    updated_at INTEGER NOT NULL
                );

                CREATE TABLE flashcard_decks (
                    id TEXT PRIMARY KEY,
                    topic TEXT NOT NULL,
                    cards TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                );

                CREATE TABLE flashcard_progress (
                    deck_id TEXT NOT NULL REFERENCES flashcard_decks(id) ON DELETE CASCADE,
                    card_id TEXT NOT NULL,
                    box_level INTEGER NOT NULL DEFAULT 0,
                    due_at INTEGER NOT NULL DEFAULT 0,
                    last_reviewed_at INTEGER,
                    PRIMARY KEY (deck_id, card_id)
                );

                CREATE INDEX idx_guides_created ON guides(created_at DESC);
                CREATE INDEX idx_flashcard_decks_created ON flashcard_decks(created_at DESC);
                CREATE INDEX idx_flashcard_progress_due ON flashcard_progress(due_at);
            ",
            kind: MigrationKind::Up,
        },
    ]
}
