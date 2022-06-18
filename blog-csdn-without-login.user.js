// ==UserScript==
// @name        blog.csdn.net without login
// @description Bypass the annoying login popup of blog.csdn.net and select/copy code without any problem.
// @match       *://blog.csdn.net/*/article/*
// @version     2022.06.18
// @run-at      document-idle
// @updateURL   https://raw.githubusercontent.com/lebr0nli/blog-csdn-without-login/main/blog-csdn-without-login.user.js
// ==/UserScript==

function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
}

document.body.querySelectorAll('.hljs-button.signin').forEach(node => {
    node.dataset.title = 'Copy';
    node.removeAttribute('data-report-click');
    // Make mdcp.signin do nothing
    node.setAttribute('onclick', 'window.mdcp ? window.mdcp.signin=(e)=>{} : null;');
    // Copy the code
    node.addEventListener('click', e => {
        e.preventDefault();
        copyToClipboard(node.parentElement.innerText);
        node.dataset.title = 'Copied!';
        setTimeout(() => {
            node.dataset.title = 'Copy';
        }, 1000);
    });
});

document.body.querySelectorAll('code').forEach(node => {
    // Chrome and Firefox
    node.style.userSelect = 'text';
    // Safari
    node.style['-webkit-user-select'] = 'text';
});

document.addEventListener('copy', e => {
    // avoid copyright text
    if (e.clipboardData.getData('text/plain').includes('\r\n————————————————\r\n版权声明')) {
        e.preventDefault();
        e.clipboardData.setData('text/plain', document.getSelection().toString());
    }
});