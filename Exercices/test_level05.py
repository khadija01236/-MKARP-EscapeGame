from level05 import total_energie


def test_total_energie():
    assert total_energie([]) == 0
    assert total_energie([10, 20, 5]) == 35
    assert total_energie([1, -1, 3]) == 3
