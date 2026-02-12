from level02 import assembler_code

def test_assembler_code():
    assert assembler_code("CODE", "123") == "CODE123"
    assert assembler_code("Hello", "World") == "HelloWorld"
    assert assembler_code("", "Test") == "Test"
    assert assembler_code("Test", "") == "Test"
