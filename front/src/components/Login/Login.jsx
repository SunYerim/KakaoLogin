import React, { useEffect } from "react";
import S from "./styled";
import Kakao from "kakao.js";

//import KakaoLogin from "react-kakao-login";

const Login = () => {
  const JavaScript_Key = "d19046b7f49f6376e5f701a2a57167e3";
  const REDIRECT_URI = "http://localhost:3000/oauth";
  //const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${JavaScript_Key}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  //Kakao.init(JavaScript_Key);

  function loginWithKakao() {
    if (typeof window.Kakao !== "undefined") {
      Kakao.Auth.login({
        success: function (authObj) {
          alert("액세스 토큰: " + authObj.access_token);
        },
        fail: function (err) {
          alert(JSON.stringify(err));
        },
        redirectUri: REDIRECT_URI,
      });
    }
  }

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>BeJuRyuLogin!</S.Title>
        <S.snsTitle>KAKAO LOGIN</S.snsTitle>

        <S.BtnList>
          <div>
            {/* 카카오 로그인 버튼 */}
            <div id="kakao-login-btn" onClick={loginWithKakao}>
              <img
                src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인 버튼"
              />
            </div>
          </div>
        </S.BtnList>
      </S.Wrapper>
    </S.Container>
  );
};

export default Login;
