class Service {
  priority: number = 200;
  priorityMap: Map<string, number> = new Map();

  getPriority = (key: string, prio?: number) => {
    if (this.priorityMap.has(key)) {
      return this.priorityMap.get(key);
    }

    if (prio) {
      this.priorityMap.set(key, prio);

      return prio;
    }

    const priority = this.priority;
    this.priority -= 5;

    this.priorityMap.set(key, priority);

    // this.displayPriorities()
    return priority;
  };

  displayPriorities = () => {
    console.group('Scrolltrigger Priorities');
    this.priorityMap.forEach((value, key) => {
      console.log(` ${key}: ${value}`);
    });
    console.groupEnd();
  };
}

const ScrollPriority = new Service();

export default ScrollPriority;
