/// <reference types="vite/client" />

declare module 'vuex' {
  export function useStore<S = unknown>(): import('vuex').Store<S>
  export function createStore<S>(options: import('vuex').StoreOptions<S>): import('vuex').Store<S>
  export * from 'vuex/types/index'
  export { default } from 'vuex/types/index'
}
