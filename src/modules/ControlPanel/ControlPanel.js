class ControlPanel {
  constructor({ id }) {
    this.id = id;
  }

  render() {
    return `
    <section class="control-panel" id="${this.id}">
      <div class="settings-buttons">
        <button class="button button-update">
          <div class="spinner"></div>
        </button>
        <div class="language-bar">
          <button id="en" class="button language-item active">en</button>
          <button id="ru" class="button language-item">ru</button>
          <button id="be" class="button language-item">be</button>
        </div>
        <div class="degrees">
          <button id="fahrenheit" class="button degree-item">°F</button>
          <button id="celsius" class="button degree-item active">°C</button>
        </div>
      </div>
      <form id="search-form" class="search-block">
        <input class="search-input" type="search" name="search-city" required="" data-i18n="placeholder">
        <button class="button search-btn" id="search" type="submit" data-i18n="search"></button>
      </div>
    </section>
    `;
  }
}

export { ControlPanel };
