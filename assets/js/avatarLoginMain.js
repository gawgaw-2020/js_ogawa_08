
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

    // 画像のプレリロード
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member100.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member101.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member102.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member103.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member104.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member105.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member106.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member107.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member108.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member109.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member110.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member111.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member112.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member113.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member114.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member115.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member116.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member117.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member118.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member119.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member120.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member121.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member122.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member123.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member124.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member125.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member126.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member127.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member128.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member129.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member130.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member131.svg" );
    $("<img>").attr("src", "/js_ogawa_08/assets/image/icon/member132.svg" );
