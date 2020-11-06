// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const added_teacher_name = localStorage.getItem('added_teacher_name');
const loginName = document.getElementById('js-login-name');
const resultAdded = document.getElementById('result-added');
// --------------要素の取得ここまで--------------


// ログイン中の講師の名前を表示
loginName.textContent = teacher_name + '先生ログイン中';

// 結果メッセージの表示
resultAdded.textContent = added_teacher_name + '先生を登録しました。';