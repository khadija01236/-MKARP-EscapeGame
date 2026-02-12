from level10 import normaliser_code_acces


def test_normaliser_code_acces():
    assert normaliser_code_acces("  mkArp-10  ") == "MKARP-10"
    assert normaliser_code_acces("ok") == "OK"
    assert normaliser_code_acces("   ") == ""
