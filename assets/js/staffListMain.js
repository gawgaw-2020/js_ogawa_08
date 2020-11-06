// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const loginName = document.getElementById('js-login-name');
const teacherList = document.getElementById('js-teacher-list');
// --------------要素の取得ここまで--------------


// ログイン中の講師の名前を表示
loginName.textContent = teacher_name + '先生ログイン中';

// 全件取得して表示テスト
db.collection("teachers").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    const tr = document.createElement('tr');
    const d = doc.data();
    tr.innerHTML = `<td class="staff-table__tbody-item1"><input id="${d.teacher_id}" type="radio" name="staffcode" value="${d.teacher_id}"></td>` + `<td class="staff-table__tbody-item2"><label for="${d.teacher_id}">${d.teacher_id}</label></td>` + `<td class="staff-table__tbody-item3"><label for="${d.teacher_id}">${d.teacher_name}</label></td>`;
    teacherList.appendChild(tr);
  });
});

