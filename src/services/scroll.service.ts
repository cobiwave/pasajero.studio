import { getScrollTop } from '@/utils/basic-functions';

type ScrollListener = (scrollTop: number) => void;

class Service {
  listeners: ScrollListener[] = [];
  lastScroll = -1;

  onScroll = () => {
    const newScroll = this.getScrollY();
    if (newScroll !== this.lastScroll) {
      this.lastScroll = newScroll;
      this.listeners.forEach((listener) => listener(newScroll));
    }
  };

  listen = (listener: ScrollListener) => {
    if (this.listeners.length === 0) {
      window.addEventListener('scroll', this.onScroll);
    }
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
  };

  dismiss = (listener: ScrollListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
    if (this.listeners.length === 0) {
      window.removeEventListener('scroll', this.onScroll);
    }
  };

  getMaxScrollY = () => {
    return document.body.clientHeight - window.innerHeight;
  };

  getScrollY = () => {
    return Math.max(0, Math.min(this.getMaxScrollY(), getScrollTop()));
  };

  freeze = () => {
    document.addEventListener('wheel', this.preventScrollEvent, { passive: false });
    document.addEventListener('touchmove', this.preventScrollEvent, { passive: false });
  };

  unfreeze = () => {
    document.removeEventListener('wheel', this.preventScrollEvent);
    document.removeEventListener('touchmove', this.preventScrollEvent);
  };

  preventScrollEvent = (e: WheelEvent | TouchEvent) => {
    e.preventDefault();
  };
}

const ScrollService = new Service();

export default ScrollService;
