// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const loginName = document.getElementById('js-login-name');
const studentList = document.getElementById('js-student-list');
const studentAdd = document.getElementById('js-student-add');
const studentDisp = document.getElementById('js-student-disp');
const studentEdit = document.getElementById('js-student-edit');
const studentDelete = document.getElementById('js-student-delete');
// --------------要素の取得ここまで--------------

// ログイン中の講師の名前を表示
loginName.textContent = teacher_name + '先生ログイン中';

// 全件取得して表示
db.collection("students").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    const tr = document.createElement('tr');
    const d = doc.data();
    tr.innerHTML = `<td class="staff-table__tbody-item1"><input id="student${d.student_id}" type="radio" name="studentcode" value="${d.student_id}"></td>` + `<td class="staff-table__tbody-item2"><label for=student"${d.student_id}">${d.student_id}</label></td>` + `<td class="staff-table__tbody-item3"><label for="student${d.student_id}">${d.student_name}</label></td>`;
    studentList.appendChild(tr);
  });
});


// 新規登録ボタン押した処理
studentAdd.addEventListener('click', () => {
  window.location.href = '/js_ogawa_08/student/student_add.html';
});


// 参照ボタン押した処理
studentDisp.addEventListener('click', () => {
    // 要素を取得
  var elements = document.getElementsByName( "studentcode" ) ;

  // 選択状態の値を取得
  for ( var selected_student_id = "", i = elements.length; i--; ) {
    if ( elements[i].checked ) {
      var selected_student_id = elements[i].value ;
      break ;
    }
  }

  if ( selected_student_id === "" ) {
    // 何も選択されていなかった場合
    window.location.href = '/js_ogawa_08/student/student_ng.html';
  } else {
    // 選択状態の値が代入されている場合
    localStorage.setItem('selected_student_id', selected_student_id);
    window.location.href = '/js_ogawa_08/student/student_disp.html';
  }
});


// 修正ボタン押した処理
studentEdit.addEventListener('click', () => {
  // 要素を取得
  var elements = document.getElementsByName( "studentcode" ) ;

  // 選択状態の値を取得
  for ( var selected_student_id = "", i = elements.length; i--; ) {
    if ( elements[i].checked ) {
      var selected_student_id = elements[i].value ;
      break ;
    }
  }

  if ( selected_student_id === "" ) {
    // 何も選択されていなかった場合
    window.location.href = '/js_ogawa_08/student/student_ng.html';
  } else {
    // 選択状態の値が代入されている場合
    localStorage.setItem('selected_student_id', selected_student_id);
    window.location.href = '/js_ogawa_08/student/student_edit.html';
  }
  
});


// 削除ボタン押した処理
studentDelete.addEventListener('click', () => {
  // 要素を取得
var elements = document.getElementsByName( "studentcode" ) ;

// 選択状態の値を取得
for ( var selected_student_id = "", i = elements.length; i--; ) {
	if ( elements[i].checked ) {
		var selected_student_id = elements[i].value ;
		break ;
	}
}

if ( selected_student_id === "" ) {
  // 何も選択されていなかった場合
  window.location.href = '/js_ogawa_08/student/student_ng.html';
} else {
	// 選択状態の値が代入されている場合
  localStorage.setItem('selected_student_id', selected_teacher_id);
  window.location.href = '/js_ogawa_08/student/student_delete_check.html';
}
});