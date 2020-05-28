const consonants = /[\u{05D0}-\u{05F2}]/u;
const ligature = /[\u{05C1}-\u{05C2}]/u;
const dagesh = /[\u{05BC},\u{05BF}]/u; // includes rafe
const niqqud = /[\u{05B0}-\u{05BB},\u{05C7}]/u;
const taamei = /[\u{0590}-\u{05AF},\u{05BD}-\u{05BE},\u{05C0},\u{05C3}]/u;

interface CharInterface {
  text: string;
  position: number;
}

export class Char implements CharInterface {
  text: string;
  position: number;

  constructor(char: string) {
    this.text = char;
    this.position = this.findPos();
  }

  private findPos() {
    const char = this.text;
    if (consonants.test(char)) {
      return 0;
    }
    if (ligature.test(char)) {
      return 1;
    }
    if (dagesh.test(char)) {
      return 2;
    }
    if (niqqud.test(char)) {
      return 3;
    }
    if (taamei.test(char)) {
      return 4;
    }
    // i.e. any non-hebrew char
    return 10;
  }
}
