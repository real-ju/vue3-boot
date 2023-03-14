import storage from 'store2';

export const storageItem = {
  // 单个设置项
  setItem(key: string, data: any) {
    storage.session.set(key, data);
  },
  // 批量设置项
  setAllItem(data: Record<string, any>) {
    const obj: Record<string, any> = {};
    for (const key in data) {
      obj[key] = data[key];
    }
    storage.session.setAll(data);
  },
  // 获取项
  getItem(key: string) {
    return storage.session.get(key);
  },
  // 获取所有项
  getAllItem() {
    return storage.session.getAll();
  },
  // storage.session.transact(key, fn[, alt]);    // === store(key, fn[, alt]);
  // 清空所有
  clearItem() {
    storage.session.clear();
  },
  // 判断是否存在项，返回true/false
  hasItem(key: string) {
    return storage.session.has(key);
  },
  // 移除项
  removeItem(key: string) {
    storage.session.remove(key);
  },
  // storage.session.each(fn[, fill]);            // === store(fn); optional call arg will be 3rd fn arg (e.g. for gathering values)
  // storage.session.add(key, data[, replacer]);  // concats, merges, or adds new value into existing one
  // storage.session.keys([fillList]);            // returns array of keys
  // storage.session.size();                      // number of keys, not length of data
  // 清空所有项
  clearAllItem() {
    storage.session.clearAll();
  }
};
