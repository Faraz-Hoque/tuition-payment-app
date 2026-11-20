import PageHeader from '@/components/ui/PageHeader'
import QueryState from '@/components/ui/QueryState'
import { useAuth } from '@/features/auth/AuthContext'
import { useStudentEnrollments } from '@/services/queries'
import TeacherCard from '../components/TeacherCard'

export default function MyTeachers() {
  const { user } = useAuth()
  const enrollments = useStudentEnrollments(user.id)

  return (
    <>
      <PageHeader title="My teachers" description="Fees, due dates and lesson periods for each of your teachers." />
      <QueryState queries={enrollments}>
        {() => (
          <div className="card-grid">
            {enrollments.data.map((e) => (
              <TeacherCard key={e.id} enrollment={e} />
            ))}
          </div>
        )}
      </QueryState>
    </>
  )
}
