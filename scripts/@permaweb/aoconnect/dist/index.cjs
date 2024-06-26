var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  assign: () => assign,
  connect: () => connect,
  createDataItemSigner: () => createDataItemSigner2,
  dryrun: () => dryrun,
  message: () => message,
  monitor: () => monitor,
  result: () => result,
  results: () => results,
  spawn: () => spawn,
  unmonitor: () => unmonitor
});
module.exports = __toCommonJS(src_exports);

// src/index.common.js
var import_ao_scheduler_utils = require("@permaweb/ao-scheduler-utils");

// node_modules/hyper-async/dist/index.js
var Async = (fork) => ({
  fork,
  toPromise: () => new Promise((resolve, reject2) => fork(reject2, resolve)),
  map: (fn) => Async((rej, res) => fork(rej, (x) => res(fn(x)))),
  bimap: (f, g) => Async(
    (rej, res) => fork(
      (x) => rej(f(x)),
      (x) => res(g(x))
    )
  ),
  chain: (fn) => Async((rej, res) => fork(rej, (x) => fn(x).fork(rej, res))),
  bichain: (f, g) => Async(
    (rej, res) => fork(
      (x) => f(x).fork(rej, res),
      (x) => g(x).fork(rej, res)
    )
  ),
  fold: (f, g) => Async(
    (rej, res) => fork(
      (x) => f(x).fork(rej, res),
      (x) => g(x).fork(rej, res)
    )
  )
});
var of = (x) => Async((rej, res) => res(x));
var Resolved = (x) => Async((rej, res) => res(x));
var Rejected = (x) => Async((rej, res) => rej(x));
var fromPromise = (f) => (...args) => Async(
  (rej, res) => f(...args).then(res).catch(rej)
);

// src/client/ao-mu.js
function deployMessageWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployMessage");
  return (args) => {
    return of(args).chain(
      fromPromise(({ processId, data, tags, anchor, signer }) => (
        /**
         * The processId is the target set on the data item
         * See https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw
         */
        signer({ data, tags, target: processId, anchor })
      ))
    ).chain(
      (signedDataItem) => of(signedDataItem).chain(fromPromise(
        async (signedDataItem2) => fetch2(
          MU_URL2,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
              Accept: "application/json"
            },
            redirect: "follow",
            body: signedDataItem2.raw
          }
        )
      )).bichain(
        (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
        fromPromise(
          async (res) => {
            if (res.ok)
              return res.json();
            throw new Error(`${res.status}: ${await res.text()}`);
          }
        )
      ).bimap(
        logger.tap("Error encountered when writing message via MU"),
        logger.tap("Successfully wrote message via MU")
      ).map((res) => ({ res, messageId: signedDataItem.id }))
    ).toPromise();
  };
}
function deployProcessWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployProcess");
  return (args) => {
    return of(args).chain(fromPromise(({ data, tags, signer }) => signer({ data, tags }))).chain(
      (signedDataItem) => of(signedDataItem).chain(fromPromise(
        async (signedDataItem2) => fetch2(
          MU_URL2,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
              Accept: "application/json"
            },
            redirect: "follow",
            body: signedDataItem2.raw
          }
        )
      )).bichain(
        (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
        fromPromise(
          async (res) => {
            if (res.ok)
              return res.json();
            throw new Error(`${res.status}: ${await res.text()}`);
          }
        )
      ).bimap(
        logger.tap("Error encountered when deploying process via MU"),
        logger.tap("Successfully deployed process via MU")
      ).map((res) => ({ res, processId: signedDataItem.id }))
    ).toPromise();
  };
}
function deployMonitorWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployMonitor");
  return (args) => of(args).chain(
    fromPromise(({ processId, data, tags, anchor, signer }) => (
      /**
       * The processId is the target set on the data item
       */
      signer({ data, tags, target: processId, anchor })
    ))
  ).chain(
    (signedDataItem) => of(signedDataItem).chain(fromPromise(
      async (signedDataItem2) => fetch2(
        MU_URL2 + "/monitor/" + args.processId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            Accept: "application/json"
          },
          redirect: "follow",
          body: signedDataItem2.raw
        }
      )
    )).bichain(
      (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
      fromPromise(
        async (res) => {
          if (res.ok)
            return { ok: true };
          throw new Error(`${res.status}: ${await res.text()}`);
        }
      )
    ).bimap(
      logger.tap("Error encountered when subscribing to process via MU"),
      logger.tap("Successfully subscribed to process via MU")
    ).map((res) => ({ res, messageId: signedDataItem.id }))
  ).toPromise();
}
function deployUnmonitorWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployUnmonitor");
  return (args) => of(args).chain(
    fromPromise(({ processId, data, tags, anchor, signer }) => (
      /**
       * The processId is the target set on the data item
       */
      signer({ data, tags, target: processId, anchor })
    ))
  ).chain(
    (signedDataItem) => of(signedDataItem).chain(fromPromise(
      async (signedDataItem2) => fetch2(
        MU_URL2 + "/monitor/" + args.processId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/octet-stream",
            Accept: "application/json"
          },
          redirect: "follow",
          body: signedDataItem2.raw
        }
      )
    )).bichain(
      (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
      fromPromise(
        async (res) => {
          if (res.ok)
            return { ok: true };
          throw new Error(`${res.status}: ${await res.text()}`);
        }
      )
    ).bimap(
      logger.tap("Error encountered when unsubscribing to process via MU"),
      logger.tap("Successfully unsubscribed to process via MU")
    ).map((res) => ({ res, messageId: signedDataItem.id }))
  ).toPromise();
}
function deployAssignWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployAssign");
  return (args) => {
    return of(args).chain(fromPromise(
      async ({ process: process2, message: message2, baseLayer, exclude }) => fetch2(
        `${MU_URL2}?process-id=${process2}&assign=${message2}${baseLayer ? "&base-layer" : ""}${exclude ? "&exclude=" + exclude.join(",") : ""}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            Accept: "application/json"
          }
        }
      )
    )).bichain(
      (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
      fromPromise(
        async (res) => {
          if (res.ok)
            return res.json();
          throw new Error(`${res.status}: ${await res.text()}`);
        }
      )
    ).bimap(
      logger.tap("Error encountered when writing assignment via MU"),
      logger.tap("Successfully wrote assignment via MU")
    ).map((res) => ({ res, assignmentId: res.id })).toPromise();
  };
}

// src/client/ao-cu.js
function dryrunFetchWith({ fetch: fetch2, CU_URL: CU_URL2, logger }) {
  return (msg) => of(msg).map(logger.tap("posting dryrun request to CU")).chain(fromPromise((msg2) => fetch2(`${CU_URL2}/dry-run?process-id=${msg2.Target}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    body: JSON.stringify(msg2)
  }).then((res) => res.json()))).toPromise();
}
function loadResultWith({ fetch: fetch2, CU_URL: CU_URL2, logger }) {
  return ({ id, processId }) => {
    return of(`${CU_URL2}/result/${id}?process-id=${processId}`).map(logger.tap("fetching message result from CU")).chain(fromPromise(
      async (url) => fetch2(url, {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        redirect: "follow"
      }).then((res) => res.json())
    )).toPromise();
  };
}
function queryResultsWith({ fetch: fetch2, CU_URL: CU_URL2, logger }) {
  return ({ process: process2, from, to, sort, limit }) => {
    const target = new URL(`${CU_URL2}/results/${process2}`);
    const params = new URLSearchParams(target.search);
    if (from) {
      params.append("from", from);
    }
    if (to) {
      params.append("to", to);
    }
    if (sort) {
      params.append("sort", sort);
    }
    if (limit) {
      params.append("limit", limit);
    }
    target.search = params;
    return of(target.toString()).map(logger.tap("fetching message result from CU")).chain(fromPromise(
      async (url) => fetch2(url, {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        redirect: "follow"
      }).then((res) => res.json())
    )).toPromise();
  };
}

// src/client/ao-su.js
var import_lru_map = __toESM(require("mnemonist/lru-map.js"), 1);
var processMetaCache;
var createProcessMetaCache = ({ MAX_SIZE }) => {
  if (processMetaCache)
    return processMetaCache;
  processMetaCache = new import_lru_map.default(MAX_SIZE);
  return processMetaCache;
};
var loadProcessMetaWith = ({ logger, fetch: fetch2, cache = processMetaCache }) => {
  return async ({ suUrl, processId }) => {
    if (cache.has(processId))
      return cache.get(processId);
    return fetch2(`${suUrl}/processes/${processId}`, { method: "GET", redirect: "follow" }).then(async (res) => {
      if (res.ok)
        return res.json();
      logger("Error Encountered when fetching process meta from SU '%s' for process '%s'", suUrl, processId);
      throw new Error(`Encountered Error fetching scheduled messages from Scheduler Unit: ${res.status}: ${await res.text()}`);
    }).then((meta) => {
      logger("Caching process meta for process '%s'", processId);
      cache.set(processId, { tags: meta.tags });
      return meta;
    });
  };
};

// src/client/gateway.js
var import_ramda = require("ramda");
var import_zod = require("zod");
function loadTransactionMetaWith({ fetch: fetch2, GRAPHQL_URL: GRAPHQL_URL2, logger }) {
  const GET_TRANSACTIONS_QUERY = `
    query GetTransactions ($transactionIds: [ID!]!) {
      transactions(ids: $transactionIds) {
        edges {
          node {
            owner {
              address
            }
            tags {
              name
              value
            }
            block {
              id
              height
              timestamp
            }
          }
        }
      }
    }`;
  const transactionConnectionSchema = import_zod.z.object({
    data: import_zod.z.object({
      transactions: import_zod.z.object({
        edges: import_zod.z.array(import_zod.z.object({
          node: import_zod.z.record(import_zod.z.any())
        }))
      })
    })
  });
  return (id) => of(id).chain(fromPromise(
    (id2) => fetch2(GRAPHQL_URL2, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_TRANSACTIONS_QUERY,
        variables: { transactionIds: [id2] }
      })
    }).then(async (res) => {
      if (res.ok)
        return res.json();
      logger('Error Encountered when querying gateway for transaction "%s"', id2);
      throw new Error(`${res.status}: ${await res.text()}`);
    }).then(transactionConnectionSchema.parse).then((0, import_ramda.path)(["data", "transactions", "edges", "0", "node"]))
  )).toPromise();
}

// src/logger.js
var import_debug = __toESM(require("debug"), 1);
var import_ramda2 = require("ramda");
var createLogger = (name = "@permaweb/aoconnect") => {
  const logger = (0, import_debug.default)(name);
  logger.child = (name2) => createLogger(`${logger.namespace}:${name2}`);
  logger.tap = (note, ...rest) => (0, import_ramda2.tap)((...args) => logger(note, ...rest, ...args));
  return logger;
};

// src/lib/result/index.js
var import_ramda4 = require("ramda");

// src/lib/utils.js
var import_ramda3 = require("ramda");
var import_zod2 = require("zod");
var joinUrl = ({ url, path: path2 }) => {
  if (!path2)
    return url;
  if (path2.startsWith("/"))
    return joinUrl({ url, path: path2.slice(1) });
  url = new URL(url);
  url.pathname += path2;
  return url.toString();
};
function parseTags(rawTags) {
  return (0, import_ramda3.pipe)(
    (0, import_ramda3.defaultTo)([]),
    (0, import_ramda3.reduce)(
      (map2, tag) => (0, import_ramda3.pipe)(
        // [value, value, ...] || []
        (0, import_ramda3.propOr)([], tag.name),
        // [value]
        (0, import_ramda3.append)(tag.value),
        // { [name]: [value, value, ...] }
        (0, import_ramda3.assoc)(tag.name, import_ramda3.__, map2)
      )(map2),
      {}
    ),
    /**
    * If the field is only a singly list, then extract the one value.
    *
    * Otherwise, keep the value as a list.
    */
    (0, import_ramda3.map)((values) => values.length > 1 ? values : values[0])
  )(rawTags);
}
function removeTagsByNameMaybeValue(name, value) {
  return (tags) => (0, import_ramda3.reject)(
    (0, import_ramda3.allPass)([
      (0, import_ramda3.propEq)(name, "name"),
      (0, import_ramda3.ifElse)(
        (0, import_ramda3.always)(value),
        (0, import_ramda3.propEq)(value, "value"),
        import_ramda3.T
      )
    ]),
    tags
  );
}
function eqOrIncludes(val) {
  return (0, import_ramda3.cond)([
    [(0, import_ramda3.is)(String), (0, import_ramda3.equals)(val)],
    [(0, import_ramda3.is)(Array), (0, import_ramda3.includes)(val)],
    [import_ramda3.T, import_ramda3.F]
  ]);
}
function errFrom(err) {
  let e;
  if ((0, import_ramda3.is)(import_zod2.ZodError, err)) {
    e = new Error(mapZodErr(err));
    e.stack += err.stack;
  } else if ((0, import_ramda3.is)(Error, err)) {
    e = err;
  } else if ((0, import_ramda3.has)("message", err)) {
    e = new Error(err.message);
  } else if ((0, import_ramda3.is)(String, err)) {
    e = new Error(err);
  } else {
    e = new Error("An error occurred");
  }
  return e;
}
function mapZodErr(zodErr) {
  return (0, import_ramda3.pipe)(
    (zodErr2) => (
      /**
       * Take a ZodError and flatten it's issues into a single depth array
       */
      function gatherZodIssues(zodErr3, status, contextCode) {
        return (0, import_ramda3.reduce)(
          (issues, issue) => (0, import_ramda3.pipe)(
            (0, import_ramda3.cond)([
              /**
               * These issue codes indicate nested ZodErrors, so we resursively gather those
               * See https://github.com/colinhacks/zod/blob/HEAD/ERROR_HANDLING.md#zodissuecode
               */
              [
                (0, import_ramda3.equals)(import_zod2.ZodIssueCode.invalid_arguments),
                () => gatherZodIssues(issue.argumentsError, 422, "Invalid Arguments")
              ],
              [
                (0, import_ramda3.equals)(import_zod2.ZodIssueCode.invalid_return_type),
                () => gatherZodIssues(issue.returnTypeError, 500, "Invalid Return")
              ],
              [
                (0, import_ramda3.equals)(import_zod2.ZodIssueCode.invalid_union),
                // An array of ZodErrors, so map over and flatten them all
                () => (0, import_ramda3.chain)((i) => gatherZodIssues(i, 400, "Invalid Union"), issue.unionErrors)
              ],
              [import_ramda3.T, () => [{ ...issue, status, contextCode }]]
            ]),
            (0, import_ramda3.concat)(issues)
          )(issue.code),
          [],
          zodErr3.issues
        );
      }(zodErr2, 400, "")
    ),
    /**
     * combine all zod issues into a list of { message, status }
     * summaries of each issue
     */
    (zodIssues) => (0, import_ramda3.reduce)(
      (acc, zodIssue) => {
        const { message: message2, path: _path, contextCode: _contextCode } = zodIssue;
        const path2 = _path[1] || _path[0];
        const contextCode = _contextCode ? `${_contextCode} ` : "";
        acc.push(`${contextCode}'${path2}': ${message2}.`);
        return acc;
      },
      [],
      zodIssues
    ),
    (0, import_ramda3.join)(" | ")
  )(zodErr);
}

// src/lib/result/verify-input.js
var import_zod3 = require("zod");
var inputSchema = import_zod3.z.object({
  id: import_zod3.z.string().min(1, { message: "message is required to be a message id" }),
  processId: import_zod3.z.string().min(1, { message: "process is required to be a process id" })
});
function verifyInputWith() {
  return (ctx) => {
    return of(ctx).map(inputSchema.parse).map(() => ctx);
  };
}

// src/dal.js
var import_zod4 = require("zod");
var tagSchema = import_zod4.z.object({
  name: import_zod4.z.string(),
  value: import_zod4.z.string()
});
var dryrunResultSchema = import_zod4.z.function().args(import_zod4.z.object({
  Id: import_zod4.z.string(),
  Target: import_zod4.z.string(),
  Owner: import_zod4.z.string(),
  Anchor: import_zod4.z.string().optional(),
  Data: import_zod4.z.any().default("1234"),
  Tags: import_zod4.z.array(import_zod4.z.object({ name: import_zod4.z.string(), value: import_zod4.z.string() }))
})).returns(import_zod4.z.promise(import_zod4.z.any()));
var loadResultSchema = import_zod4.z.function().args(import_zod4.z.object({
  id: import_zod4.z.string().min(1, { message: "message id is required" }),
  processId: import_zod4.z.string().min(1, { message: "process id is required" })
})).returns(import_zod4.z.promise(import_zod4.z.any()));
var queryResultsSchema = import_zod4.z.function().args(import_zod4.z.object({
  process: import_zod4.z.string().min(1, { message: "process id is required" }),
  from: import_zod4.z.string().optional(),
  to: import_zod4.z.string().optional(),
  sort: import_zod4.z.enum(["ASC", "DESC"]).default("ASC"),
  limit: import_zod4.z.number().optional()
})).returns(import_zod4.z.promise(import_zod4.z.object({
  edges: import_zod4.z.array(import_zod4.z.object({
    cursor: import_zod4.z.string(),
    node: import_zod4.z.object({
      Output: import_zod4.z.any().optional(),
      Messages: import_zod4.z.array(import_zod4.z.any()).optional(),
      Spawns: import_zod4.z.array(import_zod4.z.any()).optional(),
      Error: import_zod4.z.any().optional()
    })
  }))
})));
var deployMessageSchema = import_zod4.z.function().args(import_zod4.z.object({
  processId: import_zod4.z.string(),
  data: import_zod4.z.any(),
  tags: import_zod4.z.array(tagSchema),
  anchor: import_zod4.z.string().optional(),
  signer: import_zod4.z.any()
})).returns(import_zod4.z.promise(
  import_zod4.z.object({
    messageId: import_zod4.z.string()
  }).passthrough()
));
var deployProcessSchema = import_zod4.z.function().args(import_zod4.z.object({
  data: import_zod4.z.any(),
  tags: import_zod4.z.array(tagSchema),
  signer: import_zod4.z.any()
})).returns(import_zod4.z.promise(
  import_zod4.z.object({
    processId: import_zod4.z.string()
  }).passthrough()
));
var deployAssignSchema = import_zod4.z.function().args(import_zod4.z.object({
  process: import_zod4.z.string(),
  message: import_zod4.z.string(),
  baseLayer: import_zod4.z.boolean().optional(),
  exclude: import_zod4.z.array(import_zod4.z.string()).optional()
})).returns(import_zod4.z.promise(
  import_zod4.z.object({
    assignmentId: import_zod4.z.string()
  }).passthrough()
));
var deployMonitorSchema = deployMessageSchema;
var loadProcessMetaSchema = import_zod4.z.function().args(import_zod4.z.object({
  suUrl: import_zod4.z.string().url(),
  processId: import_zod4.z.string()
})).returns(import_zod4.z.promise(
  import_zod4.z.object({
    tags: import_zod4.z.array(tagSchema)
  }).passthrough()
));
var locateSchedulerSchema = import_zod4.z.function().args(import_zod4.z.string()).returns(import_zod4.z.promise(
  import_zod4.z.object({
    url: import_zod4.z.string()
  })
));
var validateSchedulerSchema = import_zod4.z.function().args(import_zod4.z.string()).returns(import_zod4.z.promise(import_zod4.z.boolean()));
var loadTransactionMetaSchema = import_zod4.z.function().args(import_zod4.z.string()).returns(import_zod4.z.promise(
  import_zod4.z.object({
    tags: import_zod4.z.array(tagSchema)
  }).passthrough()
));
var signerSchema = import_zod4.z.function().args(import_zod4.z.object({
  data: import_zod4.z.any(),
  tags: import_zod4.z.array(tagSchema),
  /**
   * target must be set with writeMessage,
   * but not for createProcess
   */
  target: import_zod4.z.string().optional(),
  anchor: import_zod4.z.string().optional()
})).returns(import_zod4.z.promise(
  import_zod4.z.object({
    id: import_zod4.z.string(),
    raw: import_zod4.z.any()
  })
));

// src/lib/result/read.js
function readWith({ loadResult }) {
  loadResult = fromPromise(loadResultSchema.implement(loadResult));
  return (ctx) => {
    return of({ id: ctx.id, processId: ctx.processId }).chain(loadResult);
  };
}

// src/lib/result/index.js
function resultWith(env) {
  const verifyInput = verifyInputWith(env);
  const read = readWith(env);
  return ({ message: message2, process: process2 }) => {
    return of({ id: message2, processId: process2 }).chain(verifyInput).chain(read).map(
      env.logger.tap(
        'readResult result for message "%s": %O',
        message2
      )
    ).map((result2) => result2).bimap(errFrom, import_ramda4.identity).toPromise();
  };
}

// src/lib/message/index.js
var import_ramda6 = require("ramda");

// src/lib/message/upload-message.js
var import_zod5 = require("zod");
var import_ramda5 = require("ramda");
var tagSchema2 = import_zod5.z.array(import_zod5.z.object({
  name: import_zod5.z.string(),
  value: import_zod5.z.string()
}));
function buildTagsWith() {
  return (ctx) => {
    return of(ctx.tags).map((0, import_ramda5.defaultTo)([])).map(removeTagsByNameMaybeValue("Data-Protocol", "ao")).map(removeTagsByNameMaybeValue("Variant")).map(removeTagsByNameMaybeValue("Type")).map(removeTagsByNameMaybeValue("SDK")).map((0, import_ramda5.concat)(import_ramda5.__, [
      { name: "Data-Protocol", value: "ao" },
      { name: "Variant", value: "ao.TN.1" },
      { name: "Type", value: "Message" },
      { name: "SDK", value: "aoconnect" }
    ])).map(tagSchema2.parse).map((0, import_ramda5.assoc)("tags", import_ramda5.__, ctx));
  };
}
function buildDataWith({ logger }) {
  return (ctx) => {
    return of(ctx).chain((0, import_ramda5.ifElse)(
      (0, import_ramda5.always)(ctx.data),
      /**
       * data is provided as input, so do nothing
       */
      () => Resolved(ctx),
      /**
       * Just generate a random value for data
       */
      () => Resolved(Math.random().toString().slice(-4)).map((0, import_ramda5.assoc)("data", import_ramda5.__, ctx)).map(
        (ctx2) => (0, import_ramda5.pipe)(
          (0, import_ramda5.prop)("tags"),
          removeTagsByNameMaybeValue("Content-Type"),
          (0, import_ramda5.append)({ name: "Content-Type", value: "text/plain" }),
          (0, import_ramda5.assoc)("tags", import_ramda5.__, ctx2)
        )(ctx2)
      ).map(logger.tap('added pseudo-random string as message "data"'))
    ));
  };
}
function uploadMessageWith(env) {
  const buildTags = buildTagsWith(env);
  const buildData = buildDataWith(env);
  const deployMessage = deployMessageSchema.implement(env.deployMessage);
  return (ctx) => {
    return of(ctx).chain(buildTags).chain(buildData).chain(fromPromise(
      ({ id, data, tags, anchor, signer }) => deployMessage({ processId: id, data, tags, anchor, signer: signerSchema.implement(signer) })
    )).map((res) => (0, import_ramda5.assoc)("messageId", res.messageId, ctx));
  };
}

// src/lib/message/index.js
function messageWith(env) {
  const uploadMessage = uploadMessageWith(env);
  return ({ process: process2, data, tags, anchor, signer }) => {
    return of({ id: process2, data, tags, anchor, signer }).chain(uploadMessage).map((ctx) => ctx.messageId).bimap(errFrom, import_ramda6.identity).toPromise();
  };
}

// src/lib/spawn/index.js
var import_ramda9 = require("ramda");

// src/lib/spawn/verify-inputs.js
var import_ramda7 = require("ramda");
var checkTag = (name, pred, err) => (tags) => pred(tags[name]) ? Resolved(tags) : Rejected(`Tag '${name}': ${err}`);
function verifyModuleWith({ loadTransactionMeta, logger }) {
  loadTransactionMeta = fromPromise(loadTransactionMetaSchema.implement(loadTransactionMeta));
  return (module2) => of(module2).chain(loadTransactionMeta).map((0, import_ramda7.prop)("tags")).map(parseTags).chain(checkTag("Data-Protocol", eqOrIncludes("ao"), "value 'ao' was not found on module")).chain(checkTag("Type", eqOrIncludes("Module"), "value 'Module' was not found on module")).chain(checkTag("Module-Format", import_ramda7.isNotNil, "was not found on module")).chain(checkTag("Input-Encoding", import_ramda7.isNotNil, "was not found on module")).chain(checkTag("Output-Encoding", import_ramda7.isNotNil, "was not found on module")).bimap(
    logger.tap("Verifying module source failed: %s"),
    logger.tap("Verified module source")
  );
}
function verifySchedulerWith({ logger, validateScheduler }) {
  validateScheduler = fromPromise(validateSchedulerSchema.implement(validateScheduler));
  return (scheduler) => of(scheduler).chain(
    (scheduler2) => validateScheduler(scheduler2).chain((isValid) => isValid ? Resolved(scheduler2) : Rejected(`Valid Scheduler-Location owned by ${scheduler2} not found`))
  ).bimap(
    logger.tap("Verifying scheduler failed: %s"),
    logger.tap("Verified scheduler")
  );
}
function verifySignerWith({ logger }) {
  return (signer) => of(signer).map(logger.tap("Checking for signer")).chain((signer2) => signer2 ? Resolved(signer2) : Rejected("signer not found"));
}
function verifyInputsWith(env) {
  const logger = env.logger.child("verifyInput");
  env = { ...env, logger };
  const verifyModule = verifyModuleWith(env);
  const verifyScheduler = verifySchedulerWith(env);
  const verifySigner = verifySignerWith(env);
  return (ctx) => {
    return of(ctx).chain((ctx2) => verifyModule(ctx2.module).map(() => ctx2)).chain((ctx2) => verifyScheduler(ctx2.scheduler)).map(() => ctx).chain((ctx2) => verifySigner(ctx2.signer).map(() => ctx2)).bimap(
      logger.tap("Error when verify input: %s"),
      logger.tap("Successfully verified inputs")
    );
  };
}

// src/lib/spawn/upload-process.js
var import_zod6 = require("zod");
var import_ramda8 = require("ramda");
var tagSchema3 = import_zod6.z.array(import_zod6.z.object({
  name: import_zod6.z.string(),
  value: import_zod6.z.string()
}));
function buildTagsWith2() {
  return (ctx) => {
    return of(ctx).map((0, import_ramda8.prop)("tags")).map((0, import_ramda8.defaultTo)([])).map(removeTagsByNameMaybeValue("Data-Protocol", "ao")).map(removeTagsByNameMaybeValue("Variant")).map(removeTagsByNameMaybeValue("Type")).map(removeTagsByNameMaybeValue("Module")).map(removeTagsByNameMaybeValue("Scheduler")).map(removeTagsByNameMaybeValue("SDK")).map((0, import_ramda8.concat)(import_ramda8.__, [
      { name: "Data-Protocol", value: "ao" },
      { name: "Variant", value: "ao.TN.1" },
      { name: "Type", value: "Process" },
      { name: "Module", value: ctx.module },
      { name: "Scheduler", value: ctx.scheduler },
      { name: "SDK", value: "aoconnect" }
    ])).map(tagSchema3.parse).map((0, import_ramda8.assoc)("tags", import_ramda8.__, ctx));
  };
}
function buildDataWith2({ logger }) {
  return (ctx) => {
    return of(ctx).chain((0, import_ramda8.ifElse)(
      (0, import_ramda8.always)(ctx.data),
      /**
       * data is provided as input, so do nothing
       */
      () => Resolved(ctx),
      /**
       * Just generate a random value for data
       */
      () => Resolved(Math.random().toString().slice(-4)).map((0, import_ramda8.assoc)("data", import_ramda8.__, ctx)).map(
        (ctx2) => (0, import_ramda8.pipe)(
          (0, import_ramda8.prop)("tags"),
          removeTagsByNameMaybeValue("Content-Type"),
          (0, import_ramda8.append)({ name: "Content-Type", value: "text/plain" }),
          (0, import_ramda8.assoc)("tags", import_ramda8.__, ctx2)
        )(ctx2)
      ).map(logger.tap('added pseudo-random string as process "data"'))
    ));
  };
}
function uploadProcessWith(env) {
  const logger = env.logger.child("uploadProcess");
  env = { ...env, logger };
  const buildTags = buildTagsWith2(env);
  const buildData = buildDataWith2(env);
  const deployProcess = deployProcessSchema.implement(env.deployProcess);
  return (ctx) => {
    return of(ctx).chain(buildTags).chain(buildData).chain(fromPromise(
      ({ data, tags, signer }) => deployProcess({ data, tags, signer: signerSchema.implement(signer) })
    )).map((res) => (0, import_ramda8.assoc)("processId", res.processId, ctx));
  };
}

// src/lib/spawn/index.js
function spawnWith(env) {
  const verifyInputs = verifyInputsWith(env);
  const uploadProcess = uploadProcessWith(env);
  return ({ module: module2, scheduler, signer, tags, data }) => {
    return of({ module: module2, scheduler, signer, tags, data }).chain(verifyInputs).chain(uploadProcess).map((ctx) => ctx.processId).bimap(errFrom, import_ramda9.identity).toPromise();
  };
}

// src/lib/monitor/index.js
var import_ramda11 = require("ramda");

// src/lib/monitor/upload-monitor.js
var import_ramda10 = require("ramda");
function uploadMonitorWith(env) {
  const deployMonitor = deployMonitorSchema.implement(env.deployMonitor);
  return (ctx) => {
    return of(ctx).chain(fromPromise(
      ({ id, signer }) => deployMonitor({
        processId: id,
        signer: signerSchema.implement(signer),
        /**
         * No tags or data can be provided right now,
         *
         * so just randomize data and set tags to an empty array
         */
        data: Math.random().toString().slice(-4),
        tags: []
      })
    )).map((res) => (0, import_ramda10.assoc)("monitorId", res.messageId, ctx));
  };
}

// src/lib/monitor/index.js
function monitorWith(env) {
  const uploadMonitor = uploadMonitorWith(env);
  return ({ process: process2, signer }) => of({ id: process2, signer }).chain(uploadMonitor).map((ctx) => ctx.monitorId).bimap(errFrom, import_ramda11.identity).toPromise();
}

// src/lib/unmonitor/index.js
var import_ramda13 = require("ramda");

// src/lib/unmonitor/upload-unmonitor.js
var import_ramda12 = require("ramda");
function uploadUnmonitorWith(env) {
  const deployUnmonitor = deployMonitorSchema.implement(env.deployUnmonitor);
  return (ctx) => {
    return of(ctx).chain(fromPromise(
      ({ id, signer }) => deployUnmonitor({
        processId: id,
        signer: signerSchema.implement(signer),
        /**
         * No tags or data can be provided right now,
         *
         * so just randomize data and set tags to an empty array
         */
        data: Math.random().toString().slice(-4),
        tags: []
      })
    )).map((res) => (0, import_ramda12.assoc)("monitorId", res.messageId, ctx));
  };
}

// src/lib/unmonitor/index.js
function unmonitorWith(env) {
  const uploadUnmonitor = uploadUnmonitorWith(env);
  return ({ process: process2, signer }) => of({ id: process2, signer }).chain(uploadUnmonitor).map((ctx) => ctx.monitorId).bimap(errFrom, import_ramda13.identity).toPromise();
}

// src/lib/results/index.js
var import_ramda14 = require("ramda");

// src/lib/results/verify-input.js
var import_zod7 = require("zod");
var inputSchema2 = import_zod7.z.object({
  process: import_zod7.z.string().min(1, { message: "process identifier is required" }),
  from: import_zod7.z.string().optional(),
  to: import_zod7.z.string().optional(),
  sort: import_zod7.z.enum(["ASC", "DESC"]).default("ASC"),
  limit: import_zod7.z.number().optional()
});
function verifyInputWith2() {
  return (ctx) => {
    return of(ctx).map(inputSchema2.parse).map(() => ctx);
  };
}

// src/lib/results/query.js
function queryWith({ queryResults }) {
  queryResults = fromPromise(queryResultsSchema.implement(queryResults));
  return (ctx) => {
    return of({ process: ctx.process, from: ctx.from, to: ctx.to, sort: ctx.sort, limit: ctx.limit }).chain(queryResults);
  };
}

// src/lib/results/index.js
function resultsWith(env) {
  const verifyInput = verifyInputWith2(env);
  const query = queryWith(env);
  return ({ process: process2, from, to, sort, limit }) => {
    return of({ process: process2, from, to, sort, limit }).chain(verifyInput).chain(query).map(
      env.logger.tap(
        'readResults result for message "%s": %O',
        process2
      )
    ).map((result2) => result2).bimap(errFrom, import_ramda14.identity).toPromise();
  };
}

// src/lib/dryrun/verify-input.js
var import_zod8 = require("zod");
var inputSchema3 = import_zod8.z.object({
  Id: import_zod8.z.string(),
  Target: import_zod8.z.string(),
  Owner: import_zod8.z.string(),
  Anchor: import_zod8.z.string().optional(),
  Data: import_zod8.z.any().default("1234"),
  Tags: import_zod8.z.array(import_zod8.z.object({ name: import_zod8.z.string(), value: import_zod8.z.string() }))
});
function verifyInputWith3() {
  return (msg) => {
    return of(msg).map(inputSchema3.parse).map((m) => {
      m.Tags = m.Tags.concat([
        { name: "Data-Protocol", value: "ao" },
        { name: "Type", value: "Message" },
        { name: "Variant", value: "ao.TN.1" }
      ]);
      return m;
    });
  };
}

// src/lib/dryrun/run.js
function runWith({ dryrunFetch }) {
  return fromPromise(dryrunResultSchema.implement(dryrunFetch));
}

// src/lib/dryrun/index.js
function dryrunWith(env) {
  const verifyInput = verifyInputWith3(env);
  const dryrun2 = runWith(env);
  return (msg) => of(msg).map(convert).chain(verifyInput).chain(dryrun2).toPromise();
}
function convert({ process: process2, data, tags, anchor, ...rest }) {
  return {
    Id: "1234",
    Owner: "1234",
    ...rest,
    Target: process2,
    Data: data || "1234",
    Tags: tags || [],
    Anchor: anchor || "0"
  };
}

// src/lib/assign/index.js
var import_ramda16 = require("ramda");

// src/lib/assign/send-assign.js
var import_ramda15 = require("ramda");
function sendAssignWith(env) {
  const deployAssign = deployAssignSchema.implement(env.deployAssign);
  return (ctx) => {
    return of(ctx).chain(fromPromise(
      ({ process: process2, message: message2, baseLayer, exclude }) => deployAssign({ process: process2, message: message2, baseLayer, exclude })
    )).map((res) => (0, import_ramda15.assoc)("assignmentId", res.assignmentId, ctx));
  };
}

// src/lib/assign/index.js
function assignWith(env) {
  const sendAssign = sendAssignWith(env);
  return ({ process: process2, message: message2, baseLayer, exclude }) => {
    return of({ process: process2, message: message2, baseLayer, exclude }).chain(sendAssign).map((ctx) => ctx.assignmentId).bimap(errFrom, import_ramda16.identity).toPromise();
  };
}

// src/index.common.js
var DEFAULT_GATEWAY_URL = "https://arweave.net";
var DEFAULT_MU_URL = "https://mu.ao-testnet.xyz";
var DEFAULT_CU_URL = "https://cu.ao-testnet.xyz";
function connect({
  GRAPHQL_URL: GRAPHQL_URL2,
  GATEWAY_URL: GATEWAY_URL2 = DEFAULT_GATEWAY_URL,
  MU_URL: MU_URL2 = DEFAULT_MU_URL,
  CU_URL: CU_URL2 = DEFAULT_CU_URL
} = {}) {
  const logger = createLogger();
  if (!GRAPHQL_URL2)
    GRAPHQL_URL2 = joinUrl({ url: GATEWAY_URL2, path: "/graphql" });
  const { validate } = (0, import_ao_scheduler_utils.connect)({ cacheSize: 100, GRAPHQL_URL: GRAPHQL_URL2 });
  const processMetaCache2 = createProcessMetaCache({ MAX_SIZE: 25 });
  const resultLogger = logger.child("result");
  const result2 = resultWith({
    loadResult: loadResultWith({ fetch, CU_URL: CU_URL2, logger: resultLogger }),
    logger: resultLogger
  });
  const messageLogger = logger.child("message");
  const message2 = messageWith({
    loadProcessMeta: loadProcessMetaWith({
      fetch,
      cache: processMetaCache2,
      logger: messageLogger
    }),
    // locateScheduler: locate,
    deployMessage: deployMessageWith({ fetch, MU_URL: MU_URL2, logger: messageLogger }),
    logger: messageLogger
  });
  const spawnLogger = logger.child("spawn");
  const spawn2 = spawnWith({
    loadTransactionMeta: loadTransactionMetaWith({ fetch, GRAPHQL_URL: GRAPHQL_URL2, logger: spawnLogger }),
    validateScheduler: validate,
    deployProcess: deployProcessWith({ fetch, MU_URL: MU_URL2, logger: spawnLogger }),
    logger: spawnLogger
  });
  const monitorLogger = logger.child("monitor");
  const monitor2 = monitorWith({
    loadProcessMeta: loadProcessMetaWith({
      fetch,
      cache: processMetaCache2,
      logger: monitorLogger
    }),
    // locateScheduler: locate,
    deployMonitor: deployMonitorWith({ fetch, MU_URL: MU_URL2, logger: monitorLogger }),
    logger: monitorLogger
  });
  const unmonitorLogger = logger.child("unmonitor");
  const unmonitor2 = unmonitorWith({
    loadProcessMeta: loadProcessMetaWith({
      fetch,
      cache: processMetaCache2,
      logger: unmonitorLogger
    }),
    // locateScheduler: locate,
    deployUnmonitor: deployUnmonitorWith({ fetch, MU_URL: MU_URL2, logger: unmonitorLogger }),
    logger: monitorLogger
  });
  const resultsLogger = logger.child("results");
  const results2 = resultsWith({
    queryResults: queryResultsWith({ fetch, CU_URL: CU_URL2, logger: resultsLogger }),
    logger: resultsLogger
  });
  const dryrunLogger = logger.child("dryrun");
  const dryrun2 = dryrunWith({
    dryrunFetch: dryrunFetchWith({ fetch, CU_URL: CU_URL2, logger: dryrunLogger }),
    logger: dryrunLogger
  });
  const assignLogger = logger.child("assign");
  const assign2 = assignWith({
    deployAssign: deployAssignWith({
      fetch,
      MU_URL: MU_URL2,
      logger: assignLogger
    }),
    logger: messageLogger
  });
  return { result: result2, results: results2, message: message2, spawn: spawn2, monitor: monitor2, unmonitor: unmonitor2, dryrun: dryrun2, assign: assign2 };
}

// src/client/node/wallet.js
var wallet_exports = {};
__export(wallet_exports, {
  createDataItemSigner: () => createDataItemSigner
});
var WarpArBundles = __toESM(require("warp-arbundles"), 1);
var pkg = WarpArBundles.default ? WarpArBundles.default : WarpArBundles;
var { createData, ArweaveSigner } = pkg;
function createDataItemSigner(wallet) {
  const signer = async ({ data, tags, target, anchor }) => {
    const signer2 = new ArweaveSigner(wallet);
    const dataItem = createData(data, signer2, { tags, target, anchor });
    return dataItem.sign(signer2).then(async () => ({
      id: await dataItem.id,
      raw: await dataItem.getRaw()
    }));
  };
  return signer;
}

// src/index.js
var GATEWAY_URL = process.env.GATEWAY_URL || void 0;
var MU_URL = process.env.MU_URL || void 0;
var CU_URL = process.env.CU_URL || void 0;
var GRAPHQL_URL = process.env.GRAPHQL_URL || void 0;
var { result, results, message, spawn, monitor, unmonitor, dryrun, assign } = connect({ GATEWAY_URL, MU_URL, CU_URL, GRAPHQL_URL });
var createDataItemSigner2 = wallet_exports.createDataItemSigner;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assign,
  connect,
  createDataItemSigner,
  dryrun,
  message,
  monitor,
  result,
  results,
  spawn,
  unmonitor
});
