function loadExcelFile() {
    // 파일 업로드 완료 시 요일 선택 섹션 표시
    const daySection = document.getElementById('day-select-section');
    daySection.style.display = 'block';

    // 파일 업로드 섹션 숨김
    const fileUploadSection = document.getElementById('file-upload-section');
    fileUploadSection.style.display = 'none';
}

function loadDayData() {
    // 학번 입력 섹션 표시
    const studentSection = document.getElementById('student-input-section');
    studentSection.style.display = 'flex';

    // 요일 선택 섹션 숨김
    const daySection = document.getElementById('day-select-section');
    daySection.style.display = 'none';
}

function checkAttendance() {
    const studentId = document.getElementById('student-id').value.trim();
    const resultElement = document.getElementById('result');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');

    // 학번 입력 여부 확인
    if (!studentId) {
        resultElement.textContent = "승인 실패! 학번을 입력해주세요.";
        resultElement.style.color = "#f44336"; // 실패 메시지는 빨간색으로 표시
        wrongSound.pause(); // 재생 중인 오디오 중지
        wrongSound.currentTime = 0; // 재생 위치 초기화
        wrongSound.play().catch((err) => {
            console.error("오디오 재생 오류:", err);
        }); // 실패 효과음 재생
        return;
    }

    // 승인 성공 메시지 표시
    resultElement.textContent = "승인 성공!";
    resultElement.style.color = "#4caf50"; // 성공 메시지는 초록색으로 표시
    correctSound.pause(); // 재생 중인 오디오 중지
    correctSound.currentTime = 0; // 재생 위치 초기화
    correctSound.play().catch((err) => {
        console.error("오디오 재생 오류:", err);
    }); // 성공 효과음 재생

    // 파일 다운로드 버튼 표시
    const downloadSection = document.getElementById('download-section');
    downloadSection.style.display = 'flex';
}

function downloadExcel() {
    // 다운로드 처리 로직
    const data = [
        ["학번", "출석 상태"],
        ["11209", "O"],
        ["11210", "X"]
    ];

    const csvContent = data.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "출석체크결과.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}