use tauri::Manager;
use tauri_plugin_shell::ShellExt;
use tauri_plugin_shell::process::CommandEvent;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            //get / create appdata directory for temporary files (AppData for windows)
            let app_data_dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
            std::fs::create_dir_all(&app_data_dir).map_err(|e| e.to_string())?;
            let data_dir_str = app_data_dir.to_str().unwrap();

            #[cfg(dev)]
            {
                println!("\n=== DEVELOPMENT MODE ===");
                println!("App Data Directory: {}", data_dir_str);
                println!("Python sidecar skipped. Please start it manually:\n");
                println!("1. cd src-py");
                println!("2. .venv\\Scripts\\activate");
                println!("3. python main.py --data-dir=\"{}\"\n", data_dir_str);
                println!("========================\n");
            }

            #[cfg(not(dev))]
            {
                let sidecar = app
                    .shell()
                    .sidecar("app")
                    .unwrap()
                    .arg("--data-dir")
                    .arg(data_dir_str);

                let (mut rx, _child) = sidecar.spawn().expect("failed to spawn python sidecar");

                tauri::async_runtime::spawn(async move {
                    while let Some(event) = rx.recv().await {
                        match event {
                            CommandEvent::Stdout(line) => {
                                println!("[python out] {}", String::from_utf8_lossy(&line));
                            }
                            CommandEvent::Stderr(line) => {
                                eprintln!("[python err] {}", String::from_utf8_lossy(&line));
                            }
                            CommandEvent::Terminated(payload) => {
                                println!(
                                    "[python sidecar] Exited unexpectedly with code: {:?}",
                                    payload.code
                                );
                            }
                            _ => {}
                        }
                    }
                });
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
