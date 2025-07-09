const Home = () => {
  return (
    <>
      <div className="homepage prose-lg dark:prose-invert max-w-screen-md mx-auto px-4 py-4">
        <style>{`.homepage p::first-letter { margin-left: 2rem; } p{text-align: left;}`}</style>
        <p>
          Hello 歡迎光臨~ 很開心你來到這裡！這裡是我寫寫心得、分享近況的地方。
          以往我都仰賴Instagram分享有的沒的，但總想要做個"自己的東西"，其實已經想寫個blog想了n年了，礙於自己的堅持
          - 不想使用任何模板或綁定自己的資料帳號於某公司，所以拖到現在...
          或許這個blog是給自己25歲的禮物！終於決定好好梳理20歲以來的點滴，並且把一直在腦海中計畫的blog建設出來~
          我希望這裡是好朋友、頻率相近的人可以互動交流的地方，所以歡迎在留言區寫下任何想法。可以選擇匿名公開的留言、或是不公開地只傳訊息給我
          😊
        </p>
        <p>我很喜歡一句話：</p>
        <blockquote>如果每天都有所成長，「年紀」就變得有意義了 ✨</blockquote>
        <p>
          期許自己可以把每天都過得滿滿的，用這個blog把我的體驗與感想記錄下來。小提示：可以依照右上角的tags找到相關的文章。分類有點廣義，生活tag的文章中可能會出現食譜；閱讀tag的文章可能會跟影集或電影相關。
        </p>
        <div className="text-left [&>p::first-letter]:ml-8">
          <p>給大家一個簡單的自我介紹：</p>
          <ul>
            <li>
              ❀
              我是Tako🐙，不務正業的軟體工程師。曾經認真實習一年並在傳統大公司上班幾個月，期間時常旅遊、實踐work-life
              balance。目前在法國體驗不一樣的生活、過著退休日子（開玩笑的，但這是夢想）
            </li>
            <li>✿ 喜歡只和一個朋友深度地聊天；不喜歡人多、很吵的地方</li>
            <li>
              ❀
              閒暇時喜歡閱讀、寫字、畫畫、到鄉下走走、聽音樂（認真地聽音樂）、聽podcast、煮飯做甜點，喜歡嘗試新東西、看不一樣的風景
            </li>
            <li>✿ 喜歡貓咪和有長耳朵的狗狗</li>
          </ul>
        </div>
        <hr className="border-t border-lightText dark:border-darkText" />
        <p>
          這些是近期我喜歡的🤩，還不確定放在哪個tag好，或是未來開個新功能專門分享好聽
          / 好看 / 好玩的？
          如果你們正想找個消磨閒暇時間的書、動漫、影集，我推薦下面這些
        </p>
        <ul className="text-left">
          <li>
            ❀ 書籍：哥本哈根三部曲（The Copenhagen Trilogy）、沼澤女孩（Where
            the Crawdads Sing）
          </li>
          <li>
            ✿ 動漫：奧術（Arcane）、海盜戰記（Vinland
            Saga）、神秘小鎮大冒險（Gravity Falls）
          </li>
          <li>
            ❀ 電影：納瓦尼事件簿（Navalny）、日本人的養成（The Making of a
            Japanese）
          </li>
          <li>✿ 影集：初戀（First Love）</li>
        </ul>
        <hr className="border-t border-lightText dark:border-darkText" />
        <p>
          原本好想用這個作為blog主要字體，但發現字體漂亮但不太好讀，有點可惜...
        </p>
        <p className="font-kouzan">漂亮字體推薦收藏 衡山毛筆フォント</p>
      </div>
    </>
  );
};

export default Home;
