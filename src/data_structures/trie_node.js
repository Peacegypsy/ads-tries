class TrieNode {
  constructor() {
    this.words = [];
    this.children = {};
  }

  insert(word, code, index = 0) {
    if (index === code.length) {
      if (this.words.includes(word)) {
        return false;
      }

      this.words.push(word);
      return true;
    }

    const radix = code[index];
    let child = this.children[radix];
    if (!child) {
      child = new TrieNode();
      this.children[radix] = child;
    }
    return child.insert(word, code, index + 1);
  }

  lookup(code, index = 0) {
    if (index === code.length) {
      return this;
    }

    const radix = code[index];
    let child = this.children[radix];
    if (child) {
      return child.lookup(code, index + 1);
    } else {
      return null;
    }
  }

  gatherWords(words = []) {
    words.push(...this.words);
    Object.values(this.children).forEach(child => {
      child.gatherWords(words);
    });
    return words;
  }
}

export default TrieNode;