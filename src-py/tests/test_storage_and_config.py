"""StorageManager parameter handling + config constants.

Covers valid values, invalid values that must raise, and the path-resolution
seam every other module depends on (``config.OUTPUT_DIR`` flows from it).
"""

from datetime import date

from utils.path import StorageManager


# ---------------------------------------------------------------------------
# StorageManager
# ---------------------------------------------------------------------------

def test_get_path_requires_initialization(monkeypatch):
    """Before initialize() the manager must refuse to guess a base dir."""
    monkeypatch.setattr(StorageManager, "base_dir", None)
    try:
        StorageManager.get_path("output")
    except RuntimeError as error:
        assert "not initialized" in str(error)
    else:  # pragma: no cover - defensive
        raise AssertionError("get_path should raise RuntimeError when uninitialized")


def test_initialize_creates_the_base_directory(tmp_path, monkeypatch):
    """initialize() accepts any path string and creates it."""
    target = tmp_path / "fresh" / "data"
    monkeypatch.setattr(StorageManager, "base_dir", None)

    StorageManager.initialize(str(target))

    assert target.is_dir()
    assert StorageManager.get_path("output") == (target / "output").resolve()


def test_get_path_resolves_relative_to_base_dir():
    """A valid relative path resolves underneath the configured base dir."""
    base = StorageManager.base_dir
    resolved = StorageManager.get_path("output/recommendations.json")

    assert resolved.is_absolute()
    assert resolved == (base / "output" / "recommendations.json").resolve()


def test_get_path_blocks_path_traversal():
    """Invalid (escaping) paths must raise instead of returning a path."""
    try:
        StorageManager.get_path("../escape.txt")
    except PermissionError as error:
        assert "traversal" in str(error)
    else:  # pragma: no cover - defensive
        raise AssertionError("path traversal should raise PermissionError")


# ---------------------------------------------------------------------------
# config
# ---------------------------------------------------------------------------

def test_budget_is_a_positive_number():
    import config

    assert isinstance(config.BUDGET, (int, float))
    assert config.BUDGET > 0


def test_max_weight_is_a_fraction():
    import config

    assert 0 < config.MAX_WEIGHT <= 1.0


def test_commission_is_a_small_fraction():
    import config

    assert 0 <= config.COMMISSION < 0.05


def test_feature_columns_match_n_feat():
    import config

    assert config.N_FEAT == len(config.FEATURE_COLS)
    assert set(config.FEATURE_COLS) == {"Close", "rsi", "macd_hist", "bb_pct", "atr"}


def test_training_window_precedes_evaluation_window():
    import config

    assert date.fromisoformat(config.TRAIN_START) < date.fromisoformat(config.TRAIN_END)
    assert date.fromisoformat(config.EVAL_START) < date.fromisoformat(config.EVAL_END)


def test_output_dir_is_created_under_the_data_dir():
    import config

    assert config.OUTPUT_DIR.is_dir()
    assert config.OUTPUT_DIR.name == "output"
    assert config.OUTPUT_DIR == StorageManager.get_path("output")
