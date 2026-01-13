import "../index.css";

const Home = () => {
  return (
    <>
      <div className="homepage prose-lg dark:prose-invert max-w-screen-md mx-auto px-4 py-4">
        <style>{`.homepage p::first-letter { margin-left: 2rem; } p{text-align: left;}`}</style>
        <div className="flex justify-between items-center text-left border border-dashed rounded-md border-lightText dark:border-darkText gap-4 p-4">
          <div classname="text-left">
            <span className="text-sm">(jp) </span>
            おはよう、タコです
            <br />
            <span className="text-sm">(zh) </span>
            嗨依~ 我是 Tako
            <br />
            <small>頭髮剪短至齊肩後有點翹翹的，所以G給了我Tako的綽號</small>
            <br />
            <br />
            這裡是我記錄生活片段的小角落 ✒️
            <br />
            我寫文章的速度很慢，但還是別忘了偶爾回來逛逛 <br />
          </div>
          <img
            className="w-20 h-auto object-contain"
            src="../../logo.png"
            alt="logo"
          />
        </div>
        <div className="text-left">
          <h4>我喜歡 :3</h4>
          <ul>
            <li className="flower">貓咪和有長耳朵的狗狗</li>
            <li className="cherryBlossom">精緻的小東西，例如蕾絲鉤織</li>
            <li className="flower">看不一樣的風景、各地不同的建築</li>
            <li className="cherryBlossom">
              歐式麵包和各種"剛剛好甜"的甜點
              <ul>
                <li className="star">鮮奶布丁 (crème aux oeufs)</li>
                <li className="star">黑巧克力塔 (tarte au chocolat noir)</li>
                <li className="star">巧克力豆豆麵包 (viennoise chocolat)</li>
                <li className="star">
                  開心果千層派 (mille-feuille à la pistache)
                </li>
              </ul>
            </li>
            <li className="flower">
              看書~ 總是覺得我的書不夠、有好多想買的書、但總是讀不完書櫃裡的書
              <ul>
                <li className="star">
                  林中密族 (The People in the Trees) 是我近期最喜歡的
                </li>
                <li className="star">
                  哥本哈根三部曲（The Copenhagen Trilogy）是我前陣子最喜歡的
                </li>
                <li className="star">
                  最近想多讀愛爾蘭文學 - 都柏林人和鄉村女孩三部曲
                </li>
              </ul>
            </li>
            <li className="cherryBlossom">
              畫畫與電繪，偶爾會逛Pinterest或插畫家的Insta蒐集新點子
            </li>

            {/* 聊有深度 / 有意義的話題、有效率的解決問題 */}
          </ul>
        </div>

        <hr className="mx-auto w-96 border-t border-lightText dark:border-darkText" />

        <p>
          這個blog是給自己25歲的禮物 🎁
          終於開始把一直在腦海中計畫的blog建設出來~ <br />
          希望這裡是好朋友、頻率相近的人可以互動交流的地方，歡迎在文章留言區寫下任何想法
          ✨
        </p>
        <br />
        <div className="text-left border border-dashed rounded-md border-lightText dark:border-darkText p-4">
          小提示：
          <br />
          可以依照右上角的tags找到相關的文章
        </div>

        {/* <hr className="mx-auto w-96 border-t border-lightText dark:border-darkText" />
        <p>
          原本好想用這個作為blog主要字體，但發現字體漂亮但不太好讀，有點可惜...
        </p>
        <p className="font-kouzan">漂亮字體推薦收藏 衡山毛筆フォント</p> */}
      </div>
    </>
  );
};

export default Home;
