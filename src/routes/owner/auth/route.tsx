import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <main className='pt-[80px]'>
    <Outlet />
  </main>
}
