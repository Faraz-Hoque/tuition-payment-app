import { CalendarDays, Clock, Mail } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { formatCurrency, formatDate, formatDateRange } from '@/utils/format'
import { getDueStatus, getLessonStatus } from '@/utils/status'

// One card per teacher the student learns from. `enrollment` comes from studentApi.getEnrollments.
export default function TeacherCard({ enrollment }) {
  const { teacher, subject, monthlyFee, nextDueDate, lessonStart, lessonEnd, schedule } = enrollment
  const due = getDueStatus(nextDueDate)
  const lesson = getLessonStatus(lessonStart, lessonEnd)

  return (
    <article className={`teacher-card teacher-card--${due.tone}`}>
      <header className="teacher-card__head">
        <Avatar id={teacher.id} name={teacher.name} size="lg" />
        <div>
          <h3 className="teacher-card__name">{teacher.name}</h3>
          <p className="teacher-card__subject">{subject}</p>
        </div>
      </header>

      <div className="teacher-card__fee">
        <span className="teacher-card__amount">{formatCurrency(monthlyFee)}</span>
        <span className="teacher-card__per">/ month</span>
      </div>

      <dl className="teacher-card__facts">
        <div>
          <dt>Next due</dt>
          <dd>
            {formatDate(nextDueDate)} <Badge tone={due.tone}>{due.label}</Badge>
          </dd>
        </div>
        <div>
          <dt><CalendarDays aria-hidden="true" /> Lessons</dt>
          <dd>
            {formatDateRange(lessonStart, lessonEnd)} <Badge tone={lesson.tone}>{lesson.label}</Badge>
          </dd>
        </div>
        <div>
          <dt><Clock aria-hidden="true" /> Schedule</dt>
          <dd>{schedule}</dd>
        </div>
        <div>
          <dt><Mail aria-hidden="true" /> Contact</dt>
          <dd><a href={`mailto:${teacher.email}`}>{teacher.email}</a></dd>
        </div>
      </dl>

      {/* Future: a "Pay now" button goes here once payments are implemented. */}
    </article>
  )
}
