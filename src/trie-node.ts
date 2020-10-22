/**
 * @author A
 * @namespace Search
 * @description Trie Node
 */

export class TrieNode {
    public isTarget: boolean;
    public children: Map<string, TrieNode>;

    public constructor() {
        this.isTarget = false;
        this.children = new Map();
    }
}
