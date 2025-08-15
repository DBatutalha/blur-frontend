import { useEffect } from "react";
import { requestSampleRequest } from "./requests/sample-requests";
import { Link } from "react-router";
import { Building2 } from "lucide-react";

function App() {
  useEffect(() => {
    requestSampleRequest({ message: "Ping" })
      .then((data) => {
        console.log(data.user_message);
      })
      .catch((error) => {
        console.error(error.status, error.message);
      });
  }, []);

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center text-gray-950 bg-gray-200 text-center">
        <div className="flex flex-col items-center w-full max-w-[1280px] gap-5">
          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <span className="text-xl font-bold">Blur Teknoloji</span>
            <span className="text-lf font-semibold">
              Tam Zamanlı Full-Stack Pozisyonu
            </span>
            <span className="font-semibold">Kodlama Mülakatı</span>
          </div>

          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <span>Mülakat kodlama mücadelesine hoşgeldiniz!</span>
            <span>
              Proje içerik ve gerekçelerini <code>README.md</code> dosyasında
              bulabilirsiniz.
            </span>
            <span className="font-semibold">Başarılar dileriz!</span>
          </div>
          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <Link to="/enterprises" className="btn">
              <Building2 className="w-5 h-5 mr-2" />
              İşletmeler
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
