/**
 * @typedef {Object} WorkerPoolOptions
 * @property {number | 'max'} [minWorkers]
 * @property {number} [maxWorkers]
 * @property {number} [maxQueueSize]
 * @property {'auto' | 'web' | 'process' | 'thread'} [workerType]
 * @property {*} [forkArgs]
 * @property {*} [forkOpts]
 * @property {number} [debugPortStart]
 */

/**
 * @typedef {Object} ExecOptions
 * @property {(payload: any) => unknown} [on]
 */
