import { useState } from "react";
import StudentList from "./components/StudentList";
import "./App.css";

const App = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Nguyen Van A",
            score: 8.5,
            class: "B25DCCN01"
        },
        {
            id: 2,
            name: "Tran Thi B",
            score: 6.5,
            class: "B25DCCN02"
        },
        {
            id: 3,
            name: "Le Van C",
            score: 4,
            class: "B25DCCN01"
        }
    ]);

    const [filter, setFilter] = useState("all");

    const [form, setForm] = useState({
        name: "",
        score: "",
        class: ""
    });

    const [error, setError] = useState("");

    // Xử lý nhập dữ liệu
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    // Thêm sinh viên
    const handleAddStudent = (e) => {
        e.preventDefault();

        const { name, score, class: studentClass } = form;

        if (!name.trim() || !studentClass.trim() || score === "") {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const numberScore = Number(score);

        if (numberScore < 0 || numberScore > 10) {
            setError("Điểm phải nằm trong khoảng từ 0 đến 10!");
            return;
        }

        const newStudent = {
            id: Date.now(),
            name: name.trim(),
            score: numberScore,
            class: studentClass.trim()
        };

        setStudents([...students, newStudent]);

        setForm({
            name: "",
            score: "",
            class: ""
        });

        setError("");
    };

    // Xóa sinh viên
    const handleDeleteStudent = (id) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    // Lọc sinh viên
    const filteredStudents = students.filter((student) => {
        if (filter === "good") {
            return student.score >= 8;
        }

        if (filter === "fail") {
            return student.score < 5;
        }

        return true;
    });

    // Tính điểm trung bình
    const averageScore =
        students.length > 0
            ? students.reduce((total, student) => total + student.score, 0) /
              students.length
            : 0;

    return (
        <div className="container">
            <h1>Quản lý Điểm Sinh viên</h1>

            {/* Form thêm sinh viên */}
            <div className="form-box">
                <h2>Thêm sinh viên</h2>

                <form onSubmit={handleAddStudent}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Họ tên"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="score"
                        placeholder="Điểm số"
                        value={form.score}
                        onChange={handleChange}
                        step="0.1"
                    />

                    <input
                        type="text"
                        name="class"
                        placeholder="Lớp"
                        value={form.class}
                        onChange={handleChange}
                    />

                    <button type="submit">Thêm sinh viên</button>
                </form>

                {error && <p className="error">{error}</p>}
            </div>

            {/* Bộ lọc */}
            <div className="filter-box">
                <button onClick={() => setFilter("all")}>
                    Tất cả
                </button>

                <button onClick={() => setFilter("good")}>
                    Sinh viên Giỏi
                </button>

                <button onClick={() => setFilter("fail")}>
                    Sinh viên trượt
                </button>
            </div>

            {/* Thống kê */}
            <div className="statistics">
                <p>
                    Tổng số sinh viên: <strong>{students.length}</strong>
                </p>

                <p>
                    Điểm trung bình:{" "}
                    <strong>{averageScore.toFixed(2)}</strong>
                </p>

                <p>
                    Đang hiển thị:{" "}
                    <strong>{filteredStudents.length}</strong>
                </p>
            </div>

            {/* Danh sách */}
            <StudentList
                students={filteredStudents}
                onDelete={handleDeleteStudent}
            />
        </div>
    );
};

export default App;