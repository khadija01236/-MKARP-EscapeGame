from level03 import alerte_surchauffe


def test_alerte_surchauffe():
    assert alerte_surchauffe(101) is True
    assert alerte_surchauffe(100) is False
    assert alerte_surchauffe(-5) is False
