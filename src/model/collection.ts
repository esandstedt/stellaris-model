export class Collection<T> {
  private map: { [key: string]: T } = {};
  constructor(private array: T[], keyFunc: (item: T) => string) {
    array.forEach(item => {
      const key = keyFunc(item);

      if (this.map[key]) {
        throw new Error(`multiple items with same key "${key}"`);
      }

      this.map[key] = item;
    });
  }

  public get(key: string): T {
    return this.map[key];
  }

  public getAll(): T[] {
    return Array.from(this.array);
  }
}
