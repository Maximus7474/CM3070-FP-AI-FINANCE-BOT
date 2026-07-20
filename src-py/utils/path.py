import argparse
from pathlib import Path

class StorageManager:
    base_dir: Path | None = None

    @classmethod
    def initialize(cls, path_str: str):
        """Call this exactly once when your sidecar boots up."""
        cls.base_dir = Path(path_str).resolve()
        cls.base_dir.mkdir(parents=True, exist_ok=True)

        @classmethod
        def get_path(cls, relative_path: str) -> Path:
            """
            Polishes a relative path, making it absolute against the base directory.
            """
            if cls.base_dir is None:
                raise RuntimeError("StorageManager not initialized. Call initialize() first.")

            target_path = (cls.base_dir / relative_path).resolve()

            if not target_path.is_relative_to(cls.base_dir):
                raise PermissionError(f"Path traversal attempt blocked: {relative_path}")

            return target_path


parser = argparse.ArgumentParser()
parser.add_argument('--data-dir', type=str, required=True)
args, _ = parser.parse_known_args()
StorageManager.initialize(args.data_dir)
