from level06 import activer_bouclier


def test_activer_bouclier():
    assert activer_bouclier(42) is True
    assert activer_bouclier(100) is True
    assert activer_bouclier(41) is False
