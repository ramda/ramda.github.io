import prettyJS from 'pretty-js';
const prettyBtn = document.querySelector('.pretty-console');
const evalElement = document.querySelector('pre.eval');

export default (output) => {
  prettyBtn.addEventListener('click', function prettify() {
    output.setValue(prettyJS(output.getValue()));
  });
};
