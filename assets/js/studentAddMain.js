// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const loginName = document.getElementById('js-login-name');
const addBtn = document.getElementById('js-add-btn');
// --------------要素の取得ここまで--------------


// ログイン中の講師の名前を表示
loginName.textContent = teacher_name + '先生ログイン中';


// 登録するボタンクリックしたら
addBtn.addEventListener('click', () => {

  // 入力内容取得
  const inputCode = document.getElementById('js-input-code').value;
  const inputName = document.getElementById('js-input-name').value;
  const inputCourse = document.getElementById('js-input-course').value;
  const inputPassword = document.getElementById('js-input-password').value;
  const inputPassword2 = document.getElementById('js-input-password2').value;
  const inputInfo = document.getElementById('js-input-info').value;
  const inputFuture = document.getElementById('js-input-future').value;

  console.log(inputFuture);
  // 空だった時のバリデーション
  if (!inputCode || !inputName || !inputPassword || !inputPassword2 || !inputFuture) {
    alert('どっちかが空です');
    return;
  }

  // 3桁にゼロ埋め
  padInputCode = inputCode.padStart(3, "0");
  
  // 入力パスワード不一致のバリデーション
  if (inputPassword !== inputPassword2) {
    alert('パスワードが一致しません');
  }

  // コードが使われているかチェック
  var docRef = db.collection("students").doc(padInputCode);
  docRef.get().then(function(doc) {
      if (doc.exists) {
        alert('そのコードはすでに使われています');
      } else {
        // 入力内容を登録
        db.collection("students").doc(padInputCode).set({
          student_id: padInputCode,
          student_name: inputName,
          password: inputPassword,
          student_course: inputCourse,
          student_info: inputInfo,
          student_future: inputFuture
        })
        .then(function(docRef) {
          localStorage.setItem('added_student_name', inputName);
          window.location.href = '/js_ogawa_08/student/student_add_done.html';
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
});