
// ------------------要素の取得------------------
const formLoginBtn = document.getElementById('js-login-btn');
// --------------要素の取得ここまで--------------
formLoginBtn.addEventListener('click', function() {
  // inputタグのところにユーザが入力した値を取得
  const inputLoginId = document.getElementById('js-input-login-id').value;
  const inputLoginPassword = document.getElementById('js-input-login-password').value;
  
  // 空だった時のバリデーション
  if (!inputLoginId || !inputLoginPassword) {
    alert('どっちかが空です');
    return;
  }

  // 3桁にゼロ埋め
  padInputCode = inputLoginId.padStart(3, "0");
  console.log(padInputCode);

  // データが存在するかチェック
  var docRef = db.collection("students").doc(padInputCode);
  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          // そのデータのパスワードが合っているかチェック
          if (doc.data().password === inputLoginPassword) {
            console.log('ログイン成功');
            localStorage.setItem('student_id', doc.data().student_id);
            localStorage.setItem('student_name', doc.data().student_name);
            window.location.href = '/js_ogawa_08/avatar/avatar_top.html';
          } else {
            alert('パスワードが違います');
          }
      } else {
          // doc.data() will be undefined in this case
          alert('受講生コードが登録されていません');
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
});
