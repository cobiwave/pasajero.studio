import { LockBodyScrollService } from '@/services/lock-body-scroll';
import { RafService } from '@/services/raf';
import ScrollService from '@/services/scroll';

import { browser, device, os } from '@/utils/detect';
import parseQueryString from '@/utils/parse-query-string';
import { isDevEnv } from '@/utils/runtime-env';

let baseSpeed = 100;
let baseSmooth = 5;
if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
  const { scrollspeed, scrollsmooth } = parseQueryString();
  if (scrollspeed && !isNaN(+scrollspeed)) baseSpeed = Math.abs(+scrollspeed);
  if (scrollsmooth && !isNaN(+scrollsmooth)) baseSmooth = Math.abs(+scrollsmooth);
}

type ScrollListener = (scrollTop: number) => void;

class Service {
  speed = baseSpeed;
  smooth = baseSmooth;
  document!: HTMLElement;
  target!: HTMLElement;
  frame!: HTMLElement;
  moving = false;
  frozen = false;
  targetScroll = 0;
  currentScroll = 0;
  lastScrollTop = 0;
  eventType!: 'wheel';
  listeners: ScrollListener[] = [];

  constructor() {
    // The best combination if you prefer spinX + spinY normalization.  It favors
    // the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
    // 'wheel' event, making spin speed determination impossible.
    this.eventType = (browser.firefox ? 'DOMMouseScroll' : 'wheel') as 'wheel';
    if (typeof window !== 'undefined' && isDevEnv()) {
      const win = window as unknown as { smoothScrollSservice: Service };
      win.smoothScrollSservice = this;
    }
  }

  destroy = () => {
    this.stop();
    window.removeEventListener('scroll', this.onScroll);
    this.target.removeEventListener(this.eventType, this.onWheel);
    this.document.removeEventListener(this.eventType, this.preventWheel);
  };

  setTarget = (target: HTMLElement | Document) => {
    if (device.mobile) {
      if (target === document) {
        LockBodyScrollService.unlock(true);
      } else {
        LockBodyScrollService.lock();
      }
    } else {
      const { defaultscroll } = parseQueryString();
      if (defaultscroll) return;

      if (this.target) this.destroy();

      this.document = (document.scrollingElement ||
        document.documentElement ||
        document.body.parentNode ||
        document.body) as HTMLElement;

      this.target = (target === document ? this.document : target) as HTMLElement;

      this.targetScroll = this.target.scrollTop;
      this.currentScroll = this.target.scrollTop;
      this.frame =
        this.target === document.body && document.documentElement
          ? document.documentElement
          : this.target; // safari is the new IE

      if (os.mac) this.speed = baseSpeed / 2; // If scroll inconsistencies appear, remove this line

      window.addEventListener('scroll', this.onScroll, { passive: false });

      if (target !== document) {
        this.document.addEventListener(this.eventType, this.preventWheel, { passive: false });
      }

      this.target.addEventListener(this.eventType, this.onWheel, { passive: false });

      this.resetCalculation();
    }
  };

  resetCalculation = () => {
    this.targetScroll = this.target.scrollTop;
    this.currentScroll = this.target.scrollTop;
    this.update();
  };

  onScroll = () => {
    if (!this.moving) {
      this.targetScroll = this.target.scrollTop;
      this.currentScroll = this.target.scrollTop;
    }

    requestAnimationFrame(() => {
      this.listeners.forEach((listener) => listener(this.target.scrollTop));
    });
  };

  preventWheel = (e: WheelEvent) => {
    e.preventDefault();
  };

  onWheel = (e: WheelEvent) => {
    this.preventWheel(e);
    if (this.frozen) return;

    const delta = this.normalizeWheelDelta(e);
    this.targetScroll += -delta * this.speed;

    const max = this.target.scrollHeight - this.frame.clientHeight;

    if (this.targetScroll < 0) this.targetScroll = 0;
    if (this.targetScroll > max) this.targetScroll = max;
    if (!this.moving) this.start();
  };

  normalizeWheelDelta = (event: WheelEvent) => {
    const e = event as WheelEvent & { wheelDelta: number };
    if (e.detail) {
      if (e.wheelDelta) {
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1); // Opera
      }
      return -e.detail / 3; // Firefox
    }
    if (e.wheelDelta) {
      return e.wheelDelta / 120; // IE, Safari, Chrome
    }
    return -e.deltaY / 120; // Dropped support to wheelDelta
  };

  getMaxScrollY = () => {
    return ScrollService.getMaxScrollY();
  };

  getScrollY = () => {
    return ScrollService.getScrollY();
  };

  start = () => {
    if (!this.frozen) {
      this.moving = true;
      RafService.listen(this.update);
    }
  };

  stop = () => {
    this.moving = false;
    RafService.dismiss(this.update);
  };

  freeze = () => {
    this.frozen = true;
    this.stop();
    if (device.mobile) ScrollService.freeze();
    this.currentScroll = this.lastScrollTop = this.targetScroll = Math.round(this.currentScroll);
  };

  unfreeze = () => {
    this.frozen = false;
    if (device.mobile) ScrollService.unfreeze();
  };

  listen = (listener: ScrollListener) => {
    if (device.mobile) {
      ScrollService.listen(listener);
    } else if (!this.listeners.includes(listener)) this.listeners.push(listener);
  };

  dismiss = (listener: ScrollListener) => {
    if (device.mobile) {
      ScrollService.dismiss(listener);
    } else {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  };

  refresh = () => {
    if (!this.target) return;
    SmoothScrollService.lastScrollTop += 0.1;
    SmoothScrollService.update();
  };

  update = () => {
    if (!this.target) return;
    const delta = (this.targetScroll - this.currentScroll) / this.smooth;
    this.currentScroll += delta;
    const scrollTop = Math.round(this.currentScroll);
    if (scrollTop !== this.lastScrollTop) {
      this.target.scrollTop = Math.round(this.currentScroll);
      this.lastScrollTop = scrollTop;
    }
    if (Math.abs(delta) < 0.05) this.stop();
  };
}

const SmoothScrollService = new Service();

export default SmoothScrollService;
