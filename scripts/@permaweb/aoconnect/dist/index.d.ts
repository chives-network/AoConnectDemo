/**
 * A function that builds a signer using a wallet jwk interface
 * commonly used in node-based dApps
 *
 * This is provided as a convenience for consumers of the SDK
 * to use, but consumers can also implement their own signer
 */
export const createDataItemSigner: typeof WalletClient.createDataItemSigner;
export const result: import("./lib/result/index.js").ReadResult;
export const results: import("./lib/results/index.js").ReadResults;
export const message: import("./lib/message/index.js").SendMessage;
export const spawn: import("./lib/spawn/index.js").SpawnProcess;
export const monitor: import("./lib/monitor/index.js").SendMonitor;
export const unmonitor: import("./lib/unmonitor/index.js").SendMonitor;
export const dryrun: import("./lib/dryrun/index.js").DryRun;
export const assign: import("./lib/assign/index.js").Assign;
import { connect } from './index.common.js';
import { WalletClient } from './client/node/index.js';
export { connect };
