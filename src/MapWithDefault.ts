export default class MapWithDefault<K, V> extends Map<K, V> {
    constructor(
        entries?: readonly (readonly [K, V])[],
        public defaultValue?: V
    ) {
        super(entries);
    }

    get(key: K): V | undefined {
        if (!this.has(key)) {
            return this.defaultValue;
        }
        return super.get(key);
    }
}
