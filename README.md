# TH02 – Rung chuông vàng (ReactJS)

## Cấu trúc thư mục

```text
rungchuong/
├── public/
│   └── data/
│       └── questions.json
└── src/
    ├── index.js
    ├── App.js
    ├── App.css
    ├── data.js
    ├── utils.js
    ├── components/
    │   ├── Layout.js
    │   ├── NavBar.js
    │   ├── QuestionCard.js
    │   ├── AnswerButton.js
    │   ├── Timer.js
    │   ├── ScoreBoard.js
    │   └── Helpers.js
    └── pages/
        ├── Home.js
        ├── Play.js
        ├── Result.js
        ├── History.js
        ├── QuestionBank.js
        ├── QuestionDetail.js
        └── NotFound.js
```

## Phân chia theo 3 bài trong đề

### Bài 1 – Giao diện và ngân hàng câu hỏi
- `index.js`: cấu hình `BrowserRouter`.
- `App.js`: state `questions`, `loading`, `error`, `playerName`, `history`; tải JSON bằng Axios; cấu hình Router.
- `components/Layout.js`, `components/NavBar.js`: bố cục và menu.
- `pages/Home.js`, `pages/QuestionBank.js`, `pages/QuestionDetail.js`, `pages/NotFound.js`.
- `public/data/questions.json`: 15 câu hỏi.
- `QuestionBank.js`: lọc theo chủ đề và tìm kiếm bằng hàm `handleTermShift`.

### Bài 2 – Trò chơi, thời gian và kết quả
- `pages/Play.js`: hiển thị câu hỏi, chọn đáp án, đếm ngược 20 giây, tính điểm, xử lý trả lời sai/hết giờ.
- `components/QuestionCard.js`, `AnswerButton.js`, `Timer.js`, `ScoreBoard.js`.
- `pages/Result.js`: hiển thị điểm và danh hiệu.
- `utils.js`: `calcScore()` và `getRank()`.

### Bài 3 – Trợ giúp, phím tắt và lịch sử
- `components/Helpers.js`: loại một đáp án, thêm 15 giây, phao cứu sinh.
- `pages/Play.js`: phím tắt 1–4 và áp dụng quyền trợ giúp.
- `pages/History.js`: lịch sử, điểm cao nhất và điểm trung bình.
- `App.js`: lưu lịch sử bằng `localStorage`.

## Chạy chương trình

Cần cài Node.js LTS. Mở Terminal ở thư mục này và chạy:

```bash
npm install
npm install axios react-router-dom@6
npm start
```

Ứng dụng chạy ở `http://localhost:3000`.

## Commit theo từng bài trên nhánh TH02

Nên commit sau khi hoàn thành từng phần:
```bash
git checkout -b TH02
# Sau khi làm xong Bài 1:
git add .
git commit -m "Bai 1 - Giao dien va ngan hang cau hoi"

# Sau khi làm xong Bài 2:
git add .
git commit -m "Bai 2 - Tro choi va ket qua"

# Sau khi làm xong Bài 3:
git add .
git commit -m "Bai 3 - Tro giup va lich su"
git push -u origin TH02
```

Các lệnh commit trên là hướng dẫn quy trình; hãy chạy `git add` và `git commit` ở đúng thời điểm sau khi hoàn thành từng bài. Nếu bạn đã có repository thì không cần tạo repository mới.
