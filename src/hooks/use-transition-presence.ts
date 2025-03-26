import type { RefObject } from 'react';
import type { BeforeUnmountCallback } from '@/motion/transition.context';
import type { AnimationPlaybackControls } from 'motion';

import { useContext, useEffect } from 'react';

import { print } from '@/utils/print';

import { useRefValue } from '@/hooks/use-ref-value';

import { TransitionContext } from '@/motion/transition.context';

export function useTransitionPresence(
  animations?: {
    animateIn?: () => AnimationPlaybackControls;
    animateOut?: () => AnimationPlaybackControls;
  },
  animate = true
) {
  useEffect(() => {
    if (!animations || !animate) return;
    const anim = animations.animateIn?.();
    return () => {
      anim?.stop();
    };
  }, [animations, animate]);

  useBeforeUnmount(async (abortSignal) => {
    if (!animations?.animateOut || !animate) return;
    const anim = animations.animateOut();
    abortSignal.addEventListener('abort', () => {
      anim.stop();
    });
    return anim;
  });
}

/**
 * Executes async callback to defer unmounting of children in nearest
 * TransitionPresence boundary
 */
export function useBeforeUnmount(callback: BeforeUnmountCallback): void {
  const context = useContext(TransitionContext);
  const callbackRef = useRefValue(callback);

  if (context === undefined) print('transition', 'Component is not rendered in the context of a TransitionPresence');

  useEffect(() => {
    queueMicrotask(() => {
      context?.add(callbackRef);
    });

    return () => {
      context?.delete(callbackRef);
    };
  }, [context, callbackRef]);
}

/**
 * useBeforeUnmount without the warning, this should only be used within the
 * <TransitionPresence> component
 */
export function useTransitionPresenceBeforeUnmount(callback: BeforeUnmountCallback | undefined): void {
  const context = useContext(TransitionContext);
  const callbackRef = useRefValue(callback);

  useEffect(() => {
    if (!callbackRef?.current) return;

    const ref = callbackRef as RefObject<BeforeUnmountCallback>;

    queueMicrotask(() => {
      context?.add(ref);
    });

    return () => {
      context?.delete(ref);
    };
  }, [context, callbackRef]);
}
