import { useState } from "react"
import { Button } from "@/components/ui/button"
import SelectCmp from "@/CustomComponent/SelectCmp"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const Gradebook = () => {
    const courses = ["Web Development", "Graphic Designing", "Digital Marketing"]

    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [assignments, setAssignments] = useState([
        {
            subject: "Web Development",
            months: {
                June: {
                    marks: 85,
                    total: "A"
                },
                July: {
                    marks: 90,
                    total: "A"
                }
            }
        },
        {
            subject: "Graphic Designing",
            months: {
                June: {
                    marks: 78,
                    total: "B+"
                },
                July: {
                    marks: 82,
                    total: "A-"
                }
            }
        },
        {
            subject: "Digital Marketing",
            months: {
                June: {
                    marks: 92,
                    total: "A"
                },
                July: {
                    marks: 88,
                    total: "A"
                }
            }
        }
    ])

    const [filteredAssignments, setFilteredAssignments] = useState(assignments)

    const handleFilter = () => {
        const filtered = assignments.filter(
            (assignment) =>
                (selectedCourse === "" || assignment.subject === selectedCourse) &&
                (selectedMonth === "" || assignment.months[selectedMonth])
        )
        setFilteredAssignments(filtered)
    }

    const handleRemoveFilter = () => {
        setSelectedCourse("")
        setSelectedMonth("")
        setFilteredAssignments(assignments)
    }

    const monthsOrder = ["July", "June"] // Last month first

    return (
        <div>
            <p className="text-xl py-4 mb-8 pl-6 rounded-lg font-semibold bg-acewall-main text-white">Grades</p>
            <div className="flex gap-4 w-full mb-6">
                <SelectCmp
                    data={courses}
                    title="Course"
                    value={selectedCourse}
                    onChange={(value) => setSelectedCourse(value)}
                />
                <SelectCmp
                    data={monthsOrder}
                    title="Month"
                    value={selectedMonth}
                    onChange={(value) => setSelectedMonth(value)}
                />
                <Button className="bg-green-600" onClick={handleFilter}>Filter</Button>
                <Button variant="outline" onClick={handleRemoveFilter}>Remove filter</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Month</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Grade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAssignments.map((assignment) => (
                        monthsOrder.map((month) => (
                            (selectedMonth === "" || selectedMonth === month) && (
                                assignment.months[month] && (
                                    <TableRow key={`${assignment.subject}-${month}`}>
                                        <TableCell>{assignment.subject}</TableCell>
                                        <TableCell>{month}</TableCell>
                                        <TableCell>{assignment.months[month].marks}</TableCell>
                                        <TableCell>{assignment.months[month].total}</TableCell>
                                    </TableRow>
                                )
                            )
                        ))
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Gradebook
