from level07 import verifier_konami


def test_verifier_konami():
    konami = ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "B", "A"]
    assert verifier_konami(konami) is True
    assert verifier_konami(konami[:-1]) is False
    assert verifier_konami(["UP"]) is False
