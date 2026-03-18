// Compatibility shim: allows existing MDX files that import from 'nextra/components'
// to resolve without changes. These re-export our custom replacement components.

export { Callout } from '../app/_components/callout'
export { Steps } from '../app/_components/steps'

// Tabs is imported but not actually used in any MDX content
export function Tabs({ children }: { children: React.ReactNode }) {
  return children
}
