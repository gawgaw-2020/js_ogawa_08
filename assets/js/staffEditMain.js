// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const selected_teacher_id = localStorage.getItem('selected_teacher_id');

const loginName = document.getElementById('js-login-name');

const selectedTeacherId = document.getElementById('js-selected_teacher_id');

const editBtn = document.getElementById('js-edit-btn');


// --------------要素の取得ここまで--------------

let selected_teacher_name;

// ログイン中の講師の名前を表示
loginName.textContent = teacher_name + '先生ログイン中';

// 講師コードを表示
selectedTeacherId.textContent = selected_teacher_id;

// 名前を表示
var docRef = db.collection("teachers").doc(selected_teacher_id);
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().teacher_name);
        document.getElementById('js-input-name').value = doc.data().teacher_name;
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
  const inputPassword = document.getElementById('js-input-password').value;
  const inputPassword2 = document.getElementById('js-input-password2').value;
  
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

  db.collection("teachers").doc(selected_teacher_id).set({
    teacher_id: selected_teacher_id,
    teacher_name: inputName,
    password: inputPassword
  })
  .then(function(docRef) {
    localStorage.setItem('added_teacher_name', inputName);
    window.location.href = '/js_ogawa_08/staff/staff_edit_done.html';
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });

});

