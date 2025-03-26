import type { RefObject } from 'react';

import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type BeforeUnmountCallback = (abortSignal: AbortSignal) => PromiseLike<unknown> | void;

export type TransitionContextType = Set<RefObject<BeforeUnmountCallback>> | undefined;

export const TransitionContext = createContext<TransitionContextType>(undefined);
