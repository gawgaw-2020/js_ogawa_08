// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const teacherList = document.getElementById('js-teacher-list');
// --------------要素の取得ここまで--------------

// 全件取得して表示
db.collection("teachers").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    const li = document.createElement('li');
    const d = doc.data();
    li.innerHTML = `${d.teacher_id}：${d.teacher_name}`;
    teacherList.appendChild(li);
  });
});
