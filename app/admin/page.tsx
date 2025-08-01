import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'

export default async function AdminPage() {

  if (!checkRole('admin')) {
    redirect('/')
  } 

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Your admin form or content here */}
    </div>
  );
}