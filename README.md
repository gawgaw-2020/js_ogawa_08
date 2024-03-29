# はじめに

社会人向けの受講生の管理システムを製作しました。

製作期間：14日

【受講生管理システム】  

<img width="51%" alt="スクリーンショット 2020-11-14 6 49 44" src="https://user-images.githubusercontent.com/70194652/99124918-6c365b80-2646-11eb-8dc7-592ddc1bd82d.png">
<img width="51%" alt="スクリーンショット 2020-11-14 6 50 02" src="https://user-images.githubusercontent.com/70194652/99125066-b586ab00-2646-11eb-81d4-85c33cb1b557.png">
<img width="51%" alt="スクリーンショット 2020-11-14 6 50 16" src="https://user-images.githubusercontent.com/70194652/99125077-b9b2c880-2646-11eb-8f3d-e7f569d84231.png">



また、そのデータを用いて、授業中の個別指導をもっとスムーズにできるようなアプリを作成しました。  
【バーチャル教室】
<img width="51%" alt="スクリーンショット 2020-11-14 7 00 43" src="https://user-images.githubusercontent.com/70194652/99125383-43fb2c80-2647-11eb-82be-a11dbe31f78f.png">


# 機能概要

1つめが、受講生の情報(名前、選択したコース、受講前の情報など)か確認できます。
主な用途としては、受講生の進捗の共有です。
* 情報の登録・更新・参照・削除
* 受講生の進捗の登録

2つめが、その登録された受講生の情報を用いてログインできるアプリです。
授業中の「理解した」「ヘルプ」などが全員で共有できるようになっています。
* ログイン・ログアウト
* クリックした場所に移動
* 状態の管理とアイコンの変化
* 右から左に流れるコメント機能


# 製作の経緯

受講生管理システムは、当初自分が通うスクールからでのチャレンジ依頼でした。最初にPHPで作成した後、Firebaseで作り変えを行い、リアルタイムデータベースを用いてバーチャル教室を作成しました。

Zoomでの講義や、大きな教室での講義で、「全員の進捗状況を把握するの大変そうだな」と感じたのがきっかけです。（Slackでのスタンプや、Zoomでの「拍手・挙手」だと一目でわかりにくいと感じた）


# バーチャル教室で工夫した点

バーチャル教室のクリックした場所に移動するJavaScript（物体の移動の概念の把握）が難しかったです。全体のUIと背景がシンプルすぎたので、そこは反省点です。

* クリックした場所にアニメーションするのですが、リアルタイムで他のデバイスと同期させた事
* 画面内が盛り上がるように実装したコメント欄



