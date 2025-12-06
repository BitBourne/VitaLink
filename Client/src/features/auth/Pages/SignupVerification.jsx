import React from "react";
import SignupVerificationForm from "../components/SignupVerificationForm";
import { CheckCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../core/ui/Components/Button";

const SignupVerification = () => {

  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = React.useState(false);

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-2">

      <div className={`${ isTokenValid ? 'hidden' : 'block' } w-full max-w-md`}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#4C575F] mb-3">
            Confirma Tu Identidad
          </h2>

          <p className="text-base text-[#4C575F]/80 leading-relaxed">
            Hemos enviado un código de verificación a tu email.<br />
            Revisa tu bandeja de entrada.
          </p>
        </div>
      
        <div className="flex justify-center mb-10">
          <CheckCircle className="w-20 h-20 text-[#5EE7DF]" strokeWidth={2} />
        </div>

        <SignupVerificationForm value={isTokenValid} setValue={setIsTokenValid} />
      </div>

      <div className={`${ isTokenValid ? 'block' : 'hidden' } w-full max-w-md text-center`}>
        <div className="w-full text-center">

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#4C575F] mb-3">
              ¡Listo!
            </h2>
            <p className="text-base text-[#4C575F]/80">
              Bienvenido a <span className="font-semibold text-[#B490CA]">VitaLink</span>
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] shadow-lg">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] mb-4">
              ¡Bienvenido a VitaLink!
            </h3>
            <p className="text-base text-[#4C575F]/80 leading-relaxed max-w-md mx-auto">
              Tu cuenta ha sido creada exitosamente. Ya puedes comenzar a usar la plataforma.
            </p>
          </div>

          <hr className="border-t border-[#E0E6EA] mb-10 mx-8" />

          <div className="flex justify-end">
            <Button
              icon="arrowRight"
              iconPosition="right"
              type="button"
              variant="primary"
              onClick={() => navigate("/")}
              text="Siguiente"
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupVerification;