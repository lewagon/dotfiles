import { LazyLoadComposableController } from './lazy-load-controller';
export declare const useLazyLoad: (controller: LazyLoadComposableController, options?: IntersectionObserverInit) => readonly [() => void, () => void];
