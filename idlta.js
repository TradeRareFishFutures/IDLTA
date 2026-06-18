
// ==UserScript==
// @name         Instagram Mass Unliker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automate Instagram unlikes
// @match        *://*.instagram.com/*
// @grant        none
// ==/UserScript==

(function () {

    // ui made by gemini

    if (window._muGui) return;
    const gui = document.createElement('div');
    gui.id = 'mu-gui';
    const style = document.createElement('style');
    style.innerHTML = '#mu-gui input[type=number]::-webkit-inner-spin-button, #mu-gui input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; } #mu-gui input[type=number] { -moz-appearance: textfield; }';
    gui.appendChild(style);
    gui.style.cssText = 'position:fixed;top:20px;left:20px;width:280px;background:#1e1e1e;color:#fff;border:1px solid #333;border-radius:8px;z-index:999999;font-family:sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.5);overflow:hidden;';
    const header = document.createElement('div');
    header.style.cssText = 'background:linear-gradient(45deg,#833ab4,#fd1d1d,#fcb045);padding:10px;cursor:move;font-weight:bold;text-align:center;user-select:none;';
    header.innerText = 'Instagram Mass Unliker';
    gui.appendChild(header);
    const body = document.createElement('div');
    body.style.cssText = 'padding:15px;display:flex;flex-direction:column;gap:10px;';
    const l1 = document.createElement('label'); l1.style.cssText = 'display:flex;justify-content:space-between;font-size:13px;'; l1.innerText = 'Batch Size: ';
    const i1 = document.createElement('input'); i1.type = 'number'; i1.id = 'mu-batch'; i1.value = '10'; i1.min = '1'; i1.max = '50'; i1.style.cssText = 'width:60px;background:#333;color:#fff;border:1px solid #555;border-radius:4px;padding:2px 5px;';
    l1.appendChild(i1);

    const l2 = document.createElement('label'); l2.style.cssText = 'display:flex;align-items:center;justify-content:space-between;font-size:13px;'; l2.innerText = 'Batch Delay (s): ';
    const l2r = document.createElement('span'); l2r.style.cssText = 'display:flex;align-items:center;gap:4px;';
    const i2 = document.createElement('input'); i2.type = 'number'; i2.id = 'mu-min'; i2.value = '15'; i2.style.cssText = 'width:45px;background:#333;color:#fff;border:1px solid #555;border-radius:4px;padding:2px 5px;';
    const l2d = document.createElement('span'); l2d.innerText = '-'; l2d.style.color = '#888';
    const i3 = document.createElement('input'); i3.type = 'number'; i3.id = 'mu-max'; i3.value = '25'; i3.style.cssText = 'width:45px;background:#333;color:#fff;border:1px solid #555;border-radius:4px;padding:2px 5px;';
    l2r.appendChild(i2); l2r.appendChild(l2d); l2r.appendChild(i3); l2.appendChild(l2r);

    const l5 = document.createElement('label'); l5.style.cssText = 'display:flex;align-items:center;justify-content:space-between;font-size:13px;'; l5.innerText = 'Click Delay (ms): ';
    const l5r = document.createElement('span'); l5r.style.cssText = 'display:flex;align-items:center;gap:4px;';
    const i5a = document.createElement('input'); i5a.type = 'number'; i5a.id = 'mu-cmin'; i5a.value = '400'; i5a.style.cssText = 'width:45px;background:#333;color:#fff;border:1px solid #555;border-radius:4px;padding:2px 5px;';
    const l5d = document.createElement('span'); l5d.innerText = '-'; l5d.style.color = '#888';
    const i5b = document.createElement('input'); i5b.type = 'number'; i5b.id = 'mu-cmax'; i5b.value = '1200'; i5b.style.cssText = 'width:45px;background:#333;color:#fff;border:1px solid #555;border-radius:4px;padding:2px 5px;';
    l5r.appendChild(i5a); l5r.appendChild(l5d); l5r.appendChild(i5b); l5.appendChild(l5r);

    const l4 = document.createElement('label'); l4.style.cssText = 'display:flex;justify-content:space-between;font-size:13px;'; l4.innerText = 'Reload Timeout (s): ';
    const i4 = document.createElement('input'); i4.type = 'number'; i4.id = 'mu-reload'; i4.value = '15'; i4.style.cssText = 'width:60px;background:#333;color:#fff;border:1px solid #555;border-radius:4px;padding:2px 5px;';
    l4.appendChild(i4);

    const st = document.createElement('div'); st.id = 'mu-status'; st.style.cssText = 'font-size:13px;color:#fcb045;font-weight:bold;margin-top:5px;'; st.innerText = 'Status: Idle';
    const stTotal = document.createElement('div'); stTotal.id = 'mu-total'; stTotal.style.cssText = 'font-size:13px;color:#fd1d1d;font-weight:bold;margin-top:2px;'; stTotal.innerText = 'Total Unliked: 0';
    const btnMain = document.createElement('button'); btnMain.id = 'mu-btn'; btnMain.style.cssText = 'background:#2ecc71;color:#fff;border:none;padding:8px;border-radius:4px;font-weight:bold;cursor:pointer;margin-top:10px;'; btnMain.innerText = 'START';

    body.appendChild(l1); body.appendChild(l2); body.appendChild(l5); body.appendChild(l4); body.appendChild(st); body.appendChild(stTotal); body.appendChild(btnMain);
    gui.appendChild(body);
    document.body.appendChild(gui);
    window._muGui = gui;

    let isDragging = false, currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
    header.onmousedown = e => { initialX = e.clientX - xOffset; initialY = e.clientY - yOffset; isDragging = true; };
    document.onmouseup = () => isDragging = false;
    document.onmousemove = e => {
        if (isDragging) { e.preventDefault(); currentX = e.clientX - initialX; currentY = e.clientY - initialY; xOffset = currentX; yOffset = currentY; gui.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`; }
    };

    let isRunning = sessionStorage.getItem('mu_isRunning') === 'true';
    let totalUnliked = parseInt(sessionStorage.getItem('mu_totalUnliked')) || 0;
    const btn = document.getElementById('mu-btn');
    const status = document.getElementById('mu-status');
    const totalStatus = document.getElementById('mu-total');

    if (totalUnliked > 0) {
        totalStatus.innerText = 'Total Unliked: ' + totalUnliked;
    }

    const setStatus = t => { status.innerText = 'Status: ' + t; };
    const setTotal = () => {
        totalStatus.innerText = 'Total Unliked: ' + totalUnliked;
        sessionStorage.setItem('mu_totalUnliked', totalUnliked);
    };
    btn.onclick = () => {
        isRunning = !isRunning;
        sessionStorage.setItem('mu_isRunning', isRunning);
        if (isRunning) { btn.innerText = 'STOP'; btn.style.background = '#e74c3c'; runUnliker(); }
        else { btn.innerText = 'START'; btn.style.background = '#2ecc71'; setStatus('Stopped by user'); }
    };



    const wait = (min, max) => new Promise(r => setTimeout(r, Math.floor(Math.random() * (max - min + 1) + min)));
    const isVisible = el => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0;
    const findAllBtns = t => {
        const leafs = Array.from(document.querySelectorAll('button, [role="button"], span, div, a')).filter(el => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 && el.textContent.trim().toLowerCase() === t.toLowerCase() && isVisible(el));
        return Array.from(new Set(leafs.map(el => el.closest('button, [role="button"]') || el)));
    };
    const findBtn = t => findAllBtns(t)[0];
    const clickHelper = el => { if (!el) return; el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window })); if (typeof el.click === 'function') el.click(); };

    const checkLimit = async () => {
        const text = document.body.innerText.toLowerCase();
        if (text.includes('try again later') || text.includes('restrict certain activity') || text.includes('action blocked')) {
            setStatus('Rate limit! Paused 60m...');
            await wait(3600000, 3600000);
            setStatus('60m passed. Refreshing...');
            const okBtn = findBtn('ok') || findBtn('dismiss');
            if (okBtn) okBtn.click();
            const likesLink = document.querySelector('a[href*="/interactions/likes"]');
            if (likesLink) { likesLink.click(); await wait(5000, 8000); }
            return true;
        }
        return false;
    };

    async function waitFor(condFn, intervalMs, maxMs) {
        const end = Date.now() + maxMs;
        while (Date.now() < end) {
            if (condFn()) return true;
            await wait(intervalMs, intervalMs);
        }
        return false;
    }

    const isModalOpen = () => document.body.innerText.toLowerCase().includes('unlike posts?');

    async function runUnliker(isAutoStart = false) {
        if (isAutoStart) {
            setStatus('Starting (waiting for page)...');
            await wait(3000, 4000);
        }
        let selectFailCount = 0;

        while (isRunning) {
            setStatus('Running loop...');
            const batchSize = parseInt(document.getElementById('mu-batch').value) || 10;
            const minDelay = (parseInt(document.getElementById('mu-min').value) || 15) * 1000;
            const maxDelay = (parseInt(document.getElementById('mu-max').value) || 25) * 1000;
            const clickMin = parseInt(document.getElementById('mu-cmin').value) || 400;
            const clickMax = parseInt(document.getElementById('mu-cmax').value) || 1200;
            const reloadDelay = (parseInt(document.getElementById('mu-reload').value) || 15) * 1000;

            let isSelectMode = findBtn('cancel');
            if (!isSelectMode) {
                const selectBtn = findBtn('select');
                if (selectBtn) { selectBtn.click(); await wait(2000, 3500); }
                isSelectMode = findBtn('cancel');
            }
            if (!isSelectMode) {
                if (await checkLimit()) continue;
                selectFailCount++;
                if (selectFailCount > 3) {
                    setStatus(`Select stuck. Reloading in ${Math.round(reloadDelay / 1000)}s...`);
                    await wait(reloadDelay, reloadDelay);
                    window.location.href = 'https://www.instagram.com/your_activity/interactions/likes/';
                    await wait(10000, 14000);
                    selectFailCount = 0;
                    continue;
                }
                setStatus('Waiting for select mode...');
                await wait(2000, 3000);
                continue;
            }
            selectFailCount = 0;

            const images = Array.from(document.querySelectorAll('img')).filter(img => img.width > 50 || img.height > 50);
            let selectedCount = 0;
            for (let i = 0; i < images.length && selectedCount < batchSize && isRunning; i++) {
                const img = images[i];
                if (img.dataset.muClicked) continue;
                img.dataset.muClicked = '1';
                const wrapper = img.closest('a') || img.closest('[role="button"]') || img.parentElement.parentElement || img;
                if (wrapper) { wrapper.click(); selectedCount++; await wait(clickMin, clickMax); }
            }

            if (selectedCount === 0) {
                setStatus('No new posts. Scrolling...');
                window.scrollTo(0, document.body.scrollHeight);
                await wait(4000, 6000);
                const newCount = Array.from(document.querySelectorAll('img')).filter(img => img.width > 50 || img.height > 50).length;
                if (newCount === images.length) {
                    setStatus(`Stalled. Reloading in ${Math.round(reloadDelay / 1000)}s...`);
                    await wait(reloadDelay, reloadDelay);
                    window.location.href = 'https://www.instagram.com/your_activity/interactions/likes/';
                    await wait(10000, 14000);
                }
                continue;
            }

            await wait(1000, 2000);

            const unlikeBtn = findBtn('unlike');
            if (!unlikeBtn || !isRunning) { setStatus('Unlike btn missing'); continue; }

            setStatus('Clicking unlike...');
            clickHelper(unlikeBtn);

            setStatus('Waiting for popup...');
            const appeared = await waitFor(isModalOpen, 400, 10000);
            if (!appeared) { setStatus('Popup never appeared. Retrying...'); await wait(2000, 3000); continue; }

            await wait(400, 800);
            const confirmBtns = findAllBtns('unlike');
            const confirmBtn = confirmBtns[confirmBtns.length - 1];
            if (!confirmBtn || !isRunning) { setStatus('Confirm btn missing'); const c = findBtn('cancel'); if (c) c.click(); continue; }

            setStatus('Clicking confirm...');
            clickHelper(confirmBtn);

            const closed = await waitFor(() => !isModalOpen(), 400, 8000);
            if (!closed) { setStatus('Popup stuck. Cancelling...'); const c = findBtn('cancel'); if (c) c.click(); await wait(2000, 3000); continue; }

            if (await checkLimit()) continue;

            totalUnliked += selectedCount;
            setTotal();
            const delayMs = Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
            setStatus(`Unliked batch of ${selectedCount}. Delaying ${Math.round(delayMs / 1000)}s...`);
            await wait(delayMs, delayMs);
        }
    }

    if (isRunning) {
        btn.innerText = 'STOP'; btn.style.background = '#e74c3c';
        runUnliker(true);
    }
})();
