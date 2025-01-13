const defaultTheme = 'light'

const body = document.querySelector("body");

function detect_theme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else if (window.matchMedia) {
    return "light";
  }
  return defaultTheme;
}

function apply_theme() {
  const theme = get_saved_theme()
  document.body.classList.remove('light', 'dark')

  document.body.classList.add(theme);
}

function save_theme(e) {
  e.preventDefault();
  const isDark = document.body.classList.contains('dark');
  const theme = isDark ? 'light' : 'dark'
  localStorage.setItem('theme', theme);
  apply_theme()
}

function get_saved_theme() {
  const theme = localStorage.getItem('theme')

  return theme ? theme : detect_theme()
}

function init_theme() {
  apply_theme()

  const link = document.querySelector('#theme-toggle');
  link.addEventListener('click', save_theme)
}

document.addEventListener('DOMContentLoaded', init_theme);
