import "./App.css";
import React, { useState, useEffect } from "react";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import TheNavbar from "./components/TheNavbar";
import Map from "./components/Map";

function App() {
  // ログインしているユーザーの情報を管理するステート
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState(null);
  // モーダルの表示状態を管理するステート
  const [modals, setModals] = useState({ login: false, signUp: false });

  // ログインモーダルを表示する処理
  const handleLoginClick = () => {
    setModals({ login: true, signUp: false });
  };
  // ユーザ登録モーダルを表示する処理
  const handleSignUpClick = () => {
    setModals({ login: false, signUp: true });
  };
  // モーダルを閉じる処理
  const handleCloseModals = () => {
    setModals({ login: false, signUp: false });
  };

  // Firebaseの認証状態が変化した際の処理
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setModals({ login: true, signUp: false }); // ログインモーダルを表示
      }
    });

    return () => unsubscribe();
  }, []);

  // ログアウト処理
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = () => {
    auth.signOut();
    // ログアウト後の処理を記述する（例：リダイレクトなど）
  };

  return (
    <div className="App">
      <TheNavbar />
      <Map />
      <div className="container ">
        <div className="mt-5"></div>
        {/* ログイン用モーダル */}
        <LoginModal
          show={modals.login}
          handleClose={handleCloseModals}
          showSignUpModal={handleSignUpClick}
        />
        <SignUpModal
          show={modals.signUp}
          handleClose={handleCloseModals}
          showLoginModal={handleLoginClick}
        />
      </div>
    </div>
  );
}

export default App;
