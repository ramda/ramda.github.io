import prettyJS from 'pretty-js';
const prettyBtn = document.querySelector('.pretty-console');
const evalElement = document.querySelector('pre.eval');

export default () => {
  prettyBtn.addEventListener('click', () => {
    evalElement.textContent = prettyJS(evalElement.textContent, {indent : '  '});
  });
};
