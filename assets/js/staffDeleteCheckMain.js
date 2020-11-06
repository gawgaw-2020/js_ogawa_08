// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const selected_teacher_id = localStorage.getItem('selected_teacher_id');
const loginName = document.getElementById('js-login-name');

const  selectedTeacherId = document.getElementById('js-selected_teacher_id');
const  selectedTeacherName = document.getElementById('js-selected_teacher_name');

const deleteBtn = document.getElementById('js-delete-btn');
// --------------要素の取得ここまで--------------

let selected_teacher_name;

// ログイン中の講師の名前を表示
loginName.textContent = teacher_name + '先生ログイン中';

// 講師コードを表示
selectedTeacherId.textContent = selected_teacher_id;

// IDからドキュメントを取得、名前を表示
var docRef = db.collection("teachers").doc(selected_teacher_id);
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        selected_teacher_name = doc.data().teacher_name;
        selectedTeacherName.textContent = selected_teacher_name;
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// 削除ボタン押した時の処理
deleteBtn.addEventListener('click', () => {
  // コードが使われているかチェック
  var docRef = db.collection("teachers").doc(selected_teacher_id);
  docRef.get().then(function(doc) {
      if (doc.exists) {
        db.collection("teachers").doc(selected_teacher_id).delete().then(function() {
          console.log("Document successfully deleted!");
          window.location.href = '/js_ogawa_08/staff/staff_delete_done.html';
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      } else {
        alert('選択エラーです。講師一覧ページに戻ります。');
        window.location.href = '/js_ogawa_08/staff/staff_list.html';
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
});