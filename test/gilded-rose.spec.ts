import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('Sulfuras quality 80', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 0, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
    });

    it('Aged Brie quality increases', function() {
        const startingQuality = 5;
        const gildedRose = new GildedRose([ new Item('Aged Brie', 10, startingQuality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.greaterThan(startingQuality);
    });

    it('Quality never exceeds 50', function() {
        const startingQuality = 50;
        const gildedRose = new GildedRose([
            new Item('Aged Brie', 10, startingQuality),
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, startingQuality)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(startingQuality);
        expect(items[1].quality).to.equal(startingQuality);
    });

    it('Quality never negative', function() {
        const startingQuality = 0;
        const gildedRose = new GildedRose([new Item('foo', 10, startingQuality),]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(startingQuality);
    });

    it('Backstage passes rules', function() {
        const startingQuality = 10;
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, startingQuality),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, startingQuality),
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, startingQuality),
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(startingQuality+2);
        expect(items[1].quality).to.equal(startingQuality+3);
        expect(items[2].quality).to.equal(0);
    });

    it('Expired quality degrades twice as fast', function() {
        const startingQuality = 10;
        const gildedRose = new GildedRose([
            new Item('foo', -1, startingQuality),
            new Item('Aged Brie', -1, startingQuality),
        ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(startingQuality-2);
        expect(items[1].quality).to.equal(startingQuality+2);
    });

});
