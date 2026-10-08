const StudentItem = ({ student, onDelete }) => {
    const { id, name, score, class: studentClass } = student;

    const getRank = () => {
        if (score >= 8) {
            return "Giỏi";
        }

        if (score >= 5) {
            return "Đạt";
        }

        return "Trượt";
    };

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{score}</td>
            <td>{studentClass}</td>
            <td>{getRank()}</td>
            <td>
                <button
                    className="delete-btn"
                    onClick={() => onDelete(id)}
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
};

export default StudentItem;