const state = {
  degree: '°C',
  lang: 'en',
};

const saveState = () => {
  localStorage.setItem('degree', state.degree);
};

const restoreState = () => {
  state.degree = localStorage.getItem('degree')
    ? localStorage.getItem('degree')
    : '°C';
};

export { state, saveState, restoreState };
