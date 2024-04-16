import Header from "components/Header/Header";
import Help1 from "assets/help/help1.png";
import Help2 from "assets/help/help2.png";
import Help3 from "assets/help/help3.png";
import Help4 from "assets/help/help4.png";

const HelpPage = () => {
  return (
    <div className="grow shrink px-2">
      <Header defaultTab="" />
      <div className="max-w-[1120px] mx-auto space-y-1 my-10 text-[12px] sm:text-[14px]">
        <div>
          <div className="font-[700] text-[20px]">
            메이플스토리 API Key 발급 가이드
          </div>
          <a
            href="https://openapi.nexon.com"
            className="text-potential-400 border-b border-potential-400"
          >
            https://openapi.nexon.com
          </a>
        </div>
        <div className="border-[0.5px] border-dark-150 dark:border-none dark:bg-dark-50 shadow-md p-4 space-y-6">
          <div>
            <div className="font-[700] text-[20px]">1. 넥슨 오픈 API 접속</div>
            <div className="pl-4">
              <div>- 넥슨 오픈 API 로그인</div>
              <div>- 상단 메뉴 - 애플리케이션 - 애플리케이션 등록 클릭</div>

              <img src={Help1} alt="help1" className="p-2" />
            </div>
          </div>
          <div>
            <div className="font-[700] text-[20px]">2. 애플리케이션 등록</div>
            <div className="pl-4">
              <div>- 게임 : 메이플스토리</div>
              <div>- 단계 : 서비스 단계</div>
              <div>- 서비스명 : 메이플인포</div>
              <div>- 개발 환경 : WEB</div>
              <div>- URL : https://mapleinfo.io</div>
              <div>- 서비스 소개 : 스타포스, 큐브 내역 확인</div>
              <div>
                <img src={Help2} alt="help2" className="p-2" />
              </div>
            </div>
          </div>
          <div>
            <div className="font-[700] text-[20px]">3. API key 확인</div>
            <div className="pl-4">
              <div>- 상단 메뉴 - 애플리케이션 목록 - 메이플인포 클릭</div>
              <div>- 애플리케이션 상세 API key 복사</div>
              <div>
                <img src={Help3} alt="help3" className="p-2" />
              </div>
              <div>
                <img src={Help4} alt="help4" className="p-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
