
// ------------------要素の取得------------------

const formLoginBtn = document.getElementById('js-login-btn');
// --------------要素の取得ここまで--------------


const avatarCollection = db.collection('avatars');

function randomNumber(start, end) {
  return Math.floor(Math.random()*(end-start+1)+start);
}


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

            const clickY = randomNumber(0, 500);
            const clickX = randomNumber(0, 500);
          
            localStorage.setItem('clientY', clickY);
            localStorage.setItem('clientX', clickX);
            localStorage.setItem('beforePointX', clickX);
            localStorage.setItem('beforePointY', clickY);

            // アバターデータの作成
            avatarCollection.doc(padInputCode).set({
              avatar_id: doc.data().student_id,
              avatar_name: doc.data().student_name,
              beforePointX: clickX,
              beforePointY: clickY,
              pointX: clickX,
              pointY: clickY,
              status: 0
            })
            .then(doc => {
              console.log(`avatar added!`);
              alert();
              window.location.href = '/js_ogawa_08/avatar/avatar_top.html';
            })
            .catch(error => {
              console.log('avatar add error!');
              console.log(error);
            });
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
