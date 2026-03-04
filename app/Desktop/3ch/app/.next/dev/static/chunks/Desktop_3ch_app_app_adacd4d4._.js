(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/3ch/app/app/components/PostCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$context$2f$MediaContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/app/context/MediaContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const getMediaUrl = (path)=>`https://2ch.life${path}`;
const getThumbnailUrl = (file)=>`https://2ch.life${file.thumbnail}`;
// Component for video thumbnail that opens fullscreen player
const VideoThumbnail = (t0)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "22f2973fd9298da1ffbcd6870f2808475cdbbedd883f59922283da03ec3f47d8") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "22f2973fd9298da1ffbcd6870f2808475cdbbedd883f59922283da03ec3f47d8";
    }
    const { file, className } = t0;
    const { openFullscreen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$context$2f$MediaContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMedia"])();
    const t1 = `relative cursor-pointer group w-full h-full overflow-hidden bg-gray-900 ${className}`;
    let t2;
    if ($[1] !== file || $[2] !== openFullscreen) {
        t2 = (e)=>{
            e.stopPropagation();
            openFullscreen({
                type: "video",
                src: getMediaUrl(file.path),
                currentTime: 0,
                poster: getThumbnailUrl(file)
            });
        };
        $[1] = file;
        $[2] = openFullscreen;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== file) {
        t3 = getThumbnailUrl(file);
        $[4] = file;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== file.path) {
        t4 = (e_0)=>{
            e_0.currentTarget.src = getMediaUrl(file.path);
        };
        $[6] = file.path;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== file.displayname || $[9] !== t3 || $[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: t3,
            alt: file.displayname,
            className: "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300",
            loading: "lazy",
            onError: t4
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[8] = file.displayname;
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-black/40 backdrop-blur-sm p-4 rounded-full border border-white/10 shadow-xl group-hover:scale-110 group-hover:bg-cyan-500/80 transition-all duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                    size: 32,
                    fill: "white",
                    className: "text-white ml-1"
                }, void 0, false, {
                    fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                    lineNumber: 81,
                    columnNumber: 250
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                lineNumber: 81,
                columnNumber: 77
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== file.duration) {
        t7 = file.duration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-white font-medium font-mono backdrop-blur-sm",
            children: file.duration
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 88,
            columnNumber: 27
        }, ("TURBOPACK compile-time value", void 0));
        $[13] = file.duration;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== file.path) {
        t8 = file.path.split(".").pop();
        $[15] = file.path;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white/80 uppercase font-bold backdrop-blur-sm",
            children: t8
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 104,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[17] = t8;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== t1 || $[20] !== t2 || $[21] !== t5 || $[22] !== t7 || $[23] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            onClick: t2,
            children: [
                t5,
                t6,
                t7,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 112,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[19] = t1;
        $[20] = t2;
        $[21] = t5;
        $[22] = t7;
        $[23] = t9;
        $[24] = t10;
    } else {
        t10 = $[24];
    }
    return t10;
};
_s(VideoThumbnail, "eSbWLt+kdVMj109o8Cp+0e8KxTc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$context$2f$MediaContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMedia"]
    ];
});
_c = VideoThumbnail;
function PostCard(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(44);
    if ($[0] !== "22f2973fd9298da1ffbcd6870f2808475cdbbedd883f59922283da03ec3f47d8") {
        for(let $i = 0; $i < 44; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "22f2973fd9298da1ffbcd6870f2808475cdbbedd883f59922283da03ec3f47d8";
    }
    const { thread, onMediaClick, hideFooter: t1 } = t0;
    const hideFooter = t1 === undefined ? false : t1;
    let t2;
    if ($[1] !== thread.files) {
        t2 = thread.files || [];
        $[1] = thread.files;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const files = t2;
    const { openFullscreen, activeLayoutId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$context$2f$MediaContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMedia"])();
    const formatDate = _PostCardFormatDate;
    const isVideo = _PostCardIsVideo;
    const getGridClass = _PostCardGetGridClass;
    let t3;
    if ($[3] !== onMediaClick || $[4] !== openFullscreen || $[5] !== thread.num) {
        t3 = ({
            "PostCard[handleImageClick]": (file_0)=>{
                openFullscreen({
                    type: "image",
                    src: getMediaUrl(file_0.path),
                    alt: file_0.displayname,
                    layoutId: `media-${thread.num}-${file_0.path}`
                });
                if (onMediaClick) {
                    onMediaClick(file_0);
                }
            }
        })["PostCard[handleImageClick]"];
        $[3] = onMediaClick;
        $[4] = openFullscreen;
        $[5] = thread.num;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const handleImageClick = t3;
    let t4;
    let t5;
    let t6;
    let t7;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            opacity: 0,
            y: 20
        };
        t5 = {
            opacity: 1,
            y: 0
        };
        t6 = {
            once: true,
            margin: "-50px"
        };
        t7 = {
            duration: 0.5
        };
        $[7] = t4;
        $[8] = t5;
        $[9] = t6;
        $[10] = t7;
    } else {
        t4 = $[7];
        t5 = $[8];
        t6 = $[9];
        t7 = $[10];
    }
    let t8;
    if ($[11] !== thread.num) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-medium text-gray-400",
            children: [
                "#",
                thread.num
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 209,
            columnNumber: 10
        }, this);
        $[11] = thread.num;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "•"
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 217,
            columnNumber: 10
        }, this);
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== thread.timestamp) {
        t10 = formatDate(thread.timestamp);
        $[14] = thread.timestamp;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t10
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 232,
            columnNumber: 11
        }, this);
        $[16] = t10;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== t11 || $[19] !== t8) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-3 flex justify-between items-center text-gray-500 text-xs",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    t8,
                    t9,
                    t11
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                lineNumber: 240,
                columnNumber: 94
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 240,
            columnNumber: 11
        }, this);
        $[18] = t11;
        $[19] = t8;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    let t13;
    if ($[21] !== activeLayoutId || $[22] !== files || $[23] !== handleImageClick || $[24] !== thread.num) {
        t13 = files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `mb-4 grid gap-1 ${getGridClass(files.length)}`,
            children: files.map({
                "PostCard[files.map()]": (file_1, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `relative w-full ${files.length === 3 && idx === 0 ? "col-span-2" : ""}`,
                        children: isVideo(file_1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-full ${files.length > 1 ? "aspect-square" : "aspect-video max-h-[600px]"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoThumbnail, {
                                file: file_1,
                                className: "w-full h-full"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                                lineNumber: 250,
                                columnNumber: 265
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                            lineNumber: 250,
                            columnNumber: 170
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                            layoutId: `media-${thread.num}-${file_1.path}`,
                            src: getMediaUrl(file_1.path),
                            alt: file_1.displayname,
                            className: `w-full h-full bg-gray-900 cursor-zoom-in ${files.length > 1 ? "object-cover aspect-square" : "object-contain max-h-[600px]"}`,
                            onClick: {
                                "PostCard[files.map() > <motion.img>.onClick]": ()=>handleImageClick(file_1)
                            }["PostCard[files.map() > <motion.img>.onClick]"],
                            loading: "lazy",
                            style: {
                                opacity: activeLayoutId === `media-${thread.num}-${file_1.path}` ? 0 : 1
                            },
                            onError: {
                                "PostCard[files.map() > <motion.img>.onError]": (e)=>{
                                    e.currentTarget.src = getThumbnailUrl(file_1);
                                }
                            }["PostCard[files.map() > <motion.img>.onError]"]
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                            lineNumber: 250,
                            columnNumber: 332
                        }, this)
                    }, idx, false, {
                        fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                        lineNumber: 250,
                        columnNumber: 51
                    }, this)
            }["PostCard[files.map()]"])
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 249,
            columnNumber: 31
        }, this);
        $[21] = activeLayoutId;
        $[22] = files;
        $[23] = handleImageClick;
        $[24] = thread.num;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== thread.subject) {
        t14 = thread.subject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-bold text-white text-lg mb-2 leading-tight",
            children: thread.subject
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 270,
            columnNumber: 29
        }, this);
        $[26] = thread.subject;
        $[27] = t14;
    } else {
        t14 = $[27];
    }
    let t15;
    if ($[28] !== thread.comment) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-gray-300 text-sm leading-relaxed break-words whitespace-pre-wrap [&>a]:text-blue-400 [&>span.spoiler]:bg-gray-800 [&>span.spoiler]:text-transparent [&>span.spoiler:hover]:text-white transition-colors",
            dangerouslySetInnerHTML: {
                __html: thread.comment
            }
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 278,
            columnNumber: 11
        }, this);
        $[28] = thread.comment;
        $[29] = t15;
    } else {
        t15 = $[29];
    }
    let t16;
    if ($[30] !== t14 || $[31] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4",
            children: [
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 288,
            columnNumber: 11
        }, this);
        $[30] = t14;
        $[31] = t15;
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    let t17;
    if ($[33] !== files[0] || $[34] !== files.length || $[35] !== hideFooter || $[36] !== thread.num || $[37] !== thread.posts_count) {
        t17 = !hideFooter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4 px-4 flex justify-between items-center text-gray-500 text-xs",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/thread?id=${thread.num}`,
                        className: "flex items-center gap-1.5 hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-gray-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                                lineNumber: 297,
                                columnNumber: 291
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    thread.posts_count,
                                    " Комментариев"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                                lineNumber: 297,
                                columnNumber: 318
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                        lineNumber: 297,
                        columnNumber: 137
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                    lineNumber: 297,
                    columnNumber: 109
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4",
                    children: files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: getMediaUrl(files[0].path),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-1.5 hover:text-white transition-colors",
                        title: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u0435 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                            lineNumber: 297,
                            columnNumber: 717
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                        lineNumber: 297,
                        columnNumber: 426
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
                    lineNumber: 297,
                    columnNumber: 377
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 297,
            columnNumber: 26
        }, this);
        $[33] = files[0];
        $[34] = files.length;
        $[35] = hideFooter;
        $[36] = thread.num;
        $[37] = thread.posts_count;
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    let t18;
    if ($[39] !== t12 || $[40] !== t13 || $[41] !== t16 || $[42] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t4,
            whileInView: t5,
            viewport: t6,
            transition: t7,
            className: "bg-black border-b border-gray-800 pb-6 mb-2",
            children: [
                t12,
                t13,
                t16,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/PostCard.tsx",
            lineNumber: 309,
            columnNumber: 11
        }, this);
        $[39] = t12;
        $[40] = t13;
        $[41] = t16;
        $[42] = t17;
        $[43] = t18;
    } else {
        t18 = $[43];
    }
    return t18;
}
_s1(PostCard, "RK5/hGX5Guq0xzM5n8w1DmFXwEM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$context$2f$MediaContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMedia"]
    ];
});
_c1 = PostCard;
function _PostCardGetGridClass(count) {
    if (count === 1) {
        return "grid-cols-1";
    }
    if (count >= 2) {
        return "grid-cols-2";
    }
    return "grid-cols-1";
}
function _PostCardIsVideo(file) {
    const ext = file.path.split(".").pop()?.toLowerCase();
    return ext === "webm" || ext === "mp4";
}
function _PostCardFormatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleString("ru-RU", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
}
var _c, _c1;
__turbopack_context__.k.register(_c, "VideoThumbnail");
__turbopack_context__.k.register(_c1, "PostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3ch/app/app/components/CatalogCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CatalogCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function CatalogCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(32);
    if ($[0] !== "9ae8bb1158114f49939a2e94e78fd58cc272d91bf3126f5c1111304a274b5928") {
        for(let $i = 0; $i < 32; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9ae8bb1158114f49939a2e94e78fd58cc272d91bf3126f5c1111304a274b5928";
    }
    const { thread } = t0;
    const file = thread.files && thread.files.length > 0 ? thread.files[0] : null;
    const getMediaUrl = _CatalogCardGetMediaUrl;
    const simpleStrip = _CatalogCardSimpleStrip;
    const t1 = `/thread?id=${thread.num}`;
    let t2;
    let t3;
    let t4;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            opacity: 0,
            scale: 0.95
        };
        t3 = {
            opacity: 1,
            scale: 1
        };
        t4 = {
            once: true
        };
        $[1] = t2;
        $[2] = t3;
        $[3] = t4;
    } else {
        t2 = $[1];
        t3 = $[2];
        t4 = $[3];
    }
    let t5;
    if ($[4] !== file) {
        t5 = file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: getMediaUrl(file.thumbnail),
            alt: "thumbnail",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
            loading: "lazy"
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 51,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex items-center justify-center text-gray-700",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs",
                children: "No Image"
            }, void 0, false, {
                fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
                lineNumber: 51,
                columnNumber: 265
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 51,
            columnNumber: 187
        }, this);
        $[4] = file;
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
            size: 12
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 59,
            columnNumber: 10
        }, this);
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== thread.posts_count) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: thread.posts_count
                }, void 0, false, {
                    fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
                    lineNumber: 66,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[7] = thread.posts_count;
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] !== thread.files) {
        t8 = thread.files && thread.files.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "bg-orange-500/80 px-1 rounded text-[10px] font-bold",
            children: [
                "+",
                thread.files.length - 1
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 74,
            columnNumber: 53
        }, this);
        $[9] = thread.files;
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    let t9;
    if ($[11] !== t7 || $[12] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex justify-between items-end text-xs text-white/90",
            children: [
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[11] = t7;
        $[12] = t8;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== t5 || $[15] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "aspect-video bg-black relative overflow-hidden",
            children: [
                t5,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 91,
            columnNumber: 11
        }, this);
        $[14] = t5;
        $[15] = t9;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== thread.subject) {
        t11 = thread.subject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-bold text-xs text-white line-clamp-2 leading-tight",
            children: thread.subject
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 100,
            columnNumber: 29
        }, this);
        $[17] = thread.subject;
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] !== thread.comment) {
        t12 = simpleStrip(thread.comment);
        $[19] = thread.comment;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    let t13;
    if ($[21] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[11px] text-gray-400 line-clamp-4 leading-snug break-words",
            children: t12
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 116,
            columnNumber: 11
        }, this);
        $[21] = t12;
        $[22] = t13;
    } else {
        t13 = $[22];
    }
    let t14;
    if ($[23] !== t11 || $[24] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-2 flex flex-col flex-1 gap-1",
            children: [
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[23] = t11;
        $[24] = t13;
        $[25] = t14;
    } else {
        t14 = $[25];
    }
    let t15;
    if ($[26] !== t10 || $[27] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t2,
            whileInView: t3,
            viewport: t4,
            className: "bg-gray-900 rounded-lg overflow-hidden hover:ring-1 hover:ring-orange-500 transition-all h-full flex flex-col relative group",
            children: [
                t10,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this);
        $[26] = t10;
        $[27] = t14;
        $[28] = t15;
    } else {
        t15 = $[28];
    }
    let t16;
    if ($[29] !== t1 || $[30] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t1,
            className: "block h-full",
            children: t15
        }, void 0, false, {
            fileName: "[project]/Desktop/3ch/app/app/components/CatalogCard.tsx",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[29] = t1;
        $[30] = t15;
        $[31] = t16;
    } else {
        t16 = $[31];
    }
    return t16;
}
_c = CatalogCard;
function _CatalogCardSimpleStrip(html_0) {
    return html_0.replace(/<[^>]*>?/gm, "");
}
function _CatalogCardGetMediaUrl(path) {
    return `https://2ch.org${path}`;
}
var _c;
__turbopack_context__.k.register(_c, "CatalogCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3ch/app/app/services/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getThread",
    ()=>getThread,
    "getThreads",
    ()=>getThreads
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/@capacitor/core/dist/index.js [app-client] (ecmascript)");
;
const BASE_DOMAINS = [
    'https://2ch.life',
    'https://2ch.hk',
    'https://2ch.org'
];
// Expanded proxy list - Reordered for reliability
const CORS_PROXIES = [
    // CodeTabs - usually works well without config
    {
        url: 'https://api.codetabs.com/v1/proxy?quest=',
        type: 'direct'
    },
    // CORS Proxy IO
    {
        url: 'https://corsproxy.io/?',
        type: 'direct'
    },
    // AllOrigins (JSON wrapper)
    {
        url: 'https://api.allorigins.win/get?url=',
        type: 'json_wrapper'
    },
    // ThingProxy
    {
        url: 'https://thingproxy.freeboard.io/fetch/',
        type: 'direct'
    }
];
// Timeout helper - reduced to fail faster
const fetchWithTimeout = async (promise, timeoutMs = 8000)=>{
    let timeoutHandle;
    const timeoutPromise = new Promise((_, reject)=>{
        timeoutHandle = setTimeout(()=>reject(new Error('Request timed out')), timeoutMs);
    });
    return Promise.race([
        promise.then((res)=>{
            clearTimeout(timeoutHandle);
            return res;
        }),
        timeoutPromise
    ]);
};
// Check if response looks like HTML (Cloudflare Captcha or Block page)
const isHtmlResponse = (data)=>{
    if (typeof data === 'string') {
        const trimmed = data.trim().toLowerCase();
        return trimmed.startsWith('<!doctype html') || trimmed.startsWith('<html');
    }
    return false;
};
async function fetchWithFallback(path) {
    const errors = [];
    // 1. Try direct/native request first ONLY if on Native Platform (Android/iOS)
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform()) {
        for (const domain of BASE_DOMAINS){
            const url = `${domain}${path}`;
            try {
                console.log(`Trying CapacitorHttp (Native): ${url}`);
                const response = await fetchWithTimeout(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapacitorHttp"].get({
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        // Use a real Android User-Agent to look less suspicious
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
                        'Cache-Control': 'no-cache'
                    },
                    connectTimeout: 5000,
                    readTimeout: 5000
                }), 8000);
                if (response.status === 200) {
                    // CRITICAL: Check if we got HTML (Cloudflare Captcha) instead of JSON
                    if (isHtmlResponse(response.data)) {
                        console.warn(`Cloudflare Captcha detected from ${url} (got HTML instead of JSON)`);
                        errors.push(`${url} - Cloudflare Captcha`);
                        continue; // Try next domain or fall through to proxies
                    }
                    console.log(`Success CapacitorHttp: ${url}`);
                    return response.data;
                } else {
                    console.warn(`CapacitorHttp status ${response.status} for ${url}`);
                    errors.push(`${url} - Status ${response.status}`);
                }
            } catch (error) {
                console.warn(`Capacitor fetch failed from ${domain}:`, error);
                errors.push(`${url} - ${error.message}`);
            }
        }
    }
    // 2. Fallback: Use Proxies (for Web or if Native failed)
    console.log('Falling back to Proxies...');
    for (const proxy of CORS_PROXIES){
        for (const domain of BASE_DOMAINS){
            const targetUrl = encodeURIComponent(`${domain}${path}`);
            let proxyUrl = '';
            // Construct Proxy URL
            if (proxy.url.includes('corsproxy.io')) {
                proxyUrl = `${proxy.url}${targetUrl}`;
            } else {
                proxyUrl = `${proxy.url}${targetUrl}`;
            }
            // Add cache busting for allorigins
            if (proxy.url.includes('allorigins')) {
                proxyUrl += `&t=${Date.now()}`;
            }
            try {
                console.log(`Trying Proxy: ${proxyUrl}`);
                const response = await fetchWithTimeout(fetch(proxyUrl, {
                    method: 'GET'
                }), 8000);
                if (response.ok) {
                    const text = await response.text();
                    // Check for HTML/Cloudflare from proxy
                    if (isHtmlResponse(text)) {
                        console.warn(`Proxy ${proxyUrl} returned HTML (likely Cloudflare)`);
                        errors.push(`${proxy.url} - Cloudflare HTML`);
                        continue;
                    }
                    try {
                        const json = JSON.parse(text);
                        let resultData = json;
                        // Handle JSON Wrappers (like AllOrigins /get)
                        if (proxy.type === 'json_wrapper') {
                            if (json.contents) {
                                // Sometimes contents is a string that needs parsing again
                                if (typeof json.contents === 'string') {
                                    try {
                                        // Check inner content for HTML too
                                        if (isHtmlResponse(json.contents)) {
                                            throw new Error('Inner content is HTML');
                                        }
                                        resultData = JSON.parse(json.contents);
                                    } catch (e) {
                                        console.warn('Failed to parse inner contents JSON', e);
                                        throw new Error('Invalid inner JSON');
                                    }
                                } else {
                                    resultData = json.contents;
                                }
                            } else {
                                throw new Error('Missing contents in wrapper');
                            }
                        }
                        console.log(`Success Proxy: ${proxyUrl}`);
                        return resultData;
                    } catch (e) {
                        console.warn(`Failed to parse JSON from ${proxyUrl}:`, text.substring(0, 100));
                        errors.push(`${proxy.url} - JSON Parse Error`);
                    }
                } else {
                    console.warn(`Proxy ${proxyUrl} returned ${response.status}`);
                    errors.push(`${proxy.url} - Status ${response.status}`);
                }
            } catch (e) {
                console.warn(`Proxy fetch failed for ${domain} via ${proxy.url}:`, e);
                errors.push(`${proxy.url} - ${e.message}`);
            }
        }
    }
    console.error('All proxies failed:', errors);
    throw new Error(`Failed to fetch from all mirrors and proxies. Errors: ${errors.join('; ')}`);
}
async function getThreads() {
    try {
        const data = await fetchWithFallback('/b/catalog.json');
        // Parse data if it's a string (sometimes proxies or Capacitor return string)
        let parsedData = data;
        if (typeof data === 'string') {
            try {
                parsedData = JSON.parse(data);
            } catch (e) {
                console.error('Failed to parse JSON response', e);
                return [];
            }
        }
        if (parsedData && parsedData.threads && Array.isArray(parsedData.threads)) {
            return parsedData.threads.map((t)=>{
                // Handle catalog.json vs index.json differences
                if (t.posts && Array.isArray(t.posts) && t.posts.length > 0) {
                    const opPost = t.posts[0];
                    return {
                        ...opPost,
                        posts_count: t.posts_count || opPost.posts_count,
                        views: t.views || opPost.views || 0,
                        files_count: t.files_count
                    };
                } else {
                    // Flat structure
                    return {
                        ...t,
                        posts_count: t.posts_count || 0,
                        views: t.views || 0,
                        files: t.files || [],
                        timestamp: t.timestamp || 0
                    };
                }
            }).filter((t)=>t && t.num);
        }
        return [];
    } catch (error) {
        console.error('Error fetching threads:', error);
        // Re-throw to show in UI
        throw error;
    }
}
async function getThread(id) {
    try {
        const data = await fetchWithFallback(`/b/res/${id}.json`);
        // Parse data if it's a string
        let parsedData = data;
        if (typeof data === 'string') {
            try {
                parsedData = JSON.parse(data);
            } catch (e) {
                console.error('Failed to parse JSON response', e);
                return null;
            }
        }
        let postsArray = [];
        // Normalize response
        if (parsedData.threads && Array.isArray(parsedData.threads) && parsedData.threads.length > 0) {
            postsArray = parsedData.threads[0].posts;
        } else if (parsedData.posts && Array.isArray(parsedData.posts)) {
            postsArray = parsedData.posts;
        } else if (Array.isArray(parsedData)) {
            postsArray = parsedData;
        }
        if (postsArray.length > 0) {
            const opPost = postsArray[0];
            const thread = {
                num: opPost.num,
                comment: opPost.comment,
                subject: opPost.subject,
                timestamp: opPost.timestamp,
                files: opPost.files,
                posts_count: postsArray.length,
                views: opPost.views || 0
            };
            return {
                thread,
                posts: postsArray
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching thread ${id}:`, error);
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/3ch/app/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/app/components/PostCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$components$2f$CatalogCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/app/components/CatalogCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/app/services/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/Desktop/3ch/app/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Home() {
    _s();
    const [threads, setThreads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [visibleThreads, setVisibleThreads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('feed');
    const observerTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fetchThreads = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThreads"])();
            if (data && data.length > 0) {
                setThreads(data);
                // For catalog mode, we might want to load more items initially or stick to same pagination
                const itemsPerPage = viewMode === 'catalog' ? 20 : 10;
                setVisibleThreads(data.slice(0, itemsPerPage));
                setPage(1);
            } else {
                setError('Не удалось загрузить треды. Проверьте соединение.');
            }
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке данных.');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            fetchThreads();
        }
    }["Home.useEffect"], []);
    // Update visible threads when page changes or viewMode changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (threads.length > 0) {
                const itemsPerPage_0 = viewMode === 'catalog' ? 20 : 10;
                const count = page * 10;
                setVisibleThreads(threads.slice(0, count));
            }
        }
    }["Home.useEffect"], [
        page,
        threads,
        viewMode
    ]);
    // Infinite scroll implementation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "Home.useEffect": (entries)=>{
                    if (entries[0].isIntersecting && !loading && visibleThreads.length < threads.length) {
                        setPage({
                            "Home.useEffect": (p)=>p + 1
                        }["Home.useEffect"]);
                    }
                }
            }["Home.useEffect"], {
                threshold: 0.1,
                rootMargin: '200px'
            });
            if (observerTarget.current) {
                observer.observe(observerTarget.current);
            }
            return ({
                "Home.useEffect": ()=>observer.disconnect()
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        loading,
        visibleThreads.length,
        threads.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-black text-white flex justify-center font-sans selection:bg-orange-500 selection:text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full ${viewMode === 'catalog' ? 'max-w-5xl' : 'max-w-[600px]'} border-x border-gray-900 min-h-screen relative transition-all duration-300`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg shadow-black/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-bold tracking-tighter text-white flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-orange-500",
                                    children: "/b/"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                " ",
                                viewMode === 'feed' ? 'Feed' : 'Catalog'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setViewMode((prev)=>prev === 'feed' ? 'catalog' : 'feed'),
                                    className: "p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200",
                                    title: viewMode === 'feed' ? "Каталог" : "Лента",
                                    children: viewMode === 'feed' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 42
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 69
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: fetchThreads,
                                    className: "p-2 hover:bg-gray-800 rounded-full transition-colors active:scale-90 transform duration-200",
                                    title: "Обновить",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        size: 20,
                                        className: loading ? "animate-spin" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                        lineNumber: 78,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                    lineNumber: 69,
                    columnNumber: 10
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `pb-20 ${viewMode === 'catalog' ? 'p-2' : ''}`,
                    children: [
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-20 text-center text-gray-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-4 text-lg",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: fetchThreads,
                                    className: "px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors",
                                    children: "Попробовать снова"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                            lineNumber: 84,
                            columnNumber: 23
                        }, this),
                        !error && viewMode === 'feed' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col",
                            children: visibleThreads.map((thread)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    thread: thread
                                }, thread.num, false, {
                                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 51
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                            lineNumber: 91,
                            columnNumber: 46
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2",
                            children: visibleThreads.map((thread_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$app$2f$components$2f$CatalogCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    thread: thread_0
                                }, thread_0.num, false, {
                                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 53
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                            lineNumber: 93,
                            columnNumber: 26
                        }, this),
                        loading && threads.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 text-center text-gray-500 animate-pulse",
                            children: "Загрузка..."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                            lineNumber: 97,
                            columnNumber: 49
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: observerTarget,
                            className: "h-20 w-full flex justify-center items-center opacity-50 mt-4",
                            children: visibleThreads.length < threads.length && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$3ch$2f$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 bg-gray-600 rounded-full animate-ping"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                                lineNumber: 102,
                                columnNumber: 71
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/3ch/app/app/page.tsx",
                    lineNumber: 83,
                    columnNumber: 10
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/3ch/app/app/page.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/3ch/app/app/page.tsx",
        lineNumber: 67,
        columnNumber: 10
    }, this);
}
_s(Home, "9oWyosuJxecjWMZEh8LocoBcP28=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_3ch_app_app_adacd4d4._.js.map