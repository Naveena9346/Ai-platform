import pytest
from nexus_backend.gamification.xp_engine import XPEngine


def test_level_formula_calculation():
    """
    Test 10: Verify mathematical level formula Level = floor( sqrt( XP / 100 ) ) + 1.
    """
    assert XPEngine.calculate_level(0) == 1
    assert XPEngine.calculate_level(99) == 1
    assert XPEngine.calculate_level(100) == 2   # sqrt(1) + 1 = 2
    assert XPEngine.calculate_level(400) == 3   # sqrt(4) + 1 = 3
    assert XPEngine.calculate_level(900) == 4   # sqrt(9) + 1 = 4
    assert XPEngine.calculate_level(1600) == 5  # sqrt(16) + 1 = 5


def test_xp_required_for_level():
    """
    Test 11: Verify total XP required per level threshold.
    """
    assert XPEngine.xp_for_level(1) == 0
    assert XPEngine.xp_for_level(2) == 100
    assert XPEngine.xp_for_level(3) == 400
    assert XPEngine.xp_for_level(4) == 900
