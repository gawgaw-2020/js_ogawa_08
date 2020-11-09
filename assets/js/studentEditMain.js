// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const selected_student_id = localStorage.getItem('selected_student_id');

const loginName = document.getElementById('js-login-name');

const selectedstudentId = document.getElementById('js-selected_student_id');

const editBtn = document.getElementById('js-edit-btn');


// --------------要素の取得ここまで--------------

// ログイン中の講師の名前を表示
loginName.textContent = teacher_name + '先生ログイン中';

// 従個性コードを表示
selectedstudentId.textContent = selected_student_id;

// 名前を表示
var docRef = db.collection("students").doc(selected_student_id);
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().student_name);
        document.getElementById('js-input-name').value = doc.data().student_name;
        document.getElementById('js-input-info').value = doc.data().student_info;
        document.getElementById('js-input-course').value = doc.data().student_course;
        document.getElementById('js-input-future').value = doc.data().student_future;
        if (doc.data().student_info === undefined) {
          document.getElementById('js-input-info').value = '';
        }
        if (doc.data().student_course === undefined) {
          document.getElementById('js-input-course').value = '';
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// 登録するボタンクリックしたら
editBtn.addEventListener('click', () => {

  const inputName = document.getElementById('js-input-name').value;
  const inputCourse = document.getElementById('js-input-course').value;
  const inputPassword = document.getElementById('js-input-password').value;
  const inputPassword2 = document.getElementById('js-input-password2').value;
  const inputFuture = document.getElementById('js-input-future').value;
  const inputInfo = document.getElementById('js-input-info').value;
  
  // 空だった時のバリデーション
  if (!inputName || !inputPassword || !inputPassword2) {
    alert('どっちかが空です');
    return;
  }

  // 入力パスワード不一致のバリデーション
  if (inputPassword !== inputPassword2) {
    alert('パスワードが一致しません');
    return;
  }

  db.collection("students").doc(selected_student_id).set({
    student_id: selected_student_id,
    student_name: inputName,
    student_course: inputCourse,
    password: inputPassword,
    student_future: inputFuture,
    student_info: inputInfo
  })
  .then(function(docRef) {
    localStorage.setItem('added_student_name', inputName);
    window.location.href = '/js_ogawa_08/student/student_edit_done.html';
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });

});

