import { cacheClient } from "@/cache";

describe("CacheClient", () => {
  beforeEach(() => {
    cacheClient.clearAll();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should store and retrieve a value before expiration", () => {
    cacheClient.set("key1", "value1", 5000);

    const result = cacheClient.get<string>("key1");
    expect(result).toBe("value1");
  });

  it("should return null if the key is not found", () => {
    const result = cacheClient.get<string>("nonexistent");
    expect(result).toBeNull();
  });

  it("should return null if the value has expired", () => {
    cacheClient.set("key2", "value2", 1000);

    jest.advanceTimersByTime(1500);

    const result = cacheClient.get<string>("key2");
    expect(result).toBeNull();
  });

  it("should remove a specific key from the cache", () => {
    cacheClient.set("key3", "value3");
    cacheClient.clear("key3");

    const result = cacheClient.get<string>("key3");
    expect(result).toBeNull();
  });

  it("should clear all keys from the cache", () => {
    cacheClient.set("keyA", "valueA");
    cacheClient.set("keyB", "valueB");

    cacheClient.clearAll();

    expect(cacheClient.get<string>("keyA")).toBeNull();
    expect(cacheClient.get<string>("keyB")).toBeNull();
  });
});
