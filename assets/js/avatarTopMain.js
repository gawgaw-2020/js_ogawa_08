// ストレージにデータがなければログイン画面へ遷移
if (storage.student_id === undefined || storage.student_name === undefined) {
  window.location.href = '/js_ogawa_08/avatar/avatar_login.html';
}
