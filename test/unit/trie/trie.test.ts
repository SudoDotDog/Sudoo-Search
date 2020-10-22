/**
 * @author Xiaoluluxian
 * @namespace Search
 * @description Trie Tree
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { TrieTree } from "../../../src";

describe('Given {TrieTree} Class', (): void => {

    const chance: Chance.Chance = new Chance("search-trie-trie");

    it('should be able to init', (): void => {

        const tree: TrieTree = TrieTree.create();

        expect(tree.rootNode).to.be.not.equal(null);
        expect(tree.rootNode.isTarget).to.be.equal(false);
        expect(tree.rootNode.children.size).to.be.equal(0);
    });

    it('should be able to insert and search value', (): void => {

        const tree: TrieTree = TrieTree.create();
        const value1: string = chance.string();
        const value2: string = chance.string();

        tree.insert(value1);
        tree.insert(value2);

        expect(tree.search(value1)).to.be.equal(value1);
        expect(tree.search(value2)).to.be.equal(value2);
    });

    it('should be able to search prefix', (): void => {

        const tree: TrieTree = TrieTree.create();
        const value1: string = chance.string({ length: 10 });
        const value2: string = chance.string({ length: 10 });

        tree.insert(value1);
        tree.insert(value2);

        const result: string[] = tree.getAllPrefixWith(value1.substring(0, 2));
        expect(result[0]).to.be.equal(value1);
    });
});
