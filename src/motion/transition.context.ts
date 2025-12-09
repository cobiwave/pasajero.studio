import type { RefObject } from 'react';

import { createContext } from 'react';

export type BeforeUnmountCallback = (abortSignal: AbortSignal) => PromiseLike<unknown> | void;

export type TransitionContextType = Set<RefObject<BeforeUnmountCallback>> | undefined;

export const TransitionContext = createContext<TransitionContextType>(undefined);
