declare global {
  namespace NodeJS {
    interface Global {
      hashResources: Record<string, any[]>;
    }
  }
}
