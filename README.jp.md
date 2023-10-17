# xj-homemade-components

[中文](README.md) | [English](README.en-US.md) | 日本語

> **注: このドキュメントは適時に更新されない可能性があります。この文書の内容が他の言語の文書と矛盾する場合は、中国語 (zh_CN) または英語 (en_US) が優先されます。**

## プロジェクトのセットアップ

```shell
npm install
```

### 開発用のコンパイルとホットリロード

```shell
npm run serve
```

### 実稼働用にコンパイルおよび縮小します

```shell
npm run build
```

## について

これはテスト用の自作コンポーネントです

ファイル構成に不正がある可能性があります。

現在サポートされているのは以下のみです:

- ダイアログ (一部の関数は element を模倣します)
- notification  (関数は element を模倣します)
- message (スタイルと機能を模倣した element)
- コンソール出力

## 更新記録

> 記録は 2023 年 10 月 6 日に開始されます

**2023-10-6**

```
ダイアログがビューウィンドウより高い位置にあるとスクロールできず、その位置を超えて表示できなくなる不具合を修正しました。
notification の消失カウントダウン視覚化のアニメーションが常に不透明になるように変更されました (自動終了が設定されている場合)。
```

**2023-10-10**

```
最適化ダイアログ。スクロール効果とリバウンド効果を追加します。
いくつかのバグを修正します。
```

**2023-10-12**

```
notification にはコールバック属性が追加されます。コールバックの種類は関数です。
この関数は、notification ボックスがクリックされたときに実行され、その戻り値は、notification の戻り値の成功した関数のパラメーターとして使用されます。
notification が閉じられている場合、notification の戻り値の成功としての then 関数のパラメーターは「Close」です。
```

**2023-10-13**
```
notification にはクリックアニメーションが追加されます。
notification userSelect 属性が追加されます。 この属性はブール値を受け取ります。値が true の場合、テキストは選択できません。デフォルトは true です。
message の本文は選択できません。
```

**2023-10-15**
```
リファクタリング notification。
現在の進行状況が残っています: then() メソッドはコールバック関数の実行値を返します。
notification Vuex への転送
```

**2023-10-16**

```
notification のリファクタリングを完了する
```

新しい notification の使用方法:
1. 新しい notification  を作成する

   構成オブジェクトを渡します。オブジェクトのプロパティには次のものが含まれます。

   ```
   @param {string} title タイトル オプション
   @param {string} message メッセージ 必須。
   @param {string} type タイプ オプション デフォルトは正常です。他の値には成功、警告、エラーが含まれます。
   @param {string} location 位置 オプション. デフォルトは「left-bottom」で、他の値には「left-top right-top right-bottom left-bottom-1...」が含まれます。
   @param {number} duration 間隔 デフォルトは 3000 です。0 の場合、自動的にオフになりません。 0 を除く最小値は 1000 です。
   @param {boolean} showClose 表示閉じる 手動で閉められるかどうか。デフォルトは true です。オンにすると、マウスを移動すると自動シャットダウンのタイミングが停止します。
   @param {boolean} userSelect Whether to restrict text selection. The default is true, which disables text selection
   @param {Function} callback A callback function that runs when the notification box is clicked. The callback receives a parameter in the notification position.
   ```

   ```js
   const notification = new Notification(option)
   ```

2. 利用可能な方法は次のとおりです：

   ```js
   /* 位置に 3 つの値 (left-bottom-1 など) がある場合、それは絶対位置であり、動的な通知位置管理には参加しません。 setLocation メソッドを使用して場所を変更できます。 */
   notification.setLocation(number)
   
   /* コールバックが渡されると、then() メソッドを使用してコールバックの戻り値を取得できます。 */
   notification.then(Function)
   
   /* 通知を閉じるために使用されます */
   notification.close()
   ```
   
   
**2023-10-17**
```
notification リファクタリング完了、バグ修正、スタイル再描画
```