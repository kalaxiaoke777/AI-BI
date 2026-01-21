
class Tools {
    // 防抖函数
  static debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
};

export default Tools;

