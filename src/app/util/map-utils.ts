export class MapUtils {

  public static groupBy<K, V>(array: V[], grouper: (item: V) => K): Map<K, V[]> {
    return array.reduce((store, item) => {
      const key = grouper(item);
      if (!store.has(key)) {
        store.set(key, [item]);
      } else {
        store.get(key).push(item);
      }
      return store;
    }, new Map<K, V[]>());
  }
}


