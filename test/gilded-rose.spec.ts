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

});

