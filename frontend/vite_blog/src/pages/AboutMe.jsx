const AboutMe = () => {
  return (
    <>
      <div className="prose-lg dark:prose-invert max-w-screen-md mx-auto px-4 py-4">
        <style>{`p::first-letter { margin-left: 2rem; } p{text-align: left;}`}</style>
        <h2>關於我</h2>
        <p>
          Hi，我是Tako🐙 其實已經想寫個blog想了n年了，但是礙於自己的堅持 -
          覺得已經接觸前、後端好一陣子了，不想使用任何模板或綁定自己的資料帳號於某公司，所以拖到現在...
          或許這個blog是給自己25歲的禮物吧！終於決定好好梳理20歲以來的點滴，並且把一直在腦海中計畫的blog草圖建設出來~
        </p>
        <p>我很喜歡一句話：</p>
        <blockquote>如果每天都有所成長，「年紀」就變得有意義了 ✨</blockquote>
        <p>
          期許自己可以把每天都過得滿滿的，用這個blog把我的體驗與感想記錄下來。我也希望除了寫文章外、這個blog可以是有互動性的，所以歡迎在留言區寫下任何想法
        </p>
        <p>
          最後，給大家一個簡單的自我介紹：
          <ul>
            <li>✿ 喜歡只和一個朋友深度地聊天</li>
            <li>
              ❀
              平時喜歡閱讀、寫字、畫畫、到鄉下走走、聽音樂（認真地聽音樂！）、煮飯做甜點，喜歡嘗試新東西
            </li>
            <li>✿ 不喜歡人多、有太多聲音的地方</li>
            <li>❀ 假日模式為一天出去玩、一天在家養精蓄銳</li>
            <li>✿ 喜歡貓咪和有長耳朵的狗狗</li>
          </ul>
        </p>
      </div>
    </>
  );
};

export default AboutMe;
