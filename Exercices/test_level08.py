from level08 import choisir_arme


def test_choisir_arme():
    assert choisir_arme("jedi") == "sabre_bleu"
    assert choisir_arme("sith") == "sabre_rouge"
    assert choisir_arme("neutral") == "blaster"
    assert choisir_arme("") == "blaster"
