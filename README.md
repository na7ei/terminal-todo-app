This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Demo

<video src="https://github.com/user-attachments/assets/51f71951-6ba8-449b-933c-eafea89180f4"></video>

## Getting Started

```bash
npm install
npx prisma migrate dev
npm run dev
```


## 音声ファイルについて

- 五種類の音声ファイル(.mp3)を 用意して、`public/sounds`　直下に置いてください。

  | ファイル名   | 再生タイミング                                                                   |
  | ------------ | -------------------------------------------------------------------------------- |
  | `add.mp3`    | タスク追加時                                                                     |
  | `check.mp3`  | タスク完了時                                                                     |
  | `delete.mp3` | タスク削除時                                                                     |
  | `error.mp3`  | タスク追加時にエラーが発生した時 <br> ※ 入力欄に何も入力せず、タスクを作成した時 |
  | `typing.mp3` | タスクを入力欄に文字を入力した時                                                 |

- デモでは、[効果音ラボ](https://soundeffect-lab.info/)の音声を利用していますが、利用規約に「再配布禁止」と記載されているため、音源が格納されたディレクトリ（`sounds/`）は git の管理対象外としています。
  ref. https://soundeffect-lab.info/agreement/
