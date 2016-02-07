const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.querySelector('.clear-console');
const evalError = document.querySelector('pre.error');
const evalElement = document.querySelector('pre.eval');

export default () => {
    resetBtn.addEventListener('click', () => window.location = '.');
    clearBtn.addEventListener("click", () => {
        console.clear();
        evalElement.textContent = '';
        evalError.textContent = '';
    });
};
