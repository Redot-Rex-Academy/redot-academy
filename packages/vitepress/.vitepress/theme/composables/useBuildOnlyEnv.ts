export default async () => {
  const isBuild = import.meta.env.NODE_ENV === 'production'

  if (isBuild) {
    return await import(process.cwd() + '/packages/vitepress/.build.config.ts')
  }

  return {
    
  }
}
