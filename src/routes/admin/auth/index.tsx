import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/auth/"!</div>
}
