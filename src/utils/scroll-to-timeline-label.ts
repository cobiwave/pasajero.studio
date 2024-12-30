import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import SmoothScrollService from '@/services/smooth-scroll';

import getTimelineLabelScroll from '@/utils/get-timeline-label-scroll';
import { print } from '@/utils/print';

import { getScrollTop } from './basic-functions';
import { device } from './detect';
import parseQueryString from './parse-query-string';

let userTriggeredScrolling = false;
let unfreezeTimeout: NodeJS.Timeout;
let completeTimeout: NodeJS.Timeout;

const { snapduration, snapease } = parseQueryString();

const d = +(snapduration || 2.4);
const e = snapease ? `${snapease}` : 'ease02';

function scrollToTimelineLabel(
  timeline: gsap.core.Timeline | string,
  label: string,
  duration = d,
  ease = e,
  userTriggered = false,
) {
  if (userTriggeredScrolling && !userTriggered) return;

  const tl =
    typeof timeline === 'string'
      ? (ScrollTrigger.getById(timeline)?.animation as gsap.core.Timeline)
      : timeline;

  if (!tl?.scrollTrigger?.trigger) return;
  if (!device.touch && !SmoothScrollService.moving && !userTriggered) return;

  const y = getTimelineLabelScroll(tl, label);
  if (y === getScrollTop()) return;

  print(
    'scrolling',
    `y: ${y}, duration: ${duration}, ease: ${ease} ${userTriggered ? '(user triggered)' : '(timeline triggered)'}`,
  );

  SmoothScrollService.freeze();

  if (device.mobile) {
    // kill scroll momentum on mobile devices
    ScrollTrigger.normalizeScroll(true);
    setTimeout(() => {
      ScrollTrigger.normalizeScroll(false);
    }, 100);
  } else {
    clearTimeout(unfreezeTimeout);
    unfreezeTimeout = setTimeout(() => {
      SmoothScrollService.unfreeze();
    }, 1500);
  }

  userTriggeredScrolling = userTriggered;

  clearTimeout(completeTimeout);
  completeTimeout = setTimeout(() => {
    clearTimeout(unfreezeTimeout);
    SmoothScrollService.unfreeze();
    userTriggeredScrolling = false;
  }, duration * 950);

  gsap.to(window, {
    overwrite: true,
    scrollTo: { autoKill: !device.mobile, y },
    duration,
    ease,
  });
}

export default scrollToTimelineLabel;
