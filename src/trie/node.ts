/**
 * @author Xiaoluluxian & WMXPY
 * @namespace Search_Trie
 * @description Node
 */

export class TrieNode {

    public static create(): TrieNode {

        return new TrieNode();
    }

    public isTarget: boolean;
    public children: Map<string, TrieNode>;

    private constructor() {

        this.isTarget = false;
        this.children = new Map<string, TrieNode>();
    }
}
