import {MapUtils} from "../../app/util/map-utils";

describe('map-utils', () => {
    it('should return Map K, V[] by given array and grouper func', () => {
        const item = {
            id: 1,
        }
        const array = [item];
        const result = [item];
        const actualResult = MapUtils.groupBy(array, item => item.id);
        expect(actualResult.get(1)).toStrictEqual(result);
    })
})