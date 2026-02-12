from level09 import meilleur_score


def test_meilleur_score():
    assert meilleur_score([]) == 0
    assert meilleur_score([1]) == 1
    assert meilleur_score([10, 5, 42, 7]) == 42
