
哈瑪星共通平台 前端規範
=======================
前端介面版本 2.0

[oka Li](mailto:okaoka0709@gmail.com)


<h2>目錄</h2>
* [簡介](#introduce)
  1. [前言](#overview)
  2. [定義](#definition)
  3. [工具](#environment-and-tools)
* [哲學](#philosophy)
  1. [模塊：模組與群組](#module-and-group)
  2. [CSS 選擇器與範圍](#css-selector)
  3. [Javascript 優化](#javascript-optimize)
* [HTML 實作](#HTML)
  1. [專案目錄結構](#project-directory)
  2. [參數與意義](#HTML-parameter)
  3. [底層、框架與內容](#base-layout)
  4. [模塊基礎結構](#module-and-group-structure)
  5. [群組類別與結構](#group-structure)
  6. [模組類別與結構](#module-structure)
  7. [組件](#component)
  8. [以 class name 表示狀態](#use-class-name-to-show-status)
* [erb 實作](#erb)
  1. [erb 目錄結構](#erb-directory)
  2. [erb 樣板語言](#erb-script)
  3. [erb 運作方式](#erb-run)
  4. [關於 layout 樣板](#erb-layout)
  5. [關於 index 樣板](#erb-index-layout)
  6. [關於 sys/variable](#erb-variable)
  7. [假字與圖片](#lorem-ipsum-and-picture)
* [CSS/SCSS 實作](#scss)
  1. [SCSS 目錄結構](#scss-directory)
  2. [SCSS](#scss-script)
  3. [格線系統](#grid)
  4. [類別](#scss-type)
  5. [選擇器邏輯](#selector-logic)
  6. [base/variable、base/function 與 sys/function](#function-and-variable)
  7. [關於 sys/variable](#scss-sys-variable)
  8. [noscript 方法](#scss-noscript)
  9. [hack 方法](#scss-hack)
  10. [rwd 方法](#scss-rwd)
  11. [在 pc、pad、phone 寬度隱藏模塊](#rwd-hide)
  12. [隱藏模塊 header 的方法](#hide-header)
  13. [admin 方法](#scss-admin)
  14. [文字圖示](#scss-font-icon)
  15. [sprite 圖示](#scss-sprite-picture)
  16. [關於設定數量的方法](#scss-len-function)
* [javascript/requireJS 實作](#js)
  1. [Script 目錄結構](#js-directory)
  2. [requireJS 運作方式](#js-require)
  3. [以 node 呼叫 javascript 檔案](#node-and-files)
  4. [關於 lib/app 與 lib/main](#app-and-main)
  5. [關於 jquery.js](#js-jquery)
  6. [關於 cookie.js](#js-cookie)
  7. [關於 getNode.js](#js-getNode)
  8. [關於 fix.js](#js-fix)

<h2 id="introduce">簡介</h2>
<h3 id="overview">前言</h3>
共通平台是一套商用 cms 系統，本文解說其前端規範。

共通平台定義了**模塊**的概念，每個具有內容的模塊都是**模組模塊**，而**群組模塊**沒有任何內容，僅用以輔助排版。

群組模塊可以作為主選單、跑馬燈、輪播等複合模塊的載體，例如我們將數個選單模組放入群組模塊，該群組模塊就可做為雙層選單使用。

其他特點如下：

1. HTML 有標準格式，降低工程師、設計師維護的複雜度。
2. 各個模塊可以使用彼此的樣式，甚至 javascript 程式。
3. 讓使用者可定參數以控制顯示寬度比例。
4. javascript 動態載入，增進效能與維護性。
5. 引進樣板語言，提高建立靜態頁面、網頁測試的效率。


<h3 id="definition">定義</h3>
本文規範包括前台 HTML、CSS、javascript，無關後端資料處理。


<h3 id="environment-and-tools">環境與工具</h3>
我們支援 IE8 以上的瀏覽器，使用 HTML5 宣告與 HTML4.2 的標籤。語意標籤被轉化為 class name，便於日後轉換(如 nav 標籤)。
唯二的例外是視訊與音訊模組，使用 HTML 5 原生撥放器，但也提供了相應的外掛給 IE8、IE9 使用。

開發環境推薦使用 Fire.app。以下是使用到的工具：

<table>
  <tr>
    <th>開發環境</th>
    <td>Ruby(erb)、Java(Fire.app)、Scss、Compass</td>
  </tr>
  <tr>
    <th>工具</th>
    <td>Fire.app、requireJS、normalize、jquery</td>
  </tr>
</table>




<h2 id="philosophy">哲學</h2>
<h3 id="module-and-group">模塊：模組與群組</h3>
平台基於兩種**模塊**：**群組模塊**與**模組模塊**。

> 共通平台定義了模塊的概念，每個具有內容的模塊都是模組模塊，而群組模塊沒有任何內容，僅用以輔助排版。

共通平台網頁的構成，應由模塊堆砌而成，不應有例外，當我們需要一個複合模組，應該使用現有模塊堆砌出來。
例如把日曆模組與選單模組加入到群組裡，該群組就成為帶選單的日曆模組。

模組有兩種命名法，一是依照模組的內容命名，例如：logo(標誌)。
另一種是依照模組的樣式命名，例如：pic-block(圖片區塊)。

一般來說，首頁模組使用內容命名法，內頁模組使用樣式命名法。

更多模塊的規範，可參閱 [模塊基礎結構](#module-and-group-structure) 章節。


<h3 id="css-selector">CSS 選擇器與範圍</h3>
將平台 HTML 整理之後，大致可以歸類出數種結構，相同/相似結構的模塊，樣式設定會被寫在同一份檔案裡。
由於同類別的結構趨於相似，因此可以很方便的套用同類別的其他樣式。
如 group-list、 list-text 與 list-pic 這三個類別，相當程度上可以套用彼此的樣式，但群組與模組指定選擇器的方式稍有不同，需多加注意，可參閱 [選擇器邏輯](#selector-logic) 章節。

樣式可依所在位置有所變更，例如指定主選單在手機側欄、側邊欄與內頁時呈現不同的樣式，更多框架區塊可參閱 [底層、框架與內容](#base-layout) 章節，樣式的指定可參閱 [選擇器邏輯](#selector-logic) 章節。。

平台提供了許多指定寬度的方法，例如讓使用者透過參數來調整顯示的項目，可參閱 [關於設定數量的方法](#scss-len-function) 章節。


<h3 id="javascript-optimize">Javascript 優化</h3>
以往新增/修改 javascript 程式，必須在 head 標籤中引入，時間一久往往會造成維護上的問題，也載入不少沒有用到的程式，浪費資源。

平台使用 requireJS 解決這些問題，動態載入執行的檔案，解決相依性、套件衝突的問題，可參閱 [requireJS 運作方式](#js-require) 章節。

由於 HTML 有可依循的結構，因此許多模塊能夠共享程式。
如輪播模組可被 group-list、list-text 與 list-pic 這三個類別所使用，減少客製化。




<h2 id="HTML">HTML 實作</h2>
<h3 id="project-directory">專案目錄結構與其他檔案</h3>
以下是專案目錄結構圖及說明。

    - 專案目錄
      |- .git
      |- .sass-cache
      |- audio
      |- Css
      |- Document
      |- erb
      |- images
      |- Prototype
      |- Sample
      |- Sass
      |- Script
      |- video
      |- .gitignore
      |- _index_layout.html.erb
      |- _layout.html.erb
      |- apple-touch-icon.png
      |- config.rb
      |- favicon.ico
      |- index.html.erb
      |- index.HTML.layout
      |- README.md

<table>
  <tr>
    <th>文件、目錄</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>.git</td>
    <td>存放 git 版本管理庫的目錄</td>
  </tr>
  <tr>
    <td>.sass-cache</td>
    <td>存放 Sass 編譯暫存檔案的目錄</td>
  </tr>
  <tr>
    <td>audio</td>
    <td>存放音訊檔案的目錄</td>
  </tr>
  <tr>
    <td>Css</td>
    <td>存放 css 文件的目錄</td>
  </tr>
  <tr>
    <td>Document</td>
    <td>存放其他相關文件的目錄</td>
  </tr>
  <tr>
    <td>erb</td>
    <td>存放 erb 樣板與模組的目錄</td>
  </tr>
  <tr>
    <td>images</td>
    <td>存放圖片、圖示的目錄(包含文字圖示)</td>
  </tr>
  <tr>
    <td>Prototype</td>
    <td>存放專案雛形、原始圖檔的目錄</td>
  </tr>
  <tr>
    <td>Sample</td>
    <td>DEMO 頁面</td>
  </tr>
  <tr>
    <td>Sass</td>
    <td>存放 Scss 文件</td>
  </tr>
  <tr>
    <td>Script</td>
    <td>存放 javascript 文件</td>
  </tr>
  <tr>
    <td>video</td>
    <td>存放視訊檔案</td>
  </tr>
  <tr>
    <td>.gitignore</td>
    <td>紀錄 Git 排除名單的文件</td>
  </tr>
  <tr>
    <td>_index_layout.html.erb</td>
    <td>index.html.erb 的樣板</td>
  </tr>
  <tr>
    <td>_layout.html.erb</td>
    <td>所有內頁的樣板</td>
  </tr>
  <tr>
    <td>apple-touch-icon.png</td>
    <td>iOS、OSX 使用較大的 icon 圖片</td>
  </tr>
  <tr>
    <td>config.rb</td>
    <td>compass、sass 的設定文件</td>
  </tr>
  <tr>
    <td>favicon.ico</th>
    <td>網頁 icon 圖示</td>
  </tr>
  <tr>
    <td>index.html.erb</td>
    <td>以 erb 撰寫的首頁</td>
  </tr>
  <tr>
    <td>index.HTML.layout</td>
    <td>指定 _index_layout.html.erb 為 index.html.erb 樣板的設定文件</td>
  </tr>
  <tr>
    <td>README.md</td>
    <td>說明文件，即本文</td>
  </tr>
</table>

<h3 id="HTML-parameter">參數與意義</h3>
平台使用 data- 前輟屬性為 css 及 javascript 做一些事，強化整體規範與便利性。

一般的模塊具有屬性 data-type、data-index、data-child、data-func、data-setlen，而 body 則有屬性 data-js、data-admin， 項目(li)屬性有 data-width 等等，以下將這幾種屬性的用途、意義等一一說明。

<table>
  <tr>
    <th>屬性</th>
    <th>意義</th>
    <th>說明</th>
    <th>歸屬</th>
  </tr>
  <tr>
    <td>data-type</td>
    <td>模塊類型</td>
    <td>標示該模塊的類型，0 代表該模塊為模組，1到4分別為不同類別的群組，更多說明請至 <a href="#group-structure">群組類別與結構</a> 章節</td>
    <td>模塊</td>
  </tr>
  <tr>
    <td>data-index</td>
    <td>模塊或項目順序</td>
    <td>標示模塊的順序、標示項目的順序、標示 tr 的順序、標示 td 的順序</td>
    <td>模塊、項目(li)、thead、tbody、tfoot、tr、td</td>
  </tr>
  <tr>
    <td>data-child</td>
    <td>子模塊或子項目數量</td>
    <td>標示該模塊包含的子模塊數量、標示該清單的子項目數量，標示 thead、tbody、tfoot 中的 tr 數量，標示 tr 中的 td 與 th 數量</td>
    <td>群組、清單(ul)、thead、tbody、tfoot、tr</td>
  </tr>
  <tr>
    <td>data-func</td>
    <td>呼叫模塊程式</td>
    <td>提供一組 javascript 物件字串，用以呼叫程式模塊，更多說明請至 <a href="#node-and-files">以 node 呼叫 javascript 檔案</a> 章節</td>
    <td>模塊、body</td>
  </tr>
  <tr>
    <td>data-setlen</td>
    <td>設定模塊顯示項目</td>
    <td>設定內容項目顯示的數量，更多說明請至 <a href="#scss-len-function">關於設定數量的方法</a> 章節</td>
    <td>模塊</td>
  </tr>
  <tr>
    <td>data-js</td>
    <td>javascript 提示</td>
    <td>標示用戶是否開啟 javascript</td>
    <td>body</td>
  </tr>
  <tr>
    <td>data-admin</td>
    <td>管理者提示</td>
    <td>標示目前用戶是否為系統管理者</td>
    <td>body</td>
  </tr>
  <tr>
    <td>data-width</td>
    <td>選單寬度</td>
    <td>設定子模塊的 content 選單寬度，主要用於主選單，單位是基本寬度的倍數</td>
    <td>項目(li)</td>
  </tr>
</table>

<h3 id="base-layout">底層、框架與內容</h3>
底層與框架是一些**固定存在**的群組模塊。以 sys(系統級) 與 base(基礎級) 前輟區分。

前輟 sys 是系統級節點，內容由此節點開始堆砌，而樣式也應由此節點開始撰寫，**不應在 HTML、body、form 寫入任何樣式**。

前輟 base 是基礎級節點，是區分網頁層級的重要區塊，以下將一層一層的介紹它們的意義。

sys-root 是一組群組，是平台版面根節點，所有網頁的內容由它開始：

    <body>
      <div class="sys-root">
        網頁內容由此開始
      </div>
    </body>

在 sys-root 之下有 base-mobile、base-extend 與 base-wrapper 三個主要區塊：

base-mobile: 行動側欄。通常會放置主選單、分享模組等。
base-extend: 漂浮在瀏覽器上的物件層。通常會放置回到最頂按鈕等等。
base-wrapper: 網頁頁面框架。

    <body>
      <div class="sys-root">

        <div class="base-mobile">
          行動版側欄
        </div>
        <div class="base-extend">
          漂浮物件層
        </div>
        <div class="base-wrapper">
          網頁頁面框架
        </div>

      </div>
    </body>

base-wrapper 中分 base-header、base-content、base-footer 三個次要區塊：

base-header: 網頁頁首。通常放置主選單、LOGO模組等。
base-content: 網頁主要內容。
base-footer: 網頁頁尾。通常放置一些網站資訊。

    <body>
      <div class="sys-root">
        <div class="base-mobile">
        </div>
        <div class="base-extend">
        </div>
        <div class="base-wrapper">

          <div class="base-header">
            網頁頁首
          </div>
          <div class="base-content">
            網頁主要內容
          </div>
          <div class="base-footer">
            網頁頁尾
          </div>

        </div>
      </div>
    </body>

依據首頁/內頁框架區塊的不同，可區分 base-module-area 與 base-page-area：

base-module-area: 模組區塊。可放置各種模組。在內頁時該區塊會顯示在 base-page-area 之上。
base-page-area: 內頁框架。

    <body>
      <div class="sys-root">
        <div class="base-mobile">
        </div>
        <div class="base-extend">
        </div>
        <div class="base-wrapper">
          <div class="base-header">
          </div>
          <div class="base-content">

            <div class="base-module-area">
              模組
            </div>
            <div class="base-page-area">
              內頁
            </div>

          </div>
          <div class="base-footer">
          </div>
        </div>
      </div>
    </body>

base-page-area 分為 base-aside 與 base-section：

base-aside: 內頁側欄。通常放置選單或其他內容。
base-section: 內頁內容。

    <HTML>
      <body>
        <div class="sys-root">
          <div class="base-mobile">
          </div>
          <div class="base-extend">
          </div>
          <div class="base-wrapper">
            <div class="base-header">
            </div>
            <div class="base-content">
              <div class="base-module-area">
              </div>
              <div class="base-page-area">

                <div class="base-aside">
                  內頁側欄
                </div>
                <div class="base-section">
                  內頁內容
                </div>

              </div>
            </div>
            <div class="base-footer">
            </div>
          </div>
        </div>
      </body>
    </HTML>

若內頁內容中包含文章區塊，base-section 區塊會包含固定框架 base-article：

base-article: 內頁文章區塊。

    <body>
      <div class="sys-root">
        <div class="base-mobile">
        </div>
        <div class="base-extend">
        </div>
        <div class="base-wrapper">
          <div class="base-header">
          </div>
          <div class="base-content">
            <div class="base-module-area">
            </div>
            <div class="base-page-area">
              <div class="base-aside">
              </div>
              <div class="base-section">

                <div class="base-article">
                  內頁文章
                </div>

              </div>
            </div>
          </div>
          <div class="base-footer">
          </div>
        </div>
      </div>
    </body>

以下以列表說明各框架具體內容與說明：

<table>
  <tr>
    <th>框架</th>
    <th>意義</th>
    <th>說明</th>
    <th>層級</th>
  </tr>
  <tr>
    <td>.sys-root</td>
    <td>平台版面根節點</td>
    <td>內容由此節點開始堆砌，而樣式也應由此節點開始撰寫，不應在 HTML、body、form 寫入任何樣式</td>
    <td>1</td>
  </tr>
  <tr>
    <td>.base-mobile</td>
    <td>行動版側欄</td>
    <td>行動側欄框架。通常會放置主選單、分享模組等</td>
    <td>2</td>
  </tr>
  <tr>
    <td>.base-extend</td>
    <td>漂浮物件層</td>
    <td>漂浮在瀏覽器上的物件層。通常會放置回到最頂按鈕等等</td>
    <td>2</td>
  </tr>
  <tr>
    <td>.base-wrapper</td>
    <td>網頁頁面框架</td>
    <td>網頁頁面框架</td>
    <td>2</td>
  </tr>
  <tr>
    <td>.base-header</td>
    <td>網頁頁首</td>
    <td>通常放置主選單、LOGO模組等</td>
    <td>3</td>
  </tr>
  <tr>
    <td>.base-content</td>
    <td>網頁主要內容</td>
    <td>網頁主要內容</td>
    <td>3</td>
  </tr>
  <tr>
    <td>.base-footer</td>
    <td>網頁頁尾</td>
    <td>通常放置一些網站資訊</td>
    <td>3</td>
  </tr>
  <tr>
    <td>.base-module-area</td>
    <td>模組區塊</td>
    <td>可放置各種模組。在內頁時該區塊會顯示在 base-page-area 之上</td>
    <td>4</td>
  </tr>
  <tr>
    <td>.base-page-area</td>
    <td>內頁區塊</td>
    <td>內頁框架</td>
    <td>4</td>
  </tr>
  <tr>
    <td>.base-aside</td>
    <td>內頁側欄</td>
    <td>通常放置主選單或次選單</td>
    <td>5</td>
  </tr>
  <tr>
    <td>.base-section</td>
    <td>內頁內容</td>
    <td>內頁內容</td>
    <td>5</td>
  </tr>
  <tr>
    <td>.base-article</td>
    <td>內頁文章</td>
    <td>內頁文章區塊</td>
    <td>6</td>
  </tr>
</table>

每一層框架都是一個群組，群組有其特定的結構，以上僅是結構示意，關於群組結構請參閱 [模塊基礎結構](#module-and-group-structure) 章節。


<h3 id="module-and-group-structure">模塊基礎結構</h3>
模塊是平台網頁的基礎單位，分為**群組模塊**與**模組模塊**。
只要該模組同時含有屬性 data-index 與 data-type，該節點就是一個模塊節點。
模塊由 header、content、footer 三個區塊組成，以下將列表說明他們的意義：

<table>
  <tr>
    <th>區塊</th>
    <th>意義</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>hd(header)</td>
    <td>標頭</td>
    <td>該模組的標題。若該模塊不須標題，那麼該模塊將沒有 hd 區塊</td>
  </tr>
  <tr>
    <td>ct(content)</td>
    <td>內容</td>
    <td>模組表達的意義</td>
  </tr>
  <tr>
    <td>ft(footer)</td>
    <td>附加資訊</td>
    <td>通常用來放置上一則、下一則、更多、RSS等附加操作或補充說明。若該模塊不須附加操作，那麼該模塊將沒有 ft 區塊</td>
  </tr>
</table>

模塊、hd、ct、ft 都有一個 .in(inner) 區塊， in 用來輔助排版。

以下列出模塊基本結構：

    <data-index data-type>
      <div class="in">
        <div class="hd">
          <div class="in">
            標頭
          </div>
        </div>
        <div class="ct">
          <div class="in">
            內容
          </div>
        </div>
        <div class="ft">
          <div class="in">
            附加資訊
          </div>
        </div>
      </div>
    </div>

模塊的 data-type 屬性指明了該模塊是群組還是模組，以下列舉 data-type 屬性的5個類別。

<table>
  <tr>
    <th>值</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>0</td>
    <td>標示該模塊為模組</td>
  </tr>
  <tr>
    <td>1</td>
    <td>標示該模塊為分割群組</td>
  </tr>
  <tr>
    <td>2</td>
    <td>標示該模塊為頁籤群組</td>
  </tr>
  <tr>
    <td>3</td>
    <td>標示該模塊為單欄群組</td>
  </tr>
  <tr>
    <td>4</td>
    <td>標示該模塊為清單群組</td>
  </tr>
</table>

關於更多群組類別的分別，請參閱 [群組類別與結構](#group-structure) 章節。


<h3 id="group-structure">群組類別與結構</h3>
群組是一個無內容的模塊，主要用於裝載其他的模塊，因此常利用它構成版面需要的框架。
群組分為**分割**、**頁籤**、**單欄**與**清單**，以下針對這四種模組的意義作說明。

<h4>分割群組</h4>
分割群組會依照 [格線系統](#grid) 均分子模塊，如分割模組裡有兩個模塊，那麼子模塊的寬度則各為 50% (100% / 2)，不過**該規則可被 data-setlen 屬性覆蓋**，可參閱 [關於設定數量的方法](#scss-len-function) 章節。

以下是分割群組的 HTML 格式：

    <data-index class="group" data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h3><span><a>標題</a></span></h3>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            子模塊
          </div>
        </div>
      </div>
    </div>

<h4>頁籤群組</h4>
提供切換頁籤功能的群組。
該模塊 content 具有一個列表，**第一個項目是頁籤模組、第二個項目以後依序放入其他子模塊**。

頁籤模組的 content 具有一個列表，依序為此頁籤群組的子模塊 header 文字。
一般情況下，頁籤群組的子模塊 hd 區塊應被隱藏。**若客戶沒有開啟 javascript，應隱藏頁籤模組，而顯示其他子模塊的 hd**。

以下是頁籤群組的 HTML 格式：

    <data-index class="group-tab" data-type="2">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h3><span><a>標題</a></span></h3>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <ul data-index data-child>
              <li data-index="1">

                   <data-index data-type="0">
                      <div class="in">
                        <div class="hd">
                          <div class="in">
                            <h4><span><a>頁籤模組</a></span></h4>
                          </div>
                        </div>
                        <div class="ct">
                          <div class="in">
                            <ul data-child>
                              <li data-index="1"><span><a>依序加入子模塊 header文字...</a></span><li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

              </li>
              <li data-index="2">依序加入子模塊...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

<h4>單欄群組</h4>
相對於分割群組，單欄群組並不分割子模塊，而是依順序由上而下排列。

以下是單欄群組的 HTML 格式：

    <data-index class="group" data-type="3">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h3><span><a>標題</a></span></h3>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            子模塊
          </div>
        </div>
      </div>
    </div>

<h4>清單群組</h4>
清單群組的 ct 具有一個清單，而子模塊會被依序放入該清單的項目(li)中。
此模塊的結構與 list-text、 list-pic 的結構相似，因此可共用 javascript 與 css，惟選擇器的指定方法稍有不同，請參閱 [選擇器邏輯](#selector-logic) 章節。

以下是清單群組的 HTML 格式：

    <data-index class="group-list" data-type="3">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h3><span><a>標題</a></span></h3>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <ul data-child>
              <li>依序加入子模塊...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>


<h3 id="module-structure">模組類別與結構</h3>
與群組類別相仿，模組也分為11種類別。但不論屬於何種類別，模組的 data-type 都是 0。
類別區分模組的結構，如該模組是一個圖片列表，則屬於 list-pic 類別。
模組使用 class name 區別類別，每個模組都同時包含類別 class 與自定義 class，例如選單模組：

    <div calss="list-text nav" data-type="0" data-index="1">

list-text 是類別 class，而 nav 是自定義 class。
以下列舉出12種類別的意義、說明與參考格式：

<h4>area-customize</h4>
客製的模組，如 google map 模組、iframe 框架模組、vedia 視訊模組、audio 音訊模組等等。以下是 area-customize 類別的 HTML 參考格式：

    <class="area-customize" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            ...
          </div>
        </div>
      </div>
    </div>

<h4>area-editor</h4>
意指客戶可以使用編輯器編輯內文的模組，如使用者發佈文章區塊。
以下是 area-editor 類別的 HTML 參考格式：

    <class="area-editor" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            使用者編輯文字
          </div>
        </div>
      </div>
    </div>

<h4>area-essay</h4>
參雜文字與圖片，以文字為主體的模組，如最新消息。
以下是 area-essay 類別的 HTML 參考格式，**area-essay 的內標標題 class 應為 .caption**：

    <class="area-essay" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <a href="#" class="div">
              <div class="img"><span style="background-image: url('#')"><img src="#" alt=""></span></div>
              <div class="essay">
                <div class="caption"><span>內容標題</span></div>
                <div class="label">
                  <ul>
                    <li><span><i class="mark">標籤</i></span></li>
                  </ul>
                </div>
                <div class="p">
                  <p><span>內容簡介</span></p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

<h4>area-figure</h4>
參雜文字與圖片，以圖片為主體的模組，如相簿。
以下是 area-figure 類別的 HTML 參考格式，**area-figure 的內標標題 class 應為 .figcaption**：

    <class="area-figure" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <a href="#" class="div">
              <div class="img"><span style="background-image: url('#')"><img src="#" alt=""></span></div>
              <div class="essay">
                <div class="figcaption"><span>內容標題</span></div>
                <div class="label">
                  <ul>
                    <li><span><i class="mark">標籤</i></span></li>
                  </ul>
                </div>
                <div class="p">
                  <p><span>內容簡介</span></p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

<h4>area-form</h4>
以表單為主體的模組，如搜尋。
以下是 area-form 類別的 HTML 參考格式：

    <class="area-form" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <div class="fieldset">
              <span class="text"><input type="text"></span>
              <span class="submit"><a href="#">送出</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>

<h4>area-table</h4>
以表格為主體的模組。
以下是 area-table 類別的 HTML 參考格式：

    <class="area-table" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <table>
              <thead data-index data-child>
                <tr data-index data-child>
                  <th data-index><span>標頭</span></th>
                </tr>
              </thead>
              <tbody data-index data-child>
                <tr data-index data-child>
                  <td data-index><span>內容</span></td>
                </tr>
              </tbody>
              <tfoot data-index data-child>
                <tr data-index data-child>
                  <th data-index><span>附加資訊</span></th>
                </tr>
              </foot>
            </table>
          </div>
        </div>
      </div>
    </div>

<h4>list-multiple</h4>
多重清單模組，如頁次導航列。
以下是 area-audio 類別的 list-multiple 參考格式：

    <class="list-multiple" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <ul data-index data-child><li><span>1</span></li></ul>
            <ul data-index data-child><li><span>1</span></li></ul>
          </div>
        </div>
      </div>
    </div>

<h4>list-pic</h4>
圖片清單模組，如標章。
以下是 list-pic 類別的 HTML 參考格式：

    <class="list-text" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <ul data-index data-child>
              <li data-index><span style="background-image: url('#');"><a href="#"><img src="#" alt=""></a></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

<h4>list-text</h4>
文字清單模組，如選單。
以下是 list-text 類別的 HTML 參考格式：

    <class="list-text" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <ul data-index data-child>
              <li data-index><span><a><i class="mark">標籤</i>依序加入文字項目...</a></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

<h4>simple-pic</h4>
顯示一張圖片的模組，如圖片模組。
以下是 simple-pic 類別的 HTML 參考格式：

    <class="simple-pic" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <span style="background-image: url('#');"><a href="#"><img src="#" alt=""></a></span>
          </div>
        </div>
      </div>
    </div>

<h4>simple-text</h4>
只敘述一行文字的文字模組，如LOGO 模組。
以下是 simple-text 類別的 HTML 參考格式：

    <class="simple-text" data-index data-type="0">
      <div class="in">
        <div class="hd">
          <div class="in">
            <h4><span><a>標題</a></span></h4>
          </div>
        </div>
        <div class="ct">
          <div class="in">
            <span><a>文字</a></span>
          </div>
        </div>
      </div>
    </div>

若想參閱所有模組列表，可以參閱 [模組盤點](https://docs.google.com/document/d/15XokVf-KISYmoEm7otdGADsnAHNIpbIypbBoaRkbMrE/edit)。


<h3 id="component">組件</h3>
模組的 ct 是一塊有意義的內容，ct 由組件組成，有規則可依循。

組件依模組需求，由小區塊到大區塊堆砌，盡可能以簡潔為主，
例如使用 div.paragraph>p>span 即可滿足排版需求，則不需用到 div.essay>div.paragraph>p>span。

以下列出可用的組件(emmet 格式)：

<table>
  <tr>
    <th colspan="2">表單類</th>
  </tr>
  <tr>
    <td>表單主題區塊</td>
    <td>div.form></td>
  </tr>
  <tr>
    <td>表單區塊</td>
    <td>.fieldset></td>
  </tr>
  <tr>
    <td>表單標題組件</td>
    <td>.legend>a{可選}>span>{標題文字}</td>
  </tr>
  <tr>
    <td>輸入框組件</td>
    <td>span.button>input[type='button']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.checkbox>input[type='checkbox']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.color>input[type='color']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.date>input[type='date']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.datetime>input[type='datetime']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.datetime_local>input[type='datetime-local']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.email>input[type='email']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.file>input[type='file']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.hidden>input[type='hidden']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.input_image>input[type='image']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.month>input[type='month']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.number>input[type='number']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.input>input[type='password']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.radio>input[type='radio']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.range>input[type='range']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.reset>input[type='reset']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.search>input[type='search']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.submit>input[type='submit']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.tel>input[type='tel']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.text>input[type='text']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.time>input[type='time']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.url>input[type='url']</td>
  </tr>
  <tr>
    <td></td>
    <td>span.week>input[type='week']</td>
  </tr>
  <tr>
    <td>標籤組件</td>
    <td>span.label>label{可選}</td>
  </tr>
  <tr>
    <td>勾選框組件</td>
    <td>span.checkbox>(input[type='checkbox'])+(span.label>label)</td>
  </tr>
  <tr>
    <td>單選框組件</td>
    <td>span.checkbox>(input[type='radio'])+(span.label>label)</td>
  </tr>
  <tr>
    <td>文字輸入框組件</td>
    <td>div.textarea>textarea</td>
  </tr>
  <tr>
    <td></td>
    <td>span.textarea>textarea</td>
  </tr>
  <tr>
    <td>選擇框組件</td>
    <td>div.select>select>option>{文字}</td>
  </tr>
  <tr>
    <td></td>
    <td>span.select>select>option>{文字}</td>
  </tr>
  <tr>
    <th colspan="2">表格類</th>
  </tr>
  <tr>
    <td>表格主題區塊</td>
    <td>div.table></td>
  </tr>
  <tr>
    <td>表格區塊</td>
    <td>table></td>
  </tr>
  <tr>
    <td>表格標題區塊</td>
    <td>thead></td>
  </tr>
  <tr>
    <td>表格內容區塊</td>
    <td>tbody></td>
  </tr>
  <tr>
    <td>表格附加資訊區塊</td>
    <td>tfoot></td>
  </tr>
  <tr>
    <td>表格內容組件</td>
    <td>tr>td>span>a{可選}</td>
  </tr>
  <tr>
    <td></td>
    <td>tr>th>span>a{可選}</td>
  </tr>
  <tr>
    <th colspan="2">清單類</th>
  </tr>
  <tr>
    <td>清單主題區塊</td>
    <td>div.list></td>
  </tr>
  <tr>
    <td></td>
    <td>a.list></td>
  </tr>
  <tr>
    <td>清單區塊</td>
    <td>ul></td>
  </tr>
  <tr>
    <td></td>
    <td>ol></td>
  </tr>
  <tr>
    <td>項目</td>
    <td>li>span>a{可選}</td>
  </tr>
  <tr>
    <th colspan="2">標籤類</th>
  </tr>
  <tr>
    <td>標籤主題區塊</td>
    <td>div.label></td>
  </tr>
  <tr>
    <td>標籤區塊</td>
    <td>ul></td>
  </tr>
  <tr>
    <td>項目</td>
    <td>li>span>a{可選}</td>
  </tr>
  <tr>
    <th colspan="2">內文類</th>
  </tr>
  <tr>
    <td>內文主題區塊</td>
    <td>div.essay></td>
  </tr>
  <tr>
    <td></td>
    <td>a.essay></td>
  </tr>
  <tr>
    <td>內文區塊</td>
    <td>div.paragraph</td>
  </tr>
  <tr>
    <td></td>
    <td>a.paragraph></td>
  </tr>
  <tr>
    <td>標題組件</td>
    <td>div.caption>span>a{可選}>{標題文字}</td>
  </tr>
  <tr>
    <td>標題內文組件</td>
    <td>h1>span>a{可選}</td>
  </tr>
  <tr>
    <td></td>
    <td>h2>span>a{可選}</td>
  </tr>
  <tr>
    <td></td>
    <td>h3>span>a{可選}</td>
  </tr>
  <tr>
    <td></td>
    <td>h4>span>a{可選}</td>
  </tr>
  <tr>
    <td></td>
    <td>h5>span>a{可選}</td>
  </tr>
  <tr>
    <td></td>
    <td>h6>span>a{可選}</td>
  </tr>
  <tr>
    <td>段落文字組件</td>
    <td>p>span>a{可選}>{文字}</td>
  </tr>
  <tr>
    <td>簡單文字組件</td>
    <td>span>a{可選}>{文字}</td>
  </tr>
  <tr>
    <th colspan="2">圖片類</th>
  </tr>
  <tr>
    <td>圖片主題區塊</td>
    <td>div.figure></td>
  </tr>
  <tr>
    <td></td>
    <td>a.figure></td>
  </tr>
  <tr>
    <td>圖片區塊</td>
    <td>div.images></td>
  </tr>
  <tr>
    <td></td>
    <td>a.images></td>
  </tr>
  <tr>
    <td>標題組件</td>
    <td>div.figcaption>span>a{可選}>{標題文字}</td>
  </tr>
  <tr>
    <td>複數圖片組件</td>
    <td>div.image>span>a{可選}>img</td>
  </tr>
  <tr>
    <td>簡單圖片組件</td>
    <td>span>a{可選}>img</td>
  </tr>
  <tr>
    <th colspan="2">標題類</th>
  </tr>
  <tr>
    <td>標題主題區塊</td>
    <td>div.heading></td>
  </tr>
  <tr>
    <td></td>
    <td>a.heading></td>
  </tr>
  <tr>
    <td>標題區塊</td>
    <td>div.caption></td>
  </tr>
  <tr>
    <td></td>
    <td>a.caption></td>
  </tr>
  <tr>
    <td>標題組件</td>
    <td>span>a{可選}>{標題文字}</td>
  </tr>
  <tr>
    <th colspan="2">區塊類</th>
  </tr>
  <tr>
    <td>區塊</td>
    <td>div.division></td>
  </tr>
  <tr>
    <td></td>
    <td>a.division></td>
  </tr>
  <tr>
    <th colspan="2">視訊類</th>
  </tr>
  <tr>
    <td>視訊主題區塊</td>
    <td>.video></td>
  </tr>
  <tr>
    <td>視訊區塊</td>
    <td>video></td>
  </tr>
  <tr>
    <td>視訊</td>
    <td>source</td>
  </tr>
  <tr>
    <td>註解</td>
    <td>span>a{可選}>{標題文字}</td>
  </tr>
  <tr>
    <th colspan="2">音訊類</th>
  </tr>
  <tr>
    <td>音訊主題區塊</td>
    <td>.audio></td>
  </tr>
  <tr>
    <td>音訊區塊</td>
    <td>audio></td>
  </tr>
  <tr>
    <td>音訊</td>
    <td>source</td>
  </tr>
  <tr>
    <td>註解</td>
    <td>span>a{可選}>{標題文字}</td>
  </tr>
</table>


<h3 id="use-class-name-to-show-status">以 class name 表示狀態</h3>
在撰寫動態切換時，我們經常使用 class name 切換，class name 應使用**相對自然狀態命名**。
例如手機側欄的自然狀態是關閉，當它被打開，切換的 class name 應取名為：is-open。
反之， fat footer 的自然狀態是開啟，當它要關閉，使用的 class name 應取名為：is-close。

注意，切換狀態的 class name 只應出現在模塊、項目(li) 或 表單(input、select、textarea)項目的父 span (.text、.select、.radio...etc)，不應出現在其他地方。

**假如切換狀態的行為是發生在清單群組上，那麼切換的狀態應寫在清單群組的 li 上。**
**若切換狀態的行為是發生在該模組中，那麼切換的狀態應寫在模組上。**




<h2 id="erb">erb 實作</h2>
<h3 id="erb-directory">erb 目錄結構</h3>
以下是 erb 目錄結構圖及說明。

    - 專案目錄
      |- erb
      |   |- base
      |   |   |- _base-article.html.erb
      |   |   |- _base-aside.html.erb
      |   |   |- _base-content_index.html.erb
      |   |   |- _base-content_page.html.erb
      |   |   |- _base-extend.html.erb
      |   |   |- _base-footer.html.erb
      |   |   |- _base-header.html.erb
      |   |   |- _base-mobile.html.erb
      |   |   |- _base-module-area_index.html.erb
      |   |   |- _base-module-area_page.html.erb
      |   |   |- _base-page-area.html.erb
      |   |   |- _base-section.html.erb
      |   |   |- _base-wrapper.html.erb
      |   |- group
      |   |   |- 群組模塊...
      |   |- module
      |   |   |- 模組模塊...
      |   |- sys
      |   |   |- _icon.html.erb
      |   |   |- _meta.html.erb
      |   |   |- _script.html.erb
      |   |   |- _style.html.erb
      |   |   |- _test.html.erb
      |   |   |- _title.html.erb
      |   |   |- _variable.html.erb


<table>
  <tr>
    <th>文件、目錄</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>base</td>
    <td>存放 base 框架樣板的目錄</td>
  </tr>
  <tr>
    <td>base/_base-article.html.erb</td>
    <td>編輯 base-article 樣板的文件</td>
  </tr>
  <tr>
    <td>base/_base-aside.html.erb</td>
    <td>編輯 base-aside 樣板的文件</td>
  </tr>
  <tr>
    <td>base/_base-content_index.html.erb</td>
    <td>編輯 base-content 樣板的文件，供首頁使用</td>
  </tr>
  <tr>
    <td>base/_base-content_page.html.erb</td>
    <td>編輯 base-content 樣板的文件，供內頁使用</td>
  </tr>
  <tr>
    <td>base/_base-extend.html.erb</td>
    <td>編輯 base-extend 樣板的文件</td>
  </tr>
  <tr>
    <td>base/_base-footer.html.erb</td>
    <td>編輯 base-footer 樣板的文件</td>
  </tr>
  <tr>
    <td>base/_base-header.html.erb</td>
    <td>編輯 base-header 樣板的文件</td>
  </tr>
  <tr>
    <td>base/_base-mobile.html.erb</td>
    <td>編輯 base-mobile 樣板的文件</td>
  </tr>
  <tr>
    <td>base/_base-module-area_index.html.erb</td>
    <td>編輯 base-module-area 樣板的文件，供首頁使用</td>
  </tr>
  <tr>
    <td>base/_base-module-area_page.html.erb</td>
    <td>編輯 base-module-area 樣板的文件，供內頁使用</td>
  </tr>
  <tr>
    <td>base/_base-page-area.html.erb</td>
    <td>編輯 base-page-area 樣板的文件</td>
  </tr>
  <tr>
    <td>base/_base-section.html.erb</td>
    <td>編輯 base-section 樣板的文件</td>
  </tr>
  <tr>
    <td>base/_base-wrapper.html.erb</td>
    <td>編輯 base-wrapper 樣板的文件</td>
  </tr>
  <tr>
    <td>group</td>
    <td>存放 group 樣板的目錄</td>
  </tr>
  <tr>
    <td>module</td>
    <td>存放 module 樣板的目錄</td>
  </tr>
  <tr>
    <td>sys</td>
    <td>存放 head 設定的樣板如：icon、meta、script、style、title，另有測試用的 test 與全域變數設定檔 variable</td>
  </tr>
  <tr>
    <td>sys/_icon.html.erb</td>
    <td>設定 ico 引入的文件</td>
  </tr>
  <tr>
    <td>sys/_meta.html.erb</td>
    <td>設定 meta 設定的文件</td>
  </tr>
  <tr>
    <td>sys/_script.html.erb</td>
    <td>設定網頁 script 引入的文件</td>
  </tr>
  <tr>
    <td>sys/_style.html.erb</td>
    <td>設定網頁樣式引入的文件</td>
  </tr>
  <tr>
    <td>sys/_test.html.erb</td>
    <td>測試用的文件</td>
  </tr>
  <tr>
    <td>sys/_title.html.erb</td>
    <td>設定網頁 title 的文件</td>
  </tr>
  <tr>
    <td>sys/_variable.html.erb</td>
    <td>設定 erb 全域變數的文件</td>
  </tr>
</table>


<h3 id="erb-script">erb 樣板語言</h3>
erb 幫助我們把 HTML 模組化，並提供隨機的內容與字元長度，幫助我們測試版型。
我們可以將個頁面一致的 HTML 存成一個檔案，在檢視時自動嵌套，簡化維護的難度。
erb 主要基於 Ruby 語言，因此可以在裡面使用 Ruby。
更多 erb 樣板語言請參閱 [fire.app erb 樣板語言簡介](http://fireapp.kkbox.com/doc/tw/tutorial_1.HTML)、[Ruby on Rails 實戰聖經 Action View - 樣板設計](https://ihower.tw/rails4/actionview.HTML)。


<h3 id="erb-run">erb 運作方式</h3>
樣板是一段 HTML，在樣板中，我們可以輕易嵌入另一塊樣板，達成 HTML 模組化，以下我將示範如何嵌套一個 .html.erb 檔。

    <div class="base-article" data-index="1" data-type="3" data-child="4"><div class="in">
      <div class="hd"><div class="in">
      </div><h3><span><a>嵌套範本</a></span></h3></div>
      <div class="ct"><div class="in">

        <!--嵌套 /erb/sample -->
        <%= render partial: "/erb/sample" %>

      </div></div>
    </div></div>

我們可藉由演示的語法嵌入 /erb/_sample.html.erb，以下將演示如何傳參數進 erb 檔案。

    <div class="base-article" data-index="1" data-type="3" data-child="4"><div class="in">
      <div class="hd"><div class="in">
      </div><h3><span><a>嵌套範本</a></span></h3></div>
      <div class="ct"><div class="in">

        <!--嵌套 /erb/sample -->
        <%= render partial: "/erb/sample", locals: set({ index: 4, header_text: '模塊標頭' }) %>

      </div></div>
    </div></div>

使用一個 locals: set({  }) 的形式傳遞兩個區域變數 index 與 header_text 進去，index 的參數為 4。
接著演示 /erb/_sample.html.erb 如何接受這個參數。

    <div class="sample" data-index="<%= index %>">
    </div>

我們可以在 _sample.html.erb 檔案中，將 <% %> 中間放入區域變數名，此例即是 index 關鍵字，若要打印在 HTML 裡，則必須加上等號 <%= index %> ，更多教學請參閱 [局部樣板 Partials](https://ihower.tw/rails4/actionview.HTML#partials)。

以下列出幾個平台 erb 樣板常用的區域變數與其意義：

<table>
  <tr>
    <th>變數</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>index</td>
    <td>對應模塊的 data-index 屬性</td>
  </tr>

  <tr>
    <td>class_set</td>
    <td>新增 class name (框架群組無此功能)</td>
  </tr>
  <tr>
    <td>func_set</td>
    <td>對應模塊的 data-func 屬性 (框架群組無此功能)</td>
  </tr>
  <tr>
    <td>header_text</td>
    <td>設定模塊的 header 文字</td>
  </tr>
  <tr>
    <td>show_footer</td>
    <td>設定是否顯示 footer 區塊</td>
  </tr>
  <tr>
    <td>show_mark</td>
    <td>設定是否顯示標籤</td>
  </tr>
  <tr>
    <td>access_key</td>
    <td>設定導盲磚按鍵</td>
  </tr>
  <tr>
    <td>access_title</td>
    <td>設定導盲磚標頭</td>
  </tr>
  <tr>
    <td>inner</td>
    <td>若模塊內鑲嵌其他模塊，可指定鑲入檔案</td>
  </tr>
</table>

關於所有的變數，可參閱 erb/module/_simple-text_test-require.html.erb 的內容。


<h3 id="erb-layout">關於 layout 樣板</h3>
layout.html.erb 是所有網頁的預設樣板，會將專案中的 html.erb 與 .HTML 檔案嵌入指定的框架裡。


<h3 id="erb-index-layout">關於 index樣板</h3>
但首頁的樣板有別於一般內頁，因此必需另外編輯樣板 _index_layout.html.erb 供 index.html.erb 使用。
index.html.layout 指明 _index_layout.html.erb 為 index.html.erb 的樣板。


<h3 id="erb-variable">關於 sys/variable</h3>
在 [erb 運作方式](#erb-run) 曾提及區域變數的使用方式，另有全域變數設定在 /erb/sys__variable.html.erb。
全域變數以 $ 前輟命名，使用方式如同區域變數一般。

    <div class="sample" data-type="<%= $module %>">
    </div>


<h3 id="lorem-ipsum-and-picture">假字與圖片</h3>
erb 提供了假字及假圖的功能，使用方式請參閱 [更新更強大的網頁設計師好幫手 Fire.app 進階篇](http://demo.tc/post/758)。




<h2 id="scss">CSS/SCSS 實作</h2>
<h3 id="scss-directory">SCSS 目錄結構</h3>
以下是 Scss 目錄結構圖及說明。

    - 專案目錄
      |- SCSS
      |   |- base
      |   |   |- _function.scss
      |   |   |- _icon-font.scss
      |   |   |- _layout.scss
      |   |   |- _variable.scss
      |   |- group
      |   |   |- _group.scss
      |   |   |- _group_list.scss
      |   |   |- _group_tab.scss
      |   |- module
      |   |   |- _area-customize.scss
      |   |   |- _area-editor.scss
      |   |   |- _area-essay.scss
      |   |   |- _area-figure.scss
      |   |   |- _area-form.scss
      |   |   |- _area-table.scss
      |   |   |- _list-multiple.scss
      |   |   |- _list-pic.scss
      |   |   |- _list-text.scss
      |   |   |- _simple-pic.scss
      |   |   |- _simple-text.scss
      |   |- sys
      |   |   |- _function.scss
      |   |   |- _global.scss
      |   |   |- _grid.scss
      |   |   |- _icon-font.scss
      |   |   |- _icon-pic.scss
      |   |   |- _normalize.scss
      |   |   |- _variable.scss
      |   |- global.scss
      |   |- page.scss
      |   |- print.scss

<table>
  <tr>
    <th>文件、目錄</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>base</td>
    <td>存放 Scss 基本設定的目錄</td>
  </tr>
  <tr>
    <td>base/_function.scss</td>
    <td>基礎級方法，可依切板需求修改文件</td>
  </tr>
  <tr>
    <td>base/_icon-font.scss</td>
    <td>文字 icon 基礎級設定</td>
  </tr>
  <tr>
    <td>base/_layout.scss</td>
    <td>版面 Scss 設定</td>
  </tr>
  <tr>
    <td>base/_variable.scss</td>
    <td>基礎級變數，可依切板需求修改文件</td>
  </tr>
  <tr>
    <td>group</td>
    <td>存放群組樣式目錄</td>
  </tr>
  <tr>
    <td>group/_group.scss</td>
    <td>分割、單欄群組樣式設定</td>
  </tr>
  <tr>
    <td>group/_group_list.scss</td>
    <td>清單群組樣式設定</td>
  </tr>
  <tr>
    <td>group/_group_tab.scss</td>
    <td>頁籤群組樣式設定</td>
  </tr>
  <tr>
    <td>module</td>
    <td>存放模組樣式目錄</td>
  </tr>
  <tr>
    <td>module/_area-customize.scss</td>
    <td>對應模組 area-customize 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_area-editor.scss</td>
    <td>對應模組 area-editor 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_area-essay.scss</td>
    <td>對應模組 area-essay 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_area-figure.scss</td>
    <td>對應模組 area-figure 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_area-form.scss</td>
    <td>對應模組 area-form 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_area-table.scss</td>
    <td>對應模組 area-table 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_list-multiple.scss</td>
    <td>對應模組 list-multiple 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_list-pic.scss</td>
    <td>對應模組 list-pic 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_list-text.scss</td>
    <td>對應模組 list-text 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_simple-pic.scss</td>
    <td>對應模組 simple-pic 類別的樣式設定</td>
  </tr>
  <tr>
    <td>module/_simple-text.scss</td>
    <td>對應模組 simple-text 類別的樣式設定</td>
  </tr>
  <tr>
    <td>sys</td>
    <td>存放系統級設定的目錄</td>
  </tr>
  <tr>
    <td>sys/_function.scss</td>
    <td>系統級方法，非必要請勿修改文件</td>
  </tr>
  <tr>
    <td>sys/_global.scss</td>
    <td>整合 sys/variable、base/variable、sys/function、base/function、sys/icon-font、base/icon-font、sys/icon-pic 的基本 Scss 檔</td>
  </tr>
  <tr>
    <td>sys/_grid.scss</td>
    <td>格線系統，更多資訊請參閱 [格線系統](#grid) 章節。 </td>
  </tr>
  <tr>
    <td>sys/_icon-font.scss</td>
    <td>文字 icon 系統級設定，更多資訊請參閱 [文字圖示](#scss-font-icon) 章節</td>
  </tr>
  <tr>
    <td>sys/_icon-pic.scss</td>
    <td>sprite 圖的系統級設定，更多資訊請參閱 [sprite 圖示](#scss-sprite-picture) 章節</td>
  </tr>
  <tr>
    <td>sys/_normalize.scss</td>
    <td>normalize.css，相關資訊請參閱 (normalize.css)[https://necolas.github.io/normalize.css/]</td>
  </tr>
  <tr>
    <td>sys/_variable.scss</td>
    <td>系統級變數，非必要請勿修改文件</td>
  </tr>
  <tr>
    <td>global.scss</td>
    <td>整合 sys/normalize、sys/grid、base/layout 與所有群組與模組的檔案，將會匯出 global.css</td>
  </tr>
  <tr>
    <td>page.scss</td>
    <td>內頁將會額外引入的樣式設定檔案，將會匯出 page.css</td>
  </tr>
  <tr>
    <td>print.scss</td>
    <td>列印將會被應用的樣式設定檔案，將會匯出 print.css</td>
  </tr>
</table>


<h3 id="scss-script">SCSS</h3>
Sass 是為了增強 CSS 而設計的語言，Scss 則是 Sass 另一種寫法。
它讓 CSS 可以使用變數、函式，提升撰寫 CSS 的效率，更多教學請參閱 [Sass 用法指南](http://www.ruanyifeng.com/blog/2012/06/sass.HTML)。

<h3 id="grid">格線系統</h3>
平台格線系統分為**自然分割**與**設定分割**。
分割群組均分子模塊寬度，是**依據 [data-child] 的值作判斷**。
例如分割模組([data-type="1"])具有兩個子模塊([data-child="2"])，那麼就會自然均分子模塊(具有 [data-index][data-type] 的節點)，稱為自然分割：

    [data-type="1"][data-child="2] > .inner > .content > .inner > [data-index][data-type] {
      width: 50%; //100% / 2
    }

設定分割是依據 [data-setLen] 的值作為 CSS 判斷，將會覆蓋自然分割的設定。
例如分割模組([data-type="1"])設定2排均分([data-setLen="2"])，那麼就會均分子模塊([data-index][data-type])：

    [data-type="1"][data-setLen="2] > .inner > .content > .inner > [data-index][data-type] {
      width: 50%; //100% / 2
    }

更多關於 [data-setLen] 的說明，請連結說明至 [關於設定數量的方法](#scss-len-function) 章節。


<h3 id="scss-type">類別</h3>
相同類別的模塊樣式，都撰寫在同一支 SCSS 檔案中。如：

    <div class="list-text nav" data-type="0"></div>
    <div class="list-text font-size" data-type="0"></div>

以上兩個模塊的樣式，都在 /Sass/module/list-text.scss 中，便於快速的參考、交換、複製其他相同類別的模塊樣式。

    .list-text {

      &.nav {
        ...
      }

      &.font-size {
        ...
      }
    }


<h3 id="selector-logic">選擇器邏輯</h3>
模組與群組的結構十分相似，.group-list 與 .list-text、.list-pic 的結構也十分相似，甚至所有模塊的 footer 與 header 長得幾乎相同，因此樣式的交換上十分便利，但還是要注意權重指定的問題。

一般來說，在設定樣式的時候，應盡可能減少指定的層數：

    .list-text {

      &.nav {

        .ct {
          ...
        }
      }
    }

一個模組只會有一個 ct，因此可以用這種選取方法指定到唯一的 ct。
**但群組下可能會有許多模塊，每個模塊都有自己的 ct**，因此若要指明群組自己的的 ct，必須如下指定：

    [data-index][data-type="1"] {

      &.group {

        > .in {

          > .ct {
            ...
          }
        }
      }
    }

此外，**行為必須寫在發生行為的模塊上**，如主選單群組的子模塊觸發 :hover，秀出該模塊的 content，這個行為應該寫在 主選單群組，而非子模塊(群組行為)。

我們也可以指定同一模塊在不同框架下的樣式，例如：

    .nav {

      .base-header & {
       color: #000;
      }

      .base-footer & {
       color: #555;
      }
    }

那麼 nav 模塊就會在 base-header 框架下被設為 color: #000，在 base-footer框架下被設為 color: #555。
更多框架區塊可參閱 [底層、框架與內容](#base-layout)。


<h3 id="function-and-variable">base/variable、base/function 與 sys/function</h3>
base/function 與 base/variable 將常用的變數與功能定義在一起，sys/function 則負責定義一些底層方法。


以下首先說明 base/variable 的一些常用內容：

<table>
  <tr>
    <th colspan="3">$ 變數</th>
  </tr>
  <tr>
    <td>設定</td>
    <td>$debug</td>
    <td>是否啟用除錯模式(會提示掉圖、掉文字圖示)</td>
  </tr>
  <tr>
    <td></td>
    <td>$rwd</td>
    <td>是否啟用 rwd(如不啟用，將忽略 RWD 樣式設定)</td>
  </tr>

  <tr>
    <td>灰階</td>
    <td>$white</td>
    <td>非常淺</td>
  </tr>
  <tr>
    <td></td>
    <td>$light</td>
    <td>白色</td>
  </tr>
  <tr>
    <td></td>
    <td>$light-gray</td>
    <td>淺灰</td>
  </tr>
  <tr>
    <td></td>
    <td>$gray</td>
    <td>灰色</td>
  </tr>
  <tr>
    <td></td>
    <td>$deep-gray</td>
    <td>深灰</td>
  </tr>
  <tr>
    <td></td>
    <td>$deep</td>
    <td>深色</td>
  </tr>
  <tr>
    <td></td>
    <td>$black</td>
    <td>黑色</td>
  </tr>
  <tr>
    <td>主要版面顏色</td>
    <td>$major-color</td>
    <td>主色</td>
  </tr>
  <tr>
    <td></td>
    <td>$minor-color</td>
    <td>次色</td>
  </tr>
  <tr>
    <td>其他版面顏色</td>
    <td>$lesser1-color</td>
    <td>更次色(設定多個為 $lesser2-color、$lesser3-color...)</td>
  </tr>
  <tr>
    <td>文字顏色</td>
    <td>$title-color</td>
    <td>標題色</td>
  </tr>
  <tr>
    <td></td>
    <td>$span-color</td>
    <td>附註色</td>
  </tr>
  <tr>



  </tr>
  <tr>
    <td>文字大小(建議使用 em)</td>
    <td>$font-size-xs</td>
    <td>極小字</td>
  </tr>
  <tr>
    <td></td>
    <td>$font-size-s</td>
    <td>小字</td>
  </tr>
  <tr>
    <td></td>
    <td>$font-size-m</td>
    <td>一般字</td>
  </tr>
  <tr>
    <td></td>
    <td>$font-size-l</td>
    <td>大字</td>
  </tr>
  <tr>
    <td></td>
    <td>$font-size-xl</td>
    <td>極大字</td>
  </tr>
  <tr>
    <td>文字厚度</td>
    <td>$font-weight-n</td>
    <td>一般字體</td>
  </tr>
  <tr>
    <td></td>
    <td>$font-weight-b</td>
    <td>粗字體</td>
  </tr>
  <tr>
    <td>文字行高</td>
    <td>$line-height-xs</td>
    <td>極小行高</td>
  </tr>
  <tr>
    <td></td>
    <td>$line-height-s</td>
    <td>小行高</td>
  </tr>
  <tr>
    <td></td>
    <td>$line-height-m</td>
    <td>一般行高</td>
  </tr>
  <tr>
    <td></td>
    <td>$line-height-l</td>
    <td>高行高</td>
  </tr>
  <tr>
    <td></td>
    <td>$line-height-xl</td>
    <td>極高行高</td>
  </tr>
  <tr>
    <td>文字間格</td>
    <td>$letter-spacing-xs</td>
    <td>極小文字間隔</td>
  </tr>
  <tr>
    <td></td>
    <td>$letter-spacing-s</td>
    <td>小文字間隔</td>
  </tr>
  <tr>
    <td></td>
    <td>$letter-spacing-m</td>
    <td>中文字間隔</td>
  </tr>
  <tr>
    <td></td>
    <td>$letter-spacing-l</td>
    <td>寬字間隔</td>
  </tr>
  <tr>
    <td></td>
    <td>$letter-spacing-xl</td>
    <td>極寬文字間隔</td>
  </tr>
  <tr>
    <td>透明度</td>
    <td>$opacity-vl</td>
    <td>極低透明度</td>
  </tr>
  <tr>
    <td></td>
    <td>$opacity-l</td>
    <td>低透明度</td>
  </tr>
  <tr>
    <td></td>
    <td>$opacity-m</td>
    <td>中等透明度</td>
  </tr>
  <tr>
    <td></td>
    <td>$opacity-h</td>
    <td>高透明度</td>
  </tr>
  <tr>
    <td></td>
    <td>$opacity-vh</td>
    <td>極高透明度</td>
  </tr>
  <tr>
    <td>間隔設定</td>
    <td>$interval-xs</td>
    <td>極窄間隔</td>
  </tr>
  <tr>
    <td></td>
    <td>$interval-s</td>
    <td>窄間隔</td>
  </tr>
  <tr>
    <td></td>
    <td>$interval-m</td>
    <td>中等間隔</td>
  </tr>
  <tr>
    <td></td>
    <td>$interval-l</td>
    <td>寬間隔</td>
  </tr>
  <tr>
    <td></td>
    <td>$interval-xl</td>
    <td>極寬間隔</td>
  </tr>
  <tr>
    <td>基本動畫速度</td>
    <td>$transition</td>
    <td>動畫速度</td>
  </tr>
  <tr>
    <td>RWD設定</td>
    <td>$pc-width</td>
    <td>PC 版寬度</td>
  </tr>
  <tr>
    <td></td>
    <td>$pad-width</td>
    <td>Pad 版寬度</td>
  </tr>
  <tr>
    <td></td>
    <td>$phone-width</td>
    <td>手機版寬度</td>
  </tr>
  <tr>
    <td></td>
    <td>$rwd-btn-size</td>
    <td>手機側欄按鈕大小</td>
  </tr>
  <tr>
    <td>grid 框架設定</td>
    <td>$min-child</td>
    <td>最少的child數量</td>
  </tr>
  <tr>
    <td></td>
    <td>$max-child</td>
    <td>最多的child數量</td>
  </tr>
  <tr>
    <td></td>
    <td>$min-setLen</td>
    <td>最少的單行數量</td>
  </tr>
  <tr>
    <td></td>
    <td>$max-setLen</td>
    <td>最多的單行數量</td>
  </tr>
  <tr>
    <td>預設空文字</td>
    <td>$content</td>
    <td>空偽類的字元</td>
  </tr>
  <tr>
    <td>預設陰影</td>
    <td>$box-shadow</td>
    <td>區塊陰影</td>
  </tr>
  <tr>
    <td></td>
    <td>$text-shadow</td>
    <td>文字陰影</td>
  </tr>
  <tr>
    <td>文字圖示</td>
    <td>$icon-font-size</td>
    <td>文字圖示大小</td>
  </tr>
  <tr>
    <td></td>
    <td>$icon-font-color</td>
    <td>文字圖示顏色</td>
  </tr>
  <tr>
    <td>全頁文字</td>
    <td>$body-font-color</td>
    <td>網站文字顏色</td>
  </tr>
  <tr>
    <td></td>
    <td>$body-font-size-s</td>
    <td>"小"字級文字設定</td>
  </tr>
  <tr>
    <td></td>
    <td>$body-font-size-m</td>
    <td>"中"字級文字設定</td>
  </tr>
  <tr>
    <td></td>
    <td>$body-font-size-l</td>
    <td>"大"字級文字設定</td>
  </tr>
  <tr>
    <td>預設線條</td>
    <td>$border-style</td>
    <td>預設線條樣式</td>
  </tr>
  <tr>
    <td></td>
    <td>$border-width</td>
    <td>預設線條寬度</td>
  </tr>
  <tr>
    <td></td>
    <td>$border-color</td>
    <td>預設線條顏色</td>
  </tr>
  <tr>
    <td></td>
    <td>$border</td>
    <td>預設線條設定</td>
  </tr>
  <tr>
    <td>預設圓角</td>
    <td>$border-radius</td>
    <td>預設圓角設定</td>
  </tr>
  <tr>
    <td>連結顏色</td>
    <td>$link-color</td>
    <td>連結顏色</td>
  </tr>
  <tr>
    <td></td>
    <td>$visited-color</td>
    <td>造訪過連結顏色</td>
  </tr>
  <tr>
    <td></td>
    <td>$hover-color</td>
    <td>指標移入連結顏色，不可與任何底色重疊</td>
  </tr>
  <tr>
    <td></td>
    <td>$active-color</td>
    <td>點擊連結顏色</td>
  </tr>
  <tr>
    <td>按鈕樣式</td>
    <td>$btn-bg-color</td>
    <td>按鈕背景色</td>
  </tr>
  <tr>
    <td></td>
    <td>$btn-hover-bg-color</td>
    <td>按鈕滑入顏色</td>
  </tr>
  <tr>
    <td></td>
    <td>$btn-text-color</td>
    <td>按鈕文字顏色</td>
  </tr>
  <tr>
    <td></td>
    <td>$btn-padding</td>
    <td>按鈕內邊距，決定按鈕大小</td>
  </tr>
  <tr>
    <td></td>
    <td>$btn-padding-xs</td>
    <td>按鈕內邊距，決定按鈕大小</td>
  </tr>
  <tr>
    <td></td>
    <td>$btn-border</td>
    <td>按鈕線框</td>
  </tr>
  <tr>
    <td>輸入框樣式</td>
    <td>$input-border</td>
    <td>輸入框線框</td>
  </tr>
  <tr>
    <td></td>
    <td>$input-padding</td>
    <td>輸入框內邊距，決定輸入框大小</td>
  </tr>
  <tr>
    <td></td>
    <td>$input-bg-color</td>
    <td>輸入框背景色</td>
  </tr>
  <tr>
    <td>特殊字元"\"</td>
    <td>$backslash</td>
    <td>逃逸字元\</td>
  </tr>
  <tr>
    <td>分享</td>
    <td>$share-map</td>
    <td>圖片 & 顏色物件</td>
  </tr>
  <tr>
    <td>檔案類型</td>
    <td>$file-type-map</td>
    <td>圖片 & 顏色物件，下載項目的類型</td>
  </tr>
  <tr>
    <td>瀏覽器媒體</td>
    <td>$hack</td>
    <td>提供 @mixin hack() 方法使用，用 hack</td>
  </tr>
  <tr>
    <td></td>
    <td>$media</td>
    <td>提供 @mixin media() 方法使用，用於 RWD</td>
  </tr>
  <tr>
    <td>瀏覽器支持</td>
    <td>$supports</td>
    <td>提供 @mixin supports() 方法使用，用於 hack</td>
  </tr>
</table>

以下說明 base/function 的內容：

<table>
  <tr>
    <th colspan="2">%extend 樣式</th>
  </tr>
  <tr>
    <td>%reset-outer</td>
    <td>重新設定外部樣式</td>
  </tr>
  <tr>
    <td>%reset-inner</td>
    <td>重新設定內部樣式</td>
  </tr>
  <tr>
    <td>%reset</td>
    <td>重新設定全部樣式</td>
  </tr>
  <tr>
    <td>%clear-inner-module</td>
    <td>清除內部模塊的 margin</td>
  </tr>
  <tr>
    <td>%clear</td>
    <td>偽類清除浮動的方法</td>
  </tr>
  <tr>
    <td>%hide-text</td>
    <td>隱藏文字的方法</td>
  </tr>
  <tr>
    <td>%ellipsis</td>
    <td>超過範圍文字變成'...'的方法</td>
  </tr>
  <tr>
    <td>%cover-bg</td>
    <td>cover 底圖</td>
  </tr>
  <tr>
    <td>%contain-bg</td>
    <td>contain 底圖</td>
  </tr>
  <tr>
    <td>%icon</td>
    <td>偽類作為行內icon的方法</td>
  </tr>
  <tr>
    <td>%icon-pic</td>
    <td>偽類作為行內icon-pic的方法，請參閱 /bace/icon-pic</td>
  </tr>
  <tr>
    <td>%icon-font</td>
    <td>偽類作為行內icon-font的方法，請參閱 /bace/icon-font</td>
  </tr>
  <tr>
    <td>%center</td>
    <td>齊中寬度</td>
  </tr>
  <tr>
    <td>%title</td>
    <td>模組、內頁 title</td>
  </tr>
  <tr>
    <td>%module</td>
    <td>模組</td>
  </tr>
  <tr>
    <td>%module-area</td>
    <td>首頁模組</td>
  </tr>
  <tr>
    <td>%page</td>
    <td>內頁</td>
  </tr>
  <tr>
    <td>%page-area</td>
    <td>內頁模組</td>
  </tr>
  <tr>
    <td>%mobile</td>
    <td>手機側欄模組</td>
  </tr>
  <tr>
    <td>%mobile-area</td>
    <td>手機側欄模組</td>
  </tr>
  <tr>
    <td>%caption</td>
    <td>標題組件</td>
  </tr>
  <tr>
    <td>%label</td>
    <td>標籤組件</td>
  </tr>
  <tr>
    <td>%mark</td>
    <td>標籤元件</td>
  </tr>
  <tr>
    <td>%paragraph</td>
    <td>第二種標籤元件</td>
  </tr>
  <tr>
    <td>%btn</td>
    <td>按鈕樣式</td>
  </tr>
  <tr>
    <td>%btn-s</td>
    <td>小按鈕</td>
  </tr>
  <tr>
    <td>%btn-imp</td>
    <td>important 重要的按鈕</td>
  </tr>
  <tr>
    <td>%input</td>
    <td>輸入框樣式</td>
  </tr>
  <tr>
    <td>%article</td>
    <td>內文文章樣式</td>
  </tr>
  <tr>
    <td>%list</td>
    <td>列表樣式</td>
  </tr>
  <tr>
    <td>%list-hover</td>
    <td>列表 :hover 樣式</td>
  </tr>
  <tr>
    <td>%mask</td>
    <td>圖片遮罩</td>
  </tr>
  <tr>
    <td>%footer-btns</td>
    <td>更多按鈕</td>
  </tr>
  <tr>
    <td>%table</td>
    <td>表單樣式</td>
  </tr>
  <tr>
    <td>%table-hover</td>
    <td>表單 :hover 樣式</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="3">@mixin 涵式</th>
  </tr>
  <tr>
    <td>re-ellipsis()</td>
    <td>無參數</td>
    <td>反 %ellipsis 的方法</td>
  </tr>
  <tr>
    <td>bg-to-pic($img-src, $size, $height)</td>
    <td>$img-src：圖片路徑(字串), $size(可選)：是否匯出圖片寬高(布林), 匯出指定倍數大小(數字), $height(可選)：指定高度(數字)</td>
    <td>依圖改變大小並置中</td>
  </tr>
  <tr>
    <td>icon-pic($img-src, $size, $height)</td>
    <td>$img-src：圖片路徑(字串), $size(可選)：是否匯出圖片寬高(布林) 匯出指定倍數大小(數字), $height(可選)：指定高度(數字)</td>
    <td>取雪碧圖icon</td>
  </tr>
  <tr>
    <td>icon-font($font)</td>
    <td>$font：文字圖示名稱(字串)</td>
    <td>文字圖示，列表請參閱 https://icomoon.io</td>
  </tr>
  <tr>
    <td>icon-pic-btn($img-src, $size, $height)</td>
    <td>$img-src： 圖片路徑(字串), $size(可選)：是否匯出圖片寬高(布林) 匯出指定倍數大小(數字), $height(可選)：指定高度(數字)</td>
    <td>只有icon圖片的按鈕，隱含 佔用了:before</td>
  </tr>
  <tr>
    <td>default-min-len($type, $default-len, $max-len)</td>
    <td>$type：使用模塊類別(數字), $default-len：預設的項目數量(數字), $max-child(可選)：最大的項目數量(數字)</td>
    <td>設定預設的最小單行數量</td>
  </tr>
  <tr>
    <td>default-len($type, $len)</td>
    <td>$type：使用模塊類別(數字), len：預設的項目數量(數字)</td>
    <td>設定預設的單行數量</td>
  </tr>
  <tr>
    <td>default-len-hide($type, $len)</td>
    <td>$type：使用模塊類別(數字), len：預設的項目數量(數字)</td>
    <td>設定預設的單行數量，並且隱藏超過的</td>
  </tr>
  <tr>
    <td>set-len($type, $len)</td>
    <td>$type：使用模塊類別(數字), len：預設的項目數量(數字)</td>
    <td>手動設定單行數量</td>
  </tr>
  <tr>
    <td>set-len-hide($type, $len)</td>
    <td>$type：使用模塊類別(數字), len：預設的項目數量(數字)</td>
    <td>手動設定單行數量，並且隱藏超過的</td>
  </tr>
  <tr>
    <td>len-rwd($key, $len, $int)</td>
    <td>$key：$media 物件中的 $key(字串), len：預設的項目數量(數字), int(可選)：被計算的基數(數字)</td>
    <td>手動設定 rwd 數量</td>
  </tr>
  <tr>
    <td>rwd($max, $min)</td>
    <td>$max：最大寬度設定(數字), $min(可選)：最小寬度設定(數字)</td>
    <td>自訂 RWD 寬度</td>
  </tr>
  <tr>
    <td>at($selector)</td>
    <td>$selector：選擇器(字串)</td>
    <td>在某個選擇器下的樣式</td>
  </tr>
  <tr>
    <td>hack($key)</td>
    <td>$key：$hack 物件中的 $key(字串)</td>
    <td>查詢瀏覽器媒體，給 hack 用</td>
  </tr>
  <tr>
    <td>media($key)</td>
    <td>$key：$media 物件中的 $key(字串)</td>
    <td>查詢瀏覽器媒體，給 rwd 用</td>
  </tr>
  <tr>
    <td>supports($key)</td>
    <td>$key：$supports 物件中的 $key(字串) 或是供判斷式使用的字串</td>
    <td>查詢瀏覽器媒體與瀏覽器支持，在不同情況下呈現不同樣式，是 CSS3 正式規範的判斷工具 @supports</td>
  </tr>
  <tr>
    <td>js($boolean)</td>
    <td>$boolean：瀏覽器是否有開啟 js(布林)</td>
    <td>有/無 js下的樣式表現</td>
  </tr>
  <tr>
    <td>admin($boolean)</td>
    <td>$boolean：瀏覽者是否為管理員(布林)</td>
    <td>管理員/一般使用者 登入的樣式</td>
  </tr>
</table>

以下說明 sys/function 的內容：

<table>
  <tr>
    <th colspan="3">@function 方法</th>
  </tr>
  <tr>
    <td>lighter($color, $int, $base)</td>
    <td>$color：顏色(字串), $int： 變亮的倍數(數字), $base(可選)：變亮倍數的基數(數字)</td>
    <td>顏色變亮方法</td>
  </tr>
  <tr>
    <td>deeper($color,$int,$base)</td>
    <td>$color：顏色(字串), $int：變暗的倍數(數字), $base(可選)：變暗倍數的基數(數字)</td>
    <td>顏色變暗方法</td>
  </tr>
</table>


<h3 id="scss-sys-variable">關於 sys/variable</h3>
我們可以開放一些變數，讓共通平台後臺覆蓋設定。但在命名變數時，**必須後輟 !default** 如：

    $major-color: #0088cc !default;

接著在 sys/variable 加入相應的註解，並依序加入 ,解釋 ,input type，格式如：

    // $major-color,主色,color


<h3 id="scss-noscript">noscript 方法</h3>
為了盡量避免使用 noscript 標籤，推薦使用平台提供的 @mixin js() 方法，以下將示範如何撰寫無 js 的樣式：

    .sys-root {
      color: #000;

      @include js(false) {
        color: #555;
      }
    }

在一般的的狀況下，.sys-root 的 color 是 #000，一但關閉了 js，.sys-root 的 color 就變成了 #555。
我們也可以透過 :before 或 :after 來插入引導文字。

具體的實作方法是在 body 加入 data-js 的屬性，在網站開始渲染之前，透過 javascript 把 data-js 設為 true，並將選擇器放在 [data-js="false"] 中。


<h3 id="scss-hack">hack 方法</h3>
平台設計了兩種 hack 方法，分別是 @mixin hack() 與 @mixin supports()，都是透過 @media query 的方式實作。

$hack 物件中彙整了一些針對瀏覽器設定的 @media query，只有特定的瀏覽器才能閱讀，以下示範將如何利用 @mixin hack()：

    .sys-root {
      color: #000;

      @include hack('ie6-7-8') {
        color: #555;
      }
    }

在一般的瀏覽器中，.sys-root 的 color 是 #000，在 ie6-7-8 的版本裡，.sys-root 的 color 就變成了 #555。
更多的瀏覽器選擇請參閱 $hack 物件。

另一個方法是透過 @mixin supports() 方法，我們一樣在 $supports 中整理了一些方法以判別瀏覽器，我們可以像使用 @mixin hack() 的方法去使用 @mixin supports()：

    .sys-root {
      color: #000;

      @include supports('gc28+') {
        color: #555;
      }
    }

@mixin supports() 同時也是 CSS3 正式規範的判斷工具 @supports，例如我們可以判斷瀏覽器有沒有支援 display: flex，如果有，就設定 color: #555;：

    .sys-root {
      color: #000;

      @include supports('display: flex') {
        color: #555;
      }
    }

但一些較老舊的瀏覽器沒有提供 @supports 方法，需特別注意。


<h3 id="scss-rwd">rwd 方法</h3>
平台提供了兩種 rwd 方法分別是 @mixin media() 與 @mixin rwd()，注意，當 $rwd 變數為 true 時，這些方法才能被使用。

@mixin media() 可以使用 $media 物件裡的項目設定，分別是 center、pc、mobile、pad 與 phone，以下列表說明：

<table>
  <tr>
    <td>center</td>
    <td>當瀏覽器尺寸小於 $pc-width</td>
  </tr>
  <tr>
    <td>pc</td>
    <td>當瀏覽器尺寸介於 $pc-width 與 $pad-width 之間。</td>
  </tr>
  <tr>
    <td>mobile</td>
    <td>當瀏覽器尺寸小於 $pad-width</td>
  </tr>
  <tr>
    <td>pad</td>
    <td>當瀏覽器尺寸介於 $pad-width 與 $phone-width 之間。</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>當瀏覽器尺寸小於 $phone-width</td>
  </tr>
</table>

以下示範如何使用 @mixin media() 方法：

    .sys-root {
      color: #000;

      @include media('phone') {
        color: #555;
      }
    }

在預設的樣式設定中，.sys-root 的 color 是 #000 ，在 phone 的尺寸中，.sys-root 的 color 就變成了 #555。

另外，@mixin rwd() 方法允許我們設定兩個數字參數(第二個參數可選用)，當瀏覽器尺寸介於兩個尺寸之間，網頁就會引用該樣式：

    .sys-root {
      color: #000;

      @include rwd(800, 300) {
        color: #555;
      }
    }

.sys-root 的 color 是 #000 ，當瀏覽器尺寸介於 800px 與 300px 之間，.sys-root 的 color 就變成了 #555。
若第二個參數沒有值，表示在第一個尺寸以下的解析度都會引入該樣式：

    .sys-root {
      font-size: 1em;

      @include rwd(600) {
        font-size: 1.2em;
      }
    }

.sys-root 的 font-size 是 1em ，當瀏覽器尺寸小於 600px，.sys-root 的 font-size 就變成了 1.2em。


<h3 id="scss-admin">admin 方法</h3>
為了讓 管理者/一般使用者 能取用不同樣式，請使用平台提供的 @mixin admin() 方法，以下將示範如何使用 @mixin admin()：

    .sys-root {
      color: #000;

      @include admin(true) {
        color: #555;
      }
    }

在一般使用者的狀況下，.sys-root 的 color 是 #000，如果是管理者，.sys-root 的 color 就變成了 #555。


<h3 id="rwd-hide">在 pc、pad、phone 寬度隱藏模塊</h3>
我們可以指定模塊在 pc、pad、phone 尺寸中隱藏，只要在欲隱藏的區塊加入 .is-pc-hide .is-pad-hide .is-phone-hide 相應的 class 即可。該方法的設定存在 base/_layout.scss 中。


<h3 id="h3 id="rwd-hide">">隱藏模塊 header 的方法</h3>
許多模塊都帶有 .header，但有時候我們希望把 .header 隱藏起來，這時候只需要在模塊加上 .is-hide-header 即可。


<h3 id="scss-font-icon">文字圖示</h3>
文字圖示是一種字型，可以用 font-size 控制大小，color 控制顏色。
本平台引入 icomoon 圖示字型，以作為文字圖示來源，詳細資訊請參閱 [icomoon.io](https://icomoon.io)。

新增字型步驟如下：

  1. 將 icon 包下載回來後，將包裡的 fonts 目錄檔案 .eot .svg .ttf .woff 檔案複製到 /images/icon-font
  2. 開啟 style.css
  3. 將 @font-face 與 [class^="icon-"], [class*=" icon-"] 樣式刪除
  4. ":before" 字串全數刪除
  5. 將 ".icon-" 取代成 "%icon-font-"
  6. 將修改的內容複製至 /Sass/bace/icon-font.scss

<h3 id="scss-sprite-picture">sprite 圖示</h3>
spriting 圖旨在減少HTTP的請求數。將多張小圖合併成一張大圖，再用 css 把小圖取出。

SCSS 能夠自動將指定資料夾中的圖片彙整成大圖，並自動產生 class name 取出。
我們將這個方法彙整進 @mixin icon-pic 方法，以下我們解說 spriting 圖應用的流程：

  1. 將 a.png 圖片放入 images/icon-pic
  2. 在某個選擇器中使用 @include icon-pic('a');

<h3 id="scss-len-function">關於設定數量的方法</h3>
在格線系統，我們依據 [data-child] 參數去設定顯示的寬度，也能使用 [data-setLen] 去覆蓋 [格線系統](#grid) 所定的寬度。

在 .group-list、list-text 與 list-pic 這三種模塊中，我們通常會設定 li 的寬度，但我們也希望使用 [data-setLen] 的方法去覆蓋我們編寫的寬度，
因此有了 @mixin default-len、@mixin default-len-hide、@mixin set-len、@mixin set-len-hide 這四個方法，以下演示使用的方式。

我們會這麼設定 li 的寬度。

    .link {

      .content {

        ul {

          &:after {
            content: '';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
          }
        }

        li {
          width: 50%;
          float: left;
        }
      }
    }

但有了 @mixin default-len，我們可以這麼寫：

    .link {
      @include default-len(0, 2);

      .content {

        ul {

        }

        li {

        }
      }
    }

第一個參數是模塊類型是0，第二個參數是2，表示設定為兩排。
如果使用 default-len-hide，那麼超過設定值(第二個參數)以後的 li 都會被隱藏。

假使我們希望使用 @mixin default-len 的模塊可以使用 [data-setLen] 參數，則須加上 @mixin set-len，若使用 @mixin default-len-hide，則必須搭配 @mixin set-len-hide：

    .link {
      @include default-len(0, 2);
      @include set-len(0);

      .content {

        ul {

        }

        li {

        }
      }
    }

當我們使用這些方法時，就不能用一般的方法設定 li 的 rwd 的寬度，必須用到 @mixin len-rwd 方法：

    .link {
      @include default-len(0, 2);
      @include set-len(0);

      .content {

        ul {

        }

        li {
          @include len-rwd('pad', 2);
          @include len-rwd('phone', 1);
        }
      }
    }




<h2 id="js">javascript/requireJS 實作</h2>
<h3 id="js-directory">Script 目錄結構</h3>
以下是 Script 目錄結構圖及說明。

    - 專案目錄
      |- Script
      |   |- app.js
      |   |- js 模塊...
      |   |- lib
      |   |   |- cookie.js
      |   |   |- domReady.js
      |   |   |- getNode.js
      |   |   |- jqueryPrivate.js
      |   |   |- main.js
      |   |   |- plugin.js
      |   |   |- fix.js

<table>
  <tr>
    <th>文件、目錄</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>app.js</td>
    <td>設定套件縮寫，執行 main.js 的檔案</td>
  </tr>
  <tr>
    <td>lib</td>
    <td>存放套件目錄</td>
  </tr>
  <tr>
    <td>lib/cookie.js</td>
    <td>操作 cookie 的方法套件</td>
  </tr>
  <tr>
    <td>lib/domReady.js</td>
    <td>延遲執行 require.js 的方法套件</td>
  </tr>
  <tr>
    <td>lib/getNode.js</td>
    <td>操作模塊的套件</td>
  </tr>
  <tr>
    <td>lib/jqueryPrivate.js</td>
    <td>引用私有 jquery 的套件</td>
  </tr>
  <tr>
    <td>lib/main.js</td>
    <td>執行 data-func 方法的套件</td>
  </tr>
  <tr>
    <td>lib/plugin.js</td>
    <td>擴充方法</td>
  </tr>
  <tr>
    <td>lib/fix.js</td>
    <td>修正瀏覽器錯誤</td>
  </tr>
</table>


<h3 id="js-require">requireJS 運作方式</h3>
requireJS 能動態插入頁面需要的 script，並解決相依性、套件衝突等問題，並提供模組化管理。
更多有關 requireJS 的介紹，請參閱 [require 官網](http://requirejs.org)。   


<h3 id="node-and-files">以 node 呼叫 javascript 檔案</h3>
先前曾在 [參數與意義](#HTML-parameter) 章節討論過 data-func 屬性的用途。
data-func 可藉由傳入一個字串化物件，來啟動指定的 js 模塊。
js 模塊應存在 /Script 目錄中(可在 app.js 改變基礎路徑)，以下示範一個模組 nav ，啟動一個名為 hud 的 js 模塊：

    <div class="nav" data-type="0" data-func="{'hud':{}}">

data-func 的值為一個物件，{'hud':{}} 中的 hud 為 js 模塊，啟動一個 /Script/hud.js 的檔案。
hud 後面對應的物件為參數物件，你將可以在 hud.js 檔案中接收到這組參數：

    define(function(){

      function main(env, opt, file){
        do something...
      }

      return main;
    });

在 hud.js 中的涵式 main 中會有三個參數，env 表示當前執行節點、opt 就是傳遞進去的參數、file 則是執行的 js 檔案名稱。以此例來說 file 即是 hud。
hud.js 最終回傳一個涵式給 main.js 並執行。
同一個模塊中也可以一次執行多個 js 模塊：

    <div class="nav" data-type="0" data-func="{'hud':{},'slider':{'auto':true}}">

以此例來說，nav 同時啟用了 hud.js、slider.js 兩個 js 模塊，且 slider 傳送了一組參數 'auto':true，我們可以從 opt 取出參數。

    define(function(){

      function main(env, opt, file){
        console.log(opt.auto) //true
      }

      return main;
    });


<h3 id="app-and-main">關於 app.js 與 lib/main</h3>
先前曾在 [Script 目錄結構](#js-directory) 章節討論過 app.js 與 main.js。
app.js 的 requirejs.config 設定了套件的短名與命名配置，以下是 app.js 的程式部分內容：

    requirejs.config({
      baseUrl: '/Scripts',
      paths: {
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min', 'lib/jquery-1.11.3.min']
      },
      map: {
        '*': {
          'jquery': 'lib/jqueryPrivate'
        },
        'lib/jqueryPrivate': {
          'jquery': 'jquery'
        }
      }
    });

以下以列表說明參數意義：

<table>
  <tr>
    <th>baseUrl</th>
    <td>設定 js 模塊的路徑</td>
  </tr>
  <tr>
    <th>paths</th>
    <td>配置套件與相應的關鍵字</td>
  </tr>
  <tr>
    <th>map</th>
    <td>配置關鍵字在各個檔案的意義</td>
  </tr>
</table>

關鍵字的作用在引用套件時，可用關鍵字取出套件內容。引用的方式是利用陣列包含關鍵字，例如某個 js 模塊需要取用 jquery 與 google map：

    define(['jquery','googleMaps'],function(){

      function main(env, opt, file){
        youu can use jquery and google map api here.
      }

      return main;
    });


執行完 require.config 的設定後，接著 app.js 會執行 main.js

    requirejs(['main']);

main.js 會抓出所有設有 data-func 的模塊，接著一一解析 data-func 的內容，接著如果有此 js 檔案，就執行該檔案。
以下是簡化過的 main.js 結構：

    requirejs(['domReady!'], function(dom){
      var $nodes = document.querySelectorAll('[data-func]'); //抓出所有設有 data-func 的模塊

      for( var i = 0; i < $nodes.length; i++ ) { //一一解析模塊的 data-func 的內容
        var $env = $nodes[i], //存節點
        $func = JSON.parse(($env.getAttribute('data-func')).replace(/\'/g,'"')); //轉成物件

        for( var _file in $func ) { //取 function name 與設定參數
          var $opt = $func[_file];

          requirejs([_file], function(func){ //如果有此 js 檔案，就執行該檔案
            func($env, $opt, _file);
          });
        }
      }
    });


<h3 id="js-jquery">關於 jquery.js</h3>
我們在 app.js 中設定了一個 jquery 關鍵字，該值是一個陣列：

    'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min', 'lib/jquery-1.11.3.min']

第一個字串是 google CDN 來源的 jquery，第二個是來自本地的 jquery 作為備援。當第一項資源失效時會立即啟用備援。
jquery 會污染全域變數 $，因此需要一個私有 jquery 對象的方法，jqueryPrivate 實作了這個方法。
先來看看 app.js 中 map 的設定：

    map: {
      '*': {
        'jquery': 'lib/jqueryPrivate'
      },
      'lib/jqueryPrivate': {
        'jquery': 'jquery'
      }
    }

*代表所有的 js 模塊，在所有 js 模塊中，jquery 關鍵字代表 Script/lib/jqueryPrivate 這個模塊，而在 Script/lib/jqueryPrivate.js 中的 jquery 關鍵字則指向 //ajax.googleapis.com/ajax/libs/jquery/1/jquery.min 位置與 Script/lib/jquery.js 模塊。
以下示範如何在模塊中使用 jquery：

    define(['jquery'], function($){

      function main(env, opt, file){
        you can use $('body') jquery here...
      }

      return main;
    });


<h3 id="js-cookie">關於 cookie.js</h3>
cookie.js 定義了幾種方法來操控網頁 cookie，以下將列舉一些它的 api：

<table>
  <tr>
    <td>set(_key, _value, _life)</td>
    <td>設定 cookie。_key 為 cookie 名稱， _value 為 cookie 內容， _life 為生命週期(天)</td>
  </tr>
  <tr>
    <td>get(_key)</td>
    <td>取 cookie 值。_key 為 cookie 名稱</td>
  </tr>
  <tr>
    <td>remove(_key)</td>
    <td>刪除 cookie。_key 為 cookie 名稱</td>
  </tr>
</table>

以下示範如何在模塊中使用 cookie：

    define(['cookie'], function(cookie){

      function main(env, opt, file){
        cookie.set('sample', 'true', 1);
      }

      return main;
    });


<h3 id="js-getNode">關於 getNode.js</h3>
因為我們統一了 HTML 結構，因此我們可更便捷、快速的取出想要的節點內容，getNode.js 就是為此而生。
getNode.js 定義了許多取得節點的方法。

getNode.js 的核心程式叫做 getChild，會抓取子節點並比對關鍵字，並把所有子節點展開、並回傳一個真正的陣列。


<h3 id="js-fix">關於 fix.js</h3>
fix.js 主要是修補瀏覽器的錯誤，例如 IE8 在接受到 console.log 即會拋出錯誤，我們使用這支 js 修改類似的錯誤。
