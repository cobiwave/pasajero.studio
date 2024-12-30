function getTimelineLabelScroll(timeline: gsap.core.Timeline, label: string): number {
  if (!timeline.scrollTrigger?.trigger) return 0;

  const yStart =
    timeline.scrollTrigger.pin && timeline.scrollTrigger.trigger.parentElement
      ? timeline.scrollTrigger.trigger.parentElement.offsetTop
      : (timeline.scrollTrigger.trigger as HTMLElement).offsetTop;

  const goToProgress = timeline.labels[label] / timeline.duration();

  // const now = timeline.progress()
  // timeline.seek(label)
  // const goToProgress = timeline.progress()
  // timeline.progress(now)

  return Math.round(
    yStart + (timeline.scrollTrigger.end - timeline.scrollTrigger.start) * goToProgress,
  );
}

export default getTimelineLabelScroll;
