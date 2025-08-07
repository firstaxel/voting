import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(platform)/admin/approval/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/approval/"!</div>
}
