/**
 * A combined array and lookup table.
 */
export class Collection<T> {
  private map: { [key: string]: T } = {};

  /**
   * @ignore
   */
  constructor(private array: T[], keyFunc: (item: T) => string) {
    array.forEach(item => {
      const key = keyFunc(item);

      if (this.map[key]) {
        throw new Error(`multiple items with same key "${key}"`);
      }

      this.map[key] = item;
    });
  }

  /**
   * Returns the entry with given key.
   * Returns undefined if no entry was found with the given key.
   */
  public get(key: string): T | undefined {
    return this.map[key];
  }

  /**
   * Return the entire collection's entries as an array.
   */
  public getAll(): T[] {
    return Array.from(this.array);
  }
}
