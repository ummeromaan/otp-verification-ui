
import { useEffect, useRef, useState } from "react";

function App() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  // Countdown
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResend = () => {
    if (timer > 0) return;

    setOtp(["", "", "", "", "", ""]);
    setTimer(30);

    inputRefs.current[0]?.focus();
  };

  // Verify OTP
  const handleVerify = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    alert(`OTP entered: ${enteredOtp}`);
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">

      {/* Main Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-blue-700/70 bg-[#04132f] px-6 py-10 shadow-[0_0_80px_rgba(0,80,255,0.18)] sm:px-10 sm:py-12 md:px-16 md:py-14">

        {/* Background Glow */}
        <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute -right-32 bottom-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Content */}
        <div className="relative">

          {/* Lock Icon */}
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-blue-500/70 bg-blue-500/10 shadow-[0_0_30px_rgba(0,100,255,0.25)]">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
              />

              <path
                strokeLinecap="round"
                d="M8 10V7a4 4 0 018 0v3"
              />
            </svg>

          </div>

          {/* Heading */}
          <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Enter{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              OTP
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-md text-center text-sm leading-6 text-gray-300 sm:text-base">
            We've sent a 6-digit verification code to
          </p>

          <p className="text-center font-semibold text-cyan-400">
            user@email.com
          </p>

          {/* OTP Form */}
          <form
            onSubmit={handleVerify}
            className="mt-10"
          >

            {/* OTP Boxes */}
            <div className="flex justify-center gap-2 sm:gap-4">

              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className="h-14 w-11 rounded-xl border border-blue-500/70 bg-[#071a3d] text-center text-xl font-semibold text-white outline-none transition focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,150,255,0.4)] sm:h-16 sm:w-14 sm:text-2xl"
                />
              ))}

            </div>

            {/* Resend */}
            <div className="mt-8 text-center">

              <p className="text-sm text-gray-300">
                Didn't receive the code?{" "}

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className={`font-semibold ${
                    timer > 0
                      ? "cursor-not-allowed text-gray-500"
                      : "text-blue-400 hover:text-cyan-400 hover:underline"
                  }`}
                >
                  Resend OTP
                </button>
              </p>

              {/* Timer */}
              {timer > 0 && (
                <p className="mt-3 text-sm text-gray-400">
                  Resend in{" "}
                  <span className="font-medium text-blue-400">
                    00:{String(timer).padStart(2, "0")}
                  </span>
                </p>
              )}

            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-base font-semibold text-white shadow-[0_0_25px_rgba(0,130,255,0.25)] transition hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_35px_rgba(0,180,255,0.35)]"
            >
              Verify Code
              <span className="ml-2 text-xl">→</span>
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default App;