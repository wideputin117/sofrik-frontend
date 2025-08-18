let store;
export const injectStore = (_store: any) => {
    store = _store;
};
export { store };