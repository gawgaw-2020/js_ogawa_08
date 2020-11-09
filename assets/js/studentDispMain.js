// ストレージにデータがなければログイン画面へ遷移
if (storage.teacher_id === undefined || storage.teacher_name === undefined) {
  window.location.href = '/js_ogawa_08/staff-login/staff_login.html';
}

// ------------------要素の取得------------------
const teacher_id = localStorage.getItem('teacher_id');
const teacher_name = localStorage.getItem('teacher_name');
const selected_student_id = localStorage.getItem('selected_student_id');

const loginName = document.getElementById('js-login-name');

const  selectedstudentId = document.getElementById('js-selected_student_id');
const  selectedstudentName01 = document.getElementById('js-selected_student_name01');
const  selectedstudentName02 = document.getElementById('js-selected_student_name02');
const  selectedstudentCourse = document.getElementById('js-selected_student_course');
const  selectedstudentFuture = document.getElementById('js-selected_student_future');
const  selectedstudentInfo = document.getElementById('js-selected_student_info');

// --------------要素の取得ここまで--------------

// 改行を含めた文字列に変える関数
const nl2br = function (str) {
    return str.replace(/\n/g, '<br>');
};

// ログイン中の講師の名前を表示
loginName.textContent = teacher_name + '先生ログイン中';

// 受講生コードを表示
selectedstudentId.textContent = selected_student_id;

// IDからドキュメントを取得、情報を表示
var docRef = db.collection("students").doc(selected_student_id);
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        selectedstudentName01.textContent = doc.data().student_name;
        selectedstudentName02.textContent = doc.data().student_name;
        selectedstudentCourse.textContent = doc.data().student_course;
        selectedstudentFuture.textContent = doc.data().student_future;
        selectedstudentInfo.innerHTML = nl2br(doc.data().student_info)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// 表示非表示

$('#js-student-data-list').hide();

$('#js-toggle-list').on('click', () => {
    $('#js-student-data-list').toggle();
    if ($('#js-student-data-list').css('display') == 'block') {
        $('#js-toggle-list').text('受講生の進捗情報を表示');
    } else {
        $('#js-toggle-list').text('受講生の詳細情報を表示');
    }
});


// ------------------要素の取得------------------

const form = document.querySelector('form');
const progress = document.getElementById('progress');
const progressList = document.getElementById('progress-list');

// --------------要素の取得ここまで--------------

// コレクションまでのパス
const progressCollection = db.collection('students/' + selected_student_id + '/progress');

// 現在日時の取得
// 今回は日付 例）9/17
function getTime() {
    const youbi = ["日","月","火","水","木","金","土"];
    const time = new Date();
    const progressDateTime = (time.getMonth() + 1) + "/" + time.getDate() + '(' + youbi[time.getDay()] + ')';
    return progressDateTime;

}

// 変更があったら'created'でソートして画面に表示
progressCollection.orderBy('created').onSnapshot(snapshot => {

    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
        const li = document.createElement('li');
        li.classList.add('progress-list__item');
        const d = change.doc.data();
        li.innerHTML = `<p class="progress-list__date">${d.progressDateTime}</p>
        <p class="progress-list__comment">${d.progress}</p>
        <p class="progress-list__written-by">${d.written_by}</p>`;
        progressList.insertBefore(li, progressList.children[0]);
        }
    });
});


// フォームを送信した時の処理
form.addEventListener('submit', e => {
    // 実行したい関数;
    console.log('hoge');

    // ページ遷移しないようにする
    e.preventDefault();

    let val = progress.value.trim();

    // 空文字だったら処理を止める
    if (val === '') {
        return;
    }

    // ボックスを空にしてフォーカスを当てる
    progress.value = '';
    progress.focus();

    // データの保存
    progressCollection.add({
        progress: val,
        written_by: teacher_name,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        progressDateTime: getTime()
    })
    .then(doc => {
        console.log(`通常メッセージ added!`);
    })
    .catch(error => {
        console.log('document add error!');
        console.log(error);
    });
});
