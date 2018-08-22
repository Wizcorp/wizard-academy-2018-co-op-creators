（日本語下記）

# Wizard Academy Template for Unicorn Shooter
A Typescript template for HTML5 games using the Phaser game engine. The files included are a mixture of of the basic template provided in the [phaser-ce](https://github.com/photonstorm/phaser-ce) repository and the [Advanced Phaser and Typescript Projects](http://www.photonstorm.com/phaser/advanced-phaser-and-typescript-projects) tutorial provided on the Photon Storm blog. It includes the following technologies:

* [Phaser CE game engine](https://phaser.io/) with TypeScript bindings
* Webpack
* TypeScript

The template includes the phaser-ce library, the phaser typescript definitions, and a tsconfig that will generate a bundled javascript file for the game. It also bundles webpack and a basic `webpack.config.js` configured to serve the game with support for hot reloading. 

The resulting output of building the project is a runnable "game" that can serve as a starting point for any Phaser game.

## Prerequisites
* Node version 7 or more (tested with version 8 too).
* Typescript (macOS): https://www.dyclassroom.com/howto-mac/how-to-install-typescript-on-mac-using-node-npm
    * On Windows, you only need to follow the third step. Supposing you already have a shell like [cmder](http://cmder.net/) with git for windows (downloaded via cmder) and an node distribution (for example [nodist](https://github.com/marcelklehr/nodist)).

## Running the project
* Simply clone or download the contents of this repository and from the root of the project.
* Run `npm install` in the terminal.
* Run `npm run server` to launch the webpack web server.
* Open your web browser and type `localhost:8080` to run the game.

## Version
The current version of phaser-ce targeted by the template is 2.11.0.

This template was built with v2.8.3 of the Typescript compiler, but may work on older or newer versions.

# 日本語版

# Wizard Academy Template for Unicorn Shooterゲームテンプレート
Phaserゲームエンジンを使用したHTML5ゲームのTypeScriptテンプレートです。ファイルは[phaser-ce](https://github.com/photonstorm/phaser-ce)のリポジトリからの基本的テンプレート、Photon　Stormというブログの[「Advanced Phaser」と「TypeScript Projects」](http://www.photonstorm.com/phaser/advanced-phaser-and-typescript-projects)のチュートリアルから構成されています。以下の技術から構成されています：

* TypeScriptバインディングと[Phaser CE game engine](https://phaser.io/)ゲームエンジン
* Webpack
* TypeScript

テンプレートはPhaser-CEのライブラリ、PhaserのTypeScript型定義ファイルとゲームのためにバンドルされたJavaScriptファイルを生成するtsconfigと、ホットリロードなどが定義されている`webpack.config.js`から構成されています。

どのようなPhaserゲームでも開発できる事ができるテンプレートとなっています。

## 前提条件
**MacOS用**

https://www.dyclassroom.com/howto-mac/how-to-install-typescript-on-mac-using-node-npm （英語）

* Step 1: Homebrewをインストールする。
* Step 2: Node バージョン７をインストールする。
* Step 3: TypeScriptをインストールする。

**Windows用**

* [cmder](http://cmder.net/)のようなgitがすでにインストールされているシェルと[Nodist](https://github.com/marcelklehr/nodist)のようなバージョンNodeJs管理ソフトが既にインストールされていれば、step3のみ必要です。


# プロジェクトを実行する
* レポジトリをダウンロードまたはクローンしてください。
* ターミナルで`npm install`を実行する。
* webpack web serverーを起動するために`npm run server`コマンドをを実行する。
* ウェブブラウザー開き、ゲームを実行するために`localhost:8080`とタイプしてください。


## バージョン
テンプレートに使用されているPhaser-CEのバージョンは2.11.0です。

テンプレートはv2.8.3のTypeScriptコンパイラで作成されていましたが、旧バージョンあるいは新バージョンで使用可能かもしれません。
