import React, { Component } from "react";
import S from "./styled";
//import Kakao from "kakao.js";

class Login extends Component {
  state = {
    isLogin: false,
  };
  loginWithKakao = () => {
    try {
      return new Promise((resolve, reject) => {
        if (!window.Kakao) {
          reject("Kakao 인스턴스가 존재하지 않습니다.");
        }
        window.Kakao.Auth.login({
          success: (auth) => {
            console.log("정상적으로 로그인 되었습니다.", auth);
            this.setState({
              isLogin: true,
            });
          },
          fail: (err) => {
            console.error(err);
          },
        });
      });
    } catch (err) {
      console.error(err);
    }
  };
  logoutWithKakao = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      console.log(
        "카카오 인증 액세스 토큰이 존재합니다.",
        window.Kakao.Auth.getAccessToken()
      );
      window.Kakao.Auth.logout(() => {
        console.log("로그아웃 되었습니다", window.Kakao.Auth.getAccessToken());
        this.setState({
          isLogin: false,
        });
      });
    }
  };
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    document.head.appendChild(script);
    script.onload = () => {
      window.Kakao.init("5e8e12531dcf57d869bb229c445390ef");
      if (window.Kakao.Auth.getAccessToken()) {
        console.log("액세스 토큰이 존재합니다. 세션을 유지합니다.");
        this.setState({
          isLogin: true,
        });
      }
    };
  }
  render() {
    const { isLogin } = this.state;

    const loginView = (
      <div>
        <p>메인 화면</p>
        <button onClick={this.loginWithKakao}>카카오 로그인</button>
      </div>
    );

    const mainView = (
      <div>
        <p>메인 화면</p>
        <button onClick={this.logoutWithKakao}>카카오 로그아웃</button>
      </div>
    );

    return <div className="Login">{isLogin ? mainView : loginView}</div>;
  }
}
export default Login;

/*
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

export default Login;*/
