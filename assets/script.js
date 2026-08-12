function lightDarkMode() {
  const rootElement = document.documentElement;
  const modeLocalStorageKey = 'paulina_alford_page.theme';
  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let toggleBtn = document.getElementById("light-dark-mode");
  let savedSetting = localStorage.getItem(modeLocalStorageKey) || 'system';

  function setDataTheme(setting) {
    if (setting === 'system') {
      rootElement.removeAttribute('data-theme');
    } else {
      rootElement.setAttribute('data-theme', setting);
    }
  }

  function setButtonToDark(button, setToDark) {
    setToDark ? button.classList.add("dark") : button.classList.remove("dark");
  }

  setDataTheme(savedSetting);
  if (savedSetting === 'system') {
    setButtonToDark(toggleBtn, isSystemDark)
  } else {
    setButtonToDark(toggleBtn, savedSetting === 'dark')
  }

  function onBallTransitionEnd(event) {
    if (event.propertyName !== "background-color") return;
    event.target.classList.remove("transition");
    event.target.removeEventListener("transitionend", onBallTransitionEnd);
  }

  toggleBtn.addEventListener("click", () => {
    const ball = toggleBtn.firstElementChild;
    ball.classList.add("transition");
    ball.addEventListener("transitioned", onBallTransitionEnd)

    if (toggleBtn.classList.contains("dark")) {
      localStorage.setItem(modeLocalStorageKey, 'light');
      setButtonToDark(toggleBtn, false);
      setDataTheme("light");
    } else {
      localStorage.setItem(modeLocalStorageKey, 'dark');
      setButtonToDark(toggleBtn, true)
      setDataTheme("dark");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  lightDarkMode();
})