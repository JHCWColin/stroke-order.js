((window, document) => {
    'use strict';

    const BASE_TOP = 200;
    const BASE_BTM = 800;
    const MID_Y = 480;
    const GRID = 1000;
    const OFFSET_PIXELS = 0;

    const SPEED_MAP = {
        slowest: 1500, slower: 1000, slow: 600,
        normal: 400, fast: 250, faster: 150, fastest: 80
    };

    // --- 笔画数据库 (保持原样) ---
    const LETTERS = {
        A: { width: 500, anchorX: 180, strokes: [{ type: 'line', x1: 220, y1: 800, x2: 460, y2: 200, extY1: 850, extY2: 150 }, { type: 'line', x1: 460, y1: 200, x2: 700, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 340, y1: 550, x2: 580, y2: 550 }] },
        B: { width: 435, anchorX: 200, strokes: [{ type: 'line', x1: 250, y1: 200, x2: 250, y2: 800, extY1: 150, extY2: 850 }, { type: 'fastline', x1: 250, y1: 200, x2: 450, y2: 200, forceButt: true }, { type: 'ellipse', h: 450, k: 340, a: 160, b: 140, start: -Math.PI / 2, end: Math.PI / 2, ccw: false, forceButt: true }, { type: 'fastline', x1: 450, y1: MID_Y, x2: 250, y2: MID_Y, forceButt: true }, { type: 'fastline', x1: 250, y1: MID_Y, x2: 480, y2: MID_Y, forceButt: true }, { type: 'ellipse', h: 480, k: 640, a: 190, b: 160, start: -Math.PI / 2, end: Math.PI / 2, ccw: false, forceButt: true }, { type: 'fastline', x1: 480, y1: 800, x2: 250, y2: 800, forceButt: true }] },
        C: { width: 415, anchorX: 160, strokes: [{ type: 'ellipse', h: 420, k: 500, a: 240, b: 300, start: Math.PI * 1.7, end: Math.PI * 0.3, ccw: true, forceButt: true }] },
        D: { width: 455, anchorX: 200, strokes: [{ type: 'line', x1: 250, y1: 200, x2: 250, y2: 800, extY1: 150, extY2: 850 }, { type: 'fastline', x1: 250, y1: 200, x2: 400, y2: 200, forceButt: true }, { type: 'ellipse', h: 400, k: 500, a: 280, b: 300, start: -Math.PI / 2, end: Math.PI / 2, ccw: false, forceButt: true }, { type: 'fastline', x1: 400, y1: 800, x2: 250, y2: 800, forceButt: true }] },
        E: { width: 375, anchorX: 200, strokes: [{ type: 'line', x1: 250, y1: 200, x2: 250, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 250, y1: 200, x2: 600, y2: 200, forceButt: true }, { type: 'line', x1: 250, y1: 480, x2: 600, y2: 480, forceButt: true }, { type: 'line', x1: 250, y1: 800, x2: 600, y2: 800, forceButt: true }] },
        F: { width: 410, anchorX: 200, strokes: [{ type: 'line', x1: 250, y1: 200, x2: 250, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 250, y1: 200, x2: 600, y2: 200, forceButt: true }, { type: 'line', x1: 250, y1: 480, x2: 600, y2: 480, forceButt: true }] },
        G: { width: 465, anchorX: 160, strokes: [{ type: 'ellipse', h: 400, k: 500, a: 260, b: 300, start: Math.PI * 1.7, end: Math.PI * 0.245, ccw: true, forceButt: true }, { type: 'line', x1: 580, y1: 730, x2: 580, y2: 520, forceButt: true }, { type: 'line', x1: 610, y1: 520, x2: 380, y2: 520, forceButt: true }] },
        H: { width: 410, anchorX: 180, strokes: [{ type: 'line', x1: 200, y1: 200, x2: 200, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 600, y1: 200, x2: 600, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 200, y1: MID_Y, x2: 600, y2: MID_Y, forceButt: true }] },
        I: { width: 305, anchorX: 150, strokes: [{ type: 'line', x1: 200, y1: 200, x2: 500, y2: 200, forceButt: true }, { type: 'line', x1: 350, y1: 200, x2: 350, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 200, y1: 800, x2: 500, y2: 800, forceButt: true }] },
        J: { width: 370, anchorX: 150, strokes: [{ type: 'line', x1: 213, y1: 200, x2: 540, y2: 200, forceButt: true }, { type: 'line', x1: 380, y1: 200, x2: 380, y2: 700 }, { type: 'ellipse', h: 280, k: 700, a: 100, b: 100, start: 0, end: Math.PI, ccw: false, forceButt: true }] },
        K: { width: 475, anchorX: 180, strokes: [{ type: 'line', x1: 250, y1: 200, x2: 250, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 599, y1: 150, x2: 250, y2: MID_Y }, { type: 'line', x1: 250, y1: MID_Y, x2: 640, y2: 843 }] },
        L: { width: 430, anchorX: 200, strokes: [{ type: 'line', x1: 250, y1: 200, x2: 250, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 250, y1: 800, x2: 600, y2: 800, forceButt: true }] },
        M: { width: 600, anchorX: 120, strokes: [{ type: 'line', x1: 150, y1: 800, x2: 150, y2: 200, extY1: 850, extY2: 150 }, { type: 'line', x1: 150, y1: 150, x2: 450, y2: 850 }, { type: 'line', x1: 450, y1: 850, x2: 750, y2: 150 }, { type: 'line', x1: 750, y1: 200, x2: 750, y2: 800, extY1: 150, extY2: 850 }] },
        N: { width: 500, anchorX: 180, strokes: [{ type: 'line', x1: 250, y1: 800, x2: 250, y2: 200, extY1: 850, extY2: 150 }, { type: 'line', x1: 250, y1: 150, x2: 650, y2: 850 }, { type: 'line', x1: 650, y1: 800, x2: 650, y2: 200, extY1: 850, extY2: 150 }] },
        O: { width: 480, anchorX: 160, strokes: [{ type: 'ellipse', h: 420, k: 500, a: 240, b: 300, start: 0, end: Math.PI * 2, ccw: true }] },
        P: { width: 380, anchorX: 200, strokes: [{ type: 'line', x1: 250, y1: 200, x2: 250, y2: 800, extY1: 150, extY2: 850 }, { type: 'fastline', x1: 250, y1: 200, x2: 395, y2: 200, forceButt: true }, { type: 'ellipse', h: 395, k: 350, a: 160, b: 150, start: -Math.PI / 2, end: Math.PI / 2, ccw: false, forceButt: true }, { type: 'fastline', x1: 395, y1: 500, x2: 250, y2: 500, forceButt: true }] },
        Q: { width: 520, anchorX: 160, strokes: [{ type: 'ellipse', h: 420, k: 500, a: 240, b: 300, start: 0, end: Math.PI * 2, ccw: true }, { type: 'ellipse', h: 750, k: 450, a: 350, b: 350, start: Math.PI * 0.85, end: Math.PI * 0.52, ccw: true, forceButt: true }] },
        R: { width: 380, anchorX: 200, strokes: [{ type: 'line', x1: 250, y1: 200, x2: 250, y2: 800, extY1: 150, extY2: 850 }, { type: 'fastline', x1: 250, y1: 200, x2: 380, y2: 200, forceButt: true }, { type: 'ellipse', h: 380, k: 350, a: 160, b: 150, start: -Math.PI / 2, end: Math.PI / 2, ccw: false, forceButt: true }, { type: 'fastline', x1: 380, y1: 500, x2: 250, y2: 500, forceButt: true }, { type: 'line', x1: 350, y1: 500, x2: 580, y2: 850 }] },
        S: { width: 410, anchorX: 180, strokes: [{ type: 'ellipse', h: 400, k: 350, a: 200, b: 150, start: 0, end: Math.PI * 1.5, ccw: true, forceButt: true }, { type: 'ellipse', h: 400, k: 650, a: 200, b: 150, start: -Math.PI * 0.5, end: Math.PI, ccw: false, forceButt: true }] },
        T: { width: 460, anchorX: 150, strokes: [{ type: 'line', x1: 155, y1: 200, x2: 645, y2: 200, forceButt: true }, { type: 'line', x1: 400, y1: 200, x2: 400, y2: 800, extY1: 150, extY2: 850 }] },
        U: { width: 440, anchorX: 180, strokes: [{ type: 'line', x1: 200, y1: 200, x2: 200, y2: 650, extY1: 150 }, { type: 'ellipse', h: 400, k: 650, a: 200, b: 140, start: Math.PI, end: 0, ccw: true }, { type: 'line', x1: 600, y1: 650, x2: 600, y2: 200, extY2: 150 }] },
        V: { width: 540, anchorX: 160, strokes: [{ type: 'line', x1: 200, y1: 200, x2: 450, y2: 820, extY1: 150 }, { type: 'line', x1: 450, y1: 820, x2: 700, y2: 200, extY2: 150 }] },
        W: { width: 730, anchorX: 120, strokes: [{ type: 'line', x1: 150, y1: 180, x2: 325, y2: 820, extY1: 150 }, { type: 'line', x1: 325, y1: 820, x2: 500, y2: 180 }, { type: 'line', x1: 500, y1: 180, x2: 675, y2: 820 }, { type: 'line', x1: 675, y1: 820, x2: 850, y2: 180, extY2: 150 }] },
        X: { width: 460, anchorX: 180, strokes: [{ type: 'line', x1: 200, y1: 200, x2: 600, y2: 800, extY1: 150, extY2: 850 }, { type: 'line', x1: 600, y1: 200, x2: 200, y2: 800, extY1: 150, extY2: 850 }] },
        Y: { width: 440, anchorX: 180, strokes: [{ type: 'line', x1: 200, y1: 200, x2: 400, y2: 500, extY1: 150 }, { type: 'line', x1: 600, y1: 200, x2: 400, y2: 500, extY1: 150 }, { type: 'line', x1: 400, y1: 500, x2: 400, y2: 800, extY2: 850 }] },
        Z: { width: 440, anchorX: 180, strokes: [{ type: 'line', x1: 200, y1: 200, x2: 600, y2: 200, forceButt: true }, { type: 'line', x1: 615, y1: 180, x2: 185, y2: 820 }, { type: 'line', x1: 200, y1: 800, x2: 600, y2: 800, forceButt: true }] },
        ' ': { width: 300, strokes: [] },
    };

    function applyBaselineClip(ctx, scale, lineWidth, offsetY) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        const halfW = lineWidth / 2;
        const vTopCutoff = (BASE_TOP * scale) - halfW + OFFSET_PIXELS;
        ctx.fillRect(-lineWidth * 5, -offsetY - lineWidth, ctx.canvas.width * 2, vTopCutoff + offsetY + lineWidth);
        const vBtmCutoff = (BASE_BTM * scale) + halfW - OFFSET_PIXELS;
        ctx.fillRect(-lineWidth * 5, vBtmCutoff, ctx.canvas.width * 2, ctx.canvas.height);
        ctx.restore();
    }

    function calculateEasedT(t, easeIn, easeOut) {
        if (easeIn && easeOut) return -(Math.cos(Math.PI * t) - 1) / 2;
        if (easeIn) return 1 - Math.cos((t * Math.PI) / 2);
        if (easeOut) return Math.sin((t * Math.PI) / 2);
        return t;
    }

    // --- 核心动画函数：支持正向绘制与反向擦除 ---
    function animateStroke(ctx, stroke, scale, lineWidth, isRounded, baseDuration, easeIn, easeOut, offsetX, offsetY, isEraser = false) {
        return new Promise(resolve => {
            const isFast = stroke.type === 'fastline';
            const duration = isFast ? Math.max(16, baseDuration / 20) : baseDuration;
            const startTimestamp = performance.now();

            function step(now) {
                const linearT = Math.min((now - startTimestamp) / duration, 1);
                // 擦除时逻辑：t 从 1 变到 0（反向收回）
                const progress = isEraser ? (1 - linearT) : linearT;
                const t = isFast ? progress : calculateEasedT(progress, easeIn, easeOut);

                ctx.save();
                ctx.translate(offsetX, offsetY);
                
                // 关键点：如果是擦除模式，使用 destination-out
                if (isEraser) {
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.lineWidth = lineWidth * 1.2; // 橡皮擦稍微加粗确保擦干净
                } else {
                    ctx.lineWidth = lineWidth;
                }

                ctx.beginPath();
                ctx.lineCap = isRounded ? 'round' : (stroke.forceButt ? 'butt' : 'round');
                ctx.lineJoin = 'round';

                if (stroke.type === 'line' || stroke.type === 'fastline') {
                    const y1 = (isRounded || !stroke.extY1) ? stroke.y1 : stroke.extY1;
                    const y2 = (isRounded || !stroke.extY2) ? stroke.y2 : stroke.extY2;
                    ctx.moveTo(stroke.x1 * scale, y1 * scale);
                    ctx.lineTo((stroke.x1 + (stroke.x2 - stroke.x1) * t) * scale, (y1 + (y2 - y1) * t) * scale);
                } else if (stroke.type === 'ellipse') {
                    const { h, k, a, b, start, end, ccw } = stroke;
                    let angleDiff = Math.abs(end - start);
                    if (angleDiff > Math.PI * 2) angleDiff %= Math.PI * 2;
                    const curAngle = ccw ? start - (angleDiff * t) : start + (angleDiff * t);
                    ctx.ellipse(h * scale, k * scale, a * scale, b * scale, 0, start, curAngle, ccw);
                }
                ctx.stroke();

                // 擦除不需要再次裁剪，绘制需要
                if (!isRounded && !isEraser) applyBaselineClip(ctx, scale, lineWidth, offsetY);
                ctx.restore();

                if (linearT < 1) requestAnimationFrame(step);
                else resolve();
            }
            requestAnimationFrame(step);
        });
    }

    async function processElement(el) {
        const isInOut = el.classList.contains('stroke-order-in-out');
        const originalStyleColor = el.style.color;
        el.style.color = 'transparent';

        const delay = parseInt(el.getAttribute('data-delay')) || 0;
        if (delay > 0) await new Promise(r => setTimeout(r, delay));

        const text = el.innerText.trim().toUpperCase();
        const fontSize = parseInt(el.getAttribute('data-font-size')) || 200;
        const k = parseFloat(el.getAttribute('data-stroke-k')) || 0.05;
        const isRounded = el.getAttribute('data-rounded') === 'true';
        const easeIn = el.getAttribute('data-ease-in') === 'true';
        const easeOut = el.getAttribute('data-ease-out') === 'true';
        const isAsync = el.getAttribute('data-async') === 'true';
        const asyncInterval = parseInt(el.getAttribute('data-async-interval')) ?? 50;
        const speedKey = el.getAttribute('data-speed') || 'slow';
        const baseDuration = SPEED_MAP[speedKey] || SPEED_MAP.slow;
        const holdDuration = parseInt(el.getAttribute('data-duration')) || 1000;

        const scale = fontSize / GRID;
        const lineWidth = fontSize * k;
        const letterSpacing = fontSize * 0.12;

        let totalW = lineWidth;
        const metrics = [];
        for (let i = 0; i < text.length; i++) {
            const data = LETTERS[text[i]];
            if (data) {
                metrics.push({ data, x: totalW });
                totalW += data.width * scale + letterSpacing;
            } else if (text[i] === ' ') {
                totalW += fontSize * 0.4;
            }
        }

        const dpr = window.devicePixelRatio || 1;
        const cssWidth = totalW + lineWidth;
        const cssHeight = fontSize + (lineWidth * 4);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;

        const attrColor = el.getAttribute('data-color');
        let drawColor;
        if (attrColor) {
            drawColor = attrColor.includes(',') ? `rgba(${attrColor})` : attrColor;
        } else {
            const computedStyle = window.getComputedStyle(el);
            drawColor = computedStyle.color === 'transparent' || computedStyle.color.includes('rgba(0, 0, 0, 0)') ? 'black' : computedStyle.color;
        }

        el.innerHTML = '';
        el.style.color = originalStyleColor; 
        el.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = drawColor;

        // --- 封装执行函数方便重用 ---
        async function runCycle(isEraser) {
            // 如果是擦除，逻辑上通常是从最后一个字母的最后一笔反向擦，
            // 但为了代码简洁，我们依然按顺序遍历字母，但在 animateStroke 内部处理反向缩回。
            for (const metric of metrics) {
                const { data, x } = metric;
                const offsetX = x - (data.anchorX * scale);
                const offsetY = lineWidth * 2;

                const strokePromises = [];
                for (const s of data.strokes) {
                    const p = animateStroke(ctx, s, scale, lineWidth, isRounded, baseDuration, easeIn, easeOut, offsetX, offsetY, isEraser);
                    if (isAsync) {
                        strokePromises.push(p);
                        if (asyncInterval > 0 && s.type !== 'fastline') await new Promise(r => setTimeout(r, asyncInterval));
                    } else {
                        await p;
                    }
                }
                if (isAsync) await Promise.all(strokePromises);
            }
        }

        // 1. 正向绘制
        await runCycle(false);

        // 2. 如果是 In-Out 模式，等待后反向擦除
        if (isInOut) {
            await new Promise(r => setTimeout(r, holdDuration));
            await runCycle(true);
        }
    }

    const init = () => {
        // 逻辑：如果存在 stroke-order-in-out，忽略该元素的 stroke-order-in
        const elements = document.querySelectorAll('.stroke-order-in, .stroke-order-in-out');
        elements.forEach(el => {
            if (el.classList.contains('stroke-order-in-out') && el.classList.contains('stroke-order-in')) {
                // 不做特殊操作，processElement 内部已经是统一处理
            }
            processElement(el);
        });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    window.TextOrder = { refresh: init };

})(window, document);