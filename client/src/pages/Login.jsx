//import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
//import { useNavigate } from "react-router-dom";
import myImage2 from "../images/merieux.png";
import { useTranslation } from "react-i18next";

const Login = ({ setIsUserLoggedIn }) => {
  const { t } = useTranslation("global");
  //const auth = getAuth();
  //const provider = new GoogleAuthProvider();

  //const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3001/api/auth/google";
  };

  return (
    <div className="">
      <div className="bg-gray-400 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen bg-slate-800 hidden lg:block">
          <div className="flex justify-center items-center h-full">
          </div>
        </div>

        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">{t("login.login")}</h1>

          <div>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
