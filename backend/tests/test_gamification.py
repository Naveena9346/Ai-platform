from app.services.gamification_engine import GamificationEngine


def test_level_calculation_from_xp():
    assert GamificationEngine.calculate_level_from_xp(0) == 1
    assert GamificationEngine.calculate_level_from_xp(99) == 1
    assert GamificationEngine.calculate_level_from_xp(100) == 2
    assert GamificationEngine.calculate_level_from_xp(400) == 3
    assert GamificationEngine.calculate_level_from_xp(900) == 4
    assert GamificationEngine.calculate_level_from_xp(2500) == 6


def test_xp_required_for_level():
    assert GamificationEngine.xp_required_for_level(1) == 0
    assert GamificationEngine.xp_required_for_level(2) == 100
    assert GamificationEngine.xp_required_for_level(3) == 400
    assert GamificationEngine.xp_required_for_level(4) == 900
