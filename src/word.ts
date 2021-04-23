import { syllabify, makeClusters } from "./utils/syllabifier";
import { Syllable } from "./syllable";
import { Cluster } from "./cluster";
import { Char } from "./char";
import { SylOpts } from "./text";

export class Word {
  text: string;
  whiteSpaceBefore: string | null;
  whiteSpaceAfter: string | null;
  private sylOpts: SylOpts;

  constructor(text: string, sylOpts: SylOpts) {
    this.text = text.trim();
    const startMatch = text.match(/^\s*/g);
    const endMatch = text.match(/\s*$/g);
    this.whiteSpaceBefore = startMatch ? startMatch[0] : null;
    this.whiteSpaceAfter = endMatch ? endMatch[0] : null;
    this.sylOpts = sylOpts;
  }

  /**
   * @returns a one dimensional array of Syllables
   */
  get syllables(): Syllable[] {
    if (/\w/.test(this.text) || this.isDivineName) {
      const syl = new Syllable(this.clusters);
      return [syl];
    }
    return syllabify(this.clusters, this.sylOpts);
  }

  /**
   * @returns a one dimensional array of Clusters
   */
  get clusters(): Cluster[] {
    const clusters = makeClusters(this.text);
    const firstCluster = clusters[0];
    const remainder = clusters.slice(1);
    firstCluster.siblings = remainder;
    return clusters;
  }

  /**
   * @returns a one dimensional array of Chars
   */
  get chars(): Char[] {
    return this.clusters.map((cluster) => cluster.chars).reduce((a, c) => a.concat(c), []);
  }

  /**
   * @returns a boolean indicating if the text is a form of the Divine Name
   */
  get isDivineName(): boolean {
    const nonChars = /[\u{0591}-\u{05C7}]/gu;
    const stripped = this.text.replace(nonChars, "");
    return stripped === "יהוה";
  }
}
