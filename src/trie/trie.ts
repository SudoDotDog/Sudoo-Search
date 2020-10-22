/**
 * @author Xiaoluluxian & WMXPY
 * @namespace Search_Trie
 * @description Trie
 */

import { TrieNode } from "./node";


export class TrieTree {

    public static create(): TrieTree {

        return new TrieTree();
    }

    private readonly root: TrieNode;

    private constructor() {

        this.root = TrieNode.create();
    }

    public get rootNode(): TrieNode {

        return this.root;
    }

    public insert(word: string): void {

        if (word.length === 0) {
            return;
        }
        this._insertHelper(word, 0, this.root);
    }

    public search(word: string): string | null {

        if (word.length === 0) {
            return null;
        }

        return this._searchHelper(word, 0, this.root);
    }

    public getAllPrefixWith(prefix: string): string[] {

        if (prefix.length === 0) {
            return [];
        }

        const result: string[] = [];
        this._getAllPrefixWithHelper(this._reachPrefixNode(this.root, prefix, 0), result, prefix);
        return result;
    }

    private _getAllPrefixWithHelper(current: TrieNode | null, result: string[], prefix: string) {

        if (current === null) {
            return;
        }

        for (const [key, value] of current.children) {
            if (value.isTarget) {
                result.push(prefix + key);
            }
            this._getAllPrefixWithHelper(value, result, prefix + key);
        }
    }

    private _reachPrefixNode(current: TrieNode, prefix: string, index: number): TrieNode | null {

        if (index === prefix.length) {
            return current;
        }

        const nextNode: TrieNode | undefined = current.children.get(prefix.charAt(index));
        if (!nextNode) {
            return null;
        } else {
            return this._reachPrefixNode(nextNode, prefix, index + 1);
        }
    }

    private _insertHelper(word: string, index: number, current: TrieNode): void {

        if (index >= word.length) {
            current.isTarget = true;
            return;
        }

        const nextNode: TrieNode | undefined = current.children.get(word.charAt(index));
        if (!nextNode) {

            const created: TrieNode = TrieNode.create();
            current.children.set(word.charAt(index), created);
            this._insertHelper(word, index + 1, created);
        } else {
            this._insertHelper(word, index + 1, nextNode);
        }
    }

    private _searchHelper(word: string, index: number, current: TrieNode): string | null {

        if (index >= word.length) {
            return current.isTarget ? word : null;
        }

        const nextNode: TrieNode | undefined = current.children.get(word.charAt(index));
        if (!nextNode) {
            return null;
        } else {
            return this._searchHelper(word, index + 1, nextNode);
        }
    }
}
