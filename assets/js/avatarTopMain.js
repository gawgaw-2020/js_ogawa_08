// ストレージにデータがなければログイン画面へ遷移
if (storage.student_id === undefined || storage.student_name === undefined) {
  window.location.href = '/js_ogawa_08/avatar/avatar_login.html';
}

// 要素の取得

const avatarCollection = db.collection('avatars');
const field = document.getElementById('field');

// 変更があったら'created'でソートして画面に表示
avatarCollection.onSnapshot(snapshot => {
  
  snapshot.docChanges().forEach(change => {
    // if (change.type === 'removed') {
    // }
    
    if (change.type === 'added') {
      const div = document.createElement('div');
      const d = change.doc.data();
      div.setAttribute('id', change.doc.id);
      div.setAttribute('style', 'top: ' + d.pointY + 'px; left: ' + d.pointX + 'px;');
      div.classList.add('avatar');

      div.innerHTML = `<p class="avatar__image"><img src="/js_ogawa_08/assets/image/member${d.avatar_id}.png" alt=""></p>
      <p class="avatar__name">${d.avatar_name}</p>`;

      field.appendChild(div);
    }
  });
});