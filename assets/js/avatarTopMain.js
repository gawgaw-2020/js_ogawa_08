// ストレージにデータがなければログイン画面へ遷移
if (storage.student_id === undefined || storage.student_name === undefined) {
  window.location.href = '/js_ogawa_08/avatar/avatar_login.html';
}

// ------------------要素の取得------------------
// ローカルストレージ
const student_id = localStorage.getItem('student_id');
const student_name = localStorage.getItem('student_name');

// DOM取得
const field = document.getElementById('field');

// データベース
const avatarCollection = db.collection('avatars');
const commentsCollection = db.collection('comments');
// --------------要素の取得ここまで--------------

// 変更を監視
avatarCollection.onSnapshot(snapshot => {
  
  snapshot.docChanges().forEach(change => {
    // 削除されたら（ログアウトしたら）アバター削除
    if (change.type === 'removed') {
      const deleteEle = document.getElementById(change.doc.id);
      deleteEle.remove();
    }
    
    // 追加されたら画面に表示
    if (change.type === 'added') {
      const div = document.createElement('div');
      const d = change.doc.data();
      div.setAttribute('id', change.doc.id);
      div.style.left = d.pointX + 'px';
      div.style.top = d.pointY + 'px';
      div.classList.add('avatar');
      div.innerHTML = `<p class="avatar__image"><img src="/js_ogawa_08/assets/image/member${d.avatar_id}.png" alt=""></p>
      <p class="avatar__name">${d.avatar_name}</p>`;

      field.appendChild(div);
    }

    // 上書きしたら画面に表示
    if (change.type === "modified") {
      const el = document.getElementById(change.doc.id);
      el.remove();
      const div = document.createElement('div');
      const d = change.doc.data();
      div.setAttribute('id', change.doc.id);
      div.style.left = d.pointX + 'px';
      div.style.top = d.pointY + 'px';
      div.classList.add('avatar');

      if (d.status === 1) {
        div.classList.add('working');
      }
      if (d.status === 2) {
        div.classList.add('ok');
      }
      if (d.status === 3) {
        div.classList.add('another');
      }
      if (d.status === 4) {
        div.classList.add('help');
      }

      div.innerHTML = `<p class="avatar__image"><img src="/js_ogawa_08/assets/image/member${d.avatar_id}.png" alt=""></p>
      <p class="avatar__name">${d.avatar_name}</p>`;

      field.appendChild(div);
    }
  });
});


// 画面クリックでその場所に移動する
field.addEventListener('click', (e) => {
  const clickY = e.clientY;
  const clickX = e.clientX;
  const status = localStorage.getItem('status');

  const numStatus = Number(status);

  localStorage.setItem('clientY', clickY);
  localStorage.setItem('clientX', clickX);

  // アバターのデータを上書き
  avatarCollection.doc(student_id).set({
    avatar_id: student_id,
    avatar_name: student_name,
    pointX: clickX,
    pointY: clickY,
    status: numStatus
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
});

// ステータスボタン処理
document.getElementById('working_btn').addEventListener('click', () => {

  localStorage.setItem('status', 1);

  // アバターのデータを上書き
  avatarCollection.doc(student_id).set({
    avatar_id: student_id,
    avatar_name: student_name,
    pointX: localStorage.getItem('clientX'),
    pointY: localStorage.getItem('clientY'),
    status: 1
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });  
});

document.getElementById('ok_btn').addEventListener('click', () => {

  localStorage.setItem('status', 2);

  // アバターのデータを上書き
  avatarCollection.doc(student_id).set({
    avatar_id: student_id,
    avatar_name: student_name,
    pointX: localStorage.getItem('clientX'),
    pointY: localStorage.getItem('clientY'),
    status: 2
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });  
});


document.getElementById('another_btn').addEventListener('click', () => {

  localStorage.setItem('status', 3);

  // アバターのデータを上書き
  avatarCollection.doc(student_id).set({
    avatar_id: student_id,
    avatar_name: student_name,
    pointX: localStorage.getItem('clientX'),
    pointY: localStorage.getItem('clientY'),
    status: 3
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });  
});


document.getElementById('help_btn').addEventListener('click', () => {

  localStorage.setItem('status', 4);

  // アバターのデータを上書き
  avatarCollection.doc(student_id).set({
    avatar_id: student_id,
    avatar_name: student_name,
    pointX: localStorage.getItem('clientX'),
    pointY: localStorage.getItem('clientY'),
    status: 4
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });  
});

// ブラウザバック禁止
history.pushState(null, null, location.href);
window.addEventListener('popstate', (e) => {
  history.go(1);
});


// ログアウト処理
document.getElementById('logout').addEventListener('click', () => {
  db.collection("avatars").doc(student_id).delete().then(function() {
    console.log("Document successfully deleted!");
    localStorage.clear();
    window.location.href = '/js_ogawa_08/avatar/avatar_login.html';
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
});