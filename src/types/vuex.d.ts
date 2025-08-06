declare module 'vuex' {
  import { Store, useStore as _useStore } from 'vuex/types/index'
  export * from 'vuex/types/index'
  export { Store }
  export const useStore: typeof _useStore
  export { default } from 'vuex/types/index'
}
