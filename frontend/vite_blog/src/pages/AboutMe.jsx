const AboutMe = () => {
  return (
    <>
      <div className="prose-lg dark:prose-invert max-w-screen-md mx-auto px-4 py-8">
        <style>{`p::first-letter { margin-left: 2rem; } p{text-align: left;}`}</style>
        <h2>關於我</h2>
        <p>
          Hi，我是Tako🐙 其實已經想寫個blog想了n年了，但是礙於自己的堅持 -
          覺得已經接觸前、後端好一陣子了，不想使用任何模板或綁定自己的資料帳號於某公司，所以拖到現在...
        </p>
        <p>
          約五年前測的MBTI是INFJ。只有一兩個朋友在我身邊時我可以暢所欲言，不像個I人；平時喜歡閱讀、寫字、畫畫、到鄉下走走、聽音樂（認真地聽音樂！）。
          最近又開始學鉤織了！期待這次可以學習久把它養成一個新興趣；我不喜歡人多、有太多聲音的地方，假日模式通常為一天出去玩、一天在家養精蓄銳。
        </p>
        <p>
          或許這個blog是給自己25歲的禮物吧！終於決定好好梳理20歲以來的點滴。
          22歲前在大學，但好像過得不太「大學生」...
          參加很少活動、不曾聯誼、曾在考試前飛出國（有機會之後說~）、多數時間是與自己相處
          依然怡然自得。大學尾聲至法國交換、畢業後實習、實習後回法國、回台後工作不久就辭職了、很快地要展開在法國度假打工的生活。
        </p>
        <p>我很喜歡一句話：</p>
        <blockquote>如果每天都有所成長，「年紀」就變得有意義了</blockquote>
        <p>
          我希望這裡是好朋友、頻率與我相近的人可以交流的地方，所以非常歡迎留言。可以選擇匿名公開的留言、或是不公開地只傳訊息給我
          😊
        </p>
        <hr className="border-gray-500" />
        <p>
          這些是近期我喜歡的，如果你們正想找個消磨閒暇時間的書、動漫、影集，我推薦
          🤩
        </p>
        <ul className="text-left">
          <li>書籍：哥本哈根三部曲、沼澤女孩</li>
          <li>
            動漫：奧術（Arcane）、海盜戰記（Vinland
            Saga）、神秘小鎮大冒險（Gravity Falls）
          </li>
          <li>電影：納瓦尼事件簿（Navalny）</li>
          <li>影集：初戀（First Love）</li>
        </ul>
      </div>
    </>
  );
};

export default AboutMe;
