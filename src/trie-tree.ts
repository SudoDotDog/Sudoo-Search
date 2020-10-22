/**
 * @author A
 * @namespace Search
 * @description Trie Tree
 */

import { TrieNode } from "./trie-node";


export class TrieTree {
    private root: TrieNode;

    public constructor() {
        this.root = new TrieNode();
    }

    public get rootNode(): TrieNode {
        return this.root;
    }
    public insert(word: string): void {
        if (word.length === 0) {
            return;
        }
        this.insertHelper(word, 0, this.root);
    }
    public search(word: string): string | null {
        if (word.length === 0) {
            return null;
        }
        return this.searchHelper(word, 0, this.root);
    }

    public getAllPrefixWith(prefix: string): string[] {
        if (prefix.length === 0) {
            return [];
        }
        const result: string[] = [];
        this.getAllPrefixWithHelper(this.reachPrefixNode(this.root, prefix, 0), result, prefix);
        return result;
    }

    private getAllPrefixWithHelper(current: TrieNode | null, result: string[], prefix: string) {
        if (current === null) {
            return;
        }
        for (const [key, value] of current.children) {
            if (value.isTarget) {
                result.push(prefix + key);
            }
            this.getAllPrefixWithHelper(value, result, prefix + key);
        }
    }

    private reachPrefixNode(current: TrieNode, prefix: string, index: number): TrieNode | null {
        if (index === prefix.length) {
            return current;
        }
        const nextNode: TrieNode | undefined = current.children.get(prefix.charAt(index));
        if (!nextNode) {
            return null;
        } else {
            return this.reachPrefixNode(nextNode, prefix, index + 1);
        }
    }
    private insertHelper(word: string, index: number, current: TrieNode): void {
        if (index >= word.length) {
            current.isTarget = true;
            return;
        }
        const nextNode: TrieNode | undefined = current.children.get(word.charAt(index));
        if (!nextNode) {
            const created: TrieNode = new TrieNode();
            current.children.set(word.charAt(index), created);
            this.insertHelper(word, index + 1, created);
        } else {
            this.insertHelper(word, index + 1, nextNode);
        }
    }

    private searchHelper(word: string, index: number, current: TrieNode): string | null {
        if (index >= word.length) {
            return current.isTarget ? word : null;
        }
        const nextNode: TrieNode | undefined = current.children.get(word.charAt(index));
        if (!nextNode) {
            return null;
        } else {
            return this.searchHelper(word, index + 1, nextNode);
        }
    }
}
