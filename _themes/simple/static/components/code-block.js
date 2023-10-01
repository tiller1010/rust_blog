export const addCodeCopyEventListeners = () => {
  document.querySelectorAll('pre').forEach((pre) => {
    const copyButton = document.createElement('button');
    copyButton.innerText = 'Copy';
    copyButton.classList.add('copy-code-btn');
    copyButton.classList.add('button');
    pre.appendChild(copyButton);
    pre.addEventListener('click', (e) => {
      e.preventDefault();
      const copyText = pre.querySelector('code').innerText;
      navigator.clipboard.writeText(copyText);
      copyButton.innerText = 'Copied!';
    });
  });
}

