const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.querySelector('.clear-console');
const evalError = document.querySelector('pre.error');

export default (output) => {
    resetBtn.addEventListener('click', () => window.location = '.');
    clearBtn.addEventListener("click", () => {
        console.clear();
        output.setValue('');
        evalError.textContent = '';
    });
};
