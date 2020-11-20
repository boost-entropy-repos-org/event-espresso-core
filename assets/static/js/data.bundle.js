this["eventespresso"] = this["eventespresso"] || {}; this["eventespresso"]["data"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "63c5aad4881b89bee3c8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "data";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(3)(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@apollo/client/cache/cache.cjs.js":
/*!********************************************************!*\
  !*** ./node_modules/@apollo/client/cache/cache.cjs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var optimism = __webpack_require__(/*! optimism */ "./node_modules/@apollo/client/node_modules/optimism/lib/bundle.cjs.js");

var utilities = __webpack_require__(/*! ../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var equality = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/equality.js");

var context = __webpack_require__(/*! @wry/context */ "./node_modules/@wry/context/lib/context.js");

var ApolloCache = function () {
  function ApolloCache() {
    this.getFragmentDoc = optimism.wrap(utilities.getFragmentQueryDocument);
  }

  ApolloCache.prototype.recordOptimisticTransaction = function (transaction, optimisticId) {
    this.performTransaction(transaction, optimisticId);
  };

  ApolloCache.prototype.transformDocument = function (document) {
    return document;
  };

  ApolloCache.prototype.identify = function (object) {
    return;
  };

  ApolloCache.prototype.gc = function () {
    return [];
  };

  ApolloCache.prototype.modify = function (options) {
    return false;
  };

  ApolloCache.prototype.transformForLink = function (document) {
    return document;
  };

  ApolloCache.prototype.readQuery = function (options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return this.read({
      rootId: options.id || 'ROOT_QUERY',
      query: options.query,
      variables: options.variables,
      optimistic: optimistic
    });
  };

  ApolloCache.prototype.readFragment = function (options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return this.read({
      query: this.getFragmentDoc(options.fragment, options.fragmentName),
      variables: options.variables,
      rootId: options.id,
      optimistic: optimistic
    });
  };

  ApolloCache.prototype.writeQuery = function (options) {
    return this.write({
      dataId: options.id || 'ROOT_QUERY',
      result: options.data,
      query: options.query,
      variables: options.variables,
      broadcast: options.broadcast
    });
  };

  ApolloCache.prototype.writeFragment = function (options) {
    return this.write({
      dataId: options.id,
      result: options.data,
      variables: options.variables,
      query: this.getFragmentDoc(options.fragment, options.fragmentName),
      broadcast: options.broadcast
    });
  };

  return ApolloCache;
}();

(function (Cache) {})(exports.Cache || (exports.Cache = {}));

var MissingFieldError = function () {
  function MissingFieldError(message, path, query, clientOnly, variables) {
    this.message = message;
    this.path = path;
    this.query = query;
    this.clientOnly = clientOnly;
    this.variables = variables;
  }

  return MissingFieldError;
}();

var hasOwn = Object.prototype.hasOwnProperty;

function getTypenameFromStoreObject(store, objectOrReference) {
  return utilities.isReference(objectOrReference) ? store.get(objectOrReference.__ref, "__typename") : objectOrReference && objectOrReference.__typename;
}

var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;

function fieldNameFromStoreName(storeFieldName) {
  var match = storeFieldName.match(TypeOrFieldNameRegExp);
  return match ? match[0] : storeFieldName;
}

function selectionSetMatchesResult(selectionSet, result, variables) {
  if (result && typeof result === "object") {
    return Array.isArray(result) ? result.every(function (item) {
      return selectionSetMatchesResult(selectionSet, item, variables);
    }) : selectionSet.selections.every(function (field) {
      if (utilities.isField(field) && utilities.shouldInclude(field, variables)) {
        var key = utilities.resultKeyNameFromField(field);
        return hasOwn.call(result, key) && (!field.selectionSet || selectionSetMatchesResult(field.selectionSet, result[key], variables));
      }

      return true;
    });
  }

  return false;
}

function storeValueIsStoreObject(value) {
  return value !== null && typeof value === "object" && !utilities.isReference(value) && !Array.isArray(value);
}

function isFieldValueToBeMerged(value) {
  var field = value && value.__field;
  return field && utilities.isField(field);
}

function makeProcessedFieldsMerger() {
  return new utilities.DeepMerger(reconcileProcessedFields);
}

var reconcileProcessedFields = function (existingObject, incomingObject, property) {
  var existing = existingObject[property];
  var incoming = incomingObject[property];

  if (isFieldValueToBeMerged(existing)) {
    existing.__value = this.merge(existing.__value, isFieldValueToBeMerged(incoming) ? incoming.__value : incoming);
    return existing;
  }

  if (isFieldValueToBeMerged(incoming)) {
    incoming.__value = this.merge(existing, incoming.__value);
    return incoming;
  }

  return this.merge(existing, incoming);
};

var DELETE = Object.create(null);

var delModifier = function () {
  return DELETE;
};

var INVALIDATE = Object.create(null);

var EntityStore = function () {
  function EntityStore(policies, group) {
    var _this = this;

    this.policies = policies;
    this.group = group;
    this.data = Object.create(null);
    this.rootIds = Object.create(null);
    this.refs = Object.create(null);

    this.getFieldValue = function (objectOrReference, storeFieldName) {
      return utilities.maybeDeepFreeze(utilities.isReference(objectOrReference) ? _this.get(objectOrReference.__ref, storeFieldName) : objectOrReference && objectOrReference[storeFieldName]);
    };

    this.canRead = function (objOrRef) {
      return utilities.isReference(objOrRef) ? _this.has(objOrRef.__ref) : typeof objOrRef === "object";
    };

    this.toReference = function (objOrIdOrRef, mergeIntoStore) {
      if (typeof objOrIdOrRef === "string") {
        return utilities.makeReference(objOrIdOrRef);
      }

      if (utilities.isReference(objOrIdOrRef)) {
        return objOrIdOrRef;
      }

      var id = _this.policies.identify(objOrIdOrRef)[0];

      if (id) {
        var ref = utilities.makeReference(id);

        if (mergeIntoStore) {
          _this.merge(id, objOrIdOrRef);
        }

        return ref;
      }
    };
  }

  EntityStore.prototype.toObject = function () {
    return tslib.__assign({}, this.data);
  };

  EntityStore.prototype.has = function (dataId) {
    return this.lookup(dataId, true) !== void 0;
  };

  EntityStore.prototype.get = function (dataId, fieldName) {
    this.group.depend(dataId, fieldName);

    if (hasOwn.call(this.data, dataId)) {
      var storeObject = this.data[dataId];

      if (storeObject && hasOwn.call(storeObject, fieldName)) {
        return storeObject[fieldName];
      }
    }

    if (fieldName === "__typename" && hasOwn.call(this.policies.rootTypenamesById, dataId)) {
      return this.policies.rootTypenamesById[dataId];
    }

    if (this instanceof Layer) {
      return this.parent.get(dataId, fieldName);
    }
  };

  EntityStore.prototype.lookup = function (dataId, dependOnExistence) {
    if (dependOnExistence) this.group.depend(dataId, "__exists");
    return hasOwn.call(this.data, dataId) ? this.data[dataId] : this instanceof Layer ? this.parent.lookup(dataId, dependOnExistence) : void 0;
  };

  EntityStore.prototype.merge = function (dataId, incoming) {
    var _this = this;

    var existing = this.lookup(dataId);
    var merged = new utilities.DeepMerger(storeObjectReconciler).merge(existing, incoming);
    this.data[dataId] = merged;

    if (merged !== existing) {
      delete this.refs[dataId];

      if (this.group.caching) {
        var fieldsToDirty_1 = Object.create(null);
        if (!existing) fieldsToDirty_1.__exists = 1;
        Object.keys(incoming).forEach(function (storeFieldName) {
          if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
            fieldsToDirty_1[fieldNameFromStoreName(storeFieldName)] = 1;

            if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
              delete merged[storeFieldName];
            }
          }
        });
        Object.keys(fieldsToDirty_1).forEach(function (fieldName) {
          return _this.group.dirty(dataId, fieldName);
        });
      }
    }
  };

  EntityStore.prototype.modify = function (dataId, fields) {
    var _this = this;

    var storeObject = this.lookup(dataId);

    if (storeObject) {
      var changedFields_1 = Object.create(null);
      var needToMerge_1 = false;
      var allDeleted_1 = true;
      var sharedDetails_1 = {
        DELETE: DELETE,
        INVALIDATE: INVALIDATE,
        isReference: utilities.isReference,
        toReference: this.toReference,
        canRead: this.canRead,
        readField: function (fieldNameOrOptions, from) {
          return _this.policies.readField(typeof fieldNameOrOptions === "string" ? {
            fieldName: fieldNameOrOptions,
            from: from || utilities.makeReference(dataId)
          } : fieldNameOrOptions, {
            store: _this
          });
        }
      };
      Object.keys(storeObject).forEach(function (storeFieldName) {
        var fieldName = fieldNameFromStoreName(storeFieldName);
        var fieldValue = storeObject[storeFieldName];
        if (fieldValue === void 0) return;
        var modify = typeof fields === "function" ? fields : fields[storeFieldName] || fields[fieldName];

        if (modify) {
          var newValue = modify === delModifier ? DELETE : modify(utilities.maybeDeepFreeze(fieldValue), tslib.__assign(tslib.__assign({}, sharedDetails_1), {
            fieldName: fieldName,
            storeFieldName: storeFieldName,
            storage: _this.getStorage(dataId, storeFieldName)
          }));

          if (newValue === INVALIDATE) {
            _this.group.dirty(dataId, storeFieldName);
          } else {
            if (newValue === DELETE) newValue = void 0;

            if (newValue !== fieldValue) {
              changedFields_1[storeFieldName] = newValue;
              needToMerge_1 = true;
              fieldValue = newValue;
            }
          }
        }

        if (fieldValue !== void 0) {
          allDeleted_1 = false;
        }
      });

      if (needToMerge_1) {
        this.merge(dataId, changedFields_1);

        if (allDeleted_1) {
          if (this instanceof Layer) {
            this.data[dataId] = void 0;
          } else {
            delete this.data[dataId];
          }

          this.group.dirty(dataId, "__exists");
        }

        return true;
      }
    }

    return false;
  };

  EntityStore.prototype.delete = function (dataId, fieldName, args) {
    var _a;

    var storeObject = this.lookup(dataId);

    if (storeObject) {
      var typename = this.getFieldValue(storeObject, "__typename");
      var storeFieldName = fieldName && args ? this.policies.getStoreFieldName({
        typename: typename,
        fieldName: fieldName,
        args: args
      }) : fieldName;
      return this.modify(dataId, storeFieldName ? (_a = {}, _a[storeFieldName] = delModifier, _a) : delModifier);
    }

    return false;
  };

  EntityStore.prototype.evict = function (options) {
    var evicted = false;

    if (options.id) {
      if (hasOwn.call(this.data, options.id)) {
        evicted = this.delete(options.id, options.fieldName, options.args);
      }

      if (this instanceof Layer) {
        evicted = this.parent.evict(options) || evicted;
      }

      if (options.fieldName || evicted) {
        this.group.dirty(options.id, options.fieldName || "__exists");
      }
    }

    return evicted;
  };

  EntityStore.prototype.clear = function () {
    this.replace(null);
  };

  EntityStore.prototype.replace = function (newData) {
    var _this = this;

    Object.keys(this.data).forEach(function (dataId) {
      if (!(newData && hasOwn.call(newData, dataId))) {
        _this.delete(dataId);
      }
    });

    if (newData) {
      Object.keys(newData).forEach(function (dataId) {
        _this.merge(dataId, newData[dataId]);
      });
    }
  };

  EntityStore.prototype.retain = function (rootId) {
    return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
  };

  EntityStore.prototype.release = function (rootId) {
    if (this.rootIds[rootId] > 0) {
      var count = --this.rootIds[rootId];
      if (!count) delete this.rootIds[rootId];
      return count;
    }

    return 0;
  };

  EntityStore.prototype.getRootIdSet = function (ids) {
    if (ids === void 0) {
      ids = new Set();
    }

    Object.keys(this.rootIds).forEach(ids.add, ids);

    if (this instanceof Layer) {
      this.parent.getRootIdSet(ids);
    }

    return ids;
  };

  EntityStore.prototype.gc = function () {
    var _this = this;

    var ids = this.getRootIdSet();
    var snapshot = this.toObject();
    ids.forEach(function (id) {
      if (hasOwn.call(snapshot, id)) {
        Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
        delete snapshot[id];
      }
    });
    var idsToRemove = Object.keys(snapshot);

    if (idsToRemove.length) {
      var root_1 = this;

      while (root_1 instanceof Layer) root_1 = root_1.parent;

      idsToRemove.forEach(function (id) {
        return root_1.delete(id);
      });
    }

    return idsToRemove;
  };

  EntityStore.prototype.findChildRefIds = function (dataId) {
    if (!hasOwn.call(this.refs, dataId)) {
      var found_1 = this.refs[dataId] = Object.create(null);
      var workSet_1 = new Set([this.data[dataId]]);

      var canTraverse_1 = function (obj) {
        return obj !== null && typeof obj === 'object';
      };

      workSet_1.forEach(function (obj) {
        if (utilities.isReference(obj)) {
          found_1[obj.__ref] = true;
        } else if (canTraverse_1(obj)) {
          Object.values(obj).filter(canTraverse_1).forEach(workSet_1.add, workSet_1);
        }
      });
    }

    return this.refs[dataId];
  };

  EntityStore.prototype.makeCacheKey = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return this.group.keyMaker.lookupArray(args);
  };

  return EntityStore;
}();

var CacheGroup = function () {
  function CacheGroup(caching) {
    this.caching = caching;
    this.d = null;
    this.keyMaker = new optimism.KeyTrie(utilities.canUseWeakMap);
    this.d = caching ? optimism.dep() : null;
  }

  CacheGroup.prototype.depend = function (dataId, storeFieldName) {
    if (this.d) {
      this.d(makeDepKey(dataId, storeFieldName));
    }
  };

  CacheGroup.prototype.dirty = function (dataId, storeFieldName) {
    if (this.d) {
      this.d.dirty(makeDepKey(dataId, storeFieldName));
    }
  };

  return CacheGroup;
}();

function makeDepKey(dataId, storeFieldName) {
  return fieldNameFromStoreName(storeFieldName) + '#' + dataId;
}

(function (EntityStore) {
  var Root = function (_super) {
    tslib.__extends(Root, _super);

    function Root(_a) {
      var policies = _a.policies,
          _b = _a.resultCaching,
          resultCaching = _b === void 0 ? true : _b,
          seed = _a.seed;

      var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;

      _this.storageTrie = new optimism.KeyTrie(utilities.canUseWeakMap);
      _this.sharedLayerGroup = new CacheGroup(resultCaching);
      if (seed) _this.replace(seed);
      return _this;
    }

    Root.prototype.addLayer = function (layerId, replay) {
      return new Layer(layerId, this, replay, this.sharedLayerGroup);
    };

    Root.prototype.removeLayer = function () {
      return this;
    };

    Root.prototype.getStorage = function (idOrObj, storeFieldName) {
      return this.storageTrie.lookup(idOrObj, storeFieldName);
    };

    return Root;
  }(EntityStore);

  EntityStore.Root = Root;
})(EntityStore || (EntityStore = {}));

var Layer = function (_super) {
  tslib.__extends(Layer, _super);

  function Layer(id, parent, replay, group) {
    var _this = _super.call(this, parent.policies, group) || this;

    _this.id = id;
    _this.parent = parent;
    _this.replay = replay;
    _this.group = group;
    replay(_this);
    return _this;
  }

  Layer.prototype.addLayer = function (layerId, replay) {
    return new Layer(layerId, this, replay, this.group);
  };

  Layer.prototype.removeLayer = function (layerId) {
    var _this = this;

    var parent = this.parent.removeLayer(layerId);

    if (layerId === this.id) {
      if (this.group.caching) {
        Object.keys(this.data).forEach(function (dataId) {
          if (_this.data[dataId] !== parent.lookup(dataId)) {
            _this.delete(dataId);
          }
        });
      }

      return parent;
    }

    if (parent === this.parent) return this;
    return parent.addLayer(this.id, this.replay);
  };

  Layer.prototype.toObject = function () {
    return tslib.__assign(tslib.__assign({}, this.parent.toObject()), this.data);
  };

  Layer.prototype.findChildRefIds = function (dataId) {
    var fromParent = this.parent.findChildRefIds(dataId);
    return hasOwn.call(this.data, dataId) ? tslib.__assign(tslib.__assign({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
  };

  Layer.prototype.getStorage = function (idOrObj, storeFieldName) {
    return this.parent.getStorage(idOrObj, storeFieldName);
  };

  return Layer;
}(EntityStore);

function storeObjectReconciler(existingObject, incomingObject, property) {
  var existingValue = existingObject[property];
  var incomingValue = incomingObject[property];
  return equality.equal(existingValue, incomingValue) ? existingValue : incomingValue;
}

function supportsResultCaching(store) {
  return !!(store instanceof EntityStore && store.group.caching);
}

function missingFromInvariant(err, context) {
  return new MissingFieldError(err.message, context.path.slice(), context.query, context.clientOnly, context.variables);
}

var StoreReader = function () {
  function StoreReader(config) {
    var _this = this;

    this.config = config;
    this.executeSelectionSet = optimism.wrap(function (options) {
      return _this.execSelectionSetImpl(options);
    }, {
      keyArgs: function (options) {
        return [options.selectionSet, options.objectOrReference, options.context];
      },
      makeCacheKey: function (selectionSet, parent, context) {
        if (supportsResultCaching(context.store)) {
          return context.store.makeCacheKey(selectionSet, utilities.isReference(parent) ? parent.__ref : parent, context.varString);
        }
      }
    });
    this.knownResults = new WeakMap();
    this.executeSubSelectedArray = optimism.wrap(function (options) {
      return _this.execSubSelectedArrayImpl(options);
    }, {
      makeCacheKey: function (_a) {
        var field = _a.field,
            array = _a.array,
            context = _a.context;

        if (supportsResultCaching(context.store)) {
          return context.store.makeCacheKey(field, array, context.varString);
        }
      }
    });
    this.config = tslib.__assign({
      addTypename: true
    }, config);
  }

  StoreReader.prototype.diffQueryAgainstStore = function (_a) {
    var store = _a.store,
        query = _a.query,
        _b = _a.rootId,
        rootId = _b === void 0 ? 'ROOT_QUERY' : _b,
        variables = _a.variables,
        _c = _a.returnPartialData,
        returnPartialData = _c === void 0 ? true : _c;
    var policies = this.config.cache.policies;
    variables = tslib.__assign(tslib.__assign({}, utilities.getDefaultValues(utilities.getQueryDefinition(query))), variables);
    var execResult = this.executeSelectionSet({
      selectionSet: utilities.getMainDefinition(query).selectionSet,
      objectOrReference: utilities.makeReference(rootId),
      context: {
        store: store,
        query: query,
        policies: policies,
        variables: variables,
        varString: JSON.stringify(variables),
        fragmentMap: utilities.createFragmentMap(utilities.getFragmentDefinitions(query)),
        path: [],
        clientOnly: false
      }
    });
    var hasMissingFields = execResult.missing && execResult.missing.length > 0;

    if (hasMissingFields && !returnPartialData) {
      throw execResult.missing[0];
    }

    return {
      result: execResult.result,
      missing: execResult.missing,
      complete: !hasMissingFields
    };
  };

  StoreReader.prototype.isFresh = function (result, parent, selectionSet, context) {
    if (supportsResultCaching(context.store) && this.knownResults.get(result) === selectionSet) {
      var latest = this.executeSelectionSet.peek(selectionSet, parent, context);

      if (latest && result === latest.result) {
        return true;
      }
    }

    return false;
  };

  StoreReader.prototype.execSelectionSetImpl = function (_a) {
    var _this = this;

    var selectionSet = _a.selectionSet,
        objectOrReference = _a.objectOrReference,
        context = _a.context;

    if (utilities.isReference(objectOrReference) && !context.policies.rootTypenamesById[objectOrReference.__ref] && !context.store.has(objectOrReference.__ref)) {
      return {
        result: {},
        missing: [missingFromInvariant( false ? undefined : new tsInvariant.InvariantError("Dangling reference to missing " + objectOrReference.__ref + " object"), context)]
      };
    }

    var variables = context.variables,
        policies = context.policies,
        store = context.store;
    var objectsToMerge = [];
    var finalResult = {
      result: null
    };
    var typename = store.getFieldValue(objectOrReference, "__typename");

    if (this.config.addTypename && typeof typename === "string" && !policies.rootIdsByTypename[typename]) {
      objectsToMerge.push({
        __typename: typename
      });
    }

    function getMissing() {
      return finalResult.missing || (finalResult.missing = []);
    }

    function handleMissing(result) {
      var _a;

      if (result.missing) (_a = getMissing()).push.apply(_a, result.missing);
      return result.result;
    }

    var workSet = new Set(selectionSet.selections);
    workSet.forEach(function (selection) {
      var _a;

      if (!utilities.shouldInclude(selection, variables)) return;

      if (utilities.isField(selection)) {
        var fieldValue = policies.readField({
          fieldName: selection.name.value,
          field: selection,
          variables: context.variables,
          from: objectOrReference
        }, context);
        var resultName = utilities.resultKeyNameFromField(selection);
        context.path.push(resultName);
        var wasClientOnly = context.clientOnly;
        context.clientOnly = wasClientOnly || !!(selection.directives && selection.directives.some(function (d) {
          return d.name.value === "client";
        }));

        if (fieldValue === void 0) {
          if (!utilities.addTypenameToDocument.added(selection)) {
            getMissing().push(missingFromInvariant( false ? undefined : new tsInvariant.InvariantError("Can't find field '" + selection.name.value + "' on " + (utilities.isReference(objectOrReference) ? objectOrReference.__ref + " object" : "object " + JSON.stringify(objectOrReference, null, 2))), context));
          }
        } else if (Array.isArray(fieldValue)) {
          fieldValue = handleMissing(_this.executeSubSelectedArray({
            field: selection,
            array: fieldValue,
            context: context
          }));
        } else if (!selection.selectionSet) {
          if (true) {
            assertSelectionSetForIdValue(context.store, selection, fieldValue);
            utilities.maybeDeepFreeze(fieldValue);
          }
        } else if (fieldValue != null) {
          fieldValue = handleMissing(_this.executeSelectionSet({
            selectionSet: selection.selectionSet,
            objectOrReference: fieldValue,
            context: context
          }));
        }

        if (fieldValue !== void 0) {
          objectsToMerge.push((_a = {}, _a[resultName] = fieldValue, _a));
        }

        context.clientOnly = wasClientOnly;
        tsInvariant.invariant(context.path.pop() === resultName);
      } else {
        var fragment = utilities.getFragmentFromSelection(selection, context.fragmentMap);

        if (fragment && policies.fragmentMatches(fragment, typename)) {
          fragment.selectionSet.selections.forEach(workSet.add, workSet);
        }
      }
    });
    finalResult.result = utilities.mergeDeepArray(objectsToMerge);

    if (true) {
      Object.freeze(finalResult.result);
    }

    this.knownResults.set(finalResult.result, selectionSet);
    return finalResult;
  };

  StoreReader.prototype.execSubSelectedArrayImpl = function (_a) {
    var _this = this;

    var field = _a.field,
        array = _a.array,
        context = _a.context;
    var missing;

    function handleMissing(childResult, i) {
      if (childResult.missing) {
        missing = missing || [];
        missing.push.apply(missing, childResult.missing);
      }

      tsInvariant.invariant(context.path.pop() === i);
      return childResult.result;
    }

    if (field.selectionSet) {
      array = array.filter(context.store.canRead);
    }

    array = array.map(function (item, i) {
      if (item === null) {
        return null;
      }

      context.path.push(i);

      if (Array.isArray(item)) {
        return handleMissing(_this.executeSubSelectedArray({
          field: field,
          array: item,
          context: context
        }), i);
      }

      if (field.selectionSet) {
        return handleMissing(_this.executeSelectionSet({
          selectionSet: field.selectionSet,
          objectOrReference: item,
          context: context
        }), i);
      }

      if (true) {
        assertSelectionSetForIdValue(context.store, field, item);
      }

      tsInvariant.invariant(context.path.pop() === i);
      return item;
    });

    if (true) {
      Object.freeze(array);
    }

    return {
      result: array,
      missing: missing
    };
  };

  return StoreReader;
}();

function assertSelectionSetForIdValue(store, field, fieldValue) {
  if (!field.selectionSet) {
    var workSet_1 = new Set([fieldValue]);
    workSet_1.forEach(function (value) {
      if (value && typeof value === "object") {
         false ? undefined : tsInvariant.invariant(!utilities.isReference(value), "Missing selection set for object of type " + getTypenameFromStoreObject(store, value) + " returned for query field " + field.name.value);
        Object.values(value).forEach(workSet_1.add, workSet_1);
      }
    });
  }
}

var StoreWriter = function () {
  function StoreWriter(cache, reader) {
    this.cache = cache;
    this.reader = reader;
  }

  StoreWriter.prototype.writeToStore = function (_a) {
    var query = _a.query,
        result = _a.result,
        dataId = _a.dataId,
        store = _a.store,
        variables = _a.variables;
    var operationDefinition = utilities.getOperationDefinition(query);
    var merger = makeProcessedFieldsMerger();
    variables = tslib.__assign(tslib.__assign({}, utilities.getDefaultValues(operationDefinition)), variables);
    var ref = this.processSelectionSet({
      result: result || Object.create(null),
      dataId: dataId,
      selectionSet: operationDefinition.selectionSet,
      context: {
        store: store,
        written: Object.create(null),
        merge: function (existing, incoming) {
          return merger.merge(existing, incoming);
        },
        variables: variables,
        varString: JSON.stringify(variables),
        fragmentMap: utilities.createFragmentMap(utilities.getFragmentDefinitions(query))
      }
    });

    if (!utilities.isReference(ref)) {
      throw  false ? undefined : new tsInvariant.InvariantError("Could not identify object " + JSON.stringify(result));
    }

    store.retain(ref.__ref);
    return ref;
  };

  StoreWriter.prototype.processSelectionSet = function (_a) {
    var _this = this;

    var dataId = _a.dataId,
        result = _a.result,
        selectionSet = _a.selectionSet,
        context = _a.context,
        _b = _a.out,
        out = _b === void 0 ? {
      shouldApplyMerges: false
    } : _b;
    var policies = this.cache.policies;

    var _c = policies.identify(result, selectionSet, context.fragmentMap),
        id = _c[0],
        keyObject = _c[1];

    dataId = dataId || id;

    if ("string" === typeof dataId) {
      var sets = context.written[dataId] || (context.written[dataId] = []);
      var ref = utilities.makeReference(dataId);
      if (sets.indexOf(selectionSet) >= 0) return ref;
      sets.push(selectionSet);

      if (this.reader && this.reader.isFresh(result, ref, selectionSet, context)) {
        return ref;
      }
    }

    var mergedFields = Object.create(null);

    if (keyObject) {
      mergedFields = context.merge(mergedFields, keyObject);
    }

    var typename = dataId && policies.rootTypenamesById[dataId] || utilities.getTypenameFromResult(result, selectionSet, context.fragmentMap) || dataId && context.store.get(dataId, "__typename");

    if ("string" === typeof typename) {
      mergedFields.__typename = typename;
    }

    var workSet = new Set(selectionSet.selections);
    workSet.forEach(function (selection) {
      var _a;

      if (!utilities.shouldInclude(selection, context.variables)) return;

      if (utilities.isField(selection)) {
        var resultFieldKey = utilities.resultKeyNameFromField(selection);
        var value = result[resultFieldKey];

        if (typeof value !== 'undefined') {
          var storeFieldName = policies.getStoreFieldName({
            typename: typename,
            fieldName: selection.name.value,
            field: selection,
            variables: context.variables
          });

          var incomingValue = _this.processFieldValue(value, selection, context, out);

          if (policies.hasMergeFunction(typename, selection.name.value)) {
            incomingValue = {
              __field: selection,
              __typename: typename,
              __value: incomingValue
            };
            out.shouldApplyMerges = true;
          }

          mergedFields = context.merge(mergedFields, (_a = {}, _a[storeFieldName] = incomingValue, _a));
        } else if (policies.usingPossibleTypes && !utilities.hasDirectives(["defer", "client"], selection)) {
          throw  false ? undefined : new tsInvariant.InvariantError("Missing field '" + resultFieldKey + "' in " + JSON.stringify(result, null, 2).substring(0, 100));
        }
      } else {
        var fragment = utilities.getFragmentFromSelection(selection, context.fragmentMap);

        if (fragment && policies.fragmentMatches(fragment, typename, result, context.variables)) {
          fragment.selectionSet.selections.forEach(workSet.add, workSet);
        }
      }
    });

    if ("string" === typeof dataId) {
      var entityRef_1 = utilities.makeReference(dataId);

      if (out.shouldApplyMerges) {
        mergedFields = policies.applyMerges(entityRef_1, mergedFields, context);
      }

      if (true) {
        Object.keys(mergedFields).forEach(function (storeFieldName) {
          var fieldName = fieldNameFromStoreName(storeFieldName);

          if (!policies.hasMergeFunction(typename, fieldName)) {
            warnAboutDataLoss(entityRef_1, mergedFields, storeFieldName, context.store);
          }
        });
      }

      context.store.merge(dataId, mergedFields);
      return entityRef_1;
    }

    return mergedFields;
  };

  StoreWriter.prototype.processFieldValue = function (value, field, context, out) {
    var _this = this;

    if (!field.selectionSet || value === null) {
      return  false ? undefined : utilities.cloneDeep(value);
    }

    if (Array.isArray(value)) {
      return value.map(function (item) {
        return _this.processFieldValue(item, field, context, out);
      });
    }

    return this.processSelectionSet({
      result: value,
      selectionSet: field.selectionSet,
      context: context,
      out: out
    });
  };

  return StoreWriter;
}();

var warnings = new Set();

function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
  var getChild = function (objOrRef) {
    var child = store.getFieldValue(objOrRef, storeFieldName);
    return typeof child === "object" && child;
  };

  var existing = getChild(existingRef);
  if (!existing) return;
  var incoming = getChild(incomingObj);
  if (!incoming) return;
  if (utilities.isReference(existing)) return;
  if (equality.equal(existing, incoming)) return;

  if (Object.keys(existing).every(function (key) {
    return store.getFieldValue(incoming, key) !== void 0;
  })) {
    return;
  }

  var parentType = store.getFieldValue(existingRef, "__typename") || store.getFieldValue(incomingObj, "__typename");
  var fieldName = fieldNameFromStoreName(storeFieldName);
  var typeDotName = parentType + "." + fieldName;
  if (warnings.has(typeDotName)) return;
  warnings.add(typeDotName);
  var childTypenames = [];

  if (!Array.isArray(existing) && !Array.isArray(incoming)) {
    [existing, incoming].forEach(function (child) {
      var typename = store.getFieldValue(child, "__typename");

      if (typeof typename === "string" && !childTypenames.includes(typename)) {
        childTypenames.push(typename);
      }
    });
  }

   false || tsInvariant.invariant.warn("Cache data may be lost when replacing the " + fieldName + " field of a " + parentType + " object.\n\nTo address this problem (which is not a bug in Apollo Client), " + (childTypenames.length ? "either ensure all objects of type " + childTypenames.join(" and ") + " have IDs, or " : "") + "define a custom merge function for the " + typeDotName + " field, so InMemoryCache can safely merge these objects:\n\n  existing: " + JSON.stringify(existing).slice(0, 1000) + "\n  incoming: " + JSON.stringify(incoming).slice(0, 1000) + "\n\nFor more information about these options, please refer to the documentation:\n\n  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers\n  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects\n");
}

var varDep = optimism.dep();
var cacheSlot = new context.Slot();

function consumeAndIterate(set, callback) {
  var items = [];
  set.forEach(function (item) {
    return items.push(item);
  });
  set.clear();
  items.forEach(callback);
}

function makeVar(value) {
  var caches = new Set();
  var listeners = new Set();

  var rv = function (newValue) {
    if (arguments.length > 0) {
      if (value !== newValue) {
        value = newValue;
        varDep.dirty(rv);
        caches.forEach(broadcast);
        consumeAndIterate(listeners, function (listener) {
          return listener(value);
        });
      }
    } else {
      var cache = cacheSlot.getValue();
      if (cache) caches.add(cache);
      varDep(rv);
    }

    return value;
  };

  rv.onNextChange = function (listener) {
    listeners.add(listener);
    return function () {
      listeners.delete(listener);
    };
  };

  return rv;
}

function broadcast(cache) {
  if (cache.broadcastWatches) {
    cache.broadcastWatches();
  }
}

function argsFromFieldSpecifier(spec) {
  return spec.args !== void 0 ? spec.args : spec.field ? utilities.argumentsObjectFromField(spec.field, spec.variables) : null;
}

var defaultDataIdFromObject = function (_a, context) {
  var __typename = _a.__typename,
      id = _a.id,
      _id = _a._id;

  if (typeof __typename === "string") {
    if (context) {
      context.keyObject = id !== void 0 ? {
        id: id
      } : _id !== void 0 ? {
        _id: _id
      } : void 0;
    }

    if (id === void 0) id = _id;

    if (id !== void 0) {
      return __typename + ":" + (typeof id === "number" || typeof id === "string" ? id : JSON.stringify(id));
    }
  }
};

var nullKeyFieldsFn = function () {
  return void 0;
};

var simpleKeyArgsFn = function (_args, context) {
  return context.fieldName;
};

var mergeTrueFn = function (existing, incoming, _a) {
  var mergeObjects = _a.mergeObjects;
  return mergeObjects(existing, incoming);
};

var mergeFalseFn = function (_, incoming) {
  return incoming;
};

var Policies = function () {
  function Policies(config) {
    this.config = config;
    this.typePolicies = Object.create(null);
    this.supertypeMap = new Map();
    this.fuzzySubtypes = new Map();
    this.rootIdsByTypename = Object.create(null);
    this.rootTypenamesById = Object.create(null);
    this.usingPossibleTypes = false;
    this.config = tslib.__assign({
      dataIdFromObject: defaultDataIdFromObject
    }, config);
    this.cache = this.config.cache;
    this.setRootTypename("Query");
    this.setRootTypename("Mutation");
    this.setRootTypename("Subscription");

    if (config.possibleTypes) {
      this.addPossibleTypes(config.possibleTypes);
    }

    if (config.typePolicies) {
      this.addTypePolicies(config.typePolicies);
    }
  }

  Policies.prototype.identify = function (object, selectionSet, fragmentMap) {
    var typename = selectionSet && fragmentMap ? utilities.getTypenameFromResult(object, selectionSet, fragmentMap) : object.__typename;

    if (typename === this.rootTypenamesById.ROOT_QUERY) {
      return ["ROOT_QUERY"];
    }

    var context = {
      typename: typename,
      selectionSet: selectionSet,
      fragmentMap: fragmentMap
    };
    var id;
    var policy = this.getTypePolicy(typename, false);
    var keyFn = policy && policy.keyFn || this.config.dataIdFromObject;

    while (keyFn) {
      var specifierOrId = keyFn(object, context);

      if (Array.isArray(specifierOrId)) {
        keyFn = keyFieldsFnFromSpecifier(specifierOrId);
      } else {
        id = specifierOrId;
        break;
      }
    }

    id = id && String(id);
    return context.keyObject ? [id, context.keyObject] : [id];
  };

  Policies.prototype.addTypePolicies = function (typePolicies) {
    var _this = this;

    Object.keys(typePolicies).forEach(function (typename) {
      var existing = _this.getTypePolicy(typename, true);

      var incoming = typePolicies[typename];
      var keyFields = incoming.keyFields,
          fields = incoming.fields;
      if (incoming.queryType) _this.setRootTypename("Query", typename);
      if (incoming.mutationType) _this.setRootTypename("Mutation", typename);
      if (incoming.subscriptionType) _this.setRootTypename("Subscription", typename);
      existing.keyFn = keyFields === false ? nullKeyFieldsFn : Array.isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) : typeof keyFields === "function" ? keyFields : existing.keyFn;

      if (fields) {
        Object.keys(fields).forEach(function (fieldName) {
          var existing = _this.getFieldPolicy(typename, fieldName, true);

          var incoming = fields[fieldName];

          if (typeof incoming === "function") {
            existing.read = incoming;
          } else {
            var keyArgs = incoming.keyArgs,
                read = incoming.read,
                merge = incoming.merge;
            existing.keyFn = keyArgs === false ? simpleKeyArgsFn : Array.isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) : typeof keyArgs === "function" ? keyArgs : existing.keyFn;
            if (typeof read === "function") existing.read = read;
            existing.merge = typeof merge === "function" ? merge : merge === true ? mergeTrueFn : merge === false ? mergeFalseFn : existing.merge;
          }

          if (existing.read && existing.merge) {
            existing.keyFn = existing.keyFn || simpleKeyArgsFn;
          }
        });
      }
    });
  };

  Policies.prototype.setRootTypename = function (which, typename) {
    if (typename === void 0) {
      typename = which;
    }

    var rootId = "ROOT_" + which.toUpperCase();
    var old = this.rootTypenamesById[rootId];

    if (typename !== old) {
       false ? undefined : tsInvariant.invariant(!old || old === which, "Cannot change root " + which + " __typename more than once");
      if (old) delete this.rootIdsByTypename[old];
      this.rootIdsByTypename[typename] = rootId;
      this.rootTypenamesById[rootId] = typename;
    }
  };

  Policies.prototype.addPossibleTypes = function (possibleTypes) {
    var _this = this;

    this.usingPossibleTypes = true;
    Object.keys(possibleTypes).forEach(function (supertype) {
      _this.getSupertypeSet(supertype, true);

      possibleTypes[supertype].forEach(function (subtype) {
        _this.getSupertypeSet(subtype, true).add(supertype);

        var match = subtype.match(TypeOrFieldNameRegExp);

        if (!match || match[0] !== subtype) {
          _this.fuzzySubtypes.set(subtype, new RegExp(subtype));
        }
      });
    });
  };

  Policies.prototype.getTypePolicy = function (typename, createIfMissing) {
    if (typename) {
      return this.typePolicies[typename] || createIfMissing && (this.typePolicies[typename] = Object.create(null));
    }
  };

  Policies.prototype.getFieldPolicy = function (typename, fieldName, createIfMissing) {
    var typePolicy = this.getTypePolicy(typename, createIfMissing);

    if (typePolicy) {
      var fieldPolicies = typePolicy.fields || createIfMissing && (typePolicy.fields = Object.create(null));

      if (fieldPolicies) {
        return fieldPolicies[fieldName] || createIfMissing && (fieldPolicies[fieldName] = Object.create(null));
      }
    }
  };

  Policies.prototype.getSupertypeSet = function (subtype, createIfMissing) {
    var supertypeSet = this.supertypeMap.get(subtype);

    if (!supertypeSet && createIfMissing) {
      this.supertypeMap.set(subtype, supertypeSet = new Set());
    }

    return supertypeSet;
  };

  Policies.prototype.fragmentMatches = function (fragment, typename, result, variables) {
    var _this = this;

    if (!fragment.typeCondition) return true;
    if (!typename) return false;
    var supertype = fragment.typeCondition.name.value;
    if (typename === supertype) return true;

    if (this.usingPossibleTypes && this.supertypeMap.has(supertype)) {
      var typenameSupertypeSet = this.getSupertypeSet(typename, true);
      var workQueue_1 = [typenameSupertypeSet];

      var maybeEnqueue_1 = function (subtype) {
        var supertypeSet = _this.getSupertypeSet(subtype, false);

        if (supertypeSet && supertypeSet.size && workQueue_1.indexOf(supertypeSet) < 0) {
          workQueue_1.push(supertypeSet);
        }
      };

      var needToCheckFuzzySubtypes = !!(result && this.fuzzySubtypes.size);
      var checkingFuzzySubtypes = false;

      for (var i = 0; i < workQueue_1.length; ++i) {
        var supertypeSet = workQueue_1[i];

        if (supertypeSet.has(supertype)) {
          if (!typenameSupertypeSet.has(supertype)) {
            if (checkingFuzzySubtypes) {
               false || tsInvariant.invariant.warn("Inferring subtype " + typename + " of supertype " + supertype);
            }

            typenameSupertypeSet.add(supertype);
          }

          return true;
        }

        supertypeSet.forEach(maybeEnqueue_1);

        if (needToCheckFuzzySubtypes && i === workQueue_1.length - 1 && selectionSetMatchesResult(fragment.selectionSet, result, variables)) {
          needToCheckFuzzySubtypes = false;
          checkingFuzzySubtypes = true;
          this.fuzzySubtypes.forEach(function (regExp, fuzzyString) {
            var match = typename.match(regExp);

            if (match && match[0] === typename) {
              maybeEnqueue_1(fuzzyString);
            }
          });
        }
      }
    }

    return false;
  };

  Policies.prototype.getStoreFieldName = function (fieldSpec) {
    var typename = fieldSpec.typename,
        fieldName = fieldSpec.fieldName;
    var policy = this.getFieldPolicy(typename, fieldName, false);
    var storeFieldName;
    var keyFn = policy && policy.keyFn;

    if (keyFn && typename) {
      var context = {
        typename: typename,
        fieldName: fieldName,
        field: fieldSpec.field || null,
        variables: fieldSpec.variables
      };
      var args = argsFromFieldSpecifier(fieldSpec);

      while (keyFn) {
        var specifierOrString = keyFn(args, context);

        if (Array.isArray(specifierOrString)) {
          keyFn = keyArgsFnFromSpecifier(specifierOrString);
        } else {
          storeFieldName = specifierOrString || fieldName;
          break;
        }
      }
    }

    if (storeFieldName === void 0) {
      storeFieldName = fieldSpec.field ? utilities.storeKeyNameFromField(fieldSpec.field, fieldSpec.variables) : utilities.getStoreKeyName(fieldName, argsFromFieldSpecifier(fieldSpec));
    }

    return fieldName === fieldNameFromStoreName(storeFieldName) ? storeFieldName : fieldName + ":" + storeFieldName;
  };

  Policies.prototype.readField = function (options, context) {
    var objectOrReference = options.from;
    if (!objectOrReference) return;
    var nameOrField = options.field || options.fieldName;
    if (!nameOrField) return;

    if (options.typename === void 0) {
      var typename = context.store.getFieldValue(objectOrReference, "__typename");
      if (typename) options.typename = typename;
    }

    var storeFieldName = this.getStoreFieldName(options);
    var fieldName = fieldNameFromStoreName(storeFieldName);
    var existing = context.store.getFieldValue(objectOrReference, storeFieldName);
    var policy = this.getFieldPolicy(options.typename, fieldName, false);
    var read = policy && policy.read;

    if (read) {
      var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, context.store.getStorage(utilities.isReference(objectOrReference) ? objectOrReference.__ref : objectOrReference, storeFieldName));
      return cacheSlot.withValue(this.cache, read, [existing, readOptions]);
    }

    return existing;
  };

  Policies.prototype.hasMergeFunction = function (typename, fieldName) {
    var policy = this.getFieldPolicy(typename, fieldName, false);
    return !!(policy && policy.merge);
  };

  Policies.prototype.applyMerges = function (existing, incoming, context, storageKeys) {
    var _a;

    var _this = this;

    if (isFieldValueToBeMerged(incoming)) {
      var field = incoming.__field;
      var fieldName = field.name.value;
      var merge = this.getFieldPolicy(incoming.__typename, fieldName, false).merge;
      incoming = merge(existing, incoming.__value, makeFieldFunctionOptions(this, void 0, {
        typename: incoming.__typename,
        fieldName: fieldName,
        field: field,
        variables: context.variables
      }, context, storageKeys ? (_a = context.store).getStorage.apply(_a, storageKeys) : Object.create(null)));
    }

    if (Array.isArray(incoming)) {
      return incoming.map(function (item) {
        return _this.applyMerges(void 0, item, context);
      });
    }

    if (storeValueIsStoreObject(incoming)) {
      var e_1 = existing;
      var i_1 = incoming;
      var firstStorageKey_1 = utilities.isReference(e_1) ? e_1.__ref : typeof e_1 === "object" && e_1;
      var newFields_1;
      Object.keys(i_1).forEach(function (storeFieldName) {
        var incomingValue = i_1[storeFieldName];

        var appliedValue = _this.applyMerges(context.store.getFieldValue(e_1, storeFieldName), incomingValue, context, firstStorageKey_1 ? [firstStorageKey_1, storeFieldName] : void 0);

        if (appliedValue !== incomingValue) {
          newFields_1 = newFields_1 || Object.create(null);
          newFields_1[storeFieldName] = appliedValue;
        }
      });

      if (newFields_1) {
        return tslib.__assign(tslib.__assign({}, i_1), newFields_1);
      }
    }

    return incoming;
  };

  return Policies;
}();

function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
  var storeFieldName = policies.getStoreFieldName(fieldSpec);
  var fieldName = fieldNameFromStoreName(storeFieldName);
  var variables = fieldSpec.variables || context.variables;
  var _a = context.store,
      getFieldValue = _a.getFieldValue,
      toReference = _a.toReference,
      canRead = _a.canRead;
  return {
    args: argsFromFieldSpecifier(fieldSpec),
    field: fieldSpec.field || null,
    fieldName: fieldName,
    storeFieldName: storeFieldName,
    variables: variables,
    isReference: utilities.isReference,
    toReference: toReference,
    storage: storage,
    cache: policies.cache,
    canRead: canRead,
    readField: function (fieldNameOrOptions, from) {
      var options = typeof fieldNameOrOptions === "string" ? {
        fieldName: fieldNameOrOptions,
        from: from
      } : tslib.__assign({}, fieldNameOrOptions);

      if (void 0 === options.from) {
        options.from = objectOrReference;
      }

      if (void 0 === options.variables) {
        options.variables = variables;
      }

      return policies.readField(options, context);
    },
    mergeObjects: function (existing, incoming) {
      if (Array.isArray(existing) || Array.isArray(incoming)) {
        throw  false ? undefined : new tsInvariant.InvariantError("Cannot automatically merge arrays");
      }

      if (existing && typeof existing === "object" && incoming && typeof incoming === "object") {
        var eType = getFieldValue(existing, "__typename");
        var iType = getFieldValue(incoming, "__typename");
        var typesDiffer = eType && iType && eType !== iType;
        var applied = policies.applyMerges(typesDiffer ? void 0 : existing, incoming, context);

        if (typesDiffer || !storeValueIsStoreObject(existing) || !storeValueIsStoreObject(applied)) {
          return applied;
        }

        return tslib.__assign(tslib.__assign({}, existing), applied);
      }

      return incoming;
    }
  };
}

function keyArgsFnFromSpecifier(specifier) {
  return function (args, context) {
    return args ? context.fieldName + ":" + JSON.stringify(computeKeyObject(args, specifier)) : context.fieldName;
  };
}

function keyFieldsFnFromSpecifier(specifier) {
  var trie = new optimism.KeyTrie(utilities.canUseWeakMap);
  return function (object, context) {
    var aliasMap;

    if (context.selectionSet && context.fragmentMap) {
      var info = trie.lookupArray([context.selectionSet, context.fragmentMap]);
      aliasMap = info.aliasMap || (info.aliasMap = makeAliasMap(context.selectionSet, context.fragmentMap));
    }

    var keyObject = context.keyObject = computeKeyObject(object, specifier, aliasMap);
    return context.typename + ":" + JSON.stringify(keyObject);
  };
}

function makeAliasMap(selectionSet, fragmentMap) {
  var map = Object.create(null);
  var workQueue = new Set([selectionSet]);
  workQueue.forEach(function (selectionSet) {
    selectionSet.selections.forEach(function (selection) {
      if (utilities.isField(selection)) {
        if (selection.alias) {
          var responseKey = selection.alias.value;
          var storeKey = selection.name.value;

          if (storeKey !== responseKey) {
            var aliases = map.aliases || (map.aliases = Object.create(null));
            aliases[storeKey] = responseKey;
          }
        }

        if (selection.selectionSet) {
          var subsets = map.subsets || (map.subsets = Object.create(null));
          subsets[selection.name.value] = makeAliasMap(selection.selectionSet, fragmentMap);
        }
      } else {
        var fragment = utilities.getFragmentFromSelection(selection, fragmentMap);

        if (fragment) {
          workQueue.add(fragment.selectionSet);
        }
      }
    });
  });
  return map;
}

function computeKeyObject(response, specifier, aliasMap) {
  var keyObj = Object.create(null);
  var prevKey;
  specifier.forEach(function (s) {
    if (Array.isArray(s)) {
      if (typeof prevKey === "string") {
        var subsets = aliasMap && aliasMap.subsets;
        var subset = subsets && subsets[prevKey];
        keyObj[prevKey] = computeKeyObject(response[prevKey], s, subset);
      }
    } else {
      var aliases = aliasMap && aliasMap.aliases;
      var responseName = aliases && aliases[s] || s;
       false ? undefined : tsInvariant.invariant(hasOwn.call(response, responseName), "Missing field '" + responseName + "' while computing key fields");
      keyObj[prevKey = s] = response[responseName];
    }
  });
  return keyObj;
}

var defaultConfig = {
  dataIdFromObject: defaultDataIdFromObject,
  addTypename: true,
  resultCaching: true,
  typePolicies: {}
};

var InMemoryCache = function (_super) {
  tslib.__extends(InMemoryCache, _super);

  function InMemoryCache(config) {
    if (config === void 0) {
      config = {};
    }

    var _this = _super.call(this) || this;

    _this.watches = new Set();
    _this.typenameDocumentCache = new Map();
    _this.makeVar = makeVar;
    _this.txCount = 0;
    _this.maybeBroadcastWatch = optimism.wrap(function (c, fromOptimisticTransaction) {
      return _this.broadcastWatch.call(_this, c, !!fromOptimisticTransaction);
    }, {
      makeCacheKey: function (c) {
        var store = c.optimistic ? _this.optimisticData : _this.data;

        if (supportsResultCaching(store)) {
          var optimistic = c.optimistic,
              rootId = c.rootId,
              variables = c.variables;
          return store.makeCacheKey(c.query, c.callback, JSON.stringify({
            optimistic: optimistic,
            rootId: rootId,
            variables: variables
          }));
        }
      }
    });
    _this.watchDep = optimism.dep();
    _this.config = tslib.__assign(tslib.__assign({}, defaultConfig), config);
    _this.addTypename = !!_this.config.addTypename;
    _this.policies = new Policies({
      cache: _this,
      dataIdFromObject: _this.config.dataIdFromObject,
      possibleTypes: _this.config.possibleTypes,
      typePolicies: _this.config.typePolicies
    });
    _this.data = new EntityStore.Root({
      policies: _this.policies,
      resultCaching: _this.config.resultCaching
    });
    _this.optimisticData = _this.data;
    _this.storeWriter = new StoreWriter(_this, _this.storeReader = new StoreReader({
      cache: _this,
      addTypename: _this.addTypename
    }));
    return _this;
  }

  InMemoryCache.prototype.restore = function (data) {
    if (data) this.data.replace(data);
    return this;
  };

  InMemoryCache.prototype.extract = function (optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return (optimistic ? this.optimisticData : this.data).toObject();
  };

  InMemoryCache.prototype.read = function (options) {
    var store = options.optimistic ? this.optimisticData : this.data;

    if (typeof options.rootId === 'string' && !store.has(options.rootId)) {
      return null;
    }

    return this.storeReader.diffQueryAgainstStore({
      store: store,
      query: options.query,
      variables: options.variables,
      rootId: options.rootId,
      config: this.config,
      returnPartialData: false
    }).result || null;
  };

  InMemoryCache.prototype.write = function (options) {
    try {
      ++this.txCount;
      return this.storeWriter.writeToStore({
        store: this.data,
        query: options.query,
        result: options.result,
        dataId: options.dataId,
        variables: options.variables
      });
    } finally {
      if (! --this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };

  InMemoryCache.prototype.modify = function (options) {
    if (hasOwn.call(options, "id") && !options.id) {
      return false;
    }

    var store = options.optimistic ? this.optimisticData : this.data;

    try {
      ++this.txCount;
      return store.modify(options.id || "ROOT_QUERY", options.fields);
    } finally {
      if (! --this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };

  InMemoryCache.prototype.diff = function (options) {
    return this.storeReader.diffQueryAgainstStore({
      store: options.optimistic ? this.optimisticData : this.data,
      rootId: options.id || "ROOT_QUERY",
      query: options.query,
      variables: options.variables,
      returnPartialData: options.returnPartialData,
      config: this.config
    });
  };

  InMemoryCache.prototype.watch = function (watch) {
    var _this = this;

    this.watches.add(watch);

    if (watch.immediate) {
      this.maybeBroadcastWatch(watch);
    }

    return function () {
      _this.watches.delete(watch);

      _this.watchDep.dirty(watch);

      _this.maybeBroadcastWatch.forget(watch);
    };
  };

  InMemoryCache.prototype.gc = function () {
    return this.optimisticData.gc();
  };

  InMemoryCache.prototype.retain = function (rootId, optimistic) {
    return (optimistic ? this.optimisticData : this.data).retain(rootId);
  };

  InMemoryCache.prototype.release = function (rootId, optimistic) {
    return (optimistic ? this.optimisticData : this.data).release(rootId);
  };

  InMemoryCache.prototype.identify = function (object) {
    return utilities.isReference(object) ? object.__ref : this.policies.identify(object)[0];
  };

  InMemoryCache.prototype.evict = function (options) {
    if (!options.id) {
      if (hasOwn.call(options, "id")) {
        return false;
      }

      options = tslib.__assign(tslib.__assign({}, options), {
        id: "ROOT_QUERY"
      });
    }

    try {
      ++this.txCount;
      return this.optimisticData.evict(options);
    } finally {
      if (! --this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };

  InMemoryCache.prototype.reset = function () {
    this.data.clear();
    this.optimisticData = this.data;
    this.broadcastWatches();
    return Promise.resolve();
  };

  InMemoryCache.prototype.removeOptimistic = function (idToRemove) {
    var newOptimisticData = this.optimisticData.removeLayer(idToRemove);

    if (newOptimisticData !== this.optimisticData) {
      this.optimisticData = newOptimisticData;
      this.broadcastWatches();
    }
  };

  InMemoryCache.prototype.performTransaction = function (transaction, optimisticId) {
    var _this = this;

    var perform = function (layer) {
      var _a = _this,
          data = _a.data,
          optimisticData = _a.optimisticData;
      ++_this.txCount;

      if (layer) {
        _this.data = _this.optimisticData = layer;
      }

      try {
        transaction(_this);
      } finally {
        --_this.txCount;
        _this.data = data;
        _this.optimisticData = optimisticData;
      }
    };

    var fromOptimisticTransaction = false;

    if (typeof optimisticId === 'string') {
      this.optimisticData = this.optimisticData.addLayer(optimisticId, perform);
      fromOptimisticTransaction = true;
    } else if (optimisticId === null) {
      perform(this.data);
    } else {
      perform();
    }

    this.broadcastWatches(fromOptimisticTransaction);
  };

  InMemoryCache.prototype.transformDocument = function (document) {
    if (this.addTypename) {
      var result = this.typenameDocumentCache.get(document);

      if (!result) {
        result = utilities.addTypenameToDocument(document);
        this.typenameDocumentCache.set(document, result);
        this.typenameDocumentCache.set(result, result);
      }

      return result;
    }

    return document;
  };

  InMemoryCache.prototype.broadcastWatches = function (fromOptimisticTransaction) {
    var _this = this;

    if (!this.txCount) {
      this.watches.forEach(function (c) {
        return _this.maybeBroadcastWatch(c, fromOptimisticTransaction);
      });
    }
  };

  InMemoryCache.prototype.broadcastWatch = function (c, fromOptimisticTransaction) {
    this.watchDep.dirty(c);
    this.watchDep(c);
    var diff = this.diff({
      query: c.query,
      variables: c.variables,
      optimistic: c.optimistic
    });

    if (c.optimistic && fromOptimisticTransaction) {
      diff.fromOptimisticTransaction = true;
    }

    c.callback(diff);
  };

  return InMemoryCache;
}(ApolloCache);

exports.isReference = utilities.isReference;
exports.makeReference = utilities.makeReference;
exports.ApolloCache = ApolloCache;
exports.InMemoryCache = InMemoryCache;
exports.MissingFieldError = MissingFieldError;
exports.cacheSlot = cacheSlot;
exports.defaultDataIdFromObject = defaultDataIdFromObject;
exports.makeVar = makeVar;

/***/ }),

/***/ "./node_modules/@apollo/client/core/core.cjs.js":
/*!******************************************************!*\
  !*** ./node_modules/@apollo/client/core/core.cjs.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var core = __webpack_require__(/*! ../link/core */ "./node_modules/@apollo/client/link/core/core.cjs.js");

var utilities = __webpack_require__(/*! ../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

var http = __webpack_require__(/*! ../link/http */ "./node_modules/@apollo/client/link/http/http.cjs.js");

var equality = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/equality.js");

var errors = __webpack_require__(/*! ../errors */ "./node_modules/@apollo/client/errors/errors.cjs.js");

var visitor = __webpack_require__(/*! graphql/language/visitor */ "./node_modules/graphql/language/visitor.mjs");

var cache = __webpack_require__(/*! ../cache */ "./node_modules/@apollo/client/cache/cache.cjs.js");

var utils = __webpack_require__(/*! ../link/utils */ "./node_modules/@apollo/client/link/utils/utils.cjs.js");

var gql = _interopDefault(__webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/lib/graphql-tag.umd.js"));

var version = 'local';

var MutationStore = function () {
  function MutationStore() {
    this.store = {};
  }

  MutationStore.prototype.getStore = function () {
    return this.store;
  };

  MutationStore.prototype.get = function (mutationId) {
    return this.store[mutationId];
  };

  MutationStore.prototype.initMutation = function (mutationId, mutation, variables) {
    this.store[mutationId] = {
      mutation: mutation,
      variables: variables || {},
      loading: true,
      error: null
    };
  };

  MutationStore.prototype.markMutationError = function (mutationId, error) {
    var mutation = this.store[mutationId];

    if (mutation) {
      mutation.loading = false;
      mutation.error = error;
    }
  };

  MutationStore.prototype.markMutationResult = function (mutationId) {
    var mutation = this.store[mutationId];

    if (mutation) {
      mutation.loading = false;
      mutation.error = null;
    }
  };

  MutationStore.prototype.reset = function () {
    this.store = {};
  };

  return MutationStore;
}();

(function (NetworkStatus) {
  NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
  NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
  NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
  NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
  NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
  NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
  NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(exports.NetworkStatus || (exports.NetworkStatus = {}));

function isNetworkRequestInFlight(networkStatus) {
  return networkStatus ? networkStatus < 7 : false;
}

var Reobserver = function () {
  function Reobserver(observer, options, fetch, shouldFetch) {
    this.observer = observer;
    this.options = options;
    this.fetch = fetch;
    this.shouldFetch = shouldFetch;
  }

  Reobserver.prototype.reobserve = function (newOptions, newNetworkStatus) {
    if (newOptions) {
      this.updateOptions(newOptions);
    } else {
      this.updatePolling();
    }

    var concast = this.fetch(this.options, newNetworkStatus);

    if (this.concast) {
      this.concast.removeObserver(this.observer, true);
    }

    concast.addObserver(this.observer);
    return (this.concast = concast).promise;
  };

  Reobserver.prototype.updateOptions = function (newOptions) {
    Object.assign(this.options, utilities.compact(newOptions));
    this.updatePolling();
    return this;
  };

  Reobserver.prototype.stop = function () {
    if (this.concast) {
      this.concast.removeObserver(this.observer);
      delete this.concast;
    }

    if (this.pollingInfo) {
      clearTimeout(this.pollingInfo.timeout);
      this.options.pollInterval = 0;
      this.updatePolling();
    }
  };

  Reobserver.prototype.updatePolling = function () {
    var _this = this;

    var _a = this,
        pollingInfo = _a.pollingInfo,
        pollInterval = _a.options.pollInterval;

    if (!pollInterval) {
      if (pollingInfo) {
        clearTimeout(pollingInfo.timeout);
        delete this.pollingInfo;
      }

      return;
    }

    if (pollingInfo && pollingInfo.interval === pollInterval) {
      return;
    }

     false ? undefined : tsInvariant.invariant(pollInterval, 'Attempted to start a polling query without a polling interval.');

    if (this.shouldFetch === false) {
      return;
    }

    var info = pollingInfo || (this.pollingInfo = {});
    info.interval = pollInterval;

    var maybeFetch = function () {
      if (_this.pollingInfo) {
        if (_this.shouldFetch && _this.shouldFetch()) {
          _this.reobserve({
            fetchPolicy: "network-only",
            nextFetchPolicy: _this.options.fetchPolicy || "cache-first"
          }, exports.NetworkStatus.poll).then(poll, poll);
        } else {
          poll();
        }
      }
    };

    var poll = function () {
      var info = _this.pollingInfo;

      if (info) {
        clearTimeout(info.timeout);
        info.timeout = setTimeout(maybeFetch, info.interval);
      }
    };

    poll();
  };

  return Reobserver;
}();

var warnedAboutUpdateQuery = false;

var ObservableQuery = function (_super) {
  tslib.__extends(ObservableQuery, _super);

  function ObservableQuery(_a) {
    var queryManager = _a.queryManager,
        queryInfo = _a.queryInfo,
        options = _a.options;

    var _this = _super.call(this, function (observer) {
      return _this.onSubscribe(observer);
    }) || this;

    _this.observers = new Set();
    _this.subscriptions = new Set();
    _this.observer = {
      next: function (result) {
        if (_this.lastError || _this.isDifferentFromLastResult(result)) {
          _this.updateLastResult(result);

          utilities.iterateObserversSafely(_this.observers, 'next', result);
        }
      },
      error: function (error) {
        _this.updateLastResult(tslib.__assign(tslib.__assign({}, _this.lastResult), {
          error: error,
          errors: error.graphQLErrors,
          networkStatus: exports.NetworkStatus.error,
          loading: false
        }));

        utilities.iterateObserversSafely(_this.observers, 'error', _this.lastError = error);
      }
    };
    _this.isTornDown = false;
    _this.options = options;
    _this.queryId = queryManager.generateQueryId();
    var opDef = utilities.getOperationDefinition(options.query);
    _this.queryName = opDef && opDef.name && opDef.name.value;
    _this.queryManager = queryManager;
    _this.queryInfo = queryInfo;
    return _this;
  }

  Object.defineProperty(ObservableQuery.prototype, "variables", {
    get: function () {
      return this.options.variables;
    },
    enumerable: false,
    configurable: true
  });

  ObservableQuery.prototype.result = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var observer = {
        next: function (result) {
          resolve(result);

          _this.observers.delete(observer);

          if (!_this.observers.size) {
            _this.queryManager.removeQuery(_this.queryId);
          }

          setTimeout(function () {
            subscription.unsubscribe();
          }, 0);
        },
        error: reject
      };

      var subscription = _this.subscribe(observer);
    });
  };

  ObservableQuery.prototype.getCurrentResult = function (saveAsLastResult) {
    if (saveAsLastResult === void 0) {
      saveAsLastResult = true;
    }

    var lastResult = this.lastResult;
    var networkStatus = this.queryInfo.networkStatus || lastResult && lastResult.networkStatus || exports.NetworkStatus.ready;

    var result = tslib.__assign(tslib.__assign({}, lastResult), {
      loading: isNetworkRequestInFlight(networkStatus),
      networkStatus: networkStatus
    });

    if (this.isTornDown) {
      return result;
    }

    var _a = this.options.fetchPolicy,
        fetchPolicy = _a === void 0 ? 'cache-first' : _a;

    if (fetchPolicy === 'no-cache' || fetchPolicy === 'network-only') {
      delete result.partial;
    } else if (!result.data || !this.queryManager.transform(this.options.query).hasForcedResolvers) {
      var diff = this.queryInfo.getDiff();
      result.data = diff.complete || this.options.returnPartialData ? diff.result : void 0;

      if (diff.complete) {
        if (result.networkStatus === exports.NetworkStatus.loading && (fetchPolicy === 'cache-first' || fetchPolicy === 'cache-only')) {
          result.networkStatus = exports.NetworkStatus.ready;
          result.loading = false;
        }

        delete result.partial;
      } else {
        result.partial = true;
      }
    }

    if (saveAsLastResult) {
      this.updateLastResult(result);
    }

    return result;
  };

  ObservableQuery.prototype.isDifferentFromLastResult = function (newResult) {
    return !equality.equal(this.lastResultSnapshot, newResult);
  };

  ObservableQuery.prototype.getLastResult = function () {
    return this.lastResult;
  };

  ObservableQuery.prototype.getLastError = function () {
    return this.lastError;
  };

  ObservableQuery.prototype.resetLastResults = function () {
    delete this.lastResult;
    delete this.lastResultSnapshot;
    delete this.lastError;
    this.isTornDown = false;
  };

  ObservableQuery.prototype.resetQueryStoreErrors = function () {
    this.queryManager.resetErrors(this.queryId);
  };

  ObservableQuery.prototype.refetch = function (variables) {
    var reobserveOptions = {
      pollInterval: 0
    };
    var fetchPolicy = this.options.fetchPolicy;

    if (fetchPolicy !== 'no-cache' && fetchPolicy !== 'cache-and-network') {
      reobserveOptions.fetchPolicy = 'network-only';
      reobserveOptions.nextFetchPolicy = fetchPolicy || "cache-first";
    }

    if (variables && !equality.equal(this.options.variables, variables)) {
      reobserveOptions.variables = this.options.variables = tslib.__assign(tslib.__assign({}, this.options.variables), variables);
    }

    return this.newReobserver(false).reobserve(reobserveOptions, exports.NetworkStatus.refetch);
  };

  ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
    var _this = this;

    var combinedOptions = tslib.__assign(tslib.__assign({}, fetchMoreOptions.query ? fetchMoreOptions : tslib.__assign(tslib.__assign(tslib.__assign({}, this.options), fetchMoreOptions), {
      variables: tslib.__assign(tslib.__assign({}, this.options.variables), fetchMoreOptions.variables)
    })), {
      fetchPolicy: "no-cache"
    });

    var qid = this.queryManager.generateQueryId();

    if (combinedOptions.notifyOnNetworkStatusChange) {
      this.queryInfo.networkStatus = exports.NetworkStatus.fetchMore;
      this.observe();
    }

    return this.queryManager.fetchQuery(qid, combinedOptions, exports.NetworkStatus.fetchMore).then(function (fetchMoreResult) {
      var data = fetchMoreResult.data;
      var updateQuery = fetchMoreOptions.updateQuery;

      if (updateQuery) {
        if ( true && !warnedAboutUpdateQuery) {
           false || tsInvariant.invariant.warn("The updateQuery callback for fetchMore is deprecated, and will be removed\nin the next major version of Apollo Client.\n\nPlease convert updateQuery functions to field policies with appropriate\nread and merge functions, or use/adapt a helper function (such as\nconcatPagination, offsetLimitPagination, or relayStylePagination) from\n@apollo/client/utilities.\n\nThe field policy system handles pagination more effectively than a\nhand-written updateQuery function, and you only need to define the policy\nonce, rather than every time you call fetchMore.");
          warnedAboutUpdateQuery = true;
        }

        _this.updateQuery(function (previous) {
          return updateQuery(previous, {
            fetchMoreResult: data,
            variables: combinedOptions.variables
          });
        });
      } else {
        _this.queryManager.cache.writeQuery({
          query: combinedOptions.query,
          variables: combinedOptions.variables,
          data: data
        });
      }

      return fetchMoreResult;
    }).finally(function () {
      _this.queryManager.stopQuery(qid);

      _this.reobserve();
    });
  };

  ObservableQuery.prototype.subscribeToMore = function (options) {
    var _this = this;

    var subscription = this.queryManager.startGraphQLSubscription({
      query: options.document,
      variables: options.variables,
      context: options.context
    }).subscribe({
      next: function (subscriptionData) {
        var updateQuery = options.updateQuery;

        if (updateQuery) {
          _this.updateQuery(function (previous, _a) {
            var variables = _a.variables;
            return updateQuery(previous, {
              subscriptionData: subscriptionData,
              variables: variables
            });
          });
        }
      },
      error: function (err) {
        if (options.onError) {
          options.onError(err);
          return;
        }

         false || tsInvariant.invariant.error('Unhandled GraphQL subscription error', err);
      }
    });
    this.subscriptions.add(subscription);
    return function () {
      if (_this.subscriptions.delete(subscription)) {
        subscription.unsubscribe();
      }
    };
  };

  ObservableQuery.prototype.setOptions = function (newOptions) {
    return this.reobserve(newOptions);
  };

  ObservableQuery.prototype.setVariables = function (variables) {
    if (equality.equal(this.variables, variables)) {
      return this.observers.size ? this.result() : Promise.resolve();
    }

    this.options.variables = variables;

    if (!this.observers.size) {
      return Promise.resolve();
    }

    var _a = this.options.fetchPolicy,
        fetchPolicy = _a === void 0 ? 'cache-first' : _a;
    var reobserveOptions = {
      fetchPolicy: fetchPolicy,
      variables: variables
    };

    if (fetchPolicy !== 'cache-first' && fetchPolicy !== 'no-cache' && fetchPolicy !== 'network-only') {
      reobserveOptions.fetchPolicy = 'cache-and-network';
      reobserveOptions.nextFetchPolicy = fetchPolicy;
    }

    return this.reobserve(reobserveOptions, exports.NetworkStatus.setVariables);
  };

  ObservableQuery.prototype.updateQuery = function (mapFn) {
    var _a;

    var queryManager = this.queryManager;
    var result = queryManager.cache.diff({
      query: this.options.query,
      variables: this.variables,
      previousResult: (_a = this.lastResult) === null || _a === void 0 ? void 0 : _a.data,
      returnPartialData: true,
      optimistic: false
    }).result;
    var newResult = mapFn(result, {
      variables: this.variables
    });

    if (newResult) {
      queryManager.cache.writeQuery({
        query: this.options.query,
        data: newResult,
        variables: this.variables
      });
      queryManager.broadcastQueries();
    }
  };

  ObservableQuery.prototype.startPolling = function (pollInterval) {
    this.getReobserver().updateOptions({
      pollInterval: pollInterval
    });
  };

  ObservableQuery.prototype.stopPolling = function () {
    if (this.reobserver) {
      this.reobserver.updateOptions({
        pollInterval: 0
      });
    }
  };

  ObservableQuery.prototype.updateLastResult = function (newResult) {
    var previousResult = this.lastResult;
    this.lastResult = newResult;
    this.lastResultSnapshot = this.queryManager.assumeImmutableResults ? newResult : utilities.cloneDeep(newResult);

    if (!utilities.isNonEmptyArray(newResult.errors)) {
      delete this.lastError;
    }

    return previousResult;
  };

  ObservableQuery.prototype.onSubscribe = function (observer) {
    var _this = this;

    if (observer === this.observer) {
      return function () {};
    }

    try {
      var subObserver = observer._subscription._observer;

      if (subObserver && !subObserver.error) {
        subObserver.error = defaultSubscriptionObserverErrorCallback;
      }
    } catch (_a) {}

    var first = !this.observers.size;
    this.observers.add(observer);

    if (this.lastError) {
      observer.error && observer.error(this.lastError);
    } else if (this.lastResult) {
      observer.next && observer.next(this.lastResult);
    }

    if (first) {
      this.reobserve().catch(function (_) {});
    }

    return function () {
      if (_this.observers.delete(observer) && !_this.observers.size) {
        _this.tearDownQuery();
      }
    };
  };

  ObservableQuery.prototype.getReobserver = function () {
    return this.reobserver || (this.reobserver = this.newReobserver(true));
  };

  ObservableQuery.prototype.newReobserver = function (shareOptions) {
    var _this = this;

    var _a = this,
        queryManager = _a.queryManager,
        queryId = _a.queryId;

    queryManager.setObservableQuery(this);
    return new Reobserver(this.observer, shareOptions ? this.options : tslib.__assign({}, this.options), function (currentOptions, newNetworkStatus) {
      queryManager.setObservableQuery(_this);
      return queryManager.fetchQueryObservable(queryId, currentOptions, newNetworkStatus);
    }, !queryManager.ssrMode && function () {
      return !isNetworkRequestInFlight(_this.queryInfo.networkStatus);
    });
  };

  ObservableQuery.prototype.reobserve = function (newOptions, newNetworkStatus) {
    this.isTornDown = false;
    return this.getReobserver().reobserve(newOptions, newNetworkStatus);
  };

  ObservableQuery.prototype.observe = function () {
    this.observer.next(this.getCurrentResult(false));
  };

  ObservableQuery.prototype.hasObservers = function () {
    return this.observers.size > 0;
  };

  ObservableQuery.prototype.tearDownQuery = function () {
    var queryManager = this.queryManager;

    if (this.reobserver) {
      this.reobserver.stop();
      delete this.reobserver;
    }

    this.isTornDown = true;
    this.subscriptions.forEach(function (sub) {
      return sub.unsubscribe();
    });
    this.subscriptions.clear();
    queryManager.stopQuery(this.queryId);
    this.observers.clear();
  };

  return ObservableQuery;
}(utilities.Observable);

function defaultSubscriptionObserverErrorCallback(error) {
   false || tsInvariant.invariant.error('Unhandled error', error.message, error.stack);
}

var LocalState = function () {
  function LocalState(_a) {
    var cache = _a.cache,
        client = _a.client,
        resolvers = _a.resolvers,
        fragmentMatcher = _a.fragmentMatcher;
    this.cache = cache;

    if (client) {
      this.client = client;
    }

    if (resolvers) {
      this.addResolvers(resolvers);
    }

    if (fragmentMatcher) {
      this.setFragmentMatcher(fragmentMatcher);
    }
  }

  LocalState.prototype.addResolvers = function (resolvers) {
    var _this = this;

    this.resolvers = this.resolvers || {};

    if (Array.isArray(resolvers)) {
      resolvers.forEach(function (resolverGroup) {
        _this.resolvers = utilities.mergeDeep(_this.resolvers, resolverGroup);
      });
    } else {
      this.resolvers = utilities.mergeDeep(this.resolvers, resolvers);
    }
  };

  LocalState.prototype.setResolvers = function (resolvers) {
    this.resolvers = {};
    this.addResolvers(resolvers);
  };

  LocalState.prototype.getResolvers = function () {
    return this.resolvers || {};
  };

  LocalState.prototype.runResolvers = function (_a) {
    var document = _a.document,
        remoteResult = _a.remoteResult,
        context = _a.context,
        variables = _a.variables,
        _b = _a.onlyRunForcedResolvers,
        onlyRunForcedResolvers = _b === void 0 ? false : _b;
    return tslib.__awaiter(this, void 0, void 0, function () {
      return tslib.__generator(this, function (_c) {
        if (document) {
          return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function (localResult) {
            return tslib.__assign(tslib.__assign({}, remoteResult), {
              data: localResult.result
            });
          })];
        }

        return [2, remoteResult];
      });
    });
  };

  LocalState.prototype.setFragmentMatcher = function (fragmentMatcher) {
    this.fragmentMatcher = fragmentMatcher;
  };

  LocalState.prototype.getFragmentMatcher = function () {
    return this.fragmentMatcher;
  };

  LocalState.prototype.clientQuery = function (document) {
    if (utilities.hasDirectives(['client'], document)) {
      if (this.resolvers) {
        return document;
      }
    }

    return null;
  };

  LocalState.prototype.serverQuery = function (document) {
    return utilities.removeClientSetsFromDocument(document);
  };

  LocalState.prototype.prepareContext = function (context) {
    var cache = this.cache;
    return tslib.__assign(tslib.__assign({}, context), {
      cache: cache,
      getCacheKey: function (obj) {
        return cache.identify(obj);
      }
    });
  };

  LocalState.prototype.addExportedVariables = function (document, variables, context) {
    if (variables === void 0) {
      variables = {};
    }

    if (context === void 0) {
      context = {};
    }

    return tslib.__awaiter(this, void 0, void 0, function () {
      return tslib.__generator(this, function (_a) {
        if (document) {
          return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function (data) {
            return tslib.__assign(tslib.__assign({}, variables), data.exportedVariables);
          })];
        }

        return [2, tslib.__assign({}, variables)];
      });
    });
  };

  LocalState.prototype.shouldForceResolvers = function (document) {
    var forceResolvers = false;
    visitor.visit(document, {
      Directive: {
        enter: function (node) {
          if (node.name.value === 'client' && node.arguments) {
            forceResolvers = node.arguments.some(function (arg) {
              return arg.name.value === 'always' && arg.value.kind === 'BooleanValue' && arg.value.value === true;
            });

            if (forceResolvers) {
              return visitor.BREAK;
            }
          }
        }
      }
    });
    return forceResolvers;
  };

  LocalState.prototype.buildRootValueFromCache = function (document, variables) {
    return this.cache.diff({
      query: utilities.buildQueryFromSelectionSet(document),
      variables: variables,
      returnPartialData: true,
      optimistic: false
    }).result;
  };

  LocalState.prototype.resolveDocument = function (document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
    if (context === void 0) {
      context = {};
    }

    if (variables === void 0) {
      variables = {};
    }

    if (fragmentMatcher === void 0) {
      fragmentMatcher = function () {
        return true;
      };
    }

    if (onlyRunForcedResolvers === void 0) {
      onlyRunForcedResolvers = false;
    }

    return tslib.__awaiter(this, void 0, void 0, function () {
      var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a, cache, client, execContext;

      return tslib.__generator(this, function (_b) {
        mainDefinition = utilities.getMainDefinition(document);
        fragments = utilities.getFragmentDefinitions(document);
        fragmentMap = utilities.createFragmentMap(fragments);
        definitionOperation = mainDefinition.operation;
        defaultOperationType = definitionOperation ? definitionOperation.charAt(0).toUpperCase() + definitionOperation.slice(1) : 'Query';
        _a = this, cache = _a.cache, client = _a.client;
        execContext = {
          fragmentMap: fragmentMap,
          context: tslib.__assign(tslib.__assign({}, context), {
            cache: cache,
            client: client
          }),
          variables: variables,
          fragmentMatcher: fragmentMatcher,
          defaultOperationType: defaultOperationType,
          exportedVariables: {},
          onlyRunForcedResolvers: onlyRunForcedResolvers
        };
        return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function (result) {
          return {
            result: result,
            exportedVariables: execContext.exportedVariables
          };
        })];
      });
    });
  };

  LocalState.prototype.resolveSelectionSet = function (selectionSet, rootValue, execContext) {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var fragmentMap, context, variables, resultsToMerge, execute;

      var _this = this;

      return tslib.__generator(this, function (_a) {
        fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
        resultsToMerge = [rootValue];

        execute = function (selection) {
          return tslib.__awaiter(_this, void 0, void 0, function () {
            var fragment, typeCondition;
            return tslib.__generator(this, function (_a) {
              if (!utilities.shouldInclude(selection, variables)) {
                return [2];
              }

              if (utilities.isField(selection)) {
                return [2, this.resolveField(selection, rootValue, execContext).then(function (fieldResult) {
                  var _a;

                  if (typeof fieldResult !== 'undefined') {
                    resultsToMerge.push((_a = {}, _a[utilities.resultKeyNameFromField(selection)] = fieldResult, _a));
                  }
                })];
              }

              if (utilities.isInlineFragment(selection)) {
                fragment = selection;
              } else {
                fragment = fragmentMap[selection.name.value];
                 false ? undefined : tsInvariant.invariant(fragment, "No fragment named " + selection.name.value);
              }

              if (fragment && fragment.typeCondition) {
                typeCondition = fragment.typeCondition.name.value;

                if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                  return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function (fragmentResult) {
                    resultsToMerge.push(fragmentResult);
                  })];
                }
              }

              return [2];
            });
          });
        };

        return [2, Promise.all(selectionSet.selections.map(execute)).then(function () {
          return utilities.mergeDeepArray(resultsToMerge);
        })];
      });
    });
  };

  LocalState.prototype.resolveField = function (field, rootValue, execContext) {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;

      var _this = this;

      return tslib.__generator(this, function (_a) {
        variables = execContext.variables;
        fieldName = field.name.value;
        aliasedFieldName = utilities.resultKeyNameFromField(field);
        aliasUsed = fieldName !== aliasedFieldName;
        defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
        resultPromise = Promise.resolve(defaultResult);

        if (!execContext.onlyRunForcedResolvers || this.shouldForceResolvers(field)) {
          resolverType = rootValue.__typename || execContext.defaultOperationType;
          resolverMap = this.resolvers && this.resolvers[resolverType];

          if (resolverMap) {
            resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];

            if (resolve) {
              resultPromise = Promise.resolve(cache.cacheSlot.withValue(this.cache, resolve, [rootValue, utilities.argumentsObjectFromField(field, variables), execContext.context, {
                field: field,
                fragmentMap: execContext.fragmentMap
              }]));
            }
          }
        }

        return [2, resultPromise.then(function (result) {
          if (result === void 0) {
            result = defaultResult;
          }

          if (field.directives) {
            field.directives.forEach(function (directive) {
              if (directive.name.value === 'export' && directive.arguments) {
                directive.arguments.forEach(function (arg) {
                  if (arg.name.value === 'as' && arg.value.kind === 'StringValue') {
                    execContext.exportedVariables[arg.value.value] = result;
                  }
                });
              }
            });
          }

          if (!field.selectionSet) {
            return result;
          }

          if (result == null) {
            return result;
          }

          if (Array.isArray(result)) {
            return _this.resolveSubSelectedArray(field, result, execContext);
          }

          if (field.selectionSet) {
            return _this.resolveSelectionSet(field.selectionSet, result, execContext);
          }
        })];
      });
    });
  };

  LocalState.prototype.resolveSubSelectedArray = function (field, result, execContext) {
    var _this = this;

    return Promise.all(result.map(function (item) {
      if (item === null) {
        return null;
      }

      if (Array.isArray(item)) {
        return _this.resolveSubSelectedArray(field, item, execContext);
      }

      if (field.selectionSet) {
        return _this.resolveSelectionSet(field.selectionSet, item, execContext);
      }
    }));
  };

  return LocalState;
}();

var destructiveMethodCounts = new (utilities.canUseWeakMap ? WeakMap : Map)();

function wrapDestructiveCacheMethod(cache, methodName) {
  var original = cache[methodName];

  if (typeof original === "function") {
    cache[methodName] = function () {
      destructiveMethodCounts.set(cache, (destructiveMethodCounts.get(cache) + 1) % 1e15);
      return original.apply(this, arguments);
    };
  }
}

var QueryInfo = function () {
  function QueryInfo(cache) {
    this.cache = cache;
    this.listeners = new Set();
    this.document = null;
    this.lastRequestId = 1;
    this.subscriptions = new Set();
    this.dirty = false;
    this.diff = null;
    this.observableQuery = null;

    if (!destructiveMethodCounts.has(cache)) {
      destructiveMethodCounts.set(cache, 0);
      wrapDestructiveCacheMethod(cache, "evict");
      wrapDestructiveCacheMethod(cache, "modify");
      wrapDestructiveCacheMethod(cache, "reset");
    }
  }

  QueryInfo.prototype.init = function (query) {
    var networkStatus = query.networkStatus || exports.NetworkStatus.loading;

    if (this.variables && this.networkStatus !== exports.NetworkStatus.loading && !equality.equal(this.variables, query.variables)) {
      networkStatus = exports.NetworkStatus.setVariables;
    }

    if (!equality.equal(query.variables, this.variables)) {
      this.diff = null;
    }

    Object.assign(this, {
      document: query.document,
      variables: query.variables,
      networkError: null,
      graphQLErrors: this.graphQLErrors || [],
      networkStatus: networkStatus
    });

    if (query.observableQuery) {
      this.setObservableQuery(query.observableQuery);
    }

    if (query.lastRequestId) {
      this.lastRequestId = query.lastRequestId;
    }

    return this;
  };

  QueryInfo.prototype.getDiff = function (variables) {
    if (variables === void 0) {
      variables = this.variables;
    }

    if (this.diff && equality.equal(variables, this.variables)) {
      return this.diff;
    }

    this.updateWatch(this.variables = variables);
    return this.diff = this.cache.diff({
      query: this.document,
      variables: variables,
      returnPartialData: true,
      optimistic: true
    });
  };

  QueryInfo.prototype.setDiff = function (diff) {
    var _this = this;

    var oldDiff = this.diff;
    this.diff = diff;

    if (!this.dirty && (diff && diff.result) !== (oldDiff && oldDiff.result)) {
      this.dirty = true;

      if (!this.notifyTimeout) {
        this.notifyTimeout = setTimeout(function () {
          return _this.notify();
        }, 0);
      }
    }
  };

  QueryInfo.prototype.setObservableQuery = function (oq) {
    var _this = this;

    if (oq === this.observableQuery) return;

    if (this.oqListener) {
      this.listeners.delete(this.oqListener);
    }

    this.observableQuery = oq;

    if (oq) {
      oq["queryInfo"] = this;
      this.listeners.add(this.oqListener = function () {
        if (_this.getDiff().fromOptimisticTransaction) {
          oq["observe"]();
        } else {
          oq.reobserve();
        }
      });
    } else {
      delete this.oqListener;
    }
  };

  QueryInfo.prototype.notify = function () {
    var _this = this;

    if (this.notifyTimeout) {
      clearTimeout(this.notifyTimeout);
      this.notifyTimeout = void 0;
    }

    if (this.shouldNotify()) {
      this.listeners.forEach(function (listener) {
        return listener(_this);
      });
    }

    this.dirty = false;
  };

  QueryInfo.prototype.shouldNotify = function () {
    if (!this.dirty || !this.listeners.size) {
      return false;
    }

    if (isNetworkRequestInFlight(this.networkStatus) && this.observableQuery) {
      var fetchPolicy = this.observableQuery.options.fetchPolicy;

      if (fetchPolicy !== "cache-only" && fetchPolicy !== "cache-and-network") {
        return false;
      }
    }

    return true;
  };

  QueryInfo.prototype.stop = function () {
    this.cancel();
    delete this.cancel;
    var oq = this.observableQuery;
    if (oq) oq.stopPolling();
  };

  QueryInfo.prototype.cancel = function () {};

  QueryInfo.prototype.updateWatch = function (variables) {
    var _this = this;

    if (variables === void 0) {
      variables = this.variables;
    }

    var oq = this.observableQuery;

    if (oq && oq.options.fetchPolicy === "no-cache") {
      return;
    }

    if (!this.lastWatch || this.lastWatch.query !== this.document || !equality.equal(variables, this.lastWatch.variables)) {
      this.cancel();
      this.cancel = this.cache.watch(this.lastWatch = {
        query: this.document,
        variables: variables,
        optimistic: true,
        callback: function (diff) {
          return _this.setDiff(diff);
        }
      });
    }
  };

  QueryInfo.prototype.shouldWrite = function (result, variables) {
    var lastWrite = this.lastWrite;
    return !(lastWrite && lastWrite.dmCount === destructiveMethodCounts.get(this.cache) && equality.equal(variables, lastWrite.variables) && equality.equal(result.data, lastWrite.result.data));
  };

  QueryInfo.prototype.markResult = function (result, options, allowCacheWrite) {
    var _this = this;

    this.graphQLErrors = utilities.isNonEmptyArray(result.errors) ? result.errors : [];

    if (options.fetchPolicy === 'no-cache') {
      this.diff = {
        result: result.data,
        complete: true
      };
    } else if (allowCacheWrite) {
      if (shouldWriteResult(result, options.errorPolicy)) {
        this.cache.performTransaction(function (cache) {
          if (_this.shouldWrite(result, options.variables)) {
            cache.writeQuery({
              query: _this.document,
              data: result.data,
              variables: options.variables
            });
            _this.lastWrite = {
              result: result,
              variables: options.variables,
              dmCount: destructiveMethodCounts.get(_this.cache)
            };
          } else {
            if (_this.diff && _this.diff.complete) {
              result.data = _this.diff.result;
              return;
            }
          }

          var diff = cache.diff({
            query: _this.document,
            variables: options.variables,
            returnPartialData: true,
            optimistic: true
          });

          _this.updateWatch(options.variables);

          _this.diff = diff;

          if (diff.complete) {
            result.data = diff.result;
          }
        });
      } else {
        this.lastWrite = void 0;
      }
    }
  };

  QueryInfo.prototype.markReady = function () {
    this.networkError = null;
    return this.networkStatus = exports.NetworkStatus.ready;
  };

  QueryInfo.prototype.markError = function (error) {
    this.networkStatus = exports.NetworkStatus.error;
    this.lastWrite = void 0;

    if (error.graphQLErrors) {
      this.graphQLErrors = error.graphQLErrors;
    }

    if (error.networkError) {
      this.networkError = error.networkError;
    }

    return error;
  };

  return QueryInfo;
}();

function shouldWriteResult(result, errorPolicy) {
  if (errorPolicy === void 0) {
    errorPolicy = "none";
  }

  var ignoreErrors = errorPolicy === "ignore" || errorPolicy === "all";
  var writeWithErrors = !utilities.graphQLResultHasError(result);

  if (!writeWithErrors && ignoreErrors && result.data) {
    writeWithErrors = true;
  }

  return writeWithErrors;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var QueryManager = function () {
  function QueryManager(_a) {
    var cache = _a.cache,
        link = _a.link,
        _b = _a.queryDeduplication,
        queryDeduplication = _b === void 0 ? false : _b,
        _c = _a.onBroadcast,
        onBroadcast = _c === void 0 ? function () {
      return undefined;
    } : _c,
        _d = _a.ssrMode,
        ssrMode = _d === void 0 ? false : _d,
        _e = _a.clientAwareness,
        clientAwareness = _e === void 0 ? {} : _e,
        localState = _a.localState,
        assumeImmutableResults = _a.assumeImmutableResults;
    this.mutationStore = new MutationStore();
    this.clientAwareness = {};
    this.queries = new Map();
    this.fetchCancelFns = new Map();
    this.transformCache = new (utilities.canUseWeakMap ? WeakMap : Map)();
    this.queryIdCounter = 1;
    this.requestIdCounter = 1;
    this.mutationIdCounter = 1;
    this.inFlightLinkObservables = new Map();
    this.cache = cache;
    this.link = link;
    this.queryDeduplication = queryDeduplication;
    this.onBroadcast = onBroadcast;
    this.clientAwareness = clientAwareness;
    this.localState = localState || new LocalState({
      cache: cache
    });
    this.ssrMode = ssrMode;
    this.assumeImmutableResults = !!assumeImmutableResults;
  }

  QueryManager.prototype.stop = function () {
    var _this = this;

    this.queries.forEach(function (_info, queryId) {
      _this.stopQueryNoBroadcast(queryId);
    });
    this.cancelPendingFetches( false ? undefined : new tsInvariant.InvariantError('QueryManager stopped while query was in flight'));
  };

  QueryManager.prototype.cancelPendingFetches = function (error) {
    this.fetchCancelFns.forEach(function (cancel) {
      return cancel(error);
    });
    this.fetchCancelFns.clear();
  };

  QueryManager.prototype.mutate = function (_a) {
    var mutation = _a.mutation,
        variables = _a.variables,
        optimisticResponse = _a.optimisticResponse,
        updateQueriesByName = _a.updateQueries,
        _b = _a.refetchQueries,
        refetchQueries = _b === void 0 ? [] : _b,
        _c = _a.awaitRefetchQueries,
        awaitRefetchQueries = _c === void 0 ? false : _c,
        updateWithProxyFn = _a.update,
        _d = _a.errorPolicy,
        errorPolicy = _d === void 0 ? 'none' : _d,
        fetchPolicy = _a.fetchPolicy,
        _e = _a.context,
        context = _e === void 0 ? {} : _e;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var mutationId, generateUpdateQueriesInfo, optimistic_1, self;

      var _this = this;

      return tslib.__generator(this, function (_f) {
        switch (_f.label) {
          case 0:
             false ? undefined : tsInvariant.invariant(mutation, 'mutation option is required. You must specify your GraphQL document in the mutation option.');
             false ? undefined : tsInvariant.invariant(!fetchPolicy || fetchPolicy === 'no-cache', "Mutations only support a 'no-cache' fetchPolicy. If you don't want to disable the cache, remove your fetchPolicy setting to proceed with the default mutation behavior.");
            mutationId = this.generateMutationId();
            mutation = this.transform(mutation).document;
            variables = this.getVariables(mutation, variables);
            if (!this.transform(mutation).hasClientExports) return [3, 2];
            return [4, this.localState.addExportedVariables(mutation, variables, context)];

          case 1:
            variables = _f.sent();
            _f.label = 2;

          case 2:
            generateUpdateQueriesInfo = function () {
              var ret = {};

              if (updateQueriesByName) {
                _this.queries.forEach(function (_a, queryId) {
                  var observableQuery = _a.observableQuery;

                  if (observableQuery) {
                    var queryName = observableQuery.queryName;

                    if (queryName && hasOwnProperty.call(updateQueriesByName, queryName)) {
                      ret[queryId] = {
                        updater: updateQueriesByName[queryName],
                        queryInfo: _this.queries.get(queryId)
                      };
                    }
                  }
                });
              }

              return ret;
            };

            this.mutationStore.initMutation(mutationId, mutation, variables);

            if (optimisticResponse) {
              optimistic_1 = typeof optimisticResponse === 'function' ? optimisticResponse(variables) : optimisticResponse;
              this.cache.recordOptimisticTransaction(function (cache) {
                try {
                  markMutationResult({
                    mutationId: mutationId,
                    result: {
                      data: optimistic_1
                    },
                    document: mutation,
                    variables: variables,
                    errorPolicy: errorPolicy,
                    queryUpdatersById: generateUpdateQueriesInfo(),
                    update: updateWithProxyFn
                  }, cache);
                } catch (error) {
                   false || tsInvariant.invariant.error(error);
                }
              }, mutationId);
            }

            this.broadcastQueries();
            self = this;
            return [2, new Promise(function (resolve, reject) {
              var storeResult;
              var error;
              self.getObservableFromLink(mutation, tslib.__assign(tslib.__assign({}, context), {
                optimisticResponse: optimisticResponse
              }), variables, false).subscribe({
                next: function (result) {
                  if (utilities.graphQLResultHasError(result) && errorPolicy === 'none') {
                    error = new errors.ApolloError({
                      graphQLErrors: result.errors
                    });
                    return;
                  }

                  self.mutationStore.markMutationResult(mutationId);

                  if (fetchPolicy !== 'no-cache') {
                    try {
                      markMutationResult({
                        mutationId: mutationId,
                        result: result,
                        document: mutation,
                        variables: variables,
                        errorPolicy: errorPolicy,
                        queryUpdatersById: generateUpdateQueriesInfo(),
                        update: updateWithProxyFn
                      }, self.cache);
                    } catch (e) {
                      error = new errors.ApolloError({
                        networkError: e
                      });
                      return;
                    }
                  }

                  storeResult = result;
                },
                error: function (err) {
                  self.mutationStore.markMutationError(mutationId, err);

                  if (optimisticResponse) {
                    self.cache.removeOptimistic(mutationId);
                  }

                  self.broadcastQueries();
                  reject(new errors.ApolloError({
                    networkError: err
                  }));
                },
                complete: function () {
                  if (error) {
                    self.mutationStore.markMutationError(mutationId, error);
                  }

                  if (optimisticResponse) {
                    self.cache.removeOptimistic(mutationId);
                  }

                  self.broadcastQueries();

                  if (error) {
                    reject(error);
                    return;
                  }

                  if (typeof refetchQueries === 'function') {
                    refetchQueries = refetchQueries(storeResult);
                  }

                  var refetchQueryPromises = [];

                  if (utilities.isNonEmptyArray(refetchQueries)) {
                    refetchQueries.forEach(function (refetchQuery) {
                      if (typeof refetchQuery === 'string') {
                        self.queries.forEach(function (_a) {
                          var observableQuery = _a.observableQuery;

                          if (observableQuery && observableQuery.queryName === refetchQuery) {
                            refetchQueryPromises.push(observableQuery.refetch());
                          }
                        });
                      } else {
                        var queryOptions = {
                          query: refetchQuery.query,
                          variables: refetchQuery.variables,
                          fetchPolicy: 'network-only'
                        };

                        if (refetchQuery.context) {
                          queryOptions.context = refetchQuery.context;
                        }

                        refetchQueryPromises.push(self.query(queryOptions));
                      }
                    });
                  }

                  Promise.all(awaitRefetchQueries ? refetchQueryPromises : []).then(function () {
                    if (errorPolicy === 'ignore' && storeResult && utilities.graphQLResultHasError(storeResult)) {
                      delete storeResult.errors;
                    }

                    resolve(storeResult);
                  }, reject);
                }
              });
            })];
        }
      });
    });
  };

  QueryManager.prototype.fetchQuery = function (queryId, options, networkStatus) {
    return this.fetchQueryObservable(queryId, options, networkStatus).promise;
  };

  QueryManager.prototype.getQueryStore = function () {
    var store = Object.create(null);
    this.queries.forEach(function (info, queryId) {
      store[queryId] = {
        variables: info.variables,
        networkStatus: info.networkStatus,
        networkError: info.networkError,
        graphQLErrors: info.graphQLErrors
      };
    });
    return store;
  };

  QueryManager.prototype.resetErrors = function (queryId) {
    var queryInfo = this.queries.get(queryId);

    if (queryInfo) {
      queryInfo.networkError = undefined;
      queryInfo.graphQLErrors = [];
    }
  };

  QueryManager.prototype.transform = function (document) {
    var transformCache = this.transformCache;

    if (!transformCache.has(document)) {
      var transformed = this.cache.transformDocument(document);
      var forLink = utilities.removeConnectionDirectiveFromDocument(this.cache.transformForLink(transformed));
      var clientQuery = this.localState.clientQuery(transformed);
      var serverQuery = forLink && this.localState.serverQuery(forLink);
      var cacheEntry_1 = {
        document: transformed,
        hasClientExports: utilities.hasClientExports(transformed),
        hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
        clientQuery: clientQuery,
        serverQuery: serverQuery,
        defaultVars: utilities.getDefaultValues(utilities.getOperationDefinition(transformed))
      };

      var add = function (doc) {
        if (doc && !transformCache.has(doc)) {
          transformCache.set(doc, cacheEntry_1);
        }
      };

      add(document);
      add(transformed);
      add(clientQuery);
      add(serverQuery);
    }

    return transformCache.get(document);
  };

  QueryManager.prototype.getVariables = function (document, variables) {
    return tslib.__assign(tslib.__assign({}, this.transform(document).defaultVars), variables);
  };

  QueryManager.prototype.watchQuery = function (options) {
    options = tslib.__assign(tslib.__assign({}, options), {
      variables: this.getVariables(options.query, options.variables)
    });

    if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
      options.notifyOnNetworkStatusChange = false;
    }

    var queryInfo = new QueryInfo(this.cache);
    var observable = new ObservableQuery({
      queryManager: this,
      queryInfo: queryInfo,
      options: options
    });
    this.queries.set(observable.queryId, queryInfo);
    queryInfo.init({
      document: options.query,
      observableQuery: observable,
      variables: options.variables
    });
    return observable;
  };

  QueryManager.prototype.query = function (options) {
    var _this = this;

     false ? undefined : tsInvariant.invariant(options.query, 'query option is required. You must specify your GraphQL document ' + 'in the query option.');
     false ? undefined : tsInvariant.invariant(options.query.kind === 'Document', 'You must wrap the query string in a "gql" tag.');
     false ? undefined : tsInvariant.invariant(!options.returnPartialData, 'returnPartialData option only supported on watchQuery.');
     false ? undefined : tsInvariant.invariant(!options.pollInterval, 'pollInterval option only supported on watchQuery.');
    var queryId = this.generateQueryId();
    return this.fetchQuery(queryId, options).finally(function () {
      return _this.stopQuery(queryId);
    });
  };

  QueryManager.prototype.generateQueryId = function () {
    return String(this.queryIdCounter++);
  };

  QueryManager.prototype.generateRequestId = function () {
    return this.requestIdCounter++;
  };

  QueryManager.prototype.generateMutationId = function () {
    return String(this.mutationIdCounter++);
  };

  QueryManager.prototype.stopQueryInStore = function (queryId) {
    this.stopQueryInStoreNoBroadcast(queryId);
    this.broadcastQueries();
  };

  QueryManager.prototype.stopQueryInStoreNoBroadcast = function (queryId) {
    var queryInfo = this.queries.get(queryId);
    if (queryInfo) queryInfo.stop();
  };

  QueryManager.prototype.clearStore = function () {
    this.cancelPendingFetches( false ? undefined : new tsInvariant.InvariantError('Store reset while query was in flight (not completed in link chain)'));
    this.queries.forEach(function (queryInfo) {
      if (queryInfo.observableQuery) {
        queryInfo.networkStatus = exports.NetworkStatus.loading;
      } else {
        queryInfo.stop();
      }
    });
    this.mutationStore.reset();
    return this.cache.reset();
  };

  QueryManager.prototype.resetStore = function () {
    var _this = this;

    return this.clearStore().then(function () {
      return _this.reFetchObservableQueries();
    });
  };

  QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
    var _this = this;

    if (includeStandby === void 0) {
      includeStandby = false;
    }

    var observableQueryPromises = [];
    this.queries.forEach(function (_a, queryId) {
      var observableQuery = _a.observableQuery;

      if (observableQuery && observableQuery.hasObservers()) {
        var fetchPolicy = observableQuery.options.fetchPolicy;
        observableQuery.resetLastResults();

        if (fetchPolicy !== 'cache-only' && (includeStandby || fetchPolicy !== 'standby')) {
          observableQueryPromises.push(observableQuery.refetch());
        }

        _this.getQuery(queryId).setDiff(null);
      }
    });
    this.broadcastQueries();
    return Promise.all(observableQueryPromises);
  };

  QueryManager.prototype.setObservableQuery = function (observableQuery) {
    this.getQuery(observableQuery.queryId).setObservableQuery(observableQuery);
  };

  QueryManager.prototype.startGraphQLSubscription = function (_a) {
    var _this = this;

    var query = _a.query,
        fetchPolicy = _a.fetchPolicy,
        errorPolicy = _a.errorPolicy,
        variables = _a.variables,
        _b = _a.context,
        context = _b === void 0 ? {} : _b;
    query = this.transform(query).document;
    variables = this.getVariables(query, variables);

    var makeObservable = function (variables) {
      return _this.getObservableFromLink(query, context, variables, false).map(function (result) {
        if (fetchPolicy !== 'no-cache') {
          if (shouldWriteResult(result, errorPolicy)) {
            _this.cache.write({
              query: query,
              result: result.data,
              dataId: 'ROOT_SUBSCRIPTION',
              variables: variables
            });
          }

          _this.broadcastQueries();
        }

        if (utilities.graphQLResultHasError(result)) {
          throw new errors.ApolloError({
            graphQLErrors: result.errors
          });
        }

        return result;
      });
    };

    if (this.transform(query).hasClientExports) {
      var observablePromise_1 = this.localState.addExportedVariables(query, variables, context).then(makeObservable);
      return new utilities.Observable(function (observer) {
        var sub = null;
        observablePromise_1.then(function (observable) {
          return sub = observable.subscribe(observer);
        }, observer.error);
        return function () {
          return sub && sub.unsubscribe();
        };
      });
    }

    return makeObservable(variables);
  };

  QueryManager.prototype.stopQuery = function (queryId) {
    this.stopQueryNoBroadcast(queryId);
    this.broadcastQueries();
  };

  QueryManager.prototype.stopQueryNoBroadcast = function (queryId) {
    this.stopQueryInStoreNoBroadcast(queryId);
    this.removeQuery(queryId);
  };

  QueryManager.prototype.removeQuery = function (queryId) {
    this.fetchCancelFns.delete(queryId);
    this.getQuery(queryId).subscriptions.forEach(function (x) {
      return x.unsubscribe();
    });
    this.queries.delete(queryId);
  };

  QueryManager.prototype.broadcastQueries = function () {
    this.onBroadcast();
    this.queries.forEach(function (info) {
      return info.notify();
    });
  };

  QueryManager.prototype.getLocalState = function () {
    return this.localState;
  };

  QueryManager.prototype.getObservableFromLink = function (query, context, variables, deduplication) {
    var _this = this;

    var _a;

    if (deduplication === void 0) {
      deduplication = (_a = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a !== void 0 ? _a : this.queryDeduplication;
    }

    var observable;
    var serverQuery = this.transform(query).serverQuery;

    if (serverQuery) {
      var _b = this,
          inFlightLinkObservables_1 = _b.inFlightLinkObservables,
          link = _b.link;

      var operation = {
        query: serverQuery,
        variables: variables,
        operationName: utilities.getOperationName(serverQuery) || void 0,
        context: this.prepareContext(tslib.__assign(tslib.__assign({}, context), {
          forceFetch: !deduplication
        }))
      };
      context = operation.context;

      if (deduplication) {
        var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || new Map();
        inFlightLinkObservables_1.set(serverQuery, byVariables_1);
        var varJson_1 = JSON.stringify(variables);
        observable = byVariables_1.get(varJson_1);

        if (!observable) {
          var concast = new utilities.Concast([core.execute(link, operation)]);
          byVariables_1.set(varJson_1, observable = concast);
          concast.cleanup(function () {
            if (byVariables_1.delete(varJson_1) && byVariables_1.size < 1) {
              inFlightLinkObservables_1.delete(serverQuery);
            }
          });
        }
      } else {
        observable = new utilities.Concast([core.execute(link, operation)]);
      }
    } else {
      observable = new utilities.Concast([utilities.Observable.of({
        data: {}
      })]);
      context = this.prepareContext(context);
    }

    var clientQuery = this.transform(query).clientQuery;

    if (clientQuery) {
      observable = utilities.asyncMap(observable, function (result) {
        return _this.localState.runResolvers({
          document: clientQuery,
          remoteResult: result,
          context: context,
          variables: variables
        });
      });
    }

    return observable;
  };

  QueryManager.prototype.getResultsFromLink = function (queryInfo, allowCacheWrite, options) {
    var lastRequestId = queryInfo.lastRequestId;
    return utilities.asyncMap(this.getObservableFromLink(queryInfo.document, options.context, options.variables), function (result) {
      var hasErrors = utilities.isNonEmptyArray(result.errors);

      if (lastRequestId >= queryInfo.lastRequestId) {
        if (hasErrors && options.errorPolicy === "none") {
          throw queryInfo.markError(new errors.ApolloError({
            graphQLErrors: result.errors
          }));
        }

        queryInfo.markResult(result, options, allowCacheWrite);
        queryInfo.markReady();
      }

      var aqr = {
        data: result.data,
        loading: false,
        networkStatus: queryInfo.networkStatus || exports.NetworkStatus.ready
      };

      if (hasErrors && options.errorPolicy !== "ignore") {
        aqr.errors = result.errors;
      }

      return aqr;
    }, function (networkError) {
      var error = errors.isApolloError(networkError) ? networkError : new errors.ApolloError({
        networkError: networkError
      });

      if (lastRequestId >= queryInfo.lastRequestId) {
        queryInfo.markError(error);
      }

      throw error;
    });
  };

  QueryManager.prototype.fetchQueryObservable = function (queryId, options, networkStatus) {
    var _this = this;

    if (networkStatus === void 0) {
      networkStatus = exports.NetworkStatus.loading;
    }

    var query = this.transform(options.query).document;
    var variables = this.getVariables(query, options.variables);
    var queryInfo = this.getQuery(queryId);
    var oldNetworkStatus = queryInfo.networkStatus;
    var _a = options.fetchPolicy,
        fetchPolicy = _a === void 0 ? "cache-first" : _a,
        _b = options.errorPolicy,
        errorPolicy = _b === void 0 ? "none" : _b,
        _c = options.returnPartialData,
        returnPartialData = _c === void 0 ? false : _c,
        _d = options.notifyOnNetworkStatusChange,
        notifyOnNetworkStatusChange = _d === void 0 ? false : _d,
        _e = options.context,
        context = _e === void 0 ? {} : _e;
    var mightUseNetwork = fetchPolicy === "cache-first" || fetchPolicy === "cache-and-network" || fetchPolicy === "network-only" || fetchPolicy === "no-cache";

    if (mightUseNetwork && notifyOnNetworkStatusChange && typeof oldNetworkStatus === "number" && oldNetworkStatus !== networkStatus && isNetworkRequestInFlight(networkStatus)) {
      if (fetchPolicy !== "cache-first") {
        fetchPolicy = "cache-and-network";
      }

      returnPartialData = true;
    }

    var normalized = Object.assign({}, options, {
      query: query,
      variables: variables,
      fetchPolicy: fetchPolicy,
      errorPolicy: errorPolicy,
      returnPartialData: returnPartialData,
      notifyOnNetworkStatusChange: notifyOnNetworkStatusChange,
      context: context
    });

    var fromVariables = function (variables) {
      normalized.variables = variables;
      return _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
    };

    this.fetchCancelFns.set(queryId, function (reason) {
      Promise.resolve().then(function () {
        return concast.cancel(reason);
      });
    });
    var concast = new utilities.Concast(this.transform(normalized.query).hasClientExports ? this.localState.addExportedVariables(normalized.query, normalized.variables, normalized.context).then(fromVariables) : fromVariables(normalized.variables));
    concast.cleanup(function () {
      _this.fetchCancelFns.delete(queryId);

      var nextFetchPolicy = options.nextFetchPolicy;

      if (nextFetchPolicy) {
        options.nextFetchPolicy = void 0;
        options.fetchPolicy = typeof nextFetchPolicy === "function" ? nextFetchPolicy.call(options, options.fetchPolicy || "cache-first") : nextFetchPolicy;
      }
    });
    return concast;
  };

  QueryManager.prototype.fetchQueryByPolicy = function (queryInfo, options, networkStatus) {
    var _this = this;

    var query = options.query,
        variables = options.variables,
        fetchPolicy = options.fetchPolicy,
        errorPolicy = options.errorPolicy,
        returnPartialData = options.returnPartialData,
        context = options.context;
    queryInfo.init({
      document: query,
      variables: variables,
      lastRequestId: this.generateRequestId(),
      networkStatus: networkStatus
    });

    var readCache = function () {
      return queryInfo.getDiff(variables);
    };

    var resultsFromCache = function (diff, networkStatus) {
      if (networkStatus === void 0) {
        networkStatus = queryInfo.networkStatus || exports.NetworkStatus.loading;
      }

      var data = diff.result;

      if ( true && utilities.isNonEmptyArray(diff.missing) && !equality.equal(data, {}) && !returnPartialData) {
         false || tsInvariant.invariant.warn("Missing cache result fields: " + diff.missing.map(function (m) {
          return m.path.join('.');
        }).join(', '), diff.missing);
      }

      var fromData = function (data) {
        return utilities.Observable.of(tslib.__assign({
          data: data,
          loading: isNetworkRequestInFlight(networkStatus),
          networkStatus: networkStatus
        }, diff.complete ? null : {
          partial: true
        }));
      };

      if (_this.transform(query).hasForcedResolvers) {
        return _this.localState.runResolvers({
          document: query,
          remoteResult: {
            data: data
          },
          context: context,
          variables: variables,
          onlyRunForcedResolvers: true
        }).then(function (resolved) {
          return fromData(resolved.data);
        });
      }

      return fromData(data);
    };

    var resultsFromLink = function (allowCacheWrite) {
      return _this.getResultsFromLink(queryInfo, allowCacheWrite, {
        variables: variables,
        context: context,
        fetchPolicy: fetchPolicy,
        errorPolicy: errorPolicy
      });
    };

    switch (fetchPolicy) {
      default:
      case "cache-first":
        {
          var diff = readCache();

          if (diff.complete) {
            return [resultsFromCache(diff, queryInfo.markReady())];
          }

          if (returnPartialData) {
            return [resultsFromCache(diff), resultsFromLink(true)];
          }

          return [resultsFromLink(true)];
        }

      case "cache-and-network":
        {
          var diff = readCache();

          if (diff.complete || returnPartialData) {
            return [resultsFromCache(diff), resultsFromLink(true)];
          }

          return [resultsFromLink(true)];
        }

      case "cache-only":
        return [resultsFromCache(readCache(), queryInfo.markReady())];

      case "network-only":
        return [resultsFromLink(true)];

      case "no-cache":
        return [resultsFromLink(false)];

      case "standby":
        return [];
    }
  };

  QueryManager.prototype.getQuery = function (queryId) {
    if (queryId && !this.queries.has(queryId)) {
      this.queries.set(queryId, new QueryInfo(this.cache));
    }

    return this.queries.get(queryId);
  };

  QueryManager.prototype.prepareContext = function (context) {
    if (context === void 0) {
      context = {};
    }

    var newContext = this.localState.prepareContext(context);
    return tslib.__assign(tslib.__assign({}, newContext), {
      clientAwareness: this.clientAwareness
    });
  };

  return QueryManager;
}();

function markMutationResult(mutation, cache) {
  if (shouldWriteResult(mutation.result, mutation.errorPolicy)) {
    var cacheWrites_1 = [{
      result: mutation.result.data,
      dataId: 'ROOT_MUTATION',
      query: mutation.document,
      variables: mutation.variables
    }];
    var queryUpdatersById_1 = mutation.queryUpdatersById;

    if (queryUpdatersById_1) {
      Object.keys(queryUpdatersById_1).forEach(function (id) {
        var _a = queryUpdatersById_1[id],
            updater = _a.updater,
            _b = _a.queryInfo,
            document = _b.document,
            variables = _b.variables;

        var _c = cache.diff({
          query: document,
          variables: variables,
          returnPartialData: true,
          optimistic: false
        }),
            currentQueryResult = _c.result,
            complete = _c.complete;

        if (complete && currentQueryResult) {
          var nextQueryResult = updater(currentQueryResult, {
            mutationResult: mutation.result,
            queryName: utilities.getOperationName(document) || undefined,
            queryVariables: variables
          });

          if (nextQueryResult) {
            cacheWrites_1.push({
              result: nextQueryResult,
              dataId: 'ROOT_QUERY',
              query: document,
              variables: variables
            });
          }
        }
      });
    }

    cache.performTransaction(function (c) {
      cacheWrites_1.forEach(function (write) {
        return c.write(write);
      });
      var update = mutation.update;

      if (update) {
        update(c, mutation.result);
      }
    }, null);
  }
}

var hasSuggestedDevtools = false;

var ApolloClient = function () {
  function ApolloClient(options) {
    var _this = this;

    this.defaultOptions = {};
    this.resetStoreCallbacks = [];
    this.clearStoreCallbacks = [];
    var uri = options.uri,
        credentials = options.credentials,
        headers = options.headers,
        cache = options.cache,
        _a = options.ssrMode,
        ssrMode = _a === void 0 ? false : _a,
        _b = options.ssrForceFetchDelay,
        ssrForceFetchDelay = _b === void 0 ? 0 : _b,
        connectToDevTools = options.connectToDevTools,
        _c = options.queryDeduplication,
        queryDeduplication = _c === void 0 ? true : _c,
        defaultOptions = options.defaultOptions,
        _d = options.assumeImmutableResults,
        assumeImmutableResults = _d === void 0 ? false : _d,
        resolvers = options.resolvers,
        typeDefs = options.typeDefs,
        fragmentMatcher = options.fragmentMatcher,
        clientAwarenessName = options.name,
        clientAwarenessVersion = options.version;
    var link = options.link;

    if (!link) {
      link = uri ? new http.HttpLink({
        uri: uri,
        credentials: credentials,
        headers: headers
      }) : core.ApolloLink.empty();
    }

    if (!cache) {
      throw  false ? undefined : new tsInvariant.InvariantError("To initialize Apollo Client, you must specify a 'cache' property " + "in the options object. \n" + "For more information, please visit: https://go.apollo.dev/c/docs");
    }

    this.link = link;
    this.cache = cache;
    this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
    this.queryDeduplication = queryDeduplication;
    this.defaultOptions = defaultOptions || {};
    this.typeDefs = typeDefs;

    if (ssrForceFetchDelay) {
      setTimeout(function () {
        return _this.disableNetworkFetches = false;
      }, ssrForceFetchDelay);
    }

    this.watchQuery = this.watchQuery.bind(this);
    this.query = this.query.bind(this);
    this.mutate = this.mutate.bind(this);
    this.resetStore = this.resetStore.bind(this);
    this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
    var defaultConnectToDevTools =  true && typeof window !== 'undefined' && !window.__APOLLO_CLIENT__;

    if (typeof connectToDevTools === 'undefined' ? defaultConnectToDevTools : connectToDevTools && typeof window !== 'undefined') {
      window.__APOLLO_CLIENT__ = this;
    }

    if (!hasSuggestedDevtools && "development" !== 'production') {
      hasSuggestedDevtools = true;

      if (typeof window !== 'undefined' && window.document && window.top === window.self) {
        if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
          if (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('Chrome') > -1) {
            console.debug('Download the Apollo DevTools ' + 'for a better development experience: ' + 'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
          }
        }
      }
    }

    this.version = version;
    this.localState = new LocalState({
      cache: cache,
      client: this,
      resolvers: resolvers,
      fragmentMatcher: fragmentMatcher
    });
    this.queryManager = new QueryManager({
      cache: this.cache,
      link: this.link,
      queryDeduplication: queryDeduplication,
      ssrMode: ssrMode,
      clientAwareness: {
        name: clientAwarenessName,
        version: clientAwarenessVersion
      },
      localState: this.localState,
      assumeImmutableResults: assumeImmutableResults,
      onBroadcast: function () {
        if (_this.devToolsHookCb) {
          _this.devToolsHookCb({
            action: {},
            state: {
              queries: _this.queryManager.getQueryStore(),
              mutations: _this.queryManager.mutationStore.getStore()
            },
            dataWithOptimisticResults: _this.cache.extract(true)
          });
        }
      }
    });
  }

  ApolloClient.prototype.stop = function () {
    this.queryManager.stop();
  };

  ApolloClient.prototype.watchQuery = function (options) {
    if (this.defaultOptions.watchQuery) {
      options = utilities.compact(this.defaultOptions.watchQuery, options);
    }

    if (this.disableNetworkFetches && (options.fetchPolicy === 'network-only' || options.fetchPolicy === 'cache-and-network')) {
      options = tslib.__assign(tslib.__assign({}, options), {
        fetchPolicy: 'cache-first'
      });
    }

    return this.queryManager.watchQuery(options);
  };

  ApolloClient.prototype.query = function (options) {
    if (this.defaultOptions.query) {
      options = utilities.compact(this.defaultOptions.query, options);
    }

     false ? undefined : tsInvariant.invariant(options.fetchPolicy !== 'cache-and-network', 'The cache-and-network fetchPolicy does not work with client.query, because ' + 'client.query can only return a single result. Please use client.watchQuery ' + 'to receive multiple results from the cache and the network, or consider ' + 'using a different fetchPolicy, such as cache-first or network-only.');

    if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
      options = tslib.__assign(tslib.__assign({}, options), {
        fetchPolicy: 'cache-first'
      });
    }

    return this.queryManager.query(options);
  };

  ApolloClient.prototype.mutate = function (options) {
    if (this.defaultOptions.mutate) {
      options = utilities.compact(this.defaultOptions.mutate, options);
    }

    return this.queryManager.mutate(options);
  };

  ApolloClient.prototype.subscribe = function (options) {
    return this.queryManager.startGraphQLSubscription(options);
  };

  ApolloClient.prototype.readQuery = function (options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return this.cache.readQuery(options, optimistic);
  };

  ApolloClient.prototype.readFragment = function (options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return this.cache.readFragment(options, optimistic);
  };

  ApolloClient.prototype.writeQuery = function (options) {
    this.cache.writeQuery(options);
    this.queryManager.broadcastQueries();
  };

  ApolloClient.prototype.writeFragment = function (options) {
    this.cache.writeFragment(options);
    this.queryManager.broadcastQueries();
  };

  ApolloClient.prototype.__actionHookForDevTools = function (cb) {
    this.devToolsHookCb = cb;
  };

  ApolloClient.prototype.__requestRaw = function (payload) {
    return core.execute(this.link, payload);
  };

  ApolloClient.prototype.resetStore = function () {
    var _this = this;

    return Promise.resolve().then(function () {
      return _this.queryManager.clearStore();
    }).then(function () {
      return Promise.all(_this.resetStoreCallbacks.map(function (fn) {
        return fn();
      }));
    }).then(function () {
      return _this.reFetchObservableQueries();
    });
  };

  ApolloClient.prototype.clearStore = function () {
    var _this = this;

    return Promise.resolve().then(function () {
      return _this.queryManager.clearStore();
    }).then(function () {
      return Promise.all(_this.clearStoreCallbacks.map(function (fn) {
        return fn();
      }));
    });
  };

  ApolloClient.prototype.onResetStore = function (cb) {
    var _this = this;

    this.resetStoreCallbacks.push(cb);
    return function () {
      _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) {
        return c !== cb;
      });
    };
  };

  ApolloClient.prototype.onClearStore = function (cb) {
    var _this = this;

    this.clearStoreCallbacks.push(cb);
    return function () {
      _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function (c) {
        return c !== cb;
      });
    };
  };

  ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
    return this.queryManager.reFetchObservableQueries(includeStandby);
  };

  ApolloClient.prototype.extract = function (optimistic) {
    return this.cache.extract(optimistic);
  };

  ApolloClient.prototype.restore = function (serializedState) {
    return this.cache.restore(serializedState);
  };

  ApolloClient.prototype.addResolvers = function (resolvers) {
    this.localState.addResolvers(resolvers);
  };

  ApolloClient.prototype.setResolvers = function (resolvers) {
    this.localState.setResolvers(resolvers);
  };

  ApolloClient.prototype.getResolvers = function () {
    return this.localState.getResolvers();
  };

  ApolloClient.prototype.setLocalStateFragmentMatcher = function (fragmentMatcher) {
    this.localState.setFragmentMatcher(fragmentMatcher);
  };

  ApolloClient.prototype.setLink = function (newLink) {
    this.link = this.queryManager.link = newLink;
  };

  return ApolloClient;
}();

var resetCaches = gql.resetCaches,
    disableFragmentWarnings = gql.disableFragmentWarnings,
    enableExperimentalFragmentVariables = gql.enableExperimentalFragmentVariables,
    disableExperimentalFragmentVariables = gql.disableExperimentalFragmentVariables;
Object.keys(core).forEach(function (k) {
  if (k !== 'default') exports[k] = core[k];
});
Object.keys(http).forEach(function (k) {
  if (k !== 'default') exports[k] = http[k];
});
exports.Observable = utilities.Observable;
exports.isReference = utilities.isReference;
exports.makeReference = utilities.makeReference;
exports.ApolloError = errors.ApolloError;
exports.isApolloError = errors.isApolloError;
exports.ApolloCache = cache.ApolloCache;
exports.Cache = cache.Cache;
exports.InMemoryCache = cache.InMemoryCache;
exports.MissingFieldError = cache.MissingFieldError;
exports.defaultDataIdFromObject = cache.defaultDataIdFromObject;
exports.makeVar = cache.makeVar;
exports.fromError = utils.fromError;
exports.fromPromise = utils.fromPromise;
exports.throwServerError = utils.throwServerError;
exports.toPromise = utils.toPromise;
exports.gql = gql;
exports.ApolloClient = ApolloClient;
exports.ObservableQuery = ObservableQuery;
exports.disableExperimentalFragmentVariables = disableExperimentalFragmentVariables;
exports.disableFragmentWarnings = disableFragmentWarnings;
exports.enableExperimentalFragmentVariables = enableExperimentalFragmentVariables;
exports.resetCaches = resetCaches;

/***/ }),

/***/ "./node_modules/@apollo/client/errors/errors.cjs.js":
/*!**********************************************************!*\
  !*** ./node_modules/@apollo/client/errors/errors.cjs.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var utilities = __webpack_require__(/*! ../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

function isApolloError(err) {
  return err.hasOwnProperty('graphQLErrors');
}

var generateErrorMessage = function (err) {
  var message = '';

  if (utilities.isNonEmptyArray(err.graphQLErrors)) {
    err.graphQLErrors.forEach(function (graphQLError) {
      var errorMessage = graphQLError ? graphQLError.message : 'Error message not found.';
      message += errorMessage + "\n";
    });
  }

  if (err.networkError) {
    message += err.networkError.message + "\n";
  }

  message = message.replace(/\n$/, '');
  return message;
};

var ApolloError = function (_super) {
  tslib.__extends(ApolloError, _super);

  function ApolloError(_a) {
    var graphQLErrors = _a.graphQLErrors,
        networkError = _a.networkError,
        errorMessage = _a.errorMessage,
        extraInfo = _a.extraInfo;

    var _this = _super.call(this, errorMessage) || this;

    _this.graphQLErrors = graphQLErrors || [];
    _this.networkError = networkError || null;
    _this.message = errorMessage || generateErrorMessage(_this);
    _this.extraInfo = extraInfo;
    _this.__proto__ = ApolloError.prototype;
    return _this;
  }

  return ApolloError;
}(Error);

exports.ApolloError = ApolloError;
exports.isApolloError = isApolloError;

/***/ }),

/***/ "./node_modules/@apollo/client/link/batch-http/batch-http.cjs.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@apollo/client/link/batch-http/batch-http.cjs.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var core = __webpack_require__(/*! ../core */ "./node_modules/@apollo/client/link/core/core.cjs.js");

var utilities = __webpack_require__(/*! ../../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

var utils = __webpack_require__(/*! ../utils */ "./node_modules/@apollo/client/link/utils/utils.cjs.js");

var http = __webpack_require__(/*! ../http */ "./node_modules/@apollo/client/link/http/http.cjs.js");

var batch = __webpack_require__(/*! ../batch */ "./node_modules/@apollo/client/link/batch/batch.cjs.js");

var BatchHttpLink = function (_super) {
  tslib.__extends(BatchHttpLink, _super);

  function BatchHttpLink(fetchParams) {
    var _this = _super.call(this) || this;

    var _a = fetchParams || {},
        _b = _a.uri,
        uri = _b === void 0 ? '/graphql' : _b,
        fetcher = _a.fetch,
        includeExtensions = _a.includeExtensions,
        batchInterval = _a.batchInterval,
        batchMax = _a.batchMax,
        batchKey = _a.batchKey,
        requestOptions = tslib.__rest(_a, ["uri", "fetch", "includeExtensions", "batchInterval", "batchMax", "batchKey"]);

    http.checkFetcher(fetcher);

    if (!fetcher) {
      fetcher = fetch;
    }

    var linkConfig = {
      http: {
        includeExtensions: includeExtensions
      },
      options: requestOptions.fetchOptions,
      credentials: requestOptions.credentials,
      headers: requestOptions.headers
    };
    _this.batchInterval = batchInterval || 10;
    _this.batchMax = batchMax || 10;

    var batchHandler = function (operations) {
      var chosenURI = http.selectURI(operations[0], uri);
      var context = operations[0].getContext();
      var clientAwarenessHeaders = {};

      if (context.clientAwareness) {
        var _a = context.clientAwareness,
            name_1 = _a.name,
            version = _a.version;

        if (name_1) {
          clientAwarenessHeaders['apollographql-client-name'] = name_1;
        }

        if (version) {
          clientAwarenessHeaders['apollographql-client-version'] = version;
        }
      }

      var contextConfig = {
        http: context.http,
        options: context.fetchOptions,
        credentials: context.credentials,
        headers: tslib.__assign(tslib.__assign({}, clientAwarenessHeaders), context.headers)
      };
      var optsAndBody = operations.map(function (operation) {
        return http.selectHttpOptionsAndBody(operation, http.fallbackHttpConfig, linkConfig, contextConfig);
      });
      var loadedBody = optsAndBody.map(function (_a) {
        var body = _a.body;
        return body;
      });
      var options = optsAndBody[0].options;

      if (options.method === 'GET') {
        return utils.fromError(new Error('apollo-link-batch-http does not support GET requests'));
      }

      try {
        options.body = http.serializeFetchParameter(loadedBody, 'Payload');
      } catch (parseError) {
        return utils.fromError(parseError);
      }

      var controller;

      if (!options.signal) {
        var _b = http.createSignalIfSupported(),
            _controller = _b.controller,
            signal = _b.signal;

        controller = _controller;
        if (controller) options.signal = signal;
      }

      return new utilities.Observable(function (observer) {
        fetcher(chosenURI, options).then(function (response) {
          operations.forEach(function (operation) {
            return operation.setContext({
              response: response
            });
          });
          return response;
        }).then(http.parseAndCheckHttpResponse(operations)).then(function (result) {
          observer.next(result);
          observer.complete();
          return result;
        }).catch(function (err) {
          if (err.name === 'AbortError') return;

          if (err.result && err.result.errors && err.result.data) {
            observer.next(err.result);
          }

          observer.error(err);
        });
        return function () {
          if (controller) controller.abort();
        };
      });
    };

    batchKey = batchKey || function (operation) {
      var context = operation.getContext();
      var contextConfig = {
        http: context.http,
        options: context.fetchOptions,
        credentials: context.credentials,
        headers: context.headers
      };
      return http.selectURI(operation, uri) + JSON.stringify(contextConfig);
    };

    _this.batcher = new batch.BatchLink({
      batchInterval: _this.batchInterval,
      batchMax: _this.batchMax,
      batchKey: batchKey,
      batchHandler: batchHandler
    });
    return _this;
  }

  BatchHttpLink.prototype.request = function (operation) {
    return this.batcher.request(operation);
  };

  return BatchHttpLink;
}(core.ApolloLink);

exports.BatchHttpLink = BatchHttpLink;

/***/ }),

/***/ "./node_modules/@apollo/client/link/batch/batch.cjs.js":
/*!*************************************************************!*\
  !*** ./node_modules/@apollo/client/link/batch/batch.cjs.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var core = __webpack_require__(/*! ../core */ "./node_modules/@apollo/client/link/core/core.cjs.js");

var utilities = __webpack_require__(/*! ../../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

var OperationBatcher = function () {
  function OperationBatcher(_a) {
    var batchInterval = _a.batchInterval,
        batchMax = _a.batchMax,
        batchHandler = _a.batchHandler,
        batchKey = _a.batchKey;
    this.queuedRequests = new Map();
    this.batchInterval = batchInterval;
    this.batchMax = batchMax || 0;
    this.batchHandler = batchHandler;

    this.batchKey = batchKey || function () {
      return '';
    };
  }

  OperationBatcher.prototype.enqueueRequest = function (request) {
    var _this = this;

    var requestCopy = tslib.__assign({}, request);

    var queued = false;
    var key = this.batchKey(request.operation);

    if (!requestCopy.observable) {
      requestCopy.observable = new utilities.Observable(function (observer) {
        if (!_this.queuedRequests.has(key)) {
          _this.queuedRequests.set(key, []);
        }

        if (!queued) {
          _this.queuedRequests.get(key).push(requestCopy);

          queued = true;
        }

        requestCopy.next = requestCopy.next || [];
        if (observer.next) requestCopy.next.push(observer.next.bind(observer));
        requestCopy.error = requestCopy.error || [];
        if (observer.error) requestCopy.error.push(observer.error.bind(observer));
        requestCopy.complete = requestCopy.complete || [];
        if (observer.complete) requestCopy.complete.push(observer.complete.bind(observer));

        if (_this.queuedRequests.get(key).length === 1) {
          _this.scheduleQueueConsumption(key);
        }

        if (_this.queuedRequests.get(key).length === _this.batchMax) {
          _this.consumeQueue(key);
        }
      });
    }

    return requestCopy.observable;
  };

  OperationBatcher.prototype.consumeQueue = function (key) {
    var requestKey = key || '';
    var queuedRequests = this.queuedRequests.get(requestKey);

    if (!queuedRequests) {
      return;
    }

    this.queuedRequests.delete(requestKey);
    var requests = queuedRequests.map(function (queuedRequest) {
      return queuedRequest.operation;
    });
    var forwards = queuedRequests.map(function (queuedRequest) {
      return queuedRequest.forward;
    });
    var observables = [];
    var nexts = [];
    var errors = [];
    var completes = [];
    queuedRequests.forEach(function (batchableRequest, index) {
      observables.push(batchableRequest.observable);
      nexts.push(batchableRequest.next);
      errors.push(batchableRequest.error);
      completes.push(batchableRequest.complete);
    });
    var batchedObservable = this.batchHandler(requests, forwards) || utilities.Observable.of();

    var onError = function (error) {
      errors.forEach(function (rejecters) {
        if (rejecters) {
          rejecters.forEach(function (e) {
            return e(error);
          });
        }
      });
    };

    batchedObservable.subscribe({
      next: function (results) {
        if (!Array.isArray(results)) {
          results = [results];
        }

        if (nexts.length !== results.length) {
          var error = new Error("server returned results with length " + results.length + ", expected length of " + nexts.length);
          error.result = results;
          return onError(error);
        }

        results.forEach(function (result, index) {
          if (nexts[index]) {
            nexts[index].forEach(function (next) {
              return next(result);
            });
          }
        });
      },
      error: onError,
      complete: function () {
        completes.forEach(function (complete) {
          if (complete) {
            complete.forEach(function (c) {
              return c();
            });
          }
        });
      }
    });
    return observables;
  };

  OperationBatcher.prototype.scheduleQueueConsumption = function (key) {
    var _this = this;

    var requestKey = key || '';
    setTimeout(function () {
      if (_this.queuedRequests.get(requestKey) && _this.queuedRequests.get(requestKey).length) {
        _this.consumeQueue(requestKey);
      }
    }, this.batchInterval);
  };

  return OperationBatcher;
}();

var BatchLink = function (_super) {
  tslib.__extends(BatchLink, _super);

  function BatchLink(fetchParams) {
    var _this = _super.call(this) || this;

    var _a = fetchParams || {},
        _b = _a.batchInterval,
        batchInterval = _b === void 0 ? 10 : _b,
        _c = _a.batchMax,
        batchMax = _c === void 0 ? 0 : _c,
        _d = _a.batchHandler,
        batchHandler = _d === void 0 ? function () {
      return null;
    } : _d,
        _e = _a.batchKey,
        batchKey = _e === void 0 ? function () {
      return '';
    } : _e;

    _this.batcher = new OperationBatcher({
      batchInterval: batchInterval,
      batchMax: batchMax,
      batchHandler: batchHandler,
      batchKey: batchKey
    });

    if (fetchParams.batchHandler.length <= 1) {
      _this.request = function (operation) {
        return _this.batcher.enqueueRequest({
          operation: operation
        });
      };
    }

    return _this;
  }

  BatchLink.prototype.request = function (operation, forward) {
    return this.batcher.enqueueRequest({
      operation: operation,
      forward: forward
    });
  };

  return BatchLink;
}(core.ApolloLink);

exports.BatchLink = BatchLink;
exports.OperationBatcher = OperationBatcher;

/***/ }),

/***/ "./node_modules/@apollo/client/link/core/core.cjs.js":
/*!***********************************************************!*\
  !*** ./node_modules/@apollo/client/link/core/core.cjs.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var utilities = __webpack_require__(/*! ../../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

var utils = __webpack_require__(/*! ../utils */ "./node_modules/@apollo/client/link/utils/utils.cjs.js");

function passthrough(op, forward) {
  return forward ? forward(op) : utilities.Observable.of();
}

function toLink(handler) {
  return typeof handler === 'function' ? new ApolloLink(handler) : handler;
}

function isTerminating(link) {
  return link.request.length <= 1;
}

var LinkError = function (_super) {
  tslib.__extends(LinkError, _super);

  function LinkError(message, link) {
    var _this = _super.call(this, message) || this;

    _this.link = link;
    return _this;
  }

  return LinkError;
}(Error);

var ApolloLink = function () {
  function ApolloLink(request) {
    if (request) this.request = request;
  }

  ApolloLink.empty = function () {
    return new ApolloLink(function () {
      return utilities.Observable.of();
    });
  };

  ApolloLink.from = function (links) {
    if (links.length === 0) return ApolloLink.empty();
    return links.map(toLink).reduce(function (x, y) {
      return x.concat(y);
    });
  };

  ApolloLink.split = function (test, left, right) {
    var leftLink = toLink(left);
    var rightLink = toLink(right || new ApolloLink(passthrough));

    if (isTerminating(leftLink) && isTerminating(rightLink)) {
      return new ApolloLink(function (operation) {
        return test(operation) ? leftLink.request(operation) || utilities.Observable.of() : rightLink.request(operation) || utilities.Observable.of();
      });
    } else {
      return new ApolloLink(function (operation, forward) {
        return test(operation) ? leftLink.request(operation, forward) || utilities.Observable.of() : rightLink.request(operation, forward) || utilities.Observable.of();
      });
    }
  };

  ApolloLink.execute = function (link, operation) {
    return link.request(utils.createOperation(operation.context, utils.transformOperation(utils.validateOperation(operation)))) || utilities.Observable.of();
  };

  ApolloLink.concat = function (first, second) {
    var firstLink = toLink(first);

    if (isTerminating(firstLink)) {
       false || tsInvariant.invariant.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
      return firstLink;
    }

    var nextLink = toLink(second);

    if (isTerminating(nextLink)) {
      return new ApolloLink(function (operation) {
        return firstLink.request(operation, function (op) {
          return nextLink.request(op) || utilities.Observable.of();
        }) || utilities.Observable.of();
      });
    } else {
      return new ApolloLink(function (operation, forward) {
        return firstLink.request(operation, function (op) {
          return nextLink.request(op, forward) || utilities.Observable.of();
        }) || utilities.Observable.of();
      });
    }
  };

  ApolloLink.prototype.split = function (test, left, right) {
    return this.concat(ApolloLink.split(test, left, right || new ApolloLink(passthrough)));
  };

  ApolloLink.prototype.concat = function (next) {
    return ApolloLink.concat(this, next);
  };

  ApolloLink.prototype.request = function (operation, forward) {
    throw  false ? undefined : new tsInvariant.InvariantError('request is not implemented');
  };

  ApolloLink.prototype.onError = function (reason) {
    throw reason;
  };

  ApolloLink.prototype.setOnError = function (fn) {
    this.onError = fn;
    return this;
  };

  return ApolloLink;
}();

var empty = ApolloLink.empty;
var from = ApolloLink.from;
var split = ApolloLink.split;
var concat = ApolloLink.concat;
var execute = ApolloLink.execute;
exports.ApolloLink = ApolloLink;
exports.concat = concat;
exports.empty = empty;
exports.execute = execute;
exports.from = from;
exports.split = split;

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/http.cjs.js":
/*!***********************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/http.cjs.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var utils = __webpack_require__(/*! ../utils */ "./node_modules/@apollo/client/link/utils/utils.cjs.js");

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var printer = __webpack_require__(/*! graphql/language/printer */ "./node_modules/graphql/language/printer.mjs");

var core = __webpack_require__(/*! ../core */ "./node_modules/@apollo/client/link/core/core.cjs.js");

var utilities = __webpack_require__(/*! ../../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

var hasOwnProperty = Object.prototype.hasOwnProperty;

function parseAndCheckHttpResponse(operations) {
  return function (response) {
    return response.text().then(function (bodyText) {
      try {
        return JSON.parse(bodyText);
      } catch (err) {
        var parseError = err;
        parseError.name = 'ServerParseError';
        parseError.response = response;
        parseError.statusCode = response.status;
        parseError.bodyText = bodyText;
        throw parseError;
      }
    }).then(function (result) {
      if (response.status >= 300) {
        utils.throwServerError(response, result, "Response not successful: Received status code " + response.status);
      }

      if (!Array.isArray(result) && !hasOwnProperty.call(result, 'data') && !hasOwnProperty.call(result, 'errors')) {
        utils.throwServerError(response, result, "Server response was missing for query '" + (Array.isArray(operations) ? operations.map(function (op) {
          return op.operationName;
        }) : operations.operationName) + "'.");
      }

      return result;
    });
  };
}

var serializeFetchParameter = function (p, label) {
  var serialized;

  try {
    serialized = JSON.stringify(p);
  } catch (e) {
    var parseError =  false ? undefined : new tsInvariant.InvariantError("Network request failed. " + label + " is not serializable: " + e.message);
    parseError.parseError = e;
    throw parseError;
  }

  return serialized;
};

var defaultHttpOptions = {
  includeQuery: true,
  includeExtensions: false
};
var defaultHeaders = {
  accept: '*/*',
  'content-type': 'application/json'
};
var defaultOptions = {
  method: 'POST'
};
var fallbackHttpConfig = {
  http: defaultHttpOptions,
  headers: defaultHeaders,
  options: defaultOptions
};

var selectHttpOptionsAndBody = function (operation, fallbackConfig) {
  var configs = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    configs[_i - 2] = arguments[_i];
  }

  var options = tslib.__assign(tslib.__assign({}, fallbackConfig.options), {
    headers: fallbackConfig.headers,
    credentials: fallbackConfig.credentials
  });

  var http = fallbackConfig.http || {};
  configs.forEach(function (config) {
    options = tslib.__assign(tslib.__assign(tslib.__assign({}, options), config.options), {
      headers: tslib.__assign(tslib.__assign({}, options.headers), config.headers)
    });
    if (config.credentials) options.credentials = config.credentials;
    http = tslib.__assign(tslib.__assign({}, http), config.http);
  });
  var operationName = operation.operationName,
      extensions = operation.extensions,
      variables = operation.variables,
      query = operation.query;
  var body = {
    operationName: operationName,
    variables: variables
  };
  if (http.includeExtensions) body.extensions = extensions;
  if (http.includeQuery) body.query = printer.print(query);
  return {
    options: options,
    body: body
  };
};

var checkFetcher = function (fetcher) {
  if (!fetcher && typeof fetch === 'undefined') {
    throw  false ? undefined : new tsInvariant.InvariantError("\n\"fetch\" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:\n\nimport fetch from 'cross-fetch';\nimport { ApolloClient, HttpLink } from '@apollo/client';\nconst client = new ApolloClient({\n  link: new HttpLink({ uri: '/graphql', fetch })\n});\n    ");
  }
};

var createSignalIfSupported = function () {
  if (typeof AbortController === 'undefined') return {
    controller: false,
    signal: false
  };
  var controller = new AbortController();
  var signal = controller.signal;
  return {
    controller: controller,
    signal: signal
  };
};

var selectURI = function (operation, fallbackURI) {
  var context = operation.getContext();
  var contextURI = context.uri;

  if (contextURI) {
    return contextURI;
  } else if (typeof fallbackURI === 'function') {
    return fallbackURI(operation);
  } else {
    return fallbackURI || '/graphql';
  }
};

function rewriteURIForGET(chosenURI, body) {
  var queryParams = [];

  var addQueryParam = function (key, value) {
    queryParams.push(key + "=" + encodeURIComponent(value));
  };

  if ('query' in body) {
    addQueryParam('query', body.query);
  }

  if (body.operationName) {
    addQueryParam('operationName', body.operationName);
  }

  if (body.variables) {
    var serializedVariables = void 0;

    try {
      serializedVariables = serializeFetchParameter(body.variables, 'Variables map');
    } catch (parseError) {
      return {
        parseError: parseError
      };
    }

    addQueryParam('variables', serializedVariables);
  }

  if (body.extensions) {
    var serializedExtensions = void 0;

    try {
      serializedExtensions = serializeFetchParameter(body.extensions, 'Extensions map');
    } catch (parseError) {
      return {
        parseError: parseError
      };
    }

    addQueryParam('extensions', serializedExtensions);
  }

  var fragment = '',
      preFragment = chosenURI;
  var fragmentStart = chosenURI.indexOf('#');

  if (fragmentStart !== -1) {
    fragment = chosenURI.substr(fragmentStart);
    preFragment = chosenURI.substr(0, fragmentStart);
  }

  var queryParamsPrefix = preFragment.indexOf('?') === -1 ? '?' : '&';
  var newURI = preFragment + queryParamsPrefix + queryParams.join('&') + fragment;
  return {
    newURI: newURI
  };
}

var createHttpLink = function (linkOptions) {
  if (linkOptions === void 0) {
    linkOptions = {};
  }

  var _a = linkOptions.uri,
      uri = _a === void 0 ? '/graphql' : _a,
      fetcher = linkOptions.fetch,
      includeExtensions = linkOptions.includeExtensions,
      useGETForQueries = linkOptions.useGETForQueries,
      requestOptions = tslib.__rest(linkOptions, ["uri", "fetch", "includeExtensions", "useGETForQueries"]);

  checkFetcher(fetcher);

  if (!fetcher) {
    fetcher = fetch;
  }

  var linkConfig = {
    http: {
      includeExtensions: includeExtensions
    },
    options: requestOptions.fetchOptions,
    credentials: requestOptions.credentials,
    headers: requestOptions.headers
  };
  return new core.ApolloLink(function (operation) {
    var chosenURI = selectURI(operation, uri);
    var context = operation.getContext();
    var clientAwarenessHeaders = {};

    if (context.clientAwareness) {
      var _a = context.clientAwareness,
          name_1 = _a.name,
          version = _a.version;

      if (name_1) {
        clientAwarenessHeaders['apollographql-client-name'] = name_1;
      }

      if (version) {
        clientAwarenessHeaders['apollographql-client-version'] = version;
      }
    }

    var contextHeaders = tslib.__assign(tslib.__assign({}, clientAwarenessHeaders), context.headers);

    var contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: contextHeaders
    };

    var _b = selectHttpOptionsAndBody(operation, fallbackHttpConfig, linkConfig, contextConfig),
        options = _b.options,
        body = _b.body;

    var controller;

    if (!options.signal) {
      var _c = createSignalIfSupported(),
          _controller = _c.controller,
          signal = _c.signal;

      controller = _controller;
      if (controller) options.signal = signal;
    }

    var definitionIsMutation = function (d) {
      return d.kind === 'OperationDefinition' && d.operation === 'mutation';
    };

    if (useGETForQueries && !operation.query.definitions.some(definitionIsMutation)) {
      options.method = 'GET';
    }

    if (options.method === 'GET') {
      var _d = rewriteURIForGET(chosenURI, body),
          newURI = _d.newURI,
          parseError = _d.parseError;

      if (parseError) {
        return utils.fromError(parseError);
      }

      chosenURI = newURI;
    } else {
      try {
        options.body = serializeFetchParameter(body, 'Payload');
      } catch (parseError) {
        return utils.fromError(parseError);
      }
    }

    return new utilities.Observable(function (observer) {
      fetcher(chosenURI, options).then(function (response) {
        operation.setContext({
          response: response
        });
        return response;
      }).then(parseAndCheckHttpResponse(operation)).then(function (result) {
        observer.next(result);
        observer.complete();
        return result;
      }).catch(function (err) {
        if (err.name === 'AbortError') return;

        if (err.result && err.result.errors && err.result.data) {
          observer.next(err.result);
        }

        observer.error(err);
      });
      return function () {
        if (controller) controller.abort();
      };
    });
  });
};

var HttpLink = function (_super) {
  tslib.__extends(HttpLink, _super);

  function HttpLink(options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this, createHttpLink(options).request) || this;

    _this.options = options;
    return _this;
  }

  return HttpLink;
}(core.ApolloLink);

exports.HttpLink = HttpLink;
exports.checkFetcher = checkFetcher;
exports.createHttpLink = createHttpLink;
exports.createSignalIfSupported = createSignalIfSupported;
exports.fallbackHttpConfig = fallbackHttpConfig;
exports.parseAndCheckHttpResponse = parseAndCheckHttpResponse;
exports.rewriteURIForGET = rewriteURIForGET;
exports.selectHttpOptionsAndBody = selectHttpOptionsAndBody;
exports.selectURI = selectURI;
exports.serializeFetchParameter = serializeFetchParameter;

/***/ }),

/***/ "./node_modules/@apollo/client/link/utils/utils.cjs.js":
/*!*************************************************************!*\
  !*** ./node_modules/@apollo/client/link/utils/utils.cjs.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var utilities = __webpack_require__(/*! ../../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

function fromError(errorValue) {
  return new utilities.Observable(function (observer) {
    observer.error(errorValue);
  });
}

function toPromise(observable) {
  var completed = false;
  return new Promise(function (resolve, reject) {
    observable.subscribe({
      next: function (data) {
        if (completed) {
           false || tsInvariant.invariant.warn("Promise Wrapper does not support multiple results from Observable");
        } else {
          completed = true;
          resolve(data);
        }
      },
      error: reject
    });
  });
}

function fromPromise(promise) {
  return new utilities.Observable(function (observer) {
    promise.then(function (value) {
      observer.next(value);
      observer.complete();
    }).catch(observer.error.bind(observer));
  });
}

var throwServerError = function (response, result, message) {
  var error = new Error(message);
  error.name = 'ServerError';
  error.response = response;
  error.statusCode = response.status;
  error.result = result;
  throw error;
};

function validateOperation(operation) {
  var OPERATION_FIELDS = ['query', 'operationName', 'variables', 'extensions', 'context'];

  for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
    var key = _a[_i];

    if (OPERATION_FIELDS.indexOf(key) < 0) {
      throw  false ? undefined : new tsInvariant.InvariantError("illegal argument: " + key);
    }
  }

  return operation;
}

function createOperation(starting, operation) {
  var context = tslib.__assign({}, starting);

  var setContext = function (next) {
    if (typeof next === 'function') {
      context = tslib.__assign(tslib.__assign({}, context), next(context));
    } else {
      context = tslib.__assign(tslib.__assign({}, context), next);
    }
  };

  var getContext = function () {
    return tslib.__assign({}, context);
  };

  Object.defineProperty(operation, 'setContext', {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, 'getContext', {
    enumerable: false,
    value: getContext
  });
  return operation;
}

function transformOperation(operation) {
  var transformedOperation = {
    variables: operation.variables || {},
    extensions: operation.extensions || {},
    operationName: operation.operationName,
    query: operation.query
  };

  if (!transformedOperation.operationName) {
    transformedOperation.operationName = typeof transformedOperation.query !== 'string' ? utilities.getOperationName(transformedOperation.query) || undefined : '';
  }

  return transformedOperation;
}

exports.createOperation = createOperation;
exports.fromError = fromError;
exports.fromPromise = fromPromise;
exports.throwServerError = throwServerError;
exports.toPromise = toPromise;
exports.transformOperation = transformOperation;
exports.validateOperation = validateOperation;

/***/ }),

/***/ "./node_modules/@apollo/client/main.cjs.js":
/*!*************************************************!*\
  !*** ./node_modules/@apollo/client/main.cjs.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var core = __webpack_require__(/*! ./core */ "./node_modules/@apollo/client/core/core.cjs.js");

var react = __webpack_require__(/*! ./react */ "./node_modules/@apollo/client/react/react.cjs.js");

Object.keys(core).forEach(function (k) {
  if (k !== 'default') exports[k] = core[k];
});
Object.keys(react).forEach(function (k) {
  if (k !== 'default') exports[k] = react[k];
});

/***/ }),

/***/ "./node_modules/@apollo/client/node_modules/optimism/lib/bundle.cjs.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@apollo/client/node_modules/optimism/lib/bundle.cjs.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var context = __webpack_require__(/*! @wry/context */ "./node_modules/@wry/context/lib/context.js");

function defaultDispose() {}

var Cache =
/** @class */
function () {
  function Cache(max, dispose) {
    if (max === void 0) {
      max = Infinity;
    }

    if (dispose === void 0) {
      dispose = defaultDispose;
    }

    this.max = max;
    this.dispose = dispose;
    this.map = new Map();
    this.newest = null;
    this.oldest = null;
  }

  Cache.prototype.has = function (key) {
    return this.map.has(key);
  };

  Cache.prototype.get = function (key) {
    var entry = this.getEntry(key);
    return entry && entry.value;
  };

  Cache.prototype.getEntry = function (key) {
    var entry = this.map.get(key);

    if (entry && entry !== this.newest) {
      var older = entry.older,
          newer = entry.newer;

      if (newer) {
        newer.older = older;
      }

      if (older) {
        older.newer = newer;
      }

      entry.older = this.newest;
      entry.older.newer = entry;
      entry.newer = null;
      this.newest = entry;

      if (entry === this.oldest) {
        this.oldest = newer;
      }
    }

    return entry;
  };

  Cache.prototype.set = function (key, value) {
    var entry = this.getEntry(key);

    if (entry) {
      return entry.value = value;
    }

    entry = {
      key: key,
      value: value,
      newer: null,
      older: this.newest
    };

    if (this.newest) {
      this.newest.newer = entry;
    }

    this.newest = entry;
    this.oldest = this.oldest || entry;
    this.map.set(key, entry);
    return entry.value;
  };

  Cache.prototype.clean = function () {
    while (this.oldest && this.map.size > this.max) {
      this.delete(this.oldest.key);
    }
  };

  Cache.prototype.delete = function (key) {
    var entry = this.map.get(key);

    if (entry) {
      if (entry === this.newest) {
        this.newest = entry.older;
      }

      if (entry === this.oldest) {
        this.oldest = entry.newer;
      }

      if (entry.newer) {
        entry.newer.older = entry.older;
      }

      if (entry.older) {
        entry.older.newer = entry.newer;
      }

      this.map.delete(key);
      this.dispose(entry.value, key);
      return true;
    }

    return false;
  };

  return Cache;
}();

var parentEntrySlot = new context.Slot();

function maybeUnsubscribe(entryOrDep) {
  var unsubscribe = entryOrDep.unsubscribe;

  if (typeof unsubscribe === "function") {
    entryOrDep.unsubscribe = void 0;
    unsubscribe();
  }
}

var emptySetPool = [];
var POOL_TARGET_SIZE = 100; // Since this package might be used browsers, we should avoid using the
// Node built-in assert module.

function assert(condition, optionalMessage) {
  if (!condition) {
    throw new Error(optionalMessage || "assertion failure");
  }
}

function valueIs(a, b) {
  var len = a.length;
  return (// Unknown values are not equal to each other.
    len > 0 && // Both values must be ordinary (or both exceptional) to be equal.
    len === b.length && // The underlying value or exception must be the same.
    a[len - 1] === b[len - 1]
  );
}

function valueGet(value) {
  switch (value.length) {
    case 0:
      throw new Error("unknown value");

    case 1:
      return value[0];

    case 2:
      throw value[1];
  }
}

function valueCopy(value) {
  return value.slice(0);
}

var Entry =
/** @class */
function () {
  function Entry(fn, args) {
    this.fn = fn;
    this.args = args;
    this.parents = new Set();
    this.childValues = new Map(); // When this Entry has children that are dirty, this property becomes
    // a Set containing other Entry objects, borrowed from emptySetPool.
    // When the set becomes empty, it gets recycled back to emptySetPool.

    this.dirtyChildren = null;
    this.dirty = true;
    this.recomputing = false;
    this.value = [];
    this.deps = null;
    ++Entry.count;
  }

  Entry.prototype.peek = function () {
    if (this.value.length === 1 && !mightBeDirty(this)) {
      return this.value[0];
    }
  }; // This is the most important method of the Entry API, because it
  // determines whether the cached this.value can be returned immediately,
  // or must be recomputed. The overall performance of the caching system
  // depends on the truth of the following observations: (1) this.dirty is
  // usually false, (2) this.dirtyChildren is usually null/empty, and thus
  // (3) valueGet(this.value) is usually returned without recomputation.


  Entry.prototype.recompute = function () {
    assert(!this.recomputing, "already recomputing");
    rememberParent(this);
    return mightBeDirty(this) ? reallyRecompute(this) : valueGet(this.value);
  };

  Entry.prototype.setDirty = function () {
    if (this.dirty) return;
    this.dirty = true;
    this.value.length = 0;
    reportDirty(this);
    forgetChildren(this); // We can go ahead and unsubscribe here, since any further dirty
    // notifications we receive will be redundant, and unsubscribing may
    // free up some resources, e.g. file watchers.

    maybeUnsubscribe(this);
  };

  Entry.prototype.dispose = function () {
    var _this = this;

    forgetChildren(this);
    maybeUnsubscribe(this); // Because this entry has been kicked out of the cache (in index.js),
    // we've lost the ability to find out if/when this entry becomes dirty,
    // whether that happens through a subscription, because of a direct call
    // to entry.setDirty(), or because one of its children becomes dirty.
    // Because of this loss of future information, we have to assume the
    // worst (that this entry might have become dirty very soon), so we must
    // immediately mark this entry's parents as dirty. Normally we could
    // just call entry.setDirty() rather than calling parent.setDirty() for
    // each parent, but that would leave this entry in parent.childValues
    // and parent.dirtyChildren, which would prevent the child from being
    // truly forgotten.

    this.parents.forEach(function (parent) {
      parent.setDirty();
      forgetChild(parent, _this);
    });
  };

  Entry.prototype.dependOn = function (dep) {
    dep.add(this);

    if (!this.deps) {
      this.deps = emptySetPool.pop() || new Set();
    }

    this.deps.add(dep);
  };

  Entry.prototype.forgetDeps = function () {
    var _this = this;

    if (this.deps) {
      this.deps.forEach(function (dep) {
        return dep.delete(_this);
      });
      this.deps.clear();
      emptySetPool.push(this.deps);
      this.deps = null;
    }
  };

  Entry.count = 0;
  return Entry;
}();

function rememberParent(child) {
  var parent = parentEntrySlot.getValue();

  if (parent) {
    child.parents.add(parent);

    if (!parent.childValues.has(child)) {
      parent.childValues.set(child, []);
    }

    if (mightBeDirty(child)) {
      reportDirtyChild(parent, child);
    } else {
      reportCleanChild(parent, child);
    }

    return parent;
  }
}

function reallyRecompute(entry) {
  forgetChildren(entry); // Set entry as the parent entry while calling recomputeNewValue(entry).

  parentEntrySlot.withValue(entry, recomputeNewValue, [entry]);

  if (maybeSubscribe(entry)) {
    // If we successfully recomputed entry.value and did not fail to
    // (re)subscribe, then this Entry is no longer explicitly dirty.
    setClean(entry);
  }

  return valueGet(entry.value);
}

function recomputeNewValue(entry) {
  entry.recomputing = true; // Set entry.value as unknown.

  entry.value.length = 0;

  try {
    // If entry.fn succeeds, entry.value will become a normal Value.
    entry.value[0] = entry.fn.apply(null, entry.args);
  } catch (e) {
    // If entry.fn throws, entry.value will become exceptional.
    entry.value[1] = e;
  } // Either way, this line is always reached.


  entry.recomputing = false;
}

function mightBeDirty(entry) {
  return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}

function setClean(entry) {
  entry.dirty = false;

  if (mightBeDirty(entry)) {
    // This Entry may still have dirty children, in which case we can't
    // let our parents know we're clean just yet.
    return;
  }

  reportClean(entry);
}

function reportDirty(child) {
  child.parents.forEach(function (parent) {
    return reportDirtyChild(parent, child);
  });
}

function reportClean(child) {
  child.parents.forEach(function (parent) {
    return reportCleanChild(parent, child);
  });
} // Let a parent Entry know that one of its children may be dirty.


function reportDirtyChild(parent, child) {
  // Must have called rememberParent(child) before calling
  // reportDirtyChild(parent, child).
  assert(parent.childValues.has(child));
  assert(mightBeDirty(child));

  if (!parent.dirtyChildren) {
    parent.dirtyChildren = emptySetPool.pop() || new Set();
  } else if (parent.dirtyChildren.has(child)) {
    // If we already know this child is dirty, then we must have already
    // informed our own parents that we are dirty, so we can terminate
    // the recursion early.
    return;
  }

  parent.dirtyChildren.add(child);
  reportDirty(parent);
} // Let a parent Entry know that one of its children is no longer dirty.


function reportCleanChild(parent, child) {
  // Must have called rememberChild(child) before calling
  // reportCleanChild(parent, child).
  assert(parent.childValues.has(child));
  assert(!mightBeDirty(child));
  var childValue = parent.childValues.get(child);

  if (childValue.length === 0) {
    parent.childValues.set(child, valueCopy(child.value));
  } else if (!valueIs(childValue, child.value)) {
    parent.setDirty();
  }

  removeDirtyChild(parent, child);

  if (mightBeDirty(parent)) {
    return;
  }

  reportClean(parent);
}

function removeDirtyChild(parent, child) {
  var dc = parent.dirtyChildren;

  if (dc) {
    dc.delete(child);

    if (dc.size === 0) {
      if (emptySetPool.length < POOL_TARGET_SIZE) {
        emptySetPool.push(dc);
      }

      parent.dirtyChildren = null;
    }
  }
} // Removes all children from this entry and returns an array of the
// removed children.


function forgetChildren(parent) {
  if (parent.childValues.size > 0) {
    parent.childValues.forEach(function (_value, child) {
      forgetChild(parent, child);
    });
  } // Remove this parent Entry from any sets to which it was added by the
  // addToSet method.


  parent.forgetDeps(); // After we forget all our children, this.dirtyChildren must be empty
  // and therefore must have been reset to null.

  assert(parent.dirtyChildren === null);
}

function forgetChild(parent, child) {
  child.parents.delete(parent);
  parent.childValues.delete(child);
  removeDirtyChild(parent, child);
}

function maybeSubscribe(entry) {
  if (typeof entry.subscribe === "function") {
    try {
      maybeUnsubscribe(entry); // Prevent double subscriptions.

      entry.unsubscribe = entry.subscribe.apply(null, entry.args);
    } catch (e) {
      // If this Entry has a subscribe function and it threw an exception
      // (or an unsubscribe function it previously returned now throws),
      // return false to indicate that we were not able to subscribe (or
      // unsubscribe), and this Entry should remain dirty.
      entry.setDirty();
      return false;
    }
  } // Returning true indicates either that there was no entry.subscribe
  // function or that it succeeded.


  return true;
} // A trie data structure that holds object keys weakly, yet can also hold
// non-object keys, unlike the native `WeakMap`.
// If no makeData function is supplied, the looked-up data will be an empty,
// no-prototype Object.


var defaultMakeData = function () {
  return Object.create(null);
}; // Useful for processing arguments objects as well as arrays.


var _a = Array.prototype,
    forEach = _a.forEach,
    slice = _a.slice;

var KeyTrie =
/** @class */
function () {
  function KeyTrie(weakness, makeData) {
    if (makeData === void 0) {
      makeData = defaultMakeData;
    }

    this.weakness = weakness;
    this.makeData = makeData;
  }

  KeyTrie.prototype.lookup = function () {
    var array = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      array[_i] = arguments[_i];
    }

    return this.lookupArray(array);
  };

  KeyTrie.prototype.lookupArray = function (array) {
    var node = this;
    forEach.call(array, function (key) {
      return node = node.getChildTrie(key);
    });
    return node.data || (node.data = this.makeData(slice.call(array)));
  };

  KeyTrie.prototype.getChildTrie = function (key) {
    var map = this.weakness && isObjRef(key) ? this.weak || (this.weak = new WeakMap()) : this.strong || (this.strong = new Map());
    var child = map.get(key);
    if (!child) map.set(key, child = new KeyTrie(this.weakness, this.makeData));
    return child;
  };

  return KeyTrie;
}();

function isObjRef(value) {
  switch (typeof value) {
    case "object":
      if (value === null) break;
    // Fall through to return true...

    case "function":
      return true;
  }

  return false;
}

function dep(options) {
  var depsByKey = new Map();
  var subscribe = options && options.subscribe;

  function depend(key) {
    var parent = parentEntrySlot.getValue();

    if (parent) {
      var dep_1 = depsByKey.get(key);

      if (!dep_1) {
        depsByKey.set(key, dep_1 = new Set());
      }

      parent.dependOn(dep_1);

      if (typeof subscribe === "function") {
        maybeUnsubscribe(dep_1);
        dep_1.unsubscribe = subscribe(key);
      }
    }
  }

  depend.dirty = function dirty(key) {
    var dep = depsByKey.get(key);

    if (dep) {
      dep.forEach(function (entry) {
        return entry.setDirty();
      });
      depsByKey.delete(key);
      maybeUnsubscribe(dep);
    }
  };

  return depend;
} // The defaultMakeCacheKey function is remarkably powerful, because it gives
// a unique object for any shallow-identical list of arguments. If you need
// to implement a custom makeCacheKey function, you may find it helpful to
// delegate the final work to defaultMakeCacheKey, which is why we export it
// here. However, you may want to avoid defaultMakeCacheKey if your runtime
// does not support WeakMap, or you have the ability to return a string key.
// In those cases, just write your own custom makeCacheKey functions.


var keyTrie = new KeyTrie(typeof WeakMap === "function");

function defaultMakeCacheKey() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return keyTrie.lookupArray(args);
}

var caches = new Set();

function wrap(originalFunction, options) {
  if (options === void 0) {
    options = Object.create(null);
  }

  var cache = new Cache(options.max || Math.pow(2, 16), function (entry) {
    return entry.dispose();
  });

  var keyArgs = options.keyArgs || function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return args;
  };

  var makeCacheKey = options.makeCacheKey || defaultMakeCacheKey;

  function optimistic() {
    var key = makeCacheKey.apply(null, keyArgs.apply(null, arguments));

    if (key === void 0) {
      return originalFunction.apply(null, arguments);
    }

    var args = Array.prototype.slice.call(arguments);
    var entry = cache.get(key);

    if (entry) {
      entry.args = args;
    } else {
      entry = new Entry(originalFunction, args);
      cache.set(key, entry);
      entry.subscribe = options.subscribe;
    }

    var value = entry.recompute(); // Move this entry to the front of the least-recently used queue,
    // since we just finished computing its value.

    cache.set(key, entry);
    caches.add(cache); // Clean up any excess entries in the cache, but only if there is no
    // active parent entry, meaning we're not in the middle of a larger
    // computation that might be flummoxed by the cleaning.

    if (!parentEntrySlot.hasValue()) {
      caches.forEach(function (cache) {
        return cache.clean();
      });
      caches.clear();
    }

    return value;
  }

  function lookup() {
    var key = makeCacheKey.apply(null, arguments);

    if (key !== void 0) {
      return cache.get(key);
    }
  }

  optimistic.dirty = function () {
    var entry = lookup.apply(null, arguments);

    if (entry) {
      entry.setDirty();
    }
  };

  optimistic.peek = function () {
    var entry = lookup.apply(null, arguments);

    if (entry) {
      return entry.peek();
    }
  };

  optimistic.forget = function () {
    var key = makeCacheKey.apply(null, arguments);
    return key !== void 0 && cache.delete(key);
  };

  return optimistic;
}

Object.defineProperty(exports, 'asyncFromGen', {
  enumerable: true,
  get: function () {
    return context.asyncFromGen;
  }
});
Object.defineProperty(exports, 'bindContext', {
  enumerable: true,
  get: function () {
    return context.bind;
  }
});
Object.defineProperty(exports, 'noContext', {
  enumerable: true,
  get: function () {
    return context.noContext;
  }
});
Object.defineProperty(exports, 'setTimeout', {
  enumerable: true,
  get: function () {
    return context.setTimeout;
  }
});
exports.KeyTrie = KeyTrie;
exports.defaultMakeCacheKey = defaultMakeCacheKey;
exports.dep = dep;
exports.wrap = wrap;

/***/ }),

/***/ "./node_modules/@apollo/client/node_modules/symbol-observable/lib/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@apollo/client/node_modules/symbol-observable/lib/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/@apollo/client/node_modules/symbol-observable/lib/ponyfill.js");

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}

var root;
/* global window */

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/@apollo/client/node_modules/symbol-observable/lib/ponyfill.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@apollo/client/node_modules/symbol-observable/lib/ponyfill.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var _Symbol = root.Symbol;

  if (typeof _Symbol === 'function') {
    if (_Symbol.observable) {
      result = _Symbol.observable;
    } else {
      // This just needs to be something that won't trample other user's Symbol.for use
      // It also will guide people to the source of their issues, if this is problematic.
      // META: It's a resource locator!
      result = _Symbol['for']('https://github.com/benlesh/symbol-observable');

      try {
        _Symbol.observable = result;
      } catch (err) {// Do nothing. In some environments, users have frozen `Symbol` for security reasons,
        // if it is frozen assigning to it will throw. In this case, we don't care, because
        // they will need to use the returned value from the ponyfill.
      }
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;

/***/ }),

/***/ "./node_modules/@apollo/client/react/context/context.cjs.js":
/*!******************************************************************!*\
  !*** ./node_modules/@apollo/client/react/context/context.cjs.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = _interopDefault(__webpack_require__(/*! react */ "react"));

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var contextSymbol = typeof Symbol === 'function' && Symbol.for ? Symbol.for('__APOLLO_CONTEXT__') : '__APOLLO_CONTEXT__';

function resetApolloContext() {
  Object.defineProperty(React, contextSymbol, {
    value: React.createContext({}),
    enumerable: false,
    configurable: true,
    writable: false
  });
}

function getApolloContext() {
  if (!React[contextSymbol]) {
    resetApolloContext();
  }

  return React[contextSymbol];
}

var ApolloConsumer = function (props) {
  var ApolloContext = getApolloContext();
  return React.createElement(ApolloContext.Consumer, null, function (context) {
     false ? undefined : tsInvariant.invariant(context && context.client, 'Could not find "client" in the context of ApolloConsumer. ' + 'Wrap the root component in an <ApolloProvider>.');
    return props.children(context.client);
  });
};

var ApolloProvider = function (_a) {
  var client = _a.client,
      children = _a.children;
  var ApolloContext = getApolloContext();
  return React.createElement(ApolloContext.Consumer, null, function (context) {
    if (context === void 0) {
      context = {};
    }

    if (client && context.client !== client) {
      context = Object.assign({}, context, {
        client: client
      });
    }

     false ? undefined : tsInvariant.invariant(context.client, 'ApolloProvider was not passed a client instance. Make ' + 'sure you pass in your client via the "client" prop.');
    return React.createElement(ApolloContext.Provider, {
      value: context
    }, children);
  });
};

exports.ApolloConsumer = ApolloConsumer;
exports.ApolloProvider = ApolloProvider;
exports.getApolloContext = getApolloContext;
exports.resetApolloContext = resetApolloContext;

/***/ }),

/***/ "./node_modules/@apollo/client/react/data/data.cjs.js":
/*!************************************************************!*\
  !*** ./node_modules/@apollo/client/react/data/data.cjs.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var equality = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/equality.js");

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var parser = __webpack_require__(/*! ../parser */ "./node_modules/@apollo/client/react/parser/parser.cjs.js");

var errors = __webpack_require__(/*! ../../errors */ "./node_modules/@apollo/client/errors/errors.cjs.js");

var utilities = __webpack_require__(/*! ../../utilities */ "./node_modules/@apollo/client/utilities/utilities.cjs.js");

var core = __webpack_require__(/*! ../../core */ "./node_modules/@apollo/client/core/core.cjs.js");

var OperationData = function () {
  function OperationData(options, context) {
    this.isMounted = false;
    this.previousOptions = {};
    this.context = {};
    this.options = {};
    this.options = options || {};
    this.context = context || {};
  }

  OperationData.prototype.getOptions = function () {
    return this.options;
  };

  OperationData.prototype.setOptions = function (newOptions, storePrevious) {
    if (storePrevious === void 0) {
      storePrevious = false;
    }

    if (storePrevious && !equality.equal(this.options, newOptions)) {
      this.previousOptions = this.options;
    }

    this.options = newOptions;
  };

  OperationData.prototype.unmount = function () {
    this.isMounted = false;
  };

  OperationData.prototype.refreshClient = function () {
    var client = this.options && this.options.client || this.context && this.context.client;
     false ? undefined : tsInvariant.invariant(!!client, 'Could not find "client" in the context or passed in as an option. ' + 'Wrap the root component in an <ApolloProvider>, or pass an ' + 'ApolloClient instance in via options.');
    var isNew = false;

    if (client !== this.client) {
      isNew = true;
      this.client = client;
      this.cleanup();
    }

    return {
      client: this.client,
      isNew: isNew
    };
  };

  OperationData.prototype.verifyDocumentType = function (document, type) {
    var operation = parser.parser(document);
    var requiredOperationName = parser.operationName(type);
    var usedOperationName = parser.operationName(operation.type);
     false ? undefined : tsInvariant.invariant(operation.type === type, "Running a " + requiredOperationName + " requires a graphql " + (requiredOperationName + ", but a " + usedOperationName + " was used instead."));
  };

  return OperationData;
}();

var SubscriptionData = function (_super) {
  tslib.__extends(SubscriptionData, _super);

  function SubscriptionData(_a) {
    var options = _a.options,
        context = _a.context,
        setResult = _a.setResult;

    var _this = _super.call(this, options, context) || this;

    _this.currentObservable = {};
    _this.setResult = setResult;

    _this.initialize(options);

    return _this;
  }

  SubscriptionData.prototype.execute = function (result) {
    if (this.getOptions().skip === true) {
      this.cleanup();
      return {
        loading: false,
        error: undefined,
        data: undefined,
        variables: this.getOptions().variables
      };
    }

    var currentResult = result;

    if (this.refreshClient().isNew) {
      currentResult = this.getLoadingResult();
    }

    var shouldResubscribe = this.getOptions().shouldResubscribe;

    if (typeof shouldResubscribe === 'function') {
      shouldResubscribe = !!shouldResubscribe(this.getOptions());
    }

    if (shouldResubscribe !== false && this.previousOptions && Object.keys(this.previousOptions).length > 0 && (this.previousOptions.subscription !== this.getOptions().subscription || !equality.equal(this.previousOptions.variables, this.getOptions().variables) || this.previousOptions.skip !== this.getOptions().skip)) {
      this.cleanup();
      currentResult = this.getLoadingResult();
    }

    this.initialize(this.getOptions());
    this.startSubscription();
    this.previousOptions = this.getOptions();
    return tslib.__assign(tslib.__assign({}, currentResult), {
      variables: this.getOptions().variables
    });
  };

  SubscriptionData.prototype.afterExecute = function () {
    this.isMounted = true;
  };

  SubscriptionData.prototype.cleanup = function () {
    this.endSubscription();
    delete this.currentObservable.query;
  };

  SubscriptionData.prototype.initialize = function (options) {
    if (this.currentObservable.query || this.getOptions().skip === true) return;
    this.currentObservable.query = this.refreshClient().client.subscribe({
      query: options.subscription,
      variables: options.variables,
      fetchPolicy: options.fetchPolicy
    });
  };

  SubscriptionData.prototype.startSubscription = function () {
    if (this.currentObservable.subscription) return;
    this.currentObservable.subscription = this.currentObservable.query.subscribe({
      next: this.updateCurrentData.bind(this),
      error: this.updateError.bind(this),
      complete: this.completeSubscription.bind(this)
    });
  };

  SubscriptionData.prototype.getLoadingResult = function () {
    return {
      loading: true,
      error: undefined,
      data: undefined
    };
  };

  SubscriptionData.prototype.updateResult = function (result) {
    if (this.isMounted) {
      this.setResult(result);
    }
  };

  SubscriptionData.prototype.updateCurrentData = function (result) {
    var onSubscriptionData = this.getOptions().onSubscriptionData;
    this.updateResult({
      data: result.data,
      loading: false,
      error: undefined
    });

    if (onSubscriptionData) {
      onSubscriptionData({
        client: this.refreshClient().client,
        subscriptionData: result
      });
    }
  };

  SubscriptionData.prototype.updateError = function (error) {
    this.updateResult({
      error: error,
      loading: false
    });
  };

  SubscriptionData.prototype.completeSubscription = function () {
    var onSubscriptionComplete = this.getOptions().onSubscriptionComplete;
    if (onSubscriptionComplete) onSubscriptionComplete();
    this.endSubscription();
  };

  SubscriptionData.prototype.endSubscription = function () {
    if (this.currentObservable.subscription) {
      this.currentObservable.subscription.unsubscribe();
      delete this.currentObservable.subscription;
    }
  };

  return SubscriptionData;
}(OperationData);

var MutationData = function (_super) {
  tslib.__extends(MutationData, _super);

  function MutationData(_a) {
    var options = _a.options,
        context = _a.context,
        result = _a.result,
        setResult = _a.setResult;

    var _this = _super.call(this, options, context) || this;

    _this.runMutation = function (mutationFunctionOptions) {
      if (mutationFunctionOptions === void 0) {
        mutationFunctionOptions = {};
      }

      _this.onMutationStart();

      var mutationId = _this.generateNewMutationId();

      return _this.mutate(mutationFunctionOptions).then(function (response) {
        _this.onMutationCompleted(response, mutationId);

        return response;
      }).catch(function (error) {
        _this.onMutationError(error, mutationId);

        if (!_this.getOptions().onError) throw error;
      });
    };

    _this.verifyDocumentType(options.mutation, parser.DocumentType.Mutation);

    _this.result = result;
    _this.setResult = setResult;
    _this.mostRecentMutationId = 0;
    return _this;
  }

  MutationData.prototype.execute = function (result) {
    this.isMounted = true;
    this.verifyDocumentType(this.getOptions().mutation, parser.DocumentType.Mutation);
    return [this.runMutation, tslib.__assign(tslib.__assign({}, result), {
      client: this.refreshClient().client
    })];
  };

  MutationData.prototype.afterExecute = function () {
    this.isMounted = true;
    return this.unmount.bind(this);
  };

  MutationData.prototype.cleanup = function () {};

  MutationData.prototype.mutate = function (mutationFunctionOptions) {
    return this.refreshClient().client.mutate(utilities.compact(this.getOptions(), mutationFunctionOptions));
  };

  MutationData.prototype.onMutationStart = function () {
    if (!this.result.loading && !this.getOptions().ignoreResults) {
      this.updateResult({
        loading: true,
        error: undefined,
        data: undefined,
        called: true
      });
    }
  };

  MutationData.prototype.onMutationCompleted = function (response, mutationId) {
    var _a = this.getOptions(),
        onCompleted = _a.onCompleted,
        ignoreResults = _a.ignoreResults;

    var data = response.data,
        errors$1 = response.errors;
    var error = errors$1 && errors$1.length > 0 ? new errors.ApolloError({
      graphQLErrors: errors$1
    }) : undefined;

    var callOncomplete = function () {
      return onCompleted ? onCompleted(data) : null;
    };

    if (this.isMostRecentMutation(mutationId) && !ignoreResults) {
      this.updateResult({
        called: true,
        loading: false,
        data: data,
        error: error
      });
    }

    callOncomplete();
  };

  MutationData.prototype.onMutationError = function (error, mutationId) {
    var onError = this.getOptions().onError;

    if (this.isMostRecentMutation(mutationId)) {
      this.updateResult({
        loading: false,
        error: error,
        data: undefined,
        called: true
      });
    }

    if (onError) {
      onError(error);
    }
  };

  MutationData.prototype.generateNewMutationId = function () {
    return ++this.mostRecentMutationId;
  };

  MutationData.prototype.isMostRecentMutation = function (mutationId) {
    return this.mostRecentMutationId === mutationId;
  };

  MutationData.prototype.updateResult = function (result) {
    if (this.isMounted && (!this.previousResult || !equality.equal(this.previousResult, result))) {
      this.setResult(result);
      this.previousResult = result;
    }
  };

  return MutationData;
}(OperationData);

var QueryData = function (_super) {
  tslib.__extends(QueryData, _super);

  function QueryData(_a) {
    var options = _a.options,
        context = _a.context,
        onNewData = _a.onNewData;

    var _this = _super.call(this, options, context) || this;

    _this.previousData = {};
    _this.runLazy = false;

    _this.runLazyQuery = function (options) {
      _this.cleanup();

      _this.runLazy = true;
      _this.lazyOptions = options;

      _this.onNewData();
    };

    _this.getQueryResult = function () {
      var result = _this.observableQueryFields();

      var options = _this.getOptions();

      if (options.skip) {
        result = tslib.__assign(tslib.__assign({}, result), {
          data: undefined,
          error: undefined,
          loading: false,
          called: true
        });
      } else if (_this.currentObservable) {
        var currentResult = _this.currentObservable.getCurrentResult();

        var data = currentResult.data,
            loading = currentResult.loading,
            partial = currentResult.partial,
            networkStatus = currentResult.networkStatus,
            errors$1 = currentResult.errors;
        var error = currentResult.error;

        if (errors$1 && errors$1.length > 0) {
          error = new errors.ApolloError({
            graphQLErrors: errors$1
          });
        }

        result = tslib.__assign(tslib.__assign({}, result), {
          data: data,
          loading: loading,
          networkStatus: networkStatus,
          error: error,
          called: true
        });
        if (loading) ;else if (error) {
          Object.assign(result, {
            data: (_this.currentObservable.getLastResult() || {}).data
          });
        } else {
          var fetchPolicy = _this.currentObservable.options.fetchPolicy;
          var partialRefetch = options.partialRefetch;

          if (partialRefetch && partial && (!data || Object.keys(data).length === 0) && fetchPolicy !== 'cache-only') {
            Object.assign(result, {
              loading: true,
              networkStatus: core.NetworkStatus.loading
            });
            result.refetch();
            return result;
          }
        }
      }

      result.client = _this.client;

      _this.setOptions(options, true);

      _this.previousData.loading = _this.previousData.result && _this.previousData.result.loading || false;
      _this.previousData.result = result;
      _this.currentObservable && _this.currentObservable.resetQueryStoreErrors();
      return result;
    };

    _this.obsRefetch = function (variables) {
      return _this.currentObservable.refetch(variables);
    };

    _this.obsFetchMore = function (fetchMoreOptions) {
      return _this.currentObservable.fetchMore(fetchMoreOptions);
    };

    _this.obsUpdateQuery = function (mapFn) {
      return _this.currentObservable.updateQuery(mapFn);
    };

    _this.obsStartPolling = function (pollInterval) {
      var _a;

      (_a = _this.currentObservable) === null || _a === void 0 ? void 0 : _a.startPolling(pollInterval);
    };

    _this.obsStopPolling = function () {
      var _a;

      (_a = _this.currentObservable) === null || _a === void 0 ? void 0 : _a.stopPolling();
    };

    _this.obsSubscribeToMore = function (options) {
      return _this.currentObservable.subscribeToMore(options);
    };

    _this.onNewData = onNewData;
    return _this;
  }

  QueryData.prototype.execute = function () {
    this.refreshClient();

    var _a = this.getOptions(),
        skip = _a.skip,
        query = _a.query;

    if (skip || query !== this.previousData.query) {
      this.removeQuerySubscription();
      this.previousData.query = query;
    }

    this.updateObservableQuery();
    if (this.isMounted) this.startQuerySubscription();
    return this.getExecuteSsrResult() || this.getExecuteResult();
  };

  QueryData.prototype.executeLazy = function () {
    return !this.runLazy ? [this.runLazyQuery, {
      loading: false,
      networkStatus: core.NetworkStatus.ready,
      called: false,
      data: undefined
    }] : [this.runLazyQuery, this.execute()];
  };

  QueryData.prototype.fetchData = function () {
    var _this = this;

    var options = this.getOptions();
    if (options.skip || options.ssr === false) return false;
    return new Promise(function (resolve) {
      return _this.startQuerySubscription(resolve);
    });
  };

  QueryData.prototype.afterExecute = function (_a) {
    var _b = (_a === void 0 ? {} : _a).lazy,
        lazy = _b === void 0 ? false : _b;
    this.isMounted = true;

    if (!lazy || this.runLazy) {
      this.handleErrorOrCompleted();
    }

    this.previousOptions = this.getOptions();
    return this.unmount.bind(this);
  };

  QueryData.prototype.cleanup = function () {
    this.removeQuerySubscription();
    delete this.currentObservable;
    delete this.previousData.result;
  };

  QueryData.prototype.getOptions = function () {
    var options = _super.prototype.getOptions.call(this);

    if (this.lazyOptions) {
      options.variables = tslib.__assign(tslib.__assign({}, options.variables), this.lazyOptions.variables);
      options.context = tslib.__assign(tslib.__assign({}, options.context), this.lazyOptions.context);
    }

    if (this.runLazy) {
      delete options.skip;
    }

    return options;
  };

  QueryData.prototype.ssrInitiated = function () {
    return this.context && this.context.renderPromises;
  };

  QueryData.prototype.getExecuteResult = function () {
    var result = this.getQueryResult();
    this.startQuerySubscription();
    return result;
  };

  QueryData.prototype.getExecuteSsrResult = function () {
    var ssrDisabled = this.getOptions().ssr === false;
    var fetchDisabled = this.refreshClient().client.disableNetworkFetches;

    var ssrLoading = tslib.__assign({
      loading: true,
      networkStatus: core.NetworkStatus.loading,
      called: true,
      data: undefined,
      stale: false,
      client: this.client
    }, this.observableQueryFields());

    if (ssrDisabled && (this.ssrInitiated() || fetchDisabled)) {
      this.previousData.result = ssrLoading;
      return ssrLoading;
    }

    var result;

    if (this.ssrInitiated()) {
      result = this.context.renderPromises.addQueryPromise(this, this.getQueryResult) || ssrLoading;
    }

    return result;
  };

  QueryData.prototype.prepareObservableQueryOptions = function () {
    var options = this.getOptions();
    this.verifyDocumentType(options.query, parser.DocumentType.Query);
    var displayName = options.displayName || 'Query';

    if (this.ssrInitiated() && (options.fetchPolicy === 'network-only' || options.fetchPolicy === 'cache-and-network')) {
      options.fetchPolicy = 'cache-first';
    }

    return tslib.__assign(tslib.__assign({}, options), {
      displayName: displayName,
      context: options.context
    });
  };

  QueryData.prototype.initializeObservableQuery = function () {
    if (this.ssrInitiated()) {
      this.currentObservable = this.context.renderPromises.getSSRObservable(this.getOptions());
    }

    if (!this.currentObservable) {
      var observableQueryOptions = this.prepareObservableQueryOptions();
      this.previousData.observableQueryOptions = tslib.__assign(tslib.__assign({}, observableQueryOptions), {
        children: null
      });
      this.currentObservable = this.refreshClient().client.watchQuery(tslib.__assign({}, observableQueryOptions));

      if (this.ssrInitiated()) {
        this.context.renderPromises.registerSSRObservable(this.currentObservable, observableQueryOptions);
      }
    }
  };

  QueryData.prototype.updateObservableQuery = function () {
    if (!this.currentObservable) {
      this.initializeObservableQuery();
      return;
    }

    if (this.getOptions().skip) return;

    var newObservableQueryOptions = tslib.__assign(tslib.__assign({}, this.prepareObservableQueryOptions()), {
      children: null
    });

    if (!equality.equal(newObservableQueryOptions, this.previousData.observableQueryOptions)) {
      this.previousData.observableQueryOptions = newObservableQueryOptions;
      this.currentObservable.setOptions(newObservableQueryOptions).catch(function () {});
    }
  };

  QueryData.prototype.startQuerySubscription = function (onNewData) {
    var _this = this;

    if (onNewData === void 0) {
      onNewData = this.onNewData;
    }

    if (this.currentSubscription || this.getOptions().skip) return;
    this.currentSubscription = this.currentObservable.subscribe({
      next: function (_a) {
        var loading = _a.loading,
            networkStatus = _a.networkStatus,
            data = _a.data;
        var previousResult = _this.previousData.result;

        if (previousResult && previousResult.loading === loading && previousResult.networkStatus === networkStatus && equality.equal(previousResult.data, data)) {
          return;
        }

        onNewData();
      },
      error: function (error) {
        _this.resubscribeToQuery();

        if (!error.hasOwnProperty('graphQLErrors')) throw error;
        var previousResult = _this.previousData.result;

        if (previousResult && previousResult.loading || !equality.equal(error, _this.previousData.error)) {
          _this.previousData.error = error;
          onNewData();
        }
      }
    });
  };

  QueryData.prototype.resubscribeToQuery = function () {
    this.removeQuerySubscription();
    var currentObservable = this.currentObservable;

    if (currentObservable) {
      var lastError = currentObservable.getLastError();
      var lastResult = currentObservable.getLastResult();
      currentObservable.resetLastResults();
      this.startQuerySubscription();
      Object.assign(currentObservable, {
        lastError: lastError,
        lastResult: lastResult
      });
    }
  };

  QueryData.prototype.handleErrorOrCompleted = function () {
    if (!this.currentObservable || !this.previousData.result) return;
    var _a = this.previousData.result,
        data = _a.data,
        loading = _a.loading,
        error = _a.error;

    if (!loading) {
      var _b = this.getOptions(),
          query = _b.query,
          variables = _b.variables,
          onCompleted = _b.onCompleted,
          onError = _b.onError,
          skip = _b.skip;

      if (this.previousOptions && !this.previousData.loading && equality.equal(this.previousOptions.query, query) && equality.equal(this.previousOptions.variables, variables)) {
        return;
      }

      if (onCompleted && !error && !skip) {
        onCompleted(data);
      } else if (onError && error) {
        onError(error);
      }
    }
  };

  QueryData.prototype.removeQuerySubscription = function () {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
      delete this.currentSubscription;
    }
  };

  QueryData.prototype.observableQueryFields = function () {
    var _a;

    return {
      variables: (_a = this.currentObservable) === null || _a === void 0 ? void 0 : _a.variables,
      refetch: this.obsRefetch,
      fetchMore: this.obsFetchMore,
      updateQuery: this.obsUpdateQuery,
      startPolling: this.obsStartPolling,
      stopPolling: this.obsStopPolling,
      subscribeToMore: this.obsSubscribeToMore
    };
  };

  return QueryData;
}(OperationData);

exports.MutationData = MutationData;
exports.OperationData = OperationData;
exports.QueryData = QueryData;
exports.SubscriptionData = SubscriptionData;

/***/ }),

/***/ "./node_modules/@apollo/client/react/hooks/hooks.cjs.js":
/*!**************************************************************!*\
  !*** ./node_modules/@apollo/client/react/hooks/hooks.cjs.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = __webpack_require__(/*! react */ "react");

var React__default = _interopDefault(React);

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var context = __webpack_require__(/*! ../context */ "./node_modules/@apollo/client/react/context/context.cjs.js");

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var data = __webpack_require__(/*! ../data */ "./node_modules/@apollo/client/react/data/data.cjs.js");

var equality = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/equality.js");

function useApolloClient() {
  var client = React__default.useContext(context.getApolloContext()).client;
   false ? undefined : tsInvariant.invariant(client, 'No Apollo Client instance can be found. Please ensure that you ' + 'have called `ApolloProvider` higher up in your tree.');
  return client;
}

function useDeepMemo(memoFn, key) {
  var ref = React.useRef();

  if (!ref.current || !equality.equal(key, ref.current.key)) {
    ref.current = {
      key: key,
      value: memoFn()
    };
  }

  return ref.current.value;
}

function useBaseQuery(query, options, lazy) {
  if (lazy === void 0) {
    lazy = false;
  }

  var context$1 = React.useContext(context.getApolloContext());

  var _a = React.useReducer(function (x) {
    return x + 1;
  }, 0),
      tick = _a[0],
      forceUpdate = _a[1];

  var updatedOptions = options ? tslib.__assign(tslib.__assign({}, options), {
    query: query
  }) : {
    query: query
  };
  var queryDataRef = React.useRef();
  var queryData = queryDataRef.current || new data.QueryData({
    options: updatedOptions,
    context: context$1,
    onNewData: function () {
      if (!queryData.ssrInitiated()) {
        Promise.resolve().then(forceUpdate);
      } else {
        forceUpdate();
      }
    }
  });
  queryData.setOptions(updatedOptions);
  queryData.context = context$1;

  if (queryData.ssrInitiated() && !queryDataRef.current) {
    queryDataRef.current = queryData;
  }

  var memo = {
    options: tslib.__assign(tslib.__assign({}, updatedOptions), {
      onError: undefined,
      onCompleted: undefined
    }),
    context: context$1,
    tick: tick
  };
  var result = useDeepMemo(function () {
    return lazy ? queryData.executeLazy() : queryData.execute();
  }, memo);
  var queryResult = lazy ? result[1] : result;
  React.useEffect(function () {
    if (!queryDataRef.current) {
      queryDataRef.current = queryData;
    }

    return function () {
      return queryData.cleanup();
    };
  }, []);
  React.useEffect(function () {
    return queryData.afterExecute({
      lazy: lazy
    });
  }, [queryResult.loading, queryResult.networkStatus, queryResult.error, queryResult.data]);
  return result;
}

function useLazyQuery(query, options) {
  return useBaseQuery(query, options, true);
}

function useMutation(mutation, options) {
  var context$1 = React.useContext(context.getApolloContext());

  var _a = React.useState({
    called: false,
    loading: false
  }),
      result = _a[0],
      setResult = _a[1];

  var updatedOptions = options ? tslib.__assign(tslib.__assign({}, options), {
    mutation: mutation
  }) : {
    mutation: mutation
  };
  var mutationDataRef = React.useRef();

  function getMutationDataRef() {
    if (!mutationDataRef.current) {
      mutationDataRef.current = new data.MutationData({
        options: updatedOptions,
        context: context$1,
        result: result,
        setResult: setResult
      });
    }

    return mutationDataRef.current;
  }

  var mutationData = getMutationDataRef();
  mutationData.setOptions(updatedOptions);
  mutationData.context = context$1;
  React.useEffect(function () {
    return mutationData.afterExecute();
  });
  return mutationData.execute(result);
}

function useQuery(query, options) {
  return useBaseQuery(query, options, false);
}

function useSubscription(subscription, options) {
  var context$1 = React.useContext(context.getApolloContext());
  var updatedOptions = options ? tslib.__assign(tslib.__assign({}, options), {
    subscription: subscription
  }) : {
    subscription: subscription
  };

  var _a = React.useState({
    loading: !updatedOptions.skip,
    error: undefined,
    data: undefined
  }),
      result = _a[0],
      setResult = _a[1];

  var subscriptionDataRef = React.useRef();

  function getSubscriptionDataRef() {
    if (!subscriptionDataRef.current) {
      subscriptionDataRef.current = new data.SubscriptionData({
        options: updatedOptions,
        context: context$1,
        setResult: setResult
      });
    }

    return subscriptionDataRef.current;
  }

  var subscriptionData = getSubscriptionDataRef();
  subscriptionData.setOptions(updatedOptions, true);
  subscriptionData.context = context$1;
  React.useEffect(function () {
    return subscriptionData.afterExecute();
  });
  React.useEffect(function () {
    return subscriptionData.cleanup.bind(subscriptionData);
  }, []);
  return subscriptionData.execute(result);
}

function useReactiveVar(rv) {
  var value = rv();
  var mute = rv.onNextChange(React.useState(value)[1]);
  React.useEffect(function () {
    return mute;
  }, []);
  return value;
}

exports.useApolloClient = useApolloClient;
exports.useLazyQuery = useLazyQuery;
exports.useMutation = useMutation;
exports.useQuery = useQuery;
exports.useReactiveVar = useReactiveVar;
exports.useSubscription = useSubscription;

/***/ }),

/***/ "./node_modules/@apollo/client/react/parser/parser.cjs.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/react/parser/parser.cjs.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

(function (DocumentType) {
  DocumentType[DocumentType["Query"] = 0] = "Query";
  DocumentType[DocumentType["Mutation"] = 1] = "Mutation";
  DocumentType[DocumentType["Subscription"] = 2] = "Subscription";
})(exports.DocumentType || (exports.DocumentType = {}));

var cache = new Map();

function operationName(type) {
  var name;

  switch (type) {
    case exports.DocumentType.Query:
      name = 'Query';
      break;

    case exports.DocumentType.Mutation:
      name = 'Mutation';
      break;

    case exports.DocumentType.Subscription:
      name = 'Subscription';
      break;
  }

  return name;
}

function parser(document) {
  var cached = cache.get(document);
  if (cached) return cached;
  var variables, type, name;
   false ? undefined : tsInvariant.invariant(!!document && !!document.kind, "Argument of " + document + " passed to parser was not a valid GraphQL " + "DocumentNode. You may need to use 'graphql-tag' or another method " + "to convert your operation into a document");
  var fragments = document.definitions.filter(function (x) {
    return x.kind === 'FragmentDefinition';
  });
  var queries = document.definitions.filter(function (x) {
    return x.kind === 'OperationDefinition' && x.operation === 'query';
  });
  var mutations = document.definitions.filter(function (x) {
    return x.kind === 'OperationDefinition' && x.operation === 'mutation';
  });
  var subscriptions = document.definitions.filter(function (x) {
    return x.kind === 'OperationDefinition' && x.operation === 'subscription';
  });
   false ? undefined : tsInvariant.invariant(!fragments.length || queries.length || mutations.length || subscriptions.length, "Passing only a fragment to 'graphql' is not yet supported. " + "You must include a query, subscription or mutation as well");
   false ? undefined : tsInvariant.invariant(queries.length + mutations.length + subscriptions.length <= 1, "react-apollo only supports a query, subscription, or a mutation per HOC. " + (document + " had " + queries.length + " queries, " + subscriptions.length + " ") + ("subscriptions and " + mutations.length + " mutations. ") + "You can use 'compose' to join multiple operation types to a component");
  type = queries.length ? exports.DocumentType.Query : exports.DocumentType.Mutation;
  if (!queries.length && !mutations.length) type = exports.DocumentType.Subscription;
  var definitions = queries.length ? queries : mutations.length ? mutations : subscriptions;
   false ? undefined : tsInvariant.invariant(definitions.length === 1, "react-apollo only supports one definition per HOC. " + document + " had " + (definitions.length + " definitions. ") + "You can use 'compose' to join multiple operation types to a component");
  var definition = definitions[0];
  variables = definition.variableDefinitions || [];

  if (definition.name && definition.name.kind === 'Name') {
    name = definition.name.value;
  } else {
    name = 'data';
  }

  var payload = {
    name: name,
    type: type,
    variables: variables
  };
  cache.set(document, payload);
  return payload;
}

exports.operationName = operationName;
exports.parser = parser;

/***/ }),

/***/ "./node_modules/@apollo/client/react/react.cjs.js":
/*!********************************************************!*\
  !*** ./node_modules/@apollo/client/react/react.cjs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var context = __webpack_require__(/*! ./context */ "./node_modules/@apollo/client/react/context/context.cjs.js");

var hooks = __webpack_require__(/*! ./hooks */ "./node_modules/@apollo/client/react/hooks/hooks.cjs.js");

var parser = __webpack_require__(/*! ./parser */ "./node_modules/@apollo/client/react/parser/parser.cjs.js");

Object.keys(hooks).forEach(function (k) {
  if (k !== 'default') exports[k] = hooks[k];
});
exports.ApolloConsumer = context.ApolloConsumer;
exports.ApolloProvider = context.ApolloProvider;
exports.getApolloContext = context.getApolloContext;
exports.resetApolloContext = context.resetApolloContext;
exports.DocumentType = parser.DocumentType;
exports.operationName = parser.operationName;
exports.parser = parser.parser;

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/utilities.cjs.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/utilities.cjs.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var visitor = __webpack_require__(/*! graphql/language/visitor */ "./node_modules/graphql/language/visitor.mjs");

var tsInvariant = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var stringify = _interopDefault(__webpack_require__(/*! fast-json-stable-stringify */ "./node_modules/fast-json-stable-stringify/index.js"));

var Observable = _interopDefault(__webpack_require__(/*! zen-observable */ "./node_modules/zen-observable/index.js"));

__webpack_require__(/*! symbol-observable */ "./node_modules/@apollo/client/node_modules/symbol-observable/lib/index.js");

function shouldInclude(_a, variables) {
  var directives = _a.directives;

  if (!directives || !directives.length) {
    return true;
  }

  return getInclusionDirectives(directives).every(function (_a) {
    var directive = _a.directive,
        ifArgument = _a.ifArgument;
    var evaledValue = false;

    if (ifArgument.value.kind === 'Variable') {
      evaledValue = variables && variables[ifArgument.value.name.value];
       false ? undefined : tsInvariant.invariant(evaledValue !== void 0, "Invalid variable referenced in @" + directive.name.value + " directive.");
    } else {
      evaledValue = ifArgument.value.value;
    }

    return directive.name.value === 'skip' ? !evaledValue : evaledValue;
  });
}

function getDirectiveNames(root) {
  var names = [];
  visitor.visit(root, {
    Directive: function (node) {
      names.push(node.name.value);
    }
  });
  return names;
}

function hasDirectives(names, root) {
  return getDirectiveNames(root).some(function (name) {
    return names.indexOf(name) > -1;
  });
}

function hasClientExports(document) {
  return document && hasDirectives(['client'], document) && hasDirectives(['export'], document);
}

function isInclusionDirective(_a) {
  var value = _a.name.value;
  return value === 'skip' || value === 'include';
}

function getInclusionDirectives(directives) {
  var result = [];

  if (directives && directives.length) {
    directives.forEach(function (directive) {
      if (!isInclusionDirective(directive)) return;
      var directiveArguments = directive.arguments;
      var directiveName = directive.name.value;
       false ? undefined : tsInvariant.invariant(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @" + directiveName + " directive.");
      var ifArgument = directiveArguments[0];
       false ? undefined : tsInvariant.invariant(ifArgument.name && ifArgument.name.value === 'if', "Invalid argument for the @" + directiveName + " directive.");
      var ifValue = ifArgument.value;
       false ? undefined : tsInvariant.invariant(ifValue && (ifValue.kind === 'Variable' || ifValue.kind === 'BooleanValue'), "Argument for the @" + directiveName + " directive must be a variable or a boolean value.");
      result.push({
        directive: directive,
        ifArgument: ifArgument
      });
    });
  }

  return result;
}

function getFragmentQueryDocument(document, fragmentName) {
  var actualFragmentName = fragmentName;
  var fragments = [];
  document.definitions.forEach(function (definition) {
    if (definition.kind === 'OperationDefinition') {
      throw  false ? undefined : new tsInvariant.InvariantError("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " + 'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
    }

    if (definition.kind === 'FragmentDefinition') {
      fragments.push(definition);
    }
  });

  if (typeof actualFragmentName === 'undefined') {
     false ? undefined : tsInvariant.invariant(fragments.length === 1, "Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
    actualFragmentName = fragments[0].name.value;
  }

  var query = tslib.__assign(tslib.__assign({}, document), {
    definitions: tslib.__spreadArrays([{
      kind: 'OperationDefinition',
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{
          kind: 'FragmentSpread',
          name: {
            kind: 'Name',
            value: actualFragmentName
          }
        }]
      }
    }], document.definitions)
  });

  return query;
}

function createFragmentMap(fragments) {
  if (fragments === void 0) {
    fragments = [];
  }

  var symTable = {};
  fragments.forEach(function (fragment) {
    symTable[fragment.name.value] = fragment;
  });
  return symTable;
}

function getFragmentFromSelection(selection, fragmentMap) {
  switch (selection.kind) {
    case 'InlineFragment':
      return selection;

    case 'FragmentSpread':
      {
        var fragment = fragmentMap && fragmentMap[selection.name.value];
         false ? undefined : tsInvariant.invariant(fragment, "No fragment named " + selection.name.value + ".");
        return fragment;
      }

    default:
      return null;
  }
}

function makeReference(id) {
  return {
    __ref: String(id)
  };
}

function isReference(obj) {
  return Boolean(obj && typeof obj === 'object' && typeof obj.__ref === 'string');
}

function isStringValue(value) {
  return value.kind === 'StringValue';
}

function isBooleanValue(value) {
  return value.kind === 'BooleanValue';
}

function isIntValue(value) {
  return value.kind === 'IntValue';
}

function isFloatValue(value) {
  return value.kind === 'FloatValue';
}

function isVariable(value) {
  return value.kind === 'Variable';
}

function isObjectValue(value) {
  return value.kind === 'ObjectValue';
}

function isListValue(value) {
  return value.kind === 'ListValue';
}

function isEnumValue(value) {
  return value.kind === 'EnumValue';
}

function isNullValue(value) {
  return value.kind === 'NullValue';
}

function valueToObjectRepresentation(argObj, name, value, variables) {
  if (isIntValue(value) || isFloatValue(value)) {
    argObj[name.value] = Number(value.value);
  } else if (isBooleanValue(value) || isStringValue(value)) {
    argObj[name.value] = value.value;
  } else if (isObjectValue(value)) {
    var nestedArgObj_1 = {};
    value.fields.map(function (obj) {
      return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
    });
    argObj[name.value] = nestedArgObj_1;
  } else if (isVariable(value)) {
    var variableValue = (variables || {})[value.name.value];
    argObj[name.value] = variableValue;
  } else if (isListValue(value)) {
    argObj[name.value] = value.values.map(function (listValue) {
      var nestedArgArrayObj = {};
      valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
      return nestedArgArrayObj[name.value];
    });
  } else if (isEnumValue(value)) {
    argObj[name.value] = value.value;
  } else if (isNullValue(value)) {
    argObj[name.value] = null;
  } else {
    throw  false ? undefined : new tsInvariant.InvariantError("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\"" + 'is not supported. Use variables instead of inline arguments to ' + 'overcome this limitation.');
  }
}

function storeKeyNameFromField(field, variables) {
  var directivesObj = null;

  if (field.directives) {
    directivesObj = {};
    field.directives.forEach(function (directive) {
      directivesObj[directive.name.value] = {};

      if (directive.arguments) {
        directive.arguments.forEach(function (_a) {
          var name = _a.name,
              value = _a.value;
          return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
        });
      }
    });
  }

  var argObj = null;

  if (field.arguments && field.arguments.length) {
    argObj = {};
    field.arguments.forEach(function (_a) {
      var name = _a.name,
          value = _a.value;
      return valueToObjectRepresentation(argObj, name, value, variables);
    });
  }

  return getStoreKeyName(field.name.value, argObj, directivesObj);
}

var KNOWN_DIRECTIVES = ['connection', 'include', 'skip', 'client', 'rest', 'export'];

function getStoreKeyName(fieldName, args, directives) {
  if (args && directives && directives['connection'] && directives['connection']['key']) {
    if (directives['connection']['filter'] && directives['connection']['filter'].length > 0) {
      var filterKeys = directives['connection']['filter'] ? directives['connection']['filter'] : [];
      filterKeys.sort();
      var filteredArgs_1 = {};
      filterKeys.forEach(function (key) {
        filteredArgs_1[key] = args[key];
      });
      return directives['connection']['key'] + "(" + JSON.stringify(filteredArgs_1) + ")";
    } else {
      return directives['connection']['key'];
    }
  }

  var completeFieldName = fieldName;

  if (args) {
    var stringifiedArgs = stringify(args);
    completeFieldName += "(" + stringifiedArgs + ")";
  }

  if (directives) {
    Object.keys(directives).forEach(function (key) {
      if (KNOWN_DIRECTIVES.indexOf(key) !== -1) return;

      if (directives[key] && Object.keys(directives[key]).length) {
        completeFieldName += "@" + key + "(" + JSON.stringify(directives[key]) + ")";
      } else {
        completeFieldName += "@" + key;
      }
    });
  }

  return completeFieldName;
}

function argumentsObjectFromField(field, variables) {
  if (field.arguments && field.arguments.length) {
    var argObj_1 = {};
    field.arguments.forEach(function (_a) {
      var name = _a.name,
          value = _a.value;
      return valueToObjectRepresentation(argObj_1, name, value, variables);
    });
    return argObj_1;
  }

  return null;
}

function resultKeyNameFromField(field) {
  return field.alias ? field.alias.value : field.name.value;
}

function getTypenameFromResult(result, selectionSet, fragmentMap) {
  if (typeof result.__typename === 'string') {
    return result.__typename;
  }

  for (var _i = 0, _a = selectionSet.selections; _i < _a.length; _i++) {
    var selection = _a[_i];

    if (isField(selection)) {
      if (selection.name.value === '__typename') {
        return result[resultKeyNameFromField(selection)];
      }
    } else {
      var typename = getTypenameFromResult(result, getFragmentFromSelection(selection, fragmentMap).selectionSet, fragmentMap);

      if (typeof typename === 'string') {
        return typename;
      }
    }
  }
}

function isField(selection) {
  return selection.kind === 'Field';
}

function isInlineFragment(selection) {
  return selection.kind === 'InlineFragment';
}

function checkDocument(doc) {
   false ? undefined : tsInvariant.invariant(doc && doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
  var operations = doc.definitions.filter(function (d) {
    return d.kind !== 'FragmentDefinition';
  }).map(function (definition) {
    if (definition.kind !== 'OperationDefinition') {
      throw  false ? undefined : new tsInvariant.InvariantError("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
    }

    return definition;
  });
   false ? undefined : tsInvariant.invariant(operations.length <= 1, "Ambiguous GraphQL document: contains " + operations.length + " operations");
  return doc;
}

function getOperationDefinition(doc) {
  checkDocument(doc);
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition';
  })[0];
}

function getOperationName(doc) {
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition' && definition.name;
  }).map(function (x) {
    return x.name.value;
  })[0] || null;
}

function getFragmentDefinitions(doc) {
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'FragmentDefinition';
  });
}

function getQueryDefinition(doc) {
  var queryDef = getOperationDefinition(doc);
   false ? undefined : tsInvariant.invariant(queryDef && queryDef.operation === 'query', 'Must contain a query definition.');
  return queryDef;
}

function getFragmentDefinition(doc) {
   false ? undefined : tsInvariant.invariant(doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
   false ? undefined : tsInvariant.invariant(doc.definitions.length <= 1, 'Fragment must have exactly one definition.');
  var fragmentDef = doc.definitions[0];
   false ? undefined : tsInvariant.invariant(fragmentDef.kind === 'FragmentDefinition', 'Must be a fragment definition.');
  return fragmentDef;
}

function getMainDefinition(queryDoc) {
  checkDocument(queryDoc);
  var fragmentDefinition;

  for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
    var definition = _a[_i];

    if (definition.kind === 'OperationDefinition') {
      var operation = definition.operation;

      if (operation === 'query' || operation === 'mutation' || operation === 'subscription') {
        return definition;
      }
    }

    if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
      fragmentDefinition = definition;
    }
  }

  if (fragmentDefinition) {
    return fragmentDefinition;
  }

  throw  false ? undefined : new tsInvariant.InvariantError('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}

function getDefaultValues(definition) {
  var defaultValues = Object.create(null);
  var defs = definition && definition.variableDefinitions;

  if (defs && defs.length) {
    defs.forEach(function (def) {
      if (def.defaultValue) {
        valueToObjectRepresentation(defaultValues, def.variable.name, def.defaultValue);
      }
    });
  }

  return defaultValues;
}

function filterInPlace(array, test, context) {
  var target = 0;
  array.forEach(function (elem, i) {
    if (test.call(this, elem, i, array)) {
      array[target++] = elem;
    }
  }, context);
  array.length = target;
  return array;
}

var TYPENAME_FIELD = {
  kind: 'Field',
  name: {
    kind: 'Name',
    value: '__typename'
  }
};

function isEmpty(op, fragments) {
  return op.selectionSet.selections.every(function (selection) {
    return selection.kind === 'FragmentSpread' && isEmpty(fragments[selection.name.value], fragments);
  });
}

function nullIfDocIsEmpty(doc) {
  return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
}

function getDirectiveMatcher(directives) {
  return function directiveMatcher(directive) {
    return directives.some(function (dir) {
      return dir.name && dir.name === directive.name.value || dir.test && dir.test(directive);
    });
  };
}

function removeDirectivesFromDocument(directives, doc) {
  var variablesInUse = Object.create(null);
  var variablesToRemove = [];
  var fragmentSpreadsInUse = Object.create(null);
  var fragmentSpreadsToRemove = [];
  var modifiedDoc = nullIfDocIsEmpty(visitor.visit(doc, {
    Variable: {
      enter: function (node, _key, parent) {
        if (parent.kind !== 'VariableDefinition') {
          variablesInUse[node.name.value] = true;
        }
      }
    },
    Field: {
      enter: function (node) {
        if (directives && node.directives) {
          var shouldRemoveField = directives.some(function (directive) {
            return directive.remove;
          });

          if (shouldRemoveField && node.directives && node.directives.some(getDirectiveMatcher(directives))) {
            if (node.arguments) {
              node.arguments.forEach(function (arg) {
                if (arg.value.kind === 'Variable') {
                  variablesToRemove.push({
                    name: arg.value.name.value
                  });
                }
              });
            }

            if (node.selectionSet) {
              getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function (frag) {
                fragmentSpreadsToRemove.push({
                  name: frag.name.value
                });
              });
            }

            return null;
          }
        }
      }
    },
    FragmentSpread: {
      enter: function (node) {
        fragmentSpreadsInUse[node.name.value] = true;
      }
    },
    Directive: {
      enter: function (node) {
        if (getDirectiveMatcher(directives)(node)) {
          return null;
        }
      }
    }
  }));

  if (modifiedDoc && filterInPlace(variablesToRemove, function (v) {
    return !!v.name && !variablesInUse[v.name];
  }).length) {
    modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
  }

  if (modifiedDoc && filterInPlace(fragmentSpreadsToRemove, function (fs) {
    return !!fs.name && !fragmentSpreadsInUse[fs.name];
  }).length) {
    modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
  }

  return modifiedDoc;
}

function addTypenameToDocument(doc) {
  return visitor.visit(checkDocument(doc), {
    SelectionSet: {
      enter: function (node, _key, parent) {
        if (parent && parent.kind === 'OperationDefinition') {
          return;
        }

        var selections = node.selections;

        if (!selections) {
          return;
        }

        var skip = selections.some(function (selection) {
          return isField(selection) && (selection.name.value === '__typename' || selection.name.value.lastIndexOf('__', 0) === 0);
        });

        if (skip) {
          return;
        }

        var field = parent;

        if (isField(field) && field.directives && field.directives.some(function (d) {
          return d.name.value === 'export';
        })) {
          return;
        }

        return tslib.__assign(tslib.__assign({}, node), {
          selections: tslib.__spreadArrays(selections, [TYPENAME_FIELD])
        });
      }
    }
  });
}

addTypenameToDocument.added = function (field) {
  return field === TYPENAME_FIELD;
};

var connectionRemoveConfig = {
  test: function (directive) {
    var willRemove = directive.name.value === 'connection';

    if (willRemove) {
      if (!directive.arguments || !directive.arguments.some(function (arg) {
        return arg.name.value === 'key';
      })) {
         false || tsInvariant.invariant.warn('Removing an @connection directive even though it does not have a key. ' + 'You may want to use the key parameter to specify a store key.');
      }
    }

    return willRemove;
  }
};

function removeConnectionDirectiveFromDocument(doc) {
  return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
}

function getArgumentMatcher(config) {
  return function argumentMatcher(argument) {
    return config.some(function (aConfig) {
      return argument.value && argument.value.kind === 'Variable' && argument.value.name && (aConfig.name === argument.value.name.value || aConfig.test && aConfig.test(argument));
    });
  };
}

function removeArgumentsFromDocument(config, doc) {
  var argMatcher = getArgumentMatcher(config);
  return nullIfDocIsEmpty(visitor.visit(doc, {
    OperationDefinition: {
      enter: function (node) {
        return tslib.__assign(tslib.__assign({}, node), {
          variableDefinitions: node.variableDefinitions ? node.variableDefinitions.filter(function (varDef) {
            return !config.some(function (arg) {
              return arg.name === varDef.variable.name.value;
            });
          }) : []
        });
      }
    },
    Field: {
      enter: function (node) {
        var shouldRemoveField = config.some(function (argConfig) {
          return argConfig.remove;
        });

        if (shouldRemoveField) {
          var argMatchCount_1 = 0;

          if (node.arguments) {
            node.arguments.forEach(function (arg) {
              if (argMatcher(arg)) {
                argMatchCount_1 += 1;
              }
            });
          }

          if (argMatchCount_1 === 1) {
            return null;
          }
        }
      }
    },
    Argument: {
      enter: function (node) {
        if (argMatcher(node)) {
          return null;
        }
      }
    }
  }));
}

function removeFragmentSpreadFromDocument(config, doc) {
  function enter(node) {
    if (config.some(function (def) {
      return def.name === node.name.value;
    })) {
      return null;
    }
  }

  return nullIfDocIsEmpty(visitor.visit(doc, {
    FragmentSpread: {
      enter: enter
    },
    FragmentDefinition: {
      enter: enter
    }
  }));
}

function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
  var allFragments = [];
  selectionSet.selections.forEach(function (selection) {
    if ((isField(selection) || isInlineFragment(selection)) && selection.selectionSet) {
      getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function (frag) {
        return allFragments.push(frag);
      });
    } else if (selection.kind === 'FragmentSpread') {
      allFragments.push(selection);
    }
  });
  return allFragments;
}

function buildQueryFromSelectionSet(document) {
  var definition = getMainDefinition(document);
  var definitionOperation = definition.operation;

  if (definitionOperation === 'query') {
    return document;
  }

  var modifiedDoc = visitor.visit(document, {
    OperationDefinition: {
      enter: function (node) {
        return tslib.__assign(tslib.__assign({}, node), {
          operation: 'query'
        });
      }
    }
  });
  return modifiedDoc;
}

function removeClientSetsFromDocument(document) {
  checkDocument(document);
  var modifiedDoc = removeDirectivesFromDocument([{
    test: function (directive) {
      return directive.name.value === 'client';
    },
    remove: true
  }], document);

  if (modifiedDoc) {
    modifiedDoc = visitor.visit(modifiedDoc, {
      FragmentDefinition: {
        enter: function (node) {
          if (node.selectionSet) {
            var isTypenameOnly = node.selectionSet.selections.every(function (selection) {
              return isField(selection) && selection.name.value === '__typename';
            });

            if (isTypenameOnly) {
              return null;
            }
          }
        }
      }
    });
  }

  return modifiedDoc;
}

function concatPagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }

  return {
    keyArgs: keyArgs,
    merge: function (existing, incoming) {
      return existing ? tslib.__spreadArrays(existing, incoming) : incoming;
    }
  };
}

function offsetLimitPagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }

  return {
    keyArgs: keyArgs,
    merge: function (existing, incoming, _a) {
      var args = _a.args;
      var merged = existing ? existing.slice(0) : [];

      if (args) {
        var _b = args.offset,
            offset = _b === void 0 ? 0 : _b;

        for (var i = 0; i < incoming.length; ++i) {
          merged[offset + i] = incoming[i];
        }
      } else {
        merged.push.apply(merged, incoming);
      }

      return merged;
    }
  };
}

function relayStylePagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }

  return {
    keyArgs: keyArgs,
    read: function (existing, _a) {
      var canRead = _a.canRead,
          readField = _a.readField;
      if (!existing) return;
      var edges = [];
      var startCursor = "";
      var endCursor = "";
      existing.edges.forEach(function (edge) {
        if (canRead(readField("node", edge))) {
          edges.push(edge);

          if (edge.cursor) {
            startCursor = startCursor || edge.cursor;
            endCursor = edge.cursor;
          }
        }
      });
      return tslib.__assign(tslib.__assign({}, getExtras(existing)), {
        edges: edges,
        pageInfo: tslib.__assign(tslib.__assign({}, existing.pageInfo), {
          startCursor: startCursor,
          endCursor: endCursor
        })
      });
    },
    merge: function (existing, incoming, _a) {
      if (existing === void 0) {
        existing = makeEmptyData();
      }

      var args = _a.args,
          isReference = _a.isReference,
          readField = _a.readField;
      var incomingEdges = incoming.edges ? incoming.edges.map(function (edge) {
        if (isReference(edge = tslib.__assign({}, edge))) {
          edge.cursor = readField("cursor", edge);
        }

        return edge;
      }) : [];

      if (incoming.pageInfo) {
        var _b = incoming.pageInfo,
            startCursor = _b.startCursor,
            endCursor = _b.endCursor;
        var firstEdge_1 = incomingEdges[0];

        if (firstEdge_1 && startCursor) {
          firstEdge_1.cursor = startCursor;
        }

        var lastEdge_1 = incomingEdges[incomingEdges.length - 1];

        if (lastEdge_1 && endCursor) {
          lastEdge_1.cursor = endCursor;
        }
      }

      var prefix = existing.edges;
      var suffix = [];

      if (args && args.after) {
        var index = prefix.findIndex(function (edge) {
          return edge.cursor === args.after;
        });

        if (index >= 0) {
          prefix = prefix.slice(0, index + 1);
        }
      } else if (args && args.before) {
        var index = prefix.findIndex(function (edge) {
          return edge.cursor === args.before;
        });
        suffix = index < 0 ? prefix : prefix.slice(index);
        prefix = [];
      } else if (incoming.edges) {
        prefix = [];
      }

      var edges = tslib.__spreadArrays(prefix, incomingEdges, suffix);

      var firstEdge = edges[0];
      var lastEdge = edges[edges.length - 1];

      var pageInfo = tslib.__assign(tslib.__assign(tslib.__assign({}, incoming.pageInfo), existing.pageInfo), {
        startCursor: firstEdge && firstEdge.cursor || "",
        endCursor: lastEdge && lastEdge.cursor || ""
      });

      if (incoming.pageInfo) {
        var _c = incoming.pageInfo,
            hasPreviousPage = _c.hasPreviousPage,
            hasNextPage = _c.hasNextPage;

        if (!prefix.length && hasPreviousPage !== void 0) {
          pageInfo.hasPreviousPage = hasPreviousPage;
        }

        if (!suffix.length && hasNextPage !== void 0) {
          pageInfo.hasNextPage = hasNextPage;
        }
      }

      return tslib.__assign(tslib.__assign(tslib.__assign({}, getExtras(existing)), getExtras(incoming)), {
        edges: edges,
        pageInfo: pageInfo
      });
    }
  };
}

var getExtras = function (obj) {
  return tslib.__rest(obj, notExtras);
};

var notExtras = ["edges", "pageInfo"];

function makeEmptyData() {
  return {
    edges: [],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: true,
      startCursor: "",
      endCursor: ""
    }
  };
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function mergeDeep() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  return mergeDeepArray(sources);
}

function mergeDeepArray(sources) {
  var target = sources[0] || {};
  var count = sources.length;

  if (count > 1) {
    var merger = new DeepMerger();

    for (var i = 1; i < count; ++i) {
      target = merger.merge(target, sources[i]);
    }
  }

  return target;
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

var defaultReconciler = function (target, source, property) {
  return this.merge(target[property], source[property]);
};

var DeepMerger = function () {
  function DeepMerger(reconciler) {
    if (reconciler === void 0) {
      reconciler = defaultReconciler;
    }

    this.reconciler = reconciler;
    this.isObject = isObject;
    this.pastCopies = new Set();
  }

  DeepMerger.prototype.merge = function (target, source) {
    var _this = this;

    var context = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      context[_i - 2] = arguments[_i];
    }

    if (isObject(source) && isObject(target)) {
      Object.keys(source).forEach(function (sourceKey) {
        if (hasOwnProperty.call(target, sourceKey)) {
          var targetValue = target[sourceKey];

          if (source[sourceKey] !== targetValue) {
            var result = _this.reconciler.apply(_this, tslib.__spreadArrays([target, source, sourceKey], context));

            if (result !== targetValue) {
              target = _this.shallowCopyForMerge(target);
              target[sourceKey] = result;
            }
          }
        } else {
          target = _this.shallowCopyForMerge(target);
          target[sourceKey] = source[sourceKey];
        }
      });
      return target;
    }

    return source;
  };

  DeepMerger.prototype.shallowCopyForMerge = function (value) {
    if (isObject(value) && !this.pastCopies.has(value)) {
      if (Array.isArray(value)) {
        value = value.slice(0);
      } else {
        value = tslib.__assign({
          __proto__: Object.getPrototypeOf(value)
        }, value);
      }

      this.pastCopies.add(value);
    }

    return value;
  };

  return DeepMerger;
}();

var toString = Object.prototype.toString;

function cloneDeep(value) {
  return cloneDeepHelper(value);
}

function cloneDeepHelper(val, seen) {
  switch (toString.call(val)) {
    case "[object Array]":
      {
        seen = seen || new Map();
        if (seen.has(val)) return seen.get(val);
        var copy_1 = val.slice(0);
        seen.set(val, copy_1);
        copy_1.forEach(function (child, i) {
          copy_1[i] = cloneDeepHelper(child, seen);
        });
        return copy_1;
      }

    case "[object Object]":
      {
        seen = seen || new Map();
        if (seen.has(val)) return seen.get(val);
        var copy_2 = Object.create(Object.getPrototypeOf(val));
        seen.set(val, copy_2);
        Object.keys(val).forEach(function (key) {
          copy_2[key] = cloneDeepHelper(val[key], seen);
        });
        return copy_2;
      }

    default:
      return val;
  }
}

function getEnv() {
  if (typeof process !== 'undefined' && "development") {
    return "development";
  }

  return 'development';
}

function isEnv(env) {
  return getEnv() === env;
}

function isDevelopment() {
  return isEnv('development') === true;
}

function isTest() {
  return isEnv('test') === true;
}

function isObject$1(value) {
  return value !== null && typeof value === "object";
}

function deepFreeze(value) {
  var workSet = new Set([value]);
  workSet.forEach(function (obj) {
    if (isObject$1(obj)) {
      if (!Object.isFrozen(obj)) Object.freeze(obj);
      Object.getOwnPropertyNames(obj).forEach(function (name) {
        if (isObject$1(obj[name])) workSet.add(obj[name]);
      });
    }
  });
  return value;
}

function maybeDeepFreeze(obj) {
  if ( true && (isDevelopment() || isTest())) {
    deepFreeze(obj);
  }

  return obj;
}

function iterateObserversSafely(observers, method, argument) {
  var observersWithMethod = [];
  observers.forEach(function (obs) {
    return obs[method] && observersWithMethod.push(obs);
  });
  observersWithMethod.forEach(function (obs) {
    return obs[method](argument);
  });
}

function asyncMap(observable, mapFn, catchFn) {
  return new Observable(function (observer) {
    var next = observer.next,
        error = observer.error,
        complete = observer.complete;
    var activeCallbackCount = 0;
    var completed = false;

    function makeCallback(examiner, delegate) {
      if (examiner) {
        return function (arg) {
          ++activeCallbackCount;
          new Promise(function (resolve) {
            return resolve(examiner(arg));
          }).then(function (result) {
            --activeCallbackCount;
            next && next.call(observer, result);

            if (completed) {
              handler.complete();
            }
          }, function (e) {
            --activeCallbackCount;
            error && error.call(observer, e);
          });
        };
      } else {
        return function (arg) {
          return delegate && delegate.call(observer, arg);
        };
      }
    }

    var handler = {
      next: makeCallback(mapFn, next),
      error: makeCallback(catchFn, error),
      complete: function () {
        completed = true;

        if (!activeCallbackCount) {
          complete && complete.call(observer);
        }
      }
    };
    var sub = observable.subscribe(handler);
    return function () {
      return sub.unsubscribe();
    };
  });
}

function isPromiseLike(value) {
  return value && typeof value.then === "function";
}

var Concast = function (_super) {
  tslib.__extends(Concast, _super);

  function Concast(sources) {
    var _this = _super.call(this, function (observer) {
      _this.addObserver(observer);

      return function () {
        return _this.removeObserver(observer);
      };
    }) || this;

    _this.observers = new Set();
    _this.promise = new Promise(function (resolve, reject) {
      _this.resolve = resolve;
      _this.reject = reject;
    });
    _this.handlers = {
      next: function (result) {
        if (_this.sub !== null) {
          _this.latest = ["next", result];
          iterateObserversSafely(_this.observers, "next", result);
        }
      },
      error: function (error) {
        if (_this.sub !== null) {
          if (_this.sub) _this.sub.unsubscribe();
          _this.sub = null;
          _this.latest = ["error", error];

          _this.reject(error);

          iterateObserversSafely(_this.observers, "error", error);
        }
      },
      complete: function () {
        if (_this.sub !== null) {
          var value = _this.sources.shift();

          if (!value) {
            _this.sub = null;

            if (_this.latest && _this.latest[0] === "next") {
              _this.resolve(_this.latest[1]);
            } else {
              _this.resolve();
            }

            iterateObserversSafely(_this.observers, "complete");
          } else if (isPromiseLike(value)) {
            value.then(function (obs) {
              return _this.sub = obs.subscribe(_this.handlers);
            });
          } else {
            _this.sub = value.subscribe(_this.handlers);
          }
        }
      }
    };

    _this.cancel = function (reason) {
      _this.reject(reason);

      _this.sources = [];

      _this.handlers.complete();
    };

    _this.promise.catch(function (_) {});

    if (isPromiseLike(sources)) {
      sources.then(function (iterable) {
        return _this.start(iterable);
      }, _this.handlers.error);
    } else {
      _this.start(sources);
    }

    return _this;
  }

  Concast.prototype.start = function (sources) {
    if (this.sub !== void 0) return;
    this.sources = Array.from(sources);
    this.handlers.complete();
  };

  Concast.prototype.addObserver = function (observer) {
    if (!this.observers.has(observer)) {
      if (this.latest) {
        var nextOrError = this.latest[0];
        var method = observer[nextOrError];

        if (method) {
          method.call(observer, this.latest[1]);
        }

        if (this.sub === null && nextOrError === "next" && observer.complete) {
          observer.complete();
        }
      }

      this.observers.add(observer);
    }
  };

  Concast.prototype.removeObserver = function (observer, quietly) {
    if (this.observers.delete(observer) && this.observers.size < 1) {
      if (quietly) return;

      if (this.sub) {
        this.sub.unsubscribe();
        this.reject(new Error("Observable cancelled prematurely"));
      }

      this.sub = null;
    }
  };

  Concast.prototype.cleanup = function (callback) {
    var _this = this;

    var called = false;

    var once = function () {
      if (!called) {
        called = true;

        _this.observers.delete(observer);

        callback();
      }
    };

    var observer = {
      next: once,
      error: once,
      complete: once
    };
    this.addObserver(observer);
  };

  return Concast;
}(Observable);

if (typeof Symbol === "function" && Symbol.species) {
  Object.defineProperty(Concast, Symbol.species, {
    value: Observable
  });
}

function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

function graphQLResultHasError(result) {
  return result.errors && result.errors.length > 0 || false;
}

var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' && navigator.product === 'ReactNative');

function compact() {
  var objects = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    objects[_i] = arguments[_i];
  }

  var result = Object.create(null);
  objects.forEach(function (obj) {
    if (!obj) return;
    Object.keys(obj).forEach(function (key) {
      var value = obj[key];

      if (value !== void 0) {
        result[key] = value;
      }
    });
  });
  return result;
}

exports.Observable = Observable;
exports.Concast = Concast;
exports.DeepMerger = DeepMerger;
exports.addTypenameToDocument = addTypenameToDocument;
exports.argumentsObjectFromField = argumentsObjectFromField;
exports.asyncMap = asyncMap;
exports.buildQueryFromSelectionSet = buildQueryFromSelectionSet;
exports.canUseWeakMap = canUseWeakMap;
exports.checkDocument = checkDocument;
exports.cloneDeep = cloneDeep;
exports.compact = compact;
exports.concatPagination = concatPagination;
exports.createFragmentMap = createFragmentMap;
exports.getDefaultValues = getDefaultValues;
exports.getDirectiveNames = getDirectiveNames;
exports.getFragmentDefinition = getFragmentDefinition;
exports.getFragmentDefinitions = getFragmentDefinitions;
exports.getFragmentFromSelection = getFragmentFromSelection;
exports.getFragmentQueryDocument = getFragmentQueryDocument;
exports.getInclusionDirectives = getInclusionDirectives;
exports.getMainDefinition = getMainDefinition;
exports.getOperationDefinition = getOperationDefinition;
exports.getOperationName = getOperationName;
exports.getQueryDefinition = getQueryDefinition;
exports.getStoreKeyName = getStoreKeyName;
exports.getTypenameFromResult = getTypenameFromResult;
exports.graphQLResultHasError = graphQLResultHasError;
exports.hasClientExports = hasClientExports;
exports.hasDirectives = hasDirectives;
exports.isField = isField;
exports.isInlineFragment = isInlineFragment;
exports.isNonEmptyArray = isNonEmptyArray;
exports.isReference = isReference;
exports.iterateObserversSafely = iterateObserversSafely;
exports.makeReference = makeReference;
exports.maybeDeepFreeze = maybeDeepFreeze;
exports.mergeDeep = mergeDeep;
exports.mergeDeepArray = mergeDeepArray;
exports.offsetLimitPagination = offsetLimitPagination;
exports.relayStylePagination = relayStylePagination;
exports.removeArgumentsFromDocument = removeArgumentsFromDocument;
exports.removeClientSetsFromDocument = removeClientSetsFromDocument;
exports.removeConnectionDirectiveFromDocument = removeConnectionDirectiveFromDocument;
exports.removeDirectivesFromDocument = removeDirectivesFromDocument;
exports.removeFragmentSpreadFromDocument = removeFragmentSpreadFromDocument;
exports.resultKeyNameFromField = resultKeyNameFromField;
exports.shouldInclude = shouldInclude;
exports.storeKeyNameFromField = storeKeyNameFromField;
exports.valueToObjectRepresentation = valueToObjectRepresentation;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@apollo/react-hooks/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@apollo/react-hooks/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/main.cjs.js");

/***/ }),

/***/ "./node_modules/@wry/context/lib/context.js":
/*!**************************************************!*\
  !*** ./node_modules/@wry/context/lib/context.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
}); // This currentContext variable will only be used if the makeSlotClass
// function is called, which happens only if this is the first copy of the
// @wry/context package to be imported.

var currentContext = null; // This unique internal object is used to denote the absence of a value
// for a given Slot, and is never exposed to outside code.

var MISSING_VALUE = {};
var idCounter = 1; // Although we can't do anything about the cost of duplicated code from
// accidentally bundling multiple copies of the @wry/context package, we can
// avoid creating the Slot class more than once using makeSlotClass.

var makeSlotClass = function () {
  return (
    /** @class */
    function () {
      function Slot() {
        // If you have a Slot object, you can find out its slot.id, but you cannot
        // guess the slot.id of a Slot you don't have access to, thanks to the
        // randomized suffix.
        this.id = ["slot", idCounter++, Date.now(), Math.random().toString(36).slice(2)].join(":");
      }

      Slot.prototype.hasValue = function () {
        for (var context_1 = currentContext; context_1; context_1 = context_1.parent) {
          // We use the Slot object iself as a key to its value, which means the
          // value cannot be obtained without a reference to the Slot object.
          if (this.id in context_1.slots) {
            var value = context_1.slots[this.id];
            if (value === MISSING_VALUE) break;

            if (context_1 !== currentContext) {
              // Cache the value in currentContext.slots so the next lookup will
              // be faster. This caching is safe because the tree of contexts and
              // the values of the slots are logically immutable.
              currentContext.slots[this.id] = value;
            }

            return true;
          }
        }

        if (currentContext) {
          // If a value was not found for this Slot, it's never going to be found
          // no matter how many times we look it up, so we might as well cache
          // the absence of the value, too.
          currentContext.slots[this.id] = MISSING_VALUE;
        }

        return false;
      };

      Slot.prototype.getValue = function () {
        if (this.hasValue()) {
          return currentContext.slots[this.id];
        }
      };

      Slot.prototype.withValue = function (value, callback, // Given the prevalence of arrow functions, specifying arguments is likely
      // to be much more common than specifying `this`, hence this ordering:
      args, thisArg) {
        var _a;

        var slots = (_a = {
          __proto__: null
        }, _a[this.id] = value, _a);
        var parent = currentContext;
        currentContext = {
          parent: parent,
          slots: slots
        };

        try {
          // Function.prototype.apply allows the arguments array argument to be
          // omitted or undefined, so args! is fine here.
          return callback.apply(thisArg, args);
        } finally {
          currentContext = parent;
        }
      }; // Capture the current context and wrap a callback function so that it
      // reestablishes the captured context when called.


      Slot.bind = function (callback) {
        var context = currentContext;
        return function () {
          var saved = currentContext;

          try {
            currentContext = context;
            return callback.apply(this, arguments);
          } finally {
            currentContext = saved;
          }
        };
      }; // Immediately run a callback function without any captured context.


      Slot.noContext = function (callback, // Given the prevalence of arrow functions, specifying arguments is likely
      // to be much more common than specifying `this`, hence this ordering:
      args, thisArg) {
        if (currentContext) {
          var saved = currentContext;

          try {
            currentContext = null; // Function.prototype.apply allows the arguments array argument to be
            // omitted or undefined, so args! is fine here.

            return callback.apply(thisArg, args);
          } finally {
            currentContext = saved;
          }
        } else {
          return callback.apply(thisArg, args);
        }
      };

      return Slot;
    }()
  );
}; // We store a single global implementation of the Slot class as a permanent
// non-enumerable symbol property of the Array constructor. This obfuscation
// does nothing to prevent access to the Slot class, but at least it ensures
// the implementation (i.e. currentContext) cannot be tampered with, and all
// copies of the @wry/context package (hopefully just one) will share the
// same Slot implementation. Since the first copy of the @wry/context package
// to be imported wins, this technique imposes a very high cost for any
// future breaking changes to the Slot class.


var globalKey = "@wry/context:Slot";
var host = Array;

var Slot = host[globalKey] || function () {
  var Slot = makeSlotClass();

  try {
    Object.defineProperty(host, globalKey, {
      value: host[globalKey] = Slot,
      enumerable: false,
      writable: false,
      configurable: false
    });
  } finally {
    return Slot;
  }
}();

var bind = Slot.bind,
    noContext = Slot.noContext;

function setTimeoutWithContext(callback, delay) {
  return setTimeout(bind(callback), delay);
} // Turn any generator function into an async function (using yield instead
// of await), with context automatically preserved across yields.


function asyncFromGen(genFn) {
  return function () {
    var gen = genFn.apply(this, arguments);
    var boundNext = bind(gen.next);
    var boundThrow = bind(gen.throw);
    return new Promise(function (resolve, reject) {
      function invoke(method, argument) {
        try {
          var result = method.call(gen, argument);
        } catch (error) {
          return reject(error);
        }

        var next = result.done ? resolve : invokeNext;

        if (isPromiseLike(result.value)) {
          result.value.then(next, result.done ? reject : invokeThrow);
        } else {
          next(result.value);
        }
      }

      var invokeNext = function (value) {
        return invoke(boundNext, value);
      };

      var invokeThrow = function (error) {
        return invoke(boundThrow, error);
      };

      invokeNext();
    });
  };
}

function isPromiseLike(value) {
  return value && typeof value.then === "function";
} // If you use the fibers npm package to implement coroutines in Node.js,
// you should call this function at least once to ensure context management
// remains coherent across any yields.


var wrappedFibers = [];

function wrapYieldingFiberMethods(Fiber) {
  // There can be only one implementation of Fiber per process, so this array
  // should never grow longer than one element.
  if (wrappedFibers.indexOf(Fiber) < 0) {
    var wrap = function (obj, method) {
      var fn = obj[method];

      obj[method] = function () {
        return noContext(fn, arguments, this);
      };
    }; // These methods can yield, according to
    // https://github.com/laverdet/node-fibers/blob/ddebed9b8ae3883e57f822e2108e6943e5c8d2a8/fibers.js#L97-L100


    wrap(Fiber, "yield");
    wrap(Fiber.prototype, "run");
    wrap(Fiber.prototype, "throwInto");
    wrappedFibers.push(Fiber);
  }

  return Fiber;
}

exports.Slot = Slot;
exports.asyncFromGen = asyncFromGen;
exports.bind = bind;
exports.noContext = noContext;
exports.setTimeout = setTimeoutWithContext;
exports.wrapYieldingFiberMethods = wrapYieldingFiberMethods;

/***/ }),

/***/ "./node_modules/@wry/equality/lib/equality.js":
/*!****************************************************!*\
  !*** ./node_modules/@wry/equality/lib/equality.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
var _a = Object.prototype,
    toString = _a.toString,
    hasOwnProperty = _a.hasOwnProperty;
var fnToStr = Function.prototype.toString;
var previousComparisons = new Map();
/**
 * Performs a deep equality check on two JavaScript values, tolerating cycles.
 */

function equal(a, b) {
  try {
    return check(a, b);
  } finally {
    previousComparisons.clear();
  }
}

function check(a, b) {
  // If the two values are strictly equal, our job is easy.
  if (a === b) {
    return true;
  } // Object.prototype.toString returns a representation of the runtime type of
  // the given value that is considerably more precise than typeof.


  var aTag = toString.call(a);
  var bTag = toString.call(b); // If the runtime types of a and b are different, they could maybe be equal
  // under some interpretation of equality, but for simplicity and performance
  // we just return false instead.

  if (aTag !== bTag) {
    return false;
  }

  switch (aTag) {
    case '[object Array]':
      // Arrays are a lot like other objects, but we can cheaply compare their
      // lengths as a short-cut before comparing their elements.
      if (a.length !== b.length) return false;
    // Fall through to object case...

    case '[object Object]':
      {
        if (previouslyCompared(a, b)) return true;
        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b); // If `a` and `b` have a different number of enumerable keys, they
        // must be different.

        var keyCount = aKeys.length;
        if (keyCount !== bKeys.length) return false; // Now make sure they have the same keys.

        for (var k = 0; k < keyCount; ++k) {
          if (!hasOwnProperty.call(b, aKeys[k])) {
            return false;
          }
        } // Finally, check deep equality of all child properties.


        for (var k = 0; k < keyCount; ++k) {
          var key = aKeys[k];

          if (!check(a[key], b[key])) {
            return false;
          }
        }

        return true;
      }

    case '[object Error]':
      return a.name === b.name && a.message === b.message;

    case '[object Number]':
      // Handle NaN, which is !== itself.
      if (a !== a) return b !== b;
    // Fall through to shared +a === +b case...

    case '[object Boolean]':
    case '[object Date]':
      return +a === +b;

    case '[object RegExp]':
    case '[object String]':
      return a == "" + b;

    case '[object Map]':
    case '[object Set]':
      {
        if (a.size !== b.size) return false;
        if (previouslyCompared(a, b)) return true;
        var aIterator = a.entries();
        var isMap = aTag === '[object Map]';

        while (true) {
          var info = aIterator.next();
          if (info.done) break; // If a instanceof Set, aValue === aKey.

          var _a = info.value,
              aKey = _a[0],
              aValue = _a[1]; // So this works the same way for both Set and Map.

          if (!b.has(aKey)) {
            return false;
          } // However, we care about deep equality of values only when dealing
          // with Map structures.


          if (isMap && !check(aValue, b.get(aKey))) {
            return false;
          }
        }

        return true;
      }

    case '[object Function]':
      {
        var aCode = fnToStr.call(a);

        if (aCode !== fnToStr.call(b)) {
          return false;
        } // We consider non-native functions equal if they have the same code
        // (native functions require === because their code is censored).
        // Note that this behavior is not entirely sound, since !== function
        // objects with the same code can behave differently depending on
        // their closure scope. However, any function can behave differently
        // depending on the values of its input arguments (including this)
        // and its calling context (including its closure scope), even
        // though the function object is === to itself; and it is entirely
        // possible for functions that are not === to behave exactly the
        // same under all conceivable circumstances. Because none of these
        // factors are statically decidable in JavaScript, JS function
        // equality is not well-defined. This ambiguity allows us to
        // consider the best possible heuristic among various imperfect
        // options, and equating non-native functions that have the same
        // code has enormous practical benefits, such as when comparing
        // functions that are repeatedly passed as fresh function
        // expressions within objects that are otherwise deeply equal. Since
        // any function created from the same syntactic expression (in the
        // same code location) will always stringify to the same code
        // according to fnToStr.call, we can reasonably expect these
        // repeatedly passed function expressions to have the same code, and
        // thus behave "the same" (with all the caveats mentioned above),
        // even though the runtime function objects are !== to one another.


        return !endsWith(aCode, nativeCodeSuffix);
      }
  } // Otherwise the values are not equal.


  return false;
}

var nativeCodeSuffix = "{ [native code] }";

function endsWith(full, suffix) {
  var fromIndex = full.length - suffix.length;
  return fromIndex >= 0 && full.indexOf(suffix, fromIndex) === fromIndex;
}

function previouslyCompared(a, b) {
  // Though cyclic references can make an object graph appear infinite from the
  // perspective of a depth-first traversal, the graph still contains a finite
  // number of distinct object references. We use the previousComparisons cache
  // to avoid comparing the same pair of object references more than once, which
  // guarantees termination (even if we end up comparing every object in one
  // graph to every object in the other graph, which is extremely unlikely),
  // while still allowing weird isomorphic structures (like rings with different
  // lengths) a chance to pass the equality test.
  var bSet = previousComparisons.get(a);

  if (bSet) {
    // Return true here because we can be sure false will be returned somewhere
    // else if the objects are not equivalent.
    if (bSet.has(b)) return true;
  } else {
    previousComparisons.set(a, bSet = new Set());
  }

  bSet.add(b);
  return false;
}

exports.default = equal;
exports.equal = equal;

/***/ }),

/***/ "./node_modules/fast-json-stable-stringify/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/fast-json-stable-stringify/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (data, opts) {
  if (!opts) opts = {};
  if (typeof opts === 'function') opts = {
    cmp: opts
  };
  var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;

  var cmp = opts.cmp && function (f) {
    return function (node) {
      return function (a, b) {
        var aobj = {
          key: a,
          value: node[a]
        };
        var bobj = {
          key: b,
          value: node[b]
        };
        return f(aobj, bobj);
      };
    };
  }(opts.cmp);

  var seen = [];
  return function stringify(node) {
    if (node && node.toJSON && typeof node.toJSON === 'function') {
      node = node.toJSON();
    }

    if (node === undefined) return;
    if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
    if (typeof node !== 'object') return JSON.stringify(node);
    var i, out;

    if (Array.isArray(node)) {
      out = '[';

      for (i = 0; i < node.length; i++) {
        if (i) out += ',';
        out += stringify(node[i]) || 'null';
      }

      return out + ']';
    }

    if (node === null) return 'null';

    if (seen.indexOf(node) !== -1) {
      if (cycles) return JSON.stringify('__cycle__');
      throw new TypeError('Converting circular structure to JSON');
    }

    var seenIndex = seen.push(node) - 1;
    var keys = Object.keys(node).sort(cmp && cmp(node));
    out = '';

    for (i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = stringify(node[key]);
      if (!value) continue;
      if (out) out += ',';
      out += JSON.stringify(key) + ':' + value;
    }

    seen.splice(seenIndex, 1);
    return '{' + out + '}';
  }(data);
};

/***/ }),

/***/ "./node_modules/graphql-tag/lib/graphql-tag.umd.js":
/*!*********************************************************!*\
  !*** ./node_modules/graphql-tag/lib/graphql-tag.umd.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory() : undefined;
})(this, function () {
  'use strict';

  var parser = __webpack_require__(/*! graphql/language/parser */ "./node_modules/graphql/language/parser.mjs");

  var parse = parser.parse; // Strip insignificant whitespace
  // Note that this could do a lot more, such as reorder fields etc.

  function normalize(string) {
    return string.replace(/[\s,]+/g, ' ').trim();
  } // A map docString -> graphql document


  var docCache = {}; // A map fragmentName -> [normalized source]

  var fragmentSourceMap = {};

  function cacheKeyFromLoc(loc) {
    return normalize(loc.source.body.substring(loc.start, loc.end));
  } // For testing.


  function resetCaches() {
    docCache = {};
    fragmentSourceMap = {};
  } // Take a unstripped parsed document (query/mutation or even fragment), and
  // check all fragment definitions, checking for name->source uniqueness.
  // We also want to make sure only unique fragments exist in the document.


  var printFragmentWarnings = true;

  function processFragments(ast) {
    var astFragmentMap = {};
    var definitions = [];

    for (var i = 0; i < ast.definitions.length; i++) {
      var fragmentDefinition = ast.definitions[i];

      if (fragmentDefinition.kind === 'FragmentDefinition') {
        var fragmentName = fragmentDefinition.name.value;
        var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc); // We know something about this fragment

        if (fragmentSourceMap.hasOwnProperty(fragmentName) && !fragmentSourceMap[fragmentName][sourceKey]) {
          // this is a problem because the app developer is trying to register another fragment with
          // the same name as one previously registered. So, we tell them about it.
          if (printFragmentWarnings) {
            console.warn("Warning: fragment with name " + fragmentName + " already exists.\n" + "graphql-tag enforces all fragment names across your application to be unique; read more about\n" + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
          }

          fragmentSourceMap[fragmentName][sourceKey] = true;
        } else if (!fragmentSourceMap.hasOwnProperty(fragmentName)) {
          fragmentSourceMap[fragmentName] = {};
          fragmentSourceMap[fragmentName][sourceKey] = true;
        }

        if (!astFragmentMap[sourceKey]) {
          astFragmentMap[sourceKey] = true;
          definitions.push(fragmentDefinition);
        }
      } else {
        definitions.push(fragmentDefinition);
      }
    }

    ast.definitions = definitions;
    return ast;
  }

  function disableFragmentWarnings() {
    printFragmentWarnings = false;
  }

  function stripLoc(doc, removeLocAtThisLevel) {
    var docType = Object.prototype.toString.call(doc);

    if (docType === '[object Array]') {
      return doc.map(function (d) {
        return stripLoc(d, removeLocAtThisLevel);
      });
    }

    if (docType !== '[object Object]') {
      throw new Error('Unexpected input.');
    } // We don't want to remove the root loc field so we can use it
    // for fragment substitution (see below)


    if (removeLocAtThisLevel && doc.loc) {
      delete doc.loc;
    } // https://github.com/apollographql/graphql-tag/issues/40


    if (doc.loc) {
      delete doc.loc.startToken;
      delete doc.loc.endToken;
    }

    var keys = Object.keys(doc);
    var key;
    var value;
    var valueType;

    for (key in keys) {
      if (keys.hasOwnProperty(key)) {
        value = doc[keys[key]];
        valueType = Object.prototype.toString.call(value);

        if (valueType === '[object Object]' || valueType === '[object Array]') {
          doc[keys[key]] = stripLoc(value, true);
        }
      }
    }

    return doc;
  }

  var experimentalFragmentVariables = false;

  function parseDocument(doc) {
    var cacheKey = normalize(doc);

    if (docCache[cacheKey]) {
      return docCache[cacheKey];
    }

    var parsed = parse(doc, {
      experimentalFragmentVariables: experimentalFragmentVariables
    });

    if (!parsed || parsed.kind !== 'Document') {
      throw new Error('Not a valid GraphQL document.');
    } // check that all "new" fragments inside the documents are consistent with
    // existing fragments of the same name


    parsed = processFragments(parsed);
    parsed = stripLoc(parsed, false);
    docCache[cacheKey] = parsed;
    return parsed;
  }

  function enableExperimentalFragmentVariables() {
    experimentalFragmentVariables = true;
  }

  function disableExperimentalFragmentVariables() {
    experimentalFragmentVariables = false;
  } // XXX This should eventually disallow arbitrary string interpolation, like Relay does


  function gql()
  /* arguments */
  {
    var args = Array.prototype.slice.call(arguments);
    var literals = args[0]; // We always get literals[0] and then matching post literals for each arg given

    var result = typeof literals === "string" ? literals : literals[0];

    for (var i = 1; i < args.length; i++) {
      if (args[i] && args[i].kind && args[i].kind === 'Document') {
        result += args[i].loc.source.body;
      } else {
        result += args[i];
      }

      result += literals[i];
    }

    return parseDocument(result);
  } // Support typescript, which isn't as nice as Babel about default exports


  gql.default = gql;
  gql.resetCaches = resetCaches;
  gql.disableFragmentWarnings = disableFragmentWarnings;
  gql.enableExperimentalFragmentVariables = enableExperimentalFragmentVariables;
  gql.disableExperimentalFragmentVariables = disableExperimentalFragmentVariables;
  module.exports = gql;
});

/***/ }),

/***/ "./node_modules/graphql/error/GraphQLError.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/graphql/error/GraphQLError.mjs ***!
  \*****************************************************/
/*! exports provided: GraphQLError, printError */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphQLError", function() { return GraphQLError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printError", function() { return printError; });
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "./node_modules/graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _polyfills_symbols_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../polyfills/symbols.mjs */ "./node_modules/graphql/polyfills/symbols.mjs");
/* harmony import */ var _language_location_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../language/location.mjs */ "./node_modules/graphql/language/location.mjs");
/* harmony import */ var _language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../language/printLocation.mjs */ "./node_modules/graphql/language/printLocation.mjs");
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
} // FIXME:
// flowlint uninitialized-instance-property:off






/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */

var GraphQLError = /*#__PURE__*/function (_Error) {
  _inherits(GraphQLError, _Error);

  var _super = _createSuper(GraphQLError);
  /**
   * A message describing the Error for debugging purposes.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   *
   * Note: should be treated as readonly, despite invariant usage.
   */

  /**
   * An array of { line, column } locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */


  function GraphQLError(message, nodes, source, positions, path, originalError, extensions) {
    var _locations2, _source2, _positions2, _extensions2;

    var _this;

    _classCallCheck(this, GraphQLError);

    _this = _super.call(this, message); // Compute list of blame nodes.

    var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined; // Compute locations in the source for the given nodes/positions.


    var _source = source;

    if (!_source && _nodes) {
      var _nodes$0$loc;

      _source = (_nodes$0$loc = _nodes[0].loc) === null || _nodes$0$loc === void 0 ? void 0 : _nodes$0$loc.source;
    }

    var _positions = positions;

    if (!_positions && _nodes) {
      _positions = _nodes.reduce(function (list, node) {
        if (node.loc) {
          list.push(node.loc.start);
        }

        return list;
      }, []);
    }

    if (_positions && _positions.length === 0) {
      _positions = undefined;
    }

    var _locations;

    if (positions && source) {
      _locations = positions.map(function (pos) {
        return Object(_language_location_mjs__WEBPACK_IMPORTED_MODULE_2__["getLocation"])(source, pos);
      });
    } else if (_nodes) {
      _locations = _nodes.reduce(function (list, node) {
        if (node.loc) {
          list.push(Object(_language_location_mjs__WEBPACK_IMPORTED_MODULE_2__["getLocation"])(node.loc.source, node.loc.start));
        }

        return list;
      }, []);
    }

    var _extensions = extensions;

    if (_extensions == null && originalError != null) {
      var originalExtensions = originalError.extensions;

      if (Object(_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(originalExtensions)) {
        _extensions = originalExtensions;
      }
    }

    Object.defineProperties(_assertThisInitialized(_this), {
      name: {
        value: 'GraphQLError'
      },
      message: {
        value: message,
        // By being enumerable, JSON.stringify will include `message` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: true,
        writable: true
      },
      locations: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: (_locations2 = _locations) !== null && _locations2 !== void 0 ? _locations2 : undefined,
        // By being enumerable, JSON.stringify will include `locations` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: _locations != null
      },
      path: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: path !== null && path !== void 0 ? path : undefined,
        // By being enumerable, JSON.stringify will include `path` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: path != null
      },
      nodes: {
        value: _nodes !== null && _nodes !== void 0 ? _nodes : undefined
      },
      source: {
        value: (_source2 = _source) !== null && _source2 !== void 0 ? _source2 : undefined
      },
      positions: {
        value: (_positions2 = _positions) !== null && _positions2 !== void 0 ? _positions2 : undefined
      },
      originalError: {
        value: originalError
      },
      extensions: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: (_extensions2 = _extensions) !== null && _extensions2 !== void 0 ? _extensions2 : undefined,
        // By being enumerable, JSON.stringify will include `path` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: _extensions != null
      }
    }); // Include (non-enumerable) stack trace.

    if (originalError === null || originalError === void 0 ? void 0 : originalError.stack) {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
      return _possibleConstructorReturn(_this);
    } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')


    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }

    return _this;
  }

  _createClass(GraphQLError, [{
    key: "toString",
    value: function toString() {
      return printError(this);
    } // FIXME: workaround to not break chai comparisons, should be remove in v16
    // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet

  }, {
    key: _polyfills_symbols_mjs__WEBPACK_IMPORTED_MODULE_1__["SYMBOL_TO_STRING_TAG"],
    get: function get() {
      return 'Object';
    }
  }]);

  return GraphQLError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 */

function printError(error) {
  var output = error.message;

  if (error.nodes) {
    for (var _i2 = 0, _error$nodes2 = error.nodes; _i2 < _error$nodes2.length; _i2++) {
      var node = _error$nodes2[_i2];

      if (node.loc) {
        output += '\n\n' + Object(_language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_3__["printLocation"])(node.loc);
      }
    }
  } else if (error.source && error.locations) {
    for (var _i4 = 0, _error$locations2 = error.locations; _i4 < _error$locations2.length; _i4++) {
      var location = _error$locations2[_i4];
      output += '\n\n' + Object(_language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_3__["printSourceLocation"])(error.source, location);
    }
  }

  return output;
}

/***/ }),

/***/ "./node_modules/graphql/error/syntaxError.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/error/syntaxError.mjs ***!
  \****************************************************/
/*! exports provided: syntaxError */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syntaxError", function() { return syntaxError; });
/* harmony import */ var _GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraphQLError.mjs */ "./node_modules/graphql/error/GraphQLError.mjs");

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

function syntaxError(source, position, description) {
  return new _GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__["GraphQLError"]("Syntax Error: ".concat(description), undefined, source, [position]);
}

/***/ }),

/***/ "./node_modules/graphql/jsutils/defineInspect.mjs":
/*!********************************************************!*\
  !*** ./node_modules/graphql/jsutils/defineInspect.mjs ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return defineInspect; });
/* harmony import */ var _invariant_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invariant.mjs */ "./node_modules/graphql/jsutils/invariant.mjs");
/* harmony import */ var _nodejsCustomInspectSymbol_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodejsCustomInspectSymbol.mjs */ "./node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs");


/**
 * The `defineInspect()` function defines `inspect()` prototype method as alias of `toJSON`
 */

function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === 'function' || Object(_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(0);
  classObject.prototype.inspect = fn; // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2317')

  if (_nodejsCustomInspectSymbol_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    classObject.prototype[_nodejsCustomInspectSymbol_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]] = fn;
  }
}

/***/ }),

/***/ "./node_modules/graphql/jsutils/devAssert.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/jsutils/devAssert.mjs ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return devAssert; });
function devAssert(condition, message) {
  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

  if (!booleanCondition) {
    throw new Error(message);
  }
}

/***/ }),

/***/ "./node_modules/graphql/jsutils/inspect.mjs":
/*!**************************************************!*\
  !*** ./node_modules/graphql/jsutils/inspect.mjs ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return inspect; });
/* harmony import */ var _nodejsCustomInspectSymbol_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nodejsCustomInspectSymbol.mjs */ "./node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs");
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
/* eslint-disable flowtype/no-weak-types */



var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (_typeof(value)) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? "[function ".concat(value.name, "]") : '[function]';

    case 'object':
      if (value === null) {
        return 'null';
      }

      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return '[Circular]';
  }

  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);

  if (customInspectFn !== undefined) {
    var customValue = customInspectFn.call(value); // check for infinite recursion

    if (customValue !== value) {
      return typeof customValue === 'string' ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function formatObject(object, seenValues) {
  var keys = Object.keys(object);

  if (keys.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  var properties = keys.map(function (key) {
    var value = formatValue(object[key], seenValues);
    return key + ': ' + value;
  });
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];

  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }

  return '[' + items.join(', ') + ']';
}

function getCustomFn(object) {
  var customInspectFn = object[String(_nodejsCustomInspectSymbol_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])];

  if (typeof customInspectFn === 'function') {
    return customInspectFn;
  }

  if (typeof object.inspect === 'function') {
    return object.inspect;
  }
}

function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    var name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}

/***/ }),

/***/ "./node_modules/graphql/jsutils/instanceOf.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/graphql/jsutils/instanceOf.mjs ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 */
// See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
// See: https://webpack.js.org/guides/production/
/* harmony default export */ __webpack_exports__["default"] = ( false ? // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
// eslint-disable-next-line no-shadow
undefined : // eslint-disable-next-line no-shadow
function instanceOf(value, constructor) {
  if (value instanceof constructor) {
    return true;
  }

  if (value) {
    var valueClass = value.constructor;
    var className = constructor.name;

    if (className && valueClass && valueClass.name === className) {
      throw new Error("Cannot use ".concat(className, " \"").concat(value, "\" from another module or realm.\n\nEnsure that there is only one instance of \"graphql\" in the node_modules\ndirectory. If different versions of \"graphql\" are the dependencies of other\nrelied on modules, use \"resolutions\" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate \"graphql\" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results."));
    }
  }

  return false;
});

/***/ }),

/***/ "./node_modules/graphql/jsutils/invariant.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/jsutils/invariant.mjs ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return invariant; });
function invariant(condition, message) {
  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

  if (!booleanCondition) {
    throw new Error(message != null ? message : 'Unexpected invariant triggered.');
  }
}

/***/ }),

/***/ "./node_modules/graphql/jsutils/isObjectLike.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/graphql/jsutils/isObjectLike.mjs ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isObjectLike; });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */


function isObjectLike(value) {
  return _typeof(value) == 'object' && value !== null;
}

/***/ }),

/***/ "./node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;
/* harmony default export */ __webpack_exports__["default"] = (nodejsCustomInspectSymbol);

/***/ }),

/***/ "./node_modules/graphql/language/ast.mjs":
/*!***********************************************!*\
  !*** ./node_modules/graphql/language/ast.mjs ***!
  \***********************************************/
/*! exports provided: Location, Token, isNode */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Location", function() { return Location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Token", function() { return Token; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNode", function() { return isNode; });
/* harmony import */ var _jsutils_defineInspect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/defineInspect.mjs */ "./node_modules/graphql/jsutils/defineInspect.mjs");

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */

var Location = /*#__PURE__*/function () {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  function Location(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  var _proto = Location.prototype;

  _proto.toJSON = function toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  };

  return Location;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

Object(_jsutils_defineInspect_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(Location);
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

var Token = /*#__PURE__*/function () {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  function Token(kind, start, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }

  var _proto2 = Token.prototype;

  _proto2.toJSON = function toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };

  return Token;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

Object(_jsutils_defineInspect_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(Token);
/**
 * @internal
 */

function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === 'string';
}
/**
 * The list of all possible AST node types.
 */

/***/ }),

/***/ "./node_modules/graphql/language/blockString.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/graphql/language/blockString.mjs ***!
  \*******************************************************/
/*! exports provided: dedentBlockStringValue, getBlockStringIndentation, printBlockString */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dedentBlockStringValue", function() { return dedentBlockStringValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockStringIndentation", function() { return getBlockStringIndentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printBlockString", function() { return printBlockString; });
/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */
function dedentBlockStringValue(rawString) {
  // Expand a block string's raw value into independent lines.
  var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.

  var commonIndent = getBlockStringIndentation(rawString);

  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  } // Remove leading and trailing blank lines.


  var startLine = 0;

  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }

  var endLine = lines.length;

  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  } // Return a string of the lines joined with U+000A.


  return lines.slice(startLine, endLine).join('\n');
}

function isBlank(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] !== ' ' && str[i] !== '\t') {
      return false;
    }
  }

  return true;
}
/**
 * @internal
 */


function getBlockStringIndentation(value) {
  var _commonIndent;

  var isFirstLine = true;
  var isEmptyLine = true;
  var indent = 0;
  var commonIndent = null;

  for (var i = 0; i < value.length; ++i) {
    switch (value.charCodeAt(i)) {
      case 13:
        //  \r
        if (value.charCodeAt(i + 1) === 10) {
          ++i; // skip \r\n as one symbol
        }

      // falls through

      case 10:
        //  \n
        isFirstLine = false;
        isEmptyLine = true;
        indent = 0;
        break;

      case 9: //   \t

      case 32:
        //  <space>
        ++indent;
        break;

      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent < commonIndent)) {
          commonIndent = indent;
        }

        isEmptyLine = false;
    }
  }

  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */

function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isSingleLine = value.indexOf('\n') === -1;
  var hasLeadingSpace = value[0] === ' ' || value[0] === '\t';
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === '\\';
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result = ''; // Format a multi-line block quote to account for leading space.

  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result += '\n' + indentation;
  }

  result += indentation ? value.replace(/\n/g, '\n' + indentation) : value;

  if (printAsMultipleLines) {
    result += '\n';
  }

  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}

/***/ }),

/***/ "./node_modules/graphql/language/directiveLocation.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/graphql/language/directiveLocation.mjs ***!
  \*************************************************************/
/*! exports provided: DirectiveLocation */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectiveLocation", function() { return DirectiveLocation; });
/**
 * The set of allowed directive location values.
 */
var DirectiveLocation = Object.freeze({
  // Request Definitions
  QUERY: 'QUERY',
  MUTATION: 'MUTATION',
  SUBSCRIPTION: 'SUBSCRIPTION',
  FIELD: 'FIELD',
  FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
  FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
  INLINE_FRAGMENT: 'INLINE_FRAGMENT',
  VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
  // Type System Definitions
  SCHEMA: 'SCHEMA',
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  FIELD_DEFINITION: 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  ENUM_VALUE: 'ENUM_VALUE',
  INPUT_OBJECT: 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
});
/**
 * The enum type representing the directive location values.
 */

/***/ }),

/***/ "./node_modules/graphql/language/kinds.mjs":
/*!*************************************************!*\
  !*** ./node_modules/graphql/language/kinds.mjs ***!
  \*************************************************/
/*! exports provided: Kind */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kind", function() { return Kind; });
/**
 * The set of allowed kind values for AST nodes.
 */
var Kind = Object.freeze({
  // Name
  NAME: 'Name',
  // Document
  DOCUMENT: 'Document',
  OPERATION_DEFINITION: 'OperationDefinition',
  VARIABLE_DEFINITION: 'VariableDefinition',
  SELECTION_SET: 'SelectionSet',
  FIELD: 'Field',
  ARGUMENT: 'Argument',
  // Fragments
  FRAGMENT_SPREAD: 'FragmentSpread',
  INLINE_FRAGMENT: 'InlineFragment',
  FRAGMENT_DEFINITION: 'FragmentDefinition',
  // Values
  VARIABLE: 'Variable',
  INT: 'IntValue',
  FLOAT: 'FloatValue',
  STRING: 'StringValue',
  BOOLEAN: 'BooleanValue',
  NULL: 'NullValue',
  ENUM: 'EnumValue',
  LIST: 'ListValue',
  OBJECT: 'ObjectValue',
  OBJECT_FIELD: 'ObjectField',
  // Directives
  DIRECTIVE: 'Directive',
  // Types
  NAMED_TYPE: 'NamedType',
  LIST_TYPE: 'ListType',
  NON_NULL_TYPE: 'NonNullType',
  // Type System Definitions
  SCHEMA_DEFINITION: 'SchemaDefinition',
  OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
  // Type Definitions
  SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
  OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
  FIELD_DEFINITION: 'FieldDefinition',
  INPUT_VALUE_DEFINITION: 'InputValueDefinition',
  INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
  UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
  ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
  ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
  INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
  // Directive Definitions
  DIRECTIVE_DEFINITION: 'DirectiveDefinition',
  // Type System Extensions
  SCHEMA_EXTENSION: 'SchemaExtension',
  // Type Extensions
  SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
  OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
  INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
  UNION_TYPE_EXTENSION: 'UnionTypeExtension',
  ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
  INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
});
/**
 * The enum type representing the possible kind values of AST nodes.
 */

/***/ }),

/***/ "./node_modules/graphql/language/lexer.mjs":
/*!*************************************************!*\
  !*** ./node_modules/graphql/language/lexer.mjs ***!
  \*************************************************/
/*! exports provided: Lexer, isPunctuatorTokenKind */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lexer", function() { return Lexer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPunctuatorTokenKind", function() { return isPunctuatorTokenKind; });
/* harmony import */ var _error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/syntaxError.mjs */ "./node_modules/graphql/error/syntaxError.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast.mjs */ "./node_modules/graphql/language/ast.mjs");
/* harmony import */ var _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokenKind.mjs */ "./node_modules/graphql/language/tokenKind.mjs");
/* harmony import */ var _blockString_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blockString.mjs */ "./node_modules/graphql/language/blockString.mjs");




/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */

var Lexer = /*#__PURE__*/function () {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  function Lexer(source) {
    var startOfFileToken = new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].SOF, 0, 0, 0, 0, null);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */


  var _proto = Lexer.prototype;

  _proto.advance = function advance() {
    this.lastToken = this.token;
    var token = this.token = this.lookahead();
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  ;

  _proto.lookahead = function lookahead() {
    var token = this.token;

    if (token.kind !== _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].EOF) {
      do {
        var _token$next; // Note: next is only mutable during parsing, so we cast to allow this.


        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
      } while (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].COMMENT);
    }

    return token;
  };

  return Lexer;
}();
/**
 * @internal
 */

function isPunctuatorTokenKind(kind) {
  return kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BANG || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].DOLLAR || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].AMP || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].PAREN_L || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].PAREN_R || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].SPREAD || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].COLON || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].EQUALS || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].AT || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BRACKET_L || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BRACKET_R || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BRACE_L || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].PIPE || kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BRACE_R;
}

function printCharCode(code) {
  return (// NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].EOF : // Trust JSON for ASCII.
    code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
    "\"\\u".concat(('00' + code.toString(16).toUpperCase()).slice(-4), "\"")
  );
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */


function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = prev.end;

  while (pos < bodyLength) {
    var code = body.charCodeAt(pos);
    var _line = lexer.line;

    var _col = 1 + pos - lexer.lineStart; // SourceCharacter


    switch (code) {
      case 0xfeff: // <BOM>

      case 9: //   \t

      case 32: //  <space>

      case 44:
        //  ,
        ++pos;
        continue;

      case 10:
        //  \n
        ++pos;
        ++lexer.line;
        lexer.lineStart = pos;
        continue;

      case 13:
        //  \r
        if (body.charCodeAt(pos + 1) === 10) {
          pos += 2;
        } else {
          ++pos;
        }

        ++lexer.line;
        lexer.lineStart = pos;
        continue;

      case 33:
        //  !
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BANG, pos, pos + 1, _line, _col, prev);

      case 35:
        //  #
        return readComment(source, pos, _line, _col, prev);

      case 36:
        //  $
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].DOLLAR, pos, pos + 1, _line, _col, prev);

      case 38:
        //  &
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].AMP, pos, pos + 1, _line, _col, prev);

      case 40:
        //  (
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].PAREN_L, pos, pos + 1, _line, _col, prev);

      case 41:
        //  )
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].PAREN_R, pos, pos + 1, _line, _col, prev);

      case 46:
        //  .
        if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
          return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].SPREAD, pos, pos + 3, _line, _col, prev);
        }

        break;

      case 58:
        //  :
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].COLON, pos, pos + 1, _line, _col, prev);

      case 61:
        //  =
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].EQUALS, pos, pos + 1, _line, _col, prev);

      case 64:
        //  @
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].AT, pos, pos + 1, _line, _col, prev);

      case 91:
        //  [
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BRACKET_L, pos, pos + 1, _line, _col, prev);

      case 93:
        //  ]
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BRACKET_R, pos, pos + 1, _line, _col, prev);

      case 123:
        // {
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BRACE_L, pos, pos + 1, _line, _col, prev);

      case 124:
        // |
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].PIPE, pos, pos + 1, _line, _col, prev);

      case 125:
        // }
        return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BRACE_R, pos, pos + 1, _line, _col, prev);

      case 34:
        //  "
        if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
          return readBlockString(source, pos, _line, _col, prev, lexer);
        }

        return readString(source, pos, _line, _col, prev);

      case 45: //  -

      case 48: //  0

      case 49: //  1

      case 50: //  2

      case 51: //  3

      case 52: //  4

      case 53: //  5

      case 54: //  6

      case 55: //  7

      case 56: //  8

      case 57:
        //  9
        return readNumber(source, pos, code, _line, _col, prev);

      case 65: //  A

      case 66: //  B

      case 67: //  C

      case 68: //  D

      case 69: //  E

      case 70: //  F

      case 71: //  G

      case 72: //  H

      case 73: //  I

      case 74: //  J

      case 75: //  K

      case 76: //  L

      case 77: //  M

      case 78: //  N

      case 79: //  O

      case 80: //  P

      case 81: //  Q

      case 82: //  R

      case 83: //  S

      case 84: //  T

      case 85: //  U

      case 86: //  V

      case 87: //  W

      case 88: //  X

      case 89: //  Y

      case 90: //  Z

      case 95: //  _

      case 97: //  a

      case 98: //  b

      case 99: //  c

      case 100: // d

      case 101: // e

      case 102: // f

      case 103: // g

      case 104: // h

      case 105: // i

      case 106: // j

      case 107: // k

      case 108: // l

      case 109: // m

      case 110: // n

      case 111: // o

      case 112: // p

      case 113: // q

      case 114: // r

      case 115: // s

      case 116: // t

      case 117: // u

      case 118: // v

      case 119: // w

      case 120: // x

      case 121: // y

      case 122:
        // z
        return readName(source, pos, _line, _col, prev);
    }

    throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, pos, unexpectedCharacterMessage(code));
  }

  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;
  return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].EOF, bodyLength, bodyLength, line, col, prev);
}
/**
 * Report a message that an unexpected character was encountered.
 */


function unexpectedCharacterMessage(code) {
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }

  if (code === 39) {
    // '
    return 'Unexpected single quote character (\'), did you mean to use a double quote (")?';
  }

  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */


function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code;
  var position = start;

  do {
    code = body.charCodeAt(++position);
  } while (!isNaN(code) && ( // SourceCharacter but not LineTerminator
  code > 0x001f || code === 0x0009));

  return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
}
/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */


function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = body.charCodeAt(++position);
  }

  if (code === 48) {
    // 0
    code = body.charCodeAt(++position);

    if (code >= 48 && code <= 57) {
      throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }

  if (code === 46) {
    // .
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;
    code = body.charCodeAt(++position);

    if (code === 43 || code === 45) {
      // + -
      code = body.charCodeAt(++position);
    }

    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart


  if (code === 46 || isNameStart(code)) {
    throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
  }

  return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](isFloat ? _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].FLOAT : _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].INT, start, position, line, col, prev, body.slice(start, position));
}
/**
 * Returns the new position in the source after reading digits.
 */


function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;

  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = body.charCodeAt(++position);
    } while (code >= 48 && code <= 57); // 0 - 9


    return position;
  }

  throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */


function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && // not LineTerminator
  code !== 0x000a && code !== 0x000d) {
    // Closing Quote (")
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].STRING, start, position + 1, line, col, prev, value);
    } // SourceCharacter


    if (code < 0x0020 && code !== 0x0009) {
      throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }

    ++position;

    if (code === 92) {
      // \
      value += body.slice(chunkStart, position - 1);
      code = body.charCodeAt(position);

      switch (code) {
        case 34:
          value += '"';
          break;

        case 47:
          value += '/';
          break;

        case 92:
          value += '\\';
          break;

        case 98:
          value += '\b';
          break;

        case 102:
          value += '\f';
          break;

        case 110:
          value += '\n';
          break;

        case 114:
          value += '\r';
          break;

        case 116:
          value += '\t';
          break;

        case 117:
          {
            // uXXXX
            var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));

            if (charCode < 0) {
              var invalidSequence = body.slice(position + 1, position + 5);
              throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
            }

            value += String.fromCharCode(charCode);
            position += 4;
            break;
          }

        default:
          throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }

      ++position;
      chunkStart = position;
    }
  }

  throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, 'Unterminated string.');
}
/**
 * Reads a block string token from the source file.
 *
 * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
 */


function readBlockString(source, start, line, col, prev, lexer) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = '';

  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
    // Closing Triple-Quote (""")
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      rawValue += body.slice(chunkStart, position);
      return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].BLOCK_STRING, start, position + 3, line, col, prev, Object(_blockString_mjs__WEBPACK_IMPORTED_MODULE_3__["dedentBlockStringValue"])(rawValue));
    } // SourceCharacter


    if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
      throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }

    if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }

      ++lexer.line;
      lexer.lineStart = position;
    } else if ( // Escape Triple-Quote (\""")
    code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      rawValue += body.slice(chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }

  throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(source, position, 'Unterminated string.');
}
/**
 * Converts four hexadecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */


function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}
/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */


function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 // 0-9
  : a >= 65 && a <= 70 ? a - 55 // A-F
  : a >= 97 && a <= 102 ? a - 87 // a-f
  : -1;
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */


function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;

  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122) // a-z
  ) {
    ++position;
  }

  return new _ast_mjs__WEBPACK_IMPORTED_MODULE_1__["Token"](_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__["TokenKind"].NAME, start, position, line, col, prev, body.slice(start, position));
} // _ A-Z a-z


function isNameStart(code) {
  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}

/***/ }),

/***/ "./node_modules/graphql/language/location.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/language/location.mjs ***!
  \****************************************************/
/*! exports provided: getLocation */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;

  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }

  return {
    line: line,
    column: column
  };
}

/***/ }),

/***/ "./node_modules/graphql/language/parser.mjs":
/*!**************************************************!*\
  !*** ./node_modules/graphql/language/parser.mjs ***!
  \**************************************************/
/*! exports provided: parse, parseValue, parseType, Parser */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseValue", function() { return parseValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseType", function() { return parseType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return Parser; });
/* harmony import */ var _error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/syntaxError.mjs */ "./node_modules/graphql/error/syntaxError.mjs");
/* harmony import */ var _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kinds.mjs */ "./node_modules/graphql/language/kinds.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ast.mjs */ "./node_modules/graphql/language/ast.mjs");
/* harmony import */ var _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokenKind.mjs */ "./node_modules/graphql/language/tokenKind.mjs");
/* harmony import */ var _source_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./source.mjs */ "./node_modules/graphql/language/source.mjs");
/* harmony import */ var _directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directiveLocation.mjs */ "./node_modules/graphql/language/directiveLocation.mjs");
/* harmony import */ var _lexer_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lexer.mjs */ "./node_modules/graphql/language/lexer.mjs");







/**
 * Configuration options to control parser behavior
 */

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */

function parse(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */

function parseValue(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].SOF);
  var value = parser.parseValueLiteral(false);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].EOF);
  return value;
}
/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */

function parseType(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].SOF);
  var type = parser.parseTypeReference();
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].EOF);
  return type;
}
/**
 * This class is exported only to assist people in implementing their own parsers
 * without duplicating too much code and should be used only as last resort for cases
 * such as experimental syntax or if certain features could not be contributed upstream.
 *
 * It is still part of the internal API and is versioned, so any changes to it are never
 * considered breaking changes. If you still need to support multiple versions of the
 * library, please use the `versionInfo` variable for version detection.
 *
 * @internal
 */

var Parser = /*#__PURE__*/function () {
  function Parser(source, options) {
    var sourceObj = Object(_source_mjs__WEBPACK_IMPORTED_MODULE_4__["isSource"])(source) ? source : new _source_mjs__WEBPACK_IMPORTED_MODULE_4__["Source"](source);
    this._lexer = new _lexer_mjs__WEBPACK_IMPORTED_MODULE_6__["Lexer"](sourceObj);
    this._options = options;
  }
  /**
   * Converts a name lex token into a name parse node.
   */


  var _proto = Parser.prototype;

  _proto.parseName = function parseName() {
    var token = this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].NAME,
      value: token.value,
      loc: this.loc(token)
    };
  } // Implements the parsing rules in the Document section.

  /**
   * Document : Definition+
   */
  ;

  _proto.parseDocument = function parseDocument() {
    var start = this._lexer.token;
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].DOCUMENT,
      definitions: this.many(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].SOF, this.parseDefinition, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].EOF),
      loc: this.loc(start)
    };
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   */
  ;

  _proto.parseDefinition = function parseDefinition() {
    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME)) {
      switch (this._lexer.token.value) {
        case 'query':
        case 'mutation':
        case 'subscription':
          return this.parseOperationDefinition();

        case 'fragment':
          return this.parseFragmentDefinition();

        case 'schema':
        case 'scalar':
        case 'type':
        case 'interface':
        case 'union':
        case 'enum':
        case 'input':
        case 'directive':
          return this.parseTypeSystemDefinition();

        case 'extend':
          return this.parseTypeSystemExtension();
      }
    } else if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L)) {
      return this.parseOperationDefinition();
    } else if (this.peekDescription()) {
      return this.parseTypeSystemDefinition();
    }

    throw this.unexpected();
  } // Implements the parsing rules in the Operations section.

  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  ;

  _proto.parseOperationDefinition = function parseOperationDefinition() {
    var start = this._lexer.token;

    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L)) {
      return {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].OPERATION_DEFINITION,
        operation: 'query',
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }

    var operation = this.parseOperationType();
    var name;

    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME)) {
      name = this.parseName();
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].OPERATION_DEFINITION,
      operation: operation,
      name: name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * OperationType : one of query mutation subscription
   */
  ;

  _proto.parseOperationType = function parseOperationType() {
    var operationToken = this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME);

    switch (operationToken.value) {
      case 'query':
        return 'query';

      case 'mutation':
        return 'mutation';

      case 'subscription':
        return 'subscription';
    }

    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  ;

  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
    return this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].PAREN_L, this.parseVariableDefinition, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].PAREN_R);
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  ;

  _proto.parseVariableDefinition = function parseVariableDefinition() {
    var start = this._lexer.token;
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].EQUALS) ? this.parseValueLiteral(true) : undefined,
      directives: this.parseDirectives(true),
      loc: this.loc(start)
    };
  }
  /**
   * Variable : $ Name
   */
  ;

  _proto.parseVariable = function parseVariable() {
    var start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].DOLLAR);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].VARIABLE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  }
  /**
   * SelectionSet : { Selection+ }
   */
  ;

  _proto.parseSelectionSet = function parseSelectionSet() {
    var start = this._lexer.token;
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].SELECTION_SET,
      selections: this.many(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L, this.parseSelection, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_R),
      loc: this.loc(start)
    };
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  ;

  _proto.parseSelection = function parseSelection() {
    return this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  ;

  _proto.parseField = function parseField() {
    var start = this._lexer.token;
    var nameOrAlias = this.parseName();
    var alias;
    var name;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].FIELD,
      alias: alias,
      name: name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L) ? this.parseSelectionSet() : undefined,
      loc: this.loc(start)
    };
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  ;

  _proto.parseArguments = function parseArguments(isConst) {
    var item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].PAREN_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  ;

  _proto.parseArgument = function parseArgument() {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].COLON);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].ARGUMENT,
      name: name,
      value: this.parseValueLiteral(false),
      loc: this.loc(start)
    };
  };

  _proto.parseConstArgument = function parseConstArgument() {
    var start = this._lexer.token;
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].ARGUMENT,
      name: this.parseName(),
      value: (this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].COLON), this.parseValueLiteral(true)),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Fragments section.

  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  ;

  _proto.parseFragment = function parseFragment() {
    var start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].SPREAD);
    var hasTypeCondition = this.expectOptionalKeyword('on');

    if (!hasTypeCondition && this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME)) {
      return {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
        loc: this.loc(start)
      };
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  ;

  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
    var _this$_options;

    var start = this._lexer.token;
    this.expectKeyword('fragment'); // Experimental support for defining variables within fragments changes
    // the grammar of FragmentDefinition:
    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
      return {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * FragmentName : Name but not `on`
   */
  ;

  _proto.parseFragmentName = function parseFragmentName() {
    if (this._lexer.token.value === 'on') {
      throw this.unexpected();
    }

    return this.parseName();
  } // Implements the parsing rules in the Values section.

  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  ;

  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
    var token = this._lexer.token;

    switch (token.kind) {
      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACKET_L:
        return this.parseList(isConst);

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L:
        return this.parseObject(isConst);

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].INT:
        this._lexer.advance();

        return {
          kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].INT,
          value: token.value,
          loc: this.loc(token)
        };

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].FLOAT:
        this._lexer.advance();

        return {
          kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].FLOAT,
          value: token.value,
          loc: this.loc(token)
        };

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].STRING:
      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BLOCK_STRING:
        return this.parseStringLiteral();

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME:
        this._lexer.advance();

        switch (token.value) {
          case 'true':
            return {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].BOOLEAN,
              value: true,
              loc: this.loc(token)
            };

          case 'false':
            return {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].BOOLEAN,
              value: false,
              loc: this.loc(token)
            };

          case 'null':
            return {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].NULL,
              loc: this.loc(token)
            };

          default:
            return {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].ENUM,
              value: token.value,
              loc: this.loc(token)
            };
        }

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].DOLLAR:
        if (!isConst) {
          return this.parseVariable();
        }

        break;
    }

    throw this.unexpected();
  };

  _proto.parseStringLiteral = function parseStringLiteral() {
    var token = this._lexer.token;

    this._lexer.advance();

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].STRING,
      value: token.value,
      block: token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BLOCK_STRING,
      loc: this.loc(token)
    };
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  ;

  _proto.parseList = function parseList(isConst) {
    var _this = this;

    var start = this._lexer.token;

    var item = function item() {
      return _this.parseValueLiteral(isConst);
    };

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].LIST,
      values: this.any(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACKET_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACKET_R),
      loc: this.loc(start)
    };
  }
  /**
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   */
  ;

  _proto.parseObject = function parseObject(isConst) {
    var _this2 = this;

    var start = this._lexer.token;

    var item = function item() {
      return _this2.parseObjectField(isConst);
    };

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].OBJECT,
      fields: this.any(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_R),
      loc: this.loc(start)
    };
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  ;

  _proto.parseObjectField = function parseObjectField(isConst) {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].COLON);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].OBJECT_FIELD,
      name: name,
      value: this.parseValueLiteral(isConst),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Directives section.

  /**
   * Directives[Const] : Directive[?Const]+
   */
  ;

  _proto.parseDirectives = function parseDirectives(isConst) {
    var directives = [];

    while (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].AT)) {
      directives.push(this.parseDirective(isConst));
    }

    return directives;
  }
  /**
   * Directive[Const] : @ Name Arguments[?Const]?
   */
  ;

  _proto.parseDirective = function parseDirective(isConst) {
    var start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].AT);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Types section.

  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  ;

  _proto.parseTypeReference = function parseTypeReference() {
    var start = this._lexer.token;
    var type;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACKET_L)) {
      type = this.parseTypeReference();
      this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACKET_R);
      type = {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].LIST_TYPE,
        type: type,
        loc: this.loc(start)
      };
    } else {
      type = this.parseNamedType();
    }

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BANG)) {
      return {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].NON_NULL_TYPE,
        type: type,
        loc: this.loc(start)
      };
    }

    return type;
  }
  /**
   * NamedType : Name
   */
  ;

  _proto.parseNamedType = function parseNamedType() {
    var start = this._lexer.token;
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].NAMED_TYPE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Type Definition section.

  /**
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  ;

  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
    // Many definitions begin with a description and require a lookahead.
    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;

    if (keywordToken.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaDefinition();

        case 'scalar':
          return this.parseScalarTypeDefinition();

        case 'type':
          return this.parseObjectTypeDefinition();

        case 'interface':
          return this.parseInterfaceTypeDefinition();

        case 'union':
          return this.parseUnionTypeDefinition();

        case 'enum':
          return this.parseEnumTypeDefinition();

        case 'input':
          return this.parseInputObjectTypeDefinition();

        case 'directive':
          return this.parseDirectiveDefinition();
      }
    }

    throw this.unexpected(keywordToken);
  };

  _proto.peekDescription = function peekDescription() {
    return this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].STRING) || this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  ;

  _proto.parseDescription = function parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   */
  ;

  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('schema');
    var directives = this.parseDirectives(true);
    var operationTypes = this.many(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L, this.parseOperationTypeDefinition, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_R);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].SCHEMA_DEFINITION,
      description: description,
      directives: directives,
      operationTypes: operationTypes,
      loc: this.loc(start)
    };
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  ;

  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
    var start = this._lexer.token;
    var operation = this.parseOperationType();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].COLON);
    var type = this.parseNamedType();
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].OPERATION_TYPE_DEFINITION,
      operation: operation,
      type: type,
      loc: this.loc(start)
    };
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  ;

  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('scalar');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].SCALAR_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  ;

  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('type');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].OBJECT_TYPE_DEFINITION,
      description: description,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  ;

  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
    var _this$_options2;

    if (!this.expectOptionalKeyword('implements')) {
      return [];
    }

    if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
      var types = []; // Optional leading ampersand

      this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].AMP);

      do {
        types.push(this.parseNamedType());
      } while (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].AMP) || this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME));

      return types;
    }

    return this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].AMP, this.parseNamedType);
  }
  /**
   * FieldsDefinition : { FieldDefinition+ }
   */
  ;

  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
    var _this$_options3; // Legacy support for the SDL?


    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L) && this._lexer.lookahead().kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_R) {
      this._lexer.advance();

      this._lexer.advance();

      return [];
    }

    return this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L, this.parseFieldDefinition, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_R);
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  ;

  _proto.parseFieldDefinition = function parseFieldDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].COLON);
    var type = this.parseTypeReference();
    var directives = this.parseDirectives(true);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].FIELD_DEFINITION,
      description: description,
      name: name,
      arguments: args,
      type: type,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  ;

  _proto.parseArgumentDefs = function parseArgumentDefs() {
    return this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].PAREN_L, this.parseInputValueDef, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].PAREN_R);
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  ;

  _proto.parseInputValueDef = function parseInputValueDef() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].COLON);
    var type = this.parseTypeReference();
    var defaultValue;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].EQUALS)) {
      defaultValue = this.parseValueLiteral(true);
    }

    var directives = this.parseDirectives(true);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].INPUT_VALUE_DEFINITION,
      description: description,
      name: name,
      type: type,
      defaultValue: defaultValue,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  ;

  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('interface');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].INTERFACE_TYPE_DEFINITION,
      description: description,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  ;

  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('union');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].UNION_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      types: types,
      loc: this.loc(start)
    };
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  ;

  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
    return this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].EQUALS) ? this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  ;

  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('enum');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].ENUM_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      values: values,
      loc: this.loc(start)
    };
  }
  /**
   * EnumValuesDefinition : { EnumValueDefinition+ }
   */
  ;

  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
    return this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L, this.parseEnumValueDefinition, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_R);
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   *
   * EnumValue : Name
   */
  ;

  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].ENUM_VALUE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  ;

  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('input');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].INPUT_OBJECT_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * InputFieldsDefinition : { InputValueDefinition+ }
   */
  ;

  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
    return this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L, this.parseInputValueDef, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_R);
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  ;

  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
    var keywordToken = this._lexer.lookahead();

    if (keywordToken.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaExtension();

        case 'scalar':
          return this.parseScalarTypeExtension();

        case 'type':
          return this.parseObjectTypeExtension();

        case 'interface':
          return this.parseInterfaceTypeExtension();

        case 'union':
          return this.parseUnionTypeExtension();

        case 'enum':
          return this.parseEnumTypeExtension();

        case 'input':
          return this.parseInputObjectTypeExtension();
      }
    }

    throw this.unexpected(keywordToken);
  }
  /**
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   */
  ;

  _proto.parseSchemaExtension = function parseSchemaExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('schema');
    var directives = this.parseDirectives(true);
    var operationTypes = this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_L, this.parseOperationTypeDefinition, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].BRACE_R);

    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].SCHEMA_EXTENSION,
      directives: directives,
      operationTypes: operationTypes,
      loc: this.loc(start)
    };
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  ;

  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('scalar');
    var name = this.parseName();
    var directives = this.parseDirectives(true);

    if (directives.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].SCALAR_TYPE_EXTENSION,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  ;

  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('type');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();

    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].OBJECT_TYPE_EXTENSION,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  ;

  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('interface');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();

    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].INTERFACE_TYPE_EXTENSION,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  ;

  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('union');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();

    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].UNION_TYPE_EXTENSION,
      name: name,
      directives: directives,
      types: types,
      loc: this.loc(start)
    };
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  ;

  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('enum');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();

    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].ENUM_TYPE_EXTENSION,
      name: name,
      directives: directives,
      values: values,
      loc: this.loc(start)
    };
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  ;

  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('input');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();

    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].INPUT_OBJECT_TYPE_EXTENSION,
      name: name,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   */
  ;

  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('directive');
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].AT);
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    var repeatable = this.expectOptionalKeyword('repeatable');
    this.expectKeyword('on');
    var locations = this.parseDirectiveLocations();
    return {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__["Kind"].DIRECTIVE_DEFINITION,
      description: description,
      name: name,
      arguments: args,
      repeatable: repeatable,
      locations: locations,
      loc: this.loc(start)
    };
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  ;

  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
    return this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  ;

  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
    var start = this._lexer.token;
    var name = this.parseName();

    if (_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_5__["DirectiveLocation"][name.value] !== undefined) {
      return name;
    }

    throw this.unexpected(start);
  } // Core parsing utility functions

  /**
   * Returns a location object, used to identify the place in the source that created a given parsed object.
   */
  ;

  _proto.loc = function loc(startToken) {
    var _this$_options4;

    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
      return new _ast_mjs__WEBPACK_IMPORTED_MODULE_2__["Location"](startToken, this._lexer.lastToken, this._lexer.source);
    }
  }
  /**
   * Determines if the next token is of a given kind
   */
  ;

  _proto.peek = function peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  ;

  _proto.expectToken = function expectToken(kind) {
    var token = this._lexer.token;

    if (token.kind === kind) {
      this._lexer.advance();

      return token;
    }

    throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and return undefined.
   */
  ;

  _proto.expectOptionalToken = function expectOptionalToken(kind) {
    var token = this._lexer.token;

    if (token.kind === kind) {
      this._lexer.advance();

      return token;
    }

    return undefined;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  ;

  _proto.expectKeyword = function expectKeyword(value) {
    var token = this._lexer.token;

    if (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(this._lexer.source, token.start, "Expected \"".concat(value, "\", found ").concat(getTokenDesc(token), "."));
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  ;

  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
    var token = this._lexer.token;

    if (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_3__["TokenKind"].NAME && token.value === value) {
      this._lexer.advance();

      return true;
    }

    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  ;

  _proto.unexpected = function unexpected(atToken) {
    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return Object(_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_0__["syntaxError"])(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  ;

  _proto.any = function any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];

    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }

    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  ;

  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      var nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }

    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  ;

  _proto.many = function many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));

    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  ;

  _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    var nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));

    return nodes;
  };

  return Parser;
}();
/**
 * A helper function to describe a token as a string for debugging.
 */

function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? " \"".concat(value, "\"") : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */


function getTokenKindDesc(kind) {
  return Object(_lexer_mjs__WEBPACK_IMPORTED_MODULE_6__["isPunctuatorTokenKind"])(kind) ? "\"".concat(kind, "\"") : kind;
}

/***/ }),

/***/ "./node_modules/graphql/language/printLocation.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/graphql/language/printLocation.mjs ***!
  \*********************************************************/
/*! exports provided: printLocation, printSourceLocation */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printLocation", function() { return printLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printSourceLocation", function() { return printSourceLocation; });
/* harmony import */ var _location_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./location.mjs */ "./node_modules/graphql/language/location.mjs");

/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printLocation(location) {
  return printSourceLocation(location.source, Object(_location_mjs__WEBPACK_IMPORTED_MODULE_0__["getLocation"])(location.source, location.start));
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];

    for (var i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function (subLine) {
      return ['', subLine];
    }), [[' ', whitespace(subLineColumnNum - 1) + '^'], ['', subLines[subLineIndex + 1]]]));
  }

  return locationStr + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
  ["".concat(lineNum - 1), lines[lineIndex - 1]], ["".concat(lineNum), locationLine], ['', whitespace(columnNum - 1) + '^'], ["".concat(lineNum + 1), lines[lineIndex + 1]]]);
}

function printPrefixedLines(lines) {
  var existingLines = lines.filter(function (_ref) {
    var _ = _ref[0],
        line = _ref[1];
    return line !== undefined;
  });
  var padLen = Math.max.apply(Math, existingLines.map(function (_ref2) {
    var prefix = _ref2[0];
    return prefix.length;
  }));
  return existingLines.map(function (_ref3) {
    var prefix = _ref3[0],
        line = _ref3[1];
    return leftPad(padLen, prefix) + (line ? ' | ' + line : ' |');
  }).join('\n');
}

function whitespace(len) {
  return Array(len + 1).join(' ');
}

function leftPad(len, str) {
  return whitespace(len - str.length) + str;
}

/***/ }),

/***/ "./node_modules/graphql/language/printer.mjs":
/*!***************************************************!*\
  !*** ./node_modules/graphql/language/printer.mjs ***!
  \***************************************************/
/*! exports provided: print */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "print", function() { return print; });
/* harmony import */ var _visitor_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visitor.mjs */ "./node_modules/graphql/language/visitor.mjs");
/* harmony import */ var _blockString_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blockString.mjs */ "./node_modules/graphql/language/blockString.mjs");


/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return Object(_visitor_mjs__WEBPACK_IMPORTED_MODULE_0__["visit"])(ast, {
    leave: printDocASTReducer
  });
}
var MAX_LINE_LENGTH = 80; // TODO: provide better type coverage in future

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },
  // Document
  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
    // the query short form.

    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue,
        directives = _ref.directives;
    return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    var prefix = wrap('', alias, ': ') + name;
    var argsLine = prefix + wrap('(', join(args, ', '), ')');

    if (argsLine.length > MAX_LINE_LENGTH) {
      argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
    }

    return join([argsLine, join(directives, ' '), selectionSet], ' ');
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },
  // Fragments
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        variableDefinitions = _ref7.variableDefinitions,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return (// Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
    );
  },
  // Value
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value,
        isBlockString = _ref10.block;
    return isBlockString ? Object(_blockString_mjs__WEBPACK_IMPORTED_MODULE_1__["printBlockString"])(value, key === 'description' ? '' : '  ') : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? 'true' : 'false';
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },
  // Directive
  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },
  // Type
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },
  // Type System Definitions
  SchemaDefinition: addDescription(function (_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },
  ScalarTypeDefinition: addDescription(function (_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  }),
  ObjectTypeDefinition: addDescription(function (_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  FieldDefinition: addDescription(function (_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + ': ' + type + wrap(' ', join(directives, ' '));
  }),
  InputValueDefinition: addDescription(function (_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  }),
  InterfaceTypeDefinition: addDescription(function (_ref26) {
    var name = _ref26.name,
        interfaces = _ref26.interfaces,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  UnionTypeDefinition: addDescription(function (_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  }),
  EnumTypeDefinition: addDescription(function (_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  }),
  EnumValueDefinition: addDescription(function (_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  }),
  InputObjectTypeDefinition: addDescription(function (_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  }),
  DirectiveDefinition: addDescription(function (_ref31) {
    var name = _ref31.name,
        args = _ref31.arguments,
        repeatable = _ref31.repeatable,
        locations = _ref31.locations;
    return 'directive @' + name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + (repeatable ? ' repeatable' : '') + ' on ' + join(locations, ' | ');
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives,
        operationTypes = _ref32.operationTypes;
    return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name,
        directives = _ref33.directives;
    return join(['extend scalar', name, join(directives, ' ')], ' ');
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name,
        interfaces = _ref34.interfaces,
        directives = _ref34.directives,
        fields = _ref34.fields;
    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name,
        interfaces = _ref35.interfaces,
        directives = _ref35.directives,
        fields = _ref35.fields;
    return join(['extend interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name,
        directives = _ref36.directives,
        types = _ref36.types;
    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name,
        directives = _ref37.directives,
        values = _ref37.values;
    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name,
        directives = _ref38.directives,
        fields = _ref38.fields;
    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
  }
};

function addDescription(cb) {
  return function (node) {
    return join([node.description, cb(node)], '\n');
  };
}
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */


function join(maybeArray) {
  var _maybeArray$filter$jo;

  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function (x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : '';
}
/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */


function block(array) {
  return wrap('{\n', indent(join(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */


function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return maybeString != null && maybeString !== '' ? start + maybeString + end : '';
}

function indent(str) {
  return wrap('  ', str.replace(/\n/g, '\n  '));
}

function isMultiline(str) {
  return str.indexOf('\n') !== -1;
}

function hasMultilineItems(maybeArray) {
  return maybeArray != null && maybeArray.some(isMultiline);
}

/***/ }),

/***/ "./node_modules/graphql/language/source.mjs":
/*!**************************************************!*\
  !*** ./node_modules/graphql/language/source.mjs ***!
  \**************************************************/
/*! exports provided: Source, isSource */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Source", function() { return Source; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSource", function() { return isSource; });
/* harmony import */ var _polyfills_symbols_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../polyfills/symbols.mjs */ "./node_modules/graphql/polyfills/symbols.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "./node_modules/graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "./node_modules/graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/instanceOf.mjs */ "./node_modules/graphql/jsutils/instanceOf.mjs");
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}





/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */

var Source = /*#__PURE__*/function () {
  function Source(body) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GraphQL request';
    var locationOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      line: 1,
      column: 1
    };
    typeof body === 'string' || Object(_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])(0, "Body must be a string. Received: ".concat(Object(_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])(body), "."));
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || Object(_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])(0, 'line in locationOffset is 1-indexed and must be positive.');
    this.locationOffset.column > 0 || Object(_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])(0, 'column in locationOffset is 1-indexed and must be positive.');
  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet


  _createClass(Source, [{
    key: _polyfills_symbols_mjs__WEBPACK_IMPORTED_MODULE_0__["SYMBOL_TO_STRING_TAG"],
    get: function get() {
      return 'Source';
    }
  }]);

  return Source;
}();
/**
 * Test if the given value is a Source object.
 *
 * @internal
 */
// eslint-disable-next-line no-redeclare

function isSource(source) {
  return Object(_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_3__["default"])(source, Source);
}

/***/ }),

/***/ "./node_modules/graphql/language/tokenKind.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/graphql/language/tokenKind.mjs ***!
  \*****************************************************/
/*! exports provided: TokenKind */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenKind", function() { return TokenKind; });
/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = Object.freeze({
  SOF: '<SOF>',
  EOF: '<EOF>',
  BANG: '!',
  DOLLAR: '$',
  AMP: '&',
  PAREN_L: '(',
  PAREN_R: ')',
  SPREAD: '...',
  COLON: ':',
  EQUALS: '=',
  AT: '@',
  BRACKET_L: '[',
  BRACKET_R: ']',
  BRACE_L: '{',
  PIPE: '|',
  BRACE_R: '}',
  NAME: 'Name',
  INT: 'Int',
  FLOAT: 'Float',
  STRING: 'String',
  BLOCK_STRING: 'BlockString',
  COMMENT: 'Comment'
});
/**
 * The enum type representing the token kinds values.
 */

/***/ }),

/***/ "./node_modules/graphql/language/visitor.mjs":
/*!***************************************************!*\
  !*** ./node_modules/graphql/language/visitor.mjs ***!
  \***************************************************/
/*! exports provided: QueryDocumentKeys, BREAK, visit, visitInParallel, getVisitFn */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryDocumentKeys", function() { return QueryDocumentKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BREAK", function() { return BREAK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visit", function() { return visit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visitInParallel", function() { return visitInParallel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisitFn", function() { return getVisitFn; });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "./node_modules/graphql/jsutils/inspect.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast.mjs */ "./node_modules/graphql/language/ast.mjs");


/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */

var QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields']
};
var BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */

function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;
  /* eslint-disable no-undef-init */

  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};

          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }

          node = clone;
        }

        var editOffset = 0;

        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];

          if (inArray) {
            editKey -= editOffset;
          }

          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;

      if (node === null || node === undefined) {
        continue;
      }

      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      if (!Object(_ast_mjs__WEBPACK_IMPORTED_MODULE_1__["isNode"])(node)) {
        throw new Error("Invalid AST Node: ".concat(Object(_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(node), "."));
      }

      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);

          if (!isLeaving) {
            if (Object(_ast_mjs__WEBPACK_IMPORTED_MODULE_1__["isNode"])(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;

      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */

function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);
  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          false);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          true);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */

function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];

  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }

    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }

      var specificKindVisitor = specificVisitor[kind];

      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}

/***/ }),

/***/ "./node_modules/graphql/polyfills/symbols.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/polyfills/symbols.mjs ***!
  \****************************************************/
/*! exports provided: SYMBOL_ITERATOR, SYMBOL_ASYNC_ITERATOR, SYMBOL_TO_STRING_TAG */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_ITERATOR", function() { return SYMBOL_ITERATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_ASYNC_ITERATOR", function() { return SYMBOL_ASYNC_ITERATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_TO_STRING_TAG", function() { return SYMBOL_TO_STRING_TAG; });
// In ES2015 (or a polyfilled) environment, this will be Symbol.iterator
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var SYMBOL_ITERATOR = typeof Symbol === 'function' && Symbol.iterator != null ? Symbol.iterator : '@@iterator'; // In ES2017 (or a polyfilled) environment, this will be Symbol.asyncIterator
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')

var SYMBOL_ASYNC_ITERATOR = typeof Symbol === 'function' && Symbol.asyncIterator != null ? Symbol.asyncIterator : '@@asyncIterator'; // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')

var SYMBOL_TO_STRING_TAG = typeof Symbol === 'function' && Symbol.toStringTag != null ? Symbol.toStringTag : '@@toStringTag';

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/ts-invariant/lib/invariant.js":
/*!****************************************************!*\
  !*** ./node_modules/ts-invariant/lib/invariant.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

var tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js");

var genericMessage = "Invariant Violation";
var _a = Object.setPrototypeOf,
    setPrototypeOf = _a === void 0 ? function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
} : _a;

var InvariantError =
/** @class */
function (_super) {
  tslib.__extends(InvariantError, _super);

  function InvariantError(message) {
    if (message === void 0) {
      message = genericMessage;
    }

    var _this = _super.call(this, typeof message === "number" ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;

    _this.framesToPop = 1;
    _this.name = genericMessage;
    setPrototypeOf(_this, InvariantError.prototype);
    return _this;
  }

  return InvariantError;
}(Error);

function invariant(condition, message) {
  if (!condition) {
    throw new InvariantError(message);
  }
}

function wrapConsoleMethod(method) {
  return function () {
    return console[method].apply(console, arguments);
  };
}

(function (invariant) {
  invariant.warn = wrapConsoleMethod("warn");
  invariant.error = wrapConsoleMethod("error");
})(invariant || (invariant = {})); // Code that uses ts-invariant with rollup-plugin-invariant may want to
// import this process stub to avoid errors evaluating process.env.NODE_ENV.
// However, because most ESM-to-CJS compilers will rewrite the process import
// as tsInvariant.process, which prevents proper replacement by minifiers, we
// also attempt to define the stub globally when it is not already defined.


exports.process = {
  env: {}
};

if (typeof process === "object") {
  exports.process = process;
} else try {
  // Using Function to evaluate this assignment in global scope also escapes
  // the strict mode of the current module, thereby allowing the assignment.
  // Inspired by https://github.com/facebook/regenerator/pull/369.
  Function("stub", "process = stub")(exports.process);
} catch (atLeastWeTried) {// The assignment can fail if a Content Security Policy heavy-handedly
  // forbids Function usage. In those environments, developers should take
  // extra care to replace process.env.NODE_ENV in their production builds,
  // or define an appropriate global.process polyfill.
}

var invariant$1 = invariant;
exports.default = invariant$1;
exports.InvariantError = InvariantError;
exports.invariant = invariant;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/tslib/tslib.js":
/*!*************************************!*\
  !*** ./node_modules/tslib/tslib.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global global, define, System, Reflect, Promise */
var __extends;

var __assign;

var __rest;

var __decorate;

var __param;

var __metadata;

var __awaiter;

var __generator;

var __exportStar;

var __values;

var __read;

var __spread;

var __spreadArrays;

var __await;

var __asyncGenerator;

var __asyncDelegator;

var __asyncValues;

var __makeTemplateObject;

var __importStar;

var __importDefault;

var __classPrivateFieldGet;

var __classPrivateFieldSet;

var __createBinding;

(function (factory) {
  var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (exports) {
      factory(createExporter(root, createExporter(exports)));
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

  function createExporter(exports, previous) {
    if (exports !== root) {
      if (typeof Object.create === "function") {
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
      } else {
        exports.__esModule = true;
      }
    }

    return function (id, v) {
      return exports[id] = previous ? previous(id, v) : v;
    };
  }
})(function (exporter) {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  __extends = function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };

  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  __rest = function (s, e) {
    var t = {};

    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };

  __decorate = function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  __param = function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };

  __metadata = function (metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  };

  __awaiter = function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  __generator = function (thisArg, body) {
    var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };

  __createBinding = function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  };

  __exportStar = function (m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
  };

  __values = function (o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };

  __read = function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;

    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = {
        error: error
      };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }

    return ar;
  };

  __spread = function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

    return ar;
  };

  __spreadArrays = function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

    return r;
  };

  __await = function (v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };

  __asyncGenerator = function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i;

    function verb(n) {
      if (g[n]) i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
    }

    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }

    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }

    function fulfill(value) {
      resume("next", value);
    }

    function reject(value) {
      resume("throw", value);
    }

    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  };

  __asyncDelegator = function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function () {
      return this;
    }, i;

    function verb(n, f) {
      i[n] = o[n] ? function (v) {
        return (p = !p) ? {
          value: __await(o[n](v)),
          done: n === "return"
        } : f ? f(v) : v;
      } : f;
    }
  };

  __asyncValues = function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i);

    function verb(n) {
      i[n] = o[n] && function (v) {
        return new Promise(function (resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }

    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({
          value: v,
          done: d
        });
      }, reject);
    }
  };

  __makeTemplateObject = function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", {
        value: raw
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  };

  __importStar = function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };

  __importDefault = function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  __classPrivateFieldGet = function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    return privateMap.get(receiver);
  };

  __classPrivateFieldSet = function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    privateMap.set(receiver, value);
    return value;
  };

  exporter("__extends", __extends);
  exporter("__assign", __assign);
  exporter("__rest", __rest);
  exporter("__decorate", __decorate);
  exporter("__param", __param);
  exporter("__metadata", __metadata);
  exporter("__awaiter", __awaiter);
  exporter("__generator", __generator);
  exporter("__exportStar", __exportStar);
  exporter("__createBinding", __createBinding);
  exporter("__values", __values);
  exporter("__read", __read);
  exporter("__spread", __spread);
  exporter("__spreadArrays", __spreadArrays);
  exporter("__await", __await);
  exporter("__asyncGenerator", __asyncGenerator);
  exporter("__asyncDelegator", __asyncDelegator);
  exporter("__asyncValues", __asyncValues);
  exporter("__makeTemplateObject", __makeTemplateObject);
  exporter("__importStar", __importStar);
  exporter("__importDefault", __importDefault);
  exporter("__classPrivateFieldGet", __classPrivateFieldGet);
  exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uuid/dist/index.js":
/*!*****************************************!*\
  !*** ./node_modules/uuid/dist/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});

var _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/v1.js"));

var _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/v3.js"));

var _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/v4.js"));

var _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/v5.js"));

var _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/nil.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/version.js"));

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/parse.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

/***/ }),

/***/ "./node_modules/uuid/dist/md5-browser.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/md5-browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/nil.js":
/*!***************************************!*\
  !*** ./node_modules/uuid/dist/nil.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/parse.js":
/*!*****************************************!*\
  !*** ./node_modules/uuid/dist/parse.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/regex.js":
/*!*****************************************!*\
  !*** ./node_modules/uuid/dist/regex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/rng-browser.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/rng-browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng; // Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.

const getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
const rnds8 = new Uint8Array(16);

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/sha1-browser.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/sha1-browser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html

function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/stringify.js":
/*!*********************************************!*\
  !*** ./node_modules/uuid/dist/stringify.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */


const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/v1.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v1.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/rng-browser.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html


let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/v3.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v3.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/v35.js"));

var _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/md5-browser.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/v35.js":
/*!***************************************!*\
  !*** ./node_modules/uuid/dist/v35.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/parse.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ "./node_modules/uuid/dist/v4.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v4.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/rng-browser.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/v5.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v5.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/v35.js"));

var _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/sha1-browser.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/validate.js":
/*!********************************************!*\
  !*** ./node_modules/uuid/dist/validate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/regex.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/version.js":
/*!*******************************************!*\
  !*** ./node_modules/uuid/dist/version.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports.default = _default;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./node_modules/zen-observable/index.js":
/*!**********************************************!*\
  !*** ./node_modules/zen-observable/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/Observable.js */ "./node_modules/zen-observable/lib/Observable.js").Observable;

/***/ }),

/***/ "./node_modules/zen-observable/lib/Observable.js":
/*!*******************************************************!*\
  !*** ./node_modules/zen-observable/lib/Observable.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
} // === Symbol Support ===


var hasSymbols = function () {
  return typeof Symbol === 'function';
};

var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};

var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

var SymbolIterator = getSymbol('iterator');
var SymbolObservable = getSymbol('observable');
var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];
  if (value == null) return undefined;
  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;

  if (ctor !== undefined) {
    ctor = ctor[SymbolSpecies];

    if (ctor === null) {
      ctor = undefined;
    }
  }

  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;
  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');

      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;

  if (!queue) {
    return;
  }

  subscription._queue = undefined;
  subscription._state = 'ready';

  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';
  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);

    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;

      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;

      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({
      type: type,
      value: value
    });

    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{
      type: type,
      value: value
    }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription = /*#__PURE__*/function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription); // ASSERT: observer is an object
    // ASSERT: subscriber is callable


    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';
    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: "unsubscribe",
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: "closed",
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver = /*#__PURE__*/function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: "next",
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: "error",
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: "complete",
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: "closed",
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable = /*#__PURE__*/function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: "subscribe",
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }

      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: "map",
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "reduce",
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;
      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "concat",
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);
      return new C(function (observer) {
        var subscription;
        var index = 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (index === sources.length) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources[index++]));
              }
            }
          });
        }

        startNext(_this5);
        return function () {
          if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
          }
        };
      });
    }
  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });
            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: SymbolObservable,
    value: function () {
      return this;
    }
  }], [{
    key: "from",
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;
      if (x == null) throw new TypeError(x + ' is not an object');
      var method = getMethod(x, SymbolObservable);

      if (method) {
        var observable = method.call(x);
        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
        if (isObservable(observable) && observable.constructor === C) return observable;
        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, SymbolIterator);

        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var _item = _step.value;
                  observer.next(_item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;

            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }

            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;
      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;

          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }

          observer.complete();
        });
      });
    }
  }, {
    key: SymbolSpecies,
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

exports.Observable = Observable;

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: SymbolObservable,
      hostReportError: hostReportError
    },
    configurable: true
  });
}

/***/ }),

/***/ "./packages/data/src/DataProvider.tsx":
/*!********************************************!*\
  !*** ./packages/data/src/DataProvider.tsx ***!
  \********************************************/
/*! exports provided: DataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataProvider", function() { return DataProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/index.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client */ "./packages/data/src/client.ts");



const DataProvider = ({
  children
}) => {
  const client = Object(_client__WEBPACK_IMPORTED_MODULE_2__["getClient"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["ApolloProvider"], {
    client: client
  }, children);
};

/***/ }),

/***/ "./packages/data/src/client.ts":
/*!*************************************!*\
  !*** ./packages/data/src/client.ts ***!
  \*************************************/
/*! exports provided: cache, getClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cache", function() { return cache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClient", function() { return getClient; });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/main.cjs.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client_link_batch_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client/link/batch-http */ "./node_modules/@apollo/client/link/batch-http/batch-http.cjs.js");
/* harmony import */ var _apollo_client_link_batch_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_link_batch_http__WEBPACK_IMPORTED_MODULE_1__);
var _window, _window$eventEspresso, _window$eventEspresso2, _window2, _window2$eventEspress, _window2$eventEspress2;



const graphqlEndpoint = ((_window = window) === null || _window === void 0 ? void 0 : (_window$eventEspresso = _window.eventEspressoData) === null || _window$eventEspresso === void 0 ? void 0 : (_window$eventEspresso2 = _window$eventEspresso.api) === null || _window$eventEspresso2 === void 0 ? void 0 : _window$eventEspresso2.graphqlEndpoint) || '';
const nonce = ((_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$eventEspress = _window2.eventEspressoData) === null || _window2$eventEspress === void 0 ? void 0 : (_window2$eventEspress2 = _window2$eventEspress.api) === null || _window2$eventEspress2 === void 0 ? void 0 : _window2$eventEspress2.restApiNonce) || '';

const getReadFunction = type => {
  return (_, {
    args,
    toReference
  }) => toReference({
    __typename: type,
    id: args.id
  });
};

const cacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        datetime: getReadFunction('EspressoDatetime'),
        ticket: getReadFunction('EspressoTicket'),
        price: getReadFunction('EspressoPrice'),
        priceType: getReadFunction('EspressoPriceType'),
        recurrence: getReadFunction('EspressoRecurrence')
      }
    }
  }
};
const cache = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__["InMemoryCache"](cacheConfig);
const getClient = () => {
  // add nonce only if exists
  const headers = nonce ? {
    'X-WP-Nonce': nonce
  } : null;
  const link = new _apollo_client_link_batch_http__WEBPACK_IMPORTED_MODULE_1__["BatchHttpLink"]({
    uri: graphqlEndpoint || '/graphql',
    headers
  });
  const client = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__["ApolloClient"]({
    cache,
    link
  });
  return client;
};

/***/ }),

/***/ "./packages/data/src/events.ts":
/*!*************************************!*\
  !*** ./packages/data/src/events.ts ***!
  \*************************************/
/*! exports provided: events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony import */ var _eventespresso_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/events */ "@eventespresso/events");
/* harmony import */ var _eventespresso_events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_events__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Event set emitted by data package
 */

const events = new _eventespresso_events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();

/***/ }),

/***/ "./packages/data/src/hooks/index.ts":
/*!******************************************!*\
  !*** ./packages/data/src/hooks/index.ts ***!
  \******************************************/
/*! exports provided: useReactiveVariable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useReactiveVariable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useReactiveVariable */ "./packages/data/src/hooks/useReactiveVariable.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReactiveVariable", function() { return _useReactiveVariable__WEBPACK_IMPORTED_MODULE_0__["useReactiveVariable"]; });



/***/ }),

/***/ "./packages/data/src/hooks/useReactiveVariable.ts":
/*!********************************************************!*\
  !*** ./packages/data/src/hooks/useReactiveVariable.ts ***!
  \********************************************************/
/*! exports provided: useReactiveVariable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReactiveVariable", function() { return useReactiveVariable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/index.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);


const useReactiveVariable = reactiveVar => {
  const value = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useReactiveVar"])(reactiveVar);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => [value, reactiveVar], [reactiveVar, value]);
};

/***/ }),

/***/ "./packages/data/src/index.ts":
/*!************************************!*\
  !*** ./packages/data/src/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types */ "./types/index.ts");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client */ "./packages/data/src/client.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cache", function() { return _client__WEBPACK_IMPORTED_MODULE_1__["cache"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getClient", function() { return _client__WEBPACK_IMPORTED_MODULE_1__["getClient"]; });

/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks */ "./packages/data/src/hooks/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReactiveVariable", function() { return _hooks__WEBPACK_IMPORTED_MODULE_2__["useReactiveVariable"]; });

/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events */ "./packages/data/src/events.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _events__WEBPACK_IMPORTED_MODULE_3__["events"]; });

/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mutations */ "./packages/data/src/mutations/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useMutationWithFeedback", function() { return _mutations__WEBPACK_IMPORTED_MODULE_4__["useMutationWithFeedback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MutationType", function() { return _mutations__WEBPACK_IMPORTED_MODULE_4__["MutationType"]; });

/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./queries */ "./packages/data/src/queries/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _queries__WEBPACK_IMPORTED_MODULE_5__) if(["default","withDataProvider","cache","getClient","useReactiveVariable","events","useMutationWithFeedback","MutationType"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _queries__WEBPACK_IMPORTED_MODULE_5__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "./packages/data/src/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_6__) if(["default","withDataProvider","cache","getClient","useReactiveVariable","events","useMutationWithFeedback","MutationType"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _DataProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DataProvider */ "./packages/data/src/DataProvider.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataProvider", function() { return _DataProvider__WEBPACK_IMPORTED_MODULE_7__["DataProvider"]; });

/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/index.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__) if(["default","withDataProvider","cache","getClient","useReactiveVariable","events","useMutationWithFeedback","MutationType","DataProvider"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_8__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/main.cjs.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_9__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _apollo_client__WEBPACK_IMPORTED_MODULE_9__) if(["default","withDataProvider","cache","getClient","useReactiveVariable","events","useMutationWithFeedback","MutationType","DataProvider"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _apollo_client__WEBPACK_IMPORTED_MODULE_9__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _withDataProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./withDataProvider */ "./packages/data/src/withDataProvider.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withDataProvider", function() { return _withDataProvider__WEBPACK_IMPORTED_MODULE_10__["default"]; });

// import global types.












/***/ }),

/***/ "./packages/data/src/mutations/index.ts":
/*!**********************************************!*\
  !*** ./packages/data/src/mutations/index.ts ***!
  \**********************************************/
/*! exports provided: useMutationWithFeedback, MutationType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useMutationWithFeedback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMutationWithFeedback */ "./packages/data/src/mutations/useMutationWithFeedback.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useMutationWithFeedback", function() { return _useMutationWithFeedback__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/data/src/mutations/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MutationType", function() { return _types__WEBPACK_IMPORTED_MODULE_1__["MutationType"]; });




/***/ }),

/***/ "./packages/data/src/mutations/types.ts":
/*!**********************************************!*\
  !*** ./packages/data/src/mutations/types.ts ***!
  \**********************************************/
/*! exports provided: MutationType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MutationType", function() { return MutationType; });
let MutationType;

(function (MutationType) {
  MutationType["Create"] = "CREATE";
  MutationType["Update"] = "UPDATE";
  MutationType["Delete"] = "DELETE";
})(MutationType || (MutationType = {}));

/***/ }),

/***/ "./packages/data/src/mutations/useMutationWithFeedback.ts":
/*!****************************************************************!*\
  !*** ./packages/data/src/mutations/useMutationWithFeedback.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/index.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);




const useMutationWithFeedback = ({
  typeName,
  mutation,
  mutationType,
  toaster
}) => {
  // generate a toaster key that sustains re-renders
  const toasterKey = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(Object(uuid__WEBPACK_IMPORTED_MODULE_2__["v4"])());
  const key = toasterKey.current;
  /**
   * Get the toaster message based upon typeName and mutationType
   */

  const getToasterMessage = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])((suffix = 'ing') => {
    // For example "CREATE" will become "creating" or "created"
    const verb = mutationType.toLowerCase().replace(/e$/, suffix); // e.g. "updating datetime"

    return `${verb} ${typeName.toLowerCase()}`;
  }, [mutationType, typeName]);
  /**
   * Displays a success toaster on complete
   */

  const onCompleted = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    const successMessage = `successfully ${getToasterMessage('ed')}`;
    toaster.update({
      key,
      message: successMessage,
      type: 'success'
    });
  }, [getToasterMessage, key, toaster]);
  /**
   * Displays an error toaster on error
   */

  const onError = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    const errorMessage = `error ${getToasterMessage()}`;
    toaster.dismiss(key);
    toaster.error({
      message: errorMessage
    });
  }, [getToasterMessage, key, toaster]);
  /**
   * Displays a loading indicator when the mutation starts
   */

  const onMutationStart = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    const message = getToasterMessage();
    toaster.loading({
      autoClose: false,
      key,
      message
    });
  }, [getToasterMessage, key, toaster]);
  /**
   * Fire it all up
   */

  const [mutate] = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useMutation"])(mutation, {
    onCompleted,
    onError
  });
  /**
   * Just insert the loading indicator call into mutation function
   */

  const doMutation = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])((...args) => {
    onMutationStart();
    return mutate(...args);
  }, [mutate, onMutationStart]);
  return doMutation;
};

/* harmony default export */ __webpack_exports__["default"] = (useMutationWithFeedback);

/***/ }),

/***/ "./packages/data/src/queries/attendees/index.ts":
/*!******************************************************!*\
  !*** ./packages/data/src/queries/attendees/index.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useAttendeesQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useAttendeesQuery */ "./packages/data/src/queries/attendees/useAttendeesQuery.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAttendeesQuery", function() { return _useAttendeesQuery__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/data/src/queries/attendees/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if(["default","useAttendeesQuery"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./packages/data/src/queries/attendees/types.ts":
/*!******************************************************!*\
  !*** ./packages/data/src/queries/attendees/types.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/data/src/queries/attendees/useAttendeesQuery.ts":
/*!******************************************************************!*\
  !*** ./packages/data/src/queries/attendees/useAttendeesQuery.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "./packages/data/src/queries/index.ts");


const useAttendeesQuery = queryOptions => {
  return Object(___WEBPACK_IMPORTED_MODULE_0__["useCacheQuery"])(queryOptions);
};

/* harmony default export */ __webpack_exports__["default"] = (useAttendeesQuery);

/***/ }),

/***/ "./packages/data/src/queries/currentUser/index.ts":
/*!********************************************************!*\
  !*** ./packages/data/src/queries/currentUser/index.ts ***!
  \********************************************************/
/*! exports provided: GET_CURRENT_USER, useCurrentUserQueryOptions, useCurrentUser, useFetchCurrentUser, useUpdateCurrentUserCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queries */ "./packages/data/src/queries/currentUser/queries.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GET_CURRENT_USER", function() { return _queries__WEBPACK_IMPORTED_MODULE_0__["GET_CURRENT_USER"]; });

/* harmony import */ var _useCurrentUserQueryOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useCurrentUserQueryOptions */ "./packages/data/src/queries/currentUser/useCurrentUserQueryOptions.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCurrentUserQueryOptions", function() { return _useCurrentUserQueryOptions__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _useCurrentUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useCurrentUser */ "./packages/data/src/queries/currentUser/useCurrentUser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCurrentUser", function() { return _useCurrentUser__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _useFetchCurrentUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useFetchCurrentUser */ "./packages/data/src/queries/currentUser/useFetchCurrentUser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFetchCurrentUser", function() { return _useFetchCurrentUser__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _useUpdateCurrentUserCache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useUpdateCurrentUserCache */ "./packages/data/src/queries/currentUser/useUpdateCurrentUserCache.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useUpdateCurrentUserCache", function() { return _useUpdateCurrentUserCache__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./packages/data/src/queries/currentUser/queries.ts":
/*!**********************************************************!*\
  !*** ./packages/data/src/queries/currentUser/queries.ts ***!
  \**********************************************************/
/*! exports provided: GET_CURRENT_USER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_CURRENT_USER", function() { return GET_CURRENT_USER; });
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/lib/graphql-tag.umd.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);

const GET_CURRENT_USER = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
	query GET_CURRENT_USER {
		viewer {
			id
			databaseId
			description
			email
			firstName
			lastName
			locale
			name
			nicename
			nickname
			username
		}
	}
`;

/***/ }),

/***/ "./packages/data/src/queries/currentUser/useCurrentUser.ts":
/*!*****************************************************************!*\
  !*** ./packages/data/src/queries/currentUser/useCurrentUser.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useCurrentUserQueryOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useCurrentUserQueryOptions */ "./packages/data/src/queries/currentUser/useCurrentUserQueryOptions.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ */ "./packages/data/src/queries/index.ts");



/**
 * A custom react hook for retrieving CurrentUser
 */

const useCurrentUser = () => {
  const options = Object(_useCurrentUserQueryOptions__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const {
    data
  } = Object(___WEBPACK_IMPORTED_MODULE_2__["useCacheQuery"])(options);
  const dataStr = JSON.stringify(data === null || data === void 0 ? void 0 : data.viewer); // eslint-disable-next-line react-hooks/exhaustive-deps

  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => data === null || data === void 0 ? void 0 : data.viewer, [dataStr]);
};

/* harmony default export */ __webpack_exports__["default"] = (useCurrentUser);

/***/ }),

/***/ "./packages/data/src/queries/currentUser/useCurrentUserQueryOptions.ts":
/*!*****************************************************************************!*\
  !*** ./packages/data/src/queries/currentUser/useCurrentUserQueryOptions.ts ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queries */ "./packages/data/src/queries/currentUser/queries.ts");



const useCurrentUserQueryOptions = () => {
  const options = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    query: _queries__WEBPACK_IMPORTED_MODULE_1__["GET_CURRENT_USER"]
  }), []);
  return options;
};

/* harmony default export */ __webpack_exports__["default"] = (useCurrentUserQueryOptions);

/***/ }),

/***/ "./packages/data/src/queries/currentUser/useFetchCurrentUser.ts":
/*!**********************************************************************!*\
  !*** ./packages/data/src/queries/currentUser/useFetchCurrentUser.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/index.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./packages/data/src/queries/currentUser/index.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events */ "./packages/data/src/events.ts");





const useFetchCurrentUser = fetchOptions => {
  const options = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    // only display error, not loading or success
    onError: error => {
      _events__WEBPACK_IMPORTED_MODULE_3__["events"].emit('fetchUser.error', error);
    },
    ...fetchOptions
  }), [fetchOptions]);
  const result = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useQuery"])(___WEBPACK_IMPORTED_MODULE_2__["GET_CURRENT_USER"], options);
  return result;
};

/* harmony default export */ __webpack_exports__["default"] = (useFetchCurrentUser);

/***/ }),

/***/ "./packages/data/src/queries/currentUser/useUpdateCurrentUserCache.ts":
/*!****************************************************************************!*\
  !*** ./packages/data/src/queries/currentUser/useUpdateCurrentUserCache.ts ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useUpdateCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../useUpdateCache */ "./packages/data/src/queries/useUpdateCache.ts");


const useUpdateCurrentUserCache = (writeQueryOptions = undefined) => {
  return Object(_useUpdateCache__WEBPACK_IMPORTED_MODULE_0__["default"])(writeQueryOptions);
};

/* harmony default export */ __webpack_exports__["default"] = (useUpdateCurrentUserCache);

/***/ }),

/***/ "./packages/data/src/queries/datetimes/index.ts":
/*!******************************************************!*\
  !*** ./packages/data/src/queries/datetimes/index.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useDatetimesQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useDatetimesQuery */ "./packages/data/src/queries/datetimes/useDatetimesQuery.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDatetimesQuery", function() { return _useDatetimesQuery__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/data/src/queries/datetimes/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if(["default","useDatetimesQuery"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./packages/data/src/queries/datetimes/types.ts":
/*!******************************************************!*\
  !*** ./packages/data/src/queries/datetimes/types.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/data/src/queries/datetimes/useDatetimesQuery.ts":
/*!******************************************************************!*\
  !*** ./packages/data/src/queries/datetimes/useDatetimesQuery.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "./packages/data/src/queries/index.ts");


const useDatetimesQuery = queryOptions => {
  return Object(___WEBPACK_IMPORTED_MODULE_0__["useCacheQuery"])(queryOptions);
};

/* harmony default export */ __webpack_exports__["default"] = (useDatetimesQuery);

/***/ }),

/***/ "./packages/data/src/queries/events/index.ts":
/*!***************************************************!*\
  !*** ./packages/data/src/queries/events/index.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useEventsQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useEventsQuery */ "./packages/data/src/queries/events/useEventsQuery.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventsQuery", function() { return _useEventsQuery__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/data/src/queries/events/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if(["default","useEventsQuery"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./packages/data/src/queries/events/types.ts":
/*!***************************************************!*\
  !*** ./packages/data/src/queries/events/types.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/data/src/queries/events/useEventsQuery.ts":
/*!************************************************************!*\
  !*** ./packages/data/src/queries/events/useEventsQuery.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "./packages/data/src/queries/index.ts");


const useEventsQuery = queryOptions => {
  return Object(___WEBPACK_IMPORTED_MODULE_0__["useCacheQuery"])(queryOptions);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventsQuery);

/***/ }),

/***/ "./packages/data/src/queries/generalSettings/index.ts":
/*!************************************************************!*\
  !*** ./packages/data/src/queries/generalSettings/index.ts ***!
  \************************************************************/
/*! exports provided: GET_GENERAL_SETTINGS, useGeneralSettingsQueryOptions, useFetchGeneralSettings, useGeneralSettings, useUpdateGeneralSettingsCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queries */ "./packages/data/src/queries/generalSettings/queries.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GET_GENERAL_SETTINGS", function() { return _queries__WEBPACK_IMPORTED_MODULE_0__["GET_GENERAL_SETTINGS"]; });

/* harmony import */ var _useGeneralSettingsQueryOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useGeneralSettingsQueryOptions */ "./packages/data/src/queries/generalSettings/useGeneralSettingsQueryOptions.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGeneralSettingsQueryOptions", function() { return _useGeneralSettingsQueryOptions__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _useFetchGeneralSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useFetchGeneralSettings */ "./packages/data/src/queries/generalSettings/useFetchGeneralSettings.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFetchGeneralSettings", function() { return _useFetchGeneralSettings__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _useGeneralSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useGeneralSettings */ "./packages/data/src/queries/generalSettings/useGeneralSettings.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGeneralSettings", function() { return _useGeneralSettings__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _useUpdateGeneralSettingsCache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useUpdateGeneralSettingsCache */ "./packages/data/src/queries/generalSettings/useUpdateGeneralSettingsCache.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useUpdateGeneralSettingsCache", function() { return _useUpdateGeneralSettingsCache__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./packages/data/src/queries/generalSettings/queries.ts":
/*!**************************************************************!*\
  !*** ./packages/data/src/queries/generalSettings/queries.ts ***!
  \**************************************************************/
/*! exports provided: GET_GENERAL_SETTINGS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_GENERAL_SETTINGS", function() { return GET_GENERAL_SETTINGS; });
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/lib/graphql-tag.umd.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);

const GET_GENERAL_SETTINGS = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
	query GET_GENERAL_SETTINGS {
		generalSettings {
			dateFormat
			timeFormat
			timezone
		}
	}
`;

/***/ }),

/***/ "./packages/data/src/queries/generalSettings/useFetchGeneralSettings.ts":
/*!******************************************************************************!*\
  !*** ./packages/data/src/queries/generalSettings/useFetchGeneralSettings.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/index.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./packages/data/src/queries/generalSettings/index.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events */ "./packages/data/src/events.ts");





const useFetchGeneralSettings = fetchOptions => {
  const options = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    // only display error, not loading or success
    onError: error => {
      _events__WEBPACK_IMPORTED_MODULE_3__["events"].emit('fetchSettings.error', error);
    },
    ...fetchOptions
  }), [fetchOptions]);
  const result = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useQuery"])(___WEBPACK_IMPORTED_MODULE_2__["GET_GENERAL_SETTINGS"], options);
  return result;
};

/* harmony default export */ __webpack_exports__["default"] = (useFetchGeneralSettings);

/***/ }),

/***/ "./packages/data/src/queries/generalSettings/useGeneralSettings.ts":
/*!*************************************************************************!*\
  !*** ./packages/data/src/queries/generalSettings/useGeneralSettings.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useGeneralSettingsQueryOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useGeneralSettingsQueryOptions */ "./packages/data/src/queries/generalSettings/useGeneralSettingsQueryOptions.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ */ "./packages/data/src/queries/index.ts");



/**
 * A custom react hook for retrieving GeneralSettings
 */

const useGeneralSettings = () => {
  const options = Object(_useGeneralSettingsQueryOptions__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const {
    data
  } = Object(___WEBPACK_IMPORTED_MODULE_2__["useCacheQuery"])(options);
  const dataStr = JSON.stringify(data === null || data === void 0 ? void 0 : data.generalSettings); // eslint-disable-next-line react-hooks/exhaustive-deps

  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => data === null || data === void 0 ? void 0 : data.generalSettings, [dataStr]);
};

/* harmony default export */ __webpack_exports__["default"] = (useGeneralSettings);

/***/ }),

/***/ "./packages/data/src/queries/generalSettings/useGeneralSettingsQueryOptions.ts":
/*!*************************************************************************************!*\
  !*** ./packages/data/src/queries/generalSettings/useGeneralSettingsQueryOptions.ts ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queries */ "./packages/data/src/queries/generalSettings/queries.ts");



const useGeneralSettingsQueryOptions = () => {
  const options = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    query: _queries__WEBPACK_IMPORTED_MODULE_1__["GET_GENERAL_SETTINGS"]
  }), []);
  return options;
};

/* harmony default export */ __webpack_exports__["default"] = (useGeneralSettingsQueryOptions);

/***/ }),

/***/ "./packages/data/src/queries/generalSettings/useUpdateGeneralSettingsCache.ts":
/*!************************************************************************************!*\
  !*** ./packages/data/src/queries/generalSettings/useUpdateGeneralSettingsCache.ts ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useUpdateCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../useUpdateCache */ "./packages/data/src/queries/useUpdateCache.ts");


const useUpdateGeneralSettingsCache = (writeQueryOptions = undefined) => {
  return Object(_useUpdateCache__WEBPACK_IMPORTED_MODULE_0__["default"])(writeQueryOptions);
};

/* harmony default export */ __webpack_exports__["default"] = (useUpdateGeneralSettingsCache);

/***/ }),

/***/ "./packages/data/src/queries/index.ts":
/*!********************************************!*\
  !*** ./packages/data/src/queries/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useCacheQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useCacheQuery */ "./packages/data/src/queries/useCacheQuery.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCacheQuery", function() { return _useCacheQuery__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _useUpdateCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useUpdateCache */ "./packages/data/src/queries/useUpdateCache.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useUpdateCache", function() { return _useUpdateCache__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _attendees__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attendees */ "./packages/data/src/queries/attendees/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _attendees__WEBPACK_IMPORTED_MODULE_2__) if(["default","useCacheQuery","useUpdateCache"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _attendees__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _currentUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentUser */ "./packages/data/src/queries/currentUser/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GET_CURRENT_USER", function() { return _currentUser__WEBPACK_IMPORTED_MODULE_3__["GET_CURRENT_USER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCurrentUserQueryOptions", function() { return _currentUser__WEBPACK_IMPORTED_MODULE_3__["useCurrentUserQueryOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCurrentUser", function() { return _currentUser__WEBPACK_IMPORTED_MODULE_3__["useCurrentUser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFetchCurrentUser", function() { return _currentUser__WEBPACK_IMPORTED_MODULE_3__["useFetchCurrentUser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useUpdateCurrentUserCache", function() { return _currentUser__WEBPACK_IMPORTED_MODULE_3__["useUpdateCurrentUserCache"]; });

/* harmony import */ var _datetimes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datetimes */ "./packages/data/src/queries/datetimes/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _datetimes__WEBPACK_IMPORTED_MODULE_4__) if(["default","useCacheQuery","useUpdateCache","GET_CURRENT_USER","useCurrentUserQueryOptions","useCurrentUser","useFetchCurrentUser","useUpdateCurrentUserCache"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _datetimes__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events */ "./packages/data/src/queries/events/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _events__WEBPACK_IMPORTED_MODULE_5__) if(["default","useCacheQuery","useUpdateCache","GET_CURRENT_USER","useCurrentUserQueryOptions","useCurrentUser","useFetchCurrentUser","useUpdateCurrentUserCache"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _events__WEBPACK_IMPORTED_MODULE_5__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _generalSettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./generalSettings */ "./packages/data/src/queries/generalSettings/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GET_GENERAL_SETTINGS", function() { return _generalSettings__WEBPACK_IMPORTED_MODULE_6__["GET_GENERAL_SETTINGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGeneralSettingsQueryOptions", function() { return _generalSettings__WEBPACK_IMPORTED_MODULE_6__["useGeneralSettingsQueryOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFetchGeneralSettings", function() { return _generalSettings__WEBPACK_IMPORTED_MODULE_6__["useFetchGeneralSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGeneralSettings", function() { return _generalSettings__WEBPACK_IMPORTED_MODULE_6__["useGeneralSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useUpdateGeneralSettingsCache", function() { return _generalSettings__WEBPACK_IMPORTED_MODULE_6__["useUpdateGeneralSettingsCache"]; });

/* harmony import */ var _recurrences__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recurrences */ "./packages/data/src/queries/recurrences/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _recurrences__WEBPACK_IMPORTED_MODULE_7__) if(["default","useCacheQuery","useUpdateCache","GET_CURRENT_USER","useCurrentUserQueryOptions","useCurrentUser","useFetchCurrentUser","useUpdateCurrentUserCache","GET_GENERAL_SETTINGS","useGeneralSettingsQueryOptions","useFetchGeneralSettings","useGeneralSettings","useUpdateGeneralSettingsCache"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _recurrences__WEBPACK_IMPORTED_MODULE_7__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _registrations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./registrations */ "./packages/data/src/queries/registrations/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _registrations__WEBPACK_IMPORTED_MODULE_8__) if(["default","useCacheQuery","useUpdateCache","GET_CURRENT_USER","useCurrentUserQueryOptions","useCurrentUser","useFetchCurrentUser","useUpdateCurrentUserCache","GET_GENERAL_SETTINGS","useGeneralSettingsQueryOptions","useFetchGeneralSettings","useGeneralSettings","useUpdateGeneralSettingsCache"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _registrations__WEBPACK_IMPORTED_MODULE_8__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _tickets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tickets */ "./packages/data/src/queries/tickets/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tickets__WEBPACK_IMPORTED_MODULE_9__) if(["default","useCacheQuery","useUpdateCache","GET_CURRENT_USER","useCurrentUserQueryOptions","useCurrentUser","useFetchCurrentUser","useUpdateCurrentUserCache","GET_GENERAL_SETTINGS","useGeneralSettingsQueryOptions","useFetchGeneralSettings","useGeneralSettings","useUpdateGeneralSettingsCache"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tickets__WEBPACK_IMPORTED_MODULE_9__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "./packages/data/src/queries/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_10__) if(["default","useCacheQuery","useUpdateCache","GET_CURRENT_USER","useCurrentUserQueryOptions","useCurrentUser","useFetchCurrentUser","useUpdateCurrentUserCache","GET_GENERAL_SETTINGS","useGeneralSettingsQueryOptions","useFetchGeneralSettings","useGeneralSettings","useUpdateGeneralSettingsCache"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_10__[key]; }) }(__WEBPACK_IMPORT_KEY__));












/***/ }),

/***/ "./packages/data/src/queries/recurrences/index.ts":
/*!********************************************************!*\
  !*** ./packages/data/src/queries/recurrences/index.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useRecurrencesQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useRecurrencesQuery */ "./packages/data/src/queries/recurrences/useRecurrencesQuery.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRecurrencesQuery", function() { return _useRecurrencesQuery__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/data/src/queries/recurrences/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if(["default","useRecurrencesQuery"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./packages/data/src/queries/recurrences/types.ts":
/*!********************************************************!*\
  !*** ./packages/data/src/queries/recurrences/types.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/data/src/queries/recurrences/useRecurrencesQuery.ts":
/*!**********************************************************************!*\
  !*** ./packages/data/src/queries/recurrences/useRecurrencesQuery.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "./packages/data/src/queries/index.ts");


const useRecurrencesQuery = queryOptions => {
  return Object(___WEBPACK_IMPORTED_MODULE_0__["useCacheQuery"])(queryOptions);
};

/* harmony default export */ __webpack_exports__["default"] = (useRecurrencesQuery);

/***/ }),

/***/ "./packages/data/src/queries/registrations/index.ts":
/*!**********************************************************!*\
  !*** ./packages/data/src/queries/registrations/index.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./packages/data/src/queries/registrations/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./packages/data/src/queries/registrations/types.ts":
/*!**********************************************************!*\
  !*** ./packages/data/src/queries/registrations/types.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/data/src/queries/tickets/index.ts":
/*!****************************************************!*\
  !*** ./packages/data/src/queries/tickets/index.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _useTicketsQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useTicketsQuery */ "./packages/data/src/queries/tickets/useTicketsQuery.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketsQuery", function() { return _useTicketsQuery__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/data/src/queries/tickets/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if(["default","useTicketsQuery"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./packages/data/src/queries/tickets/types.ts":
/*!****************************************************!*\
  !*** ./packages/data/src/queries/tickets/types.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/data/src/queries/tickets/useTicketsQuery.ts":
/*!**************************************************************!*\
  !*** ./packages/data/src/queries/tickets/useTicketsQuery.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "./packages/data/src/queries/index.ts");


const useTicketsQuery = queryOptions => {
  return Object(___WEBPACK_IMPORTED_MODULE_0__["useCacheQuery"])(queryOptions);
};

/* harmony default export */ __webpack_exports__["default"] = (useTicketsQuery);

/***/ }),

/***/ "./packages/data/src/queries/types.ts":
/*!********************************************!*\
  !*** ./packages/data/src/queries/types.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/data/src/queries/useCacheQuery.ts":
/*!****************************************************!*\
  !*** ./packages/data/src/queries/useCacheQuery.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/index.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);



const useCacheQuery = queryOptions => {
  const options = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    fetchPolicy: 'cache-only',
    ...queryOptions
  }), [queryOptions]);
  return Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useQuery"])(options.query, options);
};

/* harmony default export */ __webpack_exports__["default"] = (useCacheQuery);

/***/ }),

/***/ "./packages/data/src/queries/useUpdateCache.ts":
/*!*****************************************************!*\
  !*** ./packages/data/src/queries/useUpdateCache.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/index.js");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);



const useUpdateCache = writeQueryOptions => {
  const client = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useApolloClient"])();
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(writeOptions => {
    client.writeQuery({ ...writeQueryOptions,
      ...writeOptions
    });
  }, [client, writeQueryOptions]);
};

/* harmony default export */ __webpack_exports__["default"] = (useUpdateCache);

/***/ }),

/***/ "./packages/data/src/types.ts":
/*!************************************!*\
  !*** ./packages/data/src/types.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/data/src/withDataProvider.tsx":
/*!************************************************!*\
  !*** ./packages/data/src/withDataProvider.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DataProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataProvider */ "./packages/data/src/DataProvider.tsx");



const withDataProvider = Component => {
  const WrappedComponent = props => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataProvider__WEBPACK_IMPORTED_MODULE_1__["DataProvider"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, props));
  };

  return WrappedComponent;
};

/* harmony default export */ __webpack_exports__["default"] = (withDataProvider);

/***/ }),

/***/ "./types/global.ts":
/*!*************************!*\
  !*** ./types/global.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./types/index.ts":
/*!************************!*\
  !*** ./types/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./types/global.ts");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _global__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _global__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 3:
/*!******************************************!*\
  !*** multi ./packages/data/src/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/a/www/dev.test/wp-content/plugins/barista/packages/data/src/index.ts */"./packages/data/src/index.ts");


/***/ }),

/***/ "@eventespresso/events":
/*!****************************************************!*\
  !*** external {"this":["eventespresso","events"]} ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eventespresso"]["events"]; }());

/***/ }),

/***/ "react":
/*!*********************************!*\
  !*** external {"this":"React"} ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data.bundle.js.map