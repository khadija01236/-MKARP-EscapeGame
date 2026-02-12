from level04 import compter_objets


def test_compter_objets():
    assert compter_objets([]) == 0
    assert compter_objets(["cle", "potion"]) == 2
    assert compter_objets([1, 2, 3, 4]) == 4
