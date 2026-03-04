(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/3ch/app/node_modules/@capacitor/toast/dist/esm/web.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastWeb",
    ()=>ToastWeb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/@capacitor/core/dist/index.js [app-client] (ecmascript)");
;
class ToastWeb extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebPlugin"] {
    async show(options) {
        if (typeof document !== 'undefined') {
            let duration = 2000;
            if (options.duration) {
                duration = options.duration === 'long' ? 3500 : 2000;
            }
            const toast = document.createElement('pwa-toast');
            toast.duration = duration;
            toast.message = options.text;
            document.body.appendChild(toast);
        }
    }
} //# sourceMappingURL=web.js.map
}),
]);

//# sourceMappingURL=3c405_%40capacitor_toast_dist_esm_web_fffe2602.js.map