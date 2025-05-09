"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Timer, FileText, Edit, Trash2, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export default function UpcomingExams() {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await fetch("/api/exams?status=upcoming&role=teacher")
        if (response.ok) {
          const data = await response.json()
          setExams(data)
        } else {
          console.error("Failed to fetch exams")
        }
      } catch (error) {
        console.error("Error fetching exams:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExams()
  }, [])

  // Dummy data for demonstration - updated to match teacher input fields
  const dummyExams = [
    {
      id: 1,
      title: "2-р улирлын шалгалт",
      description: "Геометрийн үндсэн ойлголтууд, теоремууд",
      subject: "Математик",
      className: "10а анги",
      duration: 40,
      totalPoints: 100,
      examDate: "2025-12-10",
      examTime: "10:45",
      questions: Array(30).fill({}), // 30 questions
      assignedStudents: 30,
    },
    {
      id: 2,
      title: "Хагас жилийн шалгалт",
      description: "Хөдөлгөөний хуулиуд, хүчний тооцоолол",
      subject: "Физик",
      className: "7 анги",
      duration: 40,
      totalPoints: 75,
      examDate: "2025-12-15",
      examTime: "09:30",
      questions: Array(25).fill({}), // 25 questions
      assignedStudents: 28,
    },
    {
      id: 3,
      title: "Улирлын шалгалт",
      description: "Химийн элементүүд, атомын бүтэц",
      subject: "Хими",
      className: "9 анги",
      duration: 40,
      totalPoints: 80,
      examDate: "2025-12-20",
      examTime: "11:00",
      questions: Array(20).fill({}), // 20 questions
      assignedStudents: 25,
    },
  ]

  // Use dummy data if no exams are fetched
  const displayExams = exams.length > 0 ? exams : dummyExams

  const handleDeleteExam = (examId) => {
    if (confirm("Та энэ шалгалтыг устгахдаа итгэлтэй байна уу?")) {
      // Delete exam logic here
      console.log("Deleting exam:", examId)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Авах шалгалтууд</h1>
        <Link href="/teacher/exams/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Шалгалт үүсгэх
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : displayExams.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Авах шалгалт байхгүй байна.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">{exam.title}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">{exam.subject}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {exam.className} | {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-sm">
                      Огноо:
                      <div className="font-medium">{new Date(exam.examDate).toLocaleDateString("mn-MN")}</div>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={16} />
                    <span className="text-sm">
                      Эхлэх цаг:
                      <div className="font-medium">{exam.examTime}</div>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Timer className="text-gray-400" size={16} />
                    <span className="text-sm">
                      Хугацаа:
                      <div className="font-medium">{exam.duration} мин</div>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileText className="text-gray-400" size={16} />
                    <span className="text-sm">
                      Даалгавар:
                      <div className="font-medium">{exam.questions?.length || 0}</div>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 col-span-2">
                    <Users className="text-gray-400" size={16} />
                    <span className="text-sm">
                      Оролцогчид:
                      <div className="font-medium">{exam.assignedStudents} сурагч</div>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-2 bg-gray-50 border-t border-gray-200">
                <Link
                  href={`/teacher/exams/edit/${exam.id}`}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded-md"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDeleteExam(exam.id)}
                  className="text-red-600 hover:text-red-800 p-1 rounded-md ml-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
