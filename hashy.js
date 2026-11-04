export class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  length = 0;
  constructor() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      // if its already here update
      if (this.buckets[index][i][0] == key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }
    // otherwise if we didnt find it yet create it
    this.buckets[index].push([key, value]);
    this.length += 1;

    if (this.length / this.capacity > this.loadFactor) {
      const entries = this.entries();
      this.resize(entries);
    }
  }

  resize(entries) {
    this.capacity = this.capacity * 2;
    this.clear();
    for (const entry of entries) {
      this.set(entry[0], entry[1]);
    }
    console.log("hello");
    console.log(this.entries());
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] == key) {
        return this.buckets[index][i][1];
      }
    }
    return undefined;
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] == key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    }
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] == key) {
        this.buckets[index].splice(i, 1);
        this.length -= 1;
        return true;
      }
    }
  }

  getLength() {
    return this.length;
  }

  clear() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.length = 0;
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        keys.push(this.buckets[i][j][0]);
      }
    }
    return keys;
  }

  values() {
    const vals = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        vals.push(this.buckets[i][j][1]);
      }
    }
    return vals;
  }

  entries() {
    const entries = [];
    for (let i = 0; i < this.capacity; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        entries.push([this.buckets[i][j][0], this.buckets[i][j][1]]);
      }
    }
    return entries;
  }
}
