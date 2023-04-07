import React, { useEffect } from "react";
import S from "./styled";
import KakaoLogin from "react-kakao-login";

const Login = () => {
  const JavaScript_Key = "my_app_key";
  const REDIRECT_URI = "http://localhost:3000/oauth";
  //const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${JavaScript_Key}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  function loginWithKakao() {
    if (typeof window.Kakao !== "undefined") {
      window.Kakao.Auth.authorize({
        redirectUri: REDIRECT_URI,
      });
    }
  }

  function displayToken() {
    const token = getCookie("authorize-access-token");

    if (token) {
      window.Kakao.Auth.setAccessToken(token);
      window.Kakao.Auth.getStatusInfo()
        .then(function (res) {
          if (res.status === "connected") {
            var accessToken = window.Kakao.Auth.getAccessToken();
            console.log(accessToken);
            document.getElementById("token-result").innerText =
              "login success, token: " + accessToken;
          }
        })
        .catch(function (err) {
          console.log(err);
          window.Kakao.Auth.setAccessToken(null);
        });
    }
  }

  function getCookie(name) {
    var parts = document.cookie.split(name + "=");
    if (parts.length === 2) {
      return parts[1].split(";")[0];
    }
  }

  useEffect(() => {
    if (!window.Kakao) {
      KakaoLogin.init(JavaScript_Key);
      window.Kakao = KakaoLogin;
    }
  }, []);

  useEffect(() => {
    if (typeof window.Kakao !== "undefined") {
      window.Kakao.Auth.createLoginButton({
        container: "#kakao-login-btn",
        success: function (authObj) {
          console.log(authObj);
          window.Kakao.Auth.setAccessToken(authObj.access_token);
          displayToken();
        },
        fail: function (err) {
          console.log(err);
        },
      });
    }
  }, []);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>BeJuRyuLogin!</S.Title>
        <S.snsTitle>KAKAO LOGIN</S.snsTitle>

        <S.BtnList>
          <div>
            {/* 카카오 로그인 버튼 */}
            <div id="kakao-login-btn" onClick={() => loginWithKakao()}>
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
