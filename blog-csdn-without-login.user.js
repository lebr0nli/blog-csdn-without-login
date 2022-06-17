// ==UserScript==
// @name        blog.csdn.net without login
// @description Bypass the annoying login popup of blog.csdn.net and select/copy code without any problem.
// @match       *://blog.csdn.net/*/article/*
// @version     2022.06
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
    // Chrome and Firefox
    node.parentElement.style.userSelect = 'text';
    // Safari
    node.parentElement.style['-webkit-user-select'] = 'text';
    // Make mdcp.signin do nothing
    node.setAttribute('onclick', 'mdcp.signin=(e)=>{};');
    // Copy the code
    node.addEventListener('click', e => {
        e.preventDefault();
        copyToClipboard(node.parentElement.textContent);
        node.dataset.title = 'Copied!';
        setTimeout(() => {
            node.dataset.title = 'Copy';
        }, 1000);
    });
});

